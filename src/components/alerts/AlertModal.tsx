"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, CheckCircle2, AlertCircle } from "lucide-react"

interface AlertModalProps {
    protocolName: string
    protocolSlug: string
    chain: string
    currentApy: number
    children: React.ReactNode
}

export function AlertModal({ protocolName, protocolSlug, chain, currentApy, children }: AlertModalProps) {
    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [threshold, setThreshold] = useState<string>((currentApy * 0.8).toFixed(2)) // Default to 80% of current APY
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setStatus('idle')

        try {
            const supabase = createClient()
            const { error } = await supabase
                .from('user_alerts')
                .insert({
                    email,
                    protocol_slug: protocolSlug,
                    chain: chain.toLowerCase(),
                    condition: 'BELOW',
                    threshold: parseFloat(threshold),
                    created_at: new Date().toISOString(),
                })

            if (error) throw error

            setStatus('success')
            setTimeout(() => {
                setOpen(false)
                setStatus('idle')
                setEmail("")
            }, 2000)
        } catch (error) {
            console.error('Error setting alert:', error)
            setStatus('error')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-primary" />
                        Set Yield Alert
                    </DialogTitle>
                    <DialogDescription>
                        Get notified when {protocolName} ({chain}) yield drops below your target.
                    </DialogDescription>
                </DialogHeader>

                {status === 'success' ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center space-y-2">
                        <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <h3 className="font-medium">Alert Set!</h3>
                        <p className="text-sm text-muted-foreground">We'll email you at {email} when the time comes.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="threshold" className="text-sm font-medium">Alert me if APY drops below</label>
                            <div className="relative">
                                <Input
                                    id="threshold"
                                    type="number"
                                    step="0.01"
                                    value={threshold}
                                    onChange={(e) => setThreshold(e.target.value)}
                                    required
                                    className="pr-8"
                                />
                                <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">%</span>
                            </div>
                            <p className="text-[11px] text-muted-foreground">
                                Current APY is <span className="text-emerald-500 font-medium">{currentApy.toFixed(2)}%</span>.
                            </p>
                        </div>

                        {status === 'error' && (
                            <div className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 p-2 rounded">
                                <AlertCircle className="h-4 w-4" />
                                Failed to save alert. Please try again.
                            </div>
                        )}

                        <Button type="submit" disabled={isLoading} className="mt-2">
                            {isLoading ? "Saving..." : "Create Alert"}
                        </Button>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}
