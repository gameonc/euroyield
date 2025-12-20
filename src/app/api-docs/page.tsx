"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, Zap, Lock, Clock, Copy, Check } from "lucide-react"
import { useState } from "react"

function CodeBlock({ code }: { code: string }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            // Clipboard API failed - silently ignore
        }
    }

    return (
        <div className="relative group">
            <pre className="bg-muted/50 border rounded-lg p-3 sm:p-4 overflow-x-auto text-xs sm:text-sm font-mono">
                <code>{code}</code>
            </pre>
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-10 w-10 sm:h-8 sm:w-8 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity bg-muted/80 sm:bg-transparent"
                onClick={handleCopy}
            >
                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            </Button>
        </div>
    )
}

export default function ApiDocsPage() {
    return (
        <div className="min-h-screen">
            <section className="border-b bg-dot-pattern">
                <div className="container py-16 md:py-20">
                    <div className="space-y-4 max-w-3xl">
                        <Badge variant="outline" className="mb-2">Developer Preview</Badge>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-outfit">API Documentation</h1>
                        <p className="text-lg text-muted-foreground font-light">
                            Access Euro stablecoin yield data programmatically. Real-time rates, historical data, and pool analytics.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container py-12 space-y-12">
                {/* Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-card/50">
                        <CardHeader className="pb-2">
                            <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-2">
                                <Zap className="h-5 w-5 text-emerald-500" />
                            </div>
                            <CardTitle className="text-lg">Real-time Data</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Updated every 6 hours from DeFiLlama and on-chain sources.</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50">
                        <CardHeader className="pb-2">
                            <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-2">
                                <Lock className="h-5 w-5 text-blue-500" />
                            </div>
                            <CardTitle className="text-lg">Authentication</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">API keys available for Pro and Institutional subscribers.</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50">
                        <CardHeader className="pb-2">
                            <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-2">
                                <Clock className="h-5 w-5 text-orange-500" />
                            </div>
                            <CardTitle className="text-lg">Rate Limits</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">100 requests/hour (Free), 10,000/hour (Pro).</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Endpoints */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold font-outfit">Endpoints</h2>

                    {/* GET /yields */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">GET</Badge>
                                <code className="text-lg font-mono">/api/v1/yields</code>
                            </div>
                            <CardDescription>
                                Returns all current Euro stablecoin yield opportunities.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium mb-2">Example Request</p>
                                <CodeBlock code={`curl -X GET "https://api.rendite.fi/v1/yields" \\
  -H "Authorization: Bearer YOUR_API_KEY"`} />
                            </div>
                            <div>
                                <p className="text-sm font-medium mb-2">Response</p>
                                <CodeBlock code={`{
  "data": [
    {
      "protocol": "Aave V3",
      "pool": "EURC Supply",
      "chain": "ethereum",
      "apy": 4.25,
      "tvl": 45000000,
      "stablecoin": "EURC",
      "risk_tags": ["audited", "high_tvl"]
    }
  ],
  "updated_at": "2024-12-21T12:00:00Z"
}`} language="json" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* GET /yields/:protocol */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">GET</Badge>
                                <code className="text-lg font-mono">/api/v1/yields/:protocol</code>
                            </div>
                            <CardDescription>
                                Returns yields for a specific protocol (e.g., aave, morpho, curve).
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium mb-2">Example Request</p>
                                <CodeBlock code={`curl -X GET "https://api.rendite.fi/v1/yields/aave" \\
  -H "Authorization: Bearer YOUR_API_KEY"`} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* GET /history */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">GET</Badge>
                                <code className="text-lg font-mono">/api/v1/history/:pool_id</code>
                            </div>
                            <CardDescription>
                                Returns historical APY data for a specific pool. Pro tier required.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium mb-2">Query Parameters</p>
                                <div className="bg-muted/50 border rounded-lg p-4 space-y-2 text-sm">
                                    <div className="flex gap-4">
                                        <code className="font-mono text-primary">days</code>
                                        <span className="text-muted-foreground">Number of days (default: 30, max: 365)</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <code className="font-mono text-primary">interval</code>
                                        <span className="text-muted-foreground">Data interval: hourly, daily (default: daily)</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Coming Soon */}
                <Card className="border-dashed">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Code className="h-5 w-5" />
                            Coming Soon
                        </CardTitle>
                        <CardDescription>
                            We&apos;re building more endpoints based on user feedback.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• WebSocket feeds for real-time yield updates</li>
                            <li>• Portfolio simulation endpoints</li>
                            <li>• Alert webhook integrations</li>
                            <li>• Historical TVL and risk metrics</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* CTA */}
                <div className="text-center py-8">
                    <h3 className="text-xl font-semibold mb-2">Ready to integrate?</h3>
                    <p className="text-muted-foreground mb-6">
                        Contact us to get your API key and start building.
                    </p>
                    <Button asChild>
                        <a href="mailto:api@rendite.fi">Request API Access</a>
                    </Button>
                </div>
            </div>
        </div>
    )
}
