# Delta for privacy-contact-and-launch-gates

## ADDED Requirements

### Requirement: Privacy-safe contact flow

The contact flow MUST minimize fields to what is needed to respond, SHOULD use reason/category choices instead of free clinical history, and MUST include consent, legal/privacy notice access, validation, anti-spam, failure handling, emergency boundary, and accessible errors. Outcome: qualified inquiries increase without unnecessary special-category data capture.

#### Scenario: Visitor submits a normal inquiry
- GIVEN required fields are valid and consent is checked
- WHEN the visitor submits the form
- THEN the inquiry is accepted for manual response
- AND no clinical history is required by default

#### Scenario: Visitor enters sensitive free-text history
- GIVEN optional text is allowed later
- WHEN health details are submitted
- THEN logs, analytics, and notifications MUST avoid exposing payload content beyond approved processing

#### Scenario: Submission fails
- GIVEN the contact endpoint or email delivery fails
- WHEN the visitor submits
- THEN an accessible non-technical error is shown
- AND no duplicate unsafe submission is encouraged

### Requirement: Non-manipulative modality qualification

The contact flow MUST prioritize qualified in-person psychology inquiries in Ciudad Real by asking only non-clinical qualification fields: preferred modality, Ciudad Real availability/fit, contact channel, and broad reason category. It MUST support only Marta-confirmed modalities, MUST NOT collect clinical history by default, and MUST NOT manipulate users toward in-person care through pressure, scarcity, or false claims.

#### Scenario: Qualified in-person inquiry is captured
- GIVEN in-person appointments in Ciudad Real are confirmed by Marta
- WHEN a visitor selects in-person, Ciudad Real fit, reason category, and contact details
- THEN the inquiry is marked qualified for manual response
- AND no diagnosis or clinical history is requested

#### Scenario: Visitor wants an unconfirmed modality
- GIVEN online or hybrid modality has not been confirmed by Marta
- WHEN the visitor reviews modality choices
- THEN that modality MUST be absent or marked pending
- AND the form MUST offer honest contact guidance without steering pressure

### Requirement: Retention, logging, and analytics boundary

Inquiry data MUST have an approved retention boundary, safe server logs, and no health/form payloads in analytics, pixels, session replay, third-party AI, or client storage. Measurement MAY track route views, CTA clicks, consent drop-off, incomplete form rate, and GBP interactions without payloads. Outcome: business measurement works without leaking sensitive data.

#### Scenario: Analytics event is created
- GIVEN a form submit or validation error occurs
- WHEN measurement data is emitted
- THEN it MUST exclude name, contact data, reason text, and health content

#### Scenario: Retention is undefined
- GIVEN inquiry retention has not been approved
- WHEN launch review runs
- THEN contact form launch MUST be blocked

### Requirement: Launch approval gates

The site MUST NOT launch until these gates pass: source-of-truth completion; legal/privacy review; clinical/deontological review; SEO/accessibility/performance review; local NAP/GBP consistency; analytics safety. Outcome: publication is safe, useful, and locally coherent.

#### Scenario: Source facts remain incomplete
- GIVEN credentials, registration, contact channels, modalities, exclusions, or legal texts are placeholders
- WHEN launch approval is requested
- THEN launch MUST be denied or limited to non-indexable draft mode

#### Scenario: Quality checks fail
- GIVEN contrast, keyboard access, metadata, schema, or CWV targets fail
- WHEN launch gate review runs
- THEN launch MUST wait for remediation or documented exception approval

### Requirement: Emergency and clinical boundary

The contact flow and content MUST state that the website is not an emergency service and MUST NOT perform diagnosis, triage, treatment recommendation, or risk assessment. Outcome: visitors with urgent needs are not misled.

#### Scenario: User seeks emergency help
- GIVEN a visitor indicates urgent risk or emergency need
- WHEN they view contact guidance
- THEN the site SHALL direct them to appropriate emergency channels
- AND SHALL NOT invite form-based crisis handling

### Requirement: Explicit excluded platform scope

This change MUST preserve the future roadmap while excluding it from the first implementation. Future candidates MAY include content/reputation operations, intake/admin automation, booking/payment/CRM after review, safe non-sensitive local AI, and separately gated Raspberry Pi/patient-data research. This change MUST NOT implement sensitive clinical AI, clinical records, patient data stores, session recording, automated diagnosis, triage, booking, payments, CRM, or local AI over patient data. Outcome: the first slice stays within privacy, legal, and review-budget boundaries.

#### Scenario: Excluded integration appears in tasks
- GIVEN a task includes CRM, booking, payment, diagnosis, records, session recording, or patient AI
- WHEN task review runs
- THEN it MUST be removed or moved to a separate SDD change

#### Scenario: Roadmap candidate is documented
- GIVEN a future OS candidate is content/reputation, intake/admin, CRM, booking/payment, local AI, or Raspberry Pi research
- WHEN the roadmap is reviewed
- THEN it MAY remain documented as future-scope
- AND MUST have no first-slice implementation task

### Requirement: Accessible legal/contact experience

Legal, privacy, cookies, and contact information MUST be reachable from footer and contact flow, not hidden only in modals. Form labels, consent, errors, and status messages MUST be screen-reader and keyboard accessible. Outcome: compliance information is understandable before submission.

#### Scenario: Consent notice is hidden
- GIVEN consent or privacy information is unavailable without a modal or inaccessible control
- WHEN accessibility review runs
- THEN the contact flow MUST fail approval
