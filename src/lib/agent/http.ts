/**
 * Helpers for the paid HTTP agent API (`/api/agent/*`).
 * Reads inputs from either a JSON body (POST) or query string (GET), coercing
 * query strings to numbers/booleans/arrays so the shared handlers see real types.
 */

import { NextResponse, type NextRequest } from "next/server"
import { bearerToken } from "./apikey"
import { chargeApiKey } from "./auth"

/** Coerce a raw query-string value: numbers and booleans via JSON, else string. */
function coerce(key: string, value: string): unknown {
    if (key === "chains") return value.split(",").map((s) => s.trim()).filter(Boolean)
    try {
        const parsed = JSON.parse(value)
        if (typeof parsed === "number" || typeof parsed === "boolean") return parsed
    } catch {
        /* leave as string */
    }
    return value
}

/** Merge query params (coerced) with a JSON body (POST). Body wins on conflict. */
export async function readInput(req: NextRequest): Promise<Record<string, unknown>> {
    const input: Record<string, unknown> = {}
    for (const [k, v] of req.nextUrl.searchParams.entries()) input[k] = coerce(k, v)

    if (req.method === "POST") {
        try {
            const body = await req.json()
            if (body && typeof body === "object") Object.assign(input, body)
        } catch {
            /* no/invalid body — query-only is fine */
        }
    }
    return input
}

export function ok(data: unknown) {
    return NextResponse.json(data)
}

export function bad(message: string, status = 400) {
    return NextResponse.json({ error: message }, { status })
}

/** Run a handler with shared error handling. */
export async function handle(fn: () => Promise<unknown>) {
    try {
        return ok(await fn())
    } catch (err) {
        return bad(err instanceof Error ? err.message : String(err), 500)
    }
}

/**
 * Wrapper for PAID routes. Two ways to pay, both settling to the owner:
 *  - `Authorization: Bearer <key>` → consume one prepaid (PayRam-funded) credit.
 *  - No key → the x402 middleware already collected payment before we ran.
 * A key that is present but invalid/empty of credits is rejected here.
 */
export async function paidHandle(req: NextRequest, route: string, fn: () => Promise<unknown>) {
    const key = bearerToken(req.headers.get("authorization"))
    if (key) {
        const charge = await chargeApiKey(key, route)
        if (!charge.ok) return bad(charge.error ?? "Payment required.", charge.status)
        const res = await handle(fn)
        res.headers.set("X-Credits-Remaining", String(charge.creditsRemaining ?? ""))
        return res
    }
    return handle(fn)
}

