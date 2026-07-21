# The Lead Engine — Capture, Attribution & Optimization

The measurement spine (`measurement.md`) defines *what* to record; this module defines the
**closed loop** that feeds it automatically: capture every lead with full attribution, enrich it,
respond in minutes, nurture it, then trace every closed deal back to its source and let the data
tell you what to scale. The single promise: **capture every lead, preserve attribution end to end,
increase conversion, and continuously improve.** Nothing here is trusted from memory — every number
is instrumented from real data.

This is automation-friendly: it's designed to run on a CRM plus an automation layer (n8n, Zapier,
or native CRM workflows). Whatever tool runs it, obey `compliance.md` (consent, TCPA/DNC, SMS
10DLC, CAN-SPAM, privacy) and `ai-governance.md` (no unvalidated writes to production records).

## Phase 1 — Capture (every lead, every field, automatically)

Capture the following on every inbound lead, at the moment of capture, without manual entry. Each
maps to a CRM field (see the "Capture & attribution fields" table in `measurement.md`):

- **Identity:** name, phone, email, address / service area.
- **Source & attribution:** source (Google, Facebook, referral, organic…), **UTM parameters**
  (source/medium/campaign/term/content), campaign, **ad creative**, **keyword**, **landing page**.
- **Context:** device, timestamp, language, **consent status** (the legal basis for follow-up).
- **Score:** an initial **lead score** (fit + intent signals).

Capture is worthless if attribution breaks between the click and the CRM. Preserve UTM/click IDs
from ad → landing page → form → CRM so Phase 5 can actually answer "which ad created this deal."

## Phase 2 — Enrichment (derive what wasn't submitted)

Automatically enrich each captured lead:

- **Geo:** ZIP → city/region; **distance from service area** (route or radius).
- **Value:** an **estimated service value** (from service type / segment) to prioritize.
- **Dedup:** **duplicate-lead detection** before creating a record (match on phone/email/address) —
  route likely dupes to review, don't silently merge material records (`ai-governance.md`).
- **Returning-customer detection:** match against existing customers → route to the right motion
  (win-back/expansion, not cold intake).
- **Campaign ROI:** join spend data so each lead carries its campaign's cost context.

## Phase 3 — Speed to Lead (contact within ~5 minutes)

The moment a lead lands, fire the automation (evidence for the 5-minute rule: `follow-up.md`):

- **Auto-create the CRM record** (with all captured + enriched fields, deduped).
- **Notify sales** instantly (the owner, via their fastest channel) and route/assign an owner.
- **Send a confirmation email** to the lead (sets expectations, buys time).
- **Queue an SMS — only when compliant** (consent + 10DLC; see `compliance.md`).
- **Schedule the follow-up tasks** that start the cadence (`follow-up.md` tracks).

Target: first human touch within ~5 minutes in-hours; a defined out-of-hours rule otherwise.

## Phase 4 — Nurture (automated sequence, value on every touch)

Every lead enters an automated sequence so none goes cold. Default shape (tune per business;
templates in `assets/scripts-library.md`; cadence mechanics in `follow-up.md`):

| Day | Touch | Purpose |
|---|---|---|
| 0 | Confirmation | Acknowledge, set expectations |
| 1 | Educational content | Teach, build trust (not a pitch) |
| 3 | Testimonial / proof | Social proof |
| 5 | FAQ | Remove friction / objections |
| 7 | Special offer | Create a reason to act now |
| 14 | Reminder | Re-surface for the not-yet-ready |
| 30+ | Long-term nurture | Stay present until timing is right |

Automation runs the *machinery*; humans make the real relational touches on live opportunities
(`ai-governance.md`). Every touch carries value — never an empty "just checking in."

## Phase 5 — Attribution (every closed deal traces back)

For every closed deal, the system must answer:

- Which **ad**? Which **campaign**? Which **landing page**? Which **keyword**?
- Which **salesperson**? **Time to close**?
- **Customer acquisition cost (CAC)**, **lifetime value (LTV)**, **return on ad spend (ROAS)**?

This is only possible if Phase 1 preserved attribution end to end. **Caveat (be honest):**
attribution is imperfect — last-touch over-credits the final click, multi-touch models make
assumptions, and offline/word-of-mouth influence is invisible. Pick a model deliberately and read
it alongside the six marginal-CAC risks in `measurement.md` (especially attribution uncertainty).
Use attribution to *inform* the scale/reduce decision, not to declare false precision.

## Phase 6 — Optimization (let the data reallocate the budget)

Continuously surface, per period:

- **Highest-converting campaigns** and **best-performing landing pages**.
- **Lowest CAC** channels and **highest-LTV** customer cohorts (LTV on contribution margin).
- **Best sales reps**, **best follow-up timing**, **highest-converting offers**.

These feed directly into the channel **scale/reduce rules** (`measurement.md`): move budget toward
low-marginal-CAC, high-LTV, capacity-absorbable sources; cut the rest. Change one variable at a
time so you can read the effect.

## Outputs — dashboards (every business gets these)

| Dashboard metric | Definition / note | Cadence |
|---|---|---|
| Lead volume | New leads by source | Weekly |
| Cost per lead (CPL) | Channel spend ÷ leads | Weekly |
| Cost per acquisition (CPA/CAC) | Attributable spend ÷ customers (see `measurement.md`) | Monthly |
| Appointment rate | Leads → appointments/meetings | Weekly |
| Close rate | Qualified → won | Monthly |
| Revenue by source | Closed revenue attributed by channel | Monthly |
| Lifetime value (LTV) | Discounted lifetime contribution margin | Quarterly |
| **LTV:CAC ratio** | The north-star efficiency ratio | Monthly/Quarterly |

Wire these off the CRM's captured + computed fields — never hand-maintained. This is the same
weekly/monthly/quarterly cadence as `measurement.md`; the Lead Engine just guarantees the data
underneath is complete and attributed.

## Implementation & governance notes

- **Attribution integrity is the whole game** — if UTM/click IDs don't survive to the CRM, Phases 5–6
  are guesswork. Test the click→CRM path end to end before trusting any dashboard.
- **Consent & privacy first:** capture and honor `consent_status`; SMS only when 10DLC + consent are
  in place; respect suppression/DNC across the sequence (`compliance.md`).
- **No unvalidated automation writes:** enrichment and AI suggestions pass validation/dedup before
  hitting production records; humans review merges on material accounts (`ai-governance.md`).
- **Profile-configurable:** the local-service fields (distance-from-service-area, estimated service
  value, appointment rate) suit field/home-services; swap them for the equivalent qualifying signal
  in other verticals via the business's `profiles/` entry.
