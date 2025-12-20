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
                        Euro-First DeFi Intelligence
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                        We built Rendite because Euro stablecoins deserve more than a filter in a USD dashboard.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="container py-16 md:py-24 space-y-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold font-outfit">The Mission</h2>
                        <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                            <p>
                                The DeFi landscape is dominated by USD. But the Euro is the second largest reserve currency in the world.
                            </p>
                            <p>
                                Rendite exists to provide institutional-grade analytics for the growing Euro stablecoin ecosystem. We aggregate, verify, and standardize yield data for EURC, EURS, agEUR, and eEUR across all major chains.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                                <Euro className="h-10 w-10 text-primary" />
                                <h3 className="font-semibold">Euro Only</h3>
                                <p className="text-sm text-muted-foreground">Dedicated focus on EUR-pegged assets</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-emerald-500/5 border-emerald-500/20">
                            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                                <Shield className="h-10 w-10 text-emerald-500" />
                                <h3 className="font-semibold">Safety First</h3>
                                <p className="text-sm text-muted-foreground">Audited protocols & risk scoring</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                                <Globe className="h-10 w-10 text-blue-500" />
                                <h3 className="font-semibold">Multi-Chain</h3>
                                <p className="text-sm text-muted-foreground">Arbitrum, Optimism, Base, Mainnet</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                                <TrendingUp className="h-10 w-10 text-purple-500" />
                                <h3 className="font-semibold">Real Yield</h3>
                                <p className="text-sm text-muted-foreground">Organic APY without inflation</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    )
}
