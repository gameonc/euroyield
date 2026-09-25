/**
 * Unit tests for API key generation / hashing.
 * Run with: npm test
 */

import { test } from "node:test"
import assert from "node:assert/strict"
import { createHash } from "crypto"
import { generateApiKey, hashKey, bearerToken } from "./apikey"

test("generateApiKey returns a prefixed raw key and its sha256 hash", () => {
    const { raw, hash } = generateApiKey()
    assert.match(raw, /^rk_[0-9a-f]{48}$/)
    assert.equal(hash, createHash("sha256").update(raw).digest("hex"))
    assert.equal(hash.length, 64)
})

test("hashKey is deterministic and trims", () => {
    assert.equal(hashKey("rk_abc"), hashKey("  rk_abc  "))
    assert.notEqual(hashKey("rk_abc"), hashKey("rk_abd"))
})

test("keys are unique per generation", () => {
    assert.notEqual(generateApiKey().raw, generateApiKey().raw)
})

test("bearerToken strips the Bearer prefix", () => {
    assert.equal(bearerToken("Bearer rk_xyz"), "rk_xyz")
    assert.equal(bearerToken("bearer   rk_xyz"), "rk_xyz")
    assert.equal(bearerToken("rk_xyz"), "rk_xyz")
    assert.equal(bearerToken(null), null)
    assert.equal(bearerToken("Bearer   "), null)
})
