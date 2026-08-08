import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { publicRouteManifest } from '../src/app/content/public-routes.ts';
import { allContentPages } from '../src/app/content/content-matrix.ts';

const browserDir = join(process.cwd(), 'dist', 'hilando-fino', 'browser');
const draftNoindex = process.env['SEO_EXPECT_DRAFT_NOINDEX'] === 'true';
const expectedRobots = draftNoindex ? 'noindex, nofollow' : 'index, follow';
const expectedContent = new Map(allContentPages.map((page) => [page.key, page.h1]));
const routes = publicRouteManifest.map((route) => [route.path === '' ? 'index.html' : `${route.path}/index.html`, route.pageKey]);

const failures = [];
for (const [file, expected] of routes) {
  const path = join(browserDir, file);
  if (!existsSync(path)) {
    failures.push(`${file} is missing`);
    continue;
  }
  const html = readFileSync(path, 'utf8');
  const expectedText = expectedContent.get(expected);
  if (!expectedText || !html.includes(expectedText)) failures.push(`${file} does not contain ${expectedText ?? expected}`);
  if (!html.includes(`name="robots" content="${expectedRobots}"`)) failures.push(`${file} does not emit ${expectedRobots}`);
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Static-prerender output passed with ${expectedRobots} metadata.`);
