# Verify Report: marta-digital-practice-platform

**Date**: 2026-07-23
**Verifier**: independent sdd-verify pass (fresh context, no trust in prior self-reported apply-progress)
**Target**: current uncommitted working tree (base commit `e44e361` + 34 modified tracked files + 5 new untracked files under `src/app/content/treatment-*`, `src/app/pages/treatment-page.component.ts`, `src/app/content/legal-copy.ts`). Nothing committed, pushed, or deployed.

## Scope

Verify scope is **35 of 38 SDD tasks**: 1.1-5.4, 6.1, 7.1-7.3, and 8.1-8.13.

Tasks **6.2, 6.3, 6.4 are explicitly OUT OF SCOPE** and were not evaluated as failures. They are intentionally blocked pending real external facts only Marta (the client) can supply:
- 6.2: verified business address/NAP/GBP/citation data
- 6.3: approved legal/privacy/cookies text, retention policy, email provider, DPA/hosting approval for live contact
- 6.4: full clinical/deontological/SEO/a11y/performance/legal/analytics/deployment gate sign-off for indexable launch

Task 6.4 explicitly permits deploying as a draft/noindex preview without 6.2/6.3 satisfied. No business/legal/clinical facts, credentials, testimonials, pricing, or contact details were invented or backfilled during this verification, per explicit instruction.

**Question this report answers**: is the current uncommitted working tree, as a draft/noindex GitHub Pages preview, safe to commit + push + deploy?

## 1. Quality gates - fresh re-run, real evidence

Environment: host shell `node --version` = v22.19.0 (floating), but project pins Node `24.15.0` via `.nvmrc`/`.node-version`/`package.json#engines` and a lockfile-pinned `node@24.15.0` devDependency. Ran `npm ci` first per README instruction, then all commands via `npm run <script>`.

**Environment finding (non-blocking)**: `npm ci` correctly resolves and uses the pinned Node 24.15.0 for every `npm run` invocation - verified directly via `npm exec -- node --version` returning `v24.15.0`, and by inspecting `node_modules/.bin/node`, which shims to `node_modules/node/bin/node.exe` (v24.15.0). No command failed due to Node version mismatch. The pinning mechanism works as designed.

| Command | Result | Evidence |
|---|---|---|
| `npm ci` | PASS | 629 packages installed, 0 vulnerabilities. EBADENGINE warnings only from host-shell floating node (expected, harmless - see above). |
| `npm run lint` | PASS | Clean exit, no output. |
| `npm run typecheck` | PASS | Clean exit (tsconfig.json + tsconfig.spec.json), no output. |
| `npm test` | PASS | Vitest: 5 files, 37 tests passed. Matches prior claim exactly. |
| `npm run build` | PASS (warning) | 44 prerendered static routes. Initial bundle 382.26 kB vs 300 kB soft budget (warning only, not error - build exit 0). |
| `npm run verify:inventory` | PASS | "100 intended paths; ignored top-level artifacts match the documented allowlist." |
| `npm run verify:prerender` | PASS | "Static-prerender output is crawlable and draft-safe." |
| `npm run build:pages` | PASS (warning) | Same bundle-size warning; Pages artifact prepared with base href /hilando-fino/. |
| `npm run verify:pages` | PASS | "base href, routes, noindex metadata, contact fallback, 404, and sensitive-file checks are safe." |
| `npm run pages:smoke -- --artifact-dir dist/hilando-fino/browser` | PASS | "Local GitHub Pages artifact smoke passed." |
| `npm run e2e` | PASS | Playwright: 54 passed (chromium + mobile projects), 21.9s. Includes real per-route navigation of all 29 treatment pages, nav/menu, contact-no-submit, 404 behavior. |
| `npm run a11y` | PASS | Playwright + axe: 26 passed, 19.6s, includes 2 real treatment-page routes per project plus hubs/local/trauma/contact. |
| `npm run performance:smoke` | PASS | "Performance smoke budget passed." Explicitly not a Lighthouse/CWV/INP claim. |
| `npm audit --audit-level=moderate` | PASS | 0 vulnerabilities. |
| `npm run lighthouse` | PASS (ran fully, not skipped) | perf=1.00, a11y=1.00, seo=0.69 (informational - every route intentionally noindex in draft), LCP 189-978ms, CLS 0.000, TBT 0ms on /, /psicologia-ciudad-real, /areas-de-intervencion, /contacto. |

All 13 required commands plus the optional Lighthouse check were re-run fresh in this session and passed. Results are consistent with (not just copied from) the prior apply-progress claims - independently reproduced with real command output.

## 2. SEO content substance

- **Route count/labels**: Read `src/app/content/treatment-pages.ts` in full (all 169 lines). Counted 29 `page({...})` records directly: 10 children-families, 8 adolescents, 7 adults, 4 education-training. Slugs cross-checked one-by-one against the spec's route table in `specs/local-seo-content-architecture/spec.md` - exact match, no missing/extra/renamed routes.
- **Uniqueness**: `content.spec.ts` unit test ("keeps route page keys constrained to the central manifest and metadata unique") asserts unique title/description/H1/canonical across all 44 routes via Set size checks - this ran and passed under my own `npm test` execution, not just cited.
- **Similarity/thin-content**: The `jaccardSignificantWords` similarity test in `content.spec.ts` computes pairwise Jaccard similarity over significant words (stopword-filtered, 5+ chars) across all 29x28/2 page pairs, asserts warn-above-0.72 produces an empty warnings array and fail-above-0.82 never happens. This ran for real in `npm test` (not re-derived from the prior claim) and passed. I additionally manually read the full page bodies for ansiedad-infantil, ansiedad-adolescente, and ansiedad (adult) - content is genuinely differentiated: child version centers on family/routine/school response, adolescent version on autonomy/social/study pressure, adult version on alarm/responsibility/history - matching the spec's required per-sector differentiation for repeated topics.
- **Depth**: body-length, FAQ (>=4), related-links (>=4), source-facts (>=2), boundary text assertions all ran and passed in `npm test`.

## 3. Internal linking

- `content.spec.ts` builds a real inbound-link map from the actual page content graph (hub pages, treatment pages' related arrays, contact links) and asserts every treatment page has >=3 real inbound links and every strategic page (/psicologia-trauma-ciudad-real, /psicologia-ciudad-real, /contacto) has >=3 - this is a genuine computed check, ran and passed.
- Hub pages (page-data.ts -> hubPage() -> topicCards(hub)) render cards sourced from treatmentsForSector(hub) with real href: topic.canonicalPath for every child - confirmed by direct source read, not a no-href-card regression.
- **Finding (WARNING, non-blocking)**: the `shortestHomeDepth()` helper used by the "reachable within three clicks" test (content.spec.ts around line 335-339) is hardcoded to always return 3 for any page found in treatmentPages, rather than computing actual BFS distance over the inbound map built earlier in the same test. The assertion is therefore tautological - it cannot catch a real depth regression. Independent confidence in the actual <=3-click claim still comes from: (a) the desktop mega-menu offers direct links to every treatment page from any page (1 click from anywhere via the "Areas de intervencion" dropdown), (b) hub pages link every child with real hrefs, and (c) e2e tests navigate the mega-menu and hub cards directly. The underlying claim is very likely true by construction, but this specific unit test does not prove it and should be replaced with a real graph BFS before being relied on as a regression guard.

## 4. Responsive / navigation

Read `src/app/app.component.ts` in full:
- Desktop: single "Areas de intervencion" dropdown/mega-menu (sectorMenu) groups all 29 children under 4 sector sections plus a trauma-pillar link - does not dump 29 links as top-level nav peers (top-level nav has 6 primary links + 1 dropdown trigger). Matches spec requirement directly.
- Mobile: same nav-links/mega-grid markup reused with .open class toggle (mobileOpen signal), keyboard (Escape via HostListener), outside-click close, aria-expanded/aria-controls wired.
- e2e coverage: "desktop navigation exposes the complete IA and area menu links", "dropdown supports keyboard focus, escape close, outside close, and current route state", "mobile menu exposes the same IA without hover-only access" - all ran and passed for both chromium and mobile Playwright projects (6 test instances total).
- Footer exposes only sector-hub-level links (not all 29 children) - spec-compliant, since sector mega-menu/hub pages carry full discoverability per the "no top-level dumping" requirement.

## 5. No draft/internal-state language leaking into visitor copy

- Grepped the actual built prerendered HTML output (dist/hilando-fino/browser/**/*.html, 45 files) for "noindex-needs-human-approval", "approved-placeholder", "preview-noindex", "borrador", "placeholder", "draft mode", "launch gate", "blocked-unverified", and forbidden voice patterns ("Marta explica", "Marta acompana", "Marta ofrece") - zero matches. This is a direct check of my own build output, not the prior claim.
- The `<meta name="robots" content="noindex, nofollow">` tag is present (correct, invisible technical metadata) and public/robots.txt blocks all crawling (Disallow: /) with sitemap pointing to a clearly non-real placeholder domain (pending-domain.invalid) rather than a fabricated production URL.
- content.spec.ts's "has no forbidden internal-state language in visitor-facing content fields" test JSON-stringifies the actual visible payload (standard pages + treatment pages + legal copy) and checks against a forbidden-term list and forbidden-voice regex list - ran and passed under npm test.
- Read page-data.ts in full: copy is first-person/direct-second-person throughout (e.g. "Estoy al frente de Hilando Fino Psicologia...", "Trabajo desde una idea sencilla..."), consistent with content-approval-system spec's first-person voice contract and with conocimiento-02-tono-de-voz-y-estilo.md's brand voice rules (tu-form, short paragraphs, no minimizing/dramatizing language, "acompanar/proceso/herramientas" vocabulary present, no "sanar"/"transformacion total"/"garantizado" found).

## 6. No fabricated facts

- No address, phone number, email, price, testimonial, or outcome guarantee found anywhere in page-data.ts, treatment-pages.ts, content-matrix.ts, or legal-copy.ts (targeted greps for email/phone/price/testimonial patterns returned nothing beyond one honest disclaimer line: "No se anuncian fechas, precios ni entidades concretas...").
- legal-copy.ts explicitly defers legal identity/address/data-controller details ("La titularidad, responsabilidades especificas y datos identificativos se incorporaran unicamente con informacion verificada...") rather than inventing them - consistent with instrucciones-personalizadas.md rule 1 (never invent professional facts) and the content-approval-system spec's "verified content versus placeholder" requirement.
- sourceFacts on every treatment page cite real sources (IMG_0742.JPG, brand guide, exploration route map) rather than invented credentials.

## 7. Privacy/contact safety (live parts)

- Read src/app/contact/contact-page.component.ts in full: submit() never performs an HTTP request. On valid input it sets validationOutcome: 'provider-disabled' and displays "No he podido enviar la solicitud desde esta pagina..." - no fake success path exists.
- Read src/server/contact/handler.ts: the server endpoint fails closed independently of the client, via two separate blocking checks - validateLiveContactDeployment() (checks retention/runtime/deployment-mode/https-origin/trusted-proxy/provider/secure-cookie approval, all currently unmet) AND an explicit `if (process.env['CONTACT_ENABLED'] !== 'true') return 503` guard. Confirmed by test contact.spec.ts around lines 251-253 asserting a live-looking request still returns 503 with contact_live_deployment_blocked.
- e2e test "contact flow looks final and fails without fake success after interaction" passed for both browser projects, confirming this behaviorally, not just at the source level.
- No regression from the README's documented "Live contact is blocked... the UI intentionally does not submit" claim.

## Findings summary

**CRITICAL (blocking)**: None found in the 35/38-task scope.

**WARNING (non-blocking, recommend addressing before/soon after archive)**:
1. src/app/content/interventions.ts is stale/vestigial: all 29 topics hardcode status: 'merge-into-hub' and cannibalizationRule: 'hub-only', describing the OLD hub-only model the design explicitly superseded (see design.md "Current Architecture Update Addendum"). It is not the authoritative route/sitemap/indexability source - content-matrix.ts + treatment-index.ts correctly reflect the 29 dedicated pages - and it is not rendered to visitors, so there is no functional or visitor-facing impact. But it is misleading dead code that could confuse a future auditor reading it as current status. Recommend updating its semantics or removing it and deriving content.spec.ts's label-count checks from treatment-pages.ts directly.
2. shortestHomeDepth() in content.spec.ts is a hardcoded return 3, not a real graph BFS - the "<=3 clicks from home" assertion is tautological and cannot catch a future depth/orphan regression, even though the underlying claim currently holds by construction (mega-menu + hub links). Recommend replacing with a real BFS over the inbound map already built in the same test.
3. Initial JS bundle is 382.26 kB vs a 300 kB soft budget (build warning only, not a failure) across build, build:pages, e2e, a11y, performance:smoke, and lighthouse runs. Lighthouse performance/a11y scored 1.00 and LCP/CLS/TBT are well within target on all four checked routes, so this is not currently a user-facing problem, but worth tracking as more treatment pages/features are added.

**SUGGESTION**:
1. Consider consolidating interventions.ts and content-matrix.ts/treatment-index.ts into a single inventory source to prevent future drift between the two "truth" registries.
2. Consider running npm run lighthouse against a broader route sample (e.g. one treatment page, one hub) in CI, since only 4 static routes were budget-checked.

## Overall verdict

**PASS - the current uncommitted working tree is safe to commit + push + deploy as a draft/noindex GitHub Pages preview.**

All 13 required quality-gate commands (plus the optional Lighthouse check) were independently re-run and passed with real, freshly-generated evidence, not copied from the prior apply-progress claim. Route count/labels, content substance/differentiation, internal linking, navigation, absence of forbidden internal-state language, absence of fabricated facts, and contact-form fail-closed behavior were each independently verified against actual source and build output. The three WARNING findings are code-quality/test-rigor issues with no visitor-facing or functional impact on the draft preview and do not block deployment; they should be tracked as follow-up cleanup. Tasks 6.2-6.4 remain correctly and intentionally blocked pending real external facts from Marta, as required.
