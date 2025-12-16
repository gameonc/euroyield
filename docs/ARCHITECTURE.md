# Architecture — EuroYield

## Core design
- Next.js app (App Router) serves UI + internal API routes
- Supabase Postgres is the system of record
- n8n runs scheduled ingestion and messaging automations
- Adapters normalize yield data into a canonical schema

## Implementation Status

### ✅ Supabase Integration (Completed)
**Project ID:** `smqnorcmotcfrjydyahu`

**Files Created:**
- `src/lib/supabase/client.ts` - Browser-side Supabase client with Database types
- `src/lib/supabase/server.ts` - Server Component client (async cookies)
- `src/lib/supabase/middleware.ts` - Session refresh helper for auth
- `middleware.ts` - Next.js middleware for auth session management
- `src/types/database.ts` - Full TypeScript Database type for type-safe queries
- `.env.local` - Environment variables (URL, anon key, service role key)

**Database Schema (Applied):**
- `users` - User profiles with subscription tiers
- `protocols` - DeFi protocols (Aave, Curve, Morpho, etc.)
- `pools` - Yield pools with risk_tags (JSONB) and freshness_tier
- `yield_history` - Time-series APY/TVL data
- `alerts` - User alert configurations
- `ingestion_logs` - Job monitoring
- `latest_yields` (VIEW) - Denormalized view joining all tables

**Row Level Security:**
- Users/Alerts: Private to authenticated user
- Protocols/Pools/Yields: Public read access

**Seed Data:**
- 5 protocols (Aave, Curve, Morpho on Ethereum/Arbitrum/Polygon)
- 5 pools with sample yields (EURC, EURS, agEUR)
- APY range: 3.92% - 7.45%

## Data flow
Sources (DeFiLlama / protocol APIs / on-chain reads)
   ↓ (Adapter pattern)
NormalizedYield[]
   ↓
Supabase (yields table, pools table)
   ↓
Next.js API (cached responses)
   ↓
ISR pages + client UI

## Adapter pattern
Each adapter implements:
- listPools(): Pool[]
- fetchYields(pools): NormalizedYield[]
- healthCheck(): status

## Caching strategy
- Never fetch external sources from client
- Server routes cache in DB + short-lived memory cache
- ISR pages revalidate based on freshness tier

## Jobs
- ingest_hot (10–15m): featured pools
- ingest_warm (30–60m): common pools
- ingest_cold (2–4h): long tail
- send_weekly_report (weekly)

## Observability
- Job logs table in Supabase
- Alerts on job failure (Telegram)
- PostHog events for product analytics
