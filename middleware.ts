import { type NextRequest, NextResponse } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"
import { paymentMiddleware, type RoutesConfig, type Network } from "x402-next"

// ---------------------------------------------------------------------------
// x402 paywall for the agent API.
//
// SAFETY: X402_PAY_TO is a PUBLIC receiving address only. Never put a private
// key or seed phrase in env — receiving payments needs only the address.
//
// The paywall is OFF until X402_PAY_TO is set, so the app builds and the free
// tools work without a wallet configured. Only the paid routes below are gated;
// /api/agent/risk and /api/agent/positions stay free (trust bonuses).
// ---------------------------------------------------------------------------
const PAY_TO = process.env.X402_PAY_TO as `0x${string}` | undefined
const NETWORK = (process.env.X402_NETWORK ?? "base-sepolia") as Network

const paidRoutes: RoutesConfig = {
    "/api/agent/allocate": {
        price: "$0.01",
        network: NETWORK,
        config: { description: "Non-custodial treasury allocation recommendation" },
    },
    "/api/agent/best-yield": {
        price: "$0.002",
        network: NETWORK,
        config: { description: "Best stablecoin yield" },
    },
    "/api/agent/compare": {
        price: "$0.002",
        network: NETWORK,
        config: { description: "Compare stablecoin yields" },
    },
    "/api/agent/simulate": {
        price: "$0.001",
        network: NETWORK,
        config: { description: "Simulate stablecoin yield earnings" },
    },
}

const facilitator = process.env.X402_FACILITATOR_URL
    ? { url: process.env.X402_FACILITATOR_URL as `${string}://${string}` }
    : undefined

// Built once. Only gates the routes in `paidRoutes`; everything else passes through.
const x402 = PAY_TO ? paymentMiddleware(PAY_TO, paidRoutes, facilitator) : null

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    // Agent API: paid routes accept EITHER a prepaid key (Authorization: Bearer,
    // validated + charged in the route) OR an x402 per-call payment. If a key is
    // presented, skip x402 and let the route enforce credits; otherwise x402 gates.
    if (path.startsWith("/api/agent/")) {
        if (x402 && !request.headers.get("authorization")) return x402(request)
        return NextResponse.next()
    }

    // Everything else: refresh the Supabase auth session as before.
    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
}
