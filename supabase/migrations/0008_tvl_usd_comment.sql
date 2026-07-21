-- Correct the units documentation for yield_history.tvl.
--
-- The value is sourced from DeFiLlama's `tvlUsd` field and is therefore
-- denominated in USD, not EUR. The original 0001_init.sql comment ("TVL in EUR")
-- was inaccurate; the stored numbers were never converted to euros. The UI and
-- the MCP `tvl_usd` field now label this as USD to match reality.
--
-- This migration only updates the column comment (metadata) — no data changes.

COMMENT ON COLUMN yield_history.tvl IS 'TVL in USD (source: DeFiLlama tvlUsd). Not converted to EUR.';
