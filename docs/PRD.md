# PRD — EuroYield (Euro Stablecoin Yield Dashboard)
Owner: Lac  
Status: Approved for build  
Version: 1.1

## 1) Vision
Build a non-custodial analytics product that makes it effortless to:
- discover EUR stablecoin yield opportunities
- compare them across protocols/chains
- monitor changes via alerts + weekly reports
…without confusing users or overpromising on safety.

## 2) Problem
Users seeking EUR stablecoin yield face:
- fragmented data (multiple dashboards, spreadsheets)
- unclear safety context
- limited personalization
- poor “decision UX” (APY alone is misleading)

## 3) Goals
MVP goals:
- Fast dashboard that loads instantly (cached + ISR)
- Trustable “risk factors” (tags) instead of opaque scoring
- Alerts + weekly report as retention engine
- Subscription ready (MRR from day 1)

Non-goals (MVP):
- custody / yield execution
- swaps/bridges
- numeric risk scoring
- full tax engine

## 4) Personas / ICP
P1: Euro DeFi user (wallet + yield optimization)
P2: Hybrid CeFi/DeFi user (comparison + clarity)
P3: DAO/treasury operator (reporting + defensible risk tags)
P4: EU fintech developer (needs clean data + exports)

## 5) MVP Feature Set
### 5.1 Yield Explorer (Must)
- Table: Protocol, Asset, Chain, APY/APR (label clearly), TVL, Risk Tags, “View Details”
- Filters: stablecoin, chain, protocol, risk tags
- Sorting: APY, TVL, “stability” (based on volatility bucket, not a score)

Acceptance:
- First load < 2 seconds on broadband
- No client-side external API calls for yields
- Data shown includes timestamp + source

### 5.2 Best Yield Today (Must)
- Highlights top 3–5 opportunities within selected constraints (e.g., “Audited + TVL > $10M”)

Acceptance:
- Always uses “hot path” data cache

### 5.3 Yield Calculator (Must)
- Slider/input: deposit € amount → shows estimated monthly/yearly earnings using current APY
- Clear disclaimer: “APY changes; estimate only.”

### 5.4 Wallet Read (Should in MVP / Must by V1)
- Connect wallet (read-only)
- Show: balances of supported EUR stablecoins + deployed positions (if detectable)
- Show: “opportunity delta” (best available yield vs current)

Acceptance:
- Never requests token approvals
- Works with WalletConnect

### 5.5 Risk Model (MVP = Tags) (Must)
Risk Tags (examples):
- ✅ Audited / ⚠️ Unaudited
- ✅ High TVL / ⚠️ Low TVL
- ✅ Established / 🕒 New Protocol
- ✅ Peg-focused stablecoin / ⚠️ Experimental wrapper (if applicable)

Acceptance:
- No single “risk number”
- Each tag has tooltip definition

### 5.6 Alerts (Should)
- User sets threshold alerts:
  - APY above/below X
  - TVL drops > Y%
  - Protocol changes risk tag state
- Channels: Email (must), Telegram (should)

Acceptance:
- Alert delivered within 5 minutes of ingestion update
- User can pause/delete alert

### 5.7 Weekly Report (MVP = HTML) (Must)
- Weekly **HTML email** summary:
  - Top yields
  - Changes since last week
  - User watchlist (Pro)
  - “Your wallet snapshot” (if connected)

Acceptance:
- Designed mobile-first
- Sent via scheduled automation
- PDF is NOT default in MVP

### 5.8 Subscriptions (Must)
Plans:
- Free: explorer + calculator (limited filters)
- Pro (€19/mo): alerts + watchlists + weekly report customization
- Analyst (€49/mo): wallet insights + deeper history + exports
- Institutional (custom): on-demand PDF export + SLA

Acceptance:
- Stripe checkout
- Upgrade/downgrade works
- No paywall regressions on core explorer

## 6) Data Freshness & Costs (Critical)
We do tiered ingestion:
- Hot path: featured/high TVL pools every 10–15 minutes
- Warm path: every 30–60 minutes
- Cold path: every 2–4 hours

Acceptance:
- System never exceeds provider rate limits
- Ingestion jobs are idempotent

## 7) Success Metrics
- Activation: user runs calculator + saves first watchlist item
- Retention: 25% weekly active by week 8
- Conversion: 2–5% free→paid within 60 days
- Performance: P95 page load < 2.5s
- Reliability: ingestion success > 99% daily

## 8) Risks & Mitigations
- Data source instability → adapter pattern + fallbacks
- Liability risk (“risk score”) → tags + disclaimers
- Scaling reports → HTML emails; PDFs on demand only
- User confusion → tooltips + “what is APY?” microcopy
