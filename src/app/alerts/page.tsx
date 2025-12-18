"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Plus, TrendingUp, TrendingDown, AlertTriangle, Mail, MessageCircle } from "lucide-react"

// Mock alerts
const mockAlerts = [
    {
        id: "1",
        name: "EURC High Yield Alert",
        condition: "APY > 6.00%",
        channels: ["email"],
        isActive: true,
        lastTriggered: "2h ago",
    },
    {
        id: "2",
        name: "Aave TVL Monitor",
        condition: "TVL Drawdown > 20%",
        channels: ["email", "telegram"],
        isActive: true,
        lastTriggered: "Never",
    },
]

export default function AlertsPage() {
    return (
        <div className="min-h-screen">
            <section className="border-b bg-dot-pattern">
                <div className="container py-16 md:py-20">
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground font-outfit">Market Alerts</h1>
                            <p className="text-lg text-muted-foreground font-light max-w-2xl">
                                Configure real-time notifications for yield thresholds and protocol risks.
                            </p>
                        </div>
                        <Button className="gap-2 w-fit h-10 px-6 rounded-lg" onClick={() => alert("Alert configuration is coming in the next release.")}>
                            <Plus className="h-4 w-4" />
                            New Alert
                        </Button>
                    </div>
                </div>
            </section>

            <div className="container py-12 space-y-8">
                {/* Stats */}
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="bg-card/50 backdrop-blur-sm">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                    <Bell className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold tabular-nums font-mono">3</p>
                                    <p className="text-xs font-mono text-muted-foreground uppercase">Active</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur-sm">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                                    <TrendingUp className="h-6 w-6 text-emerald-500" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold tabular-nums font-mono">7</p>
                                    <p className="text-xs font-mono text-muted-foreground uppercase">Triggers (7d)</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur-sm">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
                                    <AlertTriangle className="h-6 w-6 text-amber-500" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold tabular-nums font-mono">0</p>
                                    <p className="text-xs font-mono text-muted-foreground uppercase">Risk Events</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Alerts Table */}
                <Card className="overflow-hidden border-border/60">
                    <div className="px-6 py-4 border-b border-border/50 bg-muted/20">
                        <h3 className="font-semibold font-outfit">Active Configurations</h3>
                    </div>
                    <div className="divide-y divide-border/40">
                        {mockAlerts.map((alert) => (
                            <div key={alert.id} className="flex items-center justify-between p-6 hover:bg-muted/30 transition-colors">
                                <div className="flex items-center gap-5">
                                    <div className={`p-2 rounded-lg ${alert.isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                                        <Bell className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <p className="font-medium text-foreground">{alert.name}</p>
                                            {!alert.isActive && <Badge variant="secondary" className="text-[10px]">Paused</Badge>}
                                        </div>
                                        <p className="text-sm font-mono text-muted-foreground mt-1">{alert.condition}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8">
                                    <div className="flex items-center gap-2">
                                        {alert.channels.map(channel => (
                                            <div key={channel} className="p-1.5 rounded bg-muted/50 text-muted-foreground">
                                                {channel === 'email' ? <Mail className="h-3.5 w-3.5" /> : <MessageCircle className="h-3.5 w-3.5" />}
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-xs font-mono text-muted-foreground hidden sm:block">
                                        Last: {alert.lastTriggered}
                                    </span>
                                    <Button variant="ghost" size="sm" className="h-8">
                                        Configure
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Templates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-xl border border-dashed border-border/60 p-6 hover:bg-muted/10 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500/20 transition-colors">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">APY Threshold</h3>
                                <p className="text-sm text-muted-foreground">Notify when a stablecoin pool exceeds X% APY</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-dashed border-border/60 p-6 hover:bg-muted/10 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500/20 transition-colors">
                                <TrendingDown className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">TVL Drawdown</h3>
                                <p className="text-sm text-muted-foreground">Warning when liquidity drops by more than X%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
