import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { approvedSitemapPages, previewSitemapPages } from '../src/app/content/content-matrix';

const siteUrl = process.env['HILANDO_FINO_SITE_URL'] ?? 'https://hilandofinopsicologia.com';
const draftNoindex = process.env['HILANDO_FINO_DRAFT_NOINDEX'] === 'true';
const publicDir = join(process.cwd(), 'public');
mkdirSync(publicDir, { recursive: true });

const sitemapPages = draftNoindex ? previewSitemapPages : approvedSitemapPages;
const urls = sitemapPages
  .map((page) => `  <url><loc>${siteUrl}${page.canonicalPath}</loc><changefreq>monthly</changefreq></url>`)
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
const robots = draftNoindex
  ? `User-agent: *\nDisallow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
  : `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

write(publicDir, 'sitemap.xml', sitemap);
write(publicDir, 'robots.txt', robots);

function write(dir: string, filename: string, contents: string): void {
  const path = join(dir, filename);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, contents, 'utf8');
}
