# Delta for local-seo-content-architecture

## ADDED Requirements

### Requirement: Local SEO route ownership

The system MUST assign one primary search intent owner per route: `/psicologia-ciudad-real` owns Ciudad Real local intent; `/psicologia-trauma-ciudad-real` owns trauma/duelo psychology intent in Ciudad Real; `/` supports brand plus local trust; `/sobre-mi` owns Marta profile; `/como-trabajo` owns method; `/areas-de-intervencion` owns service discovery. All exactly 29 child treatment routes MUST exist in the noindex preview; indexable publication approval is a separate gate. Outcome: local discovery improves without cannibalization or route loss.

#### Scenario: Local query maps to one owner
- GIVEN `psicología ciudad real` is evaluated
- WHEN the keyword map is reviewed
- THEN `/psicologia-ciudad-real` is the primary page
- AND home/contact pages are supporting routes only

#### Scenario: Duplicate local page is requested
- GIVEN another page targets the same city intent
- WHEN SEO review runs
- THEN it MUST be merged, canonicalized, or rejected

### Requirement: Metadata, canonical, sitemap, and robots controls

Every indexable public route MUST define unique title/description intent, canonical URL, heading hierarchy, and sitemap inclusion. Blocked placeholder, legal-incomplete, thin, or duplicate pages MUST NOT be indexable. Robots rules SHALL not hide launch blockers by accident. Outcome: search engines index only approved, useful pages.

Preview builds MAY include every real route in the sitemap artifact while retaining `noindex` metadata and robots blocking. This preview-safe robots behavior MUST NOT appear in visible visitor copy.

#### Scenario: Approved page is indexable
- GIVEN a route is approved for launch
- WHEN SEO metadata is inspected
- THEN it has unique metadata, canonical URL, headings, and sitemap inclusion

#### Scenario: Preview route remains blocked from indexing
- GIVEN a route has publication-like copy but launch facts or live-contact approvals remain incomplete
- WHEN the preview artifact is built
- THEN it MUST retain `noindex` metadata and robots blocking
- AND it MAY still appear in the sitemap artifact for route completeness checks
- AND visible copy MUST NOT announce the indexing policy or internal blockers

### Requirement: Helpful content and internal linking

Public content MUST be written for prospective clients and parents first, not keyword stuffing. Each service/topic page MUST link upward to one parent hub and to relevant trust/contact routes using natural Spanish anchors. Outcome: visitors can understand fit and navigate safely.

Primary/service pages SHOULD receive contextual inlinks from at least three semantically relevant pages where possible, in addition to header/footer links.

#### Scenario: Service page links coherently
- GIVEN an approved service page exists
- WHEN internal links are reviewed
- THEN it links to its parent hub, method, about, and contact where relevant

#### Scenario: Exact-match stuffing is detected
- GIVEN repeated keyword-heavy anchors appear
- WHEN SEO review runs
- THEN the page MUST be revised before launch

### Requirement: Schema and E-E-A-T from verified facts only

Structured data MAY include WebSite, BreadcrumbList, and Person from known facts. LocalBusiness/healthcare, NAP, review, opening-hours, or service schema MUST wait until visible content and facts are verified. It MUST NOT include fabricated reviews, unverified credentials, address, phone, opening hours, services, or outcomes. Outcome: trust signals are accurate and deontologically safer.

#### Scenario: LocalBusiness schema waits for NAP
- GIVEN address, phone, hours, or registration are placeholders
- WHEN schema is generated
- THEN LocalBusiness fields requiring those facts MUST be omitted or blocked

#### Scenario: Review markup is proposed
- GIVEN testimonials or review snippets are unverified or ethically unclear
- WHEN schema review runs
- THEN review markup MUST be rejected

### Requirement: GBP, NAP, citations, and CWV targets

Website NAP, Google Business Profile, citations, and legal pages MUST use identical verified data. The local landing SHOULD meet CWV targets: LCP <=2.5s, INP <=200ms, CLS <=0.1, avoiding heavy widgets above the fold. Outcome: local trust, conversion, and performance are protected.

#### Scenario: NAP inconsistency blocks launch
- GIVEN website and GBP data differ
- WHEN local presence review runs
- THEN launch MUST be blocked until data is reconciled

#### Scenario: Heavy widget harms local landing
- GIVEN a map or review widget delays above-the-fold content
- WHEN performance review runs
- THEN it SHOULD be deferred, lazy-loaded, or linked out

### Requirement: Qualified in-person Ciudad Real priority

The local SEO architecture MUST prioritize qualified in-person psychology inquiries in Ciudad Real through route hierarchy, CTAs, and local trust signals, while honestly presenting only modalities Marta has confirmed. Modality qualification MUST ask for preferred modality and Ciudad Real fit without manipulative steering, false availability, or clinical-history collection.

#### Scenario: In-person local visitor finds the priority path
- GIVEN a visitor seeks psychology support in Ciudad Real
- WHEN they view local landing, home, or contact CTAs
- THEN the in-person Ciudad Real inquiry path is clearly primary
- AND unconfirmed modalities are not promoted

#### Scenario: Modality is not confirmed
- GIVEN in-person, online, or hybrid modality remains unverified
- WHEN public content or CTA labels are reviewed
- THEN the modality MUST be marked pending or omitted
- AND the site MUST NOT steer users with scarcity or pressure

### Requirement: Exactly 29 dedicated sector-specific treatment routes

The system MUST provide exactly 29 dedicated sector-owned treatment routes, each prerendered, canonical, breadcrumbed, listed from its parent hub, and represented once in sitemap/route QA. The required routes are:

| Sector | Routes |
|---|---|
| Infancia y familias | `/ansiedad-infantil`, `/miedos-infantiles`, `/regulacion-emocional-infantil`, `/problemas-de-conducta-infantil`, `/dificultades-escolares`, `/trauma-y-duelo-infantil`, `/separacion-de-los-padres`, `/autoestima-infantil`, `/problemas-de-sueno-infantil`, `/control-de-esfinteres` under `/areas-de-intervencion/infancia-y-familias/` |
| Adolescentes | `/autoestima-adolescente`, `/ansiedad-adolescente`, `/relaciones-sociales-adolescencia`, `/identidad-adolescente`, `/orientacion-academica-adolescentes`, `/trauma-adolescente`, `/duelo-adolescente`, `/regulacion-emocional-adolescente` under `/areas-de-intervencion/adolescentes/` |
| Adultos | `/ansiedad`, `/estres`, `/trauma`, `/duelo`, `/dependencia-emocional`, `/relaciones-de-pareja`, `/crecimiento-personal` under `/areas-de-intervencion/adultos/` |
| Orientación educativa y formación | `/dificultades-de-aprendizaje`, `/altas-capacidades`, `/coordinacion-centros-educativos`, `/asesoramiento-familiar` under `/areas-de-intervencion/orientacion-educativa-y-formacion/` |

#### Scenario: Route map is complete
- GIVEN the treatment route registry is inspected
- WHEN route-count validation runs
- THEN exactly 29 treatment routes MUST exist
- AND each MUST have one parent hub, breadcrumb owner, prerender entry, canonical, and sitemap record

#### Scenario: Extra or missing treatment route appears
- GIVEN a treatment route is missing, duplicated, or outside the route map
- WHEN route QA runs
- THEN approval MUST fail until the route map matches exactly

### Requirement: Cross-sector trauma pillar without cannibalization

`/psicologia-trauma-ciudad-real` MUST remain a cross-sector local pillar for broad trauma/duelo/EMDR education and routing. It MUST link to child trauma/grief, adolescent trauma, adolescent grief, adult trauma, adult grief, and `Cómo trabajo`. It MUST NOT replace or cannibalize age-specific trauma/grief treatment pages.

#### Scenario: Pillar routes visitors by age or stage
- GIVEN a visitor lands on `/psicologia-trauma-ciudad-real`
- WHEN they need age-specific guidance
- THEN the pillar MUST link to the relevant child, adolescent, or adult trauma/grief page
- AND those pages MUST own their specific examples, FAQ, CTA, and process copy

### Requirement: Unique treatment-page intent and substance

Each treatment page MUST have unique search intent, title, meta description, H1, body substance, FAQ, CTA, and related links. Pages MUST NOT be cloned doorway content, competitor rewrites, or simple token replacements. Removing the keyword SHOULD still leave page-specific examples, context, boundaries, and questions that identify the topic.

#### Scenario: Cloned doorway content is detected
- GIVEN two treatment pages share near-identical body, FAQ, CTA, or related-link patterns
- WHEN content QA removes topic keywords and compares substance
- THEN pages that become indistinguishable MUST fail approval

#### Scenario: Unique page elements are missing
- GIVEN a treatment page lacks unique title, meta, H1, FAQ, CTA, related links, or body examples
- WHEN SEO review runs
- THEN the page MUST remain blocked from publication

### Requirement: Differentiation for duplicated topics across sectors

Repeated topics across sectors MUST be differentiated by audience context. Anxiety pages MUST distinguish child/family routines, adolescent autonomy/social/study pressure, and adult overload/body/responsibility. Trauma and grief pages MUST distinguish caregiver-mediated child work, adolescent consent/autonomy/school/peers, and adult history/roles/loss meaning. Self-esteem pages MUST distinguish child family-school feedback from adolescent body/peer/identity context.

#### Scenario: Age-specific anxiety pages are compared
- GIVEN child, adolescent, and adult anxiety pages exist
- WHEN differentiation QA runs
- THEN H1/meta/body/FAQ MUST include age-stage-specific context
- AND generic swapped-keyword copy MUST fail

### Requirement: Internal-link graph quality

The internal-link graph MUST have no orphans. Each sector hub MUST link all child pages; every child MUST link back to its hub, 2-4 useful sibling/pillar pages, and contact/method/local routes where relevant. Strategic pages (`/psicologia-ciudad-real`, `/como-trabajo`, `/contacto`, sector hubs, trauma pillar) MUST have at least three meaningful contextual inlinks. Every treatment page MUST be reachable within three clicks from home.

#### Scenario: Orphan or shallow-discovery page exists
- GIVEN the link graph is generated
- WHEN no-orphan and click-depth checks run
- THEN every treatment page MUST have parent and contextual inlinks
- AND max home-to-treatment depth MUST be `<= 3`

#### Scenario: Strategic page lacks support
- GIVEN a strategic page has fewer than three meaningful contextual inlinks
- WHEN link QA runs
- THEN approval MUST fail unless a documented exception explains the gap

### Requirement: Originality and meaningful-depth acceptance tests

Treatment content QA MUST measure originality and depth without rewarding filler. Similarity above 0.72 SHOULD warn for manual review; similarity above 0.82 MUST fail unless intentionally similar legal/clinical boundary copy is documented. Depth checks MUST count page-specific sections, examples, FAQ, source facts, local CTA, and meaningful links; repeated boilerplate, repeated disclaimers, and generic paragraphs MUST count once or not count.

#### Scenario: Similarity threshold is exceeded
- GIVEN treatment bodies are compared against siblings and pillars
- WHEN similarity is above 0.82
- THEN publication MUST fail until substance is differentiated or exception evidence is recorded

#### Scenario: Filler inflates depth metrics
- GIVEN a page repeats disclaimers or generic paragraphs to meet length
- WHEN meaningful-depth QA runs
- THEN repeated filler MUST NOT satisfy depth requirements
