
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    LayoutDashboard,
    Wallet,
    Bell,
    FileText,
    BookOpen,
    Settings,
    Menu,
    X,
} from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { ConnectWalletModal } from "@/components/modals/ConnectWalletModal"
import { PricingModal } from "@/components/modals/PricingModal"

const navItems = [
    { href: "/", label: "Markets", icon: LayoutDashboard },
    { href: "/blog", label: "Blog", icon: BookOpen },
    { href: "/portfolio", label: "Portfolio", icon: Wallet },
    { href: "/alerts", label: "Alerts", icon: Bell },
    { href: "/reports", label: "Intel", icon: FileText },
]

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container flex h-14 items-center justify-between">
                {/* Logo - Text Only, Heavy Typography */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-foreground text-background font-bold h-6 w-6 flex items-center justify-center rounded-sm text-xs">
                        €
                    </div>
                    <span className="font-bold text-lg tracking-tight group-hover:opacity-80 transition-opacity">
                        Rendite
                    </span>
                    <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground">
                        BETA
                    </span>
                </Link>

                {/* Desktop Navigation - Minimal */}
                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                        >
                            {/* <item.icon className="h-4 w-4 opacity-50" /> */}
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Side Actions */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />

                    <ConnectWalletModal>
                        <Button variant="outline" size="sm" className="hidden sm:flex h-8 text-xs font-medium">
                            Connect
                        </Button>
                    </ConnectWalletModal>

                    <PricingModal>
                        <Button size="sm" className="hidden sm:flex h-8 text-xs bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                            Upgrade
                        </Button>
                    </PricingModal>

                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden h-8 w-8"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t bg-background">
                    <nav className="container py-4 flex flex-col gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                                    <item.icon className="h-4 w-4 text-muted-foreground" />
                                    {item.label}
                                </Button>
                            </Link>
                        ))}
                        <Link
                            href="/settings"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                                <Settings className="h-4 w-4 text-muted-foreground" />
                                Settings
                            </Button>
                        </Link>
                        <div className="border-t pt-4 mt-2 flex flex-col gap-2 px-2">
                            <ConnectWalletModal>
                                <Button variant="outline" className="w-full">
                                    Connect Wallet
                                </Button>
                            </ConnectWalletModal>
                            <PricingModal>
                                <Button className="w-full">Upgrade to Pro</Button>
                            </PricingModal>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}
