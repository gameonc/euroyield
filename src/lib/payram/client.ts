/**
 * PayRam client — creates a hosted payment link via the self-hosted PayRam
 * gateway. PayRam settles USDC/USDT/PYUSD directly to the owner's COLD WALLET
 * (configured inside PayRam, never here). This app only holds PayRam API creds.
 *
 * API: POST {PAYRAM_BASE_URL}/api/v1/payment, header `API-Key`, body = customer
 * email + unique customer id + USD amount. Response field names vary by PayRam
 * version, so we read defensively. Exact shapes: docs.payram.com / mcp.payram.com.
 */

export interface CreatePaymentInput {
    email?: string
    /** Our stable id for the buyer/key so the webhook can map back. */
    customerId: string
    amountUsd: number
}

export interface CreatePaymentResult {
    paymentUrl: string
    referenceId: string
    raw: unknown
}

export function isPayramConfigured(): boolean {
    return Boolean(process.env.PAYRAM_BASE_URL && process.env.PAYRAM_API_KEY)
}

export async function createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    const base = process.env.PAYRAM_BASE_URL
    const key = process.env.PAYRAM_API_KEY
    if (!base || !key) {
        throw new Error("PayRam not configured — set PAYRAM_BASE_URL and PAYRAM_API_KEY.")
    }

    const res = await fetch(`${base.replace(/\/$/, "")}/api/v1/payment`, {
        method: "POST",
        headers: { "API-Key": key, "Content-Type": "application/json" },
        body: JSON.stringify({
            email: input.email,
            customer_id: input.customerId,
            amount: input.amountUsd,
        }),
    })

    if (!res.ok) {
        const text = await res.text().catch(() => "")
        throw new Error(`PayRam create-payment failed: ${res.status} ${text}`.trim())
    }

    const data = (await res.json()) as Record<string, unknown>
    const paymentUrl = (data.payment_url ?? data.paymentUrl ?? data.url) as string | undefined
    const referenceId = (data.reference_id ?? data.referenceId ?? data.id) as string | undefined

    if (!paymentUrl || !referenceId) {
        throw new Error("PayRam response missing payment_url/reference_id.")
    }
    return { paymentUrl, referenceId, raw: data }
}
