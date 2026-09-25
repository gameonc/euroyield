import { type NextRequest } from "next/server"
import { readInput, paidHandle } from "@/lib/agent/http"
import { getBestYield } from "@/lib/agent/handlers"

// PAID (x402 per-call, or a prepaid PayRam-funded key). Highest-APY pools.
async function serve(req: NextRequest) {
    const input = await readInput(req)
    return paidHandle(req, "best-yield", () => getBestYield(input))
}

export const GET = serve
export const POST = serve
