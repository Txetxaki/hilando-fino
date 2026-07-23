# Size-exception review guide

The maintainer explicitly accepted a `size:exception` for this first website delivery. This guide makes the oversized diff reviewable without pretending it is small.

## Recommended review order

1. **Architecture/runtime first**: `docs/architecture/runtime-model.md`, `server.ts`, `tools/server-lifecycle.mjs`, `package.json`.
2. **Security and privacy boundary**: `src/server/contact/**`, `src/app/core/analytics/**`, `src/app/contact/**`.
3. **Publication safety**: `.github/workflows/ci.yml`, `tools/build-pages.mjs`, `tools/verify-pages-artifact.mjs`, `tools/pages-smoke.mjs`, `docs/deployment/launch-and-rollback.md`, `docs/review/change-inventory.md`.
4. **Route/content ownership**: `src/app/content/**`, `src/app/pages/**`, `src/app/app.routes*.ts`.
5. **Quality gates and tests**: `src/**/*.spec.ts`, `tests/e2e/**`, `tools/lighthouse-budget.mjs`, `tools/performance-smoke.mjs`.

## Architecture/security hot spots

- Static-prerender + Express API is the current model; runtime SSR is not claimed.
- Live contact is fail-closed unless HTTPS/proxy/single-instance/provider/retention prerequisites are approved.
- CSRF and rate-limit state are in-memory, bounded, and acceptable only for disabled/single-instance preview.
- Analytics routes are normalized to the route manifest before storage; query strings and fragments are stripped.
- GitHub Pages is public even if the repository is private; `noindex` is not access control.

## Generated/reference files

- Review `docs/review/change-inventory.md` before staging so source, generated/lockfile, SDD, binary/reference assets, and excluded local-only artifacts are accounted for.
- Treat `code.html`, `screen.png`, `DESIGN.md`, `IMG_0742.JPG`, `identidad-de-marca/**`, and `claude-project/**` as source/reference material, not deploy output.
- Treat `stitch_psicolog_a_mart_n_filo.zip` as an ignored local-only raw Stitch export; it is redundant with `code.html`, `screen.png`, and `DESIGN.md` and should not be deleted from the user's workspace.
- Treat `dist/**`, coverage, browser traces, and local reports as generated artifacts; they should not be committed unless explicitly needed.
- `package-lock.json` is intentional and should be reviewed as dependency/runtime lock evidence, especially the pinned `node@24.15.0` package.

## Verification sequence

Run in this order before commit/push:

```bash
git status --short
git diff --check
npm run verify:inventory
npm audit --audit-level=moderate
npm audit --omit=dev
npm run lint
npm run typecheck
npm test
npm run build
npm run verify:prerender
npm run build:pages
npm run verify:pages
npm run performance:smoke
npm run e2e
npm run a11y
npm run lighthouse
```

After staging, run `npm run verify:inventory`, `git diff --cached --check`, `git diff --cached --stat`, and `git diff --cached --name-status` to verify the complete staged inventory and whitespace. `git diff` alone does not show untracked files. Also inspect `.github/workflows/ci.yml` for immutable action SHAs and ensure no secrets/server bundles are staged into the Pages artifact.

## Rollback boundaries

- Disable contact immediately with `CONTACT_ENABLED=false`.
- For Pages, redeploy a known-good SHA from GitHub Actions or revert/fix-forward the Pages workflow and rerun `workflow_dispatch`.
- If route/content facts become unsafe, keep the preview draft/noindex and remove the route from approved publication metadata rather than enabling indexation.
- If CI deployment breaks, keep source changes local; do not push until `build:pages`, `verify:pages`, and post-deploy smoke logic pass.

## Intentionally blocked

- Tasks 6.1–6.4 remain unchecked: final copy approval, LocalBusiness/NAP/GBP/citations, real contact submissions, and production launch.
- GitHub Pages preview remains disabled-contact/noindex and non-clinical.
- No booking, CRM, payment, patient records, diagnosis, triage, session recording, or patient-data AI is included.
