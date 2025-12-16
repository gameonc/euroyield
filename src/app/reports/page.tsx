
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Mail, Clock, CheckCircle2, TrendingUp } from "lucide-react"
import { LatestYield } from '@/types/database'

const mockReports = [
    {
        id: "1",
        title: "Weekly Market Intel",
        date: "Dec 9 - Dec 15",
        status: "delivered",
        highlights: ["EURC APY +12%", "Morpho Launch"],
    },
    {
        id: "2",
        title: "Weekly Market Intel",
        date: "Dec 2 - Dec 8",
        status: "delivered",
        highlights: ["EURS TVL +8%", "Stable Rates"],
    },
]

export default async function ReportsPage() {
    const supabase = await createClient()
    const { data: topYieldsData } = await supabase
        .from('latest_yields')
        .select('*')
        .order('apy', { ascending: false })
        .limit(3)

    // Explicit cast if needed, though typically data is typed if database.ts is robust.
    const topYields = topYieldsData as LatestYield[] | null

    return (
        <div className="min-h-screen">
            <section className="border-b bg-dot-pattern">
                <div className="container py-16 md:py-20">
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground font-outfit">Intel & Reports</h1>
                                <Badge variant="outline" className="mt-2 border-emerald-500/40 text-emerald-500 bg-emerald-500/10">Live</Badge>
                            </div>
                            <p className="text-lg text-muted-foreground font-light max-w-2xl">
                                Curated weekly analysis of the European stablecoin market.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="gap-2 h-10">
                                <Mail className="h-4 w-4" />
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container py-12 space-y-8">
                {/* Next Report Status */}
                <div className="rounded-xl border bg-card/50 backdrop-blur-sm p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center relative">
                            <Clock className="h-7 w-7 text-primary" />
                            <div className="absolute top-0 right-0 h-3 w-3 bg-emerald-500 rounded-full border-2 border-background animate-pulse" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold font-outfit">Next Report: Dec 16 - Dec 22</h3>
                            <p className="text-sm text-muted-foreground">Scheduled for Monday, Dec 23 • 09:00 CET</p>
                        </div>
                    </div>
                    <div className="flex gap-8 text-sm md:border-l md:pl-8">
                        <div>
                            <p className="text-muted-foreground mb-1">Frequency</p>
                            <p className="font-medium">Weekly</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground mb-1">Delivery</p>
                            <p className="font-medium">Email & Dashboard</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-8">

                        {/* Live Market Snapshot (New) */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-outfit flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                                    Live Market Snapshot
                                </CardTitle>
                                <CardDescription>Top performing opportunities right now</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                {topYields && topYields.length > 0 ? (
                                    <div className="divide-y divide-border/40">
                                        {topYields.map((yieldItem) => (
                                            <div key={yieldItem.id} className="flex items-center justify-between p-4 hover:bg-muted/20">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded bg-muted flex items-center justify-center font-bold text-[10px] text-muted-foreground border">
                                                        {yieldItem.stablecoin}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-sm">{yieldItem.pool_name}</p>
                                                        <p className="text-xs text-muted-foreground">{yieldItem.protocol_name} • {yieldItem.chain}</p>
                                                    </div>
                                                </div>
                                                <div className="font-mono font-bold text-emerald-500">
                                                    {yieldItem.apy.toFixed(2)}%
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-4 text-sm text-muted-foreground text-center">
                                        No live data available to generate snapshot.
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold font-outfit">Archive</h2>
                        </div>

                        <div className="space-y-4">
                            {mockReports.map((report) => (
                                <div key={report.id} className="group flex items-center justify-between p-5 rounded-lg border border-border/50 bg-card hover:border-primary/50 transition-all cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium group-hover:text-primary transition-colors">{report.title}</h4>
                                            <p className="text-xs text-muted-foreground font-mono mt-0.5">{report.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="hidden sm:flex gap-2">
                                            {report.highlights.map(h => (
                                                <Badge key={h} variant="secondary" className="font-normal text-xs bg-muted/50">
                                                    {h}
                                                </Badge>
                                            ))}
                                        </div>
                                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        <Card className="bg-emerald-500/5 border-emerald-500/20">
                            <CardContent className="pt-6">
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    Active Subscriber
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    You are subscribed to the weekly institutional summary.
                                </p>
                                <Button variant="outline" size="sm" className="w-full bg-background/50 hover:bg-background h-8 text-xs">
                                    Manage Preferences
                                </Button>
                            </CardContent>
                        </Card>

                        <div className="rounded-lg border p-5 bg-card/50">
                            <h4 className="font-medium text-sm mb-3">Coverage</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex justify-between">
                                    <span>Protocols</span>
                                    <span className="font-mono">Aave, Curve, Morpho</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Assets</span>
                                    <span className="font-mono">EURC, EURS, agEUR</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
