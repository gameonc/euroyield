-- ============================================
-- SUBSCRIBERS TABLE (Marketing/Newsletter)
-- ============================================
CREATE TABLE IF NOT EXISTS subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    source TEXT DEFAULT 'website' -- 'website', 'waitlist', etc.
);

-- Enable RLS
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (recaptcha/backend validation handled in API)
CREATE POLICY "Anyone can subscribe" ON subscribers
    FOR INSERT WITH CHECK (true);

-- Only service role (admin) can view subscribers
CREATE POLICY "Service role can viewing subscribers" ON subscribers
    FOR SELECT USING (false); 

-- Trigger for updated_at
CREATE TRIGGER update_subscribers_updated_at
    BEFORE UPDATE ON subscribers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
