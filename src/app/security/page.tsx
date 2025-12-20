import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ShieldCheck, Eye, Lock, FileCode, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
    title: 'Security',
    description: 'How Rendite ensures data integrity and helps you manage DeFi risk.',
}

export default function SecurityPage() {
    return (
        <div className="min-h-screen">
            <section className="border-b bg-dot-pattern">
                <div className="container py-16 md:py-24">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 font-outfit">
                        Security & Trust
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl font-light">
                        We believe transparency is the foundation of DeFi. Here's how we keep you safe.
                    </p>
                </div>
            </section>

            <section className="container py-16 space-y-16">

                {/* Core Principles */}
                <div className="grid md:grid-cols-3 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lock className="h-5 w-5 text-emerald-500" />
                                Non-Custodial
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground text-sm leading-relaxed">
                            Rendite is a read-only dashboard. We never ask for access to your funds. We do not have smart contracts that hold user deposits. You always interact directly with the underlying protocol (e.g., Aave, Curve).
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Eye className="h-5 w-5 text-blue-500" />
                                Verified Data
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground text-sm leading-relaxed">
                            Yield data is cross-referenced between DeFiLlama, on-chain RPC calls, and official protocol subgraphs. We flag data delays or inconsistencies immediately.
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-purple-500" />
                                Audit Tracking
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground text-sm leading-relaxed">
                            We track the audit status of every listed protocol. Pools from unaudited or experimental protocols are clearly marked with warning badges to minimize user risk.
                        </CardContent>
                    </Card>
                </div>

                {/* Deep Dive */}
                <div className="space-y-8 max-w-4xl">
                    <h2 className="text-2xl font-bold font-outfit">Understanding Risk Factors</h2>
                    <div className="grid gap-6">
                        <div className="flex gap-4">
                            <div className="h-10 w-10 rounded bg-muted flex items-center justify-center shrink-0">
                                <FileCode className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Smart Contract Risk</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Even audited protocols can have bugs. When you deposit into a pool, you are relying on the code of that specific protocol. We recommend diversifying across different protocols (e.g., not properly 100% in one Aave pool) to mitigate this risk.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="h-10 w-10 rounded bg-muted flex items-center justify-center shrink-0">
                                <AlertTriangle className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">De-Peg Risk</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Euro stablecoins aim to stay at €1.00, but they can fluctuate. Factors like issuer insolvency, regulatory changes, or market panic can cause a de-peg. Rendite monitors price deviations, but user discretion is advised.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Audits Section */}
                <div className="rounded-xl border bg-muted/30 p-8">
                    <h2 className="text-xl font-bold mb-4">Our Data Sources</h2>
                    <p className="text-muted-foreground mb-6">
                        We aggregate data from the most trusted sources in the ecosystem to ensure accuracy.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        {["DeFiLlama", "The Graph", "Google Cloud Public Datasets", "Rpc Providers"].map(source => (
                            <div key={source} className="px-4 py-2 bg-background border rounded-md text-sm font-medium">
                                {source}
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </div>
    )
}
