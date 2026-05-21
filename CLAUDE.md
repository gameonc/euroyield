# CLAUDE.md — Rendite

Read this file at the start of every session before touching code.

## Project

**Rendite** is a non-custodial analytics and alerting platform for **EUR-denominated stablecoin yields** across DeFi protocols (EURC, EURS, agEUR, etc.). Read-only — we never hold funds, never request token approvals.

Source of truth lives in `/docs`:
- `/docs/PRD.md` — product requirements + acceptance criteria
- `/docs/ARCHITECTURE.md` — system design
- `/docs/DATA_MODEL.md` — schema
- `/docs/AI_DEV_GUIDE.md` — engineering standards
- `/docs/BUILD_LOG.md` — running record of decisions
- `README.md` — high-level overview

When a task conflicts with anything in these docs, flag it before writing code.

## The 4 rules (always apply)

1. **Ask, don't assume.** If intent, architecture, or requirements are unclear, ask before writing a single line. No silent assumptions.
2. **Simplest solution first.** Implement the simplest thing that could work. No abstractions or flexibility that weren't requested.
3. **Don't touch unrelated code.** If a file or function is not part of the current task, do not modify it — even if you think it could be improved. Mention it at the end instead.
4. **Flag uncertainty explicitly.** If you are not confident about an approach, a library API, or a piece of data, say so before proceeding.

## Tech stack (locked)

Use these. Do not suggest alternatives unless explicitly asked.

- **Language:** TypeScript (strict, no `any`)
- **Framework:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind CSS v4 + shadcn/ui (Radix primitives)
- **Database / Auth:** Supabase (Postgres + RLS + `@supabase/ssr`)
- **Data fetching:** TanStack Query on the client; server cache / ISR on the server
- **Validation:** Zod for all adapter outputs and external payloads
- **Wallets:** wagmi + viem + WalletConnect (read-only; never request approvals)
- **Email:** Resend + React Email
- **Automation / schedulers:** n8n
- **Node:** ≥ 20 (see `.nvmrc`)
- **Package manager:** npm (lockfile is `package-lock.json`)

If something genuinely seems like the wrong tool, flag it — but use the defined stack unless told otherwise.

## Permanent constraints

These are always true. Apply to every task without exception.

- **Non-custodial, read-only.** Never add code paths that hold funds, sign transactions on the user's behalf, request token approvals, or auto-deploy capital.
- **No client-side calls to external DeFi APIs.** All DeFiLlama / protocol API access goes through server routes, jobs, or adapters with server-side caching.
- **Adapter pattern.** New data sources go behind an adapter under the existing structure. Outputs validated with Zod.
- **Risk tags, not scores.** We surface tags (Audited / High TVL / New Protocol). Never introduce a numeric "risk score."
- **No "guaranteed yield" language** anywhere in copy, components, or emails.
- **Idempotent jobs.** Any scheduled or batch job must be safe to rerun.
- **Fail closed.** If data is stale, show "last updated" and degrade gracefully — never silently render stale numbers as fresh.
- **RLS by default** on every new Supabase table.

## Behavior

- **Stay in scope.** Only modify files, functions, and lines directly related to the current task. No drive-by refactors, renames, reformats, or import reorganization.
- **Ask before large content changes.** If you're about to rewrite a doc section, restructure a route, or change tone in user-facing copy, describe what you'll change and wait for confirmation.
- **Confirm before destructive actions.** Deleting files, dropping columns, removing dependencies, or overwriting existing migrations all require an explicit "yes" in the current message.
- **Hard stops — in-session confirmation required, no exceptions:**
  - Pushing to any environment (Vercel, prod, preview-as-prod)
  - Running Supabase migrations or schema changes against a remote project
  - Any irreversible side effect (external email sends, payments, deletions)
- **End every coding task with a summary:**
  - Files changed (every file touched)
  - What was modified (one line per file)
  - Files intentionally not touched (when relevant)
  - Follow-up needed

## Working style

- Keep diffs small (≤ 300 LOC where reasonable; see `/docs/AI_DEV_GUIDE.md`).
- For architecture decisions, perf tradeoffs, or DB design: think it through step by step first, surface tradeoffs, then implement.
- Match response length to task complexity. No filler openers, no restating the question.
- Show 2–3 approaches for any non-trivial task before picking one.

## Definition of Done

A change is done when:
- PRD acceptance criteria met (or PRD updated if scope shifted with approval)
- TypeScript + lint pass
- Unit tests for core logic / adapter parsing
- Telemetry event added where user-visible behavior changed
- Docs updated if architecture or data model changed
- "Files changed" summary posted at end of task
