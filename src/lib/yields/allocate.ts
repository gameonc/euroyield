/**
 * Treasury allocation engine — the differentiated decision layer.
 *
 * Given a set of yield pools, an amount of idle stablecoin, and a risk policy,
 * produce a risk-scored, diversified allocation an agent can execute itself.
 * This is advice / intent only: it never holds funds, signs, or takes approvals.
 *
 * Pure and deterministic so it is unit tested and reused by the MCP tool.
 */

import type { LatestYield } from "@/types/database"
import { summarizeRisk } from "./calculations"
import { JURISDICTIONS, jurisdictionEligibility, type Jurisdiction } from "./jurisdiction"

export interface RiskPolicy {
    /** Only allocate to audited protocols. Defaults to the jurisdiction's rule. */
    requireAudited?: boolean
    /** Minimum pool TVL in USD. */
    minTvlUsd?: number
    /** Allowed chains (lowercase names). Empty/undefined = all. */
    chains?: string[]
    /** Max fraction of the total that any single pool may receive (0–1). Default 0.5. */
    maxAllocationFraction?: number
    /** Max number of pools to spread across. Default 3. */
    maxPositions?: number
    /** Regulatory jurisdiction whose compliance rules apply. Default GLOBAL. */
    jurisdiction?: Jurisdiction
    /** Restrict to the jurisdiction's regulated-venue allowlist. */
    regulatedVenuesOnly?: boolean
}

export interface AllocationLeg {
    pool_id: string
    protocol: string
    pool_name: string
    stablecoin: string
    chain: string
    apy: number
    tvl_usd: number
    /** Fraction of the total (0–1). */
    fraction: number
    /** Amount of the input currency assigned to this pool. */
    amount: number
    /** Simple (non-compounding) projected yearly yield on this leg. */
    expected_yearly: number
    risk: ReturnType<typeof summarizeRisk>
    /** Why this venue is acceptable under the active jurisdiction. */
    compliance: string[]
    /** Non-custodial: the agent deposits here itself. */
    action: "deposit"
}

export interface AllocationResult {
    currency: string
    amount: number
    allocations: AllocationLeg[]
    /** Value-weighted APY across the legs. */
    blended_apy: number
    /** Simple projected yearly yield across all legs. */
    expected_yearly_total: number
    policy_applied: RiskPolicy
    /** Jurisdiction whose compliance rules were applied. */
    jurisdiction: Jurisdiction
    /** Regulator + disclaimer for that jurisdiction (not legal advice). */
    advisory: string
    /** Count of pools excluded specifically by the jurisdiction filter. */
    excluded_by_jurisdiction: number
    note: string
    /** Present when no pool passed the policy. */
    warning?: string
}

/** Risk-adjusted score: reward APY, penalize thin liquidity and no audit. */
export function poolScore(pool: LatestYield): number {
    const auditFactor = pool.is_audited ? 1 : 0.5
    const tvl = pool.tvl
    const tvlFactor = tvl >= 50_000_000 ? 1 : tvl >= 10_000_000 ? 0.9 : tvl >= 1_000_000 ? 0.75 : 0.5
    return Math.max(0, pool.apy) * auditFactor * tvlFactor
}

/**
 * Turn scores into fractions that sum to 1 while keeping each ≤ `cap`
 * (water-filling: cap the overflowing pool, redistribute the remainder among the
 * rest by score, repeat). If the cap is infeasible for full allocation
 * (cap × n ≤ 1, e.g. a single pool with cap 0.5), fall back to plain
 * score-proportional weights so the whole amount is still allocated.
 */
export function capAndNormalize(scores: number[], cap: number): number[] {
    const n = scores.length
    const total = scores.reduce((s, v) => s + v, 0)
    if (n === 0 || total <= 0) return scores.map(() => 0)
    if (cap * n <= 1 + 1e-9) return scores.map((s) => s / total)

    const frozen = new Array<boolean>(n).fill(false)
    const frac = new Array<number>(n).fill(0)

    for (let iter = 0; iter < n + 1; iter++) {
        const frozenTotal = frozen.reduce((s, f, i) => (f ? s + frac[i] : s), 0)
        const remaining = 1 - frozenTotal
        const freeScoreSum = scores.reduce((s, v, i) => (frozen[i] ? s : s + v), 0)
        if (freeScoreSum <= 0) break

        for (let i = 0; i < n; i++) {
            if (!frozen[i]) frac[i] = remaining * (scores[i] / freeScoreSum)
        }

        let cappedAny = false
        for (let i = 0; i < n; i++) {
            if (!frozen[i] && frac[i] > cap + 1e-12) {
                frozen[i] = true
                frac[i] = cap
                cappedAny = true
            }
        }
        if (!cappedAny) break
    }
    return frac
}

function passesPolicy(pool: LatestYield, policy: RiskPolicy): boolean {
    if (policy.requireAudited && !pool.is_audited) return false
    if (policy.minTvlUsd != null && pool.tvl < policy.minTvlUsd) return false
    if (policy.chains && policy.chains.length > 0) {
        if (!policy.chains.map((c) => c.toLowerCase()).includes(pool.chain.toLowerCase())) return false
    }
    return true
}

/**
 * Recommend a diversified, risk-scored allocation of `amount` across the given
 * pools (already currency-filtered by the caller).
 */
export function recommendAllocation(
    pools: LatestYield[],
    params: { amount: number; currency: string; policy?: RiskPolicy }
): AllocationResult {
    const policy = params.policy ?? {}
    const jurisdiction: Jurisdiction = policy.jurisdiction ?? "GLOBAL"
    const rule = JURISDICTIONS[jurisdiction]
    const maxFraction = policy.maxAllocationFraction ?? 0.5
    const maxPositions = Math.max(1, policy.maxPositions ?? 3)

    // Jurisdiction supplies the default audit requirement unless the caller set one.
    const effectivePolicy: RiskPolicy = {
        ...policy,
        requireAudited: policy.requireAudited ?? rule.defaultRequireAudited,
    }

    // Base (risk) filter, then jurisdiction (compliance) filter — track how many
    // pools the jurisdiction specifically knocked out, for transparency.
    const passedBase = pools.filter((p) => passesPolicy(p, effectivePolicy))
    let excludedByJurisdiction = 0
    const compliant = passedBase.filter((p) => {
        const e = jurisdictionEligibility(p, jurisdiction, {
            regulatedVenuesOnly: policy.regulatedVenuesOnly,
        })
        if (!e.eligible) excludedByJurisdiction += 1
        return e.eligible
    })

    const eligible = compliant
        .map((p) => ({
            pool: p,
            score: poolScore(p),
            compliance: jurisdictionEligibility(p, jurisdiction, {
                regulatedVenuesOnly: policy.regulatedVenuesOnly,
            }).reasons,
        }))
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, maxPositions)

    if (eligible.length === 0) {
        return {
            currency: params.currency,
            amount: params.amount,
            allocations: [],
            blended_apy: 0,
            expected_yearly_total: 0,
            policy_applied: effectivePolicy,
            jurisdiction,
            advisory: rule.advisory,
            excluded_by_jurisdiction: excludedByJurisdiction,
            note: `No pool matched the risk + ${jurisdiction} compliance policy.`,
            warning:
                "No eligible pools — relax the policy (lower minTvlUsd, allow unaudited, " +
                "widen chains, or turn off regulatedVenuesOnly).",
        }
    }

    // Score-weighted fractions, capped per pool (water-filling keeps sum == 1).
    const fractions = capAndNormalize(eligible.map((x) => x.score), maxFraction)

    const allocations: AllocationLeg[] = eligible.map((x, i) => {
        const fraction = fractions[i]
        const amount = params.amount * fraction
        return {
            pool_id: x.pool.pool_id,
            protocol: x.pool.protocol_name,
            pool_name: x.pool.pool_name,
            stablecoin: x.pool.stablecoin,
            chain: x.pool.chain,
            apy: x.pool.apy,
            tvl_usd: x.pool.tvl,
            fraction,
            amount,
            expected_yearly: amount * (x.pool.apy / 100),
            risk: summarizeRisk(x.pool),
            compliance: x.compliance,
            action: "deposit",
        }
    })

    const blendedApy = allocations.reduce((s, a) => s + a.fraction * a.apy, 0)

    return {
        currency: params.currency,
        amount: params.amount,
        allocations,
        blended_apy: blendedApy,
        expected_yearly_total: params.amount * (blendedApy / 100),
        policy_applied: { ...effectivePolicy, maxAllocationFraction: maxFraction, maxPositions },
        jurisdiction,
        advisory: rule.advisory,
        excluded_by_jurisdiction: excludedByJurisdiction,
        note:
            "Non-custodial recommendation. Rendite holds no funds and signs nothing — " +
            "the agent executes each deposit from its own wallet. Projections are simple " +
            "(non-compounding) and not guaranteed.",
    }
}
