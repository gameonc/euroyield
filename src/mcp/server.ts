/**
 * Rendite MCP server (stdio transport).
 *
 * Exposes Rendite's euro-stablecoin yield intelligence to any MCP-compatible
 * agent or client (Claude Desktop, IDEs, agent runtimes). All tools are
 * read-only.
 *
 * Run locally:  npm run mcp
 * Configure a client to launch:  tsx src/mcp/server.ts
 *
 * A hosted HTTP transport (metered / x402) reuses `registerRenditeTools`
 * from ./tools in Phase 2 — no tool logic is duplicated here.
 */

import "dotenv/config"
import { config as loadEnv } from "dotenv"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { registerRenditeTools } from "./tools"

// Prefer .env.local (Next.js convention) if present, without clobbering real env.
loadEnv({ path: ".env.local", override: false })

async function main() {
    const server = new McpServer({
        name: "rendite-euro-yield",
        version: "0.1.0",
    })

    registerRenditeTools(server)

    const transport = new StdioServerTransport()
    await server.connect(transport)

    // stdout is the MCP channel; log to stderr only.
    console.error("Rendite MCP server running on stdio.")
}

main().catch((err) => {
    console.error("Fatal error starting Rendite MCP server:", err)
    process.exit(1)
})
