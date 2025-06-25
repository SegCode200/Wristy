import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aaheyrzqcpydbzzutocu.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhaGV5cnpxY3B5ZGJ6enV0b2N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1Nzk5NjYsImV4cCI6MjA2NjE1NTk2Nn0.XiOw2Ag3OKmS-veuoSiNC5gKKDCgR6DEzuz9ikH8968";

export const supabase = createClient(supabaseUrl, supabaseKey);
