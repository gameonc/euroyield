# Run the Machine — Sales Operations

The rest of the system defines *what* to do; sales ops is *how you staff, pay, measure, and run the
people who do it.* Get this wrong and a great playbook still underperforms — the wrong comp plan or
no activity discipline quietly kills execution. Keep it lean for a small brokerage; add structure as
you scale.

## 1 — Roles & team structure

- **Full-cycle rep** (one person prospects → closes → often services): the default for small
  brokerages and relationship sales. Simple, and the relationship stays with one trusted person —
  which brokerage clients want.
- **Split model (SDR/BDR → AE):** a prospecting specialist books meetings; a closer runs them. Worth
  it once volume justifies specialization and prospecting is dragging closers off the phone. Common
  ratio is a few SDRs per AE, but let pipeline math decide, not a rule of thumb.
- **Support roles as you grow:** an ops/admin person to handle CRM hygiene, load/policy/transaction
  processing, and follow-up logistics frees producers to sell and serve.
- **Decision rule:** specialize only when a clearly separable, repeatable task is stealing selling
  time. Premature org charts add overhead without output.

## 2 — Compensation (comp drives behavior — design it on purpose)

- **Structure:** base + variable, expressed as **OTE** (on-target earnings) with a defined split.
  Commission-only (with or without a **draw**) is common in brokerage but raises ramp risk and turnover.
- **Per-vertical norms** (verify locally; tune to your economics):
  - *Freight:* reps typically paid a **share of the margin** they generate (a % of gross profit).
  - *Real estate:* agent **commission splits** with the brokerage (graduated splits, caps, desk-fee
    or 100%-plus-fee models).
  - *Insurance:* producer paid on **new-business commission plus a share of renewals** — pay on
    renewals to reward retention, not just new logos.
- **Levers:** accelerators above quota (reward overperformance), **clawbacks** for early
  churn/cancellation (align to retention, critical in insurance/freight), SPIFFs for a specific push.
- **Principle:** pay for the behavior you want. If retention matters, comp the renewal. If margin
  matters, comp the margin, not the revenue. Keep it simple enough that a rep can compute their own check.

## 3 — Activity metrics & funnel benchmarks

Manage **leading** indicators (activity you control today) to move **lagging** ones (revenue later).

- **Activity:** dials, connects, conversations, emails/sequences, meetings booked, meetings held.
- **Conversion (instrument your own; these are directional):** dial→connect, connect→conversation,
  conversation→meeting, meeting→opportunity, opportunity→close. Benchmarks vary widely by vertical
  and list quality — the point is to **measure your baseline and improve one stage at a time**, not
  to trust a borrowed number (same discipline as `evidence-base.md`).
- **Pipeline coverage:** keep roughly **3–4×** of quota in open pipeline (tune to your win rate).
- **Ramp time:** budget realistic ramp for new reps; track time-to-first-deal and time-to-full-productivity.

## 4 — Enablement & quality

- **Onboarding/ramp:** product/market training, the profiles, the scripts library, shadowing, and a
  30/60/90 plan.
- **Call scoring / QA:** review real calls against a rubric (opener, discovery, objection handling,
  next-step secured). Conversation-intelligence tools make this scalable.
- **Coaching cadence:** regular 1:1s on pipeline and skills; win/loss reviews to feed the objection
  library and profiles with real language.
- **Forecasting & pipeline management:** stage definitions with exit criteria, weekly pipeline
  review, and an honest forecast (helped by the qualification rubric in `closing.md`).

## 5 — Tech stack map (lean brokerage starter → scale)

Pick the minimum that runs the funnel; avoid tool sprawl.

| Function | Lean starter | Scale options | Vertical note |
|---|---|---|---|
| **CRM / pipeline** | HubSpot / Pipedrive | Salesforce | RE: Follow Up Boss, kvCORE · Insurance: AMS (Applied Epic, EZLynx, AMS360) · Freight: TMS + CRM |
| **Dialer** | built-in / PhoneBurner | Orum, Aircall (power/parallel) | high-volume cold = power dialer |
| **Email sequencer** | Apollo / Instantly | Outreach, Salesloft | separate authenticated domains (see cold-outreach.md) |
| **Enrichment / data** | Apollo | ZoomInfo, Clearbit | vertical registries/lists too |
| **SMS** | 10DLC-registered platform | — | consent + registration required (compliance.md) |
| **Conversation intelligence** | — | Gong, Chorus | for call QA/coaching at scale |
| **E-sign / docs** | DocuSign | vertical TMS/transaction/AMS | — |

AI runs the machinery (enrichment, drafting, reminders, dedup), humans own the relationship work —
the split in `ai-governance.md`. Whatever the stack, the **CRM measurement + follow-up fields** are
non-negotiable, or the economics and cadence can't be trusted.
