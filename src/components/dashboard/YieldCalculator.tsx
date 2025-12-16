
"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Calculator } from "lucide-react"
import { useTokenBalances } from "@/lib/hooks/useTokenBalances"

interface YieldCalculatorProps {
    /** Current best APY to use for calculation */
    currentApy: number
}

export function YieldCalculator({
    currentApy
}: YieldCalculatorProps) {
    const { totalValue } = useTokenBalances()
    const [deposit, setDeposit] = useState(10000)

    const earnings = useMemo(() => {
        const yearlyEarnings = deposit * (currentApy / 100)
        const monthlyEarnings = yearlyEarnings / 12
        return {
            monthly: monthlyEarnings,
            yearly: yearlyEarnings,
        }
    }, [deposit, currentApy])

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value)
    }

    const formatCurrencyPrecise = (value: number) => {
        return new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value)
    }

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                        <Calculator className="h-4 w-4" />
                    </div>
                    <div>
                        <CardTitle className="text-base">Yield Estimator</CardTitle>
                        <CardDescription className="font-mono text-xs">
                            Rate: {currentApy.toFixed(2)}% APY
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-5">
                {/* Deposit Input */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Deposit
                        </label>
                        {totalValue > 0 ? (
                            <button
                                onClick={() => setDeposit(totalValue)}
                                className="text-xs font-mono text-emerald-500 hover:underline cursor-pointer transition-colors"
                            >
                                Use Balance: {formatCurrency(totalValue)}
                            </button>
                        ) : (
                            <span className="text-sm font-mono font-medium">
                                {formatCurrency(deposit)}
                            </span>
                        )}
                    </div>
                    <Slider
                        value={[deposit]}
                        onValueChange={([value]) => setDeposit(value)}
                        min={1000}
                        max={500000}
                        step={1000}
                        className="py-1"
                    />
                </div>

                {/* Custom Input */}
                <div className="flex items-center gap-2">
                    <span className="text-muted-foreground font-mono text-sm">€</span>
                    <Input
                        type="number"
                        value={deposit}
                        onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0
                            setDeposit(Math.min(Math.max(val, 0), 10000000))
                        }}
                        className="font-mono text-right h-9"
                        placeholder="Enter amount"
                    />
                </div>

                {/* Earnings Display */}
                <div className="grid grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
                    <div className="bg-card p-3 space-y-1">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                            Monthly
                        </p>
                        <p className="text-lg font-mono font-medium text-foreground">
                            {formatCurrencyPrecise(earnings.monthly)}
                        </p>
                    </div>
                    <div className="bg-card p-3 space-y-1">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                            Yearly
                        </p>
                        <p className="text-lg font-mono font-medium text-emerald-500">
                            {formatCurrencyPrecise(earnings.yearly)}
                        </p>
                    </div>
                </div>

                {/* Disclaimer */}
                <p className="text-[10px] text-muted-foreground leading-relaxed text-center px-2">
                    Hypothetical projection based on current rates.
                    <br />Returns are not guaranteed.
                </p>
            </CardContent>
        </Card>
    )
}
