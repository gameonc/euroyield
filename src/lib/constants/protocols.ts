/**
 * Protocol constants for position detection
 * These are the receipt tokens (aTokens, vault shares, LP tokens) that indicate a user has a position
 */

import { Address } from "viem"

export const CHAINS = {
    MAINNET: 1,
    OPTIMISM: 10,
    POLYGON: 137,
    ARBITRUM: 42161,
    BASE: 8453,
} as const

export type ChainId = typeof CHAINS[keyof typeof CHAINS]

export interface ProtocolPosition {
    protocol: string
    protocolSlug: string
    poolName: string
    asset: string // The underlying Euro stablecoin
    receiptToken: Address // The token the user holds to represent their position
    decimals: number
    chainId: ChainId
    poolId?: string // DefiLlama pool ID for APY matching
}

/**
 * Aave V3 aTokens for Euro stablecoins
 * Users hold aTokens which represent their deposit + accrued interest
 */
export const AAVE_V3_POSITIONS: ProtocolPosition[] = [
    // Ethereum Mainnet
    {
        protocol: "Aave V3",
        protocolSlug: "aave-v3",
        poolName: "EURC Supply",
        asset: "EURC",
        receiptToken: "0x018C56f6d7BD63D0E100f247b436E06a7156fF75", // aEthEURC (Aave v3 Ethereum)
        decimals: 6,
        chainId: CHAINS.MAINNET,
    },
    // Arbitrum
    {
        protocol: "Aave V3",
        protocolSlug: "aave-v3",
        poolName: "EURC Supply",
        asset: "EURC",
        receiptToken: "0xf7F30a42d0E9a39E3e62e40E76C4149B7A7C0c41", // aArbEURC
        decimals: 6,
        chainId: CHAINS.ARBITRUM,
    },
    // Base
    {
        protocol: "Aave V3",
        protocolSlug: "aave-v3",
        poolName: "EURC Supply",
        asset: "EURC",
        receiptToken: "0x846D2EDF8C49E5eFA1Ea59e0B2Cb6aea5757F79d", // aBaseEURC
        decimals: 6,
        chainId: CHAINS.BASE,
    },
    // Polygon (agEUR)
    {
        protocol: "Aave V3",
        protocolSlug: "aave-v3",
        poolName: "agEUR Supply",
        asset: "agEUR",
        receiptToken: "0xeb76E693F0a558754Acc4602D941635f165949b8", // aPolAgEUR
        decimals: 18,
        chainId: CHAINS.POLYGON,
    },
]

/**
 * Morpho Blue Vaults (MetaMorpho)
 * Users deposit into curated vaults that allocate across Morpho Blue markets
 */
export const MORPHO_POSITIONS: ProtocolPosition[] = [
    // Steakhouse EURC vault on Ethereum
    {
        protocol: "Morpho Blue",
        protocolSlug: "morpho-blue",
        poolName: "Steakhouse EURC",
        asset: "EURC",
        receiptToken: "0xe8be52A78eB3dB69fFB69e0fB66E37b8B5da01C0", // MetaMorpho EURC vault
        decimals: 6,
        chainId: CHAINS.MAINNET,
    },
    // Base EURC vault
    {
        protocol: "Morpho Blue",
        protocolSlug: "morpho-blue",
        poolName: "EURC Vault",
        asset: "EURC",
        receiptToken: "0xF24608E0CCb972b0b0f4A6446a0BBf58C701a026", // Morpho EURC on Base
        decimals: 6,
        chainId: CHAINS.BASE,
    },
]

/**
 * Curve LP tokens for Euro stablecoin pools
 * These are liquidity provider tokens representing shares in Curve pools
 */
export const CURVE_POSITIONS: ProtocolPosition[] = [
    // EURe/EURC pool on Ethereum (Curve)
    {
        protocol: "Curve Finance",
        protocolSlug: "curve-dex",
        poolName: "EURe/EURC",
        asset: "EURC",
        receiptToken: "0x69ACcb968B19a53790f43e57558F5E443A91aF22", // Curve EURe/EURC LP
        decimals: 18,
        chainId: CHAINS.MAINNET,
    },
    // 3EUR pool (agEUR/EURS/EURC) on Polygon
    {
        protocol: "Curve Finance",
        protocolSlug: "curve-dex",
        poolName: "3EUR Pool",
        asset: "agEUR",
        receiptToken: "0xAd326c253A84e9805559b73A08724e11E49ca651", // Curve 3EUR LP
        decimals: 18,
        chainId: CHAINS.POLYGON,
    },
]

/**
 * Yearn Finance Vaults
 * Users hold yTokens (yield-bearing tokens)
 */
export const YEARN_POSITIONS: ProtocolPosition[] = [
    // yvCurve-EURS-f (EURS vault) on Ethereum
    {
        protocol: "Yearn Finance",
        protocolSlug: "yearn-finance",
        poolName: "Curve EURS Factory",
        asset: "EURS",
        receiptToken: "0xD6A4180c819324A9E432CA07C689EcBF00088cd6",
        decimals: 18,
        chainId: CHAINS.MAINNET,
    },
]

/**
 * Moonwell Lending (Base)
 * Users hold mTokens
 */
export const MOONWELL_POSITIONS: ProtocolPosition[] = [
    // mEURC on Base
    {
        protocol: "Moonwell",
        protocolSlug: "moonwell-lending",
        poolName: "EURC Supply",
        asset: "EURC",
        receiptToken: "0xb682c840B5F4FC58B20769E691A6fa1305A501a2",
        decimals: 6,
        chainId: CHAINS.BASE,
    },
]

/**
 * Merkl yield opportunities (usually incentivized liquidity)
 * Often these are tracked via underlying LP tokens or specific vault positions
 */
export const MERKL_POSITIONS: ProtocolPosition[] = [
    // EURe incentivized positions on Base
    {
        protocol: "Merkl",
        protocolSlug: "merkl",
        poolName: "EURe Incentives",
        asset: "EURe",
        receiptToken: "0x0000000000000000000000000000000000000000", // Placeholder - Merkl uses underlying positions
        decimals: 18,
        chainId: CHAINS.BASE,
    },
]

/**
 * Fluid Lending (Instadapp)
 * Users hold fTokens representing their lending position
 */
export const FLUID_POSITIONS: ProtocolPosition[] = [
    // EURC lending on Base
    {
        protocol: "Fluid",
        protocolSlug: "fluid-lending",
        poolName: "EURC Lending",
        asset: "EURC",
        receiptToken: "0x1A996cb54bb95462040408C06122D45D6Cdb6096", // fEURC on Base
        decimals: 6,
        chainId: CHAINS.BASE,
    },
]

/**
 * Aerodrome Finance (Base DEX)
 * Users hold veAERO or LP tokens
 * Note: LP positions require checking gauge staking for full balance
 */
export const AERODROME_POSITIONS: ProtocolPosition[] = [
    // EURC/USDC Concentrated LP on Base
    {
        protocol: "Aerodrome",
        protocolSlug: "aerodrome-slipstream",
        poolName: "EURC/USDC CL Pool",
        asset: "EURC",
        receiptToken: "0x0B25c51637c43decd6CC1C1e3da4518D54ddb528", // Aerodrome CL EURC-USDC
        decimals: 18,
        chainId: CHAINS.BASE,
    },
]

/**
 * Convex Finance (Curve optimizer)
 * Users hold cvxLP tokens representing staked Curve LP
 */
export const CONVEX_POSITIONS: ProtocolPosition[] = [
    // USDC-EURS pool on Ethereum
    {
        protocol: "Convex",
        protocolSlug: "convex-finance",
        poolName: "USDC-EURS",
        asset: "EURS",
        receiptToken: "0x19b080FE1ffA0553469D20Ca36219F17Fcf03859", // Convex USDC/EURS
        decimals: 18,
        chainId: CHAINS.MAINNET,
    },
]

/**
 * Beefy Finance (Multi-chain vault optimizer)
 * Users hold mooTokens
 */
export const BEEFY_POSITIONS: ProtocolPosition[] = [
    // Aerodrome EURC/USDC vault on Base
    {
        protocol: "Beefy",
        protocolSlug: "beefy",
        poolName: "Aerodrome EURC-USDC",
        asset: "EURC",
        receiptToken: "0x8F89a7bB0F0DB6c0e41C0c8b12b4c548b0f4e7D1", // mooAerodromeEURC-USDC
        decimals: 18,
        chainId: CHAINS.BASE,
    },
]

/**
 * Radiant V2 (Cross-chain lending)
 * Users hold rTokens
 */
export const RADIANT_POSITIONS: ProtocolPosition[] = [
    // EURC lending on Base
    {
        protocol: "Radiant",
        protocolSlug: "radiant-v2",
        poolName: "EURC Supply",
        asset: "EURC",
        receiptToken: "0x2bDB7C534E82562D872B4e42e21Ed1a75D78e633", // rEURC on Base
        decimals: 6,
        chainId: CHAINS.BASE,
    },
]

/**
 * All protocol positions combined for batch queries
 */
export const ALL_PROTOCOL_POSITIONS: ProtocolPosition[] = [
    ...AAVE_V3_POSITIONS,
    ...MORPHO_POSITIONS,
    ...CURVE_POSITIONS,
    ...YEARN_POSITIONS,
    ...MOONWELL_POSITIONS,
    ...FLUID_POSITIONS,
    ...AERODROME_POSITIONS,
    ...CONVEX_POSITIONS,
    ...BEEFY_POSITIONS,
    ...RADIANT_POSITIONS,
    // Note: Merkl positions are typically tracked differently (via underlying assets)
]

/**
 * Chain name mapping for display
 */
export const CHAIN_NAMES: Record<ChainId, string> = {
    [CHAINS.MAINNET]: "Ethereum",
    [CHAINS.OPTIMISM]: "Optimism",
    [CHAINS.POLYGON]: "Polygon",
    [CHAINS.ARBITRUM]: "Arbitrum",
    [CHAINS.BASE]: "Base",
}

/**
 * Protocol colors for UI
 */
export const PROTOCOL_COLORS: Record<string, string> = {
    "aave-v3": "#B6509E",
    "morpho-blue": "#2470FF",
    "morpho-v1": "#2470FF",
    "curve-dex": "#FF0000",
    "merkl": "#7B3FE4",
    "yearn-finance": "#006AE3",
    "moonwell-lending": "#e84142",
    "fluid-lending": "#2775CA", // Instadapp blue
    "aerodrome-slipstream": "#0052FF", // Aerodrome blue
    "aerodrome-v1": "#0052FF",
    "convex-finance": "#3A3A3A", // Convex dark
    "beefy": "#5A8F35", // Beefy green
    "radiant-v2": "#00BFFF", // Radiant cyan
    "uniswap-v3": "#FF007A", // Uniswap pink
    "pancakeswap-amm-v3": "#D1884F", // PancakeSwap orange
    "balancer-v3": "#1E1E1E", // Balancer dark
    "harvest-finance": "#F2A900", // Harvest gold
    "extra-finance-xlend": "#00C4B4", // Extra teal
}
