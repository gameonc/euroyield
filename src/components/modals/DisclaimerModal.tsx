"use client"

import { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ShieldAlert, ExternalLink } from "lucide-react"

const DISCLAIMER_KEY = "euroyield_disclaimer_accepted"

export function DisclaimerModal() {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        // Check if user has already accepted the disclaimer
        const hasAccepted = localStorage.getItem(DISCLAIMER_KEY)
        if (!hasAccepted) {
            setTimeout(() => setOpen(true), 0)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem(DISCLAIMER_KEY, "true")
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            // Only allow closing via the accept button
            if (!isOpen) return
            setOpen(isOpen)
        }}>
            <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10">
                            <ShieldAlert className="h-5 w-5 text-amber-500" />
                        </div>
                        <DialogTitle className="text-xl">Important Disclaimer</DialogTitle>
                    </div>
                    <DialogDescription className="text-left space-y-3 pt-2">
                        <p>
                            <strong>EuroYield is an analytics and aggregation tool only.</strong>
                        </p>
                        <p>
                            We do not provide financial, investment, or tax advice. The yield data,
                            risk tags, and other information displayed are for informational purposes only
                            and may be delayed or inaccurate.
                        </p>
                        <p>
                            <strong>Smart contracts carry inherent risks.</strong> Protocols can be hacked,
                            stablecoins can de-peg, and yields can change at any time. Always do your own
                            research (DYOR) before depositing funds anywhere.
                        </p>
                        <p className="text-xs text-muted-foreground pt-2">
                            By continuing, you acknowledge that you understand these risks and agree to our{" "}
                            <a href="/terms" className="text-primary underline inline-flex items-center gap-1">
                                Terms of Service
                                <ExternalLink className="h-3 w-3" />
                            </a>{" "}
                            and{" "}
                            <a href="/privacy" className="text-primary underline inline-flex items-center gap-1">
                                Privacy Policy
                                <ExternalLink className="h-3 w-3" />
                            </a>
                            .
                        </p>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <Button onClick={handleAccept} className="w-full sm:w-auto">
                        I Understand, Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
