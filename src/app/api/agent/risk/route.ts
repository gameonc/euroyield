import { type NextRequest } from "next/server"
import { readInput, handle } from "@/lib/agent/http"
import { getProtocolRisk } from "@/lib/agent/handlers"

// FREE (trust bonus). Plain-English risk for matching pools.
async function serve(req: NextRequest) {
    const input = await readInput(req)
    return handle(() => getProtocolRisk(input))
}

export const GET = serve
export const POST = serve
