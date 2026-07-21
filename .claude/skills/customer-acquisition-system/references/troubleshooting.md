# When It's Not Working — Diagnosis, Edge Cases & Plan B

The rest of the system describes how things go right. This file assumes they don't — because in
the real world they won't, at least at first. Use it two ways: **(1) diagnose** an underperforming
funnel (symptom → likely cause → fix), and **(2) pre-arm contingencies** so every major bet has a
Plan B *before* it fails. The meta-rule underneath all of it: **decide your kill/fallback criteria
before you spend, not in the middle of the panic.**

## Diagnose by symptom (walk the funnel stage by stage)

Find the symptom, fix the *earliest* broken stage first — a leak upstream makes everything
downstream look broken.

| Symptom | Likely cause | Fix / Plan B |
|---|---|---|
| **Not enough leads** | Offer/ICP weak, wrong channel, or too little spend/activity | Fix offer + ICP first (cheapest lever); test a 2nd channel small; brand-new & no proof → see Cold-start below (`cold-outreach.md`) |
| **Leads but can't reach them** | Too slow, bad contact data, wrong channel/time | Tighten speed-to-lead, verify data, rotate channels, raise attempts to ~6 (`follow-up.md`) |
| **Reach them but no meetings** | Weak opener, no value in the ask, wrong ICP | Rewrite opener around their problem (A-I-M), qualify harder, fix the offer (`cold-outreach.md`, `closing.md`) |
| **Meetings but no close** | Shallow discovery, objections unhandled, price/value gap, wrong buyer | Deepen discovery, build the objection library, tie price to quantified impact (`closing.md`) |
| **Closing but churning** | Onboarding/fulfillment gap, over-promising, bad-fit customers | Fix first-value, disqualify bad fits, enforce the capacity rule (`lifecycle.md`) |
| **Economics underwater** (CAC too high / LTV:CAC low) | Overpaying for acquisition or under-monetizing | Cut worst channels by marginal CAC, lift retention/expansion, reprice (`measurement.md`, `lifecycle.md`, `pricing.md`) |
| **Works but won't scale** | Single-channel ceiling, capacity limit, channel saturation | Diversify channels, fix fulfillment capacity, watch saturation curves |

## Edge cases the base playbook can under-serve

- **Cold start (no reviews, no cases, no referrals).** Don't buy scale before you have proof — you'll
  just amplify a message that doesn't convert yet. Instead: lead with a stronger **risk-reversal /
  guarantee**, do a few free or discounted jobs to *manufacture* proof and testimonials, borrow trust
  (credentials, partners, associations), and go hyper-targeted **manual** outreach before paid spend.
- **Junk-lead flood (quantity over quality).** More leads isn't progress if they don't convert. Tighten
  the source/targeting, add qualification gates and lead scoring, and manage to **cost-per-qualified-
  meeting**, not raw lead volume (`lead-engine.md`).
- **Long / committee sales cycles.** Map every stakeholder (the Influence in A-I-M), multi-thread the
  deal, expect a longer cadence, and don't mark closed-lost early (`closing.md`, `follow-up.md`).
- **Leads with no consent.** Can't legally SMS/auto-dial them — route to email + manual calling within
  the rules, and capture consent at the first opportunity (`compliance.md`).
- **Referral gaming / low-quality referrals.** Pay on **retention thresholds, not sign-ups**, cap and
  verify, watch for fraud, and measure referred-cohort quality by source (`relational-acquisition.md`).
- **Supply-side churn (partners / drivers / agents).** Keep a bench, use retention-weighted payouts,
  and never let one partner node become a single point of failure.
- **Seasonality / demand troughs.** In slow periods shift budget to the cheapest pipeline — retention,
  referrals, win-back — build a pipeline buffer ahead of the trough, and forecast it (`lifecycle.md`).
- **Non-payment / chargebacks / bad debt.** Qualify for ability-to-pay, use deposits/milestones, and
  never count unpaid revenue as "won."

## Failure modes & Plan B (pre-arm these — they *will* happen)

- **Single-channel dependence.** One channel = existential risk. **Plan B:** always be testing a
  second/third channel at small scale so you're never one algorithm change from zero.
- **Ad-account / platform ban or policy strike.** **Plan B:** multiple ad accounts/pages, spotless
  compliance, and an **owned** channel you control (email/SMS list, referrals). Don't build the whole
  business on rented land.
- **Email deliverability collapse (domain burned).** **Plan B:** separate sending domains, warmed
  backups ready, monitor bounce/spam and throttle; never send cold from your primary domain
  (`cold-outreach.md`).
- **Key-person / relationship dependence.** The business runs on one person's relationships or skill.
  **Plan B:** document the process (scripts, profiles, CRM), distribute relationships across the team,
  and build the *system* so it survives a departure — the whole point of this skill.
- **CRM adoption failure (reps won't use it).** The #1 quiet killer — data rots and the economics
  become fiction. **Plan B:** make the CRM the path of least resistance (automate capture, minimal
  required fields, mobile-friendly), enforce "not in the CRM = didn't happen," and tie comp/visibility
  to it (`ai-governance.md`, `lead-engine.md`).
- **Compliance incident (TCPA/DNC/CAN-SPAM/licensing).** **Plan B:** counsel review before scaling,
  airtight consent + suppression, appropriate insurance (E&O). Treat a violation as a **stop-the-line**
  event, not a fine to absorb (`compliance.md`).
- **Cash-flow / CAC-payback squeeze.** Scaling acquisition consumes cash *before* payback lands.
  **Plan B:** know your payback in months, fund the gap deliberately, and slow acquisition when working
  capital is thin (the operating rule in `SKILL.md`).
- **Offer doesn't convert (message-market miss).** **Plan B:** treat the offer as a **hypothesis** —
  run cheap tests and iterate the offer/ICP *before* blaming execution or spending more.
- **Demand shock / downturn.** **Plan B:** lean on the cheapest pipeline (retention, referrals,
  win-back), tighten qualification, protect margin, and cut the worst channels first.
- **Over-automation eroding trust.** Robotic sequences on a relationship sale cost deals. **Plan B:**
  automate the machinery, keep humans on the real touches, and periodically test that your sequences
  still feel human (`ai-governance.md`).

## Test cheap, kill fast (the meta-rule)

Before spending on any new channel, offer, or hire, write down a **test budget** and **kill criteria**
in advance: e.g. "*$X or N leads; if cost-per-qualified-meeting > $Y, or zero qualified by then, kill
or fix.*" Change **one variable at a time** so you can read the result. Pre-deciding the stop-loss
removes ego and sunk cost from the call — the single biggest reason operators keep funding dead
channels. This is the same discipline as the scale/reduce rules in `measurement.md`, applied *before*
the money goes out.

## Definition of Ready (don't launch acquisition half-baked)

Turning on lead-gen before these are in place means paying to fill a leaky bucket. Confirm:

- [ ] **ICP** defined and narrow enough to target.
- [ ] **Offer + risk-reversal** set (and a first-step low-risk ask).
- [ ] **CRM + capture/attribution** live and tested end to end (`lead-engine.md`).
- [ ] **Speed-to-lead + cadence** wired, with an owner assigned (`follow-up.md`).
- [ ] **Compliance** cleared for the channels you'll use (`compliance.md`).
- [ ] **Fulfillment/capacity** able to serve the wins without degrading service (operating rule).
- [ ] **Dashboards** ready to read results (`lead-engine.md` Outputs).

Missing any one of these is itself a "why it's not working" answer — fix it before you scale spend.
