// Public connection details for Supabase. The publishable key is designed to be
// public: it only allows what the database safety rules (Row Level Security) allow.
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ukvqbayxfmgsultpjgud.supabase.co";
export const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_r5URF_ScTObHieFgpsQrPQ_VHbY6wLH";
