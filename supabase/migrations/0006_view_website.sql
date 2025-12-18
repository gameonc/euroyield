-- Drop the existing view
DROP VIEW IF EXISTS latest_yields;

-- Recreate view with protocol_url (website) included
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
    -- Delta calculation
    (ry.apy - ry.previous_apy) as apy_delta,
    p.pool_name,
    p.stablecoin,
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
