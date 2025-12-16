
"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Check, ShieldCheck, Zap } from "lucide-react"

export function PricingModal({ children }: { children: React.ReactNode }) {

    const plans = [
        {
            name: "Pro",
            price: "€19",
            period: "/month",
            description: "For active yield farmers.",
            features: [
                "Real-time alerts (Email & Telegram)",
                "Advanced yield history charts",
                "Unlimited portfolio tracking",
                "Priority support"
            ],
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
            buttonVariant: "default" as const
        },
        {
            name: "Le Pro Institutional",
            price: "€299",
            period: "/month",
            description: "For funds and treasuries.",
            features: [
                "API Access",
                "Custom risk reports",
                "White-label options",
                "Dedicated account manager",
                "Audit verification"
            ],
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
            buttonVariant: "outline" as const
        }
    ]

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader className="text-center pb-6">
                    <DialogTitle className="text-2xl font-bold font-outfit">Upgrade your Yield Strategy</DialogTitle>
                    <DialogDescription className="text-base">
                        Unlock advanced analytics, real-time alerts, and institutional-grade data.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {plans.map((plan) => (
                        <div key={plan.name} className={`rounded-xl border ${plan.border} ${plan.bg} p-6 relative overflow-hidden transition-all hover:scale-[1.02]`}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className={`font-bold text-xl ${plan.color}`}>{plan.name}</h3>
                                {plan.name === "Pro" && <Zap className={`h-5 w-5 ${plan.color}`} />}
                                {plan.name.includes("Institutional") && <ShieldCheck className={`h-5 w-5 ${plan.color}`} />}
                            </div>

                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-3xl font-bold">{plan.price}</span>
                                <span className="text-sm text-muted-foreground">{plan.period}</span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-sm">
                                        <div className={`mt-0.5 rounded-full p-0.5 ${plan.color.replace('text-', 'bg-')} bg-opacity-20`}>
                                            <Check className={`h-3 w-3 ${plan.color}`} />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Button className="w-full" variant={plan.buttonVariant}>
                                {plan.name === "Pro" ? "Start Free Trial" : "Contact Sales"}
                            </Button>
                        </div>
                    ))}
                </div>

                <p className="text-center text-xs text-muted-foreground mt-4">
                    Secure payment via Stripe. Cancel anytime.
                </p>
            </DialogContent>
        </Dialog>
    )
}
