-- EuroYield Database Schema
-- Version: 1.0
-- Description: Initial schema for Euro stablecoin yield dashboard

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE,
    wallet_address TEXT,
    subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'analyst', 'institutional')),
    stripe_customer_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for wallet lookups
CREATE INDEX IF NOT EXISTS idx_users_wallet ON users(wallet_address);

-- ============================================
-- PROTOCOLS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS protocols (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    chain TEXT NOT NULL CHECK (chain IN ('ethereum', 'arbitrum', 'optimism', 'polygon', 'base')),
    icon_url TEXT,
    website TEXT,
    is_audited BOOLEAN DEFAULT FALSE,
    launched_at DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- POOLS TABLE (Yield opportunities)
-- ============================================
CREATE TABLE IF NOT EXISTS pools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    protocol_id UUID REFERENCES protocols(id) ON DELETE CASCADE,
    stablecoin TEXT NOT NULL CHECK (stablecoin IN ('EURC', 'EURS', 'eEUR', 'agEUR', 'cEUR')),
    pool_name TEXT NOT NULL,
    pool_address TEXT,
    chain TEXT NOT NULL CHECK (chain IN ('ethereum', 'arbitrum', 'optimism', 'polygon', 'base')),
    risk_tags JSONB DEFAULT '[]'::jsonb,
    -- Data freshness tier: 'hot', 'warm', 'cold'
    freshness_tier TEXT DEFAULT 'cold' CHECK (freshness_tier IN ('hot', 'warm', 'cold')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- YIELD_HISTORY TABLE (Time-series data)
-- ============================================
CREATE TABLE IF NOT EXISTS yield_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pool_id UUID REFERENCES pools(id) ON DELETE CASCADE,
    apy DECIMAL(10, 4) NOT NULL, -- e.g., 5.2400 for 5.24%
    tvl DECIMAL(20, 2) NOT NULL, -- TVL in EUR
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    source TEXT NOT NULL -- e.g., 'DeFiLlama', 'Aave Subgraph'
);

-- Index for efficient time-based queries
CREATE INDEX IF NOT EXISTS idx_yield_history_pool_time ON yield_history(pool_id, timestamp DESC);

-- ============================================
-- LATEST_YIELDS VIEW (Convenience view for current yields)
-- ============================================
CREATE OR REPLACE VIEW latest_yields AS
SELECT DISTINCT ON (pool_id)
    yh.id,
    yh.pool_id,
    yh.apy,
    yh.tvl,
    yh.timestamp,
    yh.source,
    p.pool_name,
    p.stablecoin,
    p.chain,
    p.risk_tags,
    pr.name AS protocol_name,
    pr.slug AS protocol_slug,
    pr.is_audited
FROM yield_history yh
JOIN pools p ON yh.pool_id = p.id
JOIN protocols pr ON p.protocol_id = pr.id
WHERE p.is_active = TRUE
ORDER BY pool_id, timestamp DESC;

-- ============================================
-- ALERTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    pool_id UUID REFERENCES pools(id) ON DELETE SET NULL,
    alert_type TEXT NOT NULL CHECK (alert_type IN ('apy_above', 'apy_below', 'tvl_drop')),
    threshold DECIMAL(10, 4) NOT NULL,
    channels JSONB DEFAULT '["email"]'::jsonb, -- ["email", "telegram"]
    is_active BOOLEAN DEFAULT TRUE,
    last_triggered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INGESTION_LOGS TABLE (For monitoring data freshness)
-- ============================================
CREATE TABLE IF NOT EXISTS ingestion_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_name TEXT NOT NULL, -- e.g., 'ingest_hot', 'ingest_warm'
    status TEXT NOT NULL CHECK (status IN ('running', 'success', 'failed')),
    pools_updated INTEGER DEFAULT 0,
    error_message TEXT,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on user-specific tables
-- Enable RLS on user-specific tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE yield_history ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Alerts are private to users
CREATE POLICY "Users can view own alerts" ON alerts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own alerts" ON alerts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own alerts" ON alerts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own alerts" ON alerts
    FOR DELETE USING (auth.uid() = user_id);

-- Public read access for protocols, pools, yields
CREATE POLICY "Anyone can read protocols" ON protocols
    FOR SELECT USING (true);

CREATE POLICY "Anyone can read pools" ON pools
    FOR SELECT USING (true);

CREATE POLICY "Anyone can read yield_history" ON yield_history
    FOR SELECT USING (true);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_protocols_updated_at
    BEFORE UPDATE ON protocols
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pools_updated_at
    BEFORE UPDATE ON pools
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_alerts_updated_at
    BEFORE UPDATE ON alerts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
