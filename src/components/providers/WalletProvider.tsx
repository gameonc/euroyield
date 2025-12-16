
"use client"
import { WagmiProvider, createConfig, http } from "wagmi"
import { mainnet, arbitrum, optimism, polygon, base } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { injected, walletConnect, coinbaseWallet } from "wagmi/connectors"
import { ReactNode } from "react"

const config = createConfig({
    chains: [mainnet, arbitrum, optimism, polygon, base],
    transports: {
        [mainnet.id]: http(),
        [arbitrum.id]: http(),
        [optimism.id]: http(),
        [polygon.id]: http(),
        [base.id]: http(),
    },
    connectors: [
        injected(),
        walletConnect({ projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'c045b85a36324fa30462058308801ce4' }), // Using a public demo ID if null
        coinbaseWallet({ appName: 'Rendite' }),
    ],
})

const queryClient = new QueryClient()

export function WalletProvider({ children }: { children: ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}
