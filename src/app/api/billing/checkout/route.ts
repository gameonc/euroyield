import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"
import { createServiceClient } from "@/lib/supabase/service"
import { createPayment, isPayramConfigured } from "@/lib/payram/client"
import { generateApiKey } from "@/lib/agent/apikey"

// Prepaid plans: USD price → API-call credits. Tune freely.
const PLANS: Record<string, { amountUsd: number; credits: number }> = {
    starter: { amountUsd: 49, credits: 10_000 },
    growth: { amountUsd: 199, credits: 50_000 },
    pro: { amountUsd: 499, credits: 150_000 },
}

const schema = z.object({
    email: z.string().email().optional(),
    plan: z.enum(["starter", "growth", "pro"]).default("starter"),
})

/**
 * Start a purchase: mint an inactive API key, create a PayRam payment (settles to
 * the owner's cold wallet), and return the pay URL + the key (shown once). The
 * key activates and gains credits when PayRam's webhook confirms the payment.
 */
export async function POST(req: NextRequest) {
    if (!isPayramConfigured()) {
        return NextResponse.json(
            { error: "Billing not configured (PAYRAM_BASE_URL / PAYRAM_API_KEY)." },
            { status: 503 }
        )
    }

    let body: z.infer<typeof schema>
    try {
        body = schema.parse(await req.json())
    } catch (e) {
        if (e instanceof z.ZodError) return NextResponse.json({ error: e.errors[0].message }, { status: 400 })
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
    }

    const plan = PLANS[body.plan]
    const supabase = createServiceClient()

    // 1. Mint an inactive, zero-credit key (raw shown once).
    const { raw, hash } = generateApiKey()
    const { data: keyRow, error: keyErr } = await supabase
        .from("api_keys")
        .insert({ key_hash: hash, owner_email: body.email ?? null, plan: body.plan, credits_remaining: 0, is_active: false })
        .select("id")
        .single()
    if (keyErr || !keyRow) {
        return NextResponse.json({ error: `Could not create key: ${keyErr?.message}` }, { status: 500 })
    }

    // 2. Create the PayRam payment (customerId = key id, so the webhook maps back).
    let payment
    try {
        payment = await createPayment({ email: body.email, customerId: keyRow.id, amountUsd: plan.amountUsd })
    } catch (e) {
        return NextResponse.json({ error: e instanceof Error ? e.message : "PayRam error" }, { status: 502 })
    }

    // 3. Record the pending payment for the webhook to confirm (idempotent by reference).
    const { error: payErr } = await supabase.from("payments").insert({
        payram_reference_id: payment.referenceId,
        key_id: keyRow.id,
        customer_id: keyRow.id,
        owner_email: body.email ?? null,
        amount_usd: plan.amountUsd,
        currency: "USD",
        credits_granted: plan.credits,
        status: "pending",
    })
    if (payErr) {
        return NextResponse.json({ error: `Could not record payment: ${payErr.message}` }, { status: 500 })
    }

    return NextResponse.json({
        plan: body.plan,
        amount_usd: plan.amountUsd,
        credits: plan.credits,
        payment_url: payment.paymentUrl,
        api_key: raw,
        note: "Save this API key now — it is shown only once. It activates when your PayRam payment is confirmed on-chain.",
    })
}
