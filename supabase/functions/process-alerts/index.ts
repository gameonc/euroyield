/**
 * Process Alerts Edge Function
 *
 * This function runs on a schedule (e.g., every hour via cron) to:
 * 1. Fetch all active alerts from user_alerts table
 * 2. Compare against current yield data from latest_yields view
 * 3. Send email notifications when thresholds are breached
 * 4. Update last_sent_at to prevent spam
 *
 * Environment Variables Required:
 * - RESEND_API_KEY: Your Resend API key (get one at https://resend.com)
 * - SUPABASE_URL: Auto-provided by Supabase
 * - SUPABASE_SERVICE_ROLE_KEY: Auto-provided by Supabase
 *
 * To deploy:
 * supabase functions deploy process-alerts
 *
 * To run on schedule, set up a cron job in Supabase Dashboard or use:
 * supabase functions invoke process-alerts --schedule "0 * * * *"
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

// Types
interface Alert {
    id: string
    email: string
    protocol_slug: string
    chain: string
    condition: 'ABOVE' | 'BELOW'
    threshold: number
    last_sent_at: string | null
}

interface YieldData {
    protocol_slug: string
    chain: string
    apy: number
    protocol_name: string
    pool_name: string
}

// Configuration
const COOLDOWN_HOURS = 24 // Don't send same alert more than once per day
const FROM_EMAIL = "alerts@rendite.fi" // Update with your verified domain

// Email sending function (Resend)
async function sendAlertEmail(
    to: string,
    protocolName: string,
    chain: string,
    currentApy: number,
    threshold: number,
    condition: 'ABOVE' | 'BELOW'
): Promise<boolean> {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")

    // TODO: Add your Resend API key to Supabase secrets:
    // supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxxx
    if (!RESEND_API_KEY) {
        console.log(`[MOCK EMAIL] Would send to ${to}:`)
        console.log(`  Protocol: ${protocolName} (${chain})`)
        console.log(`  Current APY: ${currentApy.toFixed(2)}%`)
        console.log(`  Threshold: ${condition} ${threshold}%`)
        return true // Mock success for testing
    }

    const subject = condition === 'BELOW'
        ? `⚠️ ${protocolName} APY dropped to ${currentApy.toFixed(2)}%`
        : `🎉 ${protocolName} APY rose to ${currentApy.toFixed(2)}%`

    const html = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; border-radius: 12px 12px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; }
        .stat { font-size: 36px; font-weight: bold; color: ${condition === 'BELOW' ? '#ef4444' : '#10b981'}; }
        .cta { display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 20px; }
        .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0;">Yield Alert Triggered</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">${protocolName} on ${chain}</p>
        </div>
        <div class="content">
            <p>The APY for <strong>${protocolName}</strong> on <strong>${chain}</strong> has ${condition === 'BELOW' ? 'dropped below' : 'risen above'} your threshold.</p>

            <div style="text-align: center; padding: 20px 0;">
                <p style="margin: 0; color: #6b7280;">Current APY</p>
                <p class="stat">${currentApy.toFixed(2)}%</p>
                <p style="margin: 0; color: #6b7280;">Your threshold: ${threshold}%</p>
            </div>

            <p>${condition === 'BELOW'
            ? 'You may want to consider moving your funds to a higher-yielding pool.'
            : 'Great news! This pool is now exceeding your target yield.'
        }</p>

            <div style="text-align: center;">
                <a href="https://euroyield.vercel.app" class="cta">View All Yields →</a>
            </div>
        </div>
        <div class="footer">
            <p>You're receiving this because you set up a yield alert on Rendite.</p>
            <p>© ${new Date().getFullYear()} Rendite. Euro Stablecoin Yield Intelligence.</p>
        </div>
    </div>
</body>
</html>
    `

    try {
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${RESEND_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: FROM_EMAIL,
                to: [to],
                subject,
                html,
            }),
        })

        if (!response.ok) {
            const error = await response.text()
            console.error(`Failed to send email to ${to}:`, error)
            return false
        }

        console.log(`✓ Sent alert email to ${to}`)
        return true
    } catch (error) {
        console.error(`Error sending email to ${to}:`, error)
        return false
    }
}

// Main handler
Deno.serve(async (req) => {
    try {
        // Verify request (optional: add auth header check for cron jobs)
        const authHeader = req.headers.get("Authorization")
        const cronSecret = Deno.env.get("CRON_SECRET")

        if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
            // Allow manual invocation without secret for testing
            console.log("Note: Running without CRON_SECRET verification")
        }

        // Initialize Supabase client with service role
        const supabaseUrl = Deno.env.get("SUPABASE_URL")!
        const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
        const supabase = createClient(supabaseUrl, supabaseKey)

        // Fetch all alerts
        const { data: alerts, error: alertsError } = await supabase
            .from("user_alerts")
            .select("*")
            .order("created_at", { ascending: false })

        if (alertsError) {
            throw new Error(`Failed to fetch alerts: ${alertsError.message}`)
        }

        if (!alerts || alerts.length === 0) {
            return new Response(JSON.stringify({ message: "No alerts to process" }), {
                headers: { "Content-Type": "application/json" },
            })
        }

        // Fetch current yield data
        const { data: yields, error: yieldsError } = await supabase
            .from("latest_yields")
            .select("protocol_slug, chain, apy, protocol_name, pool_name")

        if (yieldsError) {
            throw new Error(`Failed to fetch yields: ${yieldsError.message}`)
        }

        // Create lookup map for yields
        const yieldMap = new Map<string, YieldData>()
        for (const y of yields || []) {
            const key = `${y.protocol_slug}:${y.chain}`
            yieldMap.set(key, y)
        }

        // Process each alert
        const results = {
            processed: 0,
            triggered: 0,
            sent: 0,
            skipped: 0,
        }

        const now = new Date()
        const cooldownMs = COOLDOWN_HOURS * 60 * 60 * 1000

        for (const alert of alerts as Alert[]) {
            results.processed++

            // Check cooldown
            if (alert.last_sent_at) {
                const lastSent = new Date(alert.last_sent_at)
                if (now.getTime() - lastSent.getTime() < cooldownMs) {
                    results.skipped++
                    continue
                }
            }

            // Find matching yield
            const key = `${alert.protocol_slug}:${alert.chain}`
            const currentYield = yieldMap.get(key)

            if (!currentYield) {
                console.log(`No yield data found for ${key}`)
                continue
            }

            // Check threshold
            const triggered = alert.condition === 'BELOW'
                ? currentYield.apy < alert.threshold
                : currentYield.apy > alert.threshold

            if (!triggered) {
                continue
            }

            results.triggered++

            // Send email
            const sent = await sendAlertEmail(
                alert.email,
                currentYield.protocol_name,
                currentYield.chain,
                currentYield.apy,
                alert.threshold,
                alert.condition
            )

            if (sent) {
                results.sent++

                // Update last_sent_at
                await supabase
                    .from("user_alerts")
                    .update({ last_sent_at: now.toISOString() })
                    .eq("id", alert.id)
            }
        }

        console.log(`Processed: ${results.processed}, Triggered: ${results.triggered}, Sent: ${results.sent}, Skipped: ${results.skipped}`)

        return new Response(JSON.stringify({
            success: true,
            ...results,
        }), {
            headers: { "Content-Type": "application/json" },
        })

    } catch (error) {
        console.error("Error processing alerts:", error)
        return new Response(JSON.stringify({
            error: error instanceof Error ? error.message : "Unknown error",
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        })
    }
})
