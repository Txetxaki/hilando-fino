# Launch and rollback gates

The website is implemented in draft-safe mode. Public launch remains blocked until Marta/legal approval is complete.

> **Public preview warning:** GitHub Pages is publicly viewable even when the source repository is private. `noindex` reduces indexing signals but is not access control. Do not deploy secrets, patient data, private clinical notes, or unapproved production claims.

## Required launch approvals

- [ ] Marta verifies credentials, professional registration number, qualifications, service areas, modalities, exclusions, and contact channels.
- [ ] Legal notice, privacy policy, cookies policy, provider terms, DPA/hosting, and retention are approved.
- [ ] NAP data is identical across website, Google Business Profile, citations, and legal pages.
- [ ] Clinical/deontological review approves public copy and intervention taxonomy.
- [ ] SEO review confirms unique metadata, canonical rules, sitemap inclusion, no doorway pages, and no keyword stuffing.
- [ ] Accessibility, performance, build, static-prerender, analytics-safety, and contact privacy checks pass.

## Environment contract

| Variable | Required for live contact | Purpose |
|---|---:|---|
| `CONTACT_ENABLED=true` | Yes | Enables server acceptance after all approvals |
| `CONTACT_RETENTION_APPROVED=true` | Yes | Confirms retention policy is approved |
| `CONTACT_CSRF_SECRET` | Yes | Explicit random secret in `base64:<32+ random bytes>` or `hex:<64+ random hex characters>` format; signs one-time CSRF tokens |
| `CONTACT_CSRF_TTL_SECONDS` | No | CSRF token lifetime; defaults to 1800 seconds |
| `CONTACT_RUNTIME_APPROVED=true` | Yes | Explicit approval that live contact may run |
| `CONTACT_DEPLOYMENT_MODE=single-instance` | Yes | Confirms the current in-memory replay model is safe for the live target |
| `CONTACT_PUBLIC_ORIGIN=https://...` | Yes | Enforces HTTPS public origin for live contact cookies |
| `CONTACT_TRUST_PROXY=true` | Yes | Confirms proxy/TLS forwarding has been configured intentionally |
| `CONTACT_PROVIDER=approved-email` | Yes | Confirms provider/DPA approval; current implementation still rejects until a real provider change lands |
| `HILANDO_FINO_SITE_URL` | Before indexation | Sets canonical/sitemap production origin |

## Contact architecture gate

Live multi-instance contact is blocked until shared CSRF replay state or sticky-session architecture is approved. The current one-time CSRF replay registry is in-process. That is acceptable only for disabled contact, local verification, or a single-instance preview where `CONTACT_ENABLED=false`.

Do not set `CONTACT_ENABLED=true` on GitHub Pages or any static preview. GitHub Pages cannot run the Express `/api/contact` boundary; the preview must remain visibly disabled and degraded-safe.

`CONTACT_ENABLED=true` alone is **not** a working activation path. The current UI intentionally does not submit, and the provider implementation always rejects. Live contact needs a separate implementation/approval change for legal text, retention, provider/DPA, secure HTTPS/proxy deployment, and either single-instance approval or shared replay storage.

Generate the CSRF secret directly into an ignored local env file; do not paste reusable examples into source or print real project secrets in logs:

The runtime validator applies a conservative decoded-byte deployment guard after the 32-byte minimum: it rejects obvious all-zero, repeated-byte, short-cycle, simple-counter, and very low unique-byte material. This is only an entropy proxy; software cannot prove a pasted value was generated randomly. The safe command below remains the recommended source of contact CSRF secrets.

```bash
umask 077
node -e "const {randomBytes}=require('node:crypto'); require('node:fs').appendFileSync('.env.local', 'CONTACT_CSRF_SECRET=base64:'+randomBytes(32).toString('base64')+'\n')"
```

## Runtime model

The current delivery is static-prerender plus Express API, not runtime SSR. Known prerendered route files are served directly. Unknown paths return a real HTTP `404` with safe `noindex` metadata instead of falling back to the home page. See `docs/architecture/runtime-model.md`.

## GitHub Pages preview

- Workflow: `.github/workflows/ci.yml`.
- Triggers: pushes to `master` and manual `workflow_dispatch`; pull requests run quality gates without deploying.
- Artifact command: `npm run build:pages && npm run verify:pages`.
- Base URL: `/hilando-fino/` for repository Pages.
- Artifact path: `dist/hilando-fino/browser` only.
- Excluded from deploy by construction: Express server bundle, contact backend runtime, `.env` files, source maps, secrets, and server health data.
- Preview status: draft/noindex; no LocalBusiness/NAP/contact submission.
- Preview banner/status copy must stay conspicuous and non-clinical: the site is a draft, not an emergency service, not diagnosis/triage, and not a production contact intake.
- Static `404.html`: noindex, canonical `/404`, and does not masquerade as the home page.
- Post-deploy smoke uses `${{ steps.deployment.outputs.page_url }}` to verify HTTP success, noindex, repository-base assets/logo, a required route sample, and safe 404 behavior.

## Verification commands

- `npm run performance:smoke` builds with the pinned Node runtime, starts the built static-prerender server on a controlled free local port, waits for readiness, runs a Playwright navigation smoke, and always cleans up. It is still not Lighthouse/CWV.
- `npm run lighthouse` runs real Lighthouse lab budgets on the built server. Lighthouse lab output must not be reported as INP; INP requires approved launch monitoring or field data.
- Lighthouse Chrome cleanup uses bounded retries. A real cleanup leak fails the gate; expected Windows timing is retried instead of silently hidden.
- `npm run build:pages` prepares the safe static GitHub Pages artifact.
- `npm run verify:pages` checks every prerendered HTML file for Pages base href, canonical/JSON-LD origin `https://txetxaki.github.io/hilando-fino`, malformed URLs, local/pending origins, required routes, draft noindex, disabled contact, safe static 404, and absence of sensitive/server files.
- `npm run pages:smoke -- --artifact-dir dist/hilando-fino/browser` runs the post-deploy smoke contract against the local Pages artifact when a deployed `page_url` is not available.
- `npm run verify:inventory` reconciles the exact intended tracked/untracked path manifest before or after staging and proves the raw Stitch ZIP remains ignored/local-only.

## Rollback notes

1. Set `CONTACT_ENABLED=false` or remove it to disable submissions immediately.
2. For Pages, find the last known-good commit SHA. GitHub's `workflow_dispatch` API only accepts a branch/tag ref, not a raw commit SHA, so either create/push a branch or tag pointing at that SHA and dispatch the workflow against that ref, or use the revert/fix-forward fallback: revert or fix-forward the failing change on the normal branch and rerun the Pages job.
3. Regenerate sitemap/robots in draft-safe mode if publication facts become invalid.
4. To roll back the treatment-page correction only, remove `src/app/content/treatment-*`, `src/app/content/legal-copy.ts`, `src/app/content/hub-labels.ts`, and `src/app/pages/treatment-page.component.ts`, then return hubs/navigation/sitemap/schema tests to the hub-only model.
5. Revert only the public-web delivery; keep OpenSpec and source documentation intact.
6. Do not remove brand/reference sources (`code.html`, `screen.png`, `DESIGN.md`, `IMG_0742.JPG`, `identidad-de-marca/**`, `claude-project/**`).

## Known follow-ups before full launch

- Express `trust proxy` is never configured; if `CONTACT_TRUST_PROXY=true` is ever flipped without also correctly configuring `app.set('trust proxy', ...)` for the real deployment topology, the rate limiter collapses to one shared bucket for all visitors. Dormant today (contact stays disabled); needs real deployment topology info before it is safe to configure.
- No `Content-Security-Policy`/`Strict-Transport-Security` headers on Express responses yet. Defense-in-depth gap, no active exploit found; deferred until a dedicated testing pass to avoid breaking the app.
- No Angular `ErrorHandler`/production error observability for client-side exceptions yet. Needs a privacy-conscious decision on whether/how to capture client errors for a health-adjacent site before implementing.
- The treatment-page e2e test bundles all 36 live navigations into one un-isolated Playwright test. Coverage works today; splitting it into per-page tests is a nice-to-have refactor, not scheduled yet.
