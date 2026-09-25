/**
 * API key generation + hashing. The raw key is shown to the buyer exactly once
 * (at checkout); we persist only its sha256 hash, so a DB leak never exposes a
 * usable key.
 */

import { createHash, randomBytes } from "crypto"

const PREFIX = "rk_" // "rendite key"

export function generateApiKey(): { raw: string; hash: string } {
    const raw = PREFIX + randomBytes(24).toString("hex")
    return { raw, hash: hashKey(raw) }
}

export function hashKey(raw: string): string {
    return createHash("sha256").update(raw.trim()).digest("hex")
}

/** Strip an optional "Bearer " prefix from an Authorization header value. */
export function bearerToken(header: string | null): string | null {
    if (!header) return null
    const raw = header.replace(/^Bearer\s+/i, "").trim()
    return raw || null
}
