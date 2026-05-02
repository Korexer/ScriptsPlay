import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lwyhmmwaakwzdmdkanxq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3eWhtbXdhYWt3emRtZGthbnhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMTM1MzksImV4cCI6MjA4ODU4OTUzOX0.e7V36zfQlneQTEsWWtovIUhlkUBquEPV2BKdfKR8_Cs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
