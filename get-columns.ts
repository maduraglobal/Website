import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function getColumns() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
  
  const { data, error } = await supabase.rpc('get_table_columns', { table_name: 'leads' });
  
  if (error) {
    // If RPC doesn't exist, try direct SQL if we have service_role, but we don't.
    // Let's try to just select * from leads and see if we can get anything.
    console.error('RPC failed, trying raw query fallback...');
    const { data: rawData, error: rawError } = await supabase.from('leads').select('*').limit(1);
    if (rawError) {
      console.error('Select failed:', rawError);
    } else {
      console.log('Columns likely missing or protected. Data:', rawData);
    }
  } else {
    console.log('Columns:', data);
  }
}

getColumns();
