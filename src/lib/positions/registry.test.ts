/**
 * Sanity tests for the on-chain address registries used in value math.
 * Validates address format and flags accidental duplicates.
 * Run with: npm test
 */

import { test } from "node:test"
import assert from "node:assert/strict"
import { isAddress } from "viem"
import { ALL_PROTOCOL_POSITIONS } from "../constants/protocols"
import { EURO_TOKENS } from "../constants"

test("every protocol-position receipt token is a well-formed address", () => {
    for (const p of ALL_PROTOCOL_POSITIONS) {
        assert.ok(
            isAddress(p.receiptToken, { strict: false }),
            `${p.protocol} ${p.poolName} on chain ${p.chainId} has an invalid receiptToken: ${p.receiptToken}`
        )
        // The zero address is a placeholder, never a real position.
        assert.notEqual(
            p.receiptToken.toLowerCase(),
            "0x0000000000000000000000000000000000000000",
            `${p.protocol} ${p.poolName} uses the zero address as a receiptToken`
        )
    }
})

test("every euro-token address is a well-formed address", () => {
    for (const token of EURO_TOKENS) {
        for (const [chainId, address] of Object.entries(token.addresses)) {
            assert.ok(
                isAddress(address, { strict: false }),
                `${token.symbol} on chain ${chainId} has an invalid address: ${address}`
            )
        }
    }
})

test("no duplicate receipt token on the same chain", () => {
    const seen = new Set<string>()
    for (const p of ALL_PROTOCOL_POSITIONS) {
        const key = `${p.chainId}:${p.receiptToken.toLowerCase()}`
        assert.ok(!seen.has(key), `Duplicate receipt token on chain ${p.chainId}: ${p.receiptToken}`)
        seen.add(key)
    }
})
