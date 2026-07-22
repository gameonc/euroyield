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

## Install it in your OTHER projects (two routes)

Skill discovery is **automatic**: wherever this skill lives, Claude reads its `description` and
pulls it up on its own whenever a task matches — you never wire a project to it manually.

**Route 1 — Everywhere at once (one-click).** Use the packaged `.skill` file: tap **"Save skill"**
on the file card and it installs to your profile, becoming available across all your Claude
projects. Re-package anytime with:
`python -m scripts.package_skill <path>/customer-acquisition-system` (skill-creator).

**Route 2 — Per project (committed to a repo).** Copy the whole
`customer-acquisition-system/` folder into that repo's `.claude/skills/` directory and commit it.
Shortcut: in a Claude session on that project, just say *"install my customer-acquisition-system
skill"* and have it recreate the folder there.

Note: the description must stay **under 1024 characters** to package/install — keep it lean if you edit it.

## Apply it to a new business

**Start by plugging in a profile** (`profiles/`) — copy `profiles/_TEMPLATE.md` to
`profiles/<business-type>.md` and fill it. For a family of related businesses, use a base +
overlay (see `profiles/brokerage/base.md` with `freight.md` / `real-estate.md` / `insurance.md`
as a worked example). That pre-configures channels, cadence, compliance, KPIs, and objections for
the business type — so you don't rebuild the wheel each time.

Then the skill routes you through the full funnel:
0. **Plug in the profile** (`profiles/`) — the reusable configuration layer
1. **Foundation** — CRM / data model + channel economics (measurement spine)
2. **Top of funnel** — cold outreach & prospecting (+ compliance)
3. **Mid funnel** — the follow-up engine (speed + persistence)
4. **Bottom of funnel** — closing toolkit (discovery, qualify, objections, close)
5. **Relationship & pricing** — referral/partner mechanics + pricing ladder
6. **Keep & grow** — retention, expansion & win-back (lifecycle)
7. **Run the machine** — sales ops (roles, comp, metrics, tech stack)
8. **Behind it all** — AI-augmented workflow + data governance

Reusable scripts for every stage live in `assets/scripts-library.md`. Keep the reference
files generic — put the venture's real channels, ceilings, and SLAs in its profile.

When something isn't working — or before you launch — use `references/troubleshooting.md`:
a symptom→cause→fix table, edge cases (cold-start, junk leads, committee cycles), a Plan B
for each major failure mode, and a Definition-of-Ready pre-flight checklist.
