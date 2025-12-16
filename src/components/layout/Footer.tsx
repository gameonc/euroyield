import Link from "next/link"
import { Euro, Twitter, Mail, Shield } from "lucide-react"

export function Footer() {
    return (
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
                            Euro stablecoin yield analytics.
                        </p>
                        <div className="flex gap-3">
                            <a href="https://twitter.com/renditefi" target="_blank" rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors">
                                <Twitter className="h-5 w-5" />
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
                            <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Risk Disclaimer</a></li>
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
    )
}
