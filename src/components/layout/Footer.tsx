"use client"

import Link from "next/link"
import { Euro, Mail, Shield } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

function ComingSoonLink({ children }: { children: React.ReactNode }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <span className="cursor-not-allowed opacity-60 hover:opacity-80 transition-opacity">
                    {children}
                </span>
            </TooltipTrigger>
            <TooltipContent>
                <p>Coming Soon</p>
            </TooltipContent>
        </Tooltip>
    )
}

export function Footer() {
    return (
        <TooltipProvider>
            <footer className="border-t bg-background">
                <div className="container py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                                <Euro className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <span className="text-lg font-bold">Rendite</span>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-4">
                            The de facto source for Euro DeFi yields.
                        </p>
                        <div className="flex gap-3">
                            <a href="https://x.com/renditefi" target="_blank" rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </a>
                            <a href="mailto:hello@rendite.fi"
                                className="text-muted-foreground hover:text-foreground transition-colors">
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/" className="hover:text-foreground transition-colors">Yield Explorer</Link></li>
                            <li><Link href="/portfolio" className="hover:text-foreground transition-colors">Portfolio</Link></li>
                            <li><Link href="/alerts" className="hover:text-foreground transition-colors">Alerts</Link></li>
                            <li><Link href="/reports" className="hover:text-foreground transition-colors">Reports</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-foreground transition-colors">About & Mission</Link></li>
                            <li><Link href="/security" className="hover:text-foreground transition-colors">Security & Trust</Link></li>
                            <li><Link href="/api-docs" className="hover:text-foreground transition-colors">API</Link></li>
                            <li><ComingSoonLink>Status</ComingSoonLink></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><ComingSoonLink>Privacy Policy</ComingSoonLink></li>
                            <li><ComingSoonLink>Terms of Service</ComingSoonLink></li>
                            <li><Link href="/security" className="hover:text-foreground transition-colors">Risk Disclaimer</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Security Note */}
                <div className="mt-8 p-4 rounded-lg bg-muted/30 border">
                    <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                        <div className="text-sm text-muted-foreground">
                            <p className="font-medium text-foreground mb-1">Security First</p>
                            <p>
                                Rendite is read-only. We never request transaction signing,
                                token approvals, or access to your funds.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} Rendite.</p>
                    <p className="text-center sm:text-right">
                        Not financial advice. Smart contracts carry risk.
                    </p>
                </div>
            </div>
            </footer>
        </TooltipProvider>
    )
}
