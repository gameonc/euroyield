"use client"

import { X, Sparkles } from "lucide-react"
import { useState } from "react"

export function AnnouncementBanner() {
    const [isVisible, setIsVisible] = useState(true)

    if (!isVisible) return null

    return (
        <div className="bg-indigo-600 text-white px-4 py-2 text-sm font-medium relative transition-colors hover:bg-indigo-700">
            <div className="container flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 fill-white text-white hidden sm:block" />
                <span>
                    New: <span className="opacity-90 font-normal">Compare yields across Aave, Curve, and Morpho. </span>
                    <a href="#yields" className="underline underline-offset-4 hover:text-white/80 ml-1">
                        Explore now &rarr;
                    </a>
                </span>
            </div>
            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Dismiss announcement"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    )
}
