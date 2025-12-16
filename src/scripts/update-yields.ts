import { createClient } from '@supabase/supabase-js'
import { DeFiLlamaAdapter } from '../lib/adapters/defillama'
import type { Database } from '../types/database'
import fs from 'fs'
import path from 'path'

// Helper to slugify strings
const slugify = (text: string) => text.toLowerCase().replace(/[^\w-]+/g, '-').replace(/^-+|-+$/g, '')

async function main() {
    console.log("🚀 Starting Yield Sync...")

    // 1. Load Environment Variables
    const envPath = path.resolve(process.cwd(), '.env.local')
    if (fs.existsSync(envPath)) {
        console.log("Loading .env.local...")
        const envConfig = fs.readFileSync(envPath, 'utf8')
        envConfig.split('\n').forEach(line => {
            const [key, value] = line.split('=')
            if (key && value && !process.env[key.trim()]) {
                process.env[key.trim()] = value.trim().replace(/^["']|["']$/g, '')
            }
        })
    }

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Note: We need Service Role to INSERT if RLS is strict. Anon key might fail if RLS is on.
    if (!SUPABASE_URL || !SUPABASE_KEY) {
        console.error("❌ Missing Supabase credentials. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.")
        process.exit(1)
    }

    // 2. Initialize Clients
    const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
        auth: { persistSession: false, autoRefreshToken: false }
    })
    const adapter = new DeFiLlamaAdapter()

    // 3. Fetch Data
    console.log("📡 Fetching data from DeFiLlama...")
    const yields = await adapter.fetchYields()
    console.log(`✅ Fetched ${yields.length} pools. Syncing to database...`)

    if (yields.length === 0) {
        console.log("⚠️ No yields found. Exiting.")
        return
    }

    // 4. Pre-fetch existing protocols and pools to minimize queries
    const { data: protocols } = await supabase.from('protocols').select('id, name, slug')
    const { data: pools } = await supabase.from('pools').select('id, protocol_id, chain, stablecoin')

    type ProtocolRow = { id: string; name: string; slug: string }
    type PoolRow = { id: string; protocol_id: string; chain: string; stablecoin: string }

    const protocolMap = new Map(((protocols ?? []) as ProtocolRow[]).map(p => [p.name.toLowerCase(), p.id])) // Name -> ID
    const poolMap = new Map(((pools ?? []) as PoolRow[]).map(p => [`${p.protocol_id}-${p.chain}-${p.stablecoin}`, p.id])) // Key -> ID

    // 5. Sync Loop
    let newProtocols = 0
    let newPools = 0
    let insertedYields = 0

    for (const item of yields) {
        try {
            // A. Resolve Protocol
            let protocolId = protocolMap.get(item.protocol.toLowerCase())
            if (!protocolId) {
                // Insert new protocol
                const slug = slugify(item.protocol)
                const { data: newProtocol, error } = await supabase.from('protocols').insert({
                    name: item.protocol,
                    slug: slug,
                    chain: item.chain, // Schema requires chain, assuming protocol's primary deployment
                    website: "",
                    is_audited: false
                }).select('id').single()

                if (error) {
                    console.error(`Error inserting protocol ${item.protocol}:`, error.message)
                    continue
                }
                protocolId = newProtocol.id
                protocolMap.set(item.protocol.toLowerCase(), protocolId)
                newProtocols++
            }

            // B. Resolve Pool
            // Key: ProtocolID + Chain + Symbol
            const poolKey = `${protocolId}-${item.chain}-${item.asset}`
            let poolId = poolMap.get(poolKey)

            if (!poolId) {
                // Insert new pool
                const { data: newPool, error } = await supabase.from('pools').insert({
                    protocol_id: protocolId,
                    pool_name: item.pool, // e.g. "EURC"
                    chain: item.chain,
                    stablecoin: item.asset, // "EURC"
                    risk_tags: [], // Using empty tags for now as structure mismatch
                    freshness_tier: 'warm',
                    is_active: true
                }).select('id').single()

                if (error) {
                    console.error(`Error inserting pool ${item.pool}:`, error.message)
                    continue
                }
                poolId = newPool.id
                poolMap.set(poolKey, poolId)
                newPools++
            }

            // C. Insert Yield History
            const { error: yieldError } = await supabase.from('yield_history').insert({
                pool_id: poolId,
                apy: item.apy,
                tvl: item.tvl,
                timestamp: new Date().toISOString(),
                source: 'defillama'
            })

            if (yieldError) {
                console.error(`Error inserting yield for ${item.pool}:`, yieldError.message)
            } else {
                insertedYields++
            }

        } catch (err) {
            console.error("Unexpected error syncing item:", err)
        }
    }

    console.log(`
🎉 Sync Complete!
   New Protocols: ${newProtocols}
   New Pools: ${newPools}
   Yield Entries: ${insertedYields}
`)
}

main().catch(console.error)
