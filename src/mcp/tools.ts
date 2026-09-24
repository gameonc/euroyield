/**
 * Rendite MCP tools — the stablecoin treasury yield brain, exposed to AI agents.
 *
 * The tool logic lives in `@/lib/agent/handlers` (the single source of truth shared
 * with the paid HTTP API at `/api/agent/*`); these registrations just declare the
 * MCP schemas and wrap the shared handlers' results in MCP content.
 *
 * Every tool is READ-ONLY. Rendite holds no funds, signs nothing, and requests
 * no token approvals — consistent with the product's non-custodial stance.
 */

import { z } from "zod"
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import * as handlers from "@/lib/agent/handlers"

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

/** Run a shared handler and wrap success/error into MCP content. */
async function run(fn: () => Promise<unknown>) {
    try {
        return json(await fn())
    } catch (err) {
        return fail(err instanceof Error ? err.message : String(err))
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
                "Return the highest-APY stablecoin yield opportunities right now (USD, EUR, " +
                "AED), optionally filtered by currency, stablecoin, chain, protocol, or " +
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
        async (input) => run(() => handlers.getBestYield(input))
    )

    // ---- compare_yields ----
    server.registerTool(
        "compare_yields",
        {
            title: "Compare stablecoin yields",
            description:
                "Return the full set of stablecoin yield pools matching the given filters, " +
                "sorted by APY (highest first). Use this to build a comparison table across " +
                "protocols, chains, and stablecoins.",
            inputSchema: filterShape,
        },
        async (input) => run(() => handlers.compareYields(input))
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
        async (input) => run(() => handlers.getProtocolRisk(input))
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
                    .describe("APY in percent. If omitted, the best matching pool's APY is used."),
                ...filterShape,
            },
        },
        async (input) => run(() => handlers.simulateYield(input))
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
        async (input) => run(() => handlers.readPositions(input.address))
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
        async (input) => run(() => handlers.recommendTreasuryAllocation(input))
    )
}
