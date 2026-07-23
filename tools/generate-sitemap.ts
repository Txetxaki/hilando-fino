import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { approvedSitemapPages } from '../src/app/content/content-matrix';

const siteUrl = process.env['HILANDO_FINO_SITE_URL'] ?? 'https://pending-domain.invalid';
const publicDir = join(process.cwd(), 'public');
mkdirSync(publicDir, { recursive: true });

const urls = approvedSitemapPages
  .map((page) => `  <url><loc>${siteUrl}${page.canonicalPath}</loc><changefreq>monthly</changefreq></url>`)
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
const robots = approvedSitemapPages.length > 0
  ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
  : `User-agent: *\nDisallow: /\n\n# Draft-safe default: no verified-publishable routes with approval metadata yet.\nSitemap: ${siteUrl}/sitemap.xml\n`;

write(publicDir, 'sitemap.xml', sitemap);
write(publicDir, 'robots.txt', robots);

function write(dir: string, filename: string, contents: string): void {
  const path = join(dir, filename);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, contents, 'utf8');
}
