/**
 * Unit tests for position value-basis classification.
 * Run with: npm test
 */

import { test } from "node:test"
import assert from "node:assert/strict"
import { positionValueBasis, isPriceableAsEuro } from "./valueBasis"

test("aToken-style supply positions are 1:1 priceable", () => {
    assert.equal(positionValueBasis("aave-v3"), "stable-1to1")
    assert.equal(positionValueBasis("radiant-v2"), "stable-1to1")
    assert.equal(isPriceableAsEuro("aave-v3"), true)
})

test("LP / vault-share / mToken positions are derived (not 1:1)", () => {
    for (const slug of [
        "curve-dex",
        "morpho-blue",
        "yearn-finance",
        "moonwell-lending",
        "fluid-lending",
        "aerodrome-slipstream",
        "convex-finance",
        "beefy",
        "merkl",
    ]) {
        assert.equal(positionValueBasis(slug), "derived", `${slug} should be derived`)
        assert.equal(isPriceableAsEuro(slug), false, `${slug} should not be priceable 1:1`)
    }
})

test("unknown protocols default to derived (safe, under-claiming)", () => {
    assert.equal(positionValueBasis("some-new-protocol"), "derived")
    assert.equal(isPriceableAsEuro("some-new-protocol"), false)
})
