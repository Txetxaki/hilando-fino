# Proposal: Marta Digital Practice Platform — Public Website Foundation

## Intent

Plan the first bounded slice: an Angular 22 **SSR** public website foundation for Marta Martín / Hilando Fino Psicología. The user’s “SSE” is recorded as corrected to **SSR**. Business outcome: attract qualified in-person psychology inquiries in Ciudad Real, build trust with verified facts, and avoid unsafe clinical/SEO claims.

## Users

- Prospective clients and parents comparing psychology options in Ciudad Real.
- Marta, who needs an approvable source-of-truth, contact flow, and launch gates.

## Scope

### In Scope
- IA/routes: `/`, `/sobre-mi`, `/como-trabajo`, `/areas-de-intervencion`, `/psicologia-ciudad-real`, `/contacto`, `/aviso-legal`, `/privacidad`, `/cookies`; `/talleres` is a requested top-level route/section, conditional on real workshop offering details.
- Bounded first slice: website IA, content model, local SEO architecture, accessible visual system, privacy-safe contact flow, launch gates, and measurement baseline.
- Content approval inventory below: every topic must receive publishability status, parent hub ownership, and thin-page/cannibalization decision before launch.

### Complete Content Inventory
Inclusion here is planning inventory only. It does **not** automatically mean a standalone page, verified clinical offer, SEO target, or launch-ready claim.

- **Infancia y familias**: ansiedad; miedos; regulación emocional; problemas de conducta; dificultades escolares; trauma y duelo infantil; separación de los padres; autoestima; problemas de sueño; control de esfínteres.
- **Adolescentes**: autoestima; ansiedad; relaciones sociales; identidad; orientación académica; trauma; duelo; regulación emocional.
- **Adultos**: ansiedad; estrés; trauma; duelo; dependencia emocional; relaciones de pareja; crecimiento personal.
- **Orientación educativa y formación**: dificultades de aprendizaje; altas capacidades; coordinación con centros educativos; asesoramiento familiar.
- **Talleres**: requested as a top-level route/section only if Marta confirms actual workshops, audience, format, dates/availability, privacy boundaries, and commercial/legal details.

### Out of Scope
- Clinical records, session recording, automated diagnosis/triage, booking/payment/CRM integrations, patient-data AI/Raspberry Pi workflows.
- Publishing testimonials, unverified credentials, final service claims, prices, address, modalities, standalone topic pages, or SEO copy.
- Larger business OS roadmap: content engine, reputation loop, intake ops, booking/payment, CRM, local AI for non-sensitive admin.

## Capabilities

### New Capabilities
- `public-website-foundation`: Angular 22 SSR/prerender public IA, Stitch-informed design system, accessibility constraints.
- `local-seo-content-architecture`: Ciudad Real SEO, route taxonomy, internal linking, schema rules, cannibalization controls.
- `content-approval-system`: verified/placeholder content model, inventory status, hub ownership, and Marta approval workflow.
- `privacy-contact-and-launch-gates`: minimized contact flow, legal/privacy gates, safe analytics, launch checklist.

### Modified Capabilities
- None — no existing `openspec/specs/` specs were found.

## Approach

Use the static Stitch export only as migration/design reference. Future implementation creates an Angular 22 SSR app with prerendered SEO-critical routes and server-side contact submission. Spanish public copy is authored later from approved facts only. Hubs own broad intent; topics split only when Marta confirms offer, depth, and non-cannibalization.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `openspec/changes/marta-digital-practice-platform/` | Modified | Proposal/spec trail with complete topic inventory. |
| `code.html`, `screen.png`, `DESIGN.md` | Referenced | Stitch v20 migration input only. |
| `claude-project/**`, `IMG_0742.JPG` | Referenced | Source facts; placeholders remain launch blockers. |
| Future `src/app/**`, SSR/server config | New | Later implementation only. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Unverified clinical/legal claims | High | Block launch until Marta/legal approval. |
| Thin SEO pages/cannibalization | Med | Require status, hub owner, and split/merge decision per topic. |
| Contact form captures sensitive data | High | Minimize fields, consent, retention, no analytics payloads. |
| Scope expands into business OS | Med | Defer roadmap into separate SDD changes. |

## Rollback Plan

Keep Stitch export intact. If Angular implementation fails, revert Angular commits, retain static reference assets, disable contact endpoint/analytics, and keep OpenSpec artifacts for replanning.

## Dependencies

- Marta approval of credentials, registration, address, contact channels, modalities, exclusions, intervention topics, workshops, legal/privacy texts, retention, GBP/citation decisions.

## Success Criteria

- [ ] Specs can be written for all four new capabilities without implementing code.
- [ ] Every supplied topic is present in inventory and has owner, publishability status, and cannibalization rule before launch.
- [ ] `/talleres` is treated as requested top-level route/section but blocked until offering details are confirmed.
- [ ] Future business OS items remain visible but excluded from this first slice.
