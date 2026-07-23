# Delta for local-seo-content-architecture

## ADDED Requirements

### Requirement: Local SEO route ownership

The system MUST assign one primary search intent owner per route: `/psicologia-ciudad-real` owns Ciudad Real local intent; `/` supports brand plus local trust; `/sobre-mi` owns Marta profile; `/como-trabajo` owns method; `/areas-de-intervencion` owns service discovery; child/topic pages MAY exist only after approval. Outcome: local discovery improves without cannibalization.

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

#### Scenario: Approved page is indexable
- GIVEN a route is approved for launch
- WHEN SEO metadata is inspected
- THEN it has unique metadata, canonical URL, headings, and sitemap inclusion

#### Scenario: Placeholder page remains blocked
- GIVEN a route contains unverified facts or thin content
- WHEN publication is attempted
- THEN it MUST be `noindex` or unpublished
- AND omitted from the sitemap

### Requirement: Helpful content and internal linking

Public content MUST be written for prospective clients and parents first, not keyword stuffing. Each service/topic page MUST link upward to one parent hub and to relevant trust/contact routes using natural Spanish anchors. Outcome: visitors can understand fit and navigate safely.

#### Scenario: Service page links coherently
- GIVEN an approved service page exists
- WHEN internal links are reviewed
- THEN it links to its parent hub, method, about, and contact where relevant

#### Scenario: Exact-match stuffing is detected
- GIVEN repeated keyword-heavy anchors appear
- WHEN SEO review runs
- THEN the page MUST be revised before launch

### Requirement: Schema and E-E-A-T from verified facts only

Structured data MAY include WebSite, Organization/brand, BreadcrumbList, Person, Article, FAQPage, and LocalBusiness/healthcare type only when visible content and facts are verified. It MUST NOT include fabricated reviews, unverified credentials, address, phone, opening hours, services, or outcomes. Outcome: trust signals are accurate and deontologically safer.

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
