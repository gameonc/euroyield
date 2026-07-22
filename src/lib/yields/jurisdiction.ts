/**
 * Jurisdiction policy engine — the compliance-aware wedge.
 *
 * Encodes, per region, a transparent and CONFIGURABLE set of constraints for
 * "which venues are acceptable for a regulated treasury here". This is a
 * policy/heuristic layer, NOT legal advice: it tags regulatory *acceptability*
 * based on protocol reputation, audit status, and currency — every rule is
 * visible and overridable, and every result carries a disclaimer.
 */

import type { LatestYield, Currency } from "@/types/database"

export type Jurisdiction = "EU" | "UAE" | "US" | "GLOBAL"

/**
 * Blue-chip lending/vault venues generally considered acceptable for regulated
 * treasuries (deep liquidity, long audit history). Baseline shared across
 * jurisdictions; each jurisdiction may extend/override.
 */
const REGULATED_BASELINE = [
    "aave-v3",
    "morpho-blue",
    "compound-v3",
    "spark",
    "sky",
    "fluid-lending",
]

export interface JurisdictionRule {
    label: string
    regulator: string
    /** Default for RiskPolicy.requireAudited when the caller doesn't set it. */
    defaultRequireAudited: boolean
    /** Protocol slugs treated as regulated/acceptable venues in this jurisdiction. */
    regulatedProtocolSlugs: string[]
    /** Currencies most relevant here (advisory only — not enforced). */
    preferredCurrencies: Currency[]
    /** Disclaimer + regional note surfaced with every recommendation. */
    advisory: string
}

export const JURISDICTIONS: Record<Jurisdiction, JurisdictionRule> = {
    EU: {
        label: "European Union",
        regulator: "MiCA",
        defaultRequireAudited: true,
        regulatedProtocolSlugs: REGULATED_BASELINE,
        preferredCurrencies: ["EUR", "USD"],
        advisory:
            "MiCA applies. EURC is a MiCA-regulated euro stablecoin; verify each venue " +
            "against your CASP obligations. Policy-configurable guidance, not legal advice.",
    },
    UAE: {
        label: "United Arab Emirates (Dubai / Abu Dhabi)",
        regulator: "VARA / ADGM (FSRA) / CBUAE",
        defaultRequireAudited: true,
        regulatedProtocolSlugs: REGULATED_BASELINE,
        preferredCurrencies: ["USD", "AED", "EUR"],
        advisory:
            "ADGM permits stablecoin reserve income but prohibits marketing stablecoins " +
            "as a yield/savings product; VARA/CBUAE are stricter. Do not promote as an " +
            "investment. Policy-configurable guidance, not legal advice.",
    },
    US: {
        label: "United States",
        regulator: "varies (SEC/CFTC/state)",
        defaultRequireAudited: true,
        regulatedProtocolSlugs: REGULATED_BASELINE,
        preferredCurrencies: ["USD"],
        advisory:
            "US treatment of onchain yield varies by entity and state. " +
            "Policy-configurable guidance, not legal advice.",
    },
    GLOBAL: {
        label: "Global (no jurisdiction filter)",
        regulator: "none",
        defaultRequireAudited: false,
        regulatedProtocolSlugs: [],
        preferredCurrencies: ["USD", "EUR", "AED"],
        advisory: "No jurisdiction filter applied. Policy-configurable guidance, not legal advice.",
    },
}

export interface EligibilityResult {
    eligible: boolean
    reasons: string[]
}

/**
 * Evaluate whether a pool is acceptable for a jurisdiction under the given
 * options. Returns eligibility plus human-readable reasons (used to annotate
 * or explain exclusions).
 */
export function jurisdictionEligibility(
    pool: Pick<LatestYield, "protocol_slug" | "is_audited">,
    jurisdiction: Jurisdiction,
    opts: { regulatedVenuesOnly?: boolean } = {}
): EligibilityResult {
    const rule = JURISDICTIONS[jurisdiction]
    const reasons: string[] = []
    let eligible = true

    if (rule.defaultRequireAudited && !pool.is_audited) {
        eligible = false
        reasons.push(`unaudited protocol not permitted under ${rule.regulator}`)
    }

    if (opts.regulatedVenuesOnly && rule.regulatedProtocolSlugs.length > 0) {
        if (!rule.regulatedProtocolSlugs.includes(pool.protocol_slug)) {
            eligible = false
            reasons.push(`${pool.protocol_slug} is not on the ${jurisdiction} regulated-venue allowlist`)
        }
    }

    if (eligible) reasons.push(`acceptable under ${rule.regulator}`)
    return { eligible, reasons }
}
