/**
 * usePortfolioData Hook
 * 
 * Combines protocol positions with yield data to provide complete
 * portfolio analytics including APY, daily/monthly earnings, and
 * yield optimization insights.
 */

import { useMemo } from 'react'
import { useProtocolPositions, type DetectedPosition } from './useProtocolPositions'
import { useYieldData } from './useYieldData'
import { useTokenBalances, type TokenBalance } from './useTokenBalances'

export interface EnrichedPosition extends DetectedPosition {
    apy: number
    dailyEarnings: number
    weeklyEarnings: number
    monthlyEarnings: number
    yearlyEarnings: number
    yieldSource: 'matched' | 'estimated' // Did we find exact APY or estimate?
}

export interface PortfolioSummary {
    // Positions in protocols (earning yield)
    positions: EnrichedPosition[]
    positionCount: number
    totalPositionValue: number

    // Raw balances (not in protocols)
    rawBalances: TokenBalance[]
    totalRawValue: number

    // Combined totals
    totalValue: number

    // Yield metrics
    weightedApy: number
    dailyEarnings: number
    weeklyEarnings: number
    monthlyEarnings: number
    yearlyEarnings: number

    // Optimization insights
    idleCapital: number // Money not earning yield
    potentialDailyGain: number // If idle capital earned avg APY

    // Status
    isLoading: boolean
    hasError: boolean
}

// Default estimated APY when we can't match to DefiLlama
const DEFAULT_ESTIMATED_APY = 3.5

export function usePortfolioData(): PortfolioSummary {
    const { positions, isLoading: positionsLoading, error: positionsError } = useProtocolPositions()
    const { getPoolApy, isLoading: yieldsLoading } = useYieldData()
    const { balances: rawBalances, totalValue: totalRawValue, isLoading: balancesLoading } = useTokenBalances()

    const enrichedData = useMemo(() => {
        // Enrich positions with APY and earnings data
        const enrichedPositions: EnrichedPosition[] = positions.map(position => {
            // Try to match with DefiLlama yield data
            const matchedApy = getPoolApy(position.protocolSlug, position.asset, position.chain)
            const apy = matchedApy ?? DEFAULT_ESTIMATED_APY
            const yieldSource = matchedApy !== null ? 'matched' : 'estimated'

            // Calculate earnings
            const yearlyEarnings = position.balance * (apy / 100)
            const monthlyEarnings = yearlyEarnings / 12
            const weeklyEarnings = yearlyEarnings / 52
            const dailyEarnings = yearlyEarnings / 365

            return {
                ...position,
                apy,
                dailyEarnings,
                weeklyEarnings,
                monthlyEarnings,
                yearlyEarnings,
                yieldSource,
            }
        })

        // Calculate totals
        const totalPositionValue = enrichedPositions.reduce((sum, p) => sum + p.balance, 0)
        const totalValue = totalPositionValue + totalRawValue

        // Weighted APY calculation
        let weightedApy = 0
        if (totalPositionValue > 0) {
            const weightedSum = enrichedPositions.reduce((sum, p) => sum + (p.apy * p.balance), 0)
            weightedApy = weightedSum / totalPositionValue
        }

        // Aggregate earnings
        const dailyEarnings = enrichedPositions.reduce((sum, p) => sum + p.dailyEarnings, 0)
        const weeklyEarnings = enrichedPositions.reduce((sum, p) => sum + p.weeklyEarnings, 0)
        const monthlyEarnings = enrichedPositions.reduce((sum, p) => sum + p.monthlyEarnings, 0)
        const yearlyEarnings = enrichedPositions.reduce((sum, p) => sum + p.yearlyEarnings, 0)

        // Idle capital analysis
        const idleCapital = totalRawValue // Raw balances are "idle"
        const potentialDailyGain = idleCapital > 0
            ? (idleCapital * (weightedApy > 0 ? weightedApy : DEFAULT_ESTIMATED_APY) / 100) / 365
            : 0

        return {
            positions: enrichedPositions,
            positionCount: enrichedPositions.length,
            totalPositionValue,
            rawBalances,
            totalRawValue,
            totalValue,
            weightedApy,
            dailyEarnings,
            weeklyEarnings,
            monthlyEarnings,
            yearlyEarnings,
            idleCapital,
            potentialDailyGain,
        }
    }, [positions, getPoolApy, rawBalances, totalRawValue])

    const isLoading = positionsLoading || yieldsLoading || balancesLoading
    const hasError = !!positionsError

    return {
        ...enrichedData,
        isLoading,
        hasError,
    }
}
