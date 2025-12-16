import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { Database, Alert, LatestYield } from '../types/database'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("❌ Missing Supabase Admin credentials.")
    process.exit(1)
}

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY)

interface AlertWithUser extends Alert {
    users: { email: string | null } | null
}

async function main() {
    console.log("🔔 Starting Alerts Check Job...")

    // 1. Fetch Active Alerts
    const { data: alertsData, error: alertsError } = await supabase
        .from('alerts')
        .select(`
            *,
            users (email)
        `)
        .eq('is_active', true)

    if (alertsError) {
        console.error("Error fetching alerts:", alertsError)
        return
    }

    // Cast data because complex joins are hard to type automatically
    const alerts = alertsData as unknown as AlertWithUser[]
    console.log(`Checking ${alerts.length} active alerts...`)

    // 2. Fetch Latest Yields
    // We fetch all latest yields to compare against
    const { data: yieldsData, error: yieldsError } = await supabase
        .from('latest_yields')
        .select('*')

    if (yieldsError) {
        console.error("Error fetching yields:", yieldsError)
        return
    }

    const yields = yieldsData as unknown as LatestYield[]
    const yieldMap = new Map(yields.map(y => [y.pool_id, y]))
    let triggeredCount = 0

    // 3. Evaluate Alerts
    for (const alert of alerts) {
        // Skip if recently triggered (e.g. within 24h) to avoid spam
        if (alert.last_triggered_at) {
            const lastTrigger = new Date(alert.last_triggered_at)
            const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
            if (lastTrigger > oneDayAgo) continue
        }

        // If alert is for a specific pool
        if (alert.pool_id) {
            const poolData = yieldMap.get(alert.pool_id)
            if (!poolData) continue

            let triggered = false
            let message = ""

            switch (alert.alert_type) {
                case 'apy_above':
                    if (poolData.apy > alert.threshold) {
                        triggered = true
                        message = `Good news! ${poolData.pool_name} APY is now ${poolData.apy}%, above your target of ${alert.threshold}%.`
                    }
                    break
                case 'apy_below':
                    if (poolData.apy < alert.threshold) {
                        triggered = true
                        message = `Alert: ${poolData.pool_name} APY has dropped to ${poolData.apy}%, below your threshold of ${alert.threshold}%.`
                    }
                    break
                case 'tvl_drop':
                    // If interpreted as "Absolute TVL below X", then:
                    if (poolData.tvl < alert.threshold) {
                        triggered = true
                        message = `Risk Alert: ${poolData.pool_name} TVL is now €${poolData.tvl}, below your limit of €${alert.threshold}.`
                    }
                    break
            }

            if (triggered) {
                console.log(`[TRIGGERED] Alert ${alert.id} for user ${alert.users?.email ?? 'unknown'}: ${message}`)

                // A. Send Notification (Mock)
                await sendNotification(alert.users?.email, message, alert.channels as string[])

                // B. Update last_triggered_at
                await supabase
                    .from('alerts')
                    .update({ last_triggered_at: new Date().toISOString() })
                    .eq('id', alert.id)

                triggeredCount++
            }
        }
    }

    console.log(`✅ Job Complete. Triggered ${triggeredCount} alerts.`)
}

async function sendNotification(email: string | undefined | null, message: string, channels: string[]) {
    // Integration point for Resend / Telegram / Webhook
    if (channels.includes('email') && email) {
        // console.log(`  -> Sending email to ${email}`)
        // await resend.emails.send({ ... })
    }
    if (channels.includes('telegram')) {
        // console.log(`  -> Sending Telegram message...`)
    }
}

main().catch(console.error)
