import type { LatestYield } from "@/types/database"
import { createClient } from "@/lib/supabase/server"
import { YieldTable } from "@/components/dashboard/YieldTable"
import { YieldCalculator } from "@/components/dashboard/YieldCalculator"
import { BestYieldToday } from "@/components/dashboard/BestYieldToday"
import { Button } from "@/components/ui/button"
import { NewsletterForm } from "@/components/forms/NewsletterForm"
import {
  ArrowRight,
  Shield,
  Lock,
  ArrowDown,
  Zap
} from "lucide-react"

export const revalidate = 300 // Revalidate every 5 minutes

export default async function HomePage() {
  const supabase = await createClient()
  const { data: yields, error } = await supabase
    .from("latest_yields")
    .select("*")
    .order("apy", { ascending: false })

  if (error) {
    console.error("Failed to fetch yields:", error.message)
  }

  const displayData: LatestYield[] = yields || []
  const maxApy = displayData.length > 0 ? Math.max(...displayData.map(y => y.apy)) : 5.24

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b bg-dot-pattern">
        <div className="container py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-background/50 backdrop-blur-sm text-xs font-medium text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Tracking {displayData.length}+ Euro Pools
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[0.95]">
                Stop leaving yield <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/60">
                  on the table.
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-lg font-light leading-relaxed">
                Compare Euro stablecoin yields across DeFi protocols. Updated continuously.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button asChild size="lg" className="h-12 px-6 text-base rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all font-medium">
                  <a href="#yields">
                    Compare Rates
                    <ArrowDown className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4 text-xs font-medium text-muted-foreground/80 lowercase tracking-wide">
                <span className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" /> non-custodial
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5" /> real-time
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5" /> read-only
                </span>
              </div>
            </div>

            {/* Right side - Best Yields Preview */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur-3xl opacity-10" />
              <div className="relative">
                <BestYieldToday data={displayData} />
              </div>
              <div className="absolute -z-10 top-0 right-0 text-[200px] leading-none font-bold text-foreground/5 overflow-hidden select-none pointer-events-none">
                €
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12 space-y-16">
        {/* Main Dashboard */}
        <section className="space-y-6" id="yields">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Market Overview</h2>
              <p className="text-sm text-muted-foreground mt-1">
                EUR-pegged liquidity pools ranked by yield.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-md border">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <YieldTable data={displayData} />
            </div>

            <div className="space-y-6">
              <div className="sticky top-24 space-y-6">
                <YieldCalculator currentApy={maxApy} />

                <div className="rounded-lg border bg-card p-5 space-y-4">
                  <h3 className="font-semibold text-sm">Data Quality</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Rates are verified against multiple sources and filtered for accuracy.
                  </p>
                  <div className="pt-2 border-t flex flex-col gap-2">
                    <a href="#" className="flex items-center justify-between text-xs text-muted-foreground hover:text-foreground transition-colors group">
                      Learn More
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-20 border-t flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Stay ahead of the market.</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              Get weekly Euro DeFi yield reports delivered to your inbox. <br />
              No noise, just signal.
            </p>
          </div>

          <NewsletterForm />
        </section>
      </div>
    </div>
  )
}
