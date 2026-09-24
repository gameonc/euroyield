import { type NextRequest } from "next/server"
import { readInput, handle } from "@/lib/agent/http"
import { compareYields } from "@/lib/agent/handlers"

// PAID (x402). Full comparison table of matching pools, sorted by APY.
async function serve(req: NextRequest) {
    const input = await readInput(req)
    return handle(() => compareYields(input))
}

export const GET = serve
export const POST = serve
