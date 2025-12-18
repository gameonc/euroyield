/**
 * Database Types - Auto-generated from Supabase schema
 * These match the tables in supabase/migrations/0001_init.sql
 */

// ============================================
// SUPABASE DATABASE TYPE
// ============================================

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            protocols: {
                Row: Protocol
                Insert: Omit<Protocol, 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string }
                Update: Partial<Omit<Protocol, 'id'>>
            }
            pools: {
                Row: Pool
                Insert: Omit<Pool, 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string }
                Update: Partial<Omit<Pool, 'id'>>
            }
            yield_history: {
                Row: YieldHistory
                Insert: Omit<YieldHistory, 'id'> & { id?: string }
                Update: Partial<Omit<YieldHistory, 'id'>>
            }
            users: {
                Row: User
                Insert: UserInsert
                Update: UserUpdate
            }
            alerts: {
                Row: Alert
                Insert: AlertInsert
                Update: AlertUpdate
            }
            ingestion_logs: {
                Row: IngestionLog
                Insert: Omit<IngestionLog, 'id'> & { id?: string }
                Update: Partial<Omit<IngestionLog, 'id'>>
            }
            subscribers: {
                Row: Subscriber
                Insert: Omit<Subscriber, 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Omit<Subscriber, 'id'>>
            }
        }
        Views: {
            latest_yields: {
                Row: LatestYield
            }
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            chain: Chain
            euro_stablecoin: EuroStablecoin
            subscription_tier: SubscriptionTier
            alert_type: AlertType
            alert_channel: AlertChannel
            freshness_tier: FreshnessTier
            ingestion_status: IngestionStatus
        }
    }
}

// Helper types for easier usage
export type Tables<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Update']

// ============================================
// ENUMS
// ============================================

export type Chain = "ethereum" | "arbitrum" | "optimism" | "polygon" | "base"
export type EuroStablecoin = "EURC" | "EURS" | "eEUR" | "agEUR" | "cEUR"
export type SubscriptionTier = "free" | "pro" | "analyst" | "institutional"
export type AlertType = "apy_above" | "apy_below" | "tvl_drop"
export type AlertChannel = "email" | "telegram"
export type FreshnessTier = "hot" | "warm" | "cold"
export type IngestionStatus = "running" | "success" | "failed"

// ============================================
// RISK TAGS
// ============================================

export type RiskTagType =
    | "audited"
    | "unaudited"
    | "high_tvl"
    | "low_tvl"
    | "established"
    | "new_protocol"

export interface RiskTag {
    type: RiskTagType
    label: string
    description: string
    isPositive: boolean
}

// ============================================
// TABLE TYPES
// ============================================

export interface User {
    id: string
    email: string | null
    wallet_address: string | null
    subscription_tier: SubscriptionTier
    stripe_customer_id: string | null
    created_at: string
    updated_at: string
}

export interface Protocol {
    id: string
    name: string
    slug: string
    chain: Chain
    icon_url: string | null
    website: string | null
    is_audited: boolean
    launched_at: string | null
    created_at: string
    updated_at: string
}

export interface Pool {
    id: string
    protocol_id: string
    stablecoin: EuroStablecoin
    pool_name: string
    pool_address: string | null
    chain: Chain
    risk_tags: RiskTag[]
    freshness_tier: FreshnessTier
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface YieldHistory {
    id: string
    pool_id: string
    apy: number
    tvl: number
    timestamp: string
    source: string
}

export interface Alert {
    id: string
    user_id: string
    pool_id: string | null
    alert_type: AlertType
    threshold: number
    channels: AlertChannel[]
    is_active: boolean
    last_triggered_at: string | null
    created_at: string
    updated_at: string
}

export interface IngestionLog {
    id: string
    job_name: string
    status: IngestionStatus
    pools_updated: number
    error_message: string | null
    started_at: string
    completed_at: string | null
}

export interface Subscriber {
    id: string
    email: string
    is_active: boolean
    created_at: string
    updated_at: string
    source: string | null
}

// ============================================
// VIEW TYPES
// ============================================

export interface LatestYield {
    id: string
    pool_id: string
    apy: number
    apy_delta: number | null
    tvl: number
    timestamp: string
    source: string
    pool_name: string
    stablecoin: EuroStablecoin
    chain: Chain
    risk_tags: RiskTag[]
    protocol_name: string
    protocol_slug: string
    is_audited: boolean
    protocol_url: string | null
}

// ============================================
// INSERT TYPES (for creating new records)
// ============================================

export interface UserInsert {
    email?: string
    wallet_address?: string
    subscription_tier?: SubscriptionTier
    stripe_customer_id?: string
}

export interface AlertInsert {
    user_id: string
    pool_id?: string
    alert_type: AlertType
    threshold: number
    channels?: AlertChannel[]
    is_active?: boolean
}

export interface YieldHistoryInsert {
    pool_id: string
    apy: number
    tvl: number
    source: string
}

// ============================================
// UPDATE TYPES
// ============================================

export interface UserUpdate {
    email?: string
    wallet_address?: string
    subscription_tier?: SubscriptionTier
    stripe_customer_id?: string
}

export interface AlertUpdate {
    pool_id?: string
    alert_type?: AlertType
    threshold?: number
    channels?: AlertChannel[]
    is_active?: boolean
    last_triggered_at?: string | null
}
