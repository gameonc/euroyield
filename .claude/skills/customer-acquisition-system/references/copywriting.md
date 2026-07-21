# The Copywriting Engine — Offers, Ads, Landing Pages & Creative

This is where the system **writes the money copy**: ads, landing pages, opt-in forms, lead magnets,
email/SMS, VSL/video scripts, and creative briefs. Claude *is* the copywriter here — this module is
how it writes copy that **converts**, grounded in the business's real offer, customer, and voice
(from its `profiles/` entry), not generic AI filler. Copy amplifies a strong offer; it cannot save a
weak one — so we start with the offer.

## 1. Start with the OFFER (the #1 lever, before a word of copy)

A great offer makes copy easy; a weak offer makes even great copy fail. Engineer the offer using the
**value equation** — buyers weigh:

> **(Dream outcome × Perceived likelihood of achieving it) ÷ (Time delay × Effort & sacrifice)**

Maximize the top (a vivid, believable result), minimize the bottom (faster, easier, less risk). Then
stack:
- **Risk-reversal / guarantee** — move the risk from them to you (the single biggest conversion lever
  after the core promise). Only promise what you can honor (see compliance below).
- **Bonuses** that handle objections ("but what about X?" → a bonus that solves X).
- **Honest urgency/scarcity** — real deadlines, real limits. Never fake it (illegal and trust-killing).
- **Clear, simple pricing / payment** framed against the value and the cost of *not* acting.

## 2. Know the target better than they know themselves (voice-of-customer)

Write in the customer's own words. Pull the raw language from discovery calls, reviews, DMs, and
support tickets — their exact pains, desires, and objections. Then match the message to **awareness
stage**:

| Awareness | They know… | Lead with… |
|---|---|---|
| Unaware | nothing yet | a story/hook, a callout to who they are |
| Problem-aware | they have the problem | agitate the problem, then hope |
| Solution-aware | solutions exist | why *this* approach wins |
| Product-aware | your product exists | proof, offer, differentiation |
| Most aware | ready to buy | the offer + a reason to act now |

Cold traffic is usually problem/solution-aware; retargeting and email are product/most-aware. Don't
pitch a most-aware message to cold traffic.

## 3. Frameworks (pick one per asset; don't overthink)

- **PAS — Problem · Agitate · Solve.** The workhorse for ads and emails.
- **AIDA — Attention · Interest · Desire · Action.** Longer form, landing pages.
- **Before → After → Bridge.** Paint their current pain, the better future, and your offer as the bridge.
- **Features → Benefits → Meaning.** Never sell the feature ("6 calls"), sell the meaning ("you stop
  losing deals to whoever calls back first").

**The hook/headline is ~80% of the job.** If the first line doesn't stop them, nothing else is read.
Good hooks are **specific, curiosity-provoking, or call out the exact person** ("[City] homeowners
with a rising insurance bill:"). Write 10 headlines, keep the 2 best, test them.

## 4. By asset (what "good" looks like)

- **Paid ads (social/search):** one big idea, hook in the first line/3 seconds, native/pattern-
  interrupt (not "salesy"), a single clear CTA. For video/UGC, write a **creative brief**: hook,
  talking points, proof, CTA, and the visual.
- **Landing page structure:** Headline (the promise) → subhead → hero + primary CTA → the problem →
  the offer/solution → **proof** (reviews, numbers, before/after) → benefits → objection-handling/FAQ
  → risk-reversal → CTA repeated. One page, one goal, CTA above the fold.
- **Opt-in forms / lead magnets:** a clear value exchange ("get X"), minimal friction. **Fewer form
  fields = more leads**; add fields only when you need the qualification (quality vs. volume tradeoff
  — see `lead-engine.md`).
- **Email / SMS:** subject line + preview text do the opening (curiosity/benefit/specificity), one
  idea, one CTA. This is the copy layer over the `scripts-library.md` sequences.
- **VSL / video script:** hook → relatable problem/story → the mechanism/solution → proof → offer →
  CTA (with urgency).
- **Sales/long-form pages:** the full AIDA arc with stacked proof and a strong close.

## 5. How to actually generate it with this skill

1. Feed the AI the **profile** (offer, ICP, voice, objections), any **proof** (real numbers, reviews),
   and the **awareness stage** of the traffic.
2. Pick the **asset + framework**; generate **3–5 variants** of the highest-leverage element (hook,
   headline, or offer) rather than one polished piece.
3. **Human owns brand voice + every claim** before it ships (`ai-governance.md`).
4. **Test one variable at a time** and read it against `lead-engine.md` metrics (CTR, opt-in rate,
   CPL, conversion). The headline and the offer are the biggest levers — test those first.

## 6. Compliance & honesty (this is where ad accounts die and lawsuits start)

- **No false or unsubstantiated claims** — you must be able to back up what you say (FTC). This is
  strict in health, finance, legal, income/earnings, and weight-loss claims.
- **Testimonials/endorsements must be genuine and disclosed** (FTC endorsement rules; influencers/UGC
  must disclose). No fabricated reviews.
- **No fake scarcity/urgency**, no bait-and-switch, honor every guarantee.
- **Follow each platform's ad policy** (Meta/Google reject/ban for prohibited claims and content).
- Industry overlays apply (e.g. real estate/insurance/auto advertising rules) — see the business's
  profile and `compliance.md`. **When in doubt, tone the claim down and verify.**

Great copy is just the truth about a great offer, told in the customer's language, clearly enough to
act on. Build the offer, steal the customer's words, hook hard, prove it, remove the risk, ask for
the sale — then test.
