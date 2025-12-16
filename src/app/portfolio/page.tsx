"use client"

import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, TrendingUp, Plus, RefreshCw, Layers, Loader2, DollarSign } from "lucide-react"
import { ConnectWalletModal } from "@/components/modals/ConnectWalletModal"
import { useAccount } from "wagmi"
import { useEffect, useState } from "react"
import { shortenAddress } from '@/lib/utils'
import { useTokenBalances } from "@/lib/hooks/useTokenBalances"

const chainNames: Record<number, string> = {
    1: "Ethereum",
    10: "Optimism",
    137: "Polygon",
    42161: "Arbitrum",
    8453: "Base"
}

export default function PortfolioPage() {
    const { isConnected, address } = useAccount()
    const { balances, totalValue, isLoading } = useTokenBalances()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    const formatCurrency = (val: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val)

    return (
        <div className="min-h-screen">
            <section className="border-b bg-dot-pattern">
                <div className="container py-16 md:py-20">
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground font-outfit">Portfolio</h1>
                            <p className="text-lg text-muted-foreground font-light max-w-2xl">
                                Track your Euro stablecoin positions and yield performance.
                            </p>
                        </div>
                        {!isConnected && (
                            <ConnectWalletModal>
                                <Button className="gap-2 w-fit h-10 px-6 rounded-lg">
                                    <Wallet className="h-4 w-4" />
                                    Connect Wallet
                                </Button>
                            </ConnectWalletModal>
                        )}
                        {isConnected && (
                            <div className="flex items-center gap-3">
                                <div className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-mono text-sm">
                                    {shortenAddress(address || "")}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <div className="container py-12 space-y-8">
                {/* NOT CONNECTED STATE */}
                {!isConnected ? (
                    <div className="rounded-xl border border-dashed border-border/60 bg-muted/10 p-12 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 mb-6">
                            <Wallet className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2 font-outfit">No Wallet Connected</h2>
                        <p className="text-muted-foreground max-w-md mx-auto mb-8 font-light">
                            Connect your wallet to analyze your on-chain Euro stablecoin exposure and yield efficiency.
                            We never request permissions to move funds.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <ConnectWalletModal>
                                <Button variant="default" className="gap-2 h-10 px-6">
                                    <Wallet className="h-4 w-4" />
                                    Connect Wallet
                                </Button>
                            </ConnectWalletModal>
                            <Button variant="outline" className="gap-2 h-10 px-6">
                                <Plus className="h-4 w-4" />
                                Watch Address
                            </Button>
                        </div>
                    </div>
                ) : (
                    /* CONNECTED STATE */
                    <div className="space-y-8">
                        {/* Summary Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Value</CardTitle>
                                    <div className="text-3xl font-bold font-mono mt-2">
                                        {isLoading ? "..." : formatCurrency(totalValue)}
                                    </div>
                                    <CardDescription>
                                        Across {new Set(balances.map(b => b.chainId)).size} chains
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Avg Yield</CardTitle>
                                    <div className="text-3xl font-bold font-mono mt-2 text-emerald-500">
                                        {totalValue > 0 ? "4.2%" : "0.00%"}
                                    </div>
                                    <CardDescription>Weighted APY (Est)</CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Monthly Income</CardTitle>
                                    <div className="text-3xl font-bold font-mono mt-2">
                                        {totalValue > 0 ? formatCurrency((totalValue * 0.042) / 12) : "€0.00"}
                                    </div>
                                    <CardDescription>Projected</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>

                        {/* Positions List */}
                        {balances.length > 0 ? (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Your Holdings</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-border/40">
                                        {balances.map((token, idx) => (
                                            <div key={`${token.symbol}-${token.chainId}-${idx}`} className="flex items-center justify-between p-6 hover:bg-muted/20">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs text-primary">
                                                        {token.symbol}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium">{token.name}</h4>
                                                        <p className="text-xs text-muted-foreground">{chainNames[token.chainId] || "Unknown Chain"}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-mono font-medium">{formatCurrency(token.balance)}</p>
                                                    <p className="text-xs text-emerald-500 font-medium">Yield Active</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="rounded-lg border border-border/50 bg-card p-12 text-center">
                                {isLoading ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                        <p className="text-muted-foreground">Scanning blockchain...</p>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-muted-foreground mb-4">No Euro stablecoin positions found in this wallet.</p>
                                        <Button variant="outline" size="sm" onClick={() => window.location.reload()}>Scan Again</Button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                )}


                {/* Features Grid (Always visible for SEO/Info) */}
                {!isConnected && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                                    <Layers className="h-5 w-5 text-primary" />
                                </div>
                                <CardTitle className="text-lg font-outfit">Exposure Analysis</CardTitle>
                                <CardDescription>
                                    Breakdown of EURC, EURS, and agEUR across chains.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-2">
                                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                                </div>
                                <CardTitle className="text-lg font-outfit">Yield Performance</CardTitle>
                                <CardDescription>
                                    Real-time APY calculation of your deployed capital.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-2">
                                    <RefreshCw className="h-5 w-5 text-blue-500" />
                                </div>
                                <CardTitle className="text-lg font-outfit">Rebalance Engine</CardTitle>
                                <CardDescription>
                                    Signals when better yield opportunities are available.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}
