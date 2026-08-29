# Launch and rollback gates

The production artifact is configured for `https://hilandofinopsicologia.com/` with indexable metadata. Preview mode remains available and is explicitly selected with `PAGES_PREVIEW=true`.

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
| `CONTACT_PROVIDER=approved-email` | Yes | Confirms provider/DPA approval |
| `CONTACT_SMTP_HOST` | Yes | SMTP submission host, e.g. `smtp.dondominio.com` |
| `CONTACT_SMTP_USER` | Yes | Authenticating mailbox; also the default envelope sender |
| `CONTACT_SMTP_PASSWORD` | Yes | Mailbox password. Rejected if shorter than 8 characters or if it starts like an example placeholder |
| `CONTACT_SMTP_TO` | Yes | Mailbox that receives the enquiries |
| `CONTACT_SMTP_PORT` | No | Defaults to `465` (implicit TLS). Use `587` for STARTTLS |
| `CONTACT_SMTP_SECURE` | No | Defaults to `true` only on port 465. Overrides the port-derived choice |
| `CONTACT_SMTP_FROM` | No | Envelope sender when it differs from `CONTACT_SMTP_USER`; must stay a mailbox the domain is allowed to send as |
| `HILANDO_FINO_SITE_URL` | Before indexation | Sets canonical/sitemap production origin |

Every `CONTACT_SMTP_*` requirement is all-or-nothing: if any required value is missing, malformed, or placeholder-shaped, `readSmtpConfig` returns `null` and contact stays disabled rather than accepting submissions it would silently drop. A misconfigured mailbox is therefore visible in the logs as `contact_provider_failure { provider: 'disabled' }`; a real delivery failure reports `provider: 'smtp'`.

## Contact architecture gate

Live multi-instance contact is blocked until shared CSRF replay state or sticky-session architecture is approved. The current one-time CSRF replay registry is in-process. That is acceptable only for disabled contact, local verification, or a single-instance preview where `CONTACT_ENABLED=false`.

Do not set `CONTACT_ENABLED=true` on GitHub Pages or any static preview. GitHub Pages cannot run the Express `/api/contact` boundary; the preview must remain visibly disabled and degraded-safe.

`CONTACT_ENABLED=true` alone is **not** a working activation path. The form submits and the SMTP provider delivers, but live contact still needs every approval above: legal text, retention, provider/DPA, an HTTPS/proxy deployment, and single-instance hosting. Missing any of them keeps the endpoint at `503`.

## Where the form degrades

The browser never assumes `/api/contact` exists. Any unreachable, non-JSON, or `5xx` answer — which is exactly what GitHub Pages returns, since the Express bundle is excluded from that artifact — collapses into one visitor-facing outcome: the status line names `info@hilandofinopsicologia.com` and renders it as a `mailto:` link. The static preview is therefore usable rather than a dead end, and no deployment can leave a visitor with nowhere to write.

This means the contact form only *sends* where the Express server actually runs. GitHub Pages serves the site; it cannot serve the API. Running live contact requires a Node host for `dist/hilando-fino/server/server.mjs` with the environment above.

### Site and API must share one origin

Splitting them — site on Pages, API elsewhere — does not work and cannot be made to work by configuration. The CSRF cookie is issued `HttpOnly; SameSite=Lax; Path=/api/contact`, and the browser sends it with `credentials: 'same-origin'`. A cross-origin submission never carries that cookie, so `verifyCsrfSubmission` rejects every request. The Express server already serves the prerendered routes and static assets, so the Node host serves the whole site and `hilandofinopsicologia.com` points at it.

### Single instance is a correctness requirement

`CONTACT_DEPLOYMENT_MODE=single-instance` is not a cost preference. `issueCsrfToken` records each token in an in-process `Map` and `verifyCsrfSubmission` refuses any token absent from it, so a token issued by one instance and submitted to another is rejected. Two instances break roughly half of all submissions; serverless and autoscaling targets are ruled out entirely until that registry is shared.

`render.yaml` in the repository root encodes all of the above as a Render Blueprint: one always-on instance in Frankfurt, the approval variables inline, and every secret marked `sync: false` so it is entered in the dashboard rather than committed.

## Verifying the configuration

The server prints its contact readiness once at boot, so a misconfiguration is visible immediately instead of after a visitor's message is already lost:

```
contact_readiness { ready: false, blockedBy: [ 'smtp_config_incomplete' ] }
```

Reason codes only — never values. `contact_not_enabled` means `CONTACT_ENABLED` is not `true`; the rest map to the approval and credential checks above.

Nothing in this project reads a `.env` file automatically. `npm run serve:prerender` starts the built server with the ambient environment only, which is what the e2e suite depends on. For a local run with credentials, use `npm run serve:local`, which loads `.env` and then `.env.local` through Node's own `--env-file-if-exists`. `npm start` runs `ng serve`, which does not start the Express server at all, so `/api/contact` does not exist there.

Generate the CSRF secret directly into an ignored local env file; do not paste reusable examples into source or print real project secrets in logs:

The runtime validator applies a conservative decoded-byte deployment guard after the 32-byte minimum: it rejects obvious all-zero, repeated-byte, short-cycle, simple-counter, and very low unique-byte material. This is only an entropy proxy; software cannot prove a pasted value was generated randomly. The safe command below remains the recommended source of contact CSRF secrets.

```bash
umask 077
node -e "const {randomBytes}=require('node:crypto'); require('node:fs').appendFileSync('.env.local', 'CONTACT_CSRF_SECRET=base64:'+randomBytes(32).toString('base64')+'\n')"
```

## Runtime model

The current delivery is static-prerender plus Express API, not runtime SSR. Known prerendered route files are served directly. Unknown paths return a real HTTP `404` with safe `noindex` metadata instead of falling back to the home page. See `docs/architecture/runtime-model.md`.

## GitHub Pages production and preview

- Workflow: `.github/workflows/ci.yml`.
- Triggers: pushes to `master` and manual `workflow_dispatch`; pull requests run quality gates without deploying.
- Artifact command: `npm run build:pages && npm run verify:pages`.
- Production base URL: `/` on `https://hilandofinopsicologia.com`.
- Optional preview base URL: set `PAGES_BASE_HREF` and `PAGES_SITE_URL` together with `PAGES_PREVIEW=true`.
- Artifact path: `dist/hilando-fino/browser` only.
- Excluded from deploy by construction: Express server bundle, contact backend runtime, `.env` files, source maps, secrets, and server health data.
- Production status: `index, follow`, `Allow: /`, and sitemap URLs use the custom domain.
- Preview status: draft/noindex, `Disallow: /`, and no LocalBusiness/NAP/contact submission.
- Preview banner/status copy must stay conspicuous and non-clinical: the site is a draft, not an emergency service, not diagnosis/triage, and not a production contact intake.
- Static `404.html`: noindex, canonical `/404`, and does not masquerade as the home page.
- Post-deploy smoke uses `${{ steps.deployment.outputs.page_url }}` to verify HTTP success, production indexing metadata, custom-domain origins, assets, a required route sample, and safe 404 behavior.

GitHub Pages cannot enforce the apex HTTP-to-HTTPS redirect from repository code. Canonical, Open Graph, JSON-LD, sitemap, and robots origins are HTTPS, but the redirect itself must be enabled and verified in GitHub Pages custom-domain settings and DNS.

## Verification commands

- `npm run performance:smoke` builds with the pinned Node runtime, starts the built static-prerender server on a controlled free local port, waits for readiness, runs a Playwright navigation smoke, and always cleans up. It is still not Lighthouse/CWV.
- `npm run lighthouse` runs real Lighthouse lab budgets on the built server. Lighthouse lab output must not be reported as INP; INP requires approved launch monitoring or field data.
- Lighthouse Chrome cleanup uses bounded retries. A real cleanup leak fails the gate; expected Windows timing is retried instead of silently hidden.
- `npm run build:pages` prepares the production static GitHub Pages artifact; use `PAGES_PREVIEW=true` for the explicit preview policy.
- `npm run verify:pages` checks every prerendered HTML file for the selected base href, canonical/JSON-LD origin, Twitter metadata, local/pending origins, indexability policy, sitemap/robots, favicon, required routes, disabled contact, safe static 404, and absence of sensitive/server files.
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
