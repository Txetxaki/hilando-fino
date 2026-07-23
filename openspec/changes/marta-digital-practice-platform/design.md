# Design: Marta Digital Practice Platform

## Technical Approach

Preserve the prior design: the current delivery is an Angular 22 **static-prerender** public site plus an Express API/static boundary for contact, health, and safe 404 handling; runtime SSR is not claimed. This addendum updates the architecture from hub-only treatment cards to 29 substantial, first-person treatment pages generated from one typed content source. There is no runtime CMS: content, routes, prerender params, sitemap, navigation, link graph, schema, and QA checks are derived from typed modules committed with the app.

## Architecture Decisions

| Area | Choice | Rejected | Rationale |
|---|---|---|---|
| Content source | `treatmentPages` becomes the canonical source for child pages; static pages, hubs, and pillars remain separate typed records. | Giant switch; duplicated route/metadata/menu registries. | One source prevents drift across prerender, sitemap, links, and SEO metadata. |
| Routing/prerender | Use one generic treatment renderer with typed path params and Angular `RenderMode.Prerender` `getPrerenderParams()` from `treatmentPages`; also expose derived concrete manifest entries for tools. | 29 components or hand-entered server routes. | Angular supports build-time param generation; Pages still receives static HTML files. |
| Page model | Each treatment record owns first-person intro, situations, context/impact, “cómo puedo acompañarte”, process, FAQ, related links, local CTA, sources/editorial metadata, and safety/referral boundary. | Keyword-only pages or cloned hub text. | Supports useful YMYL-adjacent content while preserving approval gates. |
| Voice/content QA | Lint only public visible fields and rendered HTML; allow technical docs, code identifiers, legal identity, logo alt, metadata exceptions, and `Person` schema. | Repo-wide forbidden-word scan. | Catches agency narration without blocking internal SDD/config language. |
| Similarity/link graph | Add sector differentiation assertions, similarity warn/fail thresholds, no-orphan checks, hub-child reciprocity, trauma pillar reciprocity, and <=3 click-depth checks. | Manual editorial review only. | Automated checks reduce doorway/cloning risk before human review. |
| Schema | Keep `WebSite`, `Person`, `BreadcrumbList`, and `FAQPage` only for visible FAQs; no `LocalBusiness`, NAP, review, medical/clinical service schema. | Unsupported local/clinical markup. | Avoids fabricated healthcare trust signals. |
| Performance/Pages | Keep static prerender, route-level lazy rendering, generated sitemap/canonicals using `siteConfig.baseHref`/Pages origin, and preview `noindex` invisible in copy. | Runtime CMS or bundled monolithic content in every route. | 29 extra routes are build-time cost, not runtime dependency. |

## Data Flow

```text
source facts + route map -> treatmentPages[] -> treatmentIndex lookups
  -> Angular route params / public manifest / sitemap / nav / link graph
  -> generic treatment page -> SEO metadata + allowed schema -> Pages artifact
```

## File Changes

| File | Action | Description |
|---|---|---|
| `src/app/content/treatment-types.ts` | Create | Typed contracts for sector, route, sections, FAQ, links, source facts, editorial status, boundary notes. |
| `src/app/content/treatment-pages.ts` | Create | 29 canonical treatment records using the exploration route map and first-person content model. |
| `src/app/content/treatment-index.ts` | Create | Derived lookups by canonical path, sector, slug, topic key, related links, and prerender params. |
| `src/app/content/public-routes.ts` | Modify | Derive manifest from static pages + hubs + pillars + treatment pages; no duplicate route metadata. |
| `src/app/app.routes.ts`, `src/app/app.routes.server.ts` | Modify | Add parameterized treatment route and prerender params; keep static routes and 404 behavior. |
| `src/app/pages/treatment-page.component.ts` | Create | Generic renderer for all child pages with breadcrumbs, FAQ, CTA, related links, and boundaries. |
| `src/app/pages/page-data.ts`, `src/app/app.component.ts` | Modify | Preserve current publication-copy work, make hub cards link to child pages, generate menu/mega-menu data from content. |
| `src/app/core/seo/schema.ts`, `tools/generate-sitemap.ts`, `tools/verify-*.mjs` | Modify | Generate FAQ/Breadcrumb IDs, sitemap/canonicals, Pages base-path checks, and all route verification from the same source. |
| `src/app/content/content.spec.ts`, `tests/e2e/**` | Modify | Add voice lint, similarity, link graph, route coverage, a11y, screenshot, and SEO content checks. |

## Interfaces / Contracts

```ts
interface TreatmentPage {
  topicKey: `${TreatmentSector}:${string}`; canonicalPath: `/${string}`;
  sector: TreatmentSector; slug: string; title: string; description: string; h1: string;
  introFirstPerson: string; situations: ContentSection[]; contextImpact: ContentSection[];
  howICanHelp: ContentSection[]; process: ContentSection[]; faq: FaqItem[];
  related: InternalLink[]; localCta: string; sources: SourceFact[];
  editorial: { status: ApprovalStatus; lastReviewed: string; approver?: string; similarityGroup?: string };
  boundaries: BoundaryNote[];
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Unit | 29 route coverage, unique H1/title/meta/canonical, exact sector ownership, voice lint, forbidden agency narration, schema allowlist, link graph, similarity thresholds, boundaries. | Vitest over typed records plus rendered visible payload allowlists. |
| Integration | Static prerender params, sitemap/canonical under `/hilando-fino/`, Pages artifact files, no false schema, no visible `noindex`/internal state. | Build/prerender/Pages verifier scripts from derived manifest. |
| E2E/a11y/screenshots | Desktop mega-menu, mobile sector accordion, child route smoke, FAQ/breadcrumb rendering, footer/hub discoverability, focus/ESC/outside close. | Playwright + axe + screenshot self-critique. |

## Migration / Rollout

Do not discard current uncommitted publication-copy/navigation work. First add new treatment modules and derived manifest tests while leaving existing hub pages intact. Then migrate hub cards from static no-href cards to child links sector by sector, preserving useful current copy as hub introductions. Add treatment pages in batches, keep preview `noindex`, keep live contact/LocalBusiness gates blocked, and validate each batch. Rollback is to remove child treatment modules/routes and return hubs to the existing static-card model; existing static pages/contact/server boundaries remain untouched.

## Current Architecture Update Addendum (2026-07-23)

Current code confirms the migration need: `interventions.ts` marks all 29 topics `merge-into-hub`, `page-data.ts` renders them as no-href cards with some third-person/agency copy, and `public-routes.ts` manually enumerates routes. The updated design supersedes only that hub-only child-page decision; it preserves the static-prerender + Express boundary, local/trauma pillar, robots/noindex preview policy, privacy-safe contact design, and prior roadmap exclusions.

## Open Questions

- [ ] Marta/legal approval for exact service publishability, in-person address/service area, contact channels, retention, analytics, and clinical/legal review before indexable launch.
