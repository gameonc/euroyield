"use client"

import { cn } from "@/lib/utils"

interface LogoProps {
    className?: string
    showText?: boolean
    size?: "sm" | "md" | "lg"
}

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
    const sizes = {
        sm: { icon: 24, text: "text-base" },
        md: { icon: 28, text: "text-lg" },
        lg: { icon: 36, text: "text-xl" },
    }

    const { icon, text } = sizes[size]

    return (
        <div className={cn("flex items-center gap-2", className)}>
            {/* Logo Mark - Stylized R with yield chart motif */}
            <svg
                width={icon}
                height={icon}
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
            >
                {/* Background circle with gradient */}
                <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                </defs>

                {/* Main circle */}
                <circle cx="16" cy="16" r="15" fill="url(#logoGradient)" />

                {/* Euro symbol stylized as upward trend */}
                <path
                    d="M10 18.5h6M10 15.5h7M12.5 11c-2 0-3.5 1.5-3.5 5s1.5 5 3.5 5c1.5 0 2.5-.8 3-2"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />

                {/* Upward arrow/yield indicator */}
                <path
                    d="M18 20l3-8 3 4"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
            </svg>

            {showText && (
                <span className={cn("font-semibold tracking-tight", text)}>
                    Rendite
                </span>
            )}
        </div>
    )
}

// Alternative minimal version for favicon/small contexts
export function LogoMark({ size = 32 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="logoGradientMark" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
            </defs>

            <circle cx="16" cy="16" r="15" fill="url(#logoGradientMark)" />

            <path
                d="M10 18.5h6M10 15.5h7M12.5 11c-2 0-3.5 1.5-3.5 5s1.5 5 3.5 5c1.5 0 2.5-.8 3-2"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />

            <path
                d="M18 20l3-8 3 4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </svg>
    )
}
