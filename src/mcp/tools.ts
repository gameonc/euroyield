/**
 * Rendite MCP tools — the euro-stablecoin yield brain, exposed to AI agents.
 *
 * These handlers are transport-agnostic: `registerRenditeTools` attaches them
 * to any McpServer instance, so the same logic backs the stdio server today
 * and a hosted HTTP transport in Phase 2 (metered / x402).
 *
 * Every tool is READ-ONLY. Rendite holds no funds, signs nothing, and requests
 * no token approvals — consistent with the product's non-custodial stance.
 */

import { z } from "zod"
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
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

/** Wrap a JSON-serializable value as an MCP text tool result. */
function json(value: unknown) {
    return {
        content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }],
    }
}

/** Wrap an error as an MCP error tool result. */
function fail(message: string) {
    return {
        isError: true,
        content: [{ type: "text" as const, text: message }],
    }
}

/** Project a raw view row into a compact, agent-friendly shape. */
function toPoolSummary(pool: LatestYield) {
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

// Shared filter shape reused by several tools.
const filterShape = {
    currency: z
        .enum(["USD", "EUR", "AED"])
        .optional()
        .describe("Fiat denomination to match: USD, EUR, or AED."),
    stablecoin: z
        .string()
        .optional()
        .describe("Stablecoin symbol to match, e.g. USDC, USDT, DAI, EURC."),
    chain: z
        .string()
        .optional()
        .describe("Chain to match: ethereum, arbitrum, optimism, polygon, or base."),
    protocol: z
        .string()
        .optional()
        .describe("Protocol name substring, e.g. 'aave', 'morpho'."),
    minApy: z.number().optional().describe("Minimum APY in percent."),
    minTvl: z.number().optional().describe("Minimum TVL in USD."),
    auditedOnly: z
        .boolean()
        .optional()
        .describe("If true, only include pools whose protocol is audited."),
}

function toFilter(input: Record<string, unknown>): YieldFilter {
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

/**
 * Register all Rendite yield tools onto an MCP server instance.
 */
export function registerRenditeTools(server: McpServer): void {
    // ---- get_best_yield ----
    server.registerTool(
        "get_best_yield",
        {
            title: "Get best stablecoin yield",
            description:
                "Return the highest-APY stablecoin yield opportunities right now (USD and " +
                "EUR), optionally filtered by currency, stablecoin, chain, protocol, or " +
                "audited-only. Use this to answer 'where should idle stablecoins earn the " +
                "most yield?'.",
            inputSchema: {
                ...filterShape,
                limit: z
                    .number()
                    .int()
                    .min(1)
                    .max(50)
                    .optional()
                    .describe("How many top pools to return (default 3)."),
            },
        },
        async (input) => {
            try {
                const all = await fetchLatestYields()
                const filtered = filterYields(all, toFilter(input))
                const best = topYields(filtered, input.limit ?? 3)
                return json({
                    count: best.length,
                    pools: best.map(toPoolSummary),
                })
            } catch (err) {
                return fail(err instanceof Error ? err.message : String(err))
            }
        }
    )

    // ---- compare_yields ----
    server.registerTool(
        "compare_yields",
        {
            title: "Compare stablecoin yields",
            description:
                "Return the full set of stablecoin yield pools matching the given filters " +
                "(USD and EUR), sorted by APY (highest first). Use this to build a " +
                "comparison table across protocols, chains, and stablecoins.",
            inputSchema: filterShape,
        },
        async (input) => {
            try {
                const all = await fetchLatestYields()
                const filtered = filterYields(all, toFilter(input))
                return json({
                    count: filtered.length,
                    pools: filtered.map(toPoolSummary),
                })
            } catch (err) {
                return fail(err instanceof Error ? err.message : String(err))
            }
        }
    )

    // ---- get_protocol_risk ----
    server.registerTool(
        "get_protocol_risk",
        {
            title: "Get plain-English risk for yield pools",
            description:
                "Return a plain-English risk summary (audit status, liquidity depth, " +
                "APY sustainability, and flags) for the stablecoin yield pools matching " +
                "the filters. Use this before recommending a pool to a user.",
            inputSchema: filterShape,
        },
        async (input) => {
            try {
                const all = await fetchLatestYields()
                const filtered = filterYields(all, toFilter(input))
                return json({
                    count: filtered.length,
                    pools: filtered.map((pool) => ({
                        ...toPoolSummary(pool),
                        risk: summarizeRisk(pool),
                    })),
                })
            } catch (err) {
                return fail(err instanceof Error ? err.message : String(err))
            }
        }
    )

    // ---- simulate_yield ----
    server.registerTool(
        "simulate_yield",
        {
            title: "Simulate stablecoin yield earnings",
            description:
                "Project daily / monthly / yearly earnings for a stablecoin deposit. Provide " +
                "an explicit `apy`, or let the tool use the best available APY matching the " +
                "given filters. Non-compounding, illustrative only.",
            inputSchema: {
                amount: z.number().positive().describe("Deposit amount (in the pool's currency)."),
                apy: z
                    .number()
                    .optional()
                    .describe(
                        "APY in percent. If omitted, the best matching pool's APY is used."
                    ),
                ...filterShape,
            },
        },
        async (input) => {
            try {
                let apy = input.apy
                let sourcePool: LatestYield | undefined

                if (apy == null) {
                    const all = await fetchLatestYields()
                    const filtered = filterYields(all, toFilter(input))
                    sourcePool = topYields(filtered, 1)[0]
                    if (!sourcePool) {
                        return fail(
                            "No pool matches the given filters and no explicit apy was provided."
                        )
                    }
                    apy = sourcePool.apy
                }

                return json({
                    amount: input.amount,
                    apy,
                    apy_source: sourcePool ? toPoolSummary(sourcePool) : "explicit",
                    projection: projectYield(input.amount, apy),
                    note: "Non-compounding, illustrative projection. Returns are not guaranteed.",
                })
            } catch (err) {
                return fail(err instanceof Error ? err.message : String(err))
            }
        }
    )

    // ---- read_stablecoin_positions ----
    server.registerTool(
        "read_stablecoin_positions",
        {
            title: "Read on-chain stablecoin positions for an address",
            description:
                "Read-only lookup of an EVM address's stablecoin holdings (USD + EUR) across " +
                "supported chains: idle wallet balances (the 'float' sitting still) and " +
                "active yield positions. Never signs or moves funds.",
            inputSchema: {
                address: z
                    .string()
                    .describe("EVM address (0x...) to inspect. Read-only; never signed."),
            },
        },
        async (input) => {
            try {
                const result = await readStablecoinPositions(input.address)
                return json(result)
            } catch (err) {
                return fail(err instanceof Error ? err.message : String(err))
            }
        }
    )

    // ---- recommend_treasury_allocation (the decision layer) ----
    server.registerTool(
        "recommend_treasury_allocation",
        {
            title: "Recommend a non-custodial treasury allocation",
            description:
                "The decision layer: given an amount of idle stablecoin and a risk policy, " +
                "return a risk-scored, diversified allocation across the best pools — as a " +
                "non-custodial intent the agent executes from its own wallet. Rendite holds " +
                "no funds and signs nothing.",
            inputSchema: {
                amount: z.number().positive().describe("Idle amount to allocate."),
                currency: z
                    .enum(["USD", "EUR", "AED"])
                    .default("USD")
                    .describe("Denomination to allocate within (USD, EUR, or AED)."),
                jurisdiction: z
                    .enum(["EU", "UAE", "US", "GLOBAL"])
                    .default("GLOBAL")
                    .describe(
                        "Regulatory jurisdiction whose compliance rules apply (EU=MiCA, " +
                        "UAE=VARA/ADGM, US, or GLOBAL). Sets audit defaults + advisory."
                    ),
                regulatedVenuesOnly: z
                    .boolean()
                    .optional()
                    .describe("Restrict to the jurisdiction's regulated-venue allowlist."),
                requireAudited: z
                    .boolean()
                    .optional()
                    .describe("Only allocate to audited protocols (defaults per jurisdiction)."),
                minTvlUsd: z.number().optional().describe("Minimum pool TVL in USD."),
                chains: z
                    .array(z.string())
                    .optional()
                    .describe("Allowed chains (e.g. ['base','arbitrum']). Omit for all."),
                maxPositions: z
                    .number()
                    .int()
                    .min(1)
                    .max(10)
                    .optional()
                    .describe("Max pools to spread across (default 3)."),
                maxAllocationFraction: z
                    .number()
                    .min(0.1)
                    .max(1)
                    .optional()
                    .describe("Max fraction of the total in any one pool (default 0.5)."),
            },
        },
        async (input) => {
            try {
                const all = await fetchLatestYields()
                const currency = input.currency ?? "USD"
                const pools = filterYields(all, { currency })
                const policy: RiskPolicy = {
                    jurisdiction: input.jurisdiction ?? "GLOBAL",
                    regulatedVenuesOnly: input.regulatedVenuesOnly,
                    requireAudited: input.requireAudited,
                    minTvlUsd: input.minTvlUsd,
                    chains: input.chains,
                    maxPositions: input.maxPositions,
                    maxAllocationFraction: input.maxAllocationFraction,
                }
                return json(recommendAllocation(pools, { amount: input.amount, currency, policy }))
            } catch (err) {
                return fail(err instanceof Error ? err.message : String(err))
            }
        }
    )
}
