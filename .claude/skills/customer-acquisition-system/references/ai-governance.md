# AI-Augmented Workflows & Data Governance (Phase 4)

Put AI **behind** the relationship, not instead of it. Decide what to automate with two
questions: **How costly are errors?** and **What kind of knowledge does the task require?**
Generative AI fits tasks that rely on explicit, codifiable information. Tasks needing tacit
knowledge, empathy, ethical/contextual judgment, or material accountability need stronger
human control.

## Division of labor

| AI-heavy tasks | Human-owned tasks |
|---|---|
| Lead enrichment and contact research | Final qualification decisions |
| CRM field-completion suggestions | Stage movement approval on material deals |
| Call transcription and summary drafts | Negotiation, objection handling, pricing exceptions |
| Follow-up draft generation | Relationship repair and service recovery |
| Duplicate detection and record matching | Final merge approval on sensitive accounts |
| Next-action reminders and SLA alerts | Strategic account planning |
| Simple lead scoring and prioritization | Judgment about account potential and reputational risk |
| Proposal first drafts and document assembly | Final commercial commitments and legal review |
| Routing, scheduling, queue management | Executive approval on policies and governance exceptions |

## Data-governance controls

CRM hygiene is revenue protection, not just reporting. Following recognized AI-governance
practice (govern → measure → manage): do third-party due diligence, protect privacy/security,
set training-data-use policies, control sensitive data, track provenance, monitor incidents,
and red-team for prompt injection and model extraction.

**Hard rule:** no generative tool writes directly to production CRM records without validation
rules, human review on exception cases, evidence logging, and rollback ability.

**Standard CRM-hygiene policy:**
- New records pass required-field validation at ingestion.
- Canonical naming standardizes companies, contacts, asset/vehicle IDs, service locations.
- A matching engine flags likely duplicates before creation; humans review merges for material accounts.
- Stage changes require owner, next action, expected value, and source.
- AI-generated call notes populate a **review queue** — they do not become record truth by default.
- Closed-lost reasons are required and normalized.
- Monthly data-quality audits sample stale opportunities, ownerless records, missing attribution,
  and inconsistent revenue/cost fields.
- For any AI feature touching customer data, maintain a system inventory, approved-use policy,
  vendor due-diligence record, and incident-response path.

## Why capacity, not lead-gen, is the real portfolio risk

Acquisition spend behaves like customer-capital investment **only** when it creates durable,
profitable, repeatable relationships. Win demand you can't fulfill and the spend becomes
reputational debt. This is acute in logistics, field services, installation, recruiting,
healthcare-adjacent services, and anything where onboarding, scheduling, compliance, or service
recovery is heavy. Adoption and realized value depend on **implementation capacity** — support
modeled on customer-success, not merely the act of winning the customer. Pair every acquisition
plan with a capacity plan (staffing, onboarding, QA, scheduling, tech readiness, compliance,
service-recovery ownership).
