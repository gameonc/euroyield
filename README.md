# EuroYield — Euro Stablecoin Yield Intelligence (Non-Custodial)

EuroYield is a non-custodial analytics + alerting product that helps users discover, compare, and monitor **EUR-denominated stablecoin yield** across DeFi protocols (and later CeFi), with simple, defensible risk tags (e.g., Audited / High TVL / New Protocol).

## ✨ Features

- **Institutional-Grade UI**: Bespoke "Financial Terminal" design system with deep navy palette and monospace data fonts.
- **Real-Time Data**: Live yield tracking for Euro stablecoins (EURC, EURS, agEUR, etc.).
- **Security First**: Non-custodial, read-only analytics. No token approvals required.
- **Risk Intelligence**: Clear risk tags (Audited, TVL, Maturity) instead of opaque scores.
- **Supabase Backend**: Robust database schema with Row Level Security (RLS).
- **Pro Alerts**: Email and Telegram notifications for yield changes.

## Why this exists
Euro stablecoin holders currently have to manually check multiple dashboards and spreadsheets to compare APY, TVL, protocol maturity, and basic safety signals. Existing tools are either:
- broad “everything dashboards” (hard to trust / noisy), or
- issuer/platform-specific (shows only their own yield).

EuroYield is focused: **EUR stablecoins + clean UX + actionability**.

## Product principles
- Non-custodial (read-only wallet insights; no funds held)
- Fast, cached UX (no client-side “hit 10 APIs on load”)
- Data freshness tiers (Hot/Warm/Cold updates)
- Risk tags over “magic” numeric scores (MVP)
- “Show the math” (tooltips + sources)

## Target ICP
1) Euro crypto natives + DeFi users
2) DAO / treasury operators with EUR exposure
3) EU fintech builders integrating EUR stablecoins
4) “Global” stablecoin users who want EUR diversification

## Differentiators
- Euro-first yield discovery (EURS, EURC, etc.)
- “Clean” dashboards (less degen noise)
- Risk tags designed for trust + defensibility
- Alerts + reports as the retention engine

## MVP scope (Phase 1)
- Yield Explorer (APY + TVL + chain + protocol + risk tags)
- “Best Yield Today” module
- Yield calculator (“€10k earns €X/mo”)
- Alerts (email + Telegram)
- Weekly **HTML** report (React Email)
- Auth + subscriptions (Stripe)
- Admin: sources health + ingestion status

## What’s explicitly out of scope (MVP)
- Custody, swaps, bridging, or auto-deploying funds
- “Guaranteed yield” claims
- Numeric “risk scores” (we use risk tags)

---

# Architecture (high-level)

## Stack
- Next.js (App Router) + TypeScript
- Shadcn/UI + Tailwind
- Supabase (Postgres + Auth)
- n8n for schedulers + automations
- Adapter pattern for data sources (AaveAdapter, CurveAdapter, etc.)
- ISR + server cache; never fetch DeFi APIs directly from the client

## Data freshness strategy
- Hot path (featured/high TVL pools): every 10–15 min
- Warm path: every 30–60 min
- Cold path (long tail): every 2–4 hours

---

# Local dev (placeholder)
> Detailed setup lives in /docs/RUNBOOK.md

---

# Repo standards
- All product requirements live in /docs/PRD.md (source of truth)
- All architecture decisions documented in /docs/ARCHITECTURE.md
- All adapters follow /docs/SOURCES_AND_ADAPTERS.md
- Risk tags follow /docs/RISK_TAGS.md
- Reports + alerts follow /docs/REPORTS.md
- AI development workflow rules follow /docs/AI_DEV_GUIDE.md

---

# Definition of Done (DoD)
A feature is “done” only when:
- PRD acceptance criteria met
- Unit tests for core logic + adapter parsing
- E2E smoke test for main user flow (guest → signup → dashboard → alert)
- Telemetry event added (PostHog)
- Error handling + rate-limit safe caching
- Docs updated (PRD/Architecture/Runbook)

---

# License
TBD
