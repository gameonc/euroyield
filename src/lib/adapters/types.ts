import type { RiskTag, Currency } from "@/types/database"

export interface YieldData {
    protocol: string
    pool: string
    asset: string
    /** Fiat denomination of the stablecoin (USD or EUR). */
    currency: Currency
    chain: string
    apy: number
    tvl: number
    risk_tags: RiskTag[]
    /** Whether the protocol is a well-known audited protocol. */
    is_audited: boolean
}

export interface YieldAdapter {
    name: string
    fetchYields(): Promise<YieldData[]>
}
