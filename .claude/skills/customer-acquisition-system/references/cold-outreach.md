# Cold Outreach & Prospecting Engine (Top of Funnel)

Cold outreach is how you **generate** leads from people who never raised their hand — the
opposite of the follow-up engine, which works leads that already exist. It is the front of the
funnel for outbound-heavy businesses (brokerage, agencies, B2B services, recruiting). Get this
wrong and the rest of the system has nothing to process.

**Read `compliance.md` before you send or dial anything.** Cold outreach is the most legally
regulated part of the funnel (TCPA, DNC, CAN-SPAM, SMS 10DLC, GDPR/CASL). Non-compliance is not
a growth problem, it is a lawsuit and a dead sending domain.

## The cold-outreach equation

Results = **Targeting × Offer × Volume × Persistence.** In that order of leverage. Volume can't
save a bad list or a weak offer — it just burns more people and more domains. Fix targeting and
offer first; only then scale volume, and always apply the follow-up engine's persistence logic.

## Step 1 — ICP & list building (targeting)

Everything starts with *who*. A precise Ideal Customer Profile beats a big list every time.

- **Define the ICP tightly:** industry/vertical, size (revenue/headcount/fleet/AUM), role of the
  decision-maker, geography, and the **trigger** that makes now the right time (a new hire, a
  regulation, a funding round, a lapse/renewal date, a pain event).
- **Build the list** from real sources: data providers (ZoomInfo/Apollo/Clearbit-type),
  association/membership directories, licensing/public registries, LinkedIn Sales Navigator,
  event attendee lists, and referrals. For each contact you need name, role, company, and a
  reachable channel (verified email and/or phone).
- **Enrich and verify:** validate emails (bounce checks) and phone types (mobile vs landline —
  matters for TCPA). Bad data destroys deliverability and wastes rep time.
- **Prioritize by intent/fit:** rank the list so reps hit best-fit + trigger-active contacts
  first. A tiered list (A/B/C) makes volume decisions rational.
- **Hygiene:** scrub against your suppression/DNC lists and dedupe against the CRM **before**
  loading. Tag every contact with `lead_source` and `source_detail` so channel economics work.

## Step 2 — The offer & hook (message-market fit)

Cold outreach fails on weak offers far more than weak copy. Before writing a word:

- **Lead with their problem, not your product** (this is A-I-M — see `relational-acquisition.md`):
  name the anxiety/risk that's true for this segment right now.
- **Be specific and concrete:** a specific, believable outcome ("cut your empty miles ~12%")
  beats a vague benefit ("we optimize logistics").
- **Lower risk:** a low-commitment first ask (15-min call, a free teardown/quote, a benchmark)
  converts better than "buy." Risk-reversal and proof (names, numbers, cases) raise trust.
- **One idea, one call to action.** Cold messages that ask for two things get zero.
- **Cold start (no proof yet)?** If you're brand new with no cases/reviews/referrals, lead with a
  stronger risk-reversal/guarantee, manufacture proof with a few free or discounted jobs, borrow
  trust (credentials, partners), and stay hyper-targeted and manual before buying scale. See the
  cold-start edge case in `troubleshooting.md` — don't pour spend behind an unproven offer.

## Step 3 — Cold email (infrastructure first, then copy)

**Deliverability infrastructure is not optional** — this is what separates inbox from spam:
- Send cold from **separate domains** (not your primary/root domain), each with authentication:
  **SPF, DKIM, DMARC** all set and aligned.
- **Warm up** new domains/mailboxes for weeks before volume; keep **per-mailbox daily volume
  low** (a few dozen) and spread across multiple mailboxes rather than blasting from one.
- Prefer **plain-text-style** emails (few/no links or images), personalize the first line, and
  monitor bounce and spam-complaint rates — a spike means stop and fix, not push harder.

**Copy framework (short — cold email lives or dies on brevity):**
1. **Subject:** 2–4 words, curiosity or relevance, never salesy ("quick question", "[Company] + empty miles").
2. **Opener:** one line proving it's not a blast — a specific observation about *them*.
3. **Body:** the problem + one specific outcome, 2–3 sentences max.
4. **CTA:** one soft ask ("worth a quick look?" / "open to a 15-min call Thursday?").

Sequence: ~3–5 emails over ~2–3 weeks, each a **new angle** (proof, different pain, short
"should I close your file?" breakup), never "just bumping this up."

## Step 4 — Cold calling (the highest-intent cold channel)

The phone still converts cold better than any channel for high-ticket/relationship sales — it's
just hard, so most avoid it. Structure the call:
1. **Opener / pattern interrupt:** honest and disarming ("Hey [name], this is a cold call — can
   I have 30 seconds and then you can hang up on me?"). Permission lowers defenses.
2. **Reason for the call:** one sentence, their-problem-framed.
3. **Handle the reflex brush-off** ("not interested", "send me an email", "we're all set") with
   a calm one-liner that re-opens curiosity (see `assets/scripts-library.md`).
4. **One goal: book the next step**, not close on the call. A booked, confirmed meeting is the win.

Persistence: connect rates on cold dials are low, so **volume and speed of dials** matter, and
the ~6-attempt persistence finding from the follow-up engine applies. Best contact windows tend
to be early morning and late afternoon; test your own data.

## Step 5 — Cold SMS / DM / social

- **SMS is powerful but the most regulated** — in the US it generally requires prior express
  consent and **10DLC registration**; cold texting to mobiles without consent is high-risk. Treat
  SMS mainly as a *warm* follow-up channel unless counsel clears cold use. See `compliance.md`.
- **Social selling (LinkedIn/DM):** connect with a relevant, non-pitchy note; add value in a
  message or two before any ask. Lower volume, higher trust, weaker regulation than email/phone.

## Step 6 — Orchestrate the multi-channel cold sequence

Don't run channels in silos. Combine them into one timed sequence over ~2–4 weeks — e.g. Day 0
email + connect request, Day 1 call, Day 3 email #2, Day 5 call + voicemail, Day 8 email #3,
Day 12 call, Day 16 breakup email. This is the follow-up engine's persistence + channel-rotation
logic applied to cold. Interleaving lifts contact rates (see `follow-up.md` evidence base).
Then hand anyone who responds into the warm follow-up tracks and the closing toolkit (`closing.md`).

## Metrics for cold (instrument these separately from inbound)

- **Deliverability health:** bounce rate, spam-complaint rate, domain reputation (email).
- **Connect/contact rate:** % of dials/sends reaching a live person or getting a reply.
- **Positive-reply rate:** % of contacts showing interest.
- **Meetings booked** and **meetings held (show rate).**
- **Cost per meeting** and **cost per opportunity** — the true cold-channel CAC inputs.
- **List-to-meeting conversion** — tells you whether targeting or offer is the bottleneck.

## Iterate like an experiment, not a vibe

Change **one variable at a time** (list, subject, opener, offer, CTA, call opener) and read it
against these metrics. If reply rates are low, the offer/targeting is usually wrong, not the
volume. Log what you kill and why — the same evidence discipline as the rest of the system.
