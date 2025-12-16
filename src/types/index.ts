/** Core type definitions for Rendite */

/** Supported Euro stablecoins */
export type EuroStablecoin = "EURC" | "EURS" | "eEUR" | "agEUR" | "cEUR"

/** Supported blockchain networks */
export type Chain = "ethereum" | "arbitrum" | "optimism" | "polygon" | "base"

/** Risk tag types - binary signals, not numeric scores */
export type RiskTagType =
    | "audited"
    | "unaudited"
    | "high_tvl"
    | "low_tvl"
    | "established"
    | "new_protocol"

export interface RiskTag {
    type: RiskTagType
    label: string
    description: string
    isPositive: boolean
}

/** Protocol information */
export interface Protocol {
    id: string
    name: string
    slug: string
    chain: Chain
    iconUrl?: string
    website?: string
    riskTags: RiskTag[]
}

/** A yield opportunity (pool) */
export interface YieldPool {
    id: string
    protocol: Protocol
    stablecoin: EuroStablecoin
    poolName: string
    apy: number // Percentage, e.g., 5.25 = 5.25%
    tvl: number // In EUR
    chain: Chain
    riskTags: RiskTag[]
    lastUpdated: Date
    source: string // e.g., "DeFiLlama", "Aave Subgraph"
}

/** User alert configuration */
export interface Alert {
    id: string
    userId: string
    poolId?: string // Optional: specific pool
    condition: AlertCondition
    channels: AlertChannel[]
    isActive: boolean
    createdAt: Date
}

export type AlertCondition =
    | { type: "apy_above"; threshold: number }
    | { type: "apy_below"; threshold: number }
    | { type: "tvl_drop"; percentageThreshold: number }

export type AlertChannel = "email" | "telegram"

/** Subscription tiers */
export type SubscriptionTier = "free" | "pro" | "analyst" | "institutional"

/** User profile */
export interface User {
    id: string
    email?: string
    walletAddress?: string
    subscriptionTier: SubscriptionTier
    createdAt: Date
}
