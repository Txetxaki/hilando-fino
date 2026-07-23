import { chromium } from '@playwright/test';

import { buildPrerenderedApp, getAvailablePort, startBuiltServer, stopChild, waitForServer } from './server-lifecycle.mjs';

const routes = ['/', '/psicologia-ciudad-real', '/areas-de-intervencion', '/contacto'];
const maxNavigationMs = Number(process.env['PERFORMANCE_SMOKE_MAX_NAV_MS'] ?? 5_000);
const externalBaseUrl = process.env['PERFORMANCE_BASE_URL'] ?? process.env['LH_BASE_URL'];
const skipBuild = process.argv.includes('--skip-build') || process.env['PERFORMANCE_SKIP_BUILD'] === 'true';
const host = '127.0.0.1';
const port = externalBaseUrl ? null : await getAvailablePort(host);
const baseUrl = externalBaseUrl ?? `http://${host}:${port}`;
let server = null;
let browser = null;
const failures = [];

try {
  if (!externalBaseUrl) {
    if (!skipBuild) await buildPrerenderedApp();
    server = startBuiltServer({ port, host, env: { CONTACT_ENABLED: 'false' } });
    await waitForServer(`${baseUrl}/__healthz`, { child: server });
  }

  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  for (const route of routes) {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
    if (!response?.ok()) failures.push(`${route}: HTTP ${response?.status() ?? 'unknown'}`);
    const metrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      return nav ? { duration: nav.duration, transferSize: 'transferSize' in nav ? nav.transferSize : 0 } : { duration: 0, transferSize: 0 };
    });
    if (metrics.duration > maxNavigationMs) failures.push(`${route}: navigation duration ${Math.round(metrics.duration)}ms exceeds ${maxNavigationMs}ms smoke budget`);
  }
} finally {
  if (browser) await browser.close();
  await stopChild(server);
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Performance smoke budget passed at ${baseUrl}. This is not Lighthouse and does not claim Core Web Vitals or INP.`);
