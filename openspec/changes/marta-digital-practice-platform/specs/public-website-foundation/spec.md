# Delta for public-website-foundation

## ADDED Requirements

### Requirement: Angular static-prerender public IA foundation

The system MUST define a public Angular 22 website foundation with static-prerendered routes for `/`, `/sobre-mi`, `/como-trabajo`, `/areas-de-intervencion`, `/psicologia-ciudad-real`, `/contacto`, `/aviso-legal`, `/privacidad`, and `/cookies`, plus an Express API/static server boundary for contact, health, and safe 404 handling. Runtime SSR is not claimed for the current delivery. `/talleres` MUST exist only as a conditional route/section until real workshop facts are approved. Outcome: visitors can evaluate trust, fit, and contact options without unsafe claims.

#### Scenario: Required route inventory is represented
- GIVEN the route plan is reviewed
- WHEN the public IA is inspected
- THEN every required route is present with a clear purpose
- AND `/talleres` is marked blocked until offering details are verified

#### Scenario: Current implementation stack is represented honestly
- GIVEN the Angular workspace, tests, tooling, static-prerender output, and Express API/static server boundary now exist
- WHEN specs/design reference the platform
- THEN they SHALL state the delivered runtime as Angular static-prerender plus Express API/static server boundary
- AND they SHALL NOT describe runtime SSR as the current delivery

### Requirement: Static-prerender behavior

SEO-critical public routes MUST be statically prerendered and SHALL expose crawlable content without requiring client-side interaction. Contact submission MUST NOT depend on static-only client storage. Outcome: local search visibility and safe inquiry handling.

#### Scenario: Crawler receives content
- GIVEN a public route is SEO-critical
- WHEN a crawler requests it without JavaScript execution
- THEN primary headings, metadata, and body content are available

#### Scenario: Contact data is not embedded in static output
- GIVEN a visitor submits contact information
- WHEN static artifacts or prerendered pages are inspected
- THEN submitted data MUST NOT appear in generated assets

### Requirement: Accessible Stitch-informed design system

The design system MUST use Stitch v20 assets (`code.html`, `screen.png`, `DESIGN.md`) only as visual references and SHALL preserve the brand warmth, thread/knot metaphor restraint, typography direction, and palette intent. It MUST meet WCAG-oriented accessibility constraints, including avoiding terracotta `#D1807E` for normal text on white and supporting keyboard/focus states. Outcome: distinctive brand trust without inaccessible visual choices.

#### Scenario: Visual migration preserves references safely
- GIVEN the Angular implementation is planned
- WHEN Stitch assets are used
- THEN they are referenced for design intent only
- AND original static assets remain intact

#### Scenario: Contrast failure is blocked
- GIVEN a component uses brand colors
- WHEN normal body text is rendered on warm white
- THEN plum-like accessible text colors are allowed
- AND low-contrast terracotta text is rejected

### Requirement: Responsive and quality constraints

The public website MUST support mobile, tablet, and desktop layouts; SHOULD target Lighthouse performance >=90 on home, local landing, service hub, and contact; and MUST be testable for accessibility, responsive behavior, routing, metadata, and Core Web Vitals targets: LCP <=2.5s, INP <=200ms, CLS <=0.1. Outcome: anxious prospective clients get a fast, readable experience on mobile.

#### Scenario: Mobile visitor can complete key journey
- GIVEN a mobile visitor lands on the home page
- WHEN they navigate to method, local landing, and contact
- THEN content remains readable and controls remain tappable

#### Scenario: Quality gate uses active tooling honestly
- GIVEN the Angular workspace, Vitest, Playwright, lint, typecheck, build, prerender, Pages, inventory, lifecycle, axe, and Lighthouse tooling now exist
- WHEN verification is requested
- THEN the report SHALL run the active checks or mark any unavailable check explicitly instead of reporting it as passed

## Implementation Status / Current State Addendum (2026-07-23)

- Angular workspace, tests, tooling, CI, and source now exist.
- Delivered runtime is static-prerender plus Express API/static server boundary, not runtime SSR.
- Tests/tooling are active through `npm test`, lifecycle HMAC identity regression coverage, lint, typecheck, build, prerender verification, Pages build/verification, inventory verification, Playwright, axe, and Lighthouse.
- Historical proposal wording that targeted an Angular SSR/prerender-capable foundation is preserved as intent; current-state requirements in this spec use the implemented static-prerender plus Express API model.

### Requirement: Explicit platform non-requirements

This slice MUST NOT include clinical records, patient AI, session recording, diagnosis/triage, CRM, booking, or payments. Outcome: scope stays reviewable and avoids special-category data expansion.

#### Scenario: Out-of-scope feature is proposed
- GIVEN a task proposes booking, payment, CRM, diagnosis, or records
- WHEN scope is reviewed
- THEN it MUST be deferred to a separate approved SDD change

### Requirement: Visible deferred practice roadmap

The website foundation MUST preserve a visible internal roadmap for later practice operating-system candidates while excluding them from this implementation. Roadmap candidates MAY include content/reputation operations, intake/admin automation, booking/payment/CRM only after review, safe non-sensitive local AI, and separately gated Raspberry Pi/patient-data research. Sensitive clinical AI, records, diagnosis, triage, and recording MUST NOT be implemented in this slice.

#### Scenario: Roadmap item remains visible but deferred
- GIVEN roadmap candidates are reviewed during planning
- WHEN implementation scope is approved
- THEN each candidate is marked future-scope
- AND no first-slice task implements it

#### Scenario: Sensitive clinical AI is proposed
- GIVEN a task proposes records, diagnosis, triage, recording, or clinical AI
- WHEN scope review runs
- THEN the task MUST be rejected from this change
- AND require a separate legal/privacy-gated SDD change
