import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function listTables() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
  
  // Try to use a query that often works to see table names if we have permissions
  const { data, error } = await supabase.from('leads').select('*').limit(0);
  console.log('Leads check:', { data, error });

  const { data: data2, error: error2 } = await supabase.from('enquiries').select('*').limit(0);
  console.log('Enquiries check:', { data: data2, error: error2 });
}

listTables();
