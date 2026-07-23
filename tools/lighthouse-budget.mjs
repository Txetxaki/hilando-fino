import { chromium } from '@playwright/test';
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';

import { getAvailablePort, startBuiltServer, stopChild, waitForServer } from './server-lifecycle.mjs';

const routes = ['/', '/psicologia-ciudad-real', '/areas-de-intervencion', '/contacto'];
const externalBaseUrl = process.env['LH_BASE_URL'];
const host = '127.0.0.1';
const port = externalBaseUrl ? null : await getAvailablePort(host);
const baseUrl = externalBaseUrl ?? `http://${host}:${port}`;
const startedServer = externalBaseUrl ? null : startBuiltServer({ port, host, env: { CONTACT_ENABLED: 'false' } });
const failures = [];
const results = [];

try {
  await waitForServer(externalBaseUrl ? `${baseUrl}/` : `${baseUrl}/__healthz`, { child: startedServer });
  const chrome = await launch({
    chromePath: chromium.executablePath(),
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage']
  });

  try {
    for (const route of routes) {
      const result = await runLighthouse(route, chrome.port);
      if (!result?.lhr) {
        failures.push(`${route}: Lighthouse did not return a report`);
        continue;
      }
      const lhr = result.lhr;
      const performance = categoryScore(lhr, 'performance');
      const accessibility = categoryScore(lhr, 'accessibility');
      const seo = categoryScore(lhr, 'seo');
      const lcp = auditNumeric(lhr, 'largest-contentful-paint');
      const cls = auditNumeric(lhr, 'cumulative-layout-shift');
      const tbt = auditNumeric(lhr, 'total-blocking-time');
      const totalBytes = auditNumeric(lhr, 'total-byte-weight');

      results.push({ route, performance, accessibility, seo, lcp, cls, tbt, totalBytes });
      if (performance < 0.9) failures.push(`${route}: performance score ${performance} is below 0.90`);
      if (accessibility < 0.9) failures.push(`${route}: accessibility score ${accessibility} is below 0.90`);
      if (lcp > 2500) failures.push(`${route}: LCP ${Math.round(lcp)}ms exceeds 2500ms budget`);
      if (cls > 0.1) failures.push(`${route}: CLS ${cls} exceeds 0.1 budget`);
      if (tbt > 200) failures.push(`${route}: TBT ${Math.round(tbt)}ms exceeds 200ms lab proxy budget`);
      if (totalBytes > 800_000) failures.push(`${route}: total byte weight ${Math.round(totalBytes)} exceeds 800kB draft budget`);
    }
  } finally {
    await closeChrome(chrome, failures);
  }
} finally {
  await stopChild(startedServer);
}

for (const result of results) {
  console.log(
    `${result.route}: perf=${result.performance.toFixed(2)} a11y=${result.accessibility.toFixed(2)} seo=${result.seo.toFixed(2)} ` +
      `LCP=${Math.round(result.lcp)}ms CLS=${result.cls.toFixed(3)} TBT=${Math.round(result.tbt)}ms bytes=${Math.round(result.totalBytes)}`
  );
}
console.log('Lighthouse lab budgets do not prove INP; INP remains a launch/field-data gate after deployment traffic exists.');
console.log('SEO category score is informational while every route intentionally ships noindex in draft mode.');

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Lighthouse budgets passed.');

async function runLighthouse(route, port) {
  let result = await lighthouseForRoute(route, port);
  const lhr = result?.lhr;
  const performance = lhr ? categoryScore(lhr, 'performance') : 0;
  const lcp = lhr ? auditNumeric(lhr, 'largest-contentful-paint') : 0;
  if (!lhr || (performance === 0 && lcp === 0)) {
    console.warn(`${route}: Lighthouse returned an incomplete first report; retrying once.`);
    result = await lighthouseForRoute(route, port);
  }
  return result;
}

async function lighthouseForRoute(route, port) {
  return await lighthouse(`${baseUrl}${route}`, {
    port,
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    throttlingMethod: 'provided',
    formFactor: 'mobile',
    screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 2, disabled: false }
  });
}

function categoryScore(lhr, category) {
  return lhr.categories[category]?.score ?? 0;
}

function auditNumeric(lhr, audit) {
  return lhr.audits[audit]?.numericValue ?? 0;
}

async function closeChrome(chrome, failureList) {
  let lastError = null;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      await chrome.kill();
      return;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 250 * attempt));
    }
  }
  failureList.push(`Chrome cleanup failed after bounded retries: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
}
