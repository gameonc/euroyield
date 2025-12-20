import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, Eye, Lock, FileCode, AlertTriangle, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
    title: 'Security',
    description: 'How Rendite ensures data integrity and helps you manage DeFi risk.',
}

export default function SecurityPage() {
    return (
        <div className="min-h-screen">
            <section className="border-b bg-dot-pattern">
                <div className="container py-16 md:py-24">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2 font-outfit">
                        Verifiable Trust
                    </h1>
                    <p className="text-2xl font-outfit text-foreground mt-2">
                        Don&apos;t Trust. Verify.
                    </p>
                    <p className="text-lg text-muted-foreground max-w-2xl mt-4 font-light">
                        Rendite is built on a simple premise: You shouldn&apos;t have to trust a dashboard.
                    </p>
                </div>
            </section>

            <section className="container py-16 space-y-20">

                {/* Featured block - Non-custodial (different layout, no card) */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                            <Lock className="h-4 w-4" />
                            Core Principle
                        </div>
                        <h2 className="text-4xl font-bold font-outfit">
                            We can&apos;t touch your funds.
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Rendite is a purely non-custodial interface. We have no smart contracts that hold deposits. When you interact with a pool, you&apos;re transacting directly with Aave, Curve, or the underlying protocol—never with us.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-3xl blur-3xl" />
                        <div className="relative bg-card border rounded-2xl p-8 space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Transaction Flow</span>
                                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-xs font-mono">You</div>
                                    <div className="flex-1 h-px bg-border relative">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-muted-foreground bg-card px-2">→</div>
                                    </div>
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-mono">Protocol</div>
                                </div>
                                <p className="text-xs text-muted-foreground text-center">Rendite is not in this flow</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Two larger cards - varied layout */}
                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="bg-blue-500/5 border-blue-500/20">
                        <CardHeader className="pb-4">
                            <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                                <Eye className="h-6 w-6 text-blue-500" />
                            </div>
                            <CardTitle className="text-xl">Triple-Verified Data</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground leading-relaxed">
                            We cross-reference on-chain RPCs, subgraphs, and external APIs. If the data doesn&apos;t match across all three sources, we don&apos;t show it. Simple as that.
                        </CardContent>
                    </Card>
                    <Card className="bg-purple-500/5 border-purple-500/20">
                        <CardHeader className="pb-4">
                            <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                                <ShieldCheck className="h-6 w-6 text-purple-500" />
                            </div>
                            <CardTitle className="text-xl">Audit Surveillance</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground leading-relaxed">
                            We don&apos;t just check for a PDF. We monitor active bug bounties, timelock delays, and governance proposals to ensure the protocol remains secure over time.
                        </CardContent>
                    </Card>
                </div>

                {/* Risk section - compact horizontal list */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold font-outfit">Understanding Risk</h2>
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                        <div className="flex gap-4 items-start">
                            <FileCode className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                            <div>
                                <h3 className="font-semibold mb-1">Smart Contract Risk</h3>
                                <p className="text-sm text-muted-foreground">
                                    Even audited protocols can have bugs. Diversify across protocols.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <AlertTriangle className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                            <div>
                                <h3 className="font-semibold mb-1">De-Peg Risk</h3>
                                <p className="text-sm text-muted-foreground">
                                    Stablecoins can fluctuate due to issuer insolvency or market panic.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data sources - inline badges */}
                <div className="border-t pt-12">
                    <p className="text-sm text-muted-foreground mb-4">Data aggregated from</p>
                    <div className="flex flex-wrap gap-3">
                        {["DeFiLlama", "The Graph", "Google Cloud", "RPC Providers"].map(source => (
                            <span key={source} className="px-4 py-2 bg-muted rounded-full text-sm font-medium">
                                {source}
                            </span>
                        ))}
                    </div>
                </div>

            </section>
        </div>
    )
}
