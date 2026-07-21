/**
 * Unit tests for the shared pure yield functions.
 * Run with: npm test
 */

import { test } from "node:test"
import assert from "node:assert/strict"
import {
    projectYield,
    sortByApyDesc,
    topYields,
    filterYields,
    summarizeRisk,
} from "./calculations"
import type { LatestYield, RiskTag } from "@/types/database"

function makePool(overrides: Partial<LatestYield> = {}): LatestYield {
    return {
        id: "y1",
        pool_id: "p1",
        apy: 5,
        apy_delta: null,
        tvl: 10_000_000,
        timestamp: "2026-07-21T00:00:00Z",
        source: "defillama",
        pool_name: "EURC",
        stablecoin: "EURC",
        currency: "EUR",
        chain: "base",
        risk_tags: [],
        protocol_name: "Aave V3",
        protocol_slug: "aave-v3",
        is_audited: true,
        protocol_url: null,
        ...overrides,
    }
}

test("projectYield computes non-compounding earnings", () => {
    const p = projectYield(10_000, 5)
    assert.equal(p.yearly, 500)
    assert.equal(p.monthly, 500 / 12)
    assert.equal(p.daily, 500 / 365)
})

test("projectYield guards against bad input", () => {
    assert.deepEqual(projectYield(-100, 5), { daily: 0, monthly: 0, yearly: 0 })
    assert.deepEqual(projectYield(1000, NaN), { daily: 0, monthly: 0, yearly: 0 })
})

test("sortByApyDesc does not mutate and orders high→low", () => {
    const pools = [makePool({ apy: 1 }), makePool({ apy: 9 }), makePool({ apy: 4 })]
    const sorted = sortByApyDesc(pools)
    assert.deepEqual(sorted.map((p) => p.apy), [9, 4, 1])
    // original order preserved
    assert.deepEqual(pools.map((p) => p.apy), [1, 9, 4])
})

test("topYields returns the N highest", () => {
    const pools = [makePool({ apy: 1 }), makePool({ apy: 9 }), makePool({ apy: 4 })]
    assert.deepEqual(topYields(pools, 2).map((p) => p.apy), [9, 4])
    assert.equal(topYields(pools, 0).length, 0)
})

test("filterYields matches on stablecoin, chain, protocol and thresholds", () => {
    const pools = [
        makePool({ stablecoin: "EURC", chain: "base", protocol_name: "Aave V3", apy: 6, tvl: 5_000_000 }),
        makePool({ stablecoin: "EURS", chain: "ethereum", protocol_name: "Curve", apy: 2, tvl: 500_000 }),
        makePool({ stablecoin: "EURC", chain: "ethereum", protocol_name: "Morpho Blue", apy: 8, tvl: 20_000_000, is_audited: false }),
    ]
    assert.equal(filterYields(pools, { stablecoin: "eurc" }).length, 2)
    assert.equal(filterYields(pools, { chain: "ethereum" }).length, 2)
    assert.equal(filterYields(pools, { protocol: "aave" }).length, 1)
    assert.equal(filterYields(pools, { minApy: 5 }).length, 2)
    assert.equal(filterYields(pools, { minTvl: 1_000_000 }).length, 2)
    assert.equal(filterYields(pools, { auditedOnly: true }).length, 2)
    // combined
    assert.equal(filterYields(pools, { stablecoin: "EURC", minApy: 7 }).length, 1)
})

test("filterYields matches on currency", () => {
    const pools = [
        makePool({ currency: "USD", stablecoin: "USDC" }),
        makePool({ currency: "EUR", stablecoin: "EURC" }),
    ]
    assert.equal(filterYields(pools, { currency: "USD" }).length, 1)
    assert.equal(filterYields(pools, { currency: "usd" }).length, 1)
    assert.equal(filterYields(pools, { currency: "EUR" })[0].stablecoin, "EURC")
})

test("summarizeRisk flags unaudited, thin liquidity and high apy", () => {
    const negTag: RiskTag = {
        type: "unaudited",
        label: "Unaudited",
        description: "no audit",
        isPositive: false,
    }
    const r = summarizeRisk({ risk_tags: [negTag], is_audited: false, tvl: 500_000, apy: 20 })
    assert.equal(r.audited, false)
    assert.match(r.summary, /NOT audited/)
    assert.match(r.summary, /Thin liquidity/)
    assert.match(r.summary, /high APY/)
    assert.match(r.summary, /Unaudited/)

    const safe = summarizeRisk({ risk_tags: [], is_audited: true, tvl: 80_000_000, apy: 4 })
    assert.equal(safe.audited, true)
    assert.match(safe.summary, /audited/)
    assert.match(safe.summary, /Deep liquidity/)
})
