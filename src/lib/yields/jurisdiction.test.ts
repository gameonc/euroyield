/**
 * Unit tests for the jurisdiction (compliance) policy engine.
 * Run with: npm test
 */

import { test } from "node:test"
import assert from "node:assert/strict"
import { JURISDICTIONS, jurisdictionEligibility } from "./jurisdiction"

test("every jurisdiction carries a regulator + non-legal-advice disclaimer", () => {
    for (const key of ["EU", "UAE", "US", "GLOBAL"] as const) {
        const rule = JURISDICTIONS[key]
        assert.ok(rule.regulator.length > 0)
        assert.match(rule.advisory, /not legal advice/i)
    }
})

test("EU rejects unaudited protocols by default", () => {
    const e = jurisdictionEligibility({ protocol_slug: "some-defi", is_audited: false }, "EU")
    assert.equal(e.eligible, false)
    assert.ok(e.reasons.some((r) => /unaudited/.test(r)))
})

test("EU accepts audited blue-chip venues", () => {
    const e = jurisdictionEligibility({ protocol_slug: "aave-v3", is_audited: true }, "EU")
    assert.equal(e.eligible, true)
    assert.ok(e.reasons.some((r) => /acceptable under MiCA/.test(r)))
})

test("regulatedVenuesOnly enforces the allowlist", () => {
    // Beefy is audited but not on the regulated-venue allowlist.
    const off = jurisdictionEligibility(
        { protocol_slug: "beefy", is_audited: true },
        "UAE",
        { regulatedVenuesOnly: true }
    )
    assert.equal(off.eligible, false)
    assert.ok(off.reasons.some((r) => /allowlist/.test(r)))

    const on = jurisdictionEligibility(
        { protocol_slug: "morpho-blue", is_audited: true },
        "UAE",
        { regulatedVenuesOnly: true }
    )
    assert.equal(on.eligible, true)
})

test("GLOBAL applies no compliance restriction", () => {
    const e = jurisdictionEligibility({ protocol_slug: "anything", is_audited: false }, "GLOBAL")
    assert.equal(e.eligible, true)
})
