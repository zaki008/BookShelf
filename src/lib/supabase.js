// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// Mendefinisikan tipe untuk environment variables
const supabaseUrl = process.env.SUPABASE_URL; // URL Supabase dari dashboard
const supabaseKey = process.env.SUPABASE_KEY; // API key Supabase dari dashboard

// Membuat klien Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
