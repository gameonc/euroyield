import { YieldAdapter, YieldData } from "./types"

interface LlamaPool {
    chain: string
    project: string
    symbol: string
    tvlUsd: number // Note: This is USD, ideally we want EUR but USD is close enough for sorting or we can convert
    apy: number
    id: string
}

const TARGET_ASSETS = ["EURC", "EURS", "agEUR"]
const TARGET_CHAINS = ["Ethereum", "Arbitrum", "Optimism", "Base", "Polygon"]

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

            // Filter for Euro stablecoins
            const euroPools = data.filter(pool =>
                TARGET_ASSETS.includes(pool.symbol) &&
                TARGET_CHAINS.includes(pool.chain) &&
                pool.tvlUsd > 10000 // Filter out dust
            )

            console.log(`Found ${euroPools.length} Euro pools. Mapping to standard format...`)

            return euroPools.map(pool => ({
                protocol: pool.project,
                pool: pool.symbol, // Use symbol as pool name for simplicity, or project specific
                asset: pool.symbol,
                chain: pool.chain.toLowerCase(),
                apy: pool.apy,
                tvl: pool.tvlUsd, // Keeping as USD for now, or assume 1:1 for rough sorting
                risk_tags: this.getRiskTags(pool.project, pool.apy)
            }))

        } catch (error) {
            console.error("Error fetching DeFiLlama data:", error)
            return []
        }
    }

    private getRiskTags(protocol: string, apy: number): string[] {
        const tags: string[] = []
        if (apy > 10) tags.push("High Yield")
        if (["Aave V3", "Compound V3", "Morpho Blue"].includes(protocol)) tags.push("Audited")
        if (protocol.includes("Uniswap")) tags.push("Impermanent Loss")
        return tags
    }
}
