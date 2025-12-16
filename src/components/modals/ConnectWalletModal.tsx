
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
import { Wallet, CreditCard, ArrowRight, Loader2 } from "lucide-react"
import { useConnect, useAccount, useDisconnect } from "wagmi"
import { useState } from "react"
import { shortenAddress } from "@/lib/utils"

export function ConnectWalletModal({ children }: { children: React.ReactNode }) {
    const { connectors, connect, isPending } = useConnect()
    const { address, isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const [open, setOpen] = useState(false)

    // Helper to find specific connector
    const getConnector = (name: string) => connectors.find((c) => c.name.toLowerCase().includes(name.toLowerCase()))

    const handleConnect = (connectorName: string) => {
        const connector = getConnector(connectorName)
        if (connector) {
            connect({ connector })
            setOpen(false)
        } else {
            // Fallback to first available if specific ones aren't found (e.g. Injected for MetaMask)
            const fallback = connectors[0]
            if (fallback) {
                connect({ connector: fallback })
                setOpen(false)
            }
        }
    }

    if (isConnected && address) {
        return (
            <Button variant="outline" onClick={() => disconnect()} className="font-mono text-xs">
                {shortenAddress(address)}
                <span className="ml-2 text-[10px] text-muted-foreground">(Disconnect)</span>
            </Button>
        )
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Connect Wallet</DialogTitle>
                    <DialogDescription>
                        Select your wallet to enter the dashboard.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {/* MetaMask (usually Injected) */}
                    <Button variant="outline" className="h-14 justify-start px-4 gap-4" onClick={() => handleConnect('MetaMask')} disabled={isPending}>
                        <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                            <Wallet className="h-5 w-5 text-orange-600" />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="font-semibold">MetaMask</span>
                            <span className="text-xs text-muted-foreground">Browser Extension</span>
                        </div>
                        {isPending ? <Loader2 className="ml-auto h-4 w-4 animate-spin" /> : <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />}
                    </Button>

                    {/* WalletConnect - Generic */}
                    <Button variant="outline" className="h-14 justify-start px-4 gap-4" onClick={() => handleConnect('WalletConnect')} disabled={isPending}>
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Wallet className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="font-semibold">WalletConnect</span>
                            <span className="text-xs text-muted-foreground">Mobile & Desktop</span>
                        </div>
                        {isPending ? <Loader2 className="ml-auto h-4 w-4 animate-spin" /> : <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />}
                    </Button>

                    {/* Coinbase */}
                    <Button variant="outline" className="h-14 justify-start px-4 gap-4" onClick={() => handleConnect('Coinbase')} disabled={isPending}>
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="font-semibold">Coinbase Wallet</span>
                            <span className="text-xs text-muted-foreground">Smart Wallet</span>
                        </div>
                        {isPending ? <Loader2 className="ml-auto h-4 w-4 animate-spin" /> : <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
