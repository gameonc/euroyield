---
name: customer-acquisition-system
description: >-
  A research-grounded operating system for building the acquisition, closing, and
  revenue-operations part of the funnel for ANY business. Use this whenever the user
  is designing or improving how a business gets and closes customers — building a
  sales/lead-closing process, running cold outreach or prospecting (cold email, cold calling,
  SMS/DM, list-building, ICP targeting, sales sequences, outreach compliance like TCPA/DNC/
  CAN-SPAM/10DLC), designing a follow-up pipeline or cadence (speed-to-lead, multi-touch
  sequences, nurture, dead-lead reactivation), writing discovery/qualification/objection-handling/
  closing scripts, setting up or fixing a CRM or pipeline, defining CAC / LTV / payback /
  marginal-CAC economics, deciding whether to scale or cut a channel, designing a referral or
  partner/driver-recruiting program, choosing a pricing posture (uniform → segmented →
  negotiated → personalized), or standing up the go-to-market for a new venture or a specific
  industry (e.g. a brokerage). Trigger it even when the user doesn't say "acquisition" or "CAC" —
  phrases like "how do I close more leads," "build a cold outreach system," "write me a cold call
  script," "our leads keep going cold," "nobody's calling people back," "set up my sales funnel,"
  "what should I pay for referrals," "build the sales system for my brokerage," or "we keep
  winning customers we can't service" all belong here. This is a portfolio-grade, plug-in playbook
  with per-industry profiles, meant to be re-applied across multiple businesses.
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
is a first-class stage, not an afterthought (see `references/follow-up.md`).

## How to apply it (the workflow)

Start every engagement by **plugging in the profile**, then work the funnel from top to bottom.
Don't dump the whole framework — diagnose where the business is actually weak and start there.
Each stage has a dedicated file with the detail, tables, formulas, and scripts.

### Step 0 — Plug in the industry profile (do this FIRST, every time)
This is what makes the system a reusable wheel instead of a rebuild each time. Select or create a
profile in `profiles/` that pre-configures channels, cadence, offer angles, **compliance regime**,
KPIs, tech, and objections for the business type. `profiles/_TEMPLATE.md` is the blank; copy it to
`profiles/<type>.md` and fill it. `profiles/brokerage.md` is a worked, cold-outreach-heavy example.
The profile sets the presets for every stage below.

### Foundation — measurement spine + economics → `references/measurement.md`
The economics are only as trustworthy as the data underneath them. Set up the CRM/data model
(controlled source/stage/lost-reason fields; computed margin/cycle) and the channel economics —
**channel CAC, contribution-margin LTV, CAC payback, and marginal CAC** (marginal CAC reveals the
acquisition-cost curve that blended CAC hides). Includes the scale/reduce rules and reporting cadence.

### Top of funnel — cold outreach & prospecting → `references/cold-outreach.md`
For outbound-heavy businesses (brokerage, agencies, B2B services), this is where leads are
**generated from cold**: ICP/list-building, the offer/hook, cold email (deliverability + copy),
cold calling, SMS/DM, and the orchestrated multi-channel sequence.
→ **Read `references/compliance.md` before sending or dialing** — cold outreach is the most
regulated part of the funnel (TCPA/DNC, CAN-SPAM, SMS 10DLC, GDPR/CASL, plus licensing overlays).

### Mid funnel — the follow-up engine → `references/follow-up.md`
Fast first touch (speed-to-lead), a fixed multi-touch multi-channel cadence so nobody quits too
early (persistence), status tracks (hot / standard / long-nurture / dead-lead reactivation), value
on every touch, and "no lead left behind" rules. Evidence-backed; instrument it as its own discipline.

### Bottom of funnel — the closing toolkit → `references/closing.md`
Diagnose before you prescribe: a discovery framework, a qualification rubric (score and disqualify
fast), an objection-handling method, closing mechanics, and a clean handoff to fulfillment.

### Relationship & pricing → `references/relational-acquisition.md`, `references/pricing.md`
Prioritize relationship-driven channels for trust-heavy businesses; design a retention-weighted
referral program and a partner/recruiting pipeline; then pick a pricing posture deliberately
(uniform → segmented → negotiated → personalized).

### Behind the relationship — AI & governance → `references/ai-governance.md`
Automate explicit-knowledge, low-error-cost work; keep tacit-knowledge, high-stakes, trust-sensitive
work human. Wrap it in real data-governance controls — no generative tool writes to production CRM
without validation, human review on exceptions, logging, and rollback.

### Reusable assets (use across every stage) → `assets/scripts-library.md`
Copy-paste scaffolds for cold email/call, voicemail, LinkedIn, SMS, discovery questions, objection
responses, and referral/reactivation/handoff templates. Use these so no one rewrites the wheel —
swap the `[BRACKETS]`, keep it human, run it past `compliance.md`.

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

**Do this through a profile** (`profiles/`), not by editing the reference files. Copy
`profiles/_TEMPLATE.md` to `profiles/<business-type>.md`, fill it, and it becomes the venture's
configuration layer — the reference files stay generic and reusable. When applying to a concrete
venture, translate:
- Swap the CRM enums for that business's real channels, stages, and lost reasons.
- Replace "driver pipeline" with whatever the venture's supply/partner side is (installers,
  clinicians, franchisees, resellers, hosts) — the retention-weighted payout logic is the same.
- Set the venture's own acquisition ceiling, target payback window, and SLA thresholds before
  the scale/reduce rules mean anything.
- Right-size pricing posture to trust sensitivity: relationship-led B2B rarely jumps straight
  to algorithmic personalization.
