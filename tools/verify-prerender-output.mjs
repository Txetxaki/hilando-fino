import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { publicRouteManifest } from '../src/app/content/public-routes.ts';

const browserDir = join(process.cwd(), 'dist', 'hilando-fino', 'browser');
const routes = [
  ...publicRouteManifest
    .filter((route) => ['home', 'about', 'method', 'interventions', 'local', 'workshops'].includes(route.pageKey))
    .map((route) => [route.path === '' ? 'index.html' : `${route.path}/index.html`, route.pageKey])
];
const expectedContent = {
  home: 'Hilando Fino Psicología',
  about: 'Sobre Marta Martín',
  method: 'Cómo trabajo',
  interventions: 'Áreas de intervención',
  local: 'Psicología en Ciudad Real',
  workshops: 'Talleres'
};

const failures = [];
for (const [file, expected] of routes) {
  const path = join(browserDir, file);
  if (!existsSync(path)) {
    failures.push(`${file} is missing`);
    continue;
  }
  const html = readFileSync(path, 'utf8');
  if (!html.includes(expectedContent[expected])) failures.push(`${file} does not contain ${expectedContent[expected]}`);
  if (!html.includes('name="robots" content="noindex, nofollow"')) failures.push(`${file} is not draft-safe noindex`);
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Static-prerender output is crawlable and draft-safe.');
