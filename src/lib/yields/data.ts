/**
 * Server-side access to the current euro-stablecoin yield set.
 *
 * Reads the denormalized `latest_yields` view — the same source the web
 * dashboard renders — so agent tools and the UI never diverge.
 */

import { createServiceClient } from "@/lib/supabase/service"
import type { LatestYield } from "@/types/database"

/**
 * Fetch the latest yield snapshot for every active euro-stablecoin pool,
 * ordered by APY (highest first).
 */
export async function fetchLatestYields(): Promise<LatestYield[]> {
    const supabase = createServiceClient()

    const { data, error } = await supabase
        .from("latest_yields")
        .select("*")
        .order("apy", { ascending: false })

    if (error) {
        throw new Error(`Failed to load latest_yields: ${error.message}`)
    }

    return (data ?? []) as LatestYield[]
}
