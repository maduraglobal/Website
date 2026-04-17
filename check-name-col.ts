import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function checkNameColumn() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
  
  const { data, error } = await supabase.from('leads').select('name').limit(1);
  if (error) {
    console.error('Error selecting name:', error);
  } else {
    console.log('Success selecting name! Data:', data);
  }
}

checkNameColumn();
