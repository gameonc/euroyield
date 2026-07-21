---
name: customer-acquisition-system
description: >-
  A research-grounded operating system for building the acquisition, closing, and
  revenue-operations part of the funnel for ANY business. Use this whenever the user
  is designing or improving how a business gets and closes customers — building a
  sales/lead-closing process, designing a follow-up pipeline or cadence (speed-to-lead,
  multi-touch sequences, nurture, dead-lead reactivation, "no lead left behind" rules),
  setting up or fixing a CRM or pipeline, defining CAC / LTV / payback / marginal-CAC
  economics, deciding whether to scale or cut a channel, designing a referral or
  partner/driver-recruiting program, choosing a pricing posture (uniform → segmented →
  negotiated → personalized), or deciding which parts of the funnel to automate with AI vs.
  keep human. Trigger it even when the user doesn't say "acquisition" or "CAC" — phrases like
  "how do I close more leads," "build a follow-up system," "our leads keep going cold,"
  "nobody's calling people back," "set up my sales funnel," "what should I pay for referrals,"
  "should I spend more on ads," "build the go-to-market for this new venture," or "we keep
  winning customers we can't service" all belong here. This is a portfolio-grade playbook meant
  to be re-applied across multiple businesses.
---

# Customer Acquisition & Revenue Operating System

## What this skill is for

A reusable operating system for the **acquire → close → retain** part of the funnel,
designed to be dropped onto **any** business in a portfolio (services, logistics,
SaaS, marketplaces, field labor, fintech, etc.). It exists because most founders
manage customer acquisition as a loose marketing expense. This system instead treats
it as **capital allocation**: money spent to acquire customers should compound into a
durable, profitable asset, or it should not be spent.

Three functions, always kept distinct:

1. **Acquisition is a capital-allocation function** — spend to build customer capital, measured like an investment (marginal returns, payback), not a cost center.
2. **Pricing is a value-capture function** — the point where willingness-to-pay is realized; move up a maturity ladder deliberately, not by default.
3. **Revenue operations is the control system** — the CRM, metrics, and rules that decide whether customer capital compounds or evaporates.

The single most important guardrail, applicable portfolio-wide:
**do not scale acquisition faster than the business can fulfill.** Winning demand you
can't service turns acquisition spend from capital formation into reputational debt.

The muscle that actually converts the pipeline is **follow-up**. Measurement and channel
economics fill the pipeline; speed and persistence in follow-up are where most revenue is
won or lost. A CRM without a follow-up engine is a graveyard. Give this its own weight — it
is Phase 3, not an afterthought (see `references/follow-up.md`).

## How to apply it (the workflow)

When a user brings a business (new or existing), work through these four phases **in order**.
Don't dump the whole framework — diagnose where they actually are and start there. Each
phase has a dedicated reference file with the detail, tables, and formulas; read the file
when you reach that phase.

### Phase 1 — Establish the measurement spine (CRM + data model)
The economics are only as trustworthy as the data underneath them. Before optimizing any
channel, make sure lead source, attribution, contribution margin, acquisition cost, and
retention are captured in structured, controlled fields.
→ Read `references/measurement.md` for the publication-ready CRM schema and the rule that
source/stage/lost-reason/status must be controlled picklists and margin/cycle fields computed.

### Phase 2 — Run the channel economics
Reject blended CAC as the operating center of gravity. Build the system on **channel CAC,
contribution-margin-based LTV, CAC payback, and marginal CAC.** Marginal CAC reveals the
acquisition-cost curve; blended CAC hides it by averaging.
→ Read `references/measurement.md` for the four formulas, the six marginal-CAC risks, the
explicit scale/reduce decision rules, and the weekly/monthly/quarterly reporting cadence.

### Phase 3 — Build the follow-up engine (speed + persistence)
This is where deals are actually won or lost. Guarantee fast first touch (speed-to-lead),
a fixed multi-touch multi-channel cadence so nobody quits too early (persistence), status-based
tracks (hot / standard / long-nurture / dead-lead reactivation), value on every touch, and
"no lead left behind" rules so nothing rots silently. Instrument it as its own discipline.
→ Read `references/follow-up.md` for the cadence tracks, the no-lead-left-behind rules, the
AI-vs-human split for follow-up, the follow-up metrics, and the extra CRM fields it needs.

### Phase 4 — Build relational acquisition + set pricing posture
For high-trust, high-friction, operationally complex businesses, prioritize relationship-driven
channels (they give control over qualification, objection handling, pricing, and handoff).
Design the outreach cadence, a retention-weighted referral program, and a partner/recruiting
pipeline. Then pick a pricing posture deliberately.
→ Read `references/relational-acquisition.md` (A-I-M outreach, referral mechanics, driver/partner
pipeline) and `references/pricing.md` (the uniform → segmented → negotiated → personalized ladder).

### Phase 5 — Put AI behind the relationship, not instead of it
Automate the explicit-knowledge, low-error-cost work (enrichment, drafting, dedup, reminders);
keep tacit-knowledge, high-stakes, trust-sensitive work human (qualification, negotiation, service
recovery). Wrap it in real data-governance controls — no generative tool writes to production CRM
without validation, human review on exceptions, logging, and rollback.
→ Read `references/ai-governance.md` for the task-split table and the CRM-hygiene control policy.

## Non-negotiable operating rule (state it when advising on scaling)

> No venture may materially increase acquisition spending unless management can demonstrate,
> using current operating data, that fulfillment capacity, service-level performance,
> contribution-margin economics, working-capital support, and customer-experience controls
> are sufficient to absorb the projected incremental demand. Every acquisition plan must be
> paired with a capacity plan. Where data quality is incomplete, attribution is unstable, or
> marginal-CAC evidence is inconclusive, the default posture is controlled testing, not scale.

## Evidence discipline (how to talk about the numbers)

This system is built on a prioritized evidence base, and its credibility depends on **not**
overstating it. When you cite a figure, carry its confidence with it, and never launder a
low-confidence survey stat or an unverified "everybody knows" statistic into a hard
recommendation.
→ Read `references/evidence-base.md` for the source hierarchy, the load-bearing findings and
their confidence levels, and the explicit list of popular-but-unverified stats to avoid
(e.g. "retention is 5–25× cheaper than acquisition," "68% feel exploited by dynamic pricing").

## Adapting to a specific business

The reference files use generic fields and a driver-recruiting example. When applying to a
concrete venture, translate:
- Swap the CRM enums for that business's real channels, stages, and lost reasons.
- Replace "driver pipeline" with whatever the venture's supply/partner side is (installers,
  clinicians, franchisees, resellers, hosts) — the retention-weighted payout logic is the same.
- Set the venture's own acquisition ceiling, target payback window, and SLA thresholds before
  the scale/reduce rules mean anything.
- Right-size pricing posture to trust sensitivity: relationship-led B2B rarely jumps straight
  to algorithmic personalization.
