# Rendite MCP Server

Exposes Rendite's euro-stablecoin yield intelligence to AI agents via the
[Model Context Protocol](https://modelcontextprotocol.io). This is Phase 1 of
making Rendite the euro-yield brain that agents call — read-only, non-custodial,
backed by the same `latest_yields` data the web dashboard renders.

## Tools

| Tool | What it answers |
| --- | --- |
| `get_best_euro_yield` | "Where should idle euros earn the most right now?" — top-APY pools, with optional filters. |
| `compare_euro_yields` | Full comparison table of euro-yield pools matching filters, sorted by APY. |
| `get_protocol_risk` | Plain-English risk (audit status, liquidity, APY sustainability, flags) for matching pools. |
| `simulate_euro_yield` | Projects daily/monthly/yearly earnings for a deposit at an explicit or best-available APY. |
| `read_euro_positions` | Read-only on-chain lookup of an address's idle euro balances **and** active yield positions across 5 chains. |

All tools are **read-only**. The server holds no funds, signs nothing, and
requests no token approvals.

## Run locally

```bash
# Requires the same Supabase env as the web app (see .env.example):
#   NEXT_PUBLIC_SUPABASE_URL, and SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY
# Optional per-chain RPC overrides for read_euro_positions:
#   RPC_URL_1, RPC_URL_10, RPC_URL_137, RPC_URL_42161, RPC_URL_8453
npm run mcp
```

The server speaks MCP over stdio.

## Connect a client

Point any MCP client (Claude Desktop, an IDE, an agent runtime) at the launch
command. Example Claude Desktop config:

```json
{
  "mcpServers": {
    "rendite": {
      "command": "npx",
      "args": ["tsx", "src/mcp/server.ts"],
      "cwd": "/absolute/path/to/euroyield"
    }
  }
}
```

## Architecture

- `tools.ts` — transport-agnostic tool definitions + handlers
  (`registerRenditeTools`). Reuses the shared pure functions in
  `src/lib/yields/calculations.ts`, the server data layer in
  `src/lib/yields/data.ts`, and the on-chain reader in
  `src/lib/positions/readPositions.ts`.
- `server.ts` — stdio runner.

Phase 2 (metered / x402 pay-per-call over HTTP) reuses `registerRenditeTools`
unchanged — no tool logic is duplicated.
