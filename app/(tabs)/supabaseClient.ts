import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eehksoydiaykjdkemuxa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlaGtzb3lkaWF5a2pka2VtdXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5Mjk4NjgsImV4cCI6MjA0ODUwNTg2OH0.PE7urett-JVgSi7nZhLzmPwzpqsrxi4mVYlO2LcRCko';

export const supabase = createClient(supabaseUrl, supabaseKey);
