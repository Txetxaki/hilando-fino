import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

import { publicRouteManifest, requiredPagesArtifactFiles } from '../src/app/content/public-routes.ts';

const browserDir = join(process.cwd(), 'dist', 'hilando-fino', 'browser');
const baseHref = process.env['PAGES_BASE_HREF'] ?? '/';
const pagesSiteUrl = process.env['PAGES_SITE_URL'] ?? 'https://hilandofinopsicologia.com';
const draftNoindex = process.env['PAGES_PREVIEW'] === 'true';
const expectedRobots = draftNoindex ? 'noindex, nofollow' : 'index, follow';
const pagesUrl = new URL(pagesSiteUrl);
const pagesPath = pagesUrl.pathname === '/' ? '' : pagesUrl.pathname.replace(/\/$/, '');
const requiredRoutes = requiredPagesArtifactFiles;
const failures = [];

// The contact-unavailable message only renders client-side after a submit interaction, so it
// never appears in the prerendered contacto/index.html snapshot. The compiled client JS bundle
// is the closest sound static-artifact proof that the honest message shipped and the old
// dishonest/retryable wording did not regress back in. esbuild minification may re-encode
// accented characters as \xHH escapes instead of literal UTF-8 bytes, so match both encodings.
const contactHonestMessage = 'Todavía no puedo recibir tu mensaje desde aquí. Vuelve a visitar esta página más adelante.';
const contactDishonestMessage = 'No he podido enviar la solicitud desde esta página. Por favor, vuelve a intentarlo más tarde.';
const contactHonestMessageVariants = [contactHonestMessage, hexEscapeNonAscii(contactHonestMessage)];
const contactDishonestMessageVariants = [contactDishonestMessage, hexEscapeNonAscii(contactDishonestMessage)];
let contactHonestMessageFound = false;

if (!existsSync(browserDir)) failures.push('dist/hilando-fino/browser is missing. Run npm run build:pages first.');

const favicon = join(browserDir, 'favicon.ico');
if (!existsSync(favicon)) failures.push('favicon.ico is missing from the Pages artifact');

const robotsFile = join(browserDir, 'robots.txt');
if (!existsSync(robotsFile)) {
  failures.push('robots.txt is missing from the Pages artifact');
} else {
  const robots = readFileSync(robotsFile, 'utf8');
  if (robots.includes('pending-domain.invalid') || robots.includes('localhost')) failures.push('robots.txt contains a pending/local origin');
  if (draftNoindex ? !robots.includes('Disallow: /') : !robots.includes('Allow: /')) failures.push(`robots.txt does not match ${draftNoindex ? 'preview' : 'production'} policy`);
  if (!robots.includes(`Sitemap: ${pagesSiteUrl}/sitemap.xml`)) failures.push('robots.txt does not point to the real sitemap origin');
}

const sitemapFile = join(browserDir, 'sitemap.xml');
if (!existsSync(sitemapFile)) {
  failures.push('sitemap.xml is missing from the Pages artifact');
} else {
  const sitemap = readFileSync(sitemapFile, 'utf8');
  if (sitemap.includes('pending-domain.invalid') || sitemap.includes('localhost')) failures.push('sitemap.xml contains a pending/local origin');
  if (!sitemap.includes(`<loc>${pagesSiteUrl}/</loc>`)) failures.push('sitemap.xml does not contain the real site origin');
  if (draftNoindex && !sitemap.includes('<url>')) failures.push('preview sitemap unexpectedly has no route inventory');
  if (!draftNoindex && sitemap.includes('noindex')) failures.push('production sitemap contains preview-only indexing policy');
}

for (const route of requiredRoutes) {
  const file = join(browserDir, route);
  if (!existsSync(file)) {
    failures.push(`${route} is missing from the Pages artifact`);
  }
}

for (const file of walk(browserDir)) {
  const rel = relative(browserDir, file).split(sep).join('/');
  if (/\.html$/i.test(rel)) {
    verifyHtml(rel, readFileSync(file, 'utf8'));
  }
}

const notFound = join(browserDir, '404.html');
if (!existsSync(notFound)) {
  failures.push('404.html is missing from the Pages artifact');
} else {
  const html = readFileSync(notFound, 'utf8');
  if (!html.includes(`<base href="${baseHref}">`)) failures.push(`404.html does not use the expected base href ${baseHref}`);
  if (!html.includes('name="robots" content="noindex, nofollow"')) failures.push('404.html is not noindex');
  if (/<h1[^>]*>\s*Hilando Fino Psicología\s*<\/h1>/i.test(html)) failures.push('404.html masquerades as the home page');
  verifyUrlContracts('404.html', html);
}

for (const file of walk(browserDir)) {
  const rel = relative(browserDir, file).split(sep).join('/');
  if (/\.map$/i.test(rel)) failures.push(`${rel} is a source map and must not be deployed`);
  if (/(^|\/)server(\/|\.|-)|server\.mjs$/i.test(rel)) failures.push(`${rel} looks like a server bundle`);
  if (/(^|\/)\.env(\.|$)/i.test(rel)) failures.push(`${rel} is an environment file`);

  const text = readTextIfSafe(file);
  if (!text) continue;
  for (const forbidden of ['CONTACT_CSRF_SECRET', 'CONTACT_ENABLED=true', 'CONTACT_RETENTION_APPROVED=true', '/api/contact', 'contact_provider_failure', 'LocalBusiness']) {
    if (text.includes(forbidden)) failures.push(`${rel} contains forbidden Pages artifact text: ${forbidden}`);
  }
  if (contactHonestMessageVariants.some((variant) => text.includes(variant))) contactHonestMessageFound = true;
  if (contactDishonestMessageVariants.some((variant) => text.includes(variant))) failures.push(`${rel} still contains the old dishonest/retryable contact failure message`);
}

if (!contactHonestMessageFound) {
  failures.push('Pages artifact never includes the honest contact-unavailable message in any built file; the client bundle should carry it since contacto/index.html cannot capture post-interaction state.');
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`GitHub Pages artifact verification passed: ${expectedRobots} metadata, base href, routes, origins, sitemap/robots, favicon, contact fallback, 404, and sensitive-file checks are safe.`);

function verifyHtml(route, html) {
  if (!html.includes(`<base href="${baseHref}">`)) failures.push(`${route} does not use the expected base href ${baseHref}`);
  if (route === '404.html') return;
  if (!html.includes(`name="robots" content="${expectedRobots}"`)) failures.push(`${route} does not emit ${expectedRobots}`);
  if (html.includes('@type":"LocalBusiness') || html.includes('@type":"HealthAndBeautyBusiness')) failures.push(`${route} contains local business schema before NAP approval`);
  if (route === 'contacto/index.html' && !html.includes('Un primer mensaje breve, práctico y respetuoso con tu privacidad')) failures.push('contact route does not render final-facing contact guidance');
  if (!html.includes('name="twitter:title"') || !html.includes('name="twitter:description"') || !html.includes('name="twitter:image"')) failures.push(`${route} is missing explicit Twitter metadata`);
  const unsafeUrls = collectRelevantUrls(html).filter((url) => isUnsafeRootAbsoluteRepositoryUrl(url));
  if (unsafeUrls.length > 0) failures.push(`${route} has root-absolute repository URLs outside ${baseHref}: ${unsafeUrls.join(', ')}`);
  verifyUrlContracts(route, html);
}

function verifyUrlContracts(route, html) {
  if (/pending-domain\.invalid|localhost|127\.0\.0\.1|http:\/\//i.test(html)) failures.push(`${route} contains a forbidden local/pending/non-HTTPS origin`);

  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1];
  if (!canonical) {
    failures.push(`${route} is missing a canonical URL`);
  } else {
    assertPagesUrl(route, canonical, 'canonical');
    const expectedPath = expectedCanonicalPath(route);
    if (expectedPath && new URL(canonical).pathname !== expectedPath) failures.push(`${route} canonical path is ${new URL(canonical).pathname}, expected ${expectedPath}`);
  }

  for (const match of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    let parsed;
    try {
      parsed = JSON.parse(match[1]);
    } catch {
      failures.push(`${route} has malformed JSON-LD`);
      continue;
    }
    for (const url of collectJsonUrls(parsed)) assertPagesUrl(route, url, 'JSON-LD');
  }
}

function expectedCanonicalPath(route) {
  if (route === '404.html') return `${pagesPath}/404`;
  const manifestRoute = publicRouteManifest.find((entry) => (entry.path === '' ? 'index.html' : `${entry.path}/index.html`) === route);
  return manifestRoute ? `${pagesPath}${manifestRoute.canonicalPath}` : null;
}

function assertPagesUrl(route, raw, label) {
  let url;
  try {
    url = new URL(raw);
  } catch {
    failures.push(`${route} has malformed ${label} URL: ${raw}`);
    return;
  }
  if (url.origin !== pagesUrl.origin) failures.push(`${route} has wrong ${label} origin: ${raw}`);
  if (url.pathname !== pagesPath && !url.pathname.startsWith(`${pagesPath}/`)) failures.push(`${route} has wrong ${label} base path: ${raw}`);
  if (!raw.startsWith(pagesSiteUrl)) failures.push(`${route} has wrong ${label} site URL: ${raw}`);
}

function collectJsonUrls(value) {
  if (typeof value === 'string') return /^https?:\/\//i.test(value) ? [value] : [];
  if (Array.isArray(value)) return value.flatMap(collectJsonUrls);
  if (value && typeof value === 'object') {
    return Object.entries(value)
      .filter(([key]) => key !== '@context')
      .flatMap(([, child]) => collectJsonUrls(child));
  }
  return [];
}

function collectRelevantUrls(html) {
  const urls = new Set();
  for (const match of html.matchAll(/<(?:img|script|link|source|a)[^>]+(?:src|href)="([^"]+)"/g)) urls.add(match[1]);
  for (const match of html.matchAll(/<source[^>]+srcset="([^"]+)"/g)) {
    for (const src of match[1].split(',')) urls.add(src.trim().split(/\s+/)[0] ?? '');
  }
  for (const match of html.matchAll(/url\((['"]?)([^)'"]+)\1\)/g)) urls.add(match[2]);
  return [...urls].filter(Boolean);
}

function isUnsafeRootAbsoluteRepositoryUrl(url) {
  if (!url.startsWith('/') || url.startsWith(baseHref)) return false;
  return true;
}

function* walk(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stats = statSync(path);
    if (stats.isDirectory()) yield* walk(path);
    else yield path;
  }
}

function hexEscapeNonAscii(value) {
  return [...value]
    .map((char) => {
      const code = char.codePointAt(0) ?? 0;
      if (code <= 127) return char;
      if (code <= 255) return `\\x${code.toString(16).toUpperCase().padStart(2, '0')}`;
      return `\\u${code.toString(16).toUpperCase().padStart(4, '0')}`;
    })
    .join('');
}

function readTextIfSafe(file) {
  const stats = statSync(file);
  if (stats.size > 2_000_000) return '';
  if (!/\.(html|js|css|txt|xml|json)$/i.test(file)) return '';
  return readFileSync(file, 'utf8');
}
