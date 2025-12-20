"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
    LayoutDashboard,
    FileText,
    Menu,
    X,
    Shield,
    Info,
} from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { ConnectWalletModal } from "@/components/modals/ConnectWalletModal"
import { PricingModal } from "@/components/modals/PricingModal"
import { Logo } from "@/components/ui/Logo"

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container flex h-14 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group mr-6">
                    <Logo size="sm" className="group-hover:opacity-80 transition-opacity" />
                    <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground">
                        BETA
                    </span>
                </Link>

                {/* Desktop Navigation - Mega Menu style */}
                <div className="hidden md:flex flex-1">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted to-muted/50 p-6 no-underline outline-none focus:shadow-md"
                                                    href="/"
                                                >
                                                    <LayoutDashboard className="h-6 w-6" />
                                                    <div className="mb-2 mt-4 text-lg font-medium">
                                                        Yield Explorer
                                                    </div>
                                                    <p className="text-sm leading-tight text-muted-foreground">
                                                        The only dashboard dedicated to EUR-pegged assets.
                                                    </p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <ListItem href="/#calculator" title="Yield Calculator">
                                            Forecast your monthly returns with our interactive tools.
                                        </ListItem>
                                        <ListItem href="/alerts" title="Market Alerts">
                                            Get notified when APYs spike or liquidity drops.
                                        </ListItem>
                                        <ListItem href="/portfolio" title="Portfolio Tracker">
                                            Monitor your positions in one secure dashboard.
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                        <ListItem href="/reports" title="Weekly Intel">
                                            Deep-dive market intelligence.
                                        </ListItem>
                                        <ListItem href="/blog" title="Blog">
                                            Latest updates, guides, and ecosystem news.
                                        </ListItem>
                                        <ListItem href="/security" title="Security & Trust">
                                            How we verify data and ensure your safety.
                                        </ListItem>
                                        <ListItem href="/about" title="About Mission">
                                            Our manifesto for a Euro-denominated future.
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />

                    <ConnectWalletModal>
                        <Button variant="outline" size="sm" className="hidden sm:flex h-8 text-xs font-medium">
                            Connect Wallet
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
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation (Simplified) */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t bg-background">
                    <nav className="container py-4 flex flex-col gap-2">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-base">
                                <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
                                Markets
                            </Button>
                        </Link>
                        <Link href="/reports" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-base">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                                Intel & Reports
                            </Button>
                        </Link>
                        <Link href="/security" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-base">
                                <Shield className="h-5 w-5 text-muted-foreground" />
                                Security
                            </Button>
                        </Link>
                        <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-base">
                                <Info className="h-5 w-5 text-muted-foreground" />
                                About
                            </Button>
                        </Link>
                        <div className="border-t pt-4 mt-3 flex flex-col gap-3 px-2">
                            <ConnectWalletModal>
                                <Button variant="outline" className="w-full h-12 text-base">
                                    Connect Wallet
                                </Button>
                            </ConnectWalletModal>
                            <PricingModal>
                                <Button className="w-full h-12 text-base">Upgrade</Button>
                            </PricingModal>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
