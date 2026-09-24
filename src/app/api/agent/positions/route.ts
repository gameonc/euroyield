import { type NextRequest } from "next/server"
import { readInput, handle, bad } from "@/lib/agent/http"
import { readPositions } from "@/lib/agent/handlers"

// FREE (trust bonus). Read-only on-chain stablecoin positions for an address.
async function serve(req: NextRequest) {
    const input = await readInput(req)
    const address = input.address
    if (typeof address !== "string" || !address) {
        return bad("`address` (EVM 0x...) is required.")
    }
    return handle(() => readPositions(address))
}

export const GET = serve
export const POST = serve
