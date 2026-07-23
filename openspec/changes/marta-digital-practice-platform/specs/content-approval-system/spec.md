# Delta for content-approval-system

## ADDED Requirements

### Requirement: Complete intervention taxonomy inventory

The system MUST maintain all exactly 29 supplied treatment topics with parent hub, canonical preview route, content-existence status, content-quality status, indexability/publication status, and cannibalization rule before launch. Hubs: Infancia y familias; Adolescentes; Adultos; Orientación educativa y formación. Topics MUST include: infancia/familias—ansiedad, miedos, regulación emocional, problemas de conducta, dificultades escolares, trauma y duelo infantil, separación de los padres, autoestima, problemas de sueño, control de esfínteres; adolescentes—autoestima, ansiedad, relaciones sociales, identidad, orientación académica, trauma, duelo, regulación emocional; adultos—ansiedad, estrés, trauma, duelo, dependencia emocional, relaciones de pareja, crecimiento personal; orientación/formación—dificultades de aprendizaje, altas capacidades, coordinación con centros educativos, asesoramiento familiar. Outcome: no supplied topic is lost, merged into a hub, made conditional, or accidentally published indexably.

#### Scenario: Inventory completeness check
- GIVEN the supplied topic list
- WHEN the approval inventory is reviewed
- THEN every topic appears exactly once with parent hub and status
- AND labels preserve the supplied wording exactly, including `problemas de sueño`, `relaciones de pareja`, and `dificultades de aprendizaje`

#### Scenario: Topic lacks ownership
- GIVEN a topic has no parent hub, preview route, or status
- WHEN launch gates run
- THEN launch MUST be blocked

### Requirement: Preview route/content existence and publication gating

All exactly 29 treatment preview routes MUST exist before implementation can pass. Each route MUST contain substantial, differentiated, first-person visitor content even while indexability remains gated. Route/content existence is separate from indexability/publication approval: unsupported final facts, schema, live contact details, NAP/LocalBusiness, testimonials, prices, modalities, service claims, and EMDR scope MUST remain blocked from indexable publication until approved. Hubs MUST organize and link every child route; they MUST NOT replace child pages.

#### Scenario: All preview routes exist before indexability
- GIVEN implementation verification runs before publication approval
- WHEN the treatment route inventory is inspected
- THEN all exactly 29 preview pages/routes MUST exist with substantial first-person content
- AND pages with unsupported final facts MUST remain `noindex` instead of being omitted

#### Scenario: Hub cannot replace child pages
- GIVEN a sector hub summarizes its treatments
- WHEN child route coverage is verified
- THEN the hub MUST link every owned child route
- AND missing or hub-merged child pages MUST fail implementation/verification

#### Scenario: Anti-doorway quality failure
- GIVEN a required treatment page is thin, cloned, or insufficiently differentiated
- WHEN content quality checks run
- THEN implementation/verification MUST fail until the page is improved
- AND the route MUST NOT be silently removed, merged into a hub, or made conditional

### Requirement: Verified content versus placeholder model

The system MUST distinguish verified source facts from placeholders. Verified inputs include brand/tone constraints and `Cómo trabajo` facts from `IMG_0742.JPG`; placeholders include credentials, registration, address, schedule, email, phone, modalities, exclusions, exact service areas, prices, testimonials, reviews, and workshops until Marta approves them. Outcome: public trust is built from evidence, not invention.

#### Scenario: Placeholder fact reaches public copy
- GIVEN a placeholder appears in public-facing content
- WHEN approval review runs
- THEN the content MUST fail launch approval

#### Scenario: Verified method content is used
- GIVEN method copy derives from the image source
- WHEN clinical review runs
- THEN it MAY be approved if non-promissory and accurately paraphrased

### Requirement: Publication-like Spanish copy and healthcare tone

Public visitor-facing copy MUST be Spanish neutral/professional, warm, precise, and non-promissory. It MUST read as a real website, not as implementation status. It MUST NOT claim guaranteed outcomes, fabricate credentials, create urgency, self-diagnose visitors, expose approval/internal-state language, or announce missing facts; unknown credentials, direct contact channels, addresses, prices, testimonials, and legal identifiers MUST be omitted elegantly. Preview `noindex`/robots controls MAY remain in metadata and technical artifacts but MUST be invisible in visible visitor copy. Outcome: visitors see publication-quality content while internal gates still protect facts and launch readiness.

#### Scenario: Publication-like copy is requested for preview
- GIVEN the maintainer authorizes final-facing public copy while preview robots remain blocked
- WHEN pages are rendered
- THEN the copy MUST be substantial, useful, and visitor-facing
- AND visible text MUST NOT mention draft/internal-state terms, approval status, missing data, preview mechanics, robots, or launch gates
- AND unverified factual details MUST be omitted rather than announced

#### Scenario: Unsafe clinical claim is detected
- GIVEN copy promises cure, guaranteed results, or diagnosis
- WHEN content review runs
- THEN it MUST be rejected or rewritten before launch

### Requirement: First-person Marta visitor voice contract

All visitor-facing copy and visitor metadata MUST speak from Marta's professional first-person voice where natural, use direct second person for visitor situations, and use neutral Spanish only for navigation, legal/privacy, form labels, schema labels, or clinical definitions where first person would be unnatural. Visible copy and metadata MUST NOT narrate Marta from an agency/third-person perspective (`Marta explica`, `Marta acompaña`, `Marta ofrece`, `Marta quiere`), address Marta with internal instructions, or describe the client relationship in third person. Sample acceptable public wording: `Trabajo desde una evaluación cuidadosa para comprender qué ocurre antes de decidir cómo intervenir.`

#### Scenario: First-person method copy is rendered
- GIVEN a visitor reads method, CTA, treatment, or meta-description copy
- WHEN the copy describes Marta's care stance or process
- THEN it MUST use Marta first person or direct second person
- AND it MUST NOT use third-person agency narration

#### Scenario: Neutral legal wording is required
- GIVEN legal, privacy, schema, breadcrumb, form-label, or emergency copy is rendered
- WHEN first-person wording would reduce clarity or compliance
- THEN neutral professional Spanish MAY be used
- AND it MUST NOT expose internal instructions or approval state

#### Scenario: Forbidden voice pattern is detected
- GIVEN visible visitor fields contain `Marta explica`, `Marta acompaña`, `Marta ofrece`, `Hilando Fino Psicología nace`, `la web está pensada`, or `Marta debe confirmar`
- WHEN content lint or review runs
- THEN publication MUST fail until the wording is rewritten

### Requirement: E-E-A-T and YMYL copy boundaries

Psychology content MUST be conservative, source-backed, and non-promissory. Pages MUST NOT invent credentials, registration numbers, address, prices, outcomes, testimonials, availability, contact details, services, EMDR scope, or professional facts. They MUST NOT diagnose visitors, guarantee results, offer self-tests as decision tools, or imply treatment suitability before evaluation. Source facts, last-reviewed date, and approver gate MUST exist before indexable publication.

#### Scenario: Unverified professional fact appears
- GIVEN a page references credentials, contact details, service scope, or EMDR suitability
- WHEN no approved source fact exists
- THEN the page MUST remain blocked from indexable publication

#### Scenario: Diagnostic or guarantee wording appears
- GIVEN copy says a visitor has a condition, promises cure, or guarantees outcome
- WHEN clinical content review runs
- THEN the copy MUST be rejected

### Requirement: Invisible preview noindex boundary

Preview builds MUST retain noindex/robots protection while visible visitor copy MUST NOT mention draft, status, `noindex`, approval, placeholder, missing-data, or launch-gate wording.

#### Scenario: Preview remains non-indexable invisibly
- GIVEN the preview site is built before publication approvals
- WHEN rendered HTML and metadata are inspected
- THEN robots/noindex controls MUST exist in metadata
- AND visible copy MUST contain no draft or internal-status wording

### Requirement: Approval audit trail

Every publishable page/topic MUST record approver, approval date, source facts, last reviewed date, and outstanding blockers. Outcome: future edits remain accountable.

#### Scenario: Approved page lacks source facts
- GIVEN a page is marked publishable
- WHEN audit metadata is inspected
- THEN source facts and Marta approval MUST be present
