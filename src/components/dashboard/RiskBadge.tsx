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

const descriptionMap: Record<string, string> = {
    audited: "Smart contracts have been audited by security firms to verify safety.",
    unaudited: "Contracts have NOT been audited. Proceed with caution.",
    high_tvl: "High liquidity (>€1M) allows for easy entry and exit.",
    low_tvl: "Low liquidity (<€1M). Watch out for slippage.",
    established: "Protocol has a proven track record of security and stability.",
    new_protocol: "New protocol (<180 days). Risk of undiscovered bugs.",
}

export function RiskBadge({ tag }: RiskBadgeProps) {
    const Icon = iconMap[tag.type] || Info
    const description = descriptionMap[tag.type] || tag.description || "Risk factor details unavailable."

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
            <TooltipContent className="max-w-xs bg-popover text-popover-foreground border-border shadow-xl">
                <p className="text-xs leading-relaxed">{description}</p>
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
