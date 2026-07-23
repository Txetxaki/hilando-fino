import { execFileSync } from 'node:child_process';

const expectedPaths = [
  '.env.example',
  '.github/workflows/ci.yml',
  '.gitignore',
  '.node-version',
  '.nvmrc',
  'DESIGN.md',
  'IMG_0742.JPG',
  'README.md',
  'angular.json',
  'claude-project/como-configurar-el-project.md',
  'claude-project/conocimiento-01-sobre-marta-y-la-consulta.md',
  'claude-project/conocimiento-02-tono-de-voz-y-estilo.md',
  'claude-project/conocimiento-03-publico-y-mensajes-clave.md',
  'claude-project/instrucciones-personalizadas.md',
  'code.html',
  'docs/architecture/future-bounded-contexts.md',
  'docs/architecture/runtime-model.md',
  'docs/deployment/launch-and-rollback.md',
  'docs/review/change-inventory.md',
  'docs/review/size-exception-review-guide.md',
  'eslint.config.js',
  'identidad-de-marca/guia-de-marca.md',
  'logo.png',
  'openspec/changes/archive/.gitkeep',
  'openspec/changes/marta-digital-practice-platform/design.md',
  'openspec/changes/marta-digital-practice-platform/exploration.md',
  'openspec/changes/marta-digital-practice-platform/proposal.md',
  'openspec/changes/marta-digital-practice-platform/specs/content-approval-system/spec.md',
  'openspec/changes/marta-digital-practice-platform/specs/local-seo-content-architecture/spec.md',
  'openspec/changes/marta-digital-practice-platform/specs/privacy-contact-and-launch-gates/spec.md',
  'openspec/changes/marta-digital-practice-platform/specs/public-website-foundation/spec.md',
  'openspec/changes/marta-digital-practice-platform/tasks.md',
  'openspec/changes/marta-digital-practice-platform/verify-report.md',
  'openspec/config.yaml',
  'openspec/specs/.gitkeep',
  'package-lock.json',
  'package.json',
  'playwright.config.ts',
  'public/robots.txt',
  'public/sitemap.xml',
  'screen.png',
  'server.ts',
  'src/app/app.component.ts',
  'src/app/app.config.server.ts',
  'src/app/app.config.ts',
  'src/app/app.routes.server.ts',
  'src/app/app.routes.ts',
  'src/app/contact/contact-page.component.ts',
  'src/app/contact/contact.constants.ts',
  'src/app/contact/contact.types.ts',
  'src/app/content/content-matrix.ts',
  'src/app/content/content.spec.ts',
  'src/app/content/hub-labels.ts',
  'src/app/content/legal-copy.ts',
  'src/app/content/not-found.ts',
  'src/app/content/public-routes.ts',
  'src/app/content/treatment-index.spec.ts',
  'src/app/content/treatment-index.ts',
  'src/app/content/treatment-pages.ts',
  'src/app/content/treatment-types.ts',
  'src/app/content/types.ts',
  'src/app/core/analytics/analytics.service.ts',
  'src/app/core/analytics/analytics.spec.ts',
  'src/app/core/analytics/analytics.types.ts',
  'src/app/core/seo/schema.spec.ts',
  'src/app/core/seo/schema.ts',
  'src/app/core/seo/seo.service.ts',
  'src/app/pages/legal-page.component.ts',
  'src/app/pages/not-found.component.ts',
  'src/app/pages/page-data.ts',
  'src/app/pages/standard-page.component.ts',
  'src/app/pages/treatment-page.component.ts',
  'src/environments/site-config.pages.ts',
  'src/environments/site-config.ts',
  'src/index.html',
  'src/main.server.ts',
  'src/main.ts',
  'src/server/app.ts',
  'src/server/contact/contact.spec.ts',
  'src/server/contact/csrf.ts',
  'src/server/contact/handler.ts',
  'src/server/contact/provider.ts',
  'src/server/contact/rate-limit.ts',
  'src/server/contact/security-policy.ts',
  'src/server/contact/validation.ts',
  'src/styles.scss',
  'tests/e2e/accessibility.spec.ts',
  'tests/e2e/public-routes.spec.ts',
  'tools/build-pages.mjs',
  'tools/generate-sitemap.ts',
  'tools/lighthouse-budget.mjs',
  'tools/pages-smoke.mjs',
  'tools/performance-smoke.mjs',
  'tools/server-lifecycle.mjs',
  'tools/server-lifecycle.spec.mjs',
  'tools/verify-change-inventory.mjs',
  'tools/verify-pages-artifact.mjs',
  'tools/verify-prerender-output.mjs',
  'tsconfig.app.json',
  'tsconfig.json',
  'tsconfig.spec.json',
  'vitest.config.ts'
];

const ignoredTopLevelAllowlist = [
  '.angular',
  '.atl',
  'coverage',
  'dist',
  'node_modules',
  'playwright-report',
  'stitch_psicolog_a_mart_n_filo.zip',
  'test-results'
];

const actualPaths = git(['ls-files', '--cached', '--others', '--exclude-standard']).split('\n').filter(Boolean).sort();
const expected = [...expectedPaths].sort();

const missing = expected.filter((path) => !actualPaths.includes(path));
const unexpected = actualPaths.filter((path) => !expected.includes(path));

if (missing.length || unexpected.length) {
  if (missing.length) console.error(`Missing intended paths:\n${missing.map((path) => `  - ${path}`).join('\n')}`);
  if (unexpected.length) console.error(`Unexpected non-ignored paths:\n${unexpected.map((path) => `  - ${path}`).join('\n')}`);
  process.exit(1);
}

const zipPath = 'stitch_psicolog_a_mart_n_filo.zip';
if (!isIgnored(zipPath)) {
  console.error(`${zipPath} must stay ignored/local-only.`);
  process.exit(1);
}

if (actualPaths.includes(zipPath)) {
  console.error(`${zipPath} must not be tracked, staged, or included in the review inventory.`);
  process.exit(1);
}

const ignoredPaths = git(['ls-files', '--others', '-i', '--exclude-standard']).split('\n').filter(Boolean);
const unexpectedIgnoredTopLevel = [...new Set(ignoredPaths.map(topLevelPath).filter((path) => !isAllowedIgnoredTopLevel(path)))].sort();
if (unexpectedIgnoredTopLevel.length) {
  console.error(`Unexpected ignored top-level artifacts:\n${unexpectedIgnoredTopLevel.map((path) => `  - ${path}`).join('\n')}`);
  process.exit(1);
}

console.log(`Inventory verified: ${expected.length} intended paths; ignored top-level artifacts match the documented allowlist; raw Stitch ZIP is ignored/local-only and absent from staged/tracked inventory.`);

function git(args) {
  return execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).replace(/\r\n/g, '\n').trim();
}

function isIgnored(path) {
  try {
    execFileSync('git', ['check-ignore', '-q', path], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function topLevelPath(path) {
  const [first] = path.split('/');
  return first ?? path;
}

function isAllowedIgnoredTopLevel(path) {
  return ignoredTopLevelAllowlist.includes(path) || path === '.env' || path.startsWith('.env.');
}
