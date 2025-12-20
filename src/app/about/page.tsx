import { Metadata } from 'next'
import { Card, CardContent } from "@/components/ui/card"
import { Euro, Shield, Globe, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
    title: 'About',
    description: 'Rendite is the first dedicated Euro stablecoin yield analytics platform.',
}

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="border-b bg-dot-pattern">
                <div className="container py-16 md:py-24 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 font-outfit">
                        The Euro Yield Layer
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                        We built Rendite to give Euro stablecoins the infrastructure they deserve. No USD noise. Just pure, verified Euro yield data.
                    </p>
                </div>
            </section>

            {/* Why section - asymmetrical layout */}
            <section className="container py-16 md:py-24 space-y-20">

                {/* Featured stat block - no icon, just bold statement */}
                <div className="max-w-3xl">
                    <p className="text-5xl md:text-7xl font-bold tracking-tight text-foreground/90 leading-tight">
                        99% of DeFi is USD.
                    </p>
                    <p className="text-2xl text-muted-foreground mt-6 leading-relaxed">
                        The Euro is the second largest reserve currency in the world. As on-chain forex markets mature, Euro DeFi is inevitable. Rendite is building the infrastructure for that future.
                    </p>
                </div>

                {/* Asymmetrical 1+2 layout */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Hero card - spans 2 columns */}
                    <Card className="md:col-span-2 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
                        <CardContent className="p-8 md:p-12 flex flex-col justify-between h-full min-h-[280px]">
                            <Euro className="h-12 w-12 text-primary" />
                            <div className="mt-auto">
                                <h3 className="text-2xl font-bold mb-3">Euro Native</h3>
                                <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
                                    We don&apos;t just support Euro. It&apos;s our entire focus. Every feature, every filter, every metric is designed specifically for EUR-pegged assets.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stacked smaller cards */}
                    <div className="flex flex-col gap-6">
                        <Card className="flex-1 bg-emerald-500/5 border-emerald-500/20">
                            <CardContent className="p-6 h-full flex flex-col">
                                <h3 className="font-semibold text-lg mb-2">Risk Adjusted</h3>
                                <p className="text-sm text-muted-foreground">
                                    Every pool includes detailed risk breakdowns. Audit status, liquidity depth, smart contract age.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="flex-1">
                            <CardContent className="p-6 h-full flex flex-col">
                                <h3 className="font-semibold text-lg mb-2">Real Yield</h3>
                                <p className="text-sm text-muted-foreground">
                                    Organic APY from actual lending activity. No inflationary token emissions.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Horizontal scroll row for chains */}
                <div className="space-y-6">
                    <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Supported Networks</h2>
                    <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
                        {["Ethereum", "Arbitrum", "Optimism", "Base", "Polygon", "Gnosis"].map((chain, i) => (
                            <div
                                key={chain}
                                className={`shrink-0 px-6 py-4 rounded-lg border text-sm font-medium ${i === 0 ? 'bg-foreground text-background' : 'bg-muted/50'}`}
                            >
                                {chain}
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </div>
    )
}
