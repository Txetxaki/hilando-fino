# Proposal: Marta Digital Practice Platform — Treatment Page Preview Correction

## Intent

Correct the website plan so the preview implementation owns Marta's treatment taxonomy with substantial child routes, not hub-only cards. Outcome: visitors can evaluate age/sector-specific fit while preview publication remains legally gated.

## Scope

### In Scope
- Angular 22 static-prerender public site plus Express API/static boundary; runtime SSR is not claimed.
- Exactly **29 dedicated treatment pages/routes** under the four parent sectors, as mapped in the exploration addendum: Infancia y familias (10), Adolescentes (8), Adultos (7), Orientación educativa y formación (4).
- Each treatment page must exist, be substantial, differentiated, first-person in Marta's voice, prerendered, canonical/breadcrumbed, linked, and testable.
- Sector hubs organize and link all owned children. Hub-only cards are no longer sufficient.
- `/psicologia-trauma-ciudad-real` remains a local cross-sector trauma/duelo/EMDR pillar and must not replace child/adolescent/adult trauma or grief routes.
- Preview route existence is separate from indexable publication: meta `noindex`/robots remain until Marta/legal approval; unsupported credentials, contact data, NAP/LocalBusiness, testimonials, prices, modalities, and service claims remain gated.

### Out of Scope
- Diagnosis, triage, treatment guarantees, self-tests as decision tools, clinical AI, patient records, session recording, booking, payments, CRM, live contact publication, fabricated facts, testimonials, unsupported LocalBusiness/NAP, and unapproved EMDR/service claims.
- Agency narration or third-person Marta copy in public visitor text.
- Larger practice OS roadmap and sensitive Raspberry Pi/local AI workflows.

## Capabilities

### New Capabilities
- `public-website-foundation`: static-prerender IA, accessible treatment navigation, preview-safe route coverage.
- `local-seo-content-architecture`: exactly-29 treatment route ownership, internal linking, trauma pillar, anti-cannibalization QA.
- `content-approval-system`: first-person Marta voice, verified-facts model, preview/noindex separation, approval audit trail.
- `privacy-contact-and-launch-gates`: privacy-safe contact, contextual clinical boundaries, legal/publication gates.

### Modified Capabilities
- None — capabilities remain change-scoped deltas.

## Approach

Use typed treatment content as the single source for routes, prerender params, sitemap, navigation, schema, link graph, and QA. Add one generic treatment renderer; keep existing hubs/pillars, but make hubs link every child. Preserve current publication-copy/navigation work where safe.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/app/content/treatment-*` | New | Canonical 29-page treatment model and indexes. |
| `src/app/pages/**`, `src/app/app.routes*` | Modified | Generic renderer, child routes, hub links, prerender params. |
| `src/app/content/public-routes.ts`, `tools/**`, `tests/**` | Modified | Derived route/sitemap/schema/link/voice/depth verification. |
| `openspec/changes/marta-digital-practice-platform/**` | Modified | Corrected SDD trail. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Review burden from 29 pages | High | Accepted `size:exception`; still slice implementation and verify in batches. |
| Thin/duplicated YMYL content | High | Depth, similarity, route ownership, and human review gates. |
| Unverified clinical/legal facts | High | Keep preview `noindex`; gate publication and unsupported schema/contact. |

## Rollback Plan

Remove treatment modules/routes and return hubs to the prior static-card model; keep static pages, contact/server boundary, and OpenSpec artifacts for replanning.

## Dependencies

- Exploration addendum route map; Marta/legal approval before indexable publication.

## Success Criteria

- [ ] Exactly 29 mapped child routes exist once, prerender, link from hubs, and pass route/sitemap/canonical tests.
- [ ] Each page has first-person Marta voice, differentiated substance, FAQ, CTA, related links, boundaries, and source/approval metadata.
- [ ] Preview remains non-indexable; unsupported facts/schema/contact stay gated.
- [ ] Non-goals remain excluded despite accepted `size:exception` and high review burden.
