"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RiskTagGroup } from "./RiskBadge"
import type { LatestYield } from "@/types/database" // Using DB type
import {
    ArrowUpDown,
    ExternalLink,
    ChevronDown,
    ChevronUp,
    Filter,
    Flag,
    Download,
    TrendingUp,
    TrendingDown,
    Bell
} from "lucide-react"
import { cn } from "@/lib/utils"

import { getDepositUrl } from "@/lib/constants/urls"
import { AlertModal } from "@/components/alerts/AlertModal"

// Removed local PROTOCOL_DEPOSIT_URLS definition
// Removed local getDepositUrl function

const PROTOCOL_LOGOS: Record<string, string> = {
    // Major protocols
    "aave": "/protocols/aave.svg",
    "aave v3": "/protocols/aave.svg",
    "aave-v3": "/protocols/aave.svg",
    "morpho": "/protocols/morpho.svg",
    "morpho blue": "/protocols/morpho.svg",
    "morpho-blue": "/protocols/morpho.svg",
    "curve": "/protocols/curve.svg",
    "curve finance": "/protocols/curve.svg",
    "curve-finance": "/protocols/curve.svg",
    "compound": "/protocols/compound.svg",
    "compound v3": "/protocols/compound.svg",
    "compound-v3": "/protocols/compound.svg",
    "angle": "/protocols/angle.svg",
    "angle protocol": "/protocols/angle.svg",
    "merkl": "/protocols/merkl.svg",
    // Yield aggregators
    "yearn": "/protocols/yearn.svg",
    "yearn-finance": "/protocols/yearn.svg",
    "yearn finance": "/protocols/yearn.svg",
    "harvest": "/protocols/harvest.svg",
    "harvest-finance": "/protocols/harvest.svg",
    "harvest finance": "/protocols/harvest.svg",
    // Lending protocols
    "radiant": "/protocols/radiant.svg",
    "radiant-v2": "/protocols/radiant.svg",
    "radiant v2": "/protocols/radiant.svg",
    "moonwell": "/protocols/moonwell.svg",
    "moonwell-lending": "/protocols/moonwell.svg",
    "fluid": "/protocols/fluid.svg",
    "fluid-lending": "/protocols/fluid.svg",
    "extra": "/protocols/extra.svg",
    "extra-finance": "/protocols/extra.svg",
    "extra-finance-xlend": "/protocols/extra.svg",
    // Additional protocols
    "autofinance": "/protocols/autofinance.svg",
    "yo": "/protocols/yo.svg",
    "yo-protocol": "/protocols/yo.svg",
    "yo protocol": "/protocols/yo.svg",
}

function ProtocolLogo({ name }: { name: string }) {
    const logoPath = PROTOCOL_LOGOS[name.toLowerCase()]

    if (logoPath) {
        return (
            <Image
                src={logoPath}
                alt={`${name} logo`}
                width={36}
                height={36}
                className="rounded"
            />
        )
    }

    return (
        <div className="h-9 w-9 rounded bg-muted/80 border flex items-center justify-center text-xs font-bold text-muted-foreground">
            {name.slice(0, 1)}
        </div>
    )
}

interface YieldTableProps {
    data: LatestYield[]
}

type SortField = "apy" | "tvl" | "protocol"
type SortDirection = "asc" | "desc"

// Extracted component to fix "Component inside render" error
const SortIcon = ({ field, currentField, direction }: { field: SortField, currentField: SortField, direction: SortDirection }) => {
    if (currentField !== field) return <ArrowUpDown className="h-3 w-3 ml-1 opacity-30" />
    return direction === "asc"
        ? <ChevronUp className="h-3 w-3 ml-1 text-primary" />
        : <ChevronDown className="h-3 w-3 ml-1 text-primary" />
}

export function YieldTable({ data }: YieldTableProps) {
    const [sortField, setSortField] = useState<SortField>("apy")
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
    const [selectedChain, setSelectedChain] = useState<string>("all")

    const toggleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("desc")
        }
    }

    // derived chains
    const chains = ["all", ...Array.from(new Set(data.map(i => i.chain)))]

    // Filter then Sort
    const filteredData = selectedChain === "all"
        ? data
        : data.filter(item => item.chain === selectedChain)

    const sortedYields = [...filteredData].sort((a, b) => {
        let comparison = 0
        switch (sortField) {
            case "apy":
                comparison = a.apy - b.apy
                break
            case "tvl":
                comparison = a.tvl - b.tvl
                break
            case "protocol":
                comparison = a.protocol_name.localeCompare(b.protocol_name)
                break
        }
        return sortDirection === "asc" ? comparison : -comparison
    })

    const formatTVL = (tvl: number) => {
        if (tvl >= 1000000) {
            return `€${(tvl / 1000000).toFixed(2)}M`
        }
        return `€${(tvl / 1000).toFixed(0)}K`
    }

    const handleExport = () => {
        const headers = ["Protocol,Pool,Chain,Asset,APY,TVL"];
        const rows = sortedYields.map(item =>
            `${item.protocol_name},${item.pool_name},${item.chain},${item.stablecoin},${item.apy},${item.tvl}`
        );

        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `rendite_yields_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="rounded-lg border bg-card/50 backdrop-blur-sm overflow-hidden">
            {/* Header / Filter Bar */}
            <div className="px-4 py-3 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/20">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-2 py-1">
                        <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Chain:
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {chains.map(chain => (
                            <button
                                key={chain}
                                onClick={() => setSelectedChain(chain)}
                                className={cn(
                                    "px-3 py-1.5 rounded text-xs font-medium capitalize transition-colors border min-h-[36px]",
                                    selectedChain === chain
                                        ? "bg-primary/10 text-primary border-primary/20"
                                        : "bg-transparent text-muted-foreground border-transparent hover:bg-muted hover:text-foreground"
                                )}
                            >
                                {chain}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-7 text-xs font-medium text-muted-foreground" onClick={handleExport}>
                        <Download className="h-3.5 w-3.5 mr-1.5" />
                        Export
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border/50 text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                            <th className="px-4 py-3 text-left w-[240px]">
                                <button onClick={() => toggleSort("protocol")} className="flex items-center hover:text-foreground group">
                                    Protocol / Pool
                                    <SortIcon field="protocol" currentField={sortField} direction={sortDirection} />
                                </button>
                            </th>
                            <th className="px-4 py-3 text-left">Asset</th>
                            <th className="px-4 py-3 text-left">Chain</th>
                            <th className="px-4 py-3 text-right">
                                <button onClick={() => toggleSort("apy")} className="flex items-center justify-end w-full hover:text-foreground group">
                                    Net APY
                                    <SortIcon field="apy" currentField={sortField} direction={sortDirection} />
                                </button>
                            </th>
                            <th className="px-4 py-3 text-right">
                                <button onClick={() => toggleSort("tvl")} className="flex items-center justify-end w-full hover:text-foreground group">
                                    TVL (EUR)
                                    <SortIcon field="tvl" currentField={sortField} direction={sortDirection} />
                                </button>
                            </th>
                            <th className="px-4 py-3 text-left">Risk Factors</th>
                            <th className="px-4 py-3 text-right w-[80px]"></th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {sortedYields.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-12 text-muted-foreground text-sm">
                                    No yield pools found matching your criteria.
                                </td>
                            </tr>
                        ) : sortedYields.map((pool) => (
                            <tr
                                key={pool.id}
                                className="border-b border-border/30 last:border-0 hover:bg-muted/40 transition-colors group"
                            >
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <ProtocolLogo name={pool.protocol_name} />
                                        <div className="flex flex-col">
                                            <span className="font-medium text-foreground">{pool.protocol_name}</span>
                                            <span className="text-xs text-muted-foreground font-mono">{pool.pool_name}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <Badge variant="outline" className="font-mono text-xs border-border/60 font-normal text-muted-foreground">
                                        {pool.stablecoin}
                                    </Badge>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className={`h-1.5 w-1.5 rounded-full ${pool.chain === 'ethereum' ? 'bg-indigo-500' :
                                            pool.chain === 'arbitrum' ? 'bg-blue-500' :
                                                pool.chain === 'optimism' ? 'bg-red-500' :
                                                    pool.chain === 'polygon' ? 'bg-purple-500' :
                                                        'bg-gray-500'
                                            }`} />
                                        <span className="text-xs text-muted-foreground capitalize">{pool.chain}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex flex-col items-end">
                                        <span className={`font-mono font-medium ${pool.apy > 5 ? 'text-emerald-500' : 'text-foreground'}`}>
                                            {pool.apy.toFixed(2)}%
                                        </span>
                                        {pool.apy_delta !== null && pool.apy_delta !== 0 && (
                                            <div className={`flex items-center text-[10px] ${pool.apy_delta > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                                {pool.apy_delta > 0 ? (
                                                    <TrendingUp className="h-2.5 w-2.5 mr-0.5" />
                                                ) : (
                                                    <TrendingDown className="h-2.5 w-2.5 mr-0.5" />
                                                )}
                                                {Math.abs(pool.apy_delta).toFixed(2)}%
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <span className="font-mono text-muted-foreground">
                                        {formatTVL(pool.tvl)}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <RiskTagGroup tags={pool.risk_tags} maxVisible={2} />
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <AlertModal
                                            protocolName={pool.protocol_name}
                                            protocolSlug={pool.protocol_slug}
                                            chain={pool.chain}
                                            currentApy={pool.apy}
                                        >
                                            <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-amber-500 transition-colors" title="Set Alert">
                                                <Bell className="h-3.5 w-3.5" />
                                            </Button>
                                        </AlertModal>
                                        {(() => {
                                            const depositUrl = getDepositUrl(pool.protocol_slug, pool.chain)
                                            return depositUrl ? (
                                                <Button size="sm" variant="outline" className="h-7 px-3 text-xs font-medium" asChild>
                                                    <a
                                                        href={depositUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Deploy
                                                        <ExternalLink className="h-3 w-3 ml-1.5" />
                                                    </a>
                                                </Button>
                                            ) : (
                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button size="icon" variant="ghost" className="h-7 w-7" title="Report Issue" onClick={() => alert("Reporting logic coming soon")}>
                                                        <Flag className="h-3.5 w-3.5 text-muted-foreground hover:text-red-400 transition-colors" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" className="h-7 w-7" asChild>
                                                        <a
                                                            href={pool.protocol_url || "#"}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={cn(!pool.protocol_url && "pointer-events-none opacity-50")}
                                                        >
                                                            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                                                        </a>
                                                    </Button>
                                                </div>
                                            )
                                        })()}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-muted/20 px-4 py-2 border-t flex justify-between items-center text-[10px] text-muted-foreground font-mono">
                <div>
                    Processed {sortedYields.length} pools
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live
                </div>
            </div>
        </div>
    )
}
