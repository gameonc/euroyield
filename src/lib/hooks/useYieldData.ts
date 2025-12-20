/**
 * useYieldData Hook
 * 
 * Fetches yield data from the API and provides utilities to match
 * protocol positions with their current APY.
 */

import { useState, useEffect, useCallback } from 'react'

export interface YieldPool {
    protocol: string
    pool: string
    asset: string
    chain: string
    apy: number
    tvl: number
    risk_tags: string[]
}

interface UseYieldDataReturn {
    yields: YieldPool[]
    isLoading: boolean
    error: Error | null
    refetch: () => Promise<void>
    getPoolApy: (protocolSlug: string, asset: string, chain: string) => number | null
    matchPositionToYield: (protocolSlug: string, asset: string, chain: string) => YieldPool | null
}

// Normalize protocol names for matching
function normalizeProtocol(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .replace('aavev3', 'aave')
        .replace('morphoblue', 'morpho')
        .replace('curvefinance', 'curve')
        .replace('curvedex', 'curve')
}

// Normalize chain names for matching
function normalizeChain(name: string): string {
    return name
        .toLowerCase()
        .replace('mainnet', 'ethereum')
}

export function useYieldData(): UseYieldDataReturn {
    const [yields, setYields] = useState<YieldPool[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const fetchYields = useCallback(async () => {
        setIsLoading(true)
        try {
            // Fetch from DefiLlama API directly (or your backend API)
            const response = await fetch('https://yields.llama.fi/pools')
            if (!response.ok) throw new Error('Failed to fetch yields')

            const data = await response.json()

            // Filter for Euro stablecoin pools
            const euroAssets = ['EURC', 'EURS', 'agEUR', 'eEUR', 'EURe', 'EURA']
            const targetChains = ['Ethereum', 'Arbitrum', 'Optimism', 'Base', 'Polygon']

            const filteredPools: YieldPool[] = data.data
                .filter((pool: { symbol: string; chain: string; tvlUsd: number }) => {
                    const hasEuroAsset = euroAssets.some(asset =>
                        pool.symbol.includes(asset) || pool.symbol.toUpperCase().includes(asset)
                    )
                    const isTargetChain = targetChains.includes(pool.chain)
                    const hasMinTvl = pool.tvlUsd > 10000
                    return hasEuroAsset && isTargetChain && hasMinTvl
                })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map((pool: any) => ({
                    protocol: pool.project,
                    pool: pool.symbol,
                    asset: pool.symbol,
                    chain: pool.chain.toLowerCase(),
                    apy: pool.apy || 0,
                    tvl: pool.tvlUsd,
                    risk_tags: [],
                }))

            setYields(filteredPools)
            setError(null)
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error'))
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchYields()
    }, [fetchYields])

    // Get APY for a specific position
    const getPoolApy = useCallback((protocolSlug: string, asset: string, chain: string): number | null => {
        const normalizedProtocol = normalizeProtocol(protocolSlug)
        const normalizedChain = normalizeChain(chain)

        const match = yields.find(pool => {
            const poolProtocol = normalizeProtocol(pool.protocol)
            const poolChain = normalizeChain(pool.chain)
            const poolHasAsset = pool.asset.toUpperCase().includes(asset.toUpperCase())

            return poolProtocol.includes(normalizedProtocol) &&
                poolChain === normalizedChain &&
                poolHasAsset
        })

        return match?.apy ?? null
    }, [yields])

    // Get full pool data for a position
    const matchPositionToYield = useCallback((protocolSlug: string, asset: string, chain: string): YieldPool | null => {
        const normalizedProtocol = normalizeProtocol(protocolSlug)
        const normalizedChain = normalizeChain(chain)

        return yields.find(pool => {
            const poolProtocol = normalizeProtocol(pool.protocol)
            const poolChain = normalizeChain(pool.chain)
            const poolHasAsset = pool.asset.toUpperCase().includes(asset.toUpperCase())

            return poolProtocol.includes(normalizedProtocol) &&
                poolChain === normalizedChain &&
                poolHasAsset
        }) ?? null
    }, [yields])

    return {
        yields,
        isLoading,
        error,
        refetch: fetchYields,
        getPoolApy,
        matchPositionToYield,
    }
}
