
import { useReadContracts } from "wagmi"
import { erc20Abi, formatUnits } from "viem"
import { EURO_TOKENS, TokenConfig } from "../constants"
import { useAccount } from "wagmi"

export interface TokenBalance {
    symbol: string
    name: string
    balance: number
    value: number // Balance * Price (Assuming 1 EUR for now)
    chainId: number
    tokenAddress: string
}

export function useTokenBalances() {
    const { address } = useAccount()

    // 1. Construct the contract calls
    const contracts: any[] = []

    EURO_TOKENS.forEach(token => {
        Object.entries(token.addresses).forEach(([chainIdStr, tokenAddress]) => {
            const chainId = parseInt(chainIdStr)
            contracts.push({
                address: tokenAddress,
                abi: erc20Abi,
                functionName: 'balanceOf',
                args: [address],
                chainId: chainId
            })
        })
    })

    // 2. Fetch data
    const { data, isPending, error } = useReadContracts({
        contracts,
        query: {
            enabled: !!address,
            staleTime: 60_000, // 1 minute
        }
    })

    // 3. Process results
    const balances: TokenBalance[] = []
    let totalValue = 0

    if (data && address) {
        let index = 0
        EURO_TOKENS.forEach(token => {
            Object.entries(token.addresses).forEach(([chainIdStr, tokenAddress]) => {
                const chainId = parseInt(chainIdStr)
                const result = data[index]

                if (result && result.status === 'success') {
                    const rawBalance = result.result as bigint
                    const balance = parseFloat(formatUnits(rawBalance, token.decimals))

                    if (balance > 0) {
                        balances.push({
                            symbol: token.symbol,
                            name: token.name,
                            balance: balance,
                            value: balance, // Assume PEG = 1.0 for simplicity
                            chainId: chainId,
                            tokenAddress: tokenAddress
                        })
                        totalValue += balance
                    }
                }
                index++
            })
        })
    }

    return {
        balances,
        totalValue,
        isLoading: isPending,
        error
    }
}
