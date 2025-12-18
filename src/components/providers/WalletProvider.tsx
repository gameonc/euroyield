
"use client"
import { WagmiProvider, createConfig, http } from "wagmi"
import { mainnet, arbitrum, optimism, polygon, base } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { injected, walletConnect, coinbaseWallet } from "wagmi/connectors"
import { ReactNode, useState } from "react"

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
if (!walletConnectProjectId) {
    console.warn('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. WalletConnect will not work.')
}

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
        ...(walletConnectProjectId
            ? [walletConnect({ projectId: walletConnectProjectId })]
            : []),
        coinbaseWallet({ appName: 'Rendite' }),
    ],
})

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 minute
            },
        },
    })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
    if (typeof window === 'undefined') {
        // Server: always create a new QueryClient
        return makeQueryClient()
    }
    // Browser: reuse the same QueryClient
    if (!browserQueryClient) {
        browserQueryClient = makeQueryClient()
    }
    return browserQueryClient
}

export function WalletProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(getQueryClient)

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}
