import { YieldAdapter, YieldData } from "./types"
import type { RiskTag } from "@/types/database"

interface LlamaPool {
    chain: string
    project: string
    symbol: string
    tvlUsd: number // Note: This is USD, ideally we want EUR but USD is close enough for sorting or we can convert
    apy: number
    id: string
}

// Euro stablecoins to track
const EUR_ASSETS = [
    "EURC",   // Circle Euro (most liquid)
    "EURS",   // Stasis Euro
    "agEUR",  // Angle Euro (now EURA)
    "EURA",   // Angle Euro (rebranded)
    "EURe",   // Monerium Euro
    "sEUR",   // Synthetix Euro
    "JEUR",   // Jarvis Euro
    "cEUR",   // Celo Euro
]

// USD stablecoins to track (the larger agent-treasury market)
const USD_ASSETS = [
    "USDC",
    "USDT",
    "DAI",
    "USDS",   // Sky (ex-MakerDAO)
    "sDAI",   // Savings DAI
    "PYUSD",  // PayPal USD
    "GHO",    // Aave USD
    "crvUSD", // Curve USD
    "FRAX",
    "USDe",   // Ethena
]

const TARGET_ASSETS = [...EUR_ASSETS, ...USD_ASSETS]
const TARGET_CHAINS = ["Ethereum", "Arbitrum", "Optimism", "Base", "Polygon", "Gnosis"]

/**
 * Classify a pool symbol's fiat denomination. Euro takes precedence when a
 * symbol contains both (e.g. an EURC/USDC LP is treated as euro-side exposure).
 */
function detectCurrency(symbol: string): "USD" | "EUR" {
    return EUR_ASSETS.some((a) => symbol.includes(a)) ? "EUR" : "USD"
}

/** The specific tracked stablecoin symbol present in a pool symbol. */
function detectStablecoin(symbol: string): string {
    return TARGET_ASSETS.find((a) => symbol.includes(a)) ?? symbol
}

// Well-known audited protocols (matched case-insensitively as a substring of the
// DeFiLlama project name). Conservative: only mark audited when we are confident.
const AUDITED_PROTOCOLS = [
    "aave",
    "compound",
    "morpho",
    "curve",
    "convex",
    "yearn",
    "balancer",
    "uniswap",
    "fluid",
    "moonwell",
    "aerodrome",
    "beefy",
]

function isAuditedProtocol(project: string): boolean {
    const p = project.toLowerCase()
    return AUDITED_PROTOCOLS.some((name) => p.includes(name))
}

export class DeFiLlamaAdapter implements YieldAdapter {
    name = "DeFiLlama"

    async fetchYields(): Promise<YieldData[]> {
        console.log("Fetching data from DeFiLlama...")
        try {
            const response = await fetch("https://yields.llama.fi/pools")
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.statusText}`)
            }
            const payload = await response.json()
            const data = payload.data as LlamaPool[]

            // Filter for tracked stablecoins (USD + EUR) on target chains.
            const matchedPools = data.filter(pool =>
                TARGET_ASSETS.some(asset => pool.symbol?.includes(asset)) &&
                TARGET_CHAINS.includes(pool.chain) &&
                pool.tvlUsd > 10000 // Filter out dust
            )

            console.log(`Found ${matchedPools.length} stablecoin pools. Mapping to standard format...`)

            return matchedPools.map(pool => ({
                protocol: pool.project,
                pool: pool.symbol, // Full symbol as pool name (e.g. "USDC-DAI")
                asset: detectStablecoin(pool.symbol), // The specific tracked coin
                currency: detectCurrency(pool.symbol),
                chain: pool.chain.toLowerCase(),
                apy: pool.apy,
                tvl: pool.tvlUsd, // USD (DeFiLlama tvlUsd) — labeled as USD downstream
                risk_tags: this.getRiskTags(pool.project, pool.tvlUsd),
                is_audited: isAuditedProtocol(pool.project),
            }))

        } catch (error) {
            console.error("Error fetching DeFiLlama data:", error)
            return []
        }
    }

    // Structured risk tags matching the RiskTag shape used across the app
    // (src/types/database.ts + RiskBadge). Note: tvl is USD.
    private getRiskTags(protocol: string, tvlUsd: number): RiskTag[] {
        const tags: RiskTag[] = []

        if (isAuditedProtocol(protocol)) {
            tags.push({
                type: "audited",
                label: "Audited",
                description: "Well-known protocol with public security audits.",
                isPositive: true,
            })
        } else {
            tags.push({
                type: "unaudited",
                label: "Unaudited",
                description: "No known public audit — higher smart-contract risk.",
                isPositive: false,
            })
        }

        if (tvlUsd >= 10_000_000) {
            tags.push({
                type: "high_tvl",
                label: "High TVL",
                description: "Deep liquidity (TVL ≥ $10M).",
                isPositive: true,
            })
        } else if (tvlUsd < 1_000_000) {
            tags.push({
                type: "low_tvl",
                label: "Low TVL",
                description: "Thin liquidity (TVL < $1M) — higher exit risk.",
                isPositive: false,
            })
        }

        return tags
    }
}
