import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    User,
    CreditCard,
    Bell,
    Shield,
    Wallet,
    Mail,
    MessageCircle,
} from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="container py-8 space-y-8">
            {/* Header */}
            <section>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account, preferences, and subscription
                </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardContent className="p-2">
                            <nav className="space-y-1">
                                {[
                                    { icon: User, label: "Profile", active: true },
                                    { icon: Wallet, label: "Connected Wallets", active: false },
                                    { icon: Bell, label: "Notifications", active: false },
                                    { icon: CreditCard, label: "Subscription", active: false },
                                    { icon: Shield, label: "Security", active: false },
                                ].map((item) => (
                                    <button
                                        key={item.label}
                                        className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors ${item.active
                                            ? "bg-primary/10 text-primary font-medium"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                            }`}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Profile Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Profile
                            </CardTitle>
                            <CardDescription>
                                Manage your account information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email Address</label>
                                <Input type="email" placeholder="you@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Display Name</label>
                                <Input placeholder="Your name" />
                            </div>
                            <Button>Save Changes</Button>
                        </CardContent>
                    </Card>

                    {/* Connected Wallets */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Wallet className="h-5 w-5" />
                                Connected Wallets
                            </CardTitle>
                            <CardDescription>
                                Manage wallets linked to your account (read-only access)
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Wallet className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-mono text-sm">0x1234...5678</p>
                                        <p className="text-xs text-muted-foreground">Connected via WalletConnect</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" className="text-destructive">
                                    Disconnect
                                </Button>
                            </div>
                            <Button variant="outline" className="mt-4 gap-2">
                                <Wallet className="h-4 w-4" />
                                Add Another Wallet
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Notification Preferences */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="h-5 w-5" />
                                Notifications
                            </CardTitle>
                            <CardDescription>
                                Choose how you want to receive alerts and reports
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Email Notifications</p>
                                        <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                                    </div>
                                </div>
                                <Badge variant="outline" className="text-emerald-500 border-emerald-500/50">Enabled</Badge>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <MessageCircle className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Telegram Notifications</p>
                                        <p className="text-sm text-muted-foreground">Connect your Telegram account</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Connect</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Subscription */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5" />
                                Subscription
                            </CardTitle>
                            <CardDescription>
                                Manage your plan and billing
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-4 rounded-lg border border-primary/20 bg-primary/5">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold">Free Plan</p>
                                        <Badge variant="outline">Current</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Basic yield explorer and calculator access
                                    </p>
                                </div>
                                <Button className="gap-2">
                                    Upgrade to Pro
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Danger Zone */}
                    <Card className="border-destructive/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-destructive">
                                <Shield className="h-5 w-5" />
                                Danger Zone
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Delete Account</p>
                                <p className="text-sm text-muted-foreground">
                                    Permanently delete your account and all data
                                </p>
                            </div>
                            <Button variant="outline" className="text-destructive border-destructive/50">
                                Delete Account
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
