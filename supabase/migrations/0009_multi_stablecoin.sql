-- Pivot: euro-only → multi-stablecoin (USD + EUR).
--
-- 1. Relax the euro-only stablecoin CHECK so USD stablecoins (USDC/USDT/DAI/…)
--    can be stored. This ALSO fixes a pre-existing bug: ingestion wrote raw
--    DeFiLlama symbols (e.g. "EURC-USDC") that failed the old CHECK and were
--    silently dropped.
-- 2. Add a `currency` dimension (USD/EUR) so agents can filter by denomination.
-- 3. Surface `currency` in the latest_yields view.

-- 1. Drop the euro-only constraint on pools.stablecoin (keep the column free-text).
ALTER TABLE pools DROP CONSTRAINT IF EXISTS pools_stablecoin_check;

-- 2. Add currency (default EUR so existing euro rows stay correct), constrained.
ALTER TABLE pools ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'EUR'
    CHECK (currency IN ('USD', 'EUR'));

-- Existing rows are all euro; new USD rows are written with currency='USD'.
UPDATE pools SET currency = 'EUR' WHERE currency IS NULL;

-- 3. Recreate latest_yields to include p.currency (mirrors 0006 + currency).
DROP VIEW IF EXISTS latest_yields;

CREATE OR REPLACE VIEW latest_yields AS
WITH RankedYields AS (
    SELECT
        yh.*,
        ROW_NUMBER() OVER (PARTITION BY pool_id ORDER BY timestamp DESC) as rn,
        LEAD(apy) OVER (PARTITION BY pool_id ORDER BY timestamp DESC) as previous_apy
    FROM yield_history yh
)
SELECT
    ry.id,
    ry.pool_id,
    ry.apy,
    ry.tvl,
    ry.timestamp,
    ry.source,
    (ry.apy - ry.previous_apy) as apy_delta,
    p.pool_name,
    p.stablecoin,
    p.currency,
    p.chain,
    p.risk_tags,
    pr.name AS protocol_name,
    pr.slug AS protocol_slug,
    pr.is_audited,
    pr.website AS protocol_url
FROM RankedYields ry
JOIN pools p ON ry.pool_id = p.id
JOIN protocols pr ON p.protocol_id = pr.id
WHERE ry.rn = 1 AND p.is_active = TRUE;
