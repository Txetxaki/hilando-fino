import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const artifactArgIndex = process.argv.indexOf('--artifact-dir');
const artifactDir = artifactArgIndex >= 0 ? process.argv[artifactArgIndex + 1] : process.env['PAGES_ARTIFACT_DIR'];
const pageUrl = process.env['PAGES_PAGE_URL'] ?? process.env['PAGE_URL'];

if (artifactDir) {
  await checkLocalArtifact(artifactDir);
  process.exit(0);
}

if (!pageUrl) {
  console.error('PAGES_PAGE_URL is required for the post-deploy GitHub Pages smoke check, or pass --artifact-dir for a local Pages artifact smoke.');
  process.exit(1);
}

const baseUrl = pageUrl.endsWith('/') ? pageUrl : `${pageUrl}/`;
const failures = [];

await checkPage('', { expectLogo: true, expectHeading: 'Hilando Fino Psicología' });
await checkPage('contacto/', { expectHeading: 'Contacto' });
await checkPage('ruta-inexistente-smoke/', { expectStatus: 404, expectHeading: 'No hemos encontrado esta página' });

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Post-deploy GitHub Pages smoke passed for ${baseUrl}`);

async function checkPage(path, options = {}) {
  const url = new URL(path, baseUrl).toString();
  const response = await fetch(url, { redirect: 'manual' });
  const expectedStatus = options.expectStatus ?? 200;
  if (response.status !== expectedStatus) failures.push(`${url}: expected HTTP ${expectedStatus}, got ${response.status}`);
  const html = await response.text();
  if (!html.includes('name="robots" content="noindex, nofollow"')) failures.push(`${url}: missing noindex robots metadata`);
  checkCanonicalAndForbiddenOrigins(url, html);
  if (options.expectHeading && !html.includes(options.expectHeading)) failures.push(`${url}: missing expected content: ${options.expectHeading}`);
  if (path === '') {
    if (!html.includes('<base href="/hilando-fino/">')) failures.push(`${url}: missing repository base href`);
    for (const asset of collectAssetUrls(html)) {
      if (asset.startsWith('/') && !asset.startsWith('/hilando-fino/')) failures.push(`${url}: root-absolute asset outside repository base: ${asset}`);
    }
  }
  if (options.expectLogo) {
    const logoUrl = new URL('logo.png', baseUrl).toString();
    const logo = await fetch(logoUrl, { redirect: 'manual' });
    if (!logo.ok) failures.push(`${logoUrl}: expected logo asset HTTP success, got ${logo.status}`);
  }
}

async function checkLocalArtifact(dir) {
  const localFailures = [];
  for (const [file, heading] of [
    ['index.html', 'Hilando Fino Psicología'],
    ['contacto/index.html', 'Contacto'],
    ['404.html', 'No hemos encontrado esta página']
  ]) {
    const path = join(dir, file);
    if (!existsSync(path)) {
      localFailures.push(`${file}: missing from local Pages artifact`);
      continue;
    }
    const html = readFileSync(path, 'utf8');
    if (!html.includes(heading)) localFailures.push(`${file}: missing expected content: ${heading}`);
    if (!html.includes('name="robots" content="noindex, nofollow"')) localFailures.push(`${file}: missing noindex robots metadata`);
    if (!html.includes('<base href="/hilando-fino/">')) localFailures.push(`${file}: missing repository base href`);
    checkCanonicalAndForbiddenOrigins(file, html, localFailures);
  }
  const logo = join(dir, 'logo.png');
  if (!existsSync(logo)) localFailures.push('logo.png: missing from local Pages artifact');
  if (localFailures.length > 0) {
    console.error(localFailures.join('\n'));
    process.exit(1);
  }
  console.log(`Local GitHub Pages artifact smoke passed for ${dir}`);
}

function checkCanonicalAndForbiddenOrigins(label, html, targetFailures = failures) {
  if (/pending-domain\.invalid|localhost|127\.0\.0\.1|http:\/\//i.test(html)) targetFailures.push(`${label}: contains forbidden local/pending/non-HTTPS origin`);
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1];
  if (!canonical) {
    targetFailures.push(`${label}: missing canonical URL`);
    return;
  }
  try {
    const url = new URL(canonical);
    if (url.origin !== 'https://txetxaki.github.io' || (url.pathname !== '/hilando-fino' && !url.pathname.startsWith('/hilando-fino/'))) targetFailures.push(`${label}: malformed Pages canonical URL ${canonical}`);
  } catch {
    targetFailures.push(`${label}: malformed canonical URL ${canonical}`);
  }
}

function collectAssetUrls(html) {
  const urls = new Set();
  for (const match of html.matchAll(/<(?:img|script|link|source)[^>]+(?:src|href)="([^"]+)"/g)) urls.add(match[1]);
  for (const match of html.matchAll(/<source[^>]+srcset="([^"]+)"/g)) {
    for (const src of match[1].split(',')) urls.add(src.trim().split(/\s+/)[0] ?? '');
  }
  return [...urls].filter(Boolean);
}
