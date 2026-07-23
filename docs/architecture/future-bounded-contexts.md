# Future bounded contexts

This first slice is only the public website foundation. It must not grow into clinical operations by accident.

## Public website context — implemented now

| Area | Allowed now | Boundary |
|---|---|---|
| Public pages | Draft-safe IA, static-prerender output, approved-source content model | No final publication until approvals are complete |
| Content registry | Status, source facts, blockers, sitemap/noindex decisions | No invented credentials, address, prices, guarantees, testimonials, or outcomes |
| Contact | Minimal disabled flow and server validation boundary | No live sensitive-data submission until legal/provider/retention approval |
| Analytics | Safe event taxonomy only | No names, contact details, messages, health payloads, session replay, or patient data |

## Deferred practice operating system

Future changes may explore non-sensitive operations support only after a separate SDD proposal:

- content planning and reputation workflow;
- admin checklists and aggregate metrics;
- booking, payment, or CRM integrations after legal and processor review;
- local AI for non-sensitive administrative assistance.

## Sensitive clinical/Raspberry Pi research boundary

Any work involving patient data, clinical records, diagnosis, triage, session recording, clinical AI, local Raspberry Pi storage, backups, access logs, or retention must be a separate bounded context with:

- legal/privacy review and DPIA-style risk assessment;
- threat model and access control design;
- data minimization and retention policy;
- backup, audit, breach, and deletion procedures;
- explicit user approval before implementation.

Local hardware is not automatically safe. A Raspberry Pi can reduce some vendor exposure, but it does not remove obligations around special-category health data.
