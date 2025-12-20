import type { Metadata } from "next"
import { Inter, Outfit } from "next/font/google"
import Script from "next/script"
import "./globals.css"

import { Header } from "@/components/layout/Header"
import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner"
import { Footer } from "@/components/layout/Footer"
import { TooltipProvider } from "@/components/ui/tooltip"

import { DisclaimerModal } from "@/components/modals/DisclaimerModal"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { WalletProvider } from "@/components/providers/WalletProvider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rendite.fi'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Rendite — European DeFi Intelligence',
    template: '%s | Rendite',
  },
  description:
    'Discover, compare, and monitor EUR stablecoin yields across DeFi. Track EURC, EURS, and eEUR rates on Aave, Compound, Curve, and more. Non-custodial analytics with clear risk tags.',
  keywords: [
    'Euro stablecoin',
    'EURC yield',
    'EURS yield',
    'eEUR yield',
    'Euro DeFi',
    'stablecoin APY',
    'EUR DeFi yields',
    'Euro lending rates',
    'DeFi analytics',
    'yield aggregator',
    'Aave Euro',
    'Curve Euro',
  ],
  authors: [{ name: 'Rendite Team' }],
  creator: 'Rendite',
  publisher: 'Rendite',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Rendite',
    title: 'Rendite — European DeFi Intelligence',
    description:
      'Discover and compare Euro stablecoin yields across top DeFi protocols. Track EURC, EURS, and eEUR rates with real-time analytics.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Rendite - European DeFi Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rendite — European DeFi Intelligence',
    description:
      'Discover and compare Euro stablecoin yields across top DeFi protocols. Real-time analytics for EURC, EURS, and eEUR.',
    images: ['/og-image.svg'],
    creator: '@renditefi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  category: 'Finance',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {`{
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Rendite",
            "description": "European DeFi intelligence dashboard",
            "url": "${baseUrl}",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR"
            },
            "creator": {
              "@type": "Organization",
              "name": "Rendite",
              "url": "${baseUrl}"
            }
          }`}
        </Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >

          <WalletProvider>
            <TooltipProvider>
              <AnnouncementBanner />
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <DisclaimerModal />
            </TooltipProvider>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
