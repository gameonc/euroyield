export interface YieldData {
    protocol: string
    pool: string
    asset: string
    chain: string
    apy: number
    tvl: number
    risk_tags: string[]
}

export interface YieldAdapter {
    name: string
    fetchYields(): Promise<YieldData[]>
}
