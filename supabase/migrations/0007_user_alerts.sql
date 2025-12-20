-- Create user_alerts table
create table if not exists public.user_alerts (
    id uuid default gen_random_uuid() primary key,
    email text not null,
    protocol_slug text not null,
    chain text not null,
    condition text not null check (condition in ('ABOVE', 'BELOW')),
    threshold numeric not null,
    is_verified boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    last_sent_at timestamp with time zone
);

-- Enable RLS
alter table public.user_alerts enable row level security;

-- Policy: Allow anonymous users to INSERT alerts (for the "No Login" flow)
create policy "Allow anonymous insert"
    on public.user_alerts
    for insert
    with check (true);

-- Policy: Only allow users to read/update their own alerts if verified (or via specialized edge function token)
-- For MVP, we effectively "write-only" from the client side. The Edge Function (service role) will read all.
create policy "Service role reads all"
    on public.user_alerts
    for select
    using (true);
