# Keep & Grow — Retention, Expansion & Win-Back (Post-Sale Lifecycle)

Acquisition gets a customer once; **the lifecycle is where the money actually compounds.** For
brokerages and service businesses especially, the repeat/renewal/referral loop is the profit
engine — a closed deal is the *start* of the relationship, not the finish. This module has three
sections that share one scoreboard (**Net Revenue Retention**) and one timeline (everything after
the first sale). It builds on the follow-up engine (`follow-up.md`) and the referral mechanics
(`relational-acquisition.md`).

> **Evidence note.** Two famous retention claims are widely repeated and weakly grounded — keep
> them on the do-not-assert list (see `evidence-base.md`): Reichheld/Bain's "a 5% increase in
> retention raises profits 25–95%" (Harvard Business School / *The Loyalty Effect*, 1990s — the
> range is model-dependent, not a measured constant) and "acquiring a customer costs 5–25× more
> than retaining one" (no single rigorous primary source). The *direction* — retention is
> economically powerful — is sound; the specific multipliers are not. Instrument your own numbers.

## 1 — Retention (stop the leak)

Retention is engineered, not hoped for. The mechanics that consistently work:

- **Onboarding to first value.** The fastest path to the first real win (first covered load, first
  smooth closing, first claim handled). Early value is the strongest predictor of staying.
- **Renewal / anniversary management.** Keep a calendar of renewal, anniversary, and repeat-cycle
  dates and reach out *ahead* of them — proactively, not reactively. (Insurance and freight live and
  die here; real estate's "renewal" is the next life event, tracked via SOI.)
- **Customer health score.** A simple composite (usage/activity, service issues, sentiment, payment,
  engagement) that flags at-risk accounts *before* they churn. Route red accounts to a human.
- **Proactive check-ins & QBRs.** For larger accounts, a scheduled business review (results
  delivered, plan ahead). For smaller ones, a light periodic value touch — never let a good client
  go silent.
- **Capture the churn reason.** Every lost/lapsed customer gets a normalized reason; the monthly
  review turns those into fixes (ties to the measurement spine).

**Metrics:** **GRR** (gross revenue retention — retention before expansion, the true leak gauge),
**NRR** (net revenue retention — retention + expansion; >100% means the base grows without new
logos), **logo/customer churn**, and repeat/renewal rate. Track by cohort so trends surface early.

## 2 — Expansion (grow the ones you kept)

The cheapest revenue is more revenue from an existing, trusting customer. Motions:

- **Cross-sell / account rounding.** Add adjacent products/lines. *Insurance:* multi-line bundling
  (multi-line clients retain far better than monoline — expansion and retention are the same move).
  *Freight:* more lanes, modes, and a higher share of the shipper's freight. *Real estate:* repeat
  transactions + referrals across the client's lifetime.
- **Upsell.** Higher tier, more service, umbrella coverage, premium handling.
- **Land-and-expand.** Win a small piece (one lane, one policy, one deal), deliver, then grow share.
- **Expansion triggers.** Growth events, new assets, new needs, satisfaction peaks — the same
  positive moments that trigger referral asks.

**Metric:** NRR is the scoreboard; expansion is what pushes it above 100%.

## 3 — Win-Back (recover the ones you lost)

Lost and lapsed customers are the **cheapest pipeline you own** — they already know you. Two pools:

- **Lapsed customers** (churned/non-renewed) — often winnable with a new reason: a better rate, new
  capacity, a fixed problem, a changed circumstance on their side.
- **Dead leads / old closed-lost** — the reactivation pool from the cold/closing stages.

Approach:
- **Segment with RFM** (Recency, Frequency, Monetary) — prioritize recent, formerly-high-value
  customers; don't spray the whole dead list equally.
- **Give a genuine new reason** to re-engage (offer, change, trigger), not "just checking in."
- **Run it as a campaign**, and hand the cadence to the follow-up engine's **reactivation track**
  (`follow-up.md`) — this module decides *who and why*, that module runs *how*.

> **Win-back economics caveat:** the popular "you have a 60–70% chance of selling to an existing
> customer vs. 5–20% to a new prospect" comes from the *Marketing Metrics* textbook, not a
> controlled study — treat it as illustrative, not a hard rate (see `evidence-base.md`). The
> defensible claim: warm, prior relationships convert better and cheaper than cold — measure your own.

## Wiring it in

- CRM: use `customer_status`, `repeat_revenue_amount`, renewal/anniversary dates, health flag, and
  `reactivation_eligible_at` (measurement + follow-up fields).
- Scripts: renewal/QBR, cross-sell/account-rounding, and win-back templates live in
  `assets/scripts-library.md`.
- Cadence for reactivation: `follow-up.md`. Referral asks at expansion moments: `relational-acquisition.md`.
- Capacity: expansion still obeys the operating rule — don't grow accounts past your ability to serve them.
