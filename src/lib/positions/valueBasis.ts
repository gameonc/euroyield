/**
 * Value-basis classification for on-chain positions.
 *
 * A receipt token's raw `balanceOf` is only a good proxy for EUR value when the
 * token is redeemable ~1:1 for a euro stablecoin. That holds for aToken-style
 * rebasing supply positions (Aave, and the Aave-fork Radiant), where the token
 * balance equals the underlying stablecoin balance.
 *
 * It does NOT hold for share-priced or LP tokens — Compound-style mTokens
 * (exchange rate), ERC-4626 vault shares (price-per-share), and any LP token
 * (Curve / Aerodrome / Convex / Beefy / Yearn), several of which are paired with
 * USDC. For those, `balance × 1` is not euros, so we must not sum them into a EUR
 * total; we mark them unpriced instead of reporting a wrong number.
 */

export type ValueBasis = "stable-1to1" | "derived"

/**
 * Protocol slugs whose euro-stablecoin *supply* receipt token redeems ~1:1 for
 * the underlying euro stablecoin (aToken-style rebasing).
 */
const STABLE_1TO1_SLUGS = new Set<string>([
    "aave-v3",
    "radiant-v2",
])

/**
 * Classify a position by protocol slug. Defaults to `derived` (the safe,
 * under-claiming choice) for anything not known to be 1:1.
 */
export function positionValueBasis(protocolSlug: string): ValueBasis {
    return STABLE_1TO1_SLUGS.has(protocolSlug) ? "stable-1to1" : "derived"
}

/** True when the position's balance can be treated as EUR value ~1:1. */
export function isPriceableAsEuro(protocolSlug: string): boolean {
    return positionValueBasis(protocolSlug) === "stable-1to1"
}
