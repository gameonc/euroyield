import { type NextRequest } from "next/server"
import { readInput, paidHandle, bad } from "@/lib/agent/http"
import { recommendTreasuryAllocation } from "@/lib/agent/handlers"

// PAID (x402 per-call, or a prepaid PayRam-funded key). The decision layer:
// risk-scored, jurisdiction-aware, non-custodial allocation the caller executes.
async function serve(req: NextRequest) {
    const input = await readInput(req)
    if (typeof input.amount !== "number" || input.amount <= 0) {
        return bad("`amount` (positive number) is required.")
    }
    return paidHandle(req, "allocate", () => recommendTreasuryAllocation(input))
}

export const GET = serve
export const POST = serve
