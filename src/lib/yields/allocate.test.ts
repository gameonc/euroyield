/**
 * Unit tests for the treasury allocation decision layer.
 * Run with: npm test
 */

import { test } from "node:test"
import assert from "node:assert/strict"
import { recommendAllocation, poolScore } from "./allocate"
import type { LatestYield } from "@/types/database"

function makePool(o: Partial<LatestYield> = {}): LatestYield {
    return {
        id: "y",
        pool_id: "p" + Math.round((o.apy ?? 0) * 100),
        apy: 5,
        apy_delta: null,
        tvl: 20_000_000,
        timestamp: "2026-07-21T00:00:00Z",
        source: "defillama",
        pool_name: "USDC",
        stablecoin: "USDC",
        currency: "USD",
        chain: "base",
        risk_tags: [],
        protocol_name: "Aave V3",
        protocol_slug: "aave-v3",
        is_audited: true,
        protocol_url: null,
        ...o,
    }
}

test("poolScore rewards audit + deep liquidity", () => {
    const strong = makePool({ apy: 5, is_audited: true, tvl: 80_000_000 })
    const weak = makePool({ apy: 5, is_audited: false, tvl: 500_000 })
    assert.ok(poolScore(strong) > poolScore(weak))
})

test("allocation splits the full amount and fractions sum to 1", () => {
    const pools = [
        makePool({ pool_id: "a", apy: 8, tvl: 60_000_000 }),
        makePool({ pool_id: "b", apy: 6, tvl: 40_000_000 }),
        makePool({ pool_id: "c", apy: 4, tvl: 20_000_000 }),
    ]
    const r = recommendAllocation(pools, { amount: 10_000, currency: "USD" })
    const fracSum = r.allocations.reduce((s, a) => s + a.fraction, 0)
    const amtSum = r.allocations.reduce((s, a) => s + a.amount, 0)
    assert.ok(Math.abs(fracSum - 1) < 1e-9)
    assert.ok(Math.abs(amtSum - 10_000) < 1e-6)
    // blended APY sits within the leg APY range
    const apys = r.allocations.map((a) => a.apy)
    assert.ok(r.blended_apy <= Math.max(...apys) + 1e-9)
    assert.ok(r.blended_apy >= Math.min(...apys) - 1e-9)
    assert.ok(Math.abs(r.expected_yearly_total - 10_000 * (r.blended_apy / 100)) < 1e-6)
})

test("requireAudited and minTvlUsd exclude ineligible pools", () => {
    const pools = [
        makePool({ pool_id: "a", apy: 12, is_audited: false, tvl: 50_000_000 }),
        makePool({ pool_id: "b", apy: 5, is_audited: true, tvl: 30_000_000 }),
        makePool({ pool_id: "c", apy: 9, is_audited: true, tvl: 200_000 }),
    ]
    const r = recommendAllocation(pools, {
        amount: 1_000,
        currency: "USD",
        policy: { requireAudited: true, minTvlUsd: 1_000_000 },
    })
    // only pool "b" survives (a: unaudited, c: too thin)
    assert.equal(r.allocations.length, 1)
    assert.equal(r.allocations[0].pool_id, "b")
})

test("chains allow-list is respected", () => {
    const pools = [
        makePool({ pool_id: "a", chain: "ethereum", apy: 9 }),
        makePool({ pool_id: "b", chain: "base", apy: 6 }),
    ]
    const r = recommendAllocation(pools, {
        amount: 1_000,
        currency: "USD",
        policy: { chains: ["base"] },
    })
    assert.equal(r.allocations.length, 1)
    assert.equal(r.allocations[0].chain, "base")
})

test("maxAllocationFraction caps concentration", () => {
    const pools = [
        makePool({ pool_id: "a", apy: 100, tvl: 80_000_000 }), // would dominate
        makePool({ pool_id: "b", apy: 4, tvl: 80_000_000 }),
        makePool({ pool_id: "c", apy: 4, tvl: 80_000_000 }),
    ]
    const r = recommendAllocation(pools, {
        amount: 1_000,
        currency: "USD",
        policy: { maxAllocationFraction: 0.5, maxPositions: 3 },
    })
    for (const a of r.allocations) {
        assert.ok(a.fraction <= 0.5 + 1e-9, `${a.pool_id} fraction ${a.fraction} exceeds cap`)
    }
})

test("no eligible pools returns a warning, not a crash", () => {
    const pools = [makePool({ is_audited: false })]
    const r = recommendAllocation(pools, {
        amount: 1_000,
        currency: "USD",
        policy: { requireAudited: true },
    })
    assert.equal(r.allocations.length, 0)
    assert.ok(r.warning)
    assert.equal(r.expected_yearly_total, 0)
})
