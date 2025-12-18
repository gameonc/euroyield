"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LatestYield } from "@/types/database"
import { ArrowRight, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BestYieldTodayProps {
    data: LatestYield[]
}

export function BestYieldToday({ data }: BestYieldTodayProps) {
    // Sort by APY desc and take top 3
    const topYields = [...data].sort((a, b) => b.apy - a.apy).slice(0, 3)

    return (
        <Card className="h-full border-border/60 bg-card/80 backdrop-blur-md">
            <CardHeader className="pb-2 border-b border-border/40">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                            <Activity className="h-4 w-4" />
                        </div>
                        <div>
                            <CardTitle className="text-base">Top Performing</CardTitle>
                            <CardDescription className="text-xs font-mono">
                                24h Moving Avg
                            </CardDescription>
                        </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-mono border-emerald-500/30 text-emerald-500 bg-emerald-500/5">
                        Live
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-0 p-0">
                {topYields.map((pool, index) => (
                    <div
                        key={pool.id}
                        className="flex items-center justify-between p-4 border-b border-border/40 last:border-0 hover:bg-muted/40 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-muted text-[10px] font-bold text-muted-foreground font-mono">
                                {index + 1}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm">{pool.protocol_name}</span>
                                </div>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wide">
                                        {pool.chain}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground">•</span>
                                    <span className="text-[10px] text-muted-foreground font-mono">
                                        {pool.stablecoin}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-base font-bold tabular-nums text-foreground font-mono">
                                {pool.apy.toFixed(2)}%
                            </p>
                        </div>
                    </div>
                ))}

                <div className="p-3">
                    <Button variant="ghost" className="w-full text-xs h-8 text-muted-foreground hover:text-foreground" asChild>
                        <a href="#yields">
                            View all stablecoin pools
                            <ArrowRight className="ml-2 h-3 w-3" />
                        </a>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
