import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Lock, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
    title: 'Security',
    description: 'How Rendite ensures data integrity and helps you manage DeFi risk.',
}

export default function SecurityPage() {
    return (
        <div className="min-h-screen">
            {/* Hero - compact */}
            <section className="border-b bg-dot-pattern">
                <div className="container py-12 md:py-16">
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

            {/* Featured block - generous whitespace */}
            <section className="container py-20 md:py-28">
                <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                    <div className="space-y-6">
                        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                            Core Principle
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold font-outfit leading-tight">
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
            </section>

            {/* Cards - tight spacing to contrast previous section */}
            <section className="container pb-12">
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-blue-500/5 border-blue-500/20">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-xl flex items-center gap-3">
                                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Eye className="h-4 w-4 text-blue-500" />
                                </div>
                                Triple-Verified
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground text-sm">
                            On-chain RPCs + Subgraphs + External APIs. If they don&apos;t match, we don&apos;t show it.
                        </CardContent>
                    </Card>

                    {/* No icon on this one - just bold text */}
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-2xl font-bold mb-2">24/7</p>
                            <p className="text-muted-foreground text-sm">
                                Continuous monitoring of audits, bug bounties, and governance proposals.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Risk - inline text, no cards */}
            <section className="border-t">
                <div className="container py-16 md:py-20">
                    <h2 className="text-xl font-bold mb-8">Understanding Risk</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
                        <div>
                            <h3 className="font-semibold mb-2">Smart Contract Risk</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Even audited protocols can have bugs. Diversify across protocols.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">De-Peg Risk</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Stablecoins can fluctuate due to issuer insolvency or market panic.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Data sources - ultra minimal */}
            <section className="border-t">
                <div className="container py-8">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                        <span className="text-muted-foreground">Data from</span>
                        <span className="font-medium">DeFiLlama</span>
                        <span className="text-muted-foreground">·</span>
                        <span className="font-medium">The Graph</span>
                        <span className="text-muted-foreground">·</span>
                        <span className="font-medium">RPC Providers</span>
                    </div>
                </div>
            </section>
        </div>
    )
}
