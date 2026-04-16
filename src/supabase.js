import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://coninculdjaqfdvsrnxu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvbmluY3VsZGphcWZkdnNybnh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNTM0MjksImV4cCI6MjA5MTgyOTQyOX0.AoVO8zMIzDhtmnhS438COHOOTfGdVWPv9TyeH0XXN3k';

export const supabase = createClient(supabaseUrl, supabaseKey);