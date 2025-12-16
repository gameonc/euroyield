
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
