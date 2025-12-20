/**
 * useProtocolPositions Hook
 * 
 * Detects user positions across DeFi protocols by querying receipt tokens
 * (aTokens, vault shares, LP tokens) that indicate deposits earning yield.
 */

import { useReadContracts, useAccount } from "wagmi"
import { erc20Abi, formatUnits, type Address } from "viem"
import {
    ALL_PROTOCOL_POSITIONS,
    CHAIN_NAMES,
    type ChainId
} from "../constants/protocols"

export interface DetectedPosition {
    id: string
    protocol: string
    protocolSlug: string
    poolName: string
    asset: string
    chain: string
    chainId: ChainId
    balance: number // Formatted balance
    rawBalance: bigint
    receiptToken: Address
    // These will be populated when matched with yield data
    apy?: number
    dailyEarnings?: number
    monthlyEarnings?: number
}

interface BalanceCall {
    address: Address
    abi: typeof erc20Abi
    functionName: 'balanceOf'
    args: readonly [Address]
    chainId: number
}

export function useProtocolPositions() {
    const { address, isConnected } = useAccount()

    // Build batch contract calls for all protocol positions
    const contracts: BalanceCall[] = ALL_PROTOCOL_POSITIONS.map(position => ({
        address: position.receiptToken,
        abi: erc20Abi,
        functionName: 'balanceOf' as const,
        args: [address as Address] as const,
        chainId: position.chainId,
    }))

    // Execute batch read
    const { data, isPending, error, refetch } = useReadContracts({
        contracts,
        query: {
            enabled: isConnected && !!address,
            staleTime: 30_000, // 30 seconds
            refetchInterval: 60_000, // Refresh every minute
        }
    })

    // Process results into detected positions
    const positions: DetectedPosition[] = []
    let totalValue = 0

    if (data && address) {
        ALL_PROTOCOL_POSITIONS.forEach((position, index) => {
            const result = data[index]

            if (result && result.status === 'success') {
                const rawBalance = result.result as bigint
                const balance = parseFloat(formatUnits(rawBalance, position.decimals))

                // Only include positions with non-zero balances
                if (balance > 0.01) { // Filter dust
                    const positionId = `${position.protocolSlug}-${position.asset}-${position.chainId}`

                    positions.push({
                        id: positionId,
                        protocol: position.protocol,
                        protocolSlug: position.protocolSlug,
                        poolName: position.poolName,
                        asset: position.asset,
                        chain: CHAIN_NAMES[position.chainId],
                        chainId: position.chainId,
                        balance,
                        rawBalance,
                        receiptToken: position.receiptToken,
                    })

                    // Assume 1:1 EUR value for Euro stablecoins
                    totalValue += balance
                }
            }
        })
    }

    // Sort by balance descending
    positions.sort((a, b) => b.balance - a.balance)

    return {
        positions,
        totalValue,
        positionCount: positions.length,
        isLoading: isPending,
        error,
        refetch,
        isConnected,
    }
}
