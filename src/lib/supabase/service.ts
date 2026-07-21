/**
 * Service-role Supabase client for non-request contexts (scripts, the MCP
 * server, cron jobs) where there is no cookie/session to attach.
 *
 * Reading market data (the `latest_yields` view, `pools`, `protocols`) is
 * public under RLS, so the anon key is sufficient; the service-role key is
 * used when present for parity with the ingestion script.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

export function createServiceClient(): SupabaseClient<Database> {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key =
        process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
        throw new Error(
            "Missing Supabase credentials: set NEXT_PUBLIC_SUPABASE_URL and " +
                "SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)."
        )
    }

    return createClient<Database>(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
    })
}
