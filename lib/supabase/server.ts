import { createClient as createSupabaseClient } from "@supabase/supabase-js"

/**
 * Server-side Supabase client for API routes and server components
 */
export function createClient() {
  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}
