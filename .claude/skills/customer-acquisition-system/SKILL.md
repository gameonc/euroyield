---
name: customer-acquisition-system
description: >-
  A research-grounded system for getting and closing customers in ANY business — the
  acquire → close → retain funnel. Use it to define your ideal customer / target market, build a
  sales funnel, run cold outreach (email, calling, SMS, sequences, compliance); design follow-up cadences (speed-to-lead,
  nurture, reactivation); write discovery/objection/closing scripts; set up a CRM and
  CAC/LTV/payback economics; referral programs; set pricing; improve retention/expansion/
  win-back (churn, renewals, cross-sell, NRR); instrument lead capture, attribution, scoring, and
  dashboards (CPL, CPA, ROAS, LTV:CAC); write conversion copy (ads, landing pages, VSLs); or
  set up sales ops (roles, comp). Works across sales-led and self-serve models with plug-in
  per-industry profiles (brokerage, e-commerce, home services, car sales, more). Trigger it even
  without "acquisition" or "CAC" — e.g. "build my sales funnel," "leads keep going cold," "write me
  an ad or cold-call script," "win back old clients," "sales system for my brokerage."
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

## Works across business models (sales-led ↔ marketing-led/self-serve)

This runs anywhere you need to get clientele — local services, brokerages, B2B, **e-commerce/DTC**,
SaaS, marketplaces. The funnel backbone is the same everywhere (capture → attribution → nurture →
retention → dashboards); what changes is **who closes** and which stages dominate:

- **Sales-led** (brokerages, high-ticket, B2B, services): a human closes. The cold-outreach, closing,
  and follow-up stages carry the most weight.
- **Marketing-led / self-serve** (e-commerce, low-ticket, high-volume): **the funnel closes, not a
  rep.** The closing toolkit is largely replaced by store/landing-page CRO + automated email/SMS
  flows; the Lead Engine, lifecycle (retention/repeat/win-back), and pricing carry the most weight.
  Speed-to-lead becomes cart-abandonment/welcome-flow timing. See `profiles/ecommerce.md`.

Most businesses are a blend — tune the mix to **ticket size and consideration** (higher ticket → more
human closing; lower ticket/higher volume → more automation). The profile you plug in sets that mix;
the modules themselves don't change.

## How to apply it (the workflow)

Start every engagement by **plugging in the profile**, then work the funnel from top to bottom.
Don't dump the whole framework — diagnose where the business is actually weak and start there.
Each stage has a dedicated file with the detail, tables, formulas, and scripts.

### Step 0 — Plug in the industry profile (do this FIRST, every time)
This is what makes the system a reusable wheel instead of a rebuild each time. Select or create a
profile in `profiles/` that pre-configures channels, cadence, offer angles, **compliance regime**,
KPIs, tech, and objections for the business type. `profiles/_TEMPLATE.md` is the blank; copy it to
`profiles/<type>.md` and fill it. For families of related businesses, use a **base + overlay**
structure: `profiles/brokerage/base.md` holds shared DNA and the vertical overlays
(`freight.md`, `real-estate.md`, `insurance.md`) state only what differs — so multiple brokerages
run off one engine. The profile sets the presets for every stage below.

### Step Zero — Know your clientele (the customer avatar) → `references/icp-avatar.md`
Before channels, copy, or spend: define **exactly who the customer is, where they are, and where
they hang out.** Everything downstream — which channels you run, the words you use, the offer, who
you target — is decided here. A sharp one-page avatar beats a broad audience. This fills the ICP,
objections, and channel sections of the business's profile, and it's the first Definition-of-Ready
check. Refine it over time with what the Lead Engine data shows actually converts.

### Foundation — measurement spine + economics → `references/measurement.md`
The economics are only as trustworthy as the data underneath them. Set up the CRM/data model
(controlled source/stage/lost-reason fields; computed margin/cycle) and the channel economics —
**channel CAC, contribution-margin LTV, CAC payback, and marginal CAC** (marginal CAC reveals the
acquisition-cost curve that blended CAC hides). Includes the scale/reduce rules and reporting cadence.

### Instrument & automate the funnel — the Lead Engine → `references/lead-engine.md`
The closed loop that keeps the data honest: capture every lead with full attribution (UTM/click IDs
surviving ad → landing page → CRM), enrich it, respond within ~5 minutes automatically, run the
Day 0→30+ nurture sequence, then trace every closed deal back to its ad/campaign/keyword/rep and let
the dashboards (CPL, CPA, appointment rate, close rate, revenue by source, LTV:CAC) drive the
scale/reduce decisions. Automation-friendly (CRM + n8n/Zapier), always gated on consent + compliance.

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

### Keep & grow — retention, expansion, win-back → `references/lifecycle.md`
The lifecycle is where the money compounds. Engineer retention (onboarding/first-value, renewal
management, health scores, QBRs), drive expansion (cross-sell/account-rounding — the cheapest
revenue there is), and run win-back on lapsed customers and dead leads. Scoreboard: net revenue
retention. For brokerages this repeat/renewal/referral loop is the actual profit engine, not a nicety.

### Behind the relationship — AI & governance → `references/ai-governance.md`
Automate explicit-knowledge, low-error-cost work; keep tacit-knowledge, high-stakes, trust-sensitive
work human. Wrap it in real data-governance controls — no generative tool writes to production CRM
without validation, human review on exceptions, logging, and rollback.

### Run the machine — sales operations → `references/sales-ops.md`
How you staff, pay, measure, and run the sellers: full-cycle vs SDR/AE roles, comp designed to drive
the right behavior (pay the renewal/margin, not just the logo), activity metrics + funnel benchmarks,
enablement/QA/coaching/forecasting, and a lean tech-stack map. Keep it minimal for a small team.

### Reusable assets (use across every stage) → `assets/scripts-library.md`
Copy-paste scaffolds for cold email/call, voicemail, LinkedIn, SMS, discovery questions, objection
responses, and referral/reactivation/handoff templates. Use these so no one rewrites the wheel —
swap the `[BRACKETS]`, keep it human, run it past `compliance.md`.

### Write the money copy — the Copywriting Engine → `references/copywriting.md`
This skill writes the actual conversion copy: offers, ads, landing pages, opt-in forms, lead magnets,
email/SMS, VSL/video scripts, and creative briefs. Start with the **offer** (the biggest lever), write
in the customer's own words, hook hard, prove it, remove the risk. Ground every piece in the
business's `profiles/` entry (offer, ICP, voice), generate variants, and test one variable at a time
against the Lead Engine metrics. Every claim is human-checked and compliant (`compliance.md`) — copy
is where ad accounts get banned and lawsuits start.

## Non-negotiable operating rule (state it when advising on scaling)

> No venture may materially increase acquisition spending unless management can demonstrate,
> using current operating data, that fulfillment capacity, service-level performance,
> contribution-margin economics, working-capital support, and customer-experience controls
> are sufficient to absorb the projected incremental demand. Every acquisition plan must be
> paired with a capacity plan. Where data quality is incomplete, attribution is unstable, or
> marginal-CAC evidence is inconclusive, the default posture is controlled testing, not scale.

## When it's not working — diagnosis & Plan B → `references/troubleshooting.md`

The system above describes the happy path; real funnels break, especially early. Before scaling,
run the **Definition of Ready** checklist, and whenever something underperforms, diagnose the
*earliest* broken funnel stage rather than the loudest symptom. Every major bet needs a pre-armed
Plan B — single-channel/platform dependence, ad-account bans, deliverability collapse, key-person
dependence, CRM-adoption failure, compliance incidents, cash-flow squeeze, a non-converting offer,
demand shocks. And set **test budget + kill criteria before you spend**, not after.
→ Read `references/troubleshooting.md` for the symptom→cause→fix table, the edge cases (cold-start,
junk-lead floods, committee cycles, referral gaming), the failure-mode contingencies, and the
Definition-of-Ready pre-flight.

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
