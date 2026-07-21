# Brokerage Base Profile (shared DNA)

> **This is the shared engine for every brokerage.** It holds what's true across freight, real
> estate, insurance (and future brokerage types). Don't use it alone — pair it with a **vertical
> overlay** that fills the specifics: `freight.md`, `real-estate.md`, or `insurance.md`. The
> overlay inherits everything here and only states what differs. To add a new brokerage type,
> copy an overlay and adjust.

## What every brokerage has in common

A brokerage sits **between two sides** and gets paid to match and facilitate: a **customer**
(the party you're acquiring) and a **supply/counterparty** side (carriers, buyers/sellers,
insurers). That structure drives the whole playbook:

- **Trust is the core asset.** People route deals through a broker because they trust the broker's
  judgment, access, and reliability. Every tactic must protect that trust — it is the thing that
  compounds and the thing that, once lost, ends the business.
- **Relationship-led + phone-first.** Brokerage is a voice business. The phone leads (see
  `cold-outreach.md` Step 4 and the follow-up engine's speed-to-lead), email and social support it.
- **The referral flywheel dominates long-run growth.** Referred and repeat clients convert better,
  cost less, and stay longer (see `relational-acquisition.md`). A brokerage that isn't
  systematically harvesting referrals is leaving its cheapest pipeline on the table.
- **A licensing/regulatory overlay always applies.** Every brokerage type is regulated — on
  outreach (TCPA/DNC/CAN-SPAM/10DLC) *and* on the profession itself (authority, licensing, referral
  fees, disclosures). The overlay differs by vertical; **never prospect before confirming it** (see
  `compliance.md`).
- **Capacity = personal attention.** A broker's throughput is deal-handling and relationship
  bandwidth. Winning more counterparties than you can serve *well* destroys the trust asset — so the
  system's capacity operating rule (in `SKILL.md`) bites hard here.
- **Economics are repeat/renewal-driven.** Value a brokerage client on **contribution margin across
  the repeat/renewal relationship**, not a single deal — that's what justifies acquisition spend and
  makes CAC payback favorable (see `measurement.md`).

## Shared configuration (defaults; the overlay tunes these)

- **Dominant motion:** outbound cold + referral. Both compound; run them together.
- **Channel priority (typical):** 1) phone 2) email 3) social/LinkedIn 4) SMS (warm/consented only)
  5) referrals & COIs. The overlay re-ranks for its vertical.
- **Cadence:** ~6–8 multi-channel touches over ~2–3 weeks (follow-up engine persistence).
- **Speed-to-lead:** call inbound/quote requests within ~5 minutes; same-day on any reply.
- **Offer shape:** brokerages have a natural **low-risk first step** — a free quote / market check /
  valuation / rate benchmark. Lead with it.
- **Retention is not optional:** the repeat/renewal/referral loop is the real profit engine — wire in
  the lifecycle module (`lifecycle.md`) from day one.

## Pick your vertical overlay

| Vertical | Overlay file | Customer / supply | Signature compliance overlay |
|---|---|---|---|
| Freight / logistics | `freight.md` | shippers / carriers | FMCSA broker authority (MC#), BMC-84 bond |
| Real estate | `real-estate.md` | buyers & sellers / listings | State RE license, RESPA §8, NAR settlement rules |
| Insurance | `insurance.md` | policyholders / carriers | State producer license, carrier appointments, E&O |

Each overlay follows the `_TEMPLATE.md` section structure and fills: ICP & triggers, the exact
compliance & **referral-fee** regime, offer/hook, objections, tools/CRM, economics, and the
retention/renewal cycle. Everything not restated in the overlay defaults to this base.
