/**
 * Referral/Affiliate Configuration
 *
 * To earn referral fees, sign up for each protocol's affiliate program
 * and replace the placeholder values below with your actual codes.
 *
 * Referral Programs:
 * - Aave: https://governance.aave.com/t/arc-aave-referral-program/4111
 * - Radiant: Built-in referral system
 * - Moonwell: https://moonwell.fi/referral
 * - 1inch (for swaps): https://1inch.io/affiliate/
 */
export const REFERRAL_CONFIG = {
    // Replace with your wallet address to earn Aave referral fees
    // Aave pays 10% of flash loan fees to referrers
    aaveReferralCode: "0", // Use "0" for no referral, or your registered code

    // Replace with your Radiant referral address
    radiantReferrer: "", // Your wallet address

    // Replace with your Moonwell referral code
    moonwellRef: "rendite",

    // UTM tracking for analytics
    utmSource: "rendite",
    utmMedium: "dashboard",
}

/**
 * Deep-link URLs for protocol deposit pages.
 * Keys must match protocol_slug from database/constants exactly.
 * Referral parameters are appended where supported.
 */
export const PROTOCOL_DEPOSIT_URLS: Record<string, Record<string, string>> = {
    // Aave V3 - supports referralCode parameter
    "aave-v3": {
        "ethereum": `https://app.aave.com/?referralCode=${REFERRAL_CONFIG.aaveReferralCode}`,
        "arbitrum": `https://app.aave.com/?referralCode=${REFERRAL_CONFIG.aaveReferralCode}`,
        "optimism": `https://app.aave.com/?referralCode=${REFERRAL_CONFIG.aaveReferralCode}`,
        "polygon": `https://app.aave.com/?referralCode=${REFERRAL_CONFIG.aaveReferralCode}`,
        "base": `https://app.aave.com/?referralCode=${REFERRAL_CONFIG.aaveReferralCode}`,
    },
    "aave": {
        "ethereum": `https://app.aave.com/?referralCode=${REFERRAL_CONFIG.aaveReferralCode}`,
        "arbitrum": `https://app.aave.com/?referralCode=${REFERRAL_CONFIG.aaveReferralCode}`,
        "optimism": `https://app.aave.com/?referralCode=${REFERRAL_CONFIG.aaveReferralCode}`,
        "polygon": `https://app.aave.com/?referralCode=${REFERRAL_CONFIG.aaveReferralCode}`,
        "base": `https://app.aave.com/?referralCode=${REFERRAL_CONFIG.aaveReferralCode}`,
    },
    "aave-arbitrum": {
        "arbitrum": `https://app.aave.com/?referralCode=${REFERRAL_CONFIG.aaveReferralCode}`,
    },
    // Morpho Blue - UTM tracking
    "morpho": {
        "ethereum": `https://app.morpho.org/?utm_source=${REFERRAL_CONFIG.utmSource}&utm_medium=${REFERRAL_CONFIG.utmMedium}`,
        "base": `https://app.morpho.org/?utm_source=${REFERRAL_CONFIG.utmSource}&utm_medium=${REFERRAL_CONFIG.utmMedium}`,
    },
    "morpho-blue": {
        "ethereum": `https://app.morpho.org/?utm_source=${REFERRAL_CONFIG.utmSource}&utm_medium=${REFERRAL_CONFIG.utmMedium}`,
        "base": `https://app.morpho.org/?utm_source=${REFERRAL_CONFIG.utmSource}&utm_medium=${REFERRAL_CONFIG.utmMedium}`,
    },
    // Curve Finance - no referral program, UTM only
    "curve": {
        "ethereum": "https://curve.fi/#/ethereum/pools",
        "arbitrum": "https://curve.fi/#/arbitrum/pools",
        "optimism": "https://curve.fi/#/optimism/pools",
        "polygon": "https://curve.fi/#/polygon/pools",
        "base": "https://curve.fi/#/base/pools",
    },
    "curve-polygon": {
        "polygon": "https://curve.fi/#/polygon/pools",
    },
    "curve-dex": {
        "ethereum": "https://curve.fi/#/ethereum/pools",
        "arbitrum": "https://curve.fi/#/arbitrum/pools",
        "optimism": "https://curve.fi/#/optimism/pools",
        "polygon": "https://curve.fi/#/polygon/pools",
        "base": "https://curve.fi/#/base/pools",
    },
    // Merkl (Angle Protocol rewards) - UTM tracking
    "merkl": {
        "ethereum": `https://app.merkl.xyz/?utm_source=${REFERRAL_CONFIG.utmSource}`,
        "arbitrum": `https://app.merkl.xyz/?utm_source=${REFERRAL_CONFIG.utmSource}`,
        "optimism": `https://app.merkl.xyz/?utm_source=${REFERRAL_CONFIG.utmSource}`,
        "polygon": `https://app.merkl.xyz/?utm_source=${REFERRAL_CONFIG.utmSource}`,
        "base": `https://app.merkl.xyz/?utm_source=${REFERRAL_CONFIG.utmSource}`,
    },
    // Yearn Finance - partner tracking
    "yearn-finance": {
        "ethereum": `https://yearn.fi/vaults?partner=${REFERRAL_CONFIG.utmSource}`,
        "arbitrum": `https://yearn.fi/vaults?partner=${REFERRAL_CONFIG.utmSource}`,
        "optimism": `https://yearn.fi/vaults?partner=${REFERRAL_CONFIG.utmSource}`,
        "polygon": `https://yearn.fi/vaults?partner=${REFERRAL_CONFIG.utmSource}`,
        "base": `https://yearn.fi/vaults?partner=${REFERRAL_CONFIG.utmSource}`,
    },
    // Fluid Lending - UTM tracking
    "fluid-lending": {
        "ethereum": `https://fluid.instadapp.io/?utm_source=${REFERRAL_CONFIG.utmSource}`,
        "arbitrum": `https://fluid.instadapp.io/?utm_source=${REFERRAL_CONFIG.utmSource}`,
    },
    // Moonwell - supports ref parameter
    "moonwell-lending": {
        "base": `https://moonwell.fi/discover?ref=${REFERRAL_CONFIG.moonwellRef}`,
        "optimism": `https://moonwell.fi/discover?ref=${REFERRAL_CONFIG.moonwellRef}`,
    },
    "moonwell": {
        "base": `https://moonwell.fi/discover?ref=${REFERRAL_CONFIG.moonwellRef}`,
        "optimism": `https://moonwell.fi/discover?ref=${REFERRAL_CONFIG.moonwellRef}`,
    },
    // Radiant V2 - supports referrer address
    "radiant-v2": {
        "ethereum": REFERRAL_CONFIG.radiantReferrer
            ? `https://app.radiant.capital/?ref=${REFERRAL_CONFIG.radiantReferrer}`
            : "https://app.radiant.capital/",
        "arbitrum": REFERRAL_CONFIG.radiantReferrer
            ? `https://app.radiant.capital/?ref=${REFERRAL_CONFIG.radiantReferrer}`
            : "https://app.radiant.capital/",
        "base": REFERRAL_CONFIG.radiantReferrer
            ? `https://app.radiant.capital/?ref=${REFERRAL_CONFIG.radiantReferrer}`
            : "https://app.radiant.capital/",
    },
    // Extra Finance - UTM tracking
    "extra-finance-xlend": {
        "optimism": `https://app.extrafi.io/lend?utm_source=${REFERRAL_CONFIG.utmSource}`,
        "base": `https://app.extrafi.io/lend?utm_source=${REFERRAL_CONFIG.utmSource}`,
    },
    // Harvest Finance - UTM tracking
    "harvest-finance": {
        "ethereum": `https://app.harvest.finance/?utm_source=${REFERRAL_CONFIG.utmSource}`,
        "arbitrum": `https://app.harvest.finance/?utm_source=${REFERRAL_CONFIG.utmSource}`,
        "polygon": `https://app.harvest.finance/?utm_source=${REFERRAL_CONFIG.utmSource}`,
        "base": `https://app.harvest.finance/?utm_source=${REFERRAL_CONFIG.utmSource}`,
    },
}

export function getDepositUrl(protocolSlug: string, chain: string): string | null {
    if (!protocolSlug || !chain) return null
    const slug = protocolSlug.toLowerCase()
    const chainLower = chain.toLowerCase()

    // Direct match
    if (PROTOCOL_DEPOSIT_URLS[slug]?.[chainLower]) {
        return PROTOCOL_DEPOSIT_URLS[slug][chainLower]
    }

    // Try common variations
    const variations = [
        slug,
        slug.replace(/\s+/g, '-'),
        slug.replace(/-/g, ''),
        slug.replace(' v3', '-v3'),
        slug.replace(' v2', '-v2'),
        slug.replace('-lending', ''),
        slug.replace('-finance', ''),
    ]

    for (const variant of variations) {
        if (PROTOCOL_DEPOSIT_URLS[variant]?.[chainLower]) {
            return PROTOCOL_DEPOSIT_URLS[variant][chainLower]
        }
    }

    return null
}
