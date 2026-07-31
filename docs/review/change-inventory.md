# Change inventory for size-exception review

This private-repository preview is still a public GitHub Pages draft when deployed. Review the inventory with `git status --short` before staging and `git diff --cached --stat` / `git diff --cached --name-status` after staging so untracked files are not silently omitted.

Run `npm run verify:inventory` before staging and again after staging. It compares `git ls-files --cached --others --exclude-standard` against the exact intended manifest in `tools/verify-change-inventory.mjs`; unexpected non-ignored files or missing intended files fail the check. It also reconciles ignored top-level artifacts against the documented allowlist below, so a new ignored local artifact cannot hide from review by accident.

## Top-level, config, workflow, and public files

- `.github/workflows/ci.yml` — pinned GitHub Actions quality and Pages preview workflow.
- `.gitignore` — excludes generated/local artifacts and explicitly keeps the raw Stitch ZIP local-only.
- `.env.example` — intentionally non-usable contact/env template; no reusable CSRF secret value is committed.
- `.node-version`, `.nvmrc` — Node runtime pin.
- `package.json`, `package-lock.json` — scripts, dependency manifest, and lockfile/audit evidence.
- `angular.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.spec.json`, `eslint.config.js`, `vitest.config.ts`, `playwright.config.ts` — Angular/static-prerender, TypeScript, lint, unit, and browser-test configuration.
- `README.md` — operator-facing command summary and draft-safe runtime notes.
- `public/robots.txt`, `public/sitemap.xml` — generated public search artifacts for draft/noindex-safe prerender output.

## Source application and server files

- `package.json`, `package-lock.json`, `angular.json`, `tsconfig*.json`, `eslint.config.js`, `vitest.config.ts`, `playwright.config.ts`, `.node-version`, `.nvmrc` — Angular 22 workspace, deterministic Node/npm/tooling, dependency lock evidence.
- `server.ts`, `src/server/**` — Express static-prerender server, 404 contract, contact API validation, CSRF, rate limiting, provider boundary, security policy constants.
- `src/app/**`, `src/environments/**`, `src/styles.scss`, `src/index.html`, `src/main*.ts` — public routes, content registry, typed treatment source (36 pages across five sector hubs), generic treatment renderer, SEO/schema, analytics no-op adapter, contact UI, Pages site-origin configuration.
- `tests/e2e/**` — Playwright route and accessibility checks.
- `tools/**` — sitemap, build, verification, performance, Lighthouse, Pages artifact and smoke scripts.

## Documentation and SDD artifacts

- `README.md`, `docs/architecture/**`, `docs/deployment/**`, `docs/review/**` — current runtime, deployment, rollback, public-preview risk, review guide, and this inventory.
- `openspec/**` — SDD planning trail and task/apply status. Tasks 6.1–6.4 remain unchecked by design.

## Binary/reference assets intended for review

- `logo.png` — brand master logo, kept as the source for the pre-scaled `public/images/logo-*` variants the header actually serves; not shipped in the Pages artifact.
- `IMG_0742.JPG`, `screen.png` — reference assets for approved-source facts and Stitch visual migration.
- `code.html`, `DESIGN.md`, `identidad-de-marca/**`, `claude-project/**` — source/reference material, not generated deploy output.

## Generated/lockfile artifacts

- `package-lock.json` is intentional and must be reviewed with dependency changes and audit output.
- `dist/**` — Angular build and static-prerender output; generated/local only.
- `node_modules/**` — installed dependencies; generated/local only.
- `.angular/**` — Angular CLI build cache; generated/local only.
- `coverage/**` — Vitest coverage output; generated/local only.
- `test-results/**` — Playwright/test run traces and state; generated/local only.
- `playwright-report/**` — Playwright HTML report; generated/local only.
- `.atl/**` — local agent/team planning cache; local-only and not part of the product/review payload.
- `tools/verify-change-inventory.mjs` is the executable manifest used by `npm run verify:inventory`; update it whenever an intended source/config/docs path is added or removed.

## Excluded local-only artifacts

- `stitch_psicolog_a_mart_n_filo.zip` is a local raw Stitch export. It is redundant with committed review sources (`code.html`, `screen.png`, `DESIGN.md`) and is intentionally ignored rather than deleted from the user's workspace. `npm run verify:inventory` fails if it is not ignored or if it appears in the tracked/staged review inventory.
- `.env` and `.env.*` remain excluded except `.env.example`; no private credentials should appear in committed source or Pages artifacts.
