# Tasks: Marta Digital Practice Platform

## Review Workload Forecast

| Field | Value |
|---|---|
| Estimated changed lines | Historical delivered: 4,000-7,000; incremental corrective: 3,500-6,500+ |
| 800-line budget risk | High |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Delivery strategy | exception-ok |
| Chain strategy | size-exception |
| Suggested split | Reviewable work units 8.1 → 8.13 below; one oversized delivery accepted |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: size-exception
400-line budget risk: High
800-line budget risk: High

### Resolved Apply Decision

- Delivery strategy used by apply: `exception-ok`.
- Maintainer explicitly accepted `size:exception` for one oversized single delivery.
- Corrected proposal/spec/design passed gatekeeper; unchecked Phase 8 is now the authoritative next apply contract. Do not ask again about chaining for this corrective diff.
- Chain strategy not used for this apply because the accepted exception overrides the chained recommendation for this delivery only.
- Corrective apply evidence restored real 404 behavior, bound CSRF, honest static-prerender docs, deterministic Node pinning, real Lighthouse lab budgets, route-level lazy loading, and unique topic summaries before keeping technical tasks checked.
- Continuation remediation added deterministic standalone `performance:smoke`, GitHub Pages preview CI for `master`/manual dispatch, repository base URL `/hilando-fino/`, static artifact verification, noindex static 404, and explicit multi-instance contact blocking. Tasks 6.1-6.4 remain intentionally blocked.
- Pre-publication remediation resolved confirmed review findings: Pages image/asset/internal URLs are repository-base safe, Playwright forbids `.only` in CI, contact APIs have behavior-level HTTP contract coverage, malformed CSRF cookies reject safely, Actions are pinned to full SHAs, CSRF/rate maps are bounded, analytics strips query/fragment data, live contact fails closed, Node execution is lockfile-pinned, Google Fonts were removed from the app, server lifecycle/readiness cleanup is hardened, current commands use static-prerender terminology, Lighthouse cleanup failures are actionable, size-exception review guidance and concrete rollback docs were added, and the public preview warning/banner is explicit. Tasks 6.1-6.4 remain intentionally blocked.
- Final targeted remediation removed reusable CSRF examples, required explicit random `base64:`/`hex:` secret format, replaced health-token/pid disclosure with HMAC identity, added safe 413/400 JSON body-parser errors and boundary tests, added executable review inventory verification, and updated OpenSpec current-state evidence for static-prerender plus Express API. Tasks 6.1-6.4 remain intentionally blocked.
- Final tiny remediation added conservative decoded-byte CSRF entropy guardrails/tests, deterministic `waitForServer` HMAC identity mismatch/match tests in the normal `npm test` contract, ignored top-level artifact allowlist reconciliation including `.atl/`, required post-staging diff/inventory commands, and current-state OpenSpec addenda. Tasks 6.1-6.4 remain intentionally blocked.
- Publication-like content/IA remediation implements the maintainer-authorized rule that visible public copy must read like a real website while preview `noindex`/robots remain invisible metadata. Task 6.1 is now complete for copy/IA using known facts and elegant omission of unknowns; external factual/live-contact tasks 6.2-6.4 remain intentionally blocked.
- Phase 8 corrective apply now implements exactly 29 dedicated treatment pages from typed `treatment-*` source data, first-person visitor voice lint, FAQ/Breadcrumb schema, derived routes/sitemap/prerender/Page artifact checks, sector hub/mega-menu discovery, internal link/substance/similarity gates, screenshots, and full verification. Tasks 6.2-6.4 remain intentionally blocked.
- Post-verify surgical remediation (2026-07-23) fixed the independent `sdd-verify` and 4-lens review findings without redesigning any task: (A) `contact-page.component.ts` submit failure message no longer implies a retryable glitch — it now honestly states the form is not active yet, in the site's established first-person voice, with a restored `tools/verify-pages-artifact.mjs` guard (bundle-text check, tolerant of esbuild's `\xHH` accent escaping) and an updated e2e assertion; (B) `schema.spec.ts` now covers the previously-untested `FAQPage` JSON-LD emission against a real treatment page's `faq` array plus a fully asserted `Person` node; (C) `shortestHomeDepth()` in `content.spec.ts` is a real BFS over the assembled link graph instead of a hardcoded `return 3`; (D) the synthetic hub->page inbound edge was removed (redundant with real `topicCards()` data, now cross-checked by a dedicated test) and the retained `/contacto` synthetic edge is now documented as verified against the treatment page template's hardcoded CTAs; (E) dead/self-contradicting `interventions.ts` (`interventionTopics`, `topicsForHub`, `cannibalizationRule`, `workshopsPlaceholder`) was deleted along with its self-referential test block; `hubLabels` moved to new `src/app/content/hub-labels.ts`; (F) hub label/URL-segment duplication across `treatment-page.component.ts`, `treatment-pages.ts`, `treatment-index.ts`, and `app.component.ts` now flows from `hub-labels.ts` and `treatment-pages.ts`'s exported `sectorPath()`; (G) new `treatment-index.spec.ts` covers `treatmentByPath()` trailing-slash/query/unknown-path cases; (H) the 29-treatment-page e2e loop now runs the `forbiddenVisibleTerms` check; (I) the FAQ e2e assertion uses a semantic `role=region`/heading-level-3 query instead of a `.faq-item` CSS locator; (J) the rollback doc's `workflow_dispatch` step no longer implies an arbitrary SHA can be dispatched directly, and a new "Known follow-ups before full launch" section flags `trust proxy`, CSP/HSTS, client error observability, and the un-isolated 29-page e2e test as explicitly out of scope for this round. `tools/verify-change-inventory.mjs` and `docs/deployment/launch-and-rollback.md` were updated for the file moves. All 13 required commands plus `npm audit` were re-run fresh after the fixes and passed; see the apply-progress evidence table. Tasks 6.2-6.4 remain intentionally blocked.

### Suggested Work Units

| Unit | Goal | Verification | Rollback boundary |
|---|---|---|---|
| 1 | Angular 22 static-prerender workspace + CI | `npm run test/lint/typecheck/build` | Revert generated workspace/config only |
| 2 | Content approval registry | Unit tests for statuses/exact labels | Revert `src/app/content/**` |
| 3 | Accessible Stitch-informed UI/routes | E2E + axe smoke for required routes | Revert `src/app/pages/**` + design tokens |
| 4 | Local SEO/performance | Static-prerender metadata, sitemap, robots, CWV checks | Revert `src/app/core/seo/**`, `tools/**`, `public/**` |
| 5 | Contact/privacy/analytics | Server/contact tests; no payload analytics/logs | Disable endpoint/provider, keep static site |
| 6 | Launch/deploy gates | Checklist passes or blocks launch | Keep draft/noindex deployment only |

### Corrective Work Units (Next Apply Contract)

| Unit | Task | Goal | Rollback boundary |
|---|---|---|---|
| C1 | 8.1 | Global first-person voice audit | Copy/metadata/legal/contact/404 only |
| C2 | 8.2 | Typed treatment model and 29-page source | `src/app/content/treatment-*` |
| C3 | 8.3-8.6 | Sector content records | Content records only, by sector |
| C4 | 8.7 | Derived routes/prerender/SEO artifacts | Routing/SEO generation only |
| C5 | 8.8-8.10 | Pillar, hubs, nav, link graph | IA/link data + nav rendering |
| C6 | 8.11-8.12 | QA gates and verification | Tests/tools only |
| C7 | 8.13 | SDD/inventory/docs evidence | OpenSpec/Engram/docs only |

## Safe to Begin

- [x] 1.1 [PWF] Bootstrap Angular 22 static-prerender app in `package.json`, `angular.json`, `src/main*.ts`, `src/app/app*.ts`; verify crawler-readable route shell.
- [x] 1.2 [PWF] Add real quality tooling/scripts: test, lint, typecheck, build, e2e, axe/accessibility, Lighthouse; wire `.github/workflows/ci.yml`.
- [x] 1.3 [PWF] Create architecture folders `src/app/content`, `core/seo`, `core/analytics`, `contact`, `pages`, `server/contact`; no CRM/booking/payments/patient AI.
- [x] 2.1 [CAS] Implement `ApprovalStatus`, `ContentPage`, `InterventionTopic`, `ModalityPreference` in `src/app/content/types.ts`; unit-test invalid states.
- [x] 2.2 [CAS] Create `src/app/content/interventions.ts` preserving exact labels: infancia/familias—ansiedad, miedos, regulación emocional, problemas de conducta, dificultades escolares, trauma y duelo infantil, separación de los padres, autoestima, problemas de sueño, control de esfínteres; adolescentes—autoestima, ansiedad, relaciones sociales, identidad, orientación académica, trauma, duelo, regulación emocional; adultos—ansiedad, estrés, trauma, duelo, dependencia emocional, relaciones de pareja, crecimiento personal; orientación/formación—dificultades de aprendizaje, altas capacidades, coordinación con centros educativos, asesoramiento familiar; talleres=future/blocked.
- [x] 2.3 [CAS][SEO] Add `src/app/content/content-matrix.ts` with route owner, status, source facts, canonical intent, parent hub, noindex/sitemap flag, approver/date/blockers.
- [x] 2.4 [PWF] Document deferred business OS/Raspberry Pi boundaries in `docs/architecture/future-bounded-contexts.md`; verify no first-slice task implements them.
- [x] 3.1 [PWF] Migrate Stitch v20 intent into `src/styles.scss`, design tokens, layout primitives, focus states, skip link; reject `#D1807E` normal text on white.
- [x] 3.2 [PWF][SEO] Build routes/pages for `/`, `/sobre-mi`, `/como-trabajo`, `/areas-de-intervencion`, area hubs, `/psicologia-ciudad-real`, `/psicologia-trauma-ciudad-real`, `/contacto`, legal routes, and `/talleres`; visible Spanish copy is publication-quality and contains no internal-state language.
- [x] 3.3 [SEO][PCLG] Make Ciudad Real in-person path primary through approved-safe CTAs and `modalityPreference`; verify unconfirmed modalities are absent/pending.
- [x] 4.1 [SEO] Implement metadata/canonical/schema rules in `src/app/core/seo/**`; omit LocalBusiness/NAP/reviews until verified facts exist.
- [x] 4.2 [SEO] Generate `public/robots.txt` blocking preview indexing and sitemap artifacts containing all real routes; test noindex remains metadata-only and invisible in visitor copy.
- [x] 4.3 [SEO] Add internal-link rules from hubs/topics to method/about/contact/local/trauma with natural Spanish anchors; test `/psicologia-ciudad-real` owns local intent and `/psicologia-trauma-ciudad-real` owns trauma/duelo local intent.
- [x] 4.4 [PWF][SEO] Optimize images/fonts and static-prerender output; run Lighthouse/CWV checks for home, local landing, service hub, contact.
- [x] 5.1 [PCLG] Implement accessible `src/app/contact/**` form with minimal fields, consent, legal links, emergency boundary, accessible errors.
- [x] 5.2 [PCLG] Implement `src/server/contact/**` validation, CSRF/rate/spam controls, provider abstraction, redacted logs, retention gate.
- [x] 5.3 [PCLG] Implement `src/app/core/analytics/**` event taxonomy allowing only route, CTA source, modality code, broad category, validation outcome.
- [x] 5.4 [PCLG] Add tests proving contact payloads never enter analytics, client storage, static output, or unsafe logs.

## Marta/Legal Decisions and Publication Gates

- [x] 6.1 [CAS] Replace visible internal-state Spanish copy with publication-quality website copy using only known facts, omitting unavailable credentials/contact/legal details elegantly, and enforcing no forbidden visitor-facing terms.
- [ ] 6.2 [SEO] Enable LocalBusiness/NAP/GBP/citations only after identical verified data exists across website, GBP, citations, legal pages.
- [ ] 6.3 [PCLG] Enable contact submissions only after legal/privacy/cookies text, retention, email provider, DPA/hosting, and analytics consent are approved.
- [ ] 6.4 [PWF][SEO][PCLG] Launch only after clinical/deontological, SEO, a11y, performance, legal, analytics-safety, and deployment/observability gates pass; otherwise deploy draft/noindex.

## Final Verification

- [x] 7.1 Run `npm run lint && npm run typecheck && npm test && npm run build && npm run e2e && npm run a11y`; failures block apply completion.
- [x] 7.2 Verify spec scenarios: required routes, static-prerender crawlability, exact 29-topic inventory, no forbidden visible internal-state language, internal-link graph, local/trauma intent ownership, contact privacy, excluded roadmap.
- [x] 7.3 Configure deployment and observability without payload capture: environment validation, error redaction, uptime/build alerts, rollback notes.

## Corrective Implementation Phase: Authoritative Treatment Pages (Next Apply Contract)

Historical status remains 22/25 complete; 6.2-6.4 stay blocked. The unchecked tasks below are additive and become the next apply contract.

- [x] 8.1 [CAS:voice][PWF:quality] Audit/migrate every visible phrase in `src/app/pages/page-data.ts`, `src/app/content/{public-routes,not-found}.ts`, legal/contact/404 metadata/copy to first-person Marta voice; verify voice lint + `npm run lint && npm test`; rollback copy-only diff.
- [x] 8.2 [CAS:inventory][SEO:29-routes] Create `src/app/content/treatment-types.ts`, `treatment-pages.ts`, `treatment-index.ts` as the typed single source for exactly 29 sector pages; verify exact labels/count/owners unit tests; rollback `treatment-*` only.
- [x] 8.3 [CAS:existence][PCLG:boundaries] Add 10 infancia/familias records with unique first-person content and pediatric/referral boundaries in `treatment-pages.ts`; verify depth/similarity/medical-boundary tests; rollback infancia records only.
- [x] 8.4 [CAS:existence][SEO:differentiation] Add 8 adolescent records with unique first-person content in `treatment-pages.ts`; verify adolescent anxiety/trauma/grief/self-esteem differentiation tests; rollback adolescent records only.
- [x] 8.5 [CAS:existence][SEO:differentiation] Add 7 adult records with unique first-person content in `treatment-pages.ts`; verify adult anxiety/stress/trauma/grief/dependence/couple specificity tests; rollback adult records only.
- [x] 8.6 [CAS:existence][SEO:substance] Add 4 education/training records with unique first-person content in `treatment-pages.ts`; verify school/family/training boundaries and metadata uniqueness; rollback education records only.
- [x] 8.7 [PWF:prerender][SEO:metadata/schema] Derive `src/app/app.routes*.ts`, `src/app/content/public-routes.ts`, `src/app/core/seo/schema.ts`, `tools/generate-sitemap.ts` from treatment data; verify prerender/canonical/sitemap/breadcrumb/schema coverage; rollback routing/SEO derivation only.
- [x] 8.8 [SEO:trauma-pillar] Refine `/psicologia-trauma-ciudad-real` in `page-data.ts` and treatment related links so it routes cross-sector trauma/duelo without replacing children; verify cannibalization and reciprocal inlink tests; rollback pillar/link edits.
- [x] 8.9 [PWF:discoverability] Update sector hubs/menu/footer in `page-data.ts`, `standard-page.component.ts`, `app.component.*` to expose all children without 29 top-nav peers; verify desktop/mobile navigation e2e and a11y; rollback IA/nav rendering.
- [x] 8.10 [SEO:link-graph] Implement internal-link graph data/checks in `treatment-index.ts` and `src/app/content/content.spec.ts`; verify no orphans, <=3 click depth, strategic inlink counts, contextual anchors; rollback link records/tests.
- [x] 8.11 [CAS:anti-doorway][SEO:originality] Add duplicate/similarity/substance/unique title/meta/H1/FAQ/CTA tests in `content.spec.ts` or `tools/verify-*.mjs`; verify thresholds warn >0.72 and fail >0.82; rollback QA additions only.
- [x] 8.12 [PWF:verification] Extend `tests/e2e/**`, a11y, mobile nav, screenshot self-critique, Pages artifact, Lighthouse/performance checks for 29 pages; verify `npm run lint && npm run typecheck && npm test && npm run build && npm run e2e && npm run a11y`; rollback tests/tools only.
- [x] 8.13 [SDD:evidence] Update `openspec/changes/marta-digital-practice-platform/**`, Engram apply-progress, `docs/review/change-inventory.md`, and rollback notes with task evidence; verify inventory script and no app-code-only undocumented changes; rollback SDD/docs only.
