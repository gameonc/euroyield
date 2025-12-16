# AI Dev Guide — EuroYield

## Golden rule
No code is written until:
1) PRD section exists + acceptance criteria defined
2) Task is broken into “small diffs” (≤300 LOC)

## How we use AI (Cursor/Claude Code)
### Prompt structure (copy)
ROLE: Senior full-stack engineer (Next.js + Supabase)
CONTEXT: See /docs/PRD.md + /docs/ARCHITECTURE.md
OBJECTIVE: Implement <feature> exactly as specified
CONSTRAINTS:
- TypeScript strict
- No client-side calls to external DeFi APIs
- Add tests
- Add telemetry events
OUTPUT:
- Files changed list
- Code changes
- Tests
- Manual QA steps

## Engineering standards
- TypeScript strict, no any
- Zod for runtime validation of adapter outputs
- Idempotent jobs (safe to rerun)
- Fail closed: if data is stale, show “last updated” + degrade gracefully

## Required checks per PR
- Lint + typecheck
- Adapter unit tests (parsers)
- E2E smoke test: landing → signup → dashboard → create alert
- Update docs when architecture decisions change

## Definition of Done
- Meets PRD acceptance
- Tests added/updated
- Observability: logs + events
- Documentation updated
