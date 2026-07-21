# Evidence Base & Confidence Discipline

This system's credibility depends on not overstating it. Weight sources by inferential value
and carry a source's confidence with any figure you cite. Never launder a low-confidence survey
number or a folk statistic into a hard recommendation.

## Evidence hierarchy (reporting standard)

| Level | What belongs | Why it ranks here | Confidence default |
|---|---|---|---|
| Peer-reviewed academic research | Journal articles, formally peer-reviewed | Best method transparency + durable scrutiny | High |
| Working papers / controlled field experiments | RCTs, working papers, official academic briefs | Often most current & strongest on causal ID, not yet fully filtered | High–medium |
| Business-school cases / executive frameworks | HBS cases, HBR frameworks | Strong for managerial framing, weak for universal causal claims | Medium |
| Industry surveys / practitioner methods | Trade surveys, vendor frameworks, playbooks | Directional signal & applied workflow; limited by disclosure/incentives | Medium–low |

## Load-bearing findings and their confidence

- **Acquisition as customer capital** (working paper): sales-and-marketing intensity is
  associated with higher customer-related intangible value; large, persistent cross-industry
  differences, highest in platforms, online sales, high-tech manufacturing. → Foundation for
  treating acquisition as capital allocation. *High–medium.*
- **Personalized pricing** (peer-reviewed field experiment): unused market power +55% profit;
  personalization +19% over optimized uniform, +86% over baseline; >60% of consumers benefited
  though aggregate surplus fell. → Basis for the pricing ladder, with generalizability caveats.
  *High (internal validity); uncertain external validity.*
- **Referral economics** (peer-reviewed, ~10k customers, ~3 years): referred customers had higher
  margins, higher retention, ≥16% greater value. → Basis for retention-weighted referral design.
  *High.*
- **CAC measurement boundary** (business-school case): formalizes the attribution/boundary problem.
  → Basis for rejecting blended CAC as the operating center. *Medium.*
- **Gen-AI deployment** (executive framework): assign tasks by error cost × knowledge type.
  → Basis for the AI/human split. *Medium–high.*
- **AI governance** (official framework): roles, inventory, oversight, monitoring, privacy/security,
  provenance, red-teaming. → Basis for CRM-hygiene controls. *High.*
- **Adoption needs support, not just tech** (working paper / field experiment): a technology offer
  alone was insufficient; customer-success-style support improved adoption. → Basis for the
  capacity-first operating rule. *Medium–high.*
- **Channel-share survey** (industry survey): in-person 37.7%, outbound 35.5%, website 30.7%,
  social 25.9%, referrals/partners 25.8%, marketplaces 5.6% reporting 20%+ growth. → Directional
  market context ONLY; methodology undisclosed. *Low.*
- **Speed-to-lead** (MIT/InsideSales *Lead Response Management*; HBR *The Short Life of Online
  Sales Leads*, 2011): contact/qualify odds collapse from minutes to hours (~100× contact / ~21×
  qualify at 5 vs 30 min; ~7× qualify within 1 hr). → Basis for the speed-to-lead principle in
  the follow-up engine. *High (observational, not RCT; core data ~2011, directionally replicated).*
- **Follow-up persistence** (Velocify *Ultimate Contact Strategy*, ~3.5M leads): ~93% of
  conversions reached by the 6th call; interleaving emails lifts contact ~16% / conversion ~53%.
  → Basis for the ~6-attempt cadence and channel interleaving. *Medium–high for the principle.*
  See `follow-up.md` for the full evidence table.
- **Retention/lifecycle economics** (established practice; NRR/GRR as standard metrics): retention
  and expansion compound revenue without new-logo cost, and multi-line/multi-product customers
  retain better than single-product ones. → Basis for the Keep & Grow module. *Medium — the
  direction and metrics are well-established; the famous multipliers (below) are not.*
- **Attribution is inherently imperfect** (methodological caveat, not a stat): last-touch models
  over-credit the final click, multi-touch models embed assumptions, and offline/word-of-mouth
  influence is invisible. The Lead Engine (`lead-engine.md`) uses attribution to *inform* the
  scale/reduce decision, never to claim false precision — read it alongside the attribution-
  uncertainty marginal-CAC risk in `measurement.md`. *Treat all attribution outputs as directional.*

## Do NOT present these as fact (unverified folk statistics)

Mark **unverified** and keep out of core recommendations unless tied to a documented primary source:
- "Acquisition is always 5–25× more expensive than retention."
- "Poor data quality causes a 15–25% revenue loss."
- "68% of consumers feel exploited by dynamic pricing."
- Generic sales-turnover percentages presented with no study design.
- "80% of sales require 5 follow-ups" (Marketing Donut) and "44% of reps give up after one
  follow-up" (Scripted) — undisclosed methodology, circular citation. Use Velocify's 6-call
  finding instead (see `follow-up.md`).
- Multi-channel "429% higher conversion" / "3× response" style figures — vendor blog numbers.
- Lead-nurture stats ("50% not ready to buy," "+47% purchase size," "50% more leads at 33% lower
  cost") — directional only; old and aggregator-sourced, not primary research.
- "A 5% increase in retention raises profits 25–95%" (Reichheld/Bain, *The Loyalty Effect*) — a
  model-dependent range, not a measured constant. Retention matters, but don't cite the number.
- "60–70% chance of selling to an existing customer vs. 5–20% to a new prospect" (*Marketing
  Metrics* textbook) — illustrative, not a controlled study. Use as a directional point only.

## The one-line executive position

Customer acquisition is a **capital-allocation** function; pricing is a **value-capture**
function; revenue operations is the **control system** that determines whether customer capital
compounds or evaporates.
