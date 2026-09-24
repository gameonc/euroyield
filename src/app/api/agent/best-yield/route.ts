import { type NextRequest } from "next/server"
import { readInput, handle } from "@/lib/agent/http"
import { getBestYield } from "@/lib/agent/handlers"

// PAID (x402). Highest-APY stablecoin pools, filterable.
async function serve(req: NextRequest) {
    const input = await readInput(req)
    return handle(() => getBestYield(input))
}

export const GET = serve
export const POST = serve
