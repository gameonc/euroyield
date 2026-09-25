/**
 * PayRam webhook signature verification (HMAC-SHA256).
 * PayRam signs each webhook body with your shared secret; we recompute and
 * compare in constant time so only genuine gateway notifications are honored.
 */

import { createHmac, timingSafeEqual } from "crypto"

/** Header names PayRam may use for the signature (checked in order). */
export const PAYRAM_SIGNATURE_HEADERS = [
    "x-payram-signature",
    "x-signature",
    "payram-signature",
]

/**
 * Verify a webhook. `rawBody` MUST be the exact bytes received (not re-serialized
 * JSON). Returns false on any mismatch or missing input.
 */
export function verifyPayramSignature(
    rawBody: string,
    signature: string | null | undefined,
    secret: string | undefined
): boolean {
    if (!rawBody || !signature || !secret) return false

    // Accept a bare hex digest or a "sha256=<hex>" form.
    const provided = signature.includes("=") ? signature.split("=").pop()! : signature
    const expected = createHmac("sha256", secret).update(rawBody).digest("hex")

    const a = Buffer.from(expected, "utf8")
    const b = Buffer.from(provided.trim(), "utf8")
    if (a.length !== b.length) return false
    try {
        return timingSafeEqual(a, b)
    } catch {
        return false
    }
}

/** Pull the signature from a Headers object, trying known header names. */
export function extractSignature(headers: Headers): string | null {
    for (const h of PAYRAM_SIGNATURE_HEADERS) {
        const v = headers.get(h)
        if (v) return v
    }
    return null
}
