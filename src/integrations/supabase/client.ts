import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://lhbwfbquxkutcyqazpnw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxoYndmYnF1eGt1dGN5cWF6cG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1Mjc5MTksImV4cCI6MjA2NjEwMzkxOX0.Tk6O2kpzTWcce9laIancu-lMFATLYkaTvgLBiRMsa10";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
