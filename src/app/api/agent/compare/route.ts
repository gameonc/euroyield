import { type NextRequest } from "next/server"
import { readInput, paidHandle } from "@/lib/agent/http"
import { compareYields } from "@/lib/agent/handlers"

// PAID (x402 per-call, or a prepaid PayRam-funded key). Comparison table.
async function serve(req: NextRequest) {
    const input = await readInput(req)
    return paidHandle(req, "compare", () => compareYields(input))
}

export const GET = serve
export const POST = serve
