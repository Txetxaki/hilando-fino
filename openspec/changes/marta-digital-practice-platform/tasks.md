# Tasks: Marta Digital Practice Platform

## Review Workload Forecast

| Field | Value |
|---|---|
| Estimated changed lines | 4,000-7,000 changed lines |
| 800-line budget risk | High |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |
| Suggested split | PR1 workspace/quality → PR2 content model → PR3 UI/routes → PR4 SEO/perf → PR5 contact/privacy → PR6 gates/deploy |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High
800-line budget risk: High

### Resolved Apply Decision

- Delivery strategy used by apply: `exception-ok`.
- Maintainer explicitly accepted `size:exception` for one oversized single delivery.
- Chain strategy not used for this apply because the accepted exception overrides the chained recommendation for this delivery only.
- Corrective apply evidence restored real 404 behavior, bound CSRF, honest static-prerender docs, deterministic Node pinning, real Lighthouse lab budgets, route-level lazy loading, and unique topic summaries before keeping technical tasks checked.
- Continuation remediation added deterministic standalone `performance:smoke`, GitHub Pages preview CI for `master`/manual dispatch, repository base URL `/hilando-fino/`, static artifact verification, noindex static 404, and explicit multi-instance contact blocking. Tasks 6.1-6.4 remain intentionally blocked.
- Pre-publication remediation resolved confirmed review findings: Pages image/asset/internal URLs are repository-base safe, Playwright forbids `.only` in CI, contact APIs have behavior-level HTTP contract coverage, malformed CSRF cookies reject safely, Actions are pinned to full SHAs, CSRF/rate maps are bounded, analytics strips query/fragment data, live contact fails closed, Node execution is lockfile-pinned, Google Fonts were removed from the app, server lifecycle/readiness cleanup is hardened, current commands use static-prerender terminology, Lighthouse cleanup failures are actionable, size-exception review guidance and concrete rollback docs were added, and the public preview warning/banner is explicit. Tasks 6.1-6.4 remain intentionally blocked.
- Final targeted remediation removed reusable CSRF examples, required explicit random `base64:`/`hex:` secret format, replaced health-token/pid disclosure with HMAC identity, added safe 413/400 JSON body-parser errors and boundary tests, added executable review inventory verification, and updated OpenSpec current-state evidence for static-prerender plus Express API. Tasks 6.1-6.4 remain intentionally blocked.
- Final tiny remediation added conservative decoded-byte CSRF entropy guardrails/tests, deterministic `waitForServer` HMAC identity mismatch/match tests in the normal `npm test` contract, ignored top-level artifact allowlist reconciliation including `.atl/`, required post-staging diff/inventory commands, and current-state OpenSpec addenda. Tasks 6.1-6.4 remain intentionally blocked.

### Suggested Work Units

| Unit | Goal | Verification | Rollback boundary |
|---|---|---|---|
| 1 | Angular 22 static-prerender workspace + CI | `npm run test/lint/typecheck/build` | Revert generated workspace/config only |
| 2 | Content approval registry | Unit tests for statuses/exact labels | Revert `src/app/content/**` |
| 3 | Accessible Stitch-informed UI/routes | E2E + axe smoke for required routes | Revert `src/app/pages/**` + design tokens |
| 4 | Local SEO/performance | Static-prerender metadata, sitemap, robots, CWV checks | Revert `src/app/core/seo/**`, `tools/**`, `public/**` |
| 5 | Contact/privacy/analytics | Server/contact tests; no payload analytics/logs | Disable endpoint/provider, keep static site |
| 6 | Launch/deploy gates | Checklist passes or blocks launch | Keep draft/noindex deployment only |

## Safe to Begin

- [x] 1.1 [PWF] Bootstrap Angular 22 static-prerender app in `package.json`, `angular.json`, `src/main*.ts`, `src/app/app*.ts`; verify crawler-readable route shell.
- [x] 1.2 [PWF] Add real quality tooling/scripts: test, lint, typecheck, build, e2e, axe/accessibility, Lighthouse; wire `.github/workflows/ci.yml`.
- [x] 1.3 [PWF] Create architecture folders `src/app/content`, `core/seo`, `core/analytics`, `contact`, `pages`, `server/contact`; no CRM/booking/payments/patient AI.
- [x] 2.1 [CAS] Implement `ApprovalStatus`, `ContentPage`, `InterventionTopic`, `ModalityPreference` in `src/app/content/types.ts`; unit-test invalid states.
- [x] 2.2 [CAS] Create `src/app/content/interventions.ts` preserving exact labels: infancia/familias—ansiedad, miedos, regulación emocional, problemas de conducta, dificultades escolares, trauma y duelo infantil, separación de los padres, autoestima, problemas de sueño, control de esfínteres; adolescentes—autoestima, ansiedad, relaciones sociales, identidad, orientación académica, trauma, duelo, regulación emocional; adultos—ansiedad, estrés, trauma, duelo, dependencia emocional, relaciones de pareja, crecimiento personal; orientación/formación—dificultades de aprendizaje, altas capacidades, coordinación con centros educativos, asesoramiento familiar; talleres=future/blocked.
- [x] 2.3 [CAS][SEO] Add `src/app/content/content-matrix.ts` with route owner, status, source facts, canonical intent, parent hub, noindex/sitemap flag, approver/date/blockers.
- [x] 2.4 [PWF] Document deferred business OS/Raspberry Pi boundaries in `docs/architecture/future-bounded-contexts.md`; verify no first-slice task implements them.
- [x] 3.1 [PWF] Migrate Stitch v20 intent into `src/styles.scss`, design tokens, layout primitives, focus states, skip link; reject `#D1807E` normal text on white.
- [x] 3.2 [PWF][SEO] Build routes/pages for `/`, `/sobre-mi`, `/como-trabajo`, `/areas-de-intervencion`, `/psicologia-ciudad-real`, `/contacto`, legal routes, conditional `/talleres`; use placeholder-safe Spanish drafts only.
- [x] 3.3 [SEO][PCLG] Make Ciudad Real in-person path primary through approved-safe CTAs and `modalityPreference`; verify unconfirmed modalities are absent/pending.
- [x] 4.1 [SEO] Implement metadata/canonical/schema rules in `src/app/core/seo/**`; omit LocalBusiness/NAP/reviews until verified facts exist.
- [x] 4.2 [SEO] Generate `public/robots.txt` and sitemap from approved indexable routes only; test blocked/thin/legal-incomplete routes are omitted/noindex.
- [x] 4.3 [SEO] Add internal-link rules from hubs/topics to method/about/contact with natural Spanish anchors; test `/psicologia-ciudad-real` owns local intent.
- [x] 4.4 [PWF][SEO] Optimize images/fonts and static-prerender output; run Lighthouse/CWV checks for home, local landing, service hub, contact.
- [x] 5.1 [PCLG] Implement accessible `src/app/contact/**` form with minimal fields, consent, legal links, emergency boundary, accessible errors.
- [x] 5.2 [PCLG] Implement `src/server/contact/**` validation, CSRF/rate/spam controls, provider abstraction, redacted logs, retention gate.
- [x] 5.3 [PCLG] Implement `src/app/core/analytics/**` event taxonomy allowing only route, CTA source, modality code, broad category, validation outcome.
- [x] 5.4 [PCLG] Add tests proving contact payloads never enter analytics, client storage, static output, or unsafe logs.

## Blocked on Marta/Legal Decisions

- [ ] 6.1 [CAS] Replace draft Spanish SEO copy only after Marta verifies credentials, registration, address/service area, contact channels, modalities, exclusions, workshops, source facts, and approver metadata.
- [ ] 6.2 [SEO] Enable LocalBusiness/NAP/GBP/citations only after identical verified data exists across website, GBP, citations, legal pages.
- [ ] 6.3 [PCLG] Enable contact submissions only after legal/privacy/cookies text, retention, email provider, DPA/hosting, and analytics consent are approved.
- [ ] 6.4 [PWF][SEO][PCLG] Launch only after clinical/deontological, SEO, a11y, performance, legal, analytics-safety, and deployment/observability gates pass; otherwise deploy draft/noindex.

## Final Verification

- [x] 7.1 Run `npm run lint && npm run typecheck && npm test && npm run build && npm run e2e && npm run a11y`; failures block apply completion.
- [x] 7.2 Verify spec scenarios: required routes, static-prerender crawlability, exact inventory, placeholder blocking, local intent ownership, contact privacy, excluded roadmap.
- [x] 7.3 Configure deployment and observability without payload capture: environment validation, error redaction, uptime/build alerts, rollback notes.
