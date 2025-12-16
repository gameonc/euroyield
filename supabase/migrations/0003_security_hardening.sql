
-- Security Hardening Migration
-- Version: 1.1

-- 1. Enable RLS on ingestion_logs to prevent information leakage
ALTER TABLE ingestion_logs ENABLE ROW LEVEL SECURITY;
-- No policies added means default DENY ALL for public/authenticated, which is what we want. 
-- Only service_role can write/read logs.

-- 2. Protect 'subscription_tier' and 'stripe_customer_id' from user modification
-- Users should only be able to update specific profile fields.
CREATE OR REPLACE FUNCTION prevent_sensitive_updates()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if protected columns are being modified
    IF NEW.subscription_tier IS DISTINCT FROM OLD.subscription_tier THEN
        RAISE EXCEPTION 'Cannot manually update subscription_tier';
    END IF;
    
    IF NEW.stripe_customer_id IS DISTINCT FROM OLD.stripe_customer_id THEN
        RAISE EXCEPTION 'Cannot manually update stripe_customer_id';
    END IF;

    -- Allow the update for other columns
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER protect_user_sensitive_fields
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION prevent_sensitive_updates();

-- 3. Additional Security Comments
COMMENT ON TABLE users IS 'Row Level Security is enabled. Sensitive fields protected by trigger.';
