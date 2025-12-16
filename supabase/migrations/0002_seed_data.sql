-- Rendite Seed Data
-- Populate initial protocols and pools for development

-- ============================================
-- PROTOCOLS
-- ============================================
INSERT INTO protocols (id, name, slug, chain, is_audited, launched_at, website) VALUES
    ('11111111-1111-1111-1111-111111111111', 'Aave V3', 'aave', 'ethereum', true, '2022-03-16', 'https://aave.com'),
    ('22222222-2222-2222-2222-222222222222', 'Curve Finance', 'curve', 'ethereum', true, '2020-01-20', 'https://curve.fi'),
    ('33333333-3333-3333-3333-333333333333', 'Morpho Blue', 'morpho', 'ethereum', true, '2023-10-01', 'https://morpho.org'),
    ('44444444-4444-4444-4444-444444444444', 'Aave V3', 'aave-arbitrum', 'arbitrum', true, '2022-03-16', 'https://aave.com'),
    ('55555555-5555-5555-5555-555555555555', 'Curve Finance', 'curve-polygon', 'polygon', true, '2020-01-20', 'https://curve.fi')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- POOLS
-- ============================================
INSERT INTO pools (id, protocol_id, stablecoin, pool_name, chain, risk_tags, freshness_tier) VALUES
    -- Aave Ethereum
    ('aaaa1111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'EURC', 'EURC Supply', 'ethereum', 
     '[{"type": "audited", "label": "Audited", "description": "Multiple security audits completed", "isPositive": true}, {"type": "high_tvl", "label": "High TVL", "description": "TVL exceeds €10M", "isPositive": true}, {"type": "established", "label": "Established", "description": "Protocol over 1 year old", "isPositive": true}]'::jsonb, 
     'hot'),
    
    -- Curve Ethereum
    ('bbbb1111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'EURS', 'EURS/3CRV', 'ethereum',
     '[{"type": "audited", "label": "Audited", "description": "Audited by ChainSecurity", "isPositive": true}, {"type": "high_tvl", "label": "High TVL", "description": "TVL exceeds €10M", "isPositive": true}]'::jsonb,
     'hot'),
    
    -- Morpho Ethereum
    ('cccc1111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'EURC', 'EURC/WETH Vault', 'ethereum',
     '[{"type": "audited", "label": "Audited", "description": "Protocol has been audited", "isPositive": true}, {"type": "new_protocol", "label": "New", "description": "Protocol launched within 6 months", "isPositive": false}]'::jsonb,
     'warm'),
    
    -- Aave Arbitrum
    ('dddd1111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', 'EURC', 'EURC Supply', 'arbitrum',
     '[{"type": "audited", "label": "Audited", "description": "Multiple security audits completed", "isPositive": true}, {"type": "high_tvl", "label": "High TVL", "description": "TVL exceeds €10M", "isPositive": true}]'::jsonb,
     'hot'),
    
    -- Curve Polygon
    ('eeee1111-1111-1111-1111-111111111111', '55555555-5555-5555-5555-555555555555', 'agEUR', 'agEUR/USDC', 'polygon',
     '[{"type": "audited", "label": "Audited", "description": "Audited by ChainSecurity", "isPositive": true}, {"type": "low_tvl", "label": "Low TVL", "description": "TVL below €5M", "isPositive": false}]'::jsonb,
     'cold')
ON CONFLICT DO NOTHING;

-- ============================================
-- SAMPLE YIELD HISTORY (Last 7 days)
-- ============================================
INSERT INTO yield_history (pool_id, apy, tvl, timestamp, source) VALUES
    -- Aave EURC Ethereum
    ('aaaa1111-1111-1111-1111-111111111111', 5.24, 45000000, NOW() - INTERVAL '1 hour', 'Aave Subgraph'),
    ('aaaa1111-1111-1111-1111-111111111111', 5.15, 44800000, NOW() - INTERVAL '1 day', 'Aave Subgraph'),
    ('aaaa1111-1111-1111-1111-111111111111', 5.08, 44200000, NOW() - INTERVAL '2 days', 'Aave Subgraph'),
    
    -- Curve EURS
    ('bbbb1111-1111-1111-1111-111111111111', 4.87, 28000000, NOW() - INTERVAL '1 hour', 'DeFiLlama'),
    ('bbbb1111-1111-1111-1111-111111111111', 4.92, 27500000, NOW() - INTERVAL '1 day', 'DeFiLlama'),
    
    -- Morpho EURC
    ('cccc1111-1111-1111-1111-111111111111', 7.45, 8500000, NOW() - INTERVAL '1 hour', 'Morpho API'),
    ('cccc1111-1111-1111-1111-111111111111', 7.12, 8200000, NOW() - INTERVAL '1 day', 'Morpho API'),
    
    -- Aave Arbitrum
    ('dddd1111-1111-1111-1111-111111111111', 6.12, 12000000, NOW() - INTERVAL '1 hour', 'Aave Subgraph'),
    
    -- Curve Polygon
    ('eeee1111-1111-1111-1111-111111111111', 3.92, 5200000, NOW() - INTERVAL '4 hours', 'DeFiLlama')
ON CONFLICT DO NOTHING;
