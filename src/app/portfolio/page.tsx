"use client"

import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, TrendingUp, Plus, ArrowRight, AlertCircle, ExternalLink, Layers, RefreshCw, Loader2, Bell } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ConnectWalletModal } from "@/components/modals/ConnectWalletModal"
import { useAccount } from "wagmi"
import { useEffect, useState } from "react"
import { shortenAddress } from '@/lib/utils'
import { usePortfolioData } from "@/lib/hooks/usePortfolioData"
import { CHAIN_NAMES } from "@/lib/constants/protocols"
import { getDepositUrl } from "@/lib/constants/urls"
import { AlertModal } from "@/components/alerts/AlertModal"

export default function PortfolioPage() {
    const { isConnected, address } = useAccount()
    const {
        positions,
        rawBalances,
        totalValue,
        weightedApy,
        monthlyEarnings,
        idleCapital,
        potentialDailyGain,
        isLoading,
        hasError
    } = usePortfolioData()

    const [isMounted, setIsMounted] = useState(false)

    // Hydration guard - required for wagmi wallet state synchronization
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { setIsMounted(true) }, [])

    if (!isMounted) return null

    const formatCurrency = (val: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val)
    const formatPercent = (val: number) => new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val / 100)

    return (
        <TooltipProvider>
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
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" className="gap-2 h-10 px-6 opacity-60 cursor-not-allowed">
                                            <Plus className="h-4 w-4" />
                                            Watch Address
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Coming Soon</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </div>
                    ) : (
                        /* CONNECTED STATE */
                        <div className="space-y-8">
                            {/* Error State */}
                            {hasError && (
                                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                                    <p className="text-red-500 text-sm">
                                        Failed to load some portfolio data. Please refresh to try again.
                                    </p>
                                </div>
                            )}
                            {/* Summary Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <Card className="bg-card/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Net Worth</CardTitle>
                                        <div className="text-3xl font-bold font-mono mt-2">
                                            {isLoading ? "..." : formatCurrency(totalValue)}
                                        </div>
                                        <CardDescription>
                                            Total Euro Assets
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card className="bg-card/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Avg Yield</CardTitle>
                                        <div className="text-3xl font-bold font-mono mt-2 text-emerald-500">
                                            {isLoading ? "..." : formatPercent(weightedApy)}
                                        </div>
                                        <CardDescription>Weighted APY</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card className="bg-card/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Est. Monthly</CardTitle>
                                        <div className="text-3xl font-bold font-mono mt-2">
                                            {isLoading ? "..." : formatCurrency(monthlyEarnings)}
                                        </div>
                                        <CardDescription>Passive Income</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card className="bg-card/50 backdrop-blur-sm relative overflow-hidden">
                                    {idleCapital > 0 && !isLoading && (
                                        <div className="absolute top-0 right-0 p-2">
                                            <span className="flex h-3 w-3 relative">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                                            </span>
                                        </div>
                                    )}
                                    <CardHeader>
                                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Optimization</CardTitle>
                                        <div className="text-3xl font-bold font-mono mt-2 text-amber-500">
                                            {isLoading ? "..." : formatCurrency(potentialDailyGain * 30)}
                                        </div>
                                        <CardDescription>
                                            Potential Monthly +
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>

                            {/* Yield Optimization Alert */}
                            {idleCapital > 50 && !isLoading && (
                                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded-full bg-amber-500/20 text-amber-500 mt-1 md:mt-0">
                                            <AlertCircle className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-amber-500">Idle Capital Detected</h3>
                                            <p className="text-sm text-muted-foreground">
                                                You have <span className="font-mono font-medium text-foreground">{formatCurrency(idleCapital)}</span> sitting in your wallet not earning yield.
                                                Deploying this could earn you an extra <span className="font-mono font-medium text-emerald-500">{formatCurrency(potentialDailyGain * 365)}</span> per year.
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="border-amber-500/20 hover:bg-amber-500/10 text-amber-500 whitespace-nowrap" asChild>
                                        <a href="/#yield-table">
                                            Find Opportunities <ArrowRight className="ml-2 h-4 w-4" />
                                        </a>
                                    </Button>
                                </div>
                            )}

                            {/* Active Yield Positions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5 text-emerald-500" />
                                        Yield Roles
                                    </CardTitle>
                                    <CardDescription>Active positions currently generating returns.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-0">
                                    {isLoading ? (
                                        <div className="p-12 text-center">
                                            <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground mb-4" />
                                            <p className="text-muted-foreground">Scanning protocols...</p>
                                        </div>
                                    ) : positions.length > 0 ? (
                                        <div className="divide-y divide-border/40">
                                            {positions.map((position) => {
                                                const manageUrl = getDepositUrl(position.protocolSlug, position.chain)

                                                return (
                                                    <div key={position.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-muted/20 transition-colors">
                                                        <div className="flex items-center gap-4 mb-4 md:mb-0">
                                                            <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center font-bold text-sm text-emerald-500 shrink-0">
                                                                {position.asset}
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center gap-2">
                                                                    <h4 className="font-medium text-lg">{position.protocol}</h4>
                                                                    <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-muted text-muted-foreground border">
                                                                        {position.chain}
                                                                    </span>
                                                                </div>
                                                                <p className="text-sm text-muted-foreground">{position.poolName}</p>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 w-full md:w-auto">
                                                            <div>
                                                                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Balance</p>
                                                                <p className="font-mono font-medium">{formatCurrency(position.balance)}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">APY</p>
                                                                <div className="flex items-center gap-1.5">
                                                                    <p className="font-mono font-medium text-emerald-500">{position.apy.toFixed(2)}%</p>
                                                                    {position.yieldSource === 'estimated' && (
                                                                        <Tooltip>
                                                                            <TooltipTrigger>
                                                                                <span className="text-[10px] bg-muted px-1 rounded text-muted-foreground cursor-help">EST</span>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent>Estimated yield</TooltipContent>
                                                                        </Tooltip>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Est. Monthly</p>
                                                                <p className="font-mono font-medium text-foreground/80">{formatCurrency(position.monthlyEarnings)}</p>
                                                            </div>
                                                            <div className="flex items-center justify-end">
                                                                <AlertModal
                                                                    protocolName={position.protocol}
                                                                    protocolSlug={position.protocolSlug}
                                                                    chain={position.chain}
                                                                    currentApy={position.apy || 0}
                                                                >
                                                                    <Button variant="ghost" size="icon" className="h-8 w-8 mr-1 text-muted-foreground hover:text-amber-500" title="Set Alert">
                                                                        <Bell className="h-4 w-4" />
                                                                    </Button>
                                                                </AlertModal>
                                                                {manageUrl ? (
                                                                    <Button variant="ghost" size="sm" className="gap-2 h-8" asChild>
                                                                        <a href={manageUrl} target="_blank" rel="noopener noreferrer">
                                                                            Manage <ExternalLink className="h-3 w-3" />
                                                                        </a>
                                                                    </Button>
                                                                ) : (
                                                                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-50 hover:opacity-100" disabled>
                                                                        <ExternalLink className="h-4 w-4" />
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        <div className="p-12 text-center text-muted-foreground">
                                            <p>No active yield positions found.</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Wallet Holdings (Idle) */}
                            {rawBalances.length > 0 && (
                                <Card className="border-dashed border-muted-foreground/30 bg-muted/5">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-muted-foreground">
                                            <Wallet className="h-5 w-5" />
                                            Wallet Holdings (Idle)
                                        </CardTitle>
                                        <CardDescription>Safe in your wallet, but not earning yield.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="divide-y divide-border/40">
                                            {rawBalances.map((token, idx) => (
                                                <div key={`${token.symbol}-${token.chainId}-${idx}`} className="flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-muted/10">
                                                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                                                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold text-xs text-muted-foreground">
                                                            {token.symbol}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium text-muted-foreground">{token.name}</h4>
                                                            <p className="text-xs text-muted-foreground">{CHAIN_NAMES[token.chainId as keyof typeof CHAIN_NAMES] || "Unknown Chain"}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-8 md:justify-end w-full md:w-auto">
                                                        <div className="text-right">
                                                            <p className="font-mono font-medium text-muted-foreground">{formatCurrency(token.balance)}</p>
                                                        </div>
                                                        <Button size="sm" variant="outline" className="gap-2" asChild>
                                                            <a href="/#yield-table">
                                                                Deploy <ArrowRight className="h-3 w-3" />
                                                            </a>
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
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
        </TooltipProvider>
    )
}
