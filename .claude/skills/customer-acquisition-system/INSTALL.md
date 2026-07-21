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

Just describe the business and the funnel problem — the skill routes you through:
1. CRM / data model (measurement spine)
2. Channel economics (CAC, contribution-margin LTV, payback, marginal CAC)
3. Relational acquisition + pricing posture (referral & partner mechanics, pricing ladder)
4. AI-augmented workflow + data governance

Then translate the generic enums and the driver-recruiting example to that venture's
real channels, supply side, ceilings, and SLAs.
