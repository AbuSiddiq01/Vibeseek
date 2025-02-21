import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://grwgktnpvvxkxejjqgss.supabase.co";  
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdyd2drdG5wdnZ4a3hlampxZ3NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwNDU1NzUsImV4cCI6MjA1NDYyMTU3NX0.J55JkrcJupkpoipQtk9n3ZCIVFn8yHsEWSuMyZxfTB8";  // 🔹 Replace this

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
