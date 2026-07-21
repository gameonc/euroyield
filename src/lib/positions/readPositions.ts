/**
 * Server-side, read-only reader of euro-stablecoin holdings for an address.
 *
 * This is the non-React counterpart to the useTokenBalances /
 * useProtocolPositions hooks: it uses viem public clients (never a signer,
 * never an approval) so it can run inside the MCP server for agents.
 *
 * It reports two things an agent's treasury logic cares about:
 *   1. Idle wallet balances of euro stablecoins (the "float" sitting still).
 *   2. Active yield positions (receipt tokens across supported protocols).
 */

import {
    createPublicClient,
    http,
    erc20Abi,
    formatUnits,
    isAddress,
    getAddress,
    type Address,
    type Chain,
    type PublicClient,
} from "viem"
import { mainnet, optimism, polygon, arbitrum, base } from "viem/chains"
import { EURO_TOKENS } from "@/lib/constants"
import { ALL_PROTOCOL_POSITIONS, CHAIN_NAMES, type ChainId } from "@/lib/constants/protocols"

const CHAINS_BY_ID: Record<ChainId, Chain> = {
    1: mainnet,
    10: optimism,
    137: polygon,
    42161: arbitrum,
    8453: base,
}

// Reuse one public client per chain across calls.
const clientCache = new Map<ChainId, PublicClient>()

function getClient(chainId: ChainId): PublicClient {
    const cached = clientCache.get(chainId)
    if (cached) return cached

    const chain = CHAINS_BY_ID[chainId]
    // Allow an operator-supplied RPC override per chain, else viem's default.
    const rpcOverride = process.env[`RPC_URL_${chainId}`]
    const client = createPublicClient({
        chain,
        transport: http(rpcOverride || undefined),
    }) as PublicClient
    clientCache.set(chainId, client)
    return client
}

export interface WalletBalance {
    symbol: string
    name: string
    chain: string
    chainId: number
    tokenAddress: string
    balance: number
}

export interface YieldPositionBalance {
    protocol: string
    protocolSlug: string
    poolName: string
    asset: string
    chain: string
    chainId: number
    receiptToken: string
    balance: number
}

export interface EuroPositionsResult {
    address: string
    walletBalances: WalletBalance[]
    yieldPositions: YieldPositionBalance[]
    /** Idle euro stablecoins sitting in the wallet (assumes 1:1 EUR peg). */
    idleValue: number
    /** Value deployed into yield positions (assumes 1:1 EUR peg). */
    deployedValue: number
    /** idleValue + deployedValue. */
    totalValue: number
}

const DUST = 0.01

/** Group items by their chainId. */
function groupByChain<T extends { chainId: ChainId }>(items: T[]): Map<ChainId, T[]> {
    const map = new Map<ChainId, T[]>()
    for (const item of items) {
        const list = map.get(item.chainId) ?? []
        list.push(item)
        map.set(item.chainId, list)
    }
    return map
}

/**
 * Read idle wallet balances and active yield positions for `address`.
 * Purely read-only: builds balanceOf multicalls per chain.
 */
export async function readEuroPositions(address: string): Promise<EuroPositionsResult> {
    if (!isAddress(address)) {
        throw new Error(`Invalid EVM address: ${address}`)
    }
    const owner = getAddress(address)

    // --- 1. Idle wallet balances (flatten EURO_TOKENS into per-chain entries) ---
    interface TokenEntry {
        symbol: string
        name: string
        decimals: number
        chainId: ChainId
        tokenAddress: Address
    }
    const tokenEntries: TokenEntry[] = []
    for (const token of EURO_TOKENS) {
        for (const [chainIdStr, tokenAddress] of Object.entries(token.addresses)) {
            const chainId = Number(chainIdStr) as ChainId
            if (!CHAINS_BY_ID[chainId]) continue
            tokenEntries.push({
                symbol: token.symbol,
                name: token.name,
                decimals: token.decimals,
                chainId,
                tokenAddress: tokenAddress as Address,
            })
        }
    }

    const walletBalances: WalletBalance[] = []
    let idleValue = 0

    for (const [chainId, entries] of groupByChain(tokenEntries)) {
        const client = getClient(chainId)
        const results = await client.multicall({
            allowFailure: true,
            contracts: entries.map((e) => ({
                address: e.tokenAddress,
                abi: erc20Abi,
                functionName: "balanceOf" as const,
                args: [owner] as const,
            })),
        })
        entries.forEach((entry, i) => {
            const res = results[i]
            if (res.status !== "success") return
            const balance = parseFloat(formatUnits(res.result as bigint, entry.decimals))
            if (balance > DUST) {
                walletBalances.push({
                    symbol: entry.symbol,
                    name: entry.name,
                    chain: CHAIN_NAMES[entry.chainId],
                    chainId: entry.chainId,
                    tokenAddress: entry.tokenAddress,
                    balance,
                })
                idleValue += balance
            }
        })
    }

    // --- 2. Active yield positions (receipt tokens) ---
    const yieldPositions: YieldPositionBalance[] = []
    let deployedValue = 0

    for (const [chainId, positions] of groupByChain(ALL_PROTOCOL_POSITIONS)) {
        const client = getClient(chainId)
        const results = await client.multicall({
            allowFailure: true,
            contracts: positions.map((p) => ({
                address: p.receiptToken,
                abi: erc20Abi,
                functionName: "balanceOf" as const,
                args: [owner] as const,
            })),
        })
        positions.forEach((position, i) => {
            const res = results[i]
            if (res.status !== "success") return
            const balance = parseFloat(formatUnits(res.result as bigint, position.decimals))
            if (balance > DUST) {
                yieldPositions.push({
                    protocol: position.protocol,
                    protocolSlug: position.protocolSlug,
                    poolName: position.poolName,
                    asset: position.asset,
                    chain: CHAIN_NAMES[position.chainId],
                    chainId: position.chainId,
                    receiptToken: position.receiptToken,
                    balance,
                })
                deployedValue += balance
            }
        })
    }

    walletBalances.sort((a, b) => b.balance - a.balance)
    yieldPositions.sort((a, b) => b.balance - a.balance)

    return {
        address: owner,
        walletBalances,
        yieldPositions,
        idleValue,
        deployedValue,
        totalValue: idleValue + deployedValue,
    }
}
