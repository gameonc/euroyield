# Outreach Compliance (Read Before Any Cold Channel)

> **This is an operational checklist, not legal advice.** Marketing/telecom law is
> jurisdiction-specific, fact-specific, and changes often (rules and thresholds shift year to
> year and by state/country). Before running cold outreach at any scale — especially for a
> licensed business like a brokerage — **have qualified counsel review your program.** Getting
> this wrong risks statutory penalties (per-message/per-call), lawsuits and class actions, and
> dead sending domains/phone numbers. Treat compliance as a gate on the cold-outreach engine,
> not paperwork to do later.

## Why this sits inside the acquisition system

Cold outreach is the most regulated part of the funnel. A single non-compliant SMS blast or an
un-scrubbed call list can cost more than a quarter of acquisition spend earns. Build the controls
in from day one and log consent/suppression like any other auditable CRM field.

## Phone calls — TCPA + Do-Not-Call

- **National DNC Registry:** scrub telemarketing call lists against the federal Do-Not-Call
  registry, plus applicable **state DNC** lists. Maintain and honor an **internal DNC/suppression
  list** immediately on request.
- **TCPA:** strict rules govern autodialed and prerecorded/artificial-voice calls and texts to
  mobiles; marketing via those methods generally requires **prior express written consent**.
  Manually dialing non-DNC numbers is lower-risk, but consent rules are strict and **evolving** —
  confirm current requirements with counsel.
- **Reassigned numbers & wrong-party contact:** check the reassigned-numbers database where
  relevant; stop on wrong-party or opt-out.
- **Calling hours & identification:** respect permitted calling windows (commonly ~8am–9pm local)
  and identify yourself/your company honestly.

## Email — CAN-SPAM (US) and stricter regimes abroad

- **CAN-SPAM (US):** no false/misleading headers or subject lines; identify the message as an ad
  where applicable; include a valid **physical postal address**; provide a clear **opt-out** and
  honor it promptly (within ~10 business days); don't email harvested addresses. Note: US B2B cold
  email without prior opt-in can be lawful **if** CAN-SPAM-compliant — but see below.
- **GDPR (EU/UK) and CASL (Canada) are much stricter** — they generally require a lawful basis /
  consent for outreach and carry heavy penalties. If you contact EU/UK/Canada recipients, do not
  assume US rules apply.
- **Deliverability ≠ legality, but both matter:** authentication (SPF/DKIM/DMARC), low volume, and
  clean lists keep you out of spam folders; the law keeps you out of court. Do both.

## SMS / texting — the highest-risk cold channel

- US business texting generally requires **prior express consent** and carrier **10DLC / A2P
  registration** (via The Campaign Registry) to send at scale; cold texting mobiles without
  consent is high-risk under TCPA.
- Always include opt-out language ("Reply STOP to opt out") and honor STOP instantly and
  permanently. Treat SMS primarily as a **warm** channel (after consent) unless counsel clears
  cold use.

## Data privacy

- **CCPA/CPRA (California) and similar US state laws, plus GDPR:** honor data-subject rights
  (access, deletion, opt-out of sale/sharing), disclose data use, and keep a lawful basis for
  processing contact data. Track consent and source per contact in the CRM.

## Licensed-business overlay (brokerages especially)

A brokerage carries a **second layer** of regulation on top of outreach law — which one depends
on the brokerage type. Identify yours and get its rules right before prospecting:
- **Real estate:** state real-estate licensing, agency disclosures, RESPA (referral-fee rules).
- **Mortgage:** NMLS licensing, SAFE Act, TILA/RESPA advertising rules.
- **Insurance:** state producer licensing, advertising/replacement rules.
- **Securities/investment:** SEC/FINRA registration, Reg BI, advertising/cold-contact rules,
  recordkeeping.
- **Freight/logistics brokerage:** FMCSA broker authority (MC number), surety bond (BMC-84),
  contracts.

Referral incentives, testimonials, disclosures, and recordkeeping are frequently regulated in
these fields — so the referral program (`relational-acquisition.md`) and the scripts library must
be reviewed against the specific regime, not just adopted as-is.

## Minimum controls to build in

- Consent + source captured per contact; **suppression/DNC list honored across all channels**.
- Separate, authenticated sending domains; registered SMS campaigns.
- Opt-out in every message, honored immediately and permanently.
- An auditable log of consent, opt-outs, and outreach — same discipline as the measurement spine.
- **Counsel sign-off** on the program before scaling, and a periodic re-review as laws change.
