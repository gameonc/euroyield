-- Billing: prepaid API keys funded by PayRam (self-hosted, cold-wallet settlement).
--
-- Flow: /api/billing/checkout creates an (inactive, 0-credit) api_key + a pending
-- payment, and returns a PayRam pay URL. When PayRam settles to the cold wallet it
-- POSTs a signed webhook; /api/payram/webhook then activates the key and adds credits.
--
-- These tables hold secrets/credits and are SERVER-ONLY: RLS is enabled with NO
-- public policies, so only the service-role key can read/write them.

CREATE TABLE IF NOT EXISTS api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key_hash TEXT UNIQUE NOT NULL,            -- sha256(raw key); raw is shown once at checkout
    owner_email TEXT,
    plan TEXT NOT NULL DEFAULT 'payg',
    credits_remaining INTEGER NOT NULL DEFAULT 0,  -- 1 credit = 1 paid API call
    is_active BOOLEAN NOT NULL DEFAULT FALSE,       -- activates on payment.confirmed
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS api_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key_id UUID REFERENCES api_keys(id) ON DELETE CASCADE,
    route TEXT NOT NULL,
    cost INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_api_usage_key ON api_usage(key_id, created_at DESC);

CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payram_reference_id TEXT UNIQUE NOT NULL,  -- idempotency anchor
    key_id UUID REFERENCES api_keys(id) ON DELETE SET NULL,
    customer_id TEXT,
    owner_email TEXT,
    amount_usd NUMERIC(20, 2),
    currency TEXT,
    tx_hash TEXT,
    credits_granted INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Atomic credit decrement to avoid read-then-write races on concurrent calls.
CREATE OR REPLACE FUNCTION consume_api_credit(p_key_hash TEXT, p_route TEXT)
RETURNS INTEGER AS $$
DECLARE
    v_key_id UUID;
    v_remaining INTEGER;
BEGIN
    UPDATE api_keys
        SET credits_remaining = credits_remaining - 1,
            updated_at = NOW()
        WHERE key_hash = p_key_hash
          AND is_active = TRUE
          AND credits_remaining > 0
        RETURNING id, credits_remaining INTO v_key_id, v_remaining;

    IF v_key_id IS NULL THEN
        RETURN -1;  -- invalid/inactive/no-credits
    END IF;

    INSERT INTO api_usage (key_id, route, cost) VALUES (v_key_id, p_route, 1);
    RETURN v_remaining;
END;
$$ LANGUAGE plpgsql;

-- Server-only access.
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_api_keys_updated_at
    BEFORE UPDATE ON api_keys
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
