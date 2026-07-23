# Design: Marta Digital Practice Platform

## Technical Approach

Initial planning state was a brand/content repository with no Angular workspace, package manifest, tests, CI, or app source. Current implemented state is an Angular 22 **static-prerender** public website plus an Express API/server boundary for contact, health, and safe 404 handling; runtime SSR is not claimed for this delivery. The design contract makes the business priority explicit: qualified **in-person** inquiries in Ciudad Real are the primary conversion path, but only after Marta approves in-person modality facts, address/service-area, contact channels, legal text, and retention.

## Architecture Decisions

| Area | Choice | Rejected | Rationale |
|---|---|---|---|
| Local conversion | `/psicologia-ciudad-real` owns city + in-person intent; home/service pages route CTAs into a privacy-safe contact flow with explicit `modalityPreference`. | Generic contact CTA; manipulative urgency; claiming online/in-person before approval. | Carries the business priority without unsupported modalities or coercive steering. |
| Content truth | Typed registry with approval status, source facts, exact intervention `sourceLabel`, route owner, canonical intent, and modality availability. | Destructive normalization of labels into generic keys. | Prevents invented claims, thin pages, cannibalization, and label drift. |
| Contact boundary | Server-side minimal inquiry model, broad reason categories, consent, CSRF/rate/spam controls, redacted logs. | Clinical intake/triage/history collection. | Inquiry data can reveal health context; collect only what is needed to respond. |
| Future roadmap | PublicWeb exposes approved non-sensitive extension seams; patient/clinical/Raspberry Pi systems are separate bounded contexts. | Shared public-web datastore or “local Pi means safe” assumption. | Local hardware is not total protection; sensitive expansion needs separate SDD, legal/DPIA, threat model, retention, access, backup, and audit approval. |

## Data Flow

```text
brand docs/Stitch refs -> content registry(status/sourceLabel/modality) -> routes
                                      -> SEO/schema/sitemap only when approved

Local landing/CTA -> ContactForm -> POST /api/contact -> validate -> EmailProvider
                                  -> redacted ops metrics; no form payload analytics

PublicWeb --approved exports only--> OperationsAutomation(non-sensitive)
Clinical/Patient/RPi context: separate store, separate approval, no default sharing
```

## File Changes

| File | Action | Description |
|---|---|---|
| `package.json`, `angular.json`, `tsconfig*.json` | Implemented | Angular static-prerender workspace, scripts, quality commands. |
| `src/app/content/**` | Implemented | Approval registry, exact intervention labels, route ownership, modality availability, sitemap source. |
| `src/app/contact/**`, `src/server/contact/**` | Implemented, gated | Accessible contact UI, validated request contract, privacy/security controls, provider abstraction; live submissions remain blocked pending approvals. |
| `src/app/core/seo/**`, `tools/generate-sitemap.*`, `public/robots.txt` | Implemented | Metadata, canonical, schema, robots/sitemap from approved routes only. |
| `src/app/core/analytics/**` | Implemented as privacy-safe/no-op boundary | Event taxonomy excludes names, contact details, message text, and health payloads. |
| `docs/architecture/future-bounded-contexts.md` | Implemented | Roadmap seams and hard boundary for patient/clinical/Raspberry Pi systems. |

## Interfaces / Contracts

```ts
type ApprovalStatus = 'verified-publishable'|'approved-placeholder'|'blocked-unverified'|'merge-into-hub'|'future-scope';
type ModalityPreference = 'in-person-ciudad-real'|'online'|'unsure';
interface InterventionTopic { sourceLabel: string; slug: string; parentHub: string; status: ApprovalStatus; }
interface ContentPage { canonicalPath: string; status: ApprovalStatus; primaryIntent: string; modalityAvailability: Partial<Record<ModalityPreference, ApprovalStatus>>; }
interface ContactRequest { name: string; email?: string; phone?: string; preferredContact: 'email'|'phone'; modalityPreference: ModalityPreference; reasonCategory: string; message?: string; privacyConsent: true; }
```

`InterventionTopic.sourceLabel` is the source of truth and MUST preserve the exact supplied Spanish labels, including accents and wording; slugs/search keys are derived fields only. Contact validation MUST reject or hide unapproved modalities. Optional message copy MUST ask for practical contact context, not clinical history.

Analytics events: `page_view`, `cta_click`, `contact_form_start`, `modality_preference_selected`, `contact_submit_success`, `contact_submit_failure`, `consent_visible`, `gbp_click`. Allowed properties: route, CTA source, non-identifying modality code, broad reason category, validation outcome. Disallowed: name, email, phone, message, health details, IP-derived identity, session replay payloads.

## Testing Strategy

| Layer | What | Approach |
|---|---|---|
| Unit | approval statuses, exact-label preservation, modality validation, analytics redaction, CSRF guardrails, server lifecycle identity | Vitest tests in the current Angular workspace. |
| Integration | Static-prerender metadata, sitemap exclusion, contact handler, provider failure | Mock env/provider; assert no payload in logs/events. |
| E2E/a11y | local landing to in-person contact CTA, keyboard form, legal links | Active Playwright + axe checks. |

## Migration / Rollout

Accepted `size:exception` delivery implemented the current static-prerender foundation, content/approval/modality registry, local landing + CTA routing, contact/privacy/analytics boundary, and quality/CI in one oversized work unit. Future OperationsAutomation may consume approved public content, calendars, checklists, and aggregate metrics only. Any patient-data, clinical, or Raspberry Pi system is a later bounded context with no shared public-web datastore by default.

## Implementation Status / Current State Addendum (2026-07-23)

- Angular workspace, source, tests, quality tooling, and GitHub Actions now exist and are active.
- Delivered runtime is Angular static-prerender output served by an Express API/static server boundary for contact, health, and 404 handling; this delivery does **not** claim runtime SSR.
- Vitest, Playwright, axe, Lighthouse, inventory, prerender, Pages, lifecycle, lint, typecheck, and build checks are part of the active verification contract.
- Historical proposal intent around an Angular SSR/prerender-capable foundation is preserved as planning context, but current-state language in this design must be read as static-prerender plus Express API unless a future SDD change explicitly approves runtime SSR.

## Open Questions

- [ ] Marta/legal approval for in-person address/service-area, online availability if any, contact channels, retention, analytics, and exact intervention publishability.
- [ ] Future vendors/hosting/email/analytics data-processing terms.
