import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { AlertTriangle, Info, CheckCircle, Lightbulb } from 'lucide-react'

// Custom callout component
function Callout({
  type = 'info',
  children,
}: {
  type?: 'info' | 'warning' | 'success' | 'tip'
  children: React.ReactNode
}) {
  const styles = {
    info: {
      bg: 'bg-blue-500/10 border-blue-500/20',
      icon: <Info className="h-5 w-5 text-blue-500" />,
    },
    warning: {
      bg: 'bg-amber-500/10 border-amber-500/20',
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    },
    success: {
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      icon: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    },
    tip: {
      bg: 'bg-purple-500/10 border-purple-500/20',
      icon: <Lightbulb className="h-5 w-5 text-purple-500" />,
    },
  }

  const { bg, icon } = styles[type]

  return (
    <div className={`flex gap-3 p-4 rounded-lg border ${bg} my-6 not-prose`}>
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="text-sm">{children}</div>
    </div>
  )
}

// Yield comparison table
function YieldTable({ data }: { data: { protocol: string; apy: string; tvl: string }[] }) {
  return (
    <div className="overflow-x-auto my-6 not-prose">
      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium">Protocol</th>
            <th className="px-4 py-3 text-right text-sm font-medium">APY</th>
            <th className="px-4 py-3 text-right text-sm font-medium">TVL</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-muted/50">
              <td className="px-4 py-3 text-sm font-medium">{row.protocol}</td>
              <td className="px-4 py-3 text-sm text-right text-emerald-500 font-mono">
                {row.apy}
              </td>
              <td className="px-4 py-3 text-sm text-right text-muted-foreground font-mono">
                {row.tvl}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Stablecoin comparison card
function StablecoinCard({
  symbol,
  name,
  issuer,
  backing,
}: {
  symbol: string
  name: string
  issuer: string
  backing: string
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border bg-card my-4 not-prose">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
        €
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="font-bold">{symbol}</span>
          <span className="text-sm text-muted-foreground">({name})</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          <strong>Issuer:</strong> {issuer}
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>Backing:</strong> {backing}
        </p>
      </div>
    </div>
  )
}

// Internal link component
function InternalLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link href={href} className="text-primary hover:underline">
      {children}
    </Link>
  )
}

export const mdxComponents: MDXComponents = {
  // Override default elements
  a: ({ href, children, ...props }) => {
    if (href?.startsWith('/')) {
      return <InternalLink href={href}>{children}</InternalLink>
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
        {...props}
      >
        {children}
      </a>
    )
  },

  // Custom components
  Callout,
  YieldTable,
  StablecoinCard,
}
