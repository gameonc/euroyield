/**
 * Shared agent-tool handlers — the single source of truth behind BOTH the MCP
 * server (stdio) and the paid HTTP API (`/api/agent/*`). Each function takes a
 * plain input object and returns a JSON-serializable result (or throws on error).
 *
 * All read-only / advisory. No funds held, signed, or approved.
 */

import { fetchLatestYields } from "@/lib/yields/data"
import {
    topYields,
    filterYields,
    projectYield,
    summarizeRisk,
    type YieldFilter,
} from "@/lib/yields/calculations"
import { recommendAllocation, type RiskPolicy } from "@/lib/yields/allocate"
import { readStablecoinPositions } from "@/lib/positions/readPositions"
import type { LatestYield } from "@/types/database"

/** Compact, agent-friendly projection of a raw view row. */
export function toPoolSummary(pool: LatestYield) {
    return {
        pool_id: pool.pool_id,
        protocol: pool.protocol_name,
        stablecoin: pool.stablecoin,
        currency: pool.currency,
        chain: pool.chain,
        apy: pool.apy,
        tvl_usd: pool.tvl,
        audited: pool.is_audited,
        risk_tags: (pool.risk_tags ?? []).map((t) => t.label),
        updated_at: pool.timestamp,
    }
}

export function toFilter(input: Record<string, unknown>): YieldFilter {
    return {
        currency: input.currency as string | undefined,
        stablecoin: input.stablecoin as string | undefined,
        chain: input.chain as string | undefined,
        protocol: input.protocol as string | undefined,
        minApy: input.minApy as number | undefined,
        minTvl: input.minTvl as number | undefined,
        auditedOnly: input.auditedOnly as boolean | undefined,
    }
}

export async function getBestYield(input: Record<string, unknown>) {
    const all = await fetchLatestYields()
    const filtered = filterYields(all, toFilter(input))
    const best = topYields(filtered, (input.limit as number) ?? 3)
    return { count: best.length, pools: best.map(toPoolSummary) }
}

export async function compareYields(input: Record<string, unknown>) {
    const all = await fetchLatestYields()
    const filtered = filterYields(all, toFilter(input))
    return { count: filtered.length, pools: filtered.map(toPoolSummary) }
}

export async function getProtocolRisk(input: Record<string, unknown>) {
    const all = await fetchLatestYields()
    const filtered = filterYields(all, toFilter(input))
    return {
        count: filtered.length,
        pools: filtered.map((pool) => ({ ...toPoolSummary(pool), risk: summarizeRisk(pool) })),
    }
}

export async function simulateYield(input: Record<string, unknown>) {
    let apy = input.apy as number | undefined
    let sourcePool: LatestYield | undefined
    const amount = input.amount as number

    if (apy == null) {
        const all = await fetchLatestYields()
        const filtered = filterYields(all, toFilter(input))
        sourcePool = topYields(filtered, 1)[0]
        if (!sourcePool) {
            throw new Error("No pool matches the given filters and no explicit apy was provided.")
        }
        apy = sourcePool.apy
    }

    return {
        amount,
        apy,
        apy_source: sourcePool ? toPoolSummary(sourcePool) : "explicit",
        projection: projectYield(amount, apy),
        note: "Non-compounding, illustrative projection. Returns are not guaranteed.",
    }
}

export async function readPositions(address: string) {
    return readStablecoinPositions(address)
}

export async function recommendTreasuryAllocation(input: Record<string, unknown>) {
    const all = await fetchLatestYields()
    const currency = (input.currency as string) ?? "USD"
    const pools = filterYields(all, { currency })
    const policy: RiskPolicy = {
        jurisdiction: (input.jurisdiction as RiskPolicy["jurisdiction"]) ?? "GLOBAL",
        regulatedVenuesOnly: input.regulatedVenuesOnly as boolean | undefined,
        requireAudited: input.requireAudited as boolean | undefined,
        minTvlUsd: input.minTvlUsd as number | undefined,
        chains: input.chains as string[] | undefined,
        maxPositions: input.maxPositions as number | undefined,
        maxAllocationFraction: input.maxAllocationFraction as number | undefined,
    }
    return recommendAllocation(pools, { amount: input.amount as number, currency, policy })
}
