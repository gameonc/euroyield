import { Badge } from "@/components/ui/badge"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import type { RiskTag } from "@/types"
import { ShieldCheck, ShieldAlert, Clock, TrendingUp, TrendingDown, Info } from "lucide-react"

interface RiskBadgeProps {
    tag: RiskTag
}

const iconMap: Record<string, React.ElementType> = {
    audited: ShieldCheck,
    unaudited: ShieldAlert,
    high_tvl: TrendingUp,
    low_tvl: TrendingDown,
    established: ShieldCheck,
    new_protocol: Clock,
}

const riskDefinitions: Record<string, { title: string; description: string }> = {
    audited: {
        title: "✅ Security Audit Passed",
        description: "This protocol's code has been reviewed by third-party security experts. While audits don't guarantee 100% safety, they significantly reduce the risk of bugs and hacks.",
    },
    unaudited: {
        title: "⚠️ Unaudited Protocol",
        description: "This protocol hasn't undergone a public security audit. This increases the risk of undiscovered vulnerabilities. Proceed with caution.",
    },
    high_tvl: {
        title: "💧 High Liquidity",
        description: "This pool has over €1M in assets. High liquidity means you can likely enter and exit large positions easily without losing value to slippage.",
    },
    low_tvl: {
        title: "⚠️ Low Liquidity",
        description: "This pool has less than €1M in assets. You might experience price impact (slippage) when trading large amounts.",
    },
    established: {
        title: "🏰 Established Protocol",
        description: "This protocol has been running safely for over 6 months. Time-tested protocols are generally safer than brand new ones.",
    },
    new_protocol: {
        title: "🌱 New Protocol",
        description: "This protocol launched less than 180 days ago. Newer protocols can be innovative but carry a higher risk of undiscovered issues.",
    },
}

export function RiskBadge({ tag }: RiskBadgeProps) {
    const Icon = iconMap[tag.type] || Info
    const definition = riskDefinitions[tag.type]

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Badge
                    variant={tag.isPositive ? "success" : "warning"}
                    className="cursor-help gap-1 pointer-events-auto"
                >
                    <Icon className="h-3 w-3" />
                    {tag.label}
                </Badge>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs bg-popover text-popover-foreground border-border shadow-xl p-3">
                {definition ? (
                    <div className="space-y-1">
                        <p className="subtitle-2 font-semibold flex items-center gap-1.5">
                            {definition.title}
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            {definition.description}
                        </p>
                    </div>
                ) : (
                    <p className="text-xs leading-relaxed">{tag.description || "Risk factor details unavailable."}</p>
                )}
            </TooltipContent>
        </Tooltip>
    )
}

interface RiskTagGroupProps {
    tags: RiskTag[]
    maxVisible?: number
}

export function RiskTagGroup({ tags, maxVisible = 3 }: RiskTagGroupProps) {
    const visibleTags = tags.slice(0, maxVisible)
    const remainingCount = tags.length - maxVisible

    return (
        <div className="flex flex-wrap items-center gap-1">
            {visibleTags.map((tag, index) => (
                <RiskBadge key={`${tag.type}-${index}`} tag={tag} />
            ))}
            {remainingCount > 0 && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Badge variant="outline" className="cursor-help">
                            +{remainingCount}
                        </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                        <div className="space-y-1">
                            {tags.slice(maxVisible).map((tag, index) => (
                                <p key={index}>
                                    {tag.isPositive ? "✅" : "⚠️"} {tag.label}
                                </p>
                            ))}
                        </div>
                    </TooltipContent>
                </Tooltip>
            )}
        </div>
    )
}
