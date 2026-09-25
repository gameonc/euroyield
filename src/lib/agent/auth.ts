/**
 * Prepaid API-key auth for the paid agent routes. When a caller presents a
 * PayRam-funded key, we atomically consume one credit (via the
 * `consume_api_credit` SQL function) instead of charging x402 per call.
 */

import { createServiceClient } from "@/lib/supabase/service"
import { hashKey } from "./apikey"

export interface ChargeResult {
    ok: boolean
    status: number
    error?: string
    creditsRemaining?: number
}

/**
 * Validate a raw API key and consume one credit atomically. Returns ok:false
 * with an HTTP status when the key is invalid/inactive (401) or out of credits (402).
 */
export async function chargeApiKey(rawKey: string, route: string): Promise<ChargeResult> {
    if (!rawKey) return { ok: false, status: 401, error: "Missing API key." }

    const supabase = createServiceClient()
    const { data, error } = await supabase.rpc("consume_api_credit", {
        p_key_hash: hashKey(rawKey),
        p_route: route,
    })

    if (error) {
        return { ok: false, status: 500, error: `Key check failed: ${error.message}` }
    }
    const remaining = typeof data === "number" ? data : -1
    if (remaining < 0) {
        return {
            ok: false,
            status: 402,
            error: "Invalid/inactive API key or no credits remaining — top up via /api/billing/checkout.",
        }
    }
    return { ok: true, status: 200, creditsRemaining: remaining }
}
