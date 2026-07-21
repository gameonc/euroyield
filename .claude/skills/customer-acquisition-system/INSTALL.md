# Reusing this skill across businesses

This is a portable Claude skill: the **customer-acquisition & revenue operating
system**. It is business-agnostic — apply it to any venture's acquire → close →
retain funnel.

This copy in the repo is the **durable, version-controlled source of truth**. It is
committed so it survives ephemeral sessions and can be re-installed anywhere.

## Install as a global (personal) skill — available in every session

Copy the folder into your personal skills directory:

```bash
cp -r .claude/skills/customer-acquisition-system ~/.claude/skills/
```

It then loads automatically whenever a task is about building or fixing the
acquisition/closing/revenue-ops part of a funnel (see the `description` in `SKILL.md`).

## Use it in a specific project instead

Keep it (or copy it) under that project's `.claude/skills/` and it loads for that
repo's sessions.

## Apply it to a new business

**Start by plugging in a profile** (`profiles/`) — copy `profiles/_TEMPLATE.md` to
`profiles/<business-type>.md` and fill it (or use `profiles/brokerage.md` as a worked
example). That pre-configures channels, cadence, compliance, KPIs, and objections for the
business type — so you don't rebuild the wheel each time.

Then the skill routes you through the full funnel:
0. **Plug in the profile** (`profiles/`) — the reusable configuration layer
1. **Foundation** — CRM / data model + channel economics (measurement spine)
2. **Top of funnel** — cold outreach & prospecting (+ compliance)
3. **Mid funnel** — the follow-up engine (speed + persistence)
4. **Bottom of funnel** — closing toolkit (discovery, qualify, objections, close)
5. **Relationship & pricing** — referral/partner mechanics + pricing ladder
6. **Behind it all** — AI-augmented workflow + data governance

Reusable scripts for every stage live in `assets/scripts-library.md`. Keep the reference
files generic — put the venture's real channels, ceilings, and SLAs in its profile.
