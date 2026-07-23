# Delta for content-approval-system

## ADDED Requirements

### Requirement: Complete intervention taxonomy inventory

The system MUST maintain every supplied topic with status, parent hub, publishability decision, and cannibalization rule before launch. Hubs: Infancia y familias; Adolescentes; Adultos; Orientación educativa y formación; Talleres. Topics MUST include: infancia/familias—ansiedad, miedos, regulación emocional, problemas de conducta, dificultades escolares, trauma y duelo infantil, separación de los padres, autoestima, problemas de sueño, control de esfínteres; adolescentes—autoestima, ansiedad, relaciones sociales, identidad, orientación académica, trauma, duelo, regulación emocional; adultos—ansiedad, estrés, trauma, duelo, dependencia emocional, relaciones de pareja, crecimiento personal; orientación/formación—dificultades de aprendizaje, altas capacidades, coordinación con centros educativos, asesoramiento familiar. Outcome: no supplied topic is lost or accidentally published.

#### Scenario: Inventory completeness check
- GIVEN the supplied topic list
- WHEN the approval inventory is reviewed
- THEN every topic appears exactly once with parent hub and status
- AND labels preserve the supplied wording exactly, including `problemas de sueño`, `relaciones de pareja`, and `dificultades de aprendizaje`

#### Scenario: Topic lacks ownership
- GIVEN a topic has no parent hub or status
- WHEN launch gates run
- THEN launch MUST be blocked

### Requirement: Publishability status model

Each route/topic MUST have one status: `verified-publishable`, `approved-placeholder`, `blocked-unverified`, `merge-into-hub`, or `future-scope`. Standalone pages MAY be created only when Marta confirms real offer, sufficient content depth, clinical boundaries, and non-cannibalization. Outcome: SEO growth does not create thin or duplicate pages.

#### Scenario: Thin standalone page is requested
- GIVEN a topic has shallow or overlapping content
- WHEN page creation is evaluated
- THEN it MUST be merged into the appropriate hub
- AND marked non-indexable if retained as placeholder

#### Scenario: Workshop route is reviewed
- GIVEN `/talleres` is requested
- WHEN workshop details are missing
- THEN it MUST remain blocked or future-scope

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

### Requirement: Spanish copy approval and healthcare tone

Final public copy MUST be Spanish neutral/professional, warm, precise, and non-promissory. It MUST NOT claim guaranteed outcomes, fabricate credentials, create urgency, self-diagnose visitors, or publish final SEO copy before approval. Outcome: Marta can approve a safe source-of-truth before publication.

#### Scenario: Final copy is requested during specs
- GIVEN this SDD phase is specification-only
- WHEN public SEO copy is requested
- THEN the system MUST defer final copy to a later approved content task

#### Scenario: Unsafe clinical claim is detected
- GIVEN copy promises cure, guaranteed results, or diagnosis
- WHEN content review runs
- THEN it MUST be rejected or rewritten before launch

### Requirement: Approval audit trail

Every publishable page/topic MUST record approver, approval date, source facts, last reviewed date, and outstanding blockers. Outcome: future edits remain accountable.

#### Scenario: Approved page lacks source facts
- GIVEN a page is marked publishable
- WHEN audit metadata is inspected
- THEN source facts and Marta approval MUST be present
