/**
 * Pure yield calculations — the single source of truth shared by the web UI
 * (dashboard components) and the agent-facing MCP server.
 *
 * Everything here is deterministic and side-effect free so it can be unit
 * tested and called from any runtime (React, Node, edge).
 */

import type { LatestYield, RiskTag } from "@/types/database"

// ============================================
// PROJECTIONS
// ============================================

export interface YieldProjection {
    /** Projected earnings over one day at the given APY. */
    daily: number
    /** Projected earnings over one month (year / 12). */
    monthly: number
    /** Projected earnings over one year. */
    yearly: number
}

/**
 * Simple (non-compounding) projection of earnings for a deposit at a given APY.
 * Mirrors the math previously inlined in the YieldCalculator component.
 *
 * @param deposit  Principal amount (in EUR).
 * @param apy      Annual percentage yield, expressed as a percent (e.g. 4.2 = 4.2%).
 */
export function projectYield(deposit: number, apy: number): YieldProjection {
    const principal = Number.isFinite(deposit) && deposit > 0 ? deposit : 0
    const rate = Number.isFinite(apy) ? apy / 100 : 0

    const yearly = principal * rate
    return {
        daily: yearly / 365,
        monthly: yearly / 12,
        yearly,
    }
}

// ============================================
// RANKING / SELECTION
// ============================================

/** Sort a copy of the pools by APY, highest first. Does not mutate the input. */
export function sortByApyDesc<T extends { apy: number }>(pools: T[]): T[] {
    return [...pools].sort((a, b) => b.apy - a.apy)
}

/** Top N pools by APY. Mirrors the BestYieldToday component selection. */
export function topYields<T extends { apy: number }>(pools: T[], n = 3): T[] {
    return sortByApyDesc(pools).slice(0, Math.max(0, n))
}

// ============================================
// FILTERING / COMPARISON
// ============================================

export interface YieldFilter {
    /** Case-insensitive euro stablecoin symbol, e.g. "EURC". */
    stablecoin?: string
    /** Case-insensitive chain name, e.g. "base". */
    chain?: string
    /** Case-insensitive protocol name substring, e.g. "aave". */
    protocol?: string
    /** Minimum APY (percent). */
    minApy?: number
    /** Minimum TVL (USD). */
    minTvl?: number
    /** Only include pools whose protocol is audited. */
    auditedOnly?: boolean
}

/**
 * Filter pools against a set of optional criteria. Any unset criterion is
 * ignored. Comparisons on text fields are case-insensitive.
 */
export function filterYields(pools: LatestYield[], filter: YieldFilter = {}): LatestYield[] {
    const stablecoin = filter.stablecoin?.trim().toLowerCase()
    const chain = filter.chain?.trim().toLowerCase()
    const protocol = filter.protocol?.trim().toLowerCase()

    return pools.filter((pool) => {
        if (stablecoin && pool.stablecoin.toLowerCase() !== stablecoin) return false
        if (chain && pool.chain.toLowerCase() !== chain) return false
        if (protocol && !pool.protocol_name.toLowerCase().includes(protocol)) return false
        if (filter.minApy != null && pool.apy < filter.minApy) return false
        if (filter.minTvl != null && pool.tvl < filter.minTvl) return false
        if (filter.auditedOnly && !pool.is_audited) return false
        return true
    })
}

// ============================================
// RISK SUMMARY
// ============================================

/**
 * Plain-English risk summary for a pool — the machine-readable counterpart to
 * the RiskBadge UI. Returns the individual tags plus a one-line summary an
 * agent can reason over.
 */
export function summarizeRisk(pool: Pick<LatestYield, "risk_tags" | "is_audited" | "tvl" | "apy">): {
    tags: RiskTag[]
    audited: boolean
    summary: string
} {
    const tags = Array.isArray(pool.risk_tags) ? pool.risk_tags : []
    const parts: string[] = []

    parts.push(pool.is_audited ? "Protocol is audited." : "Protocol is NOT audited.")

    if (pool.tvl >= 50_000_000) parts.push("Deep liquidity (TVL ≥ $50M).")
    else if (pool.tvl < 1_000_000) parts.push("Thin liquidity (TVL < $1M) — higher exit risk.")

    if (pool.apy >= 15) parts.push(`Unusually high APY (${pool.apy.toFixed(2)}%) — verify sustainability.`)

    const negativeTags = tags.filter((t) => t && t.isPositive === false)
    if (negativeTags.length > 0) {
        parts.push(`Flags: ${negativeTags.map((t) => t.label).join(", ")}.`)
    }

    return {
        tags,
        audited: pool.is_audited,
        summary: parts.join(" "),
    }
}
