# Rendite MCP Server — the treasury yield brain for AI agents

Exposes Rendite's stablecoin yield intelligence and a non-custodial allocation
**decision layer** to AI agents via the
[Model Context Protocol](https://modelcontextprotocol.io). Multi-stablecoin
(USD + EUR), read-only, non-custodial — Rendite holds no funds, signs nothing,
and takes no approvals. It sits between an agent runtime and the commoditized
venues (Aave/Morpho/Compound/…) and answers *"where should this idle treasury go?"*.

## Tools

| Tool | What it answers |
| --- | --- |
| `get_best_yield` | "Where should idle stablecoins earn the most right now?" — top-APY pools (USD/EUR), filterable. |
| `compare_yields` | Full comparison table of stablecoin yield pools matching filters, sorted by APY. |
| `get_protocol_risk` | Plain-English risk (audit status, liquidity, APY sustainability, flags) for matching pools. |
| `simulate_yield` | Projects daily/monthly/yearly earnings for a deposit at an explicit or best-available APY. |
| `read_stablecoin_positions` | Read-only lookup of an address's idle stablecoin balances **and** active yield positions across chains. |
| `recommend_treasury_allocation` | **The decision layer** — given an amount + risk policy, returns a risk-scored, diversified, non-custodial allocation the agent executes itself. |

All tools are **read-only / advisory**. The server never holds funds, signs, or
requests approvals.

## Run locally

```bash
# Requires the same Supabase env as the web app (see .env.example):
#   NEXT_PUBLIC_SUPABASE_URL, and SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY
# Optional per-chain RPC overrides for read_stablecoin_positions:
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
  `src/lib/yields/calculations.ts`, the allocator in `src/lib/yields/allocate.ts`,
  the server data layer in `src/lib/yields/data.ts`, and the on-chain reader in
  `src/lib/positions/readPositions.ts`.
- `server.ts` — stdio runner.

Phase 2 (metered / x402 pay-per-call over HTTP) reuses `registerRenditeTools`
unchanged — the money-making tools (`get_best_yield`,
`recommend_treasury_allocation`) go behind x402; `get_protocol_risk` and
`read_stablecoin_positions` stay free as trust bonuses.
