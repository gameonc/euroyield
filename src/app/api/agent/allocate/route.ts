import { type NextRequest } from "next/server"
import { readInput, handle, bad } from "@/lib/agent/http"
import { recommendTreasuryAllocation } from "@/lib/agent/handlers"

// PAID (x402). The decision layer: risk-scored, jurisdiction-aware, non-custodial
// allocation the caller executes from its own wallet.
async function serve(req: NextRequest) {
    const input = await readInput(req)
    if (typeof input.amount !== "number" || input.amount <= 0) {
        return bad("`amount` (positive number) is required.")
    }
    return handle(() => recommendTreasuryAllocation(input))
}

export const GET = serve
export const POST = serve
