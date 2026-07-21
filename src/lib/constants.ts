
import { Address } from "viem"

export type TokenConfig = {
    symbol: string
    name: string
    decimals: number
    addresses: Record<number, Address> // ChainID -> Address
}

// Chain IDs
export const CHAINS = {
    MAINNET: 1,
    OPTIMISM: 10,
    POLYGON: 137,
    ARBITRUM: 42161,
    BASE: 8453,
} as const

// USD stablecoins — the larger agent-treasury market. Native deployments.
export const USD_TOKENS: TokenConfig[] = [
    {
        symbol: "USDC",
        name: "USD Coin",
        decimals: 6,
        addresses: {
            [CHAINS.MAINNET]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            [CHAINS.OPTIMISM]: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
            [CHAINS.POLYGON]: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
            [CHAINS.ARBITRUM]: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
            [CHAINS.BASE]: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        },
    },
    {
        symbol: "USDT",
        name: "Tether USD",
        decimals: 6,
        addresses: {
            [CHAINS.MAINNET]: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            [CHAINS.OPTIMISM]: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
            [CHAINS.POLYGON]: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
            [CHAINS.ARBITRUM]: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        },
    },
    {
        symbol: "DAI",
        name: "Dai Stablecoin",
        decimals: 18,
        addresses: {
            [CHAINS.MAINNET]: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
            [CHAINS.OPTIMISM]: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
            [CHAINS.POLYGON]: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
            [CHAINS.ARBITRUM]: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
            [CHAINS.BASE]: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
        },
    },
]

export const EURO_TOKENS: TokenConfig[] = [
    {
        symbol: "EURC",
        name: "Circle Euro",
        decimals: 6,
        addresses: {
            [CHAINS.MAINNET]: "0x1aBaEA1f7C830bD89Acc67eC4af516296b1Cd299",
            [CHAINS.ARBITRUM]: "0xB2EA51BAa12C461327d12A2069d47b30e680b69D", // Verify
            [CHAINS.OPTIMISM]: "0x0FA4dED7DCCEd6e4487D7DD35003126DfC937c87",
            [CHAINS.POLYGON]: "0x986bcce2989b14798031d1af7c2718cd99818814", // Bridged or native? Native on Polygon PoS is usually different or absent. Let's use Base instead?
            [CHAINS.BASE]: "0x60a3E35Cc302bFA4472857E6e5602BCF86897f9B"
        }
    },
    {
        symbol: "EURS",
        name: "Stasis Euro",
        decimals: 2, // Check this! EURS is often 2 decimals.
        addresses: {
            [CHAINS.MAINNET]: "0xdb25f211ab05b1c97d595516f45794528a807ad8",
            [CHAINS.POLYGON]: "0xE111178A87A3BFf0c8d18DECBa5798827539Ae99",
            [CHAINS.ARBITRUM]: "0xD22100808a38F5F58C0897fFA47796d1D5fD4877",
        }
    },
    {
        symbol: "agEUR", // Now usually stEUR or similar, but let's stick to agEUR (Angle)
        name: "Angle Euro",
        decimals: 18,
        addresses: {
            [CHAINS.MAINNET]: "0x1a7e4e63778b4f12a199c062f3efdd288afcbce8",
            [CHAINS.OPTIMISM]: "0x9485aca5bbBE1667AD97c7fE7C4531a624C8b1ED",
            [CHAINS.POLYGON]: "0xE0B52e49357Fd4DAf2c15e02058DCE6BC0057db4",
            [CHAINS.ARBITRUM]: "0xFA5Ed56A203466CbBC2430a43c66b9D8723528E7",
        }
    }
]

/** All tracked stablecoins (USD + EUR) for idle-balance reads. */
export const STABLE_TOKENS: TokenConfig[] = [...USD_TOKENS, ...EURO_TOKENS]

/** Currency ("USD" | "EUR") for a wallet-token symbol. */
export function tokenCurrency(symbol: string): "USD" | "EUR" {
    return EURO_TOKENS.some((t) => t.symbol === symbol) ? "EUR" : "USD"
}
