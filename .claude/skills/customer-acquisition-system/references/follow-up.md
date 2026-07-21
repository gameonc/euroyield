# The Follow-Up Engine (Pipeline Persistence)

Most revenue is lost in the gap between "lead created" and "deal closed" — and that gap is
won or lost by follow-up. A CRM without a follow-up engine is a graveyard: leads go in, a
"next action" reminder gets set, and the trail goes cold. This is the muscle that converts the
pipeline the rest of the system fills. Treat it as a designed, instrumented system, not as
rep discretion or "staying in touch."

Two levers dominate everything else: **speed** (how fast the first touch happens) and
**persistence** (how many quality touches happen before the lead is abandoned). Both are
routinely under-invested because they feel like grunt work. They are the grunt work that pays.

> **Evidence note.** The two load-bearing principles below — speed and persistence — are the
> best-evidenced claims in the whole system. The folk statistics usually cited for follow-up
> ("80% of sales need 5 follow-ups," "44% of reps quit after one") are **not**; they are
> poorly-sourced and excluded here. See "Evidence base" at the end of this file for the real
> studies and their confidence levels.

## Principle 1 — Speed-to-lead

The probability of ever connecting with an inbound lead collapses as the first-response time
grows from minutes to hours — this is the strongest finding in the follow-up literature. The
MIT/InsideSales *Lead Response Management* study (≈15,000 leads, ≈100,000 call attempts, 6
companies, 3 years) found the odds of **contacting** a lead drop ~100× when the first call
comes at 30 minutes instead of 5, and the odds of **qualifying** drop ~21×. The HBR study
*The Short Life of Online Sales Leads* (2,241 U.S. companies) found firms responding within an
hour were ~7× more likely to qualify a lead than those an hour slower, and 60× more than those
waiting 24h+. The first business to respond, with something useful to say, wins a
disproportionate share. So:

- **Target first touch within ~5 minutes** for inbound/hot leads during working hours; define an
  explicit out-of-hours rule (auto-acknowledge + first human touch at open).
- Make **speed-to-first-contact** a monitored, owned metric (median minutes, not a vanity average).
- Route leads to an available owner immediately; an unrouted lead is an un-worked lead.

## Principle 2 — Persistence (the cadence)

Meaningful conversations routinely require **many** touches, and most reps stop far too early.
The credible anchor here is Velocify's *Ultimate Contact Strategy* (~3.5M leads): **~93% of
converted leads are reached by the 6th call attempt**, leads needing more than 7 calls are ~45%
less likely to convert, and the best observed cadence was roughly **6 calls interleaved with ~5
emails**. That is real data for "persist to about six attempts before giving up" — and it is a
far better basis than the widely-repeated but poorly-sourced "80% of sales need 5 follow-ups"
and "44% of reps quit after one" figures, which you should not cite as fact.

Still, don't hard-code someone else's number: instrument **touches-to-first-response** and
**touches-to-close** from your own data and let it tune the depth (see `evidence-base.md`). The
rule: **the cadence decides when to quit, not the rep's mood on a given afternoon.**

Rotate channels — call, text, email, voicemail, and where appropriate social/DM. Different
people answer on different channels, and rotation reads as persistence rather than nagging.
There is real (if vendor-sourced) support for interleaving: in the Velocify data, sending
emails between call attempts raised phone-contact rates ~16% and conversion ~53% with the right
timing. Treat the larger multi-channel/SMS lift figures floating around the web as directional
only — they are mostly vendor blog numbers.

### Default cadence tracks

Pick a track by lead state; each track is a fixed sequence with channel rotation. Tune to the
venture's sales cycle and compliance rules (e.g. texting/consent regulations).

**Speed-to-lead track — inbound hot, ~first 14 days:**

| When | Touch |
|---|---|
| Day 0, ≤5 min | Call #1; if no answer → voicemail + text |
| Day 0, +1–2 hr | Call #2 |
| Day 0, evening | Email #1 (A-I-M anchored: name the problem, not the product) |
| Day 1 | Call #3 + text |
| Day 3 | Call #4 + email #2 (new angle / proof) |
| Day 5 | Text #2 |
| Day 7 | Call #5 + email #3 |
| Day 10 | Call #6 |
| Day 14 | "Last attempt" email → if no response, move to Long-nurture track |

**Standard/outbound track:** same shape, stretched (touches over ~4–6 weeks) since there's no
inbound intent spike to capitalize on.

**Long-nurture track — "not now" / future timing:** one value touch every ~3–4 weeks
indefinitely — useful content, a relevant trigger event, a check-in tied to *their* timeline —
until they re-engage or opt out. "Not now" is a scheduling problem, not a lost deal.

**Reactivation track — dead / aged closed-lost:** a scheduled campaign (e.g. quarterly) with a
genuinely new reason to talk: new offer, price change, capacity opening, a trigger event on
their side. Your old closed-lost pile is the cheapest pipeline you own.

## Principle 3 — Value on every touch

Empty "just checking in / circling back" touches train prospects to ignore you. Every touch
should carry a reason to engage, anchored in **A-I-M** (see `relational-acquisition.md`):
surface the anxiety/risk, address an influence/objection, or reinforce the motivation/outcome.
If a touch has no value payload, it isn't a follow-up — it's noise, and it burns the channel.

## Principle 4 — No lead left behind

The follow-up engine's job is to guarantee nothing rots silently. Enforce with rules, not
goodwill:

- **Minimum-attempts gate:** a lead cannot be marked `closed-lost` for "no response" until the
  cadence's minimum attempts across ≥2 channels are logged. Instrument the
  *closed-lost-with-too-few-attempts* rate and drive it to ~zero.
- **Auto-recycle:** "not now," "bad timing," and "no budget yet" outcomes flow automatically into
  the Long-nurture track — never to the trash.
- **Rotting-pipeline alarm:** any open opportunity with no touch for longer than its stage
  threshold flags for the owner. Stalled deals are the default failure mode; make them loud.
- **Ownership continuity:** if an owner goes unavailable, leads reassign — an ownerless lead gets
  no follow-up.

## Principle 5 — Automate the reminder, keep the touch human

Ties to `ai-governance.md`. AI runs the **machinery** of follow-up; humans make the **relational
touches** on anything material:
- **AI-heavy:** trigger the cadence, sequence and schedule touches, draft follow-up messages,
  surface today's due actions, flag rotting/overdue leads, log outcomes, prep call context.
- **Human-owned:** the actual calls and personalized messages on real opportunities, objection
  handling, judgment on when to escalate vs. move to nurture, and anything trust-sensitive.

Never let an autoresponder impersonate a personal touch on a live deal — prospects can tell, and
it costs trust for a marginal efficiency gain.

## Instrument follow-up as its own discipline

Add these to the monthly economics review (see `measurement.md` cadence):

- **Speed-to-first-contact** — median minutes to first touch (hot leads).
- **Attempts per lead** — average logged touches before resolution (won/lost/nurture).
- **Contact/connect rate** — % of leads reaching a live conversation.
- **Touches-to-first-response** and **touches-to-close** — your real persistence curve; use it to
  set (not guess) cadence depth.
- **Follow-up SLA compliance** — % of `next_action_due_at` met on time.
- **Rotting-pipeline rate** — % of open opps past their stage no-touch threshold.
- **Nurture reactivation rate** — % of long-nurture/reactivation leads that re-enter active pipeline.
- **Closed-lost-with-too-few-attempts rate** — a leak gauge; target ~0.

## CRM fields the engine needs

These extend the Phase-1 schema in `measurement.md`:

| Field | Type | Notes |
|---|---|---|
| cadence_track | enum | speed-to-lead, standard, long-nurture, reactivation, none |
| cadence_step | integer | Current position in the sequence |
| attempt_count | integer | Total logged touches (computed from activity log) |
| last_contact_at | datetime | Timestamp of last outbound touch |
| last_contact_channel | enum | Call, text, email, voicemail, social, in-person |
| last_response_at | datetime | Last inbound response from the prospect |
| next_action_due_at | datetime | (already in base schema) next scheduled touch |
| no_contact_reason | enum | Unreachable, wrong number, not-now, no-budget, opted-out |
| reactivation_eligible_at | date | When a lost/dormant lead re-enters a reactivation campaign |
| do_not_contact | boolean | Hard suppression (opt-out / compliance) — always respected |

`attempt_count`, `last_contact_at`, and rotting-pipeline flags should be **computed** from the
activity log, not hand-maintained — the same discipline that keeps the economics auditable.

## Evidence base (what's proven vs. folklore)

Follow-up advice is drowning in circular, unsourced statistics. Here is where each principle
actually stands, so you can defend the strong parts and not repeat the weak ones.

| Claim | Verdict | Strongest source(s) | Confidence |
|---|---|---|---|
| Speed-to-lead: contact/qualify odds collapse from minutes → hours | **Well supported** | MIT/InsideSales *Lead Response Management* (≈15k leads, ≈100k calls, 6 firms, 3 yrs): ~100× contact / ~21× qualify at 5 vs 30 min. HBR *The Short Life of Online Sales Leads* (2011, 2,241 firms): ~7× qualify within 1 hr, 60× vs 24h+. Velocify (~3.5M leads): call within 1 min → +391% conversion | **High** (consistent across 3 large datasets; observational, not RCT; core data ~2011 but directionally replicated) |
| Persist to ~6 attempts; most reps quit too early | **Principle supported; common numbers are not** | Velocify *Ultimate Contact Strategy* (~3.5M leads): 93% of conversions reached by 6th call; >7 calls → 45% less likely. **NOT** "80% need 5 follow-ups" (Marketing Donut) or "44% quit after one" (Scripted) — undisclosed methodology | **Medium–high** for the principle; **Low** for the folk numbers |
| Multi-channel/interleaving beats single-channel | **Directionally supported** | Velocify: emails between calls → +16% contact, +53% conversion with right timing. Larger multi-channel/SMS lift figures are vendor blog numbers | **Medium** (principle) / **Low** (specific percentages) |
| Nurture "not now" leads; ~half of leads aren't ready to buy | **Plausible, weakly sourced** | Gleanster "50% qualified but not ready," Annuitas "nurtured leads +47% purchase size," Forrester "50% more sales-ready leads at 33% lower cost" — all old (~2010–2014), aggregator-sourced | **Low–medium** (consistent with referral/CLV logic; specific numbers unverified) |
| "Value on every touch" beats generic check-ins; SMS timing effects | **Heuristic, not data-backed** | No rigorous source found; strong practitioner consensus | **Low** — apply as best practice, label as such |

**Takeaway:** the two pillars this engine leans on hardest — *speed* and *persistence* — are the
best-evidenced. The weakest links are exactly the folk stats deliberately kept out. When in
doubt, instrument your own funnel and trust that over any borrowed number.
