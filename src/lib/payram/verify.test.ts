/**
 * Unit tests for PayRam webhook signature verification.
 * Run with: npm test
 */

import { test } from "node:test"
import assert from "node:assert/strict"
import { createHmac } from "crypto"
import { verifyPayramSignature } from "./verify"

const SECRET = "whsec_test_secret"
const BODY = JSON.stringify({ event: "payment.confirmed", reference_id: "ref_123", tx_hash: "0xabc" })
const sign = (body: string, secret = SECRET) => createHmac("sha256", secret).update(body).digest("hex")

test("valid HMAC signature verifies", () => {
    assert.equal(verifyPayramSignature(BODY, sign(BODY), SECRET), true)
})

test("sha256=<hex> prefixed form verifies", () => {
    assert.equal(verifyPayramSignature(BODY, `sha256=${sign(BODY)}`, SECRET), true)
})

test("wrong secret fails", () => {
    assert.equal(verifyPayramSignature(BODY, sign(BODY, "other"), SECRET), false)
})

test("tampered body fails", () => {
    const tampered = BODY.replace("ref_123", "ref_999")
    assert.equal(verifyPayramSignature(tampered, sign(BODY), SECRET), false)
})

test("missing signature / secret / body fails safely", () => {
    assert.equal(verifyPayramSignature(BODY, null, SECRET), false)
    assert.equal(verifyPayramSignature(BODY, sign(BODY), undefined), false)
    assert.equal(verifyPayramSignature("", sign(BODY), SECRET), false)
})
