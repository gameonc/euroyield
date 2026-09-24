import { type NextRequest } from "next/server"
import { readInput, handle, bad } from "@/lib/agent/http"
import { simulateYield } from "@/lib/agent/handlers"

// PAID (x402). Projected earnings for a deposit at explicit or best-available APY.
async function serve(req: NextRequest) {
    const input = await readInput(req)
    if (typeof input.amount !== "number" || input.amount <= 0) {
        return bad("`amount` (positive number) is required.")
    }
    return handle(() => simulateYield(input))
}

export const GET = serve
export const POST = serve
