## Exploration: Marta digital practice platform

### Current State
The repository is currently a strategy, content, and design repository, not an application codebase. It contains brand guidelines, Claude Project knowledge documents, a Stitch v20 static export (`code.html`, `screen.png`, `DESIGN.md`), logo assets, `IMG_0742.JPG`, and OpenSpec configuration. There is no Angular workspace, `package.json`, CI config, test runner, or implementation source yet.

The requested first business slice is a Spanish public website for Marta Martín / Hilando Fino Psicología, built later as Angular 22 with SSR/prerendering and focused on qualified in-person psychology demand in Ciudad Real. The minimum requested IA is:

- `Sobre mí`
- `Cómo trabajo`
- `Áreas de intervención`
- `Contacto/formulario`
- Dedicated local landing/content hub for `Psicología Ciudad Real`

Verified source facts are still limited. `claude-project/conocimiento-01-sobre-marta-y-la-consulta.md` explicitly contains `[COMPLETAR]` placeholders for collegiate number, training, office address, schedule, email, phone, service exclusions, modalities, and precise areas of work. These are launch blockers. The Stitch export is useful as visual/reference input but its copy must be treated as unverified until Marta confirms it.

Verified `Cómo trabajo` source from `IMG_0742.JPG`:

- Marta presents her work as integrative psychology.
- Each person has a unique story and deserves an intervention adapted to their needs.
- Work begins with careful evaluation to understand symptoms and what maintains them.
- She works from an approach integrating scientifically supported interventions such as EMDR and other demonstrated-efficacy models, with a humanistic view centered on the person, emotions, relationships, and resources.
- Her training in Gestalt Therapy and Bioenergetics enriches her way of understanding therapy, attending both emotional experience and the role of the body and relationships in psychological well-being.
- With families, she works from attachment-based models including Circle of Security Parenting, supporting understanding of children/adolescents' emotional needs and strengthening parent-child bonds.
- Her goal is not applying one fixed technique, but finding the best way to accompany each person.

Brand constraints are already defined: warm professional tone, “cercana, precisa, sin humo”; thread/knot metaphor used moderately; no guarantees, miracle claims, manipulative urgency, fabricated credentials, testimonials, outcomes, office address, or clinical claims. Accessibility constraint: plum `#5A434C` is safe for body text on warm white, while terracotta `#D1807E` is not sufficient for normal text on white.

Angular target state: current SDD config records Angular 22 SSR as the requested future stack, not the detected stack. Future implementation should use SSR/prerendering for SEO-critical public routes and server-side handling for contact submissions. Until an Angular workspace exists, verification must honestly report unavailable test/build commands.

#### External evidence and local market signal

Search access was partially limited by Google/Bing anti-bot flows, so conclusions are directional and must be refreshed before launch. Evidence gathered from DuckDuckGo and direct competitor/directory pages shows a local market shaped by service + city intent, phone/contact CTAs, professional trust markers, local addresses, legal pages, Google reviews, and content clusters.

Query evidence used:

- DuckDuckGo: `psicólogos Ciudad Real`
- DuckDuckGo: `psicología Ciudad Real terapia EMDR`
- Direct directories/pages: Doctoralia search for psychologists in Ciudad Real, MundoPsicologos Ciudad Real, and named local competitors below.

Named competitors and observed evidence:

| Competitor / source | URL | Observed positioning | Useful lesson for Marta | Gap/opportunity |
| --- | --- | --- | --- | --- |
| Grupo VOLMAE Ciudad Real | https://volmae.es/ciudadreal/ | Local page with “Centro de Psicólogos en Ciudad Real”, multi-division service offer, phone, professional profile, Google review embed, Doctoralia link. | Local trust signals and review presence matter. | Marta can be more personal, calmer, and less corporate if verified credentials and method are clear. |
| Psyforis Psicólogos Ciudad Real | https://www.psyforis.es/ | “Psicólogos en Ciudad Real”, children/adolescents/adults, couple therapy, neuropsychology, forensic, online, address, phone, contact form with privacy acceptance. | Competitors cover broad service taxonomies and direct contact. | Marta can win with clearer copy, fewer typos/generic claims, stronger clinical boundaries, and better IA. |
| Psicología Ciudad Real / Alba Cristina Rodríguez Villajos | https://psicologiaciudadreal.com/ | Exact-match local domain/name, adult, child/adolescent, online pages, “Sobre mí”, blog, contact, FAQ, testimonials, sanitary registration. | Exact local intent pages and trust/legal details are standard. | Marta needs differentiated brand language and should avoid unverified testimonials. |
| Isidro Sánchez Rubio | https://psicologoisidrosanchezrubio.com/ | “Psicólogo en Ciudad Real y online”, individual/family/couple, tariffs, address, WhatsApp, privacy block under form, collegiate number. | Pricing, modality, address, WhatsApp, and collegiate data reduce friction. | Marta can decide whether to publish pricing; must publish professional/legal facts once confirmed. |
| Mar Milla Psicóloga | https://psicologamarmilla.com/sobre-mi/ | Strong EMDR and child/adult/online taxonomy, credentials, registration, formation, testimonials, blog, WhatsApp CTA. | EMDR and technique pages can rank and educate. | Marta should publish EMDR only with accurate scope, training, and non-promissory language. |
| Luis Fernando Rivas Psicología | https://psicologialuisfernandorivas.com/ | EMDR/trauma/apego specialization, deep content cluster, individual/couple/parenting, testimonials, local address/phone/hours. | Topic clusters can dominate long-tail queries. | Marta can create a safer, more restrained clinical content hub with stricter E-E-A-T and no outcome guarantees. |

Reference sources shaping requirements:

- GDPR: https://eur-lex.europa.eu/eli/reg/2016/679/oj
- AEPD DPIA guidance: https://www.aepd.es/derechos-y-deberes/cumple-tus-deberes/medidas-de-cumplimiento/realizacion-de-evaluaciones-de and https://www.aepd.es/preguntas-frecuentes/2-tus-obligaciones-como-responsable-del-tratamiento/10-evaluacion-de-impacto
- European Commission DPIA guidance: https://commission.europa.eu/law/law-topic/data-protection/rules-business-and-organisations/obligations/when-data-protection-impact-assessment-dpia-required_es
- COP Code of Ethics: https://www.cop.es/index.php?page=CodigoDeontologico and https://www.copclm.com/codigo-deontologico/
- COP data-protection reference: https://www.cop.es/index.php?page=ProteccionDatos
- Core Web Vitals: https://web.dev/articles/vitals
- Google LocalBusiness structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google review snippet structured data policy: https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- Google Business Profile docs: https://support.google.com/business/answer/3038177?hl=es
- Google helpful content guidance: https://developers.google.com/search/docs/fundamentals/creating-helpful-content

#### Business-system opportunity map

The website should be treated as the first layer of a broader practice operating system, not “just a brochure”. The initial build should reduce friction, qualify demand, and create operational data without storing unnecessary health detail.

| Opportunity | Business value | Initial digital capability | Estimated time saved once mature | Priority |
| --- | --- | --- | --- | --- |
| Qualified inquiry capture | More relevant first contacts and fewer mismatched requests. | Contact flow with reason categories, modality, availability, consent, and “not emergency” guidance. | 2-4 hours/month by reducing back-and-forth. | P0 |
| Local SEO acquisition | More discovery for Ciudad Real searches without paid ads. | Local landing, service pages, GBP consistency, citations, performance. | Marketing dependency reduction; 1-3 qualified leads/month target after ramp. | P0 |
| Trust and E-E-A-T | Higher conversion from anxious/high-consideration users. | Verified credentials, sanitary registration if applicable, method, boundaries, legal/privacy. | Indirect: fewer reassurance messages; better fit. | P0 |
| Content engine | Long-tail visibility and better pre-session education. | Editorial calendar around verified areas; non-diagnostic educational articles. | 1-2 hours/month repurposing content instead of writing from zero. | P1 |
| Intake triage | Safer routing before first appointment. | Lightweight pre-contact categories and manual review, no automated diagnosis. | 3-6 hours/month if volume grows. | P1 |
| Review and reputation loop | More resilient local trust. | Ethical review request workflow after appropriate milestones, not in-session pressure. | 1 hour/month manual follow-up saved. | P1 |
| Internal knowledge base | Consistent answers and content creation. | Claude Project / local knowledge base using approved facts only. | 2-5 hours/month content/admin support. | P1 |
| Booking/payment automation | Lower admin overhead. | Later integration only after privacy/legal review. | 4-8 hours/month depending on volume. | P2 |
| Local AI/Raspberry Pi assistant | Private drafting/summarization of non-sensitive operations. | Offline assistant for approved public content, FAQ drafts, checklist reminders. | 2-6 hours/month; not for clinical records initially. | P2/P3 |

#### KPIs and launch measurement

Initial KPIs should measure trust, qualified contact, and local visibility rather than vanity traffic.

- Local search visibility: impressions/clicks for `psicóloga ciudad real`, `psicología ciudad real`, and approved service combinations.
- Qualified inquiries: number of non-emergency contact submissions with complete contact data and relevant request category.
- Conversion: contact CTA click-through from home, local landing, service pages, and `Cómo trabajo`.
- Friction: incomplete form rate, privacy-consent drop-off, mobile tap-to-call/tap-to-WhatsApp usage if enabled.
- Trust completeness: percentage of launch-gate facts completed and verified.
- Performance: pass Core Web Vitals targets on mobile field/lab checks.
- GBP: profile completeness, calls, direction requests, website clicks, review count/rating trend.
- Content quality: pages with named author/reviewer, update date, sources where clinical education is present.

#### Core Web Vitals and performance targets

Use Google’s Core Web Vitals as launch targets:

- LCP: <= 2.5s on mobile for key pages.
- INP: <= 200ms.
- CLS: <= 0.1.
- Lighthouse performance target: >= 90 for home, local landing, service hub, and contact.
- SSR/prerender critical pages; optimize image sizes; preload local fonts or use performant Google Fonts strategy; avoid heavy third-party widgets on landing pages.
- Do not embed review widgets or map iframes above the fold; load them progressively or link out when needed.

### Affected Areas
- `openspec/config.yaml` — Confirms hybrid persistence, no current implementation stack, future Angular 22 SSR target, no testing tools yet, and healthcare communication constraints.
- `README.md` — Documents repo inventory and warns that pending real data must be completed before reliable public copy.
- `identidad-de-marca/guia-de-marca.md` — Source of truth for brand concept, palette, typography, tone, and accessibility guidance.
- `claude-project/conocimiento-01-sobre-marta-y-la-consulta.md` — Primary business fact source, but currently contains placeholders for critical verified facts.
- `claude-project/conocimiento-02-tono-de-voz-y-estilo.md` — Tone rules and examples for honest psychology copy.
- `claude-project/conocimiento-03-publico-y-mensajes-clave.md` — Audience and messaging hypotheses that need validation.
- `claude-project/instrucciones-personalizadas.md` — Non-negotiable rules: do not invent facts, do not promise outcomes, use honest SEO.
- `IMG_0742.JPG` — Verified source for `Cómo trabajo` section.
- `code.html`, `screen.png`, `DESIGN.md` — Stitch visual reference; useful for layout/style direction, not authoritative copy or architecture.
- Future Angular workspace files — Later apply phase only if approved: `angular.json`, `package.json`, `src/app/**`, SSR/server config, routes, tests, lint/typecheck setup.
- Future content/legal files — Privacy policy, legal notice, cookie policy, form consent copy, data-retention notes, professional disclaimers, emergency guidance, and consent records.
- Future local operations assets — GBP profile, citation listings, review request templates, analytics/search-console setup, and possible local AI/Raspberry Pi SOPs.

### Approaches
1. **Website-first Angular SSR foundation** — Create an Angular 22 SSR public website with strongly structured content, local SEO routes, accessible brand system, and a minimal secure contact pathway.
   - Pros: Directly addresses immediate acquisition goal; improves local discoverability; creates a clean base for later platform features; SSR/prerendering fits SEO and performance needs.
   - Cons: Requires confirmed professional/business facts before publishing; Angular setup and testing infrastructure must be introduced from zero; contact forms require careful privacy/legal handling.
   - Effort: Medium

2. **Content/legal validation first, implementation later** — Pause implementation until Marta completes all placeholders, confirms services, legal texts, contact details, credentials, and operating model.
   - Pros: Lowest risk of publishing invented or non-compliant healthcare claims; copy/spec can be precise; avoids rework.
   - Cons: Slower visible progress; does not produce the web foundation immediately; may stall if source facts are delayed.
   - Effort: Low to Medium

3. **Full practice operating system from the start** — Design website, CRM, intake, automations, Raspberry Pi/local AI workflows, booking, content hub, internal dashboard, client records, analytics, and admin automations as one large product.
   - Pros: Aligns with the larger business operating-system vision; can avoid future integration dead ends; useful for long-term architecture.
   - Cons: Too broad for the first change; high GDPR/health-data risk; would overload review scope and likely exceed the configured review budget; many legal/operational decisions are unresolved.
   - Effort: High

4. **No-code/WordPress quick launch** — Launch on a template CMS and postpone Angular.
   - Pros: Fastest visible launch; mature plugins for forms, SEO, legal pages, and GBP-style content.
   - Cons: Conflicts with requested Angular 22 SSR target; plugin/privacy attack surface; harder to enforce strict performance and content architecture; likely creates migration debt.
   - Effort: Low initially, Medium later

### Recommendation
Proceed with **Website-first Angular SSR foundation**, but keep it bounded as the first SDD slice: public website IA, content model, local SEO architecture, accessible visual system, privacy-safe contact flow, measurement plan, and clear launch gates. Treat all unverified business facts as placeholders and make completion/approval mandatory before publication.

The implementation proposal should explicitly separate:

- **Verified content**: brand guide, tone rules, `Cómo trabajo` image content, requested IA, and current repo state.
- **Placeholders requiring Marta approval**: credentials, collegiate number, sanitary registration if applicable, address, schedule, contact data, modalities, exclusions, prices, exact service areas, testimonials/reviews.
- **Future operating-system scope**: CRM/intake, AI/Raspberry Pi workflows, appointment automation, internal dashboards, client records, analytics, and automations.

#### Recommended phased roadmap

| Phase | Goal | Scope | Exit gate |
| --- | --- | --- | --- |
| Phase 0 — Truth and compliance pack | Make the site publishable without invented facts. | Complete `[COMPLETAR]` fields, verify credentials, office data, modalities, exclusions, legal/privacy basis, emergency guidance. | Marta approves source-of-truth sheet and legal/privacy text. |
| Phase 1 — Public web foundation | Launch trustworthy local web presence. | Angular 22 SSR/prerender app, brand system, IA, local landing, contact page, legal pages, analytics/search console basics. | Quality/performance/accessibility checks pass; no unverified facts remain. |
| Phase 2 — Local SEO and content cluster | Build topical authority safely. | Approved intervention pages, local content hub, FAQ, schema, GBP/citations, editorial process. | Marta approves intervention taxonomy and clinical content review process. |
| Phase 3 — Operations layer | Reduce admin friction. | Inquiry triage, response templates, review workflow, content calendar, simple CRM/process tracker. | DPIA/legal review confirms data flow and retention controls. |
| Phase 4 — Local AI/Raspberry Pi experiments | Use local automation only where safe. | Public-content drafting, non-sensitive admin checklists, local document search over approved materials. | Threat model, backups, access control, retention, and human approval are in place. |

#### Explicit “do not build initially” list

- Do not build client records, therapy notes, diagnostic tools, self-diagnosis tests, or clinical decision support.
- Do not record sessions, calls, form interactions, or therapy content by default.
- Do not automate clinical triage, risk assessment, diagnosis, or treatment recommendations.
- Do not integrate payment/booking/CRM systems until data roles, lawful basis, retention, and processor agreements are clear.
- Do not publish testimonials unless they are ethically obtained, legally usable, and compliant with platform/structured-data policies.
- Do not add analytics that capture health-related form content, free-text clinical data, or identifiable sensitive behavior.
- Do not use third-party AI APIs with patient/special-category data unless there is a signed processor arrangement, clear lawful basis, and explicit approval.

#### Recommended route/content architecture

- `/` — Brand-led home page with local positioning, safe primary CTA, proof/trust block, summary of method, service entry points, and contact path.
- `/sobre-mi` — Marta profile, credentials only once verified, professional registration, approach, and why the practice exists.
- `/como-trabajo` — Sourced from `IMG_0742.JPG`, with careful clinical language and no outcome promises.
- `/areas-de-intervencion` — Overview hub; only publish approved areas.
- `/areas-de-intervencion/infancia-y-familias` — Conditional on Marta confirmation; attachment/family framing can reference verified image content if approved.
- `/areas-de-intervencion/adolescentes` — Conditional; avoid generic claims until confirmed.
- `/areas-de-intervencion/adultos` — Conditional; broad adult therapy page only if Marta confirms adult practice.
- `/areas-de-intervencion/orientacion-educativa-y-formacion` — Conditional; publish only if part of real offer.
- `/areas-de-intervencion/emdr` — Conditional; publish only with confirmed EMDR training/scope and careful non-promissory education.
- `/talleres` — Conditional; publish only if actual workshops exist or are planned.
- `/psicologia-ciudad-real` — Local landing/content hub targeting city intent and linking to confirmed services.
- `/contacto` — Privacy-first contact path with phone/email/address once verified, map if approved, consent, and emergency boundary.
- Legal pages: `/aviso-legal`, `/privacidad`, `/cookies`.

Recommended rendering strategy:

- Prerender mostly static public content routes where feasible.
- Use server rendering for pages that need request-time metadata or dynamic content.
- Keep contact submission server-side/API-based and never expose sensitive form data to static artifacts, analytics, logs, or client-side-only storage.

#### Keyword-to-page map and cannibalization analysis

All clinical/service keywords below are planning candidates, not publishable claims, until Marta confirms she offers the area.

| Intent cluster | Primary page | Supporting pages | Cannibalization rule |
| --- | --- | --- | --- |
| `psicóloga ciudad real`, `psicólogo ciudad real`, `psicología ciudad real` | `/psicologia-ciudad-real` | `/`, `/contacto`, `/sobre-mi` | Local page owns city modifier. Home supports brand + city, but does not duplicate the full local pitch. |
| Brand / trust | `/sobre-mi` | `/como-trabajo`, `/psicologia-ciudad-real` | Credentials and biography live on `Sobre mí`; method lives on `Cómo trabajo`. |
| Method / approach | `/como-trabajo` | `/areas-de-intervencion/emdr`, `/sobre-mi` | `Cómo trabajo` explains integrative approach; technique pages explain one technique only if verified. |
| Areas overview | `/areas-de-intervencion` | All child intervention pages | Hub summarizes and routes; child pages own search intent. |
| Adults | `/areas-de-intervencion/adultos` | Future articles on anxiety, duelo, autoestima, trauma if approved | Do not create separate condition pages until Marta confirms priorities; avoid thin pages competing with adult hub. |
| Children/families | `/areas-de-intervencion/infancia-y-familias` | Future articles on attachment/parent guidance if approved | Keep parent-child/attachment content under this hub; do not split too early. |
| Adolescents | `/areas-de-intervencion/adolescentes` | Future school/family transition articles if approved | Avoid overlap with child/family page by defining age/stage and parent involvement. |
| EMDR | `/areas-de-intervencion/emdr` or `/como-trabajo#emdr` initially | Future EMDR FAQ/article cluster | If EMDR is not a standalone commercial priority, keep it as a section first to avoid thin/cannibal pages. |
| Online therapy | Future `/terapia-online` only if offered | Contact/modalities section | Do not target online therapy unless modality is confirmed. |
| Couples | Future `/areas-de-intervencion/pareja` only if offered | Adult hub | Do not publish unless explicitly confirmed. |
| Workshops/training | `/talleres` | Future event/workshop pages | Keep separate from therapy to avoid confusing clinical service intent. |

#### Page-by-page UX, SEO, and conversion plan

| Page | User job | SEO target | Conversion action | Required trust elements |
| --- | --- | --- | --- | --- |
| Home | Understand who Marta helps and whether this feels safe. | Brand + psychology Ciudad Real secondary intent. | “Pedir información” / “Contactar” to privacy-safe contact flow. | Verified role, local signal, method summary, no promises. |
| Sobre mí | Decide if Marta is credible and personally compatible. | `psicóloga Marta Martín`, professional profile queries. | Contact CTA after credentials/method. | Collegiate number, formation, registration/address if applicable, professional photo if approved. |
| Cómo trabajo | Understand process and therapeutic stance. | Integrative psychology / EMDR + Ciudad Real secondary support. | CTA: ask if this way of working fits. | Verified text from image, careful evaluation, scientific support, humanistic/person-centered framing. |
| Áreas de intervención | Find relevant route without self-diagnosing. | Generic service hub. | Click into the matching approved area or contact if unsure. | Clear boundaries, “not emergency” note, no diagnostic quiz. |
| Child/family | Parents assess fit and safety. | `psicóloga infantil ciudad real`, `psicología familias ciudad real` if approved. | Contact with parent/guardian route. | Consent/guardian handling, attachment model if approved, no child data overcollection. |
| Adolescents | Parent or adolescent understands modality. | `psicólogo adolescentes ciudad real` if approved. | Contact with guardian/privacy expectations. | Confidentiality explanation in plain language. |
| Adults | Adult visitor sees relevant help areas. | `psicóloga adultos ciudad real` if approved. | Contact. | Scope and exclusions. |
| EMDR | Educate without overpromising. | `terapia emdr ciudad real` if approved. | Contact for assessment, not “book EMDR”. | Training/qualification, explain suitability requires evaluation. |
| Psicología Ciudad Real | Local searcher compares options. | `psicología ciudad real`, `psicóloga ciudad real`. | Tap-to-call/contact/directions when verified. | Address/service area, GBP consistency, reviews if ethical/available, legal identity. |
| Contacto | Make safe, low-friction contact. | Brand/local contact intent. | Submit minimized form, call, email, WhatsApp if approved. | Privacy summary, consent checkbox, emergency boundary, retention notice. |

#### Internal-linking model

- Header: Home, Sobre mí, Cómo trabajo, Áreas de intervención, Psicología Ciudad Real, Contacto.
- Home links to method, top approved service hubs, local landing, and contact.
- Every service page links back to `Áreas de intervención`, `Cómo trabajo`, `Sobre mí`, and `Contacto`.
- `Psicología Ciudad Real` links to verified local contact details, relevant service pages, and `Sobre mí`.
- Educational posts link upward to exactly one parent service page and laterally only when clinically relevant.
- Legal/privacy pages are reachable from footer and contact form; not hidden behind modals only.
- Avoid exact-match anchor stuffing; use natural Spanish anchors such as “cómo trabajo en consulta” or “psicología en Ciudad Real”.

#### Schema plan

- `LocalBusiness`/more specific healthcare-local-business type only after legal identity, address, phone, opening hours, and registration facts are verified; follow Google structured data guidelines.
- `Person` for Marta only with verified name, role, credentials, affiliation, and sameAs links.
- `WebSite` and `Organization`/brand schema for site identity.
- `BreadcrumbList` for nested service pages.
- `FAQPage` only for genuine visible FAQs, not SEO stuffing.
- `Article` for educational content with author, reviewer if used, date published/modified, and clear non-diagnostic disclaimer.
- Do not mark up first-party testimonials/reviews unless they comply with Google review snippet rules and healthcare/deontological constraints.

#### E-E-A-T evidence checklist

Before launch, gather and approve:

- Full name and professional display name.
- Collegiate number and relevant professional registration.
- Sanitary center registration if applicable.
- Confirmed training and modalities, including EMDR scope if published.
- Confirmed service areas and exclusions.
- Office address, service area, phone, email, schedule, accessibility notes.
- Professional photo and logo usage approval.
- Legal notice, privacy policy, cookie policy, data controller details.
- Clinical-content review process: who writes, who reviews, when updated.
- Emergency/crisis guidance and “not an emergency service” boundary if applicable.
- Citation/source policy for educational articles.

#### Google Business Profile plan

- Claim/verify GBP for the exact legal/practice name once address/service-area decision is confirmed.
- Keep NAP data identical across website, GBP, directories, and legal pages.
- Categories: choose primary psychology/psychologist category that matches real registration; avoid unrelated categories.
- Add services only when confirmed; do not stuff keywords in business name.
- Upload logo, exterior/interior photos if office is public and approved, professional photos if appropriate.
- Use GBP posts sparingly for educational/news content, not clinical promises.
- Add appointment/contact URL to `/contacto` or a dedicated booking page only after privacy checks.
- Track GBP website clicks, calls, direction requests, and search queries.

#### Citation and review strategy

- Start with high-trust citations: professional directories, COP/healthcare listings if applicable, Google Business Profile, Doctoralia only if Marta wants that channel, and consistent local directories.
- Use exact NAP consistency; document every listing in a simple registry.
- Review requests must be ethical, non-coercive, and never requested in a way that pressures active patients or reveals therapy status publicly.
- Do not publish fabricated testimonials. If testimonials are used, obtain explicit permission and legal review; consider avoiding testimonials entirely in the first launch and relying on credentials/method instead.
- Create a response protocol for public reviews: protect confidentiality, never confirm patient status, thank generically, invite private contact for concerns.

#### Raspberry Pi / local AI feasibility

Local AI can be useful later, but it is not “total data protection” by default. The design must assume health-related data can be special-category personal data and requires legal review, data minimization, security, and human approval.

Feasible initial local use cases:

- Draft public content from approved source documents.
- Maintain internal checklists and content calendars.
- Search approved brand/legal/content docs locally.
- Summarize non-sensitive business metrics exported without patient identifiers.

Do not use local AI initially for:

- Therapy notes, patient records, diagnosis, risk triage, session recordings, or automated treatment advice.
- Any workflow where a model output is sent to a client without human review.
- Any ingestion of identifiable health data without DPIA/legal basis/retention controls.

Threat model and controls required before any sensitive expansion:

- Lawful basis documented per processing purpose; explicit consent may be needed for some flows but must not be treated as a universal fix.
- DPIA trigger assessment before processing special-category data at scale, systematic monitoring, innovative AI profiling, or high-risk processing.
- Data minimization: contact form should collect only what is needed to respond, not detailed clinical histories.
- Encryption at rest and in transit; secure backups; tested restore process.
- Access control: named users, strong passwords, MFA where possible, least privilege, device hardening, patching.
- Network security: no exposed Pi services to the internet without hardened gateway/VPN/reverse proxy and monitoring.
- Audit trail for access, exports, deletion, and incident response.
- Retention/deletion rules: define how long inquiry data is kept if no therapeutic relationship begins.
- Processor/controller mapping for every third party: hosting, email, analytics, forms, booking, CRM.
- Human approval: all content, triage, and client-facing messages require Marta approval.
- No-recording/default boundary: no audio/video/session recording unless separately justified, consented, secured, and legally reviewed.
- Local-model limits: small local models may hallucinate, miss clinical nuance, and should be used for drafting/checklists, not clinical judgement.

#### Structured Marta decisions/questions

Marta must answer these before proposal/spec moves into implementation-ready scope:

1. What is the exact legal/professional display name?
2. What collegiate number and sanitary registration can be published?
3. What are the verified degrees, masters, EMDR training, Gestalt/Bioenergetics training, and attachment-family credentials?
4. Which modalities are offered at launch: in-person, online, both?
5. What is the office address, phone, email, schedule, and preferred first-contact channel?
6. Which intervention areas are genuinely offered at launch?
7. Which areas are explicitly not offered: emergencies, peritajes, psychiatric medication, crisis care, couples, children, online, etc.?
8. Should prices/tariffs be public?
9. Are workshops/training real launch services or future ideas?
10. Should the brand use Doctoralia/GBP/WhatsApp, and under what privacy boundaries?
11. Who reviews legal/privacy text and clinical content before launch?
12. What retention period applies to contact inquiries that do not become clients?

#### Launch gates

- Gate 1: Source-of-truth completion — all `[COMPLETAR]` fields resolved or intentionally excluded.
- Gate 2: Legal/privacy review — privacy policy, legal notice, cookies, contact consent, retention, and emergency boundary approved.
- Gate 3: Clinical/deontological review — no invented facts, no guaranteed outcomes, no diagnostic substitution, no manipulative urgency.
- Gate 4: SEO/accessibility/performance review — metadata, headings, schema, CWV, contrast, keyboard/focus states, responsive checks.
- Gate 5: Local presence consistency — website, GBP, citations, and legal pages use matching NAP data.
- Gate 6: Analytics safety — no sensitive form content sent to analytics/logging/third-party AI.

### Risks
- Publishing unverified psychology credentials, location, services, or claims would damage trust and may create legal/deontological risk.
- Contact forms can collect special-category health data if not minimized and governed properly.
- SEO pressure can push toward keyword stuffing, doorway pages, or manipulative clinical promises; the brand rules prohibit this.
- The Stitch export uses a static Tailwind CDN HTML approach and should not be treated as production Angular architecture.
- No test/build/lint infrastructure exists yet; implementation must introduce quality gates before claiming verification.
- Competitor/SERP research was partially limited by search-engine blocking; conclusions should be refreshed before launch.
- Testimonials/review markup can violate platform rules or ethical expectations if fabricated, pressured, or self-serving.
- AI/Raspberry Pi automation around patient data is high-risk and must not be designed as “total data protection”; it needs lawful basis, DPIA assessment, threat model, retention/deletion, audit, backups, and human approval.
- A broad “practice operating system” scope could exceed the 800-line review budget and should be split into chained, reviewable slices.

### Ready for Proposal
Yes — proceed to proposal for a bounded first slice: **Angular 22 SSR public website + local SEO architecture + privacy-safe contact flow + launch gates**, while explicitly deferring CRM/intake automation, clinical records, booking/payment integrations, and local AI handling of sensitive data.

The orchestrator should tell the user that exploration is ready for proposal, but implementation remains blocked until Marta confirms the missing real-world facts and legal/privacy texts.

---

## Treatment-page and first-person voice corrective addendum (2026-07-23)

### Addendum scope and merge note

This addendum MERGES new authoritative requirements into the existing exploration for `marta-digital-practice-platform`. It does not replace the prior strategic research. It corrects the current implementation direction after the previous apply introduced an Angular 22 static-prerender app, central route/content manifests, navigation changes, and a first local trauma pillar, but did not yet satisfy the user's new treatment-page ownership and voice requirements.

No application code was modified during this exploration. Current uncommitted application/content/navigation changes must be preserved by later phases.

### Current State Update

The repository now contains an Angular 22 app with SSR/static-prerender support rather than only brand/source documents. Relevant current architecture observed:

- `src/app/content/interventions.ts` preserves the exact 29 supplied treatment/topic labels, but currently marks them as `merge-into-hub` with `cannibalizationRule: 'hub-only'`.
- `src/app/pages/page-data.ts` renders the 29 treatments as static cards inside four parent hub pages; `content.spec.ts` currently asserts cards have no `href`, which directly conflicts with the new requirement that every treatment/topic has its own substantial page.
- `src/app/content/public-routes.ts` enumerates the public prerender manifest manually; this works for ~15 routes but will become brittle with 29 child pages plus hubs/pillars.
- `src/app/app.routes.server.ts` maps `publicRouteManifest` to `RenderMode.Prerender`; Angular docs confirm parameterized prerender routes can instead use `getPrerenderParams()` to generate static documents for content-driven paths.
- `src/app/app.component.ts` has a dropdown for sector discovery and a footer sitemap; later menu design must expose sectors and child discoverability without dumping all 29 links in top-level navigation.
- `src/app/pages/page-data.ts` and `src/app/content/content-matrix.ts` still contain public copy written about Marta/brand in third person, e.g. `Hilando Fino Psicología nace...`, `Marta Martín trabaja...`, `La web está pensada...`, `Marta Martín está al frente...`, `Marta describe...`, `Hilando Fino Psicología prioriza...`, and `Los talleres de Hilando Fino Psicología se conciben...`. These patterns violate the new first-person public voice contract.

### Authoritative Corrections

1. **Public visitor copy voice is first person from Marta.** Public website copy must sound like Marta speaking directly and naturally. It must not narrate Marta as a client, object, or third-party professional.
2. **All 29 supplied sector-specific treatments/topics require dedicated page ownership.** Hubs can summarize and route, but they cannot replace substantial child pages.
3. **Treatment pages must be researched, differentiated, and useful.** No cloned pages, doorway pages, keyword stuffing, generic symptom lists, or thin pages created only to satisfy SEO inventory.

### A. Visitor-Copy Voice Contract

#### Mechanical contract for public copy

Public visitor-facing text MUST use one of these voice modes:

- **Marta first person singular** for method, care stance, CTAs, and therapeutic-process explanations.
  - Example direction: `Trabajo desde una evaluación cuidadosa para comprender qué ocurre antes de decidir cómo intervenir.`
  - Example direction: `Si estás en Ciudad Real y quieres valorar si puedo acompañarte, puedes escribirme con una primera orientación breve.`
- **Direct second person** for visitor situations and questions.
  - Example direction: `Puede que te preocupe ver a tu hijo con miedo, bloqueos o cambios de sueño.`
- **Neutral informational Spanish** only where first person would be unnatural: navigation labels, breadcrumbs, H1/title tags, legal pages, privacy copy, schema labels, technical metadata, form field labels, and clinical/educational definitions.

#### Forbidden public-copy patterns

Later spec/apply MUST lint visible visitor fields for these patterns:

- Third-person Marta narration: `Marta trabaja`, `Marta acompaña`, `Marta ofrece`, `Marta explica`, `Marta describe`, `Marta quiere`, `Marta está al frente`, `su forma de trabajar`, `la fuente de trabajo de Marta`.
- Agency/brand narration: `Hilando Fino Psicología nace`, `Hilando Fino Psicología prioriza`, `se orienta a`, `se concibe como`, `la web está pensada`, `esta página reúne`, `el proyecto busca`.
- Internal instructions or approval state in visitor text: `pendiente`, `borrador`, `cuando se confirme`, `faltan datos`, `placeholder`, `aprobación`, `noindex`, `launch gate`, `estado`.
- Copy addressed to Marta internally: `Marta debe confirmar`, `Marta tiene que`, `preguntar a Marta`, except inside private technical artifacts.

#### Allowed exceptions

- `Marta Martín` may appear in logo alt text, structured `Person` data, legal/professional identification, page titles such as `Sobre mí | Marta Martín`, and neutral metadata where first-person phrasing is not natural.
- Clinical, legal, and privacy boundaries may use neutral language: `Esta web no sustituye una valoración profesional`, `En una emergencia...`, `Responsable del tratamiento...`.
- Technical code identifiers may remain English/neutral and are outside this public-copy voice requirement.

### B. Complete 29-Page Keyword-to-Route Map

All entries are planning candidates until Marta confirms she actively offers the area. H1/title/meta directions are final-facing Spanish directions, not final copy. Every child page belongs under exactly one parent hub and must have its own canonical route, title, meta description, H1, body outline, FAQ, internal links, and content QA record.

| # | Sector / audience | Canonical route | Search intent + local variant | Differentiation | H1 / title / meta direction | Page-specific questions + outline | Links / breadcrumb ownership | Cannibalization guard |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Infancia y familias | `/areas-de-intervencion/infancia-y-familias/ansiedad-infantil` | Parents seeking child anxiety help; `ansiedad infantil Ciudad Real`, `psicóloga infantil ansiedad Ciudad Real`. | Owns anxiety expressed through children and family routines, not adolescent autonomy or adult overwork. | H1: `Ansiedad infantil`; title: `Ansiedad infantil en Ciudad Real`; meta: `Acompaño a familias cuando la preocupación, el miedo o la anticipación empiezan a pesar en la vida cotidiana del niño.` | Questions: When is worry more than a phase? How can family respond without reinforcing fear? Outline: signs without diagnosis, school/somatic/routine impact, family containment, my way of working, FAQ. | Breadcrumb: Inicio > Infancia y familias > Ansiedad infantil. In: children hub, anxiety adult/adolescent pages, local page. Out: miedos, regulación emocional, sueño, contacto. | Do not target adult `ansiedad`; must use child/family language and guardian involvement. |
| 2 | Infancia y familias | `/areas-de-intervencion/infancia-y-familias/miedos-infantiles` | `miedos infantiles psicóloga Ciudad Real`, parents seeking help with fears. | Owns developmentally normal vs impairing fears; narrower than child anxiety. | H1: `Miedos infantiles`; meta: `Trabajo con familias para comprender el miedo del niño sin ridiculizarlo ni convertirlo automáticamente en diagnóstico.` | Questions: Which fears are expected by age? What if fear blocks sleep/school/separation? Outline: developmental framing, family responses, safety/routines, process, FAQ. | In: children hub, anxiety child, sleep. Out: ansiedad infantil, sueño, separación padres, contacto. | Avoid duplicating anxiety page; focus on fear themes and family response. |
| 3 | Infancia y familias | `/areas-de-intervencion/infancia-y-familias/regulacion-emocional-infantil` | `regulación emocional niños Ciudad Real`, `rabietas psicóloga infantil Ciudad Real`. | Owns emotional co-regulation with adults; differs from adolescent self-regulation. | H1: `Regulación emocional infantil`; meta: `Acompaño a familias para entender rabietas, bloqueos o enfados intensos desde vínculo, límites y contexto.` | Questions: What is behind intense reactions? How do limits and attachment work together? Outline: emotion signals, co-regulation, body/routines, parenting stance, FAQ. | In: children hub, conducta, anxiety child. Out: problemas de conducta, autoestima infantil, cómo trabajo. | Do not become a discipline/behavior-only page. |
| 4 | Infancia y familias | `/areas-de-intervencion/infancia-y-familias/problemas-de-conducta-infantil` | `problemas de conducta niños Ciudad Real`, `psicóloga infantil conducta`. | Owns behavior as communication within family/school context. | H1: `Problemas de conducta infantil`; meta: `Miro la conducta como una señal dentro de una historia, un vínculo y un contexto, no como una etiqueta aislada.` | Questions: What might behavior be communicating? When involve school? Outline: conduct examples, functional/context reading, family-school coordination, boundaries, FAQ. | In: children hub, regulación, school. Out: regulación emocional, dificultades escolares, asesoramiento familiar. | Avoid punitive tone or promises to “fix” children. |
| 5 | Infancia y familias | `/areas-de-intervencion/infancia-y-familias/dificultades-escolares` | `dificultades escolares Ciudad Real`, `psicóloga infantil colegio Ciudad Real`. | Owns school distress in children/family; education-training page owns formal guidance/coordination service. | H1: `Dificultades escolares`; meta: `Acompaño cuando el colegio empieza a ser fuente de malestar, bloqueo, conflicto o pérdida de confianza.` | Questions: Is it learning, emotion, relationship, or context? How coordinate with teachers? Outline: school signs, emotional impact, family role, referral/coordination, FAQ. | In: children hub, education hub. Out: aprendizaje, coordinación centros, autoestima infantil. | Cross-link but do not compete with `/orientacion-educativa-y-formacion/dificultades-de-aprendizaje`. |
| 6 | Infancia y familias | `/areas-de-intervencion/infancia-y-familias/trauma-y-duelo-infantil` | `duelo infantil Ciudad Real`, `trauma infantil psicóloga Ciudad Real`. | Owns trauma/grief in children with caregiver language and developmental explanation. | H1: `Trauma y duelo infantil`; meta: `Acompaño a familias cuando una pérdida o experiencia difícil necesita palabras claras, ritmo y presencia adulta segura.` | Questions: How do children show grief? What should adults say? Outline: child signs, caregiver support, play/body/school, when to seek help, FAQ. | In: children hub, trauma pillar, adult/adolescent trauma pages. Out: separación padres, ansiedad infantil, `/psicologia-trauma-ciudad-real`. | Must not be swallowed by cross-sector pillar; age-specific ownership required. |
| 7 | Infancia y familias | `/areas-de-intervencion/infancia-y-familias/separacion-de-los-padres` | `separación padres niños psicóloga Ciudad Real`, `divorcio hijos psicóloga Ciudad Real`. | Owns child adjustment and co-parent communication; not legal divorce advice. | H1: `Separación de los padres`; meta: `Acompaño a familias para cuidar la comunicación y la seguridad emocional de los hijos durante una separación.` | Questions: How tell children? What if behavior changes? Outline: child needs, adult communication, transitions/routines, limits, FAQ. | In: children hub, family advice. Out: duelo infantil, conducta, asesoramiento familiar. | Add legal boundary: not legal mediation/advice unless verified. |
| 8 | Infancia y familias | `/areas-de-intervencion/infancia-y-familias/autoestima-infantil` | `autoestima infantil Ciudad Real`, parents seeking confidence support. | Owns self-concept built through family/school feedback; adolescent page owns body/peers/identity. | H1: `Autoestima infantil`; meta: `Trabajo la autoestima infantil mirando la mirada recibida, las experiencias de logro, los límites y la forma de narrarse.` | Questions: What damages child confidence? How support without pressure? Outline: signs, family/school experiences, attachment, practical process, FAQ. | In: children hub, adolescent/adult autoestima. Out: dificultades escolares, regulación, ansiedad infantil. | Differentiate from adolescent comparison/body and adult self-worth. |
| 9 | Infancia y familias | `/areas-de-intervencion/infancia-y-familias/problemas-de-sueno-infantil` | `problemas de sueño infantil Ciudad Real`, `niño no duerme psicóloga`. | Owns sleep as routine/security/emotional activation; medical sleep disorders boundary. | H1: `Problemas de sueño infantil`; meta: `Acompaño a familias cuando el sueño se cruza con miedo, rutinas, seguridad y activación emocional.` | Questions: What is emotional vs medical? How reduce pressure? Outline: sleep patterns, family routines, fear/separation, coordination with pediatrics if needed, FAQ. | In: children hub, anxiety/miedos. Out: miedos infantiles, control esfínteres, contacto. | Must include medical referral boundary when symptoms suggest pediatric issue. |
| 10 | Infancia y familias | `/areas-de-intervencion/infancia-y-familias/control-de-esfinteres` | `control de esfínteres psicóloga Ciudad Real`, `enuresis encopresis psicóloga Ciudad Real`. | Owns respectful developmental support; medical assessment boundary. | H1: `Control de esfínteres`; meta: `Acompaño el control de esfínteres con respeto al desarrollo, sin presión, vergüenza ni lecturas simplistas.` | Questions: When worry? How avoid shame? Outline: developmental timing, emotional/family context, school/routine impact, pediatric boundary, FAQ. | In: children hub, sleep. Out: sueño, regulación emocional, contacto. | Avoid promising elimination outcomes; include pediatric/medical boundary. |
| 11 | Adolescentes | `/areas-de-intervencion/adolescentes/autoestima-adolescente` | `autoestima adolescentes Ciudad Real`, `psicóloga adolescentes autoestima`. | Owns body, comparison, group belonging, identity; not child family-based autoestima. | H1: `Autoestima en adolescentes`; meta: `Acompaño procesos de autoestima adolescente cuando cuerpo, grupo, exigencia e identidad se mezclan.` | Questions: How does comparison affect self-worth? How include family without invading privacy? Outline: signs, peers/body/social media, family/confidentiality, process, FAQ. | In: adolescent hub, child/adult autoestima. Out: identidad, relaciones sociales, ansiedad adolescente. | Distinguish from adult self-esteem/relationship patterns. |
| 12 | Adolescentes | `/areas-de-intervencion/adolescentes/ansiedad-adolescente` | `ansiedad adolescentes Ciudad Real`, `psicóloga adolescentes ansiedad`. | Owns study, peer, identity, autonomy pressure; not child attachment/routine or adult work stress. | H1: `Ansiedad en adolescentes`; meta: `Trabajo la ansiedad adolescente escuchando estudios, vínculos, cuerpo, decisiones y necesidad de autonomía.` | Questions: How does anxiety look in teens? What is parent role? Outline: school/social/body signs, avoidance, confidentiality, resources, FAQ. | In: adolescent hub, local page. Out: autoestima, relaciones sociales, orientación académica. | Avoid cloning child/adult anxiety page. |
| 13 | Adolescentes | `/areas-de-intervencion/adolescentes/relaciones-sociales-adolescencia` | `relaciones sociales adolescentes psicóloga Ciudad Real`, `aislamiento adolescentes Ciudad Real`. | Owns friendships, belonging, conflict, isolation; not couples/adult relational patterns. | H1: `Relaciones sociales en la adolescencia`; meta: `Acompaño dificultades con amistades, pertenencia, conflicto o aislamiento desde escucha y cuidado del vínculo.` | Questions: Is isolation chosen or painful? How manage group conflict? Outline: belonging, conflict/bullying boundary, family role, skills/emotion, FAQ. | In: adolescent hub. Out: autoestima adolescente, identidad, ansiedad adolescente. | Include bullying/escalation boundary; do not become school discipline page. |
| 14 | Adolescentes | `/areas-de-intervencion/adolescentes/identidad-adolescente` | `identidad adolescentes psicóloga Ciudad Real`, `orientación identidad adolescente psicóloga`. | Owns identity exploration with safety/respect; not academic orientation. | H1: `Identidad en adolescentes`; meta: `Acompaño dudas, cambios y preguntas sobre identidad con respeto, escucha y un espacio seguro.` | Questions: How support without forcing answers? How involve family? Outline: identity development, body/group/future, safe conversation, boundaries, FAQ. | In: adolescent hub. Out: autoestima, relaciones sociales, orientación académica. | Avoid claims around gender/sexuality expertise unless confirmed; write inclusively but prudently. |
| 15 | Adolescentes | `/areas-de-intervencion/adolescentes/orientacion-academica-adolescentes` | `orientación académica adolescentes Ciudad Real`, `psicóloga orientación estudios Ciudad Real`. | Owns teen academic decisions and emotional pressure; education hub owns school coordination service. | H1: `Orientación académica en adolescentes`; meta: `Acompaño decisiones académicas mirando intereses, capacidades, presión externa y momento vital.` | Questions: What if they feel blocked? How distinguish motivation, fear, and fit? Outline: decisions, pressure, family expectations, coordination if useful, FAQ. | In: adolescent hub, education hub. Out: identidad, ansiedad adolescente, coordinación centros. | Do not compete with educational guidance hub; this is adolescent-facing decision support. |
| 16 | Adolescentes | `/areas-de-intervencion/adolescentes/trauma-adolescente` | `trauma adolescente Ciudad Real`, `psicóloga trauma adolescentes Ciudad Real`. | Owns trauma in adolescence: consent, safety, family balance, autonomy. | H1: `Trauma en adolescentes`; meta: `Acompaño experiencias difíciles en adolescencia con evaluación prudente, seguridad y ritmo.` | Questions: What if teen does not want to talk? How coordinate family support? Outline: adolescent signs, stabilization, family/confidentiality, EMDR only if suitable, FAQ. | In: adolescent hub, trauma pillar. Out: duelo adolescente, ansiedad adolescente, `/psicologia-trauma-ciudad-real`. | Must not compete with adult trauma or cross-sector pillar; age-specific route owns adolescent intent. |
| 17 | Adolescentes | `/areas-de-intervencion/adolescentes/duelo-adolescente` | `duelo adolescente Ciudad Real`, `psicóloga duelo adolescentes`. | Owns grief amid school, peers, silence/rage/autonomy. | H1: `Duelo en adolescentes`; meta: `Acompaño pérdidas en adolescencia respetando silencio, rabia, cambios de ánimo y necesidad de seguir viviendo lo cotidiano.` | Questions: What is normal after loss? How help a teen who rejects help? Outline: expressions of grief, school/peer context, family support, process, FAQ. | In: adolescent hub, trauma pillar. Out: trauma adolescente, regulación emocional, contacto. | Differentiate from child grief (caregiver language) and adult grief (life role/loss meaning). |
| 18 | Adolescentes | `/areas-de-intervencion/adolescentes/regulacion-emocional-adolescente` | `regulación emocional adolescentes Ciudad Real`, `control emocional adolescentes psicóloga`. | Owns intense emotions with autonomy, body, limits, family. | H1: `Regulación emocional en adolescentes`; meta: `Trabajo la regulación emocional adolescente combinando comprensión, límites, cuerpo, vínculo y recursos sostenibles.` | Questions: When are emotional swings concerning? How set limits without rupture? Outline: emotion intensity, family frame, body/resources, school/social context, FAQ. | In: adolescent hub, child regulation. Out: ansiedad adolescente, relaciones sociales, identidad. | Avoid copying child co-regulation page; adolescent page must honor autonomy/confidentiality. |
| 19 | Adultos | `/areas-de-intervencion/adultos/ansiedad` | `psicóloga ansiedad Ciudad Real`, `terapia ansiedad Ciudad Real`. | Owns adult anxiety: alarm, overcontrol, body, responsibility, history. | H1: `Ansiedad en adultos`; meta: `Acompaño la ansiedad en adultos mirando alarma, exigencia, historia personal, cuerpo y contexto actual.` | Questions: Why does anxiety appear now? What if symptoms are bodily? Outline: signs without diagnosis, triggers/maintenance, evaluation, possible process, FAQ. | In: adult hub, local page, child/adolescent anxiety. Out: estrés, trauma adulto, contacto. | Adult route owns broad anxiety; child/adolescent pages own age-specific variants. |
| 20 | Adultos | `/areas-de-intervencion/adultos/estres` | `psicóloga estrés Ciudad Real`, `estrés laboral psicóloga Ciudad Real`. | Owns overload, limits, responsibility, rest; adjacent but narrower than anxiety. | H1: `Estrés en adultos`; meta: `Trabajo el estrés atendiendo a carga, límites, cuerpo, descanso, decisiones y responsabilidades sostenidas.` | Questions: Is this stress, burnout, anxiety? How recover limits? Outline: overload signs, work/family load, body/rest, boundaries, process, FAQ. | In: adult hub, local page. Out: ansiedad adultos, crecimiento personal, contacto. | Keep separate from anxiety by focusing on load/context and limits. |
| 21 | Adultos | `/areas-de-intervencion/adultos/trauma` | `psicóloga trauma Ciudad Real`, `EMDR trauma Ciudad Real`. | Owns adult trauma route; cross-sector pillar supports local/EMDR cluster. | H1: `Trauma en adultos`; meta: `Acompaño trauma en adultos con evaluación cuidadosa, seguridad, ritmo y trabajo integrador cuando tiene sentido.` | Questions: Do I need to tell everything? Is EMDR always appropriate? Outline: trauma signs, stabilization, history/body/relationships, EMDR boundary, FAQ. | In: adult hub, trauma pillar, method page. Out: duelo adultos, ansiedad adultos, `/psicologia-trauma-ciudad-real`. | Pillar targets cross-sector local overview; this owns adult trauma process. |
| 22 | Adultos | `/areas-de-intervencion/adultos/duelo` | `psicóloga duelo Ciudad Real`, `terapia duelo Ciudad Real`. | Owns adult loss, changed life roles, ambivalence, time pressure. | H1: `Duelo en adultos`; meta: `Acompaño el duelo sin imponer tiempos ni frases hechas, atendiendo a la pérdida y a la vida que cambia.` | Questions: Is my grief normal? What if I feel guilt/relief/anger? Outline: grief experiences, role changes, process, relationship to loss, FAQ. | In: adult hub, trauma pillar. Out: trauma adultos, crecimiento personal, contacto. | Avoid competing with child/adolescent grief; include adult role/life-context specificity. |
| 23 | Adultos | `/areas-de-intervencion/adultos/dependencia-emocional` | `dependencia emocional Ciudad Real`, `psicóloga dependencia emocional Ciudad Real`. | Owns relational patterns, fear, limits, attachment; not couples therapy. | H1: `Dependencia emocional`; meta: `Trabajo la dependencia emocional mirando vínculo, miedo, autoestima, límites y patrones aprendidos.` | Questions: Why is leaving/setting limits so hard? Is this love or fear? Outline: signs, relational history, boundaries, self-worth, process, FAQ. | In: adult hub, pareja, autoestima-adolescent/adult if future. Out: relaciones de pareja, ansiedad adultos, contacto. | Must not diagnose visitors or promise breakup/outcome. |
| 24 | Adultos | `/areas-de-intervencion/adultos/relaciones-de-pareja` | `psicóloga pareja Ciudad Real`, `terapia de pareja Ciudad Real` if offered. | Owns relationship/couple dynamics; must clarify if individual-only or couple sessions once confirmed. | H1: `Relaciones de pareja`; meta: `Acompaño dificultades de pareja mirando comunicación, conflicto, necesidades, historia vincular y límites.` | Questions: Is this individual or couple work? When is therapy not enough/safe? Outline: conflict patterns, communication, attachment, safety/boundaries, FAQ. | In: adult hub, local page. Out: dependencia emocional, crecimiento personal, contacto. | Do not claim couples therapy format unless confirmed; include violence/emergency boundary where relevant. |
| 25 | Adultos | `/areas-de-intervencion/adultos/crecimiento-personal` | `crecimiento personal psicóloga Ciudad Real`, `autoconocimiento psicóloga Ciudad Real`. | Owns non-crisis self-knowledge, values, decisions; not generic coaching. | H1: `Crecimiento personal`; meta: `Acompaño procesos de autoconocimiento, responsabilidad, deseo y coherencia con la propia vida.` | Questions: Can I consult without a crisis? What changes do I want to understand? Outline: motivations, values/limits, life transitions, process, FAQ. | In: adult hub, stress, local page. Out: estrés, relaciones, contacto. | Avoid vague coaching/guaranteed transformation language. |
| 26 | Orientación educativa y formación | `/areas-de-intervencion/orientacion-educativa-y-formacion/dificultades-de-aprendizaje` | `dificultades de aprendizaje Ciudad Real`, `trastornos del aprendizaje Ciudad Real`. | Owns learning needs as educational guidance; children school page owns school distress. | H1: `Dificultades de aprendizaje`; meta: `Acompaño a familias cuando aprender se vuelve difícil y hace falta mirar emoción, escuela, recursos y coordinación.` | Questions: Is it learning, attention, emotion, or context? What reports are needed? Outline: learning signs, family-school view, assessment/referral boundaries, coordination, FAQ. | In: education hub, child school page. Out: coordinación centros, altas capacidades, dificultades escolares. | Avoid making diagnostic/assessment claims unless service confirmed. |
| 27 | Orientación educativa y formación | `/areas-de-intervencion/orientacion-educativa-y-formacion/altas-capacidades` | `altas capacidades Ciudad Real`, `orientación altas capacidades Ciudad Real`. | Owns high-ability guidance, sensitivity, boredom, mismatch; not general academic orientation. | H1: `Altas capacidades`; meta: `Acompaño a familias cuando las altas capacidades conviven con sensibilidad, aburrimiento, exigencia o desajustes.` | Questions: What if ability and distress coexist? How coordinate school? Outline: common situations, myths, emotional/school fit, coordination/referral, FAQ. | In: education hub, learning difficulties. Out: coordinación centros, asesoramiento familiar, autoestima infantil. | Must avoid diagnosis/testing claims unless Marta confirms qualifications/protocol. |
| 28 | Orientación educativa y formación | `/areas-de-intervencion/orientacion-educativa-y-formacion/coordinacion-centros-educativos` | `coordinación centros educativos psicóloga Ciudad Real`, `psicóloga colegios Ciudad Real`. | Owns school-family-professional coordination, not individual child treatment. | H1: `Coordinación con centros educativos`; meta: `Cuando ayuda, puedo coordinar lenguaje, expectativas y apoyos entre familia y centro educativo.` | Questions: When is coordination useful? What privacy/consent is needed? Outline: coordination goals, consent/privacy, school language, limits, FAQ. | In: education hub, child/adolescent academic pages. Out: dificultades aprendizaje, orientación académica, asesoramiento familiar. | Must include consent/data-sharing boundaries. |
| 29 | Orientación educativa y formación | `/areas-de-intervencion/orientacion-educativa-y-formacion/asesoramiento-familiar` | `asesoramiento familiar Ciudad Real`, `orientación familiar psicóloga Ciudad Real`. | Owns parent/family guidance across child/adolescent situations; not family therapy claim unless confirmed. | H1: `Asesoramiento familiar`; meta: `Acompaño a familias que necesitan comprender necesidades, ajustar respuestas y sostener cambios en casa.` | Questions: Can parents consult without the child? What changes can be made at home? Outline: family concerns, attachment/limits, routines, coordination, FAQ. | In: education hub, children hub. Out: separación padres, conducta infantil, coordinación centros. | Avoid claiming family therapy or parenting program unless confirmed. |

### C. `/psicologia-trauma-ciudad-real` Pillar Decision

Keep `/psicologia-trauma-ciudad-real` as a **cross-sector local pillar**, but redefine it as an overview and routing page rather than the only trauma page.

The pillar should own broad local intent such as `psicología trauma Ciudad Real`, `psicóloga trauma y duelo Ciudad Real`, and cautious EMDR/local education. It should not own child/adolescent/adult-specific treatment intent. It must link prominently to:

- `/areas-de-intervencion/infancia-y-familias/trauma-y-duelo-infantil`
- `/areas-de-intervencion/adolescentes/trauma-adolescente`
- `/areas-de-intervencion/adolescentes/duelo-adolescente`
- `/areas-de-intervencion/adultos/trauma`
- `/areas-de-intervencion/adultos/duelo`
- `/como-trabajo` for integrative approach/EMDR context.

Cannibalization rule: the pillar explains trauma/duelo as a careful local cluster and helps users choose by age/stage; child/adolescent/adult pages own the specific process, examples, FAQ, and CTAs for that audience.

### D. Spanish Search and Competitor Pattern Evidence (checked 2026-07-23)

Search-engine result pages can be blocked by anti-bot flows, so evidence combines direct market pages, directories, and named competitor pages.

| Cluster | Named evidence | Observed pattern | Implication |
| --- | --- | --- | --- |
| Anxiety | MundoPsicologos `https://www.mundopsicologos.com/centros/ansiedad/ciudad-real` | Page title/H1 `Psicólogos Ansiedad Ciudad Real`; directory lists 36 centers; repeated CTAs `Pedir cita` / `Contactar`; professionals often combine anxiety with depression/other categories. | Dedicated anxiety pages exist in the market. Marta needs separate child/adolescent/adult anxiety pages to avoid generic “ansiedad” cloning. |
| Trauma / EMDR | MundoPsicologos `https://www.mundopsicologos.com/centros/trauma/ciudad-real`; Luis Fernando Rivas `https://psicologialuisfernandorivas.com/` | Directory has `Centros psicológicos especializados en Trauma en Ciudad Real` and 17 centers. Luis Fernando Rivas leads with `Psicoterapia EMDR, Trauma, Apego y Disociación` and has an EMDR subcluster (`qué es`, `historia`, `cómo funciona`, `trauma y EMDR`). | EMDR/trauma has real local and topical competition. Marta's content must be cautious, first-person, and non-promissory, with EMDR only as possible tool after evaluation. |
| Grief | MundoPsicologos `https://www.mundopsicologos.com/centros/duelo/ciudad-real` | H1 `Centros psicológicos especializados en Duelo en Ciudad Real`; 22 centers; directory copy frames loss as potentially requiring professional support. | Grief deserves its own adult/adolescent pages and child grief combined with trauma under child route, not only a generic trauma pillar. |
| Self-esteem | MundoPsicologos `https://www.mundopsicologos.com/centros/autoestima/ciudad-real` | H1 `Centros psicológicos especializados en Autoestima en Ciudad Real`; 30 centers; directory links to anxiety, stress, dependence, child psychology, learning disorders. | Self-esteem is a large cluster; child and adolescent pages must differentiate developmental context. |
| Stress | MundoPsicologos `https://www.mundopsicologos.com/centros/estres/ciudad-real` | H1 `Psicólogos para el tratamiento del Estrés en Ciudad Real`; 33 centers; sits next to anxiety/adult therapy categories. | Adult stress page should focus on load, limits, body, rest, and responsibilities to avoid anxiety cannibalization. |
| Learning difficulties | MundoPsicologos `https://www.mundopsicologos.com/centros/trastornos-del-aprendizaje/ciudad-real` | H1 `Centros psicológicos especializados en Trastornos del aprendizaje en Ciudad Real`; 15 centers; listings mention children/adolescents, TDAH, school-related support. | Education-training child pages need stronger school/coordination content and clear diagnostic-boundary language. |
| Child psychology / behavior / sleep / toilet training | MundoPsicologos `https://www.mundopsicologos.com/centros/psicologia-infantil/ciudad-real` | H1 `Psicólogo infantil Ciudad Real`; 16 centers; directory cross-links to TDAH, school failure, aggressiveness, family therapies, child psychology. | Child-specific treatment pages should use parent search language and include pediatric/referral boundaries for sleep/toilet concerns. |
| Emotional dependence / couples | MundoPsicologos `https://www.mundopsicologos.com/centros/dependencia-emocional/ciudad-real`; `https://www.mundopsicologos.com/centros/terapias-de-pareja/ciudad-real` | Dependencia page has exact cluster; couple page H1 `Psicólogos de pareja en Ciudad Real` and 16 centers. | Separate adult pages are justified, but claims must clarify whether Marta offers individual relational work, couples therapy, or both. |
| Adolescent identity/social relationships | MundoPsicologos child/adolescent listings and Luis Fernando Rivas menu include adolescent/family/crianza/apego adjacent categories, but exact identity/social pages are less visible locally. | Market gap: local content can be useful if it avoids SEO-doorway behavior and explains adolescence with real situations. | Build these pages as helpful user-education routes, not volume-first SEO pages. |
| High abilities | Direct local directory URL `altas-capacidades/ciudad-real` returned 404 during fetch; learning/education categories are stronger visible patterns. | High abilities may be a lower-volume/local-gap topic. | Publish only with substantial guidance and Marta-confirmed scope; avoid thin page created only because inventory says so. |

Quality lesson from competitor review: directories dominate many local modifier queries with templated pages and long cross-link lists. Marta can differentiate by writing in a real first-person professional voice, using age/stage-specific substance, and refusing doorway copy.

### E. Repeatable High-Quality Treatment-Page Model

Every treatment page should follow the same recognizable structure, but the substance must be page-specific.

Recommended model:

1. **Empathetic first-person opening** — Marta names the visitor's likely situation without diagnosing.
   - Example: `Si estás leyendo esto porque la ansiedad está ocupando demasiado espacio en tu vida, lo primero es no reducirlo todo a una etiqueta.`
2. **Situations/signs without diagnosis** — concrete, age-specific examples; no symptom checklist that pretends to diagnose.
3. **Impact/context** — family, school, body, work, relationships, routines, autonomy, grief, or developmental context depending on page.
4. **My way of working** — first person, grounded in known method: careful evaluation, integrative view, pace, humanistic/person-centered stance, attachment/family view where relevant, EMDR only where contextually appropriate and verified.
5. **What a process may involve** — possible steps without promises: evaluation, clarification, stabilization, family/school coordination, resources, review of fit, referral if needed.
6. **Page-specific FAQ** — 3-5 real questions, not generic SEO filler.
7. **Related pages** — parent hub, sibling pages, pillar/method, contact; anchors must be natural.
8. **Local CTA** — first-person and privacy-safe: `Si estás en Ciudad Real y quieres valorar si puedo ayudarte, puedes escribirme con una primera orientación breve.`
9. **Emergency/non-substitution boundary only where appropriate** — trauma, severe risk, self-harm, violence, medical/pediatric symptoms, legal/custody contexts, or contact page. Do not spam every page with the same disclaimer.

Minimum meaningful depth per child page:

- 900-1,400 useful Spanish words for core/high-intent pages: anxiety variants, trauma/grief, stress, learning difficulties, child behavior, couples/dependence.
- 700-1,000 useful Spanish words for narrower/low-volume pages, still with unique examples and FAQ.
- At least 5 page-specific body sections or 4 sections + substantial FAQ.
- At least 3 page-specific questions answered.
- At least 4 contextual links, including parent hub and contact.

### F. E-E-A-T / YMYL Safeguards and Anti-Doorway Acceptance Tests

Psychology content is YMYL-adjacent and must be conservative.

Safeguards:

- No invented credentials, registration numbers, address, prices, outcomes, testimonials, availability, contact details, services, or professional claims.
- Every page must have source facts: user-supplied inventory, verified method text, Marta-approved service scope, and credible external sources where educational claims are made.
- Medical/psychology boundaries: no diagnosis, no “cure”, no guaranteed results, no fixed therapy claims, no self-test as decision tool, no “EMDR solves trauma” claim.
- EMDR copy: allowed only as `possible tool after evaluation` and only after training/scope is confirmed; avoid presenting it as mandatory or universally suitable.
- Pediatric/medical concerns: sleep/toilet training pages must mention consultation/referral when physical/medical symptoms or developmental concerns require it.
- Couple/dependence pages: include safety boundary for coercion/violence when relevant; do not suggest therapy is enough in unsafe contexts.
- Originality: no competitor rewrites, no directory-style boilerplate, no cloned structure with swapped keywords.

Acceptance tests:

- First-person lint: fail visible visitor text with forbidden third-person/agency/internal patterns.
- Doorway test: fail any page where removing the keyword leaves a generic page indistinguishable from another topic.
- Differentiation test: anxiety/trauma/duelo/autoestima variants must mention age/stage-specific context in H1/meta/body/FAQ.
- Similarity test: flag page body cosine/Jaccard similarity above 0.72 against any sibling treatment page for manual review; fail above 0.82 unless there is a documented reason.
- Metadata uniqueness: title, meta description, H1, canonical route unique across all 29 pages plus hubs/pillars.
- Substance test: minimum sections, FAQ count, body length, page-specific examples, local CTA, and at least 4 meaningful links.
- E-E-A-T test: page has source facts, last-reviewed date, approver gate before indexable publication, and boundaries where appropriate.

### G. Scalable Angular Static-Prerender Route/Content Architecture

Do not add 29 one-off components or a giant hard-coded switch.

Recommended architecture:

- `src/app/content/treatment-pages.ts` — array of `TreatmentPage` data records generated/maintained from the approved route map.
- `src/app/content/treatment-types.ts` — `TreatmentSector`, `TreatmentPage`, `ContentSection`, `FaqItem`, `InternalLink`, `SourceFact`, `BoundaryNote`, `SchemaProfile`.
- `src/app/content/treatment-index.ts` — lookups by `canonicalPath`, `sector`, `slug`, `topicKey`, and parent hub.
- `src/app/pages/treatment-page.component.ts` — one generic renderer for all treatment pages.
- `src/app/pages/hub-page.component.ts` or existing `StandardPageComponent` extension — parent hubs visibly list every child page in that sector.
- `src/app/content/public-routes.ts` — derive routes from `staticPages`, `hubPages`, `treatmentPages`, and `pillarPages`, not hand-entered duplicates.
- `src/app/core/seo/schema.ts` — generate `BreadcrumbList`; use `FAQPage` only when FAQs are visible; use healthcare/local schema only after facts are verified.

Angular prerender strategy:

- Current approach maps concrete manifest entries to `RenderMode.Prerender`.
- For 29 treatment pages, either generate concrete entries from `treatmentPages` or use a parameterized route such as `areas-de-intervencion/:sector/:topic` plus Angular server-route `getPrerenderParams()`.
- Angular docs (checked 2026-07-23 via Context7 `/websites/angular_dev`) show `ServerRoute` with `RenderMode.Prerender` and `getPrerenderParams()` returning param objects for build-time document generation. This fits content-driven treatment pages.
- Ensure generated prerender paths feed sitemap, route tests, and Pages artifact verification from the same source array.

### H. Internal-Link Graph Requirements

- No orphan pages: every treatment page must have at least one parent-hub inlink and at least two additional contextual inlinks.
- Parent/child links: each sector hub links every child treatment page visibly; every child links back to its parent hub.
- Sibling links: each child links 2-4 clinically adjacent siblings when useful, not mechanically.
- Pillar links: cross-sector pillar `/psicologia-trauma-ciudad-real` links to all trauma/duelo child pages; child trauma/duelo pages link back to the pillar.
- Strategic pages (`/psicologia-ciudad-real`, `/como-trabajo`, `/contacto`, sector hubs, trauma pillar) must each have at least 3 meaningful contextual inlinks; high-priority local/treatment pages should target 4+.
- Max depth: every treatment page reachable in <= 3 clicks from home: Home -> Areas -> Sector -> Treatment, with menu/mega-menu reducing discovery friction.
- Anchor text: natural Spanish, no exact-match stuffing. Prefer `cómo trabajo la ansiedad en adolescentes` over repeated `psicóloga ansiedad Ciudad Real`.

### I. Menu / Mega-Menu Behavior for 29 Treatment Pages

Top-level navigation should not dump 29 treatment links.

Recommended behavior:

- Header: `Inicio`, `Sobre mí`, `Cómo trabajo`, `Áreas de intervención` dropdown/mega-menu, `Psicología Ciudad Real`, `Talleres`, `Contacto`.
- Desktop mega-menu: show four sector columns with 3-5 prioritized child links each plus `Ver todos en [sector]`; include the trauma pillar as a strategic link, not as a replacement for child pages.
- Mobile menu: accordion by sector. Open sector reveals all child pages or a `Ver todos` route depending on height; must remain keyboard accessible.
- Sector landing pages: must visibly link **every** child treatment page for that sector with short differentiated descriptions.
- Footer: show strategic subset (local, method, contact, sector hubs, trauma pillar) plus `Áreas de intervención` full hub. Do not list all 29 in footer unless a compact sitemap section is deliberately designed.
- Sitemap page/XML: include all indexable approved treatment pages once approvals/noindex gates are lifted.

### J. Verification Plan

Required verification for later spec/apply:

- **First-person voice lint**: scan visible public content fields and rendered HTML for forbidden third-person/agency/internal wording; allow neutral technical/legal fields through explicit allowlist.
- **Route/prerender coverage**: assert 29 treatment pages + hubs + pillars are in the route manifest, Angular routes, server prerender config, generated sitemap, Pages artifact verifier, and e2e route smoke list.
- **Unique metadata**: assert unique canonical path, H1, title, meta description, breadcrumb label, and schema `@id`/URL for all treatment pages.
- **Duplicate-content QA**: compute similarity across treatment bodies; warn above 0.72, fail above 0.82; require manual evidence for intentionally similar clinical boundary paragraphs.
- **Substantial content metrics**: fail pages below minimum section count, FAQ count, local CTA, page-specific example count, related links, and source facts. Metrics must not reward filler: repeated boilerplate, repeated disclaimers, and generic paragraphs count once.
- **Internal-link graph**: assert no orphans, parent-child reciprocity, sibling links where mapped, trauma pillar reciprocal links, strategic pages 3+ inlinks, and max click depth <= 3 from home.
- **Menu/mobile nav**: Playwright checks for desktop mega-menu/sector discovery, mobile accordion access, keyboard focus, Escape close, route activation, and no top-level 29-link dump.
- **Accessibility**: heading order, skip link, visible focus, touch targets, ARIA state for mega-menu/accordion, contrast, and no link text ambiguity like repeated `Leer más` without context.
- **No visible internal status wording**: render-level scan for `borrador`, `noindex`, `placeholder`, `approval`, `pendiente`, `cuando se confirme`, and internal blocker text.
- **YMYL boundaries**: snapshot/assert required caution modules only on relevant pages (trauma, violence/couple safety, medical/pediatric, emergency/contact), avoiding repetitive blanket disclaimers.

### Recommendation Update

Proceed to a corrective proposal/spec addendum before any new apply. The next SDD phase should revise requirements/design/tasks so the implementation changes from `29 topics as hub-only cards` to `29 substantial treatment pages generated from structured content data`, with a first-person visitor-copy contract and anti-doorway verification.

The existing `/psicologia-trauma-ciudad-real` should remain, but as a cross-sector local pillar that routes to child/adolescent/adult trauma and grief pages. The pillar must not be the only trauma/grief content route.

### Addendum Risks

- Scope is large: 29 researched pages plus navigation, schema, sitemap, and tests can exceed review budget even with the accepted size exception; task planning should still slice implementation logically.
- Research depth is uneven across topics: local directory patterns are strong for anxiety/trauma/grief/stress/self-esteem/learning/couples, weaker for high abilities and adolescent identity/social pages.
- First-person conversion can accidentally overstate Marta's confirmed services; every page must remain blocked from indexable publication until Marta confirms scope and facts.
- EMDR/trauma copy is high-risk for overpromising and should be reviewed with extra care.
- Similarity thresholds can catch clones but cannot prove usefulness; human review remains required.

### Ready for Proposal Addendum

Yes — proceed to proposal/spec correction for treatment-page ownership, first-person voice, scalable content architecture, and verification. Later apply must preserve existing uncommitted work, touch application code only after updated specs/tasks exist, and avoid staging/committing unless explicitly requested.
