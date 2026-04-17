import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function checkDestColumns() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
  
  const { data, error } = await supabase.from('destinations').select('*').limit(1);
  if (error) {
    console.error('Dest check error:', error);
  } else {
    console.log('Success! Columns:', data.length > 0 ? Object.keys(data[0]) : 'Empty table');
  }
}

checkDestColumns();
