import { NextResponse, type NextRequest } from "next/server"
import { createServiceClient } from "@/lib/supabase/service"
import { verifyPayramSignature, extractSignature } from "@/lib/payram/verify"

/**
 * PayRam webhook. Verifies the HMAC-SHA256 signature over the raw body, then on a
 * confirmed payment activates the buyer's key and adds its credits — idempotently
 * (a repeated delivery for an already-confirmed reference is a no-op).
 *
 * PayRam funds settle to the owner's COLD WALLET on-chain; this endpoint only
 * reacts to the notification. It holds no keys.
 */
export async function POST(req: NextRequest) {
    const secret = process.env.PAYRAM_WEBHOOK_SECRET
    if (!secret) {
        return NextResponse.json({ error: "Webhook not configured." }, { status: 503 })
    }

    // Must verify against the EXACT received bytes.
    const raw = await req.text()
    if (!verifyPayramSignature(raw, extractSignature(req.headers), secret)) {
        return NextResponse.json({ error: "Invalid signature." }, { status: 401 })
    }

    let event: Record<string, unknown>
    try {
        event = JSON.parse(raw)
    } catch {
        return NextResponse.json({ error: "Invalid JSON." }, { status: 400 })
    }

    const type = (event.event ?? event.type) as string | undefined
    const referenceId = (event.reference_id ?? event.referenceId ?? event.id) as string | undefined
    const txHash = (event.tx_hash ?? event.txHash) as string | undefined

    // Only act on confirmations; acknowledge everything else so PayRam stops retrying.
    if (type !== "payment.confirmed" || !referenceId) {
        return NextResponse.json({ ok: true, ignored: type ?? "unknown" })
    }

    const supabase = createServiceClient()
    const { data: payment } = await supabase
        .from("payments")
        .select("id, key_id, credits_granted, status")
        .eq("payram_reference_id", referenceId)
        .single()

    if (!payment) {
        return NextResponse.json({ error: "Unknown reference." }, { status: 404 })
    }
    if (payment.status === "confirmed") {
        return NextResponse.json({ ok: true, idempotent: true }) // already processed
    }

    // Mark confirmed first (idempotency anchor), then credit + activate the key.
    await supabase
        .from("payments")
        .update({ status: "confirmed", tx_hash: txHash ?? null })
        .eq("id", payment.id)

    if (payment.key_id) {
        const { data: key } = await supabase
            .from("api_keys")
            .select("credits_remaining")
            .eq("id", payment.key_id)
            .single()
        const current = key?.credits_remaining ?? 0
        await supabase
            .from("api_keys")
            .update({ credits_remaining: current + payment.credits_granted, is_active: true })
            .eq("id", payment.key_id)
    }

    return NextResponse.json({ ok: true, credited: payment.credits_granted })
}
