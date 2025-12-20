'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

export function NewsletterForm() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Failed to subscribe')
            }

            setIsSuccess(true)
            setEmail('')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 px-4 py-3 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium text-sm">Welcome to the inner circle. Check your inbox soon.</span>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm w-full">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        className={cn("pl-9 bg-background/50", error && "border-red-500 focus-visible:ring-red-500")}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            if (error) setError('')
                        }}
                        disabled={isLoading}
                        required
                    />
                </div>
                <Button type="submit" disabled={isLoading} className="shrink-0">
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <>
                            Join
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                    )}
                </Button>
            </div>
            {error && (
                <p className="text-xs text-red-500 pl-1">{error}</p>
            )}
            <p className="text-[10px] text-muted-foreground pl-1">
                Receive weekly institutional-grade yield analysis. Unsubscribe anytime.
            </p>
        </form>
    )
}
