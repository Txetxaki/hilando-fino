import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { buildPrerenderedApp } from './server-lifecycle.mjs';
import { renderNotFoundHtml } from '../src/app/content/not-found.ts';

const baseHref = '/hilando-fino/';
const siteUrl = process.env['PAGES_SITE_URL'] ?? 'https://txetxaki.github.io/hilando-fino';
const browserDir = join(process.cwd(), 'dist', 'hilando-fino', 'browser');

await buildPrerenderedApp({ baseHref, siteUrl, configuration: 'pages' });
mkdirSync(browserDir, { recursive: true });
removeCsrFallbackTemplate(browserDir);
rewriteHtmlUrlsForRepositoryBase(browserDir, baseHref);
writeFileSync(join(browserDir, '.nojekyll'), '', 'utf8');
writeFileSync(join(browserDir, '404.html'), renderNotFoundHtml({ siteUrl, baseHref, includeBase: true }), 'utf8');

console.log(`GitHub Pages artifact prepared in ${browserDir} with base href ${baseHref}.`);

function rewriteHtmlUrlsForRepositoryBase(dir, base) {
  for (const file of walk(dir)) {
    if (!file.endsWith('.html')) continue;
    const html = readFileSync(file, 'utf8')
      .replace(/\b(href|src)="\/(?!hilando-fino\/)([^"#]*)/g, `$1="${base}$2`)
      .replace(/\b(srcset)="\/(?!hilando-fino\/)([^"#]*)/g, `$1="${base}$2`);
    writeFileSync(file, html, 'utf8');
  }
}

function removeCsrFallbackTemplate(dir) {
  const csrTemplate = join(dir, 'index.csr.html');
  if (existsSync(csrTemplate)) rmSync(csrTemplate);
}

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stats = statSync(path);
    if (stats.isDirectory()) yield* walk(path);
    else yield path;
  }
}
