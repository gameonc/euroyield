import { Metadata } from 'next'
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
    title: 'About',
    description: 'Rendite is the first dedicated Euro stablecoin yield analytics platform.',
}

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero - tighter spacing */}
            <section className="border-b bg-dot-pattern">
                <div className="container py-12 md:py-20 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 font-outfit">
                        The Euro Yield Layer
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                        We built Rendite to give Euro stablecoins the infrastructure they deserve. No USD noise. Just pure, verified Euro yield data.
                    </p>
                </div>
            </section>

            {/* Featured stat - lots of breathing room */}
            <section className="container py-24 md:py-32">
                <div className="max-w-4xl">
                    <p className="text-5xl md:text-7xl font-bold tracking-tight text-foreground/90 leading-tight">
                        99% of DeFi is USD.
                    </p>
                    <p className="text-xl md:text-2xl text-muted-foreground mt-8 leading-relaxed max-w-2xl">
                        The Euro is the second largest reserve currency in the world. As on-chain forex markets mature, Euro DeFi is inevitable. Rendite is building the infrastructure for that future.
                    </p>
                </div>
            </section>

            {/* Asymmetrical cards - tighter */}
            <section className="container pb-20">
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Hero card - spans 2 columns, no icon */}
                    <Card className="md:col-span-2 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
                        <CardContent className="p-8 md:p-12 min-h-[260px] flex flex-col justify-end">
                            <h3 className="text-3xl font-bold mb-3">Euro Native</h3>
                            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
                                We don&apos;t just support Euro. It&apos;s our entire focus. Every feature, every filter, every metric is designed specifically for EUR-pegged assets.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Stacked cards - title only, no description on one */}
                    <div className="flex flex-col gap-6">
                        <Card className="flex-1 bg-emerald-500/5 border-emerald-500/20">
                            <CardContent className="p-6 h-full flex flex-col justify-center">
                                <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">3x</p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Data verification layers
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="flex-1">
                            <CardContent className="p-6 h-full flex flex-col justify-center">
                                <h3 className="font-semibold text-lg">Real Yield</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Organic APY only. No inflation.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Networks - minimal spacing, inline */}
            <section className="border-t">
                <div className="container py-10">
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                        <span className="text-sm text-muted-foreground">Networks</span>
                        {["Ethereum", "Arbitrum", "Optimism", "Base", "Polygon", "Gnosis"].map((chain, i) => (
                            <span
                                key={chain}
                                className={`text-sm font-medium ${i === 0 ? 'text-foreground' : 'text-muted-foreground'}`}
                            >
                                {chain}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
