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
