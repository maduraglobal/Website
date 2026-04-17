import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testEmptyInsert() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
  
  console.log('Testing Empty Insertion to see columns...');
  const { data, error } = await supabase
    .from('leads')
    .insert([{}])
    .select();

  if (error) {
    console.error('Lead insertion failed:', error);
  } else {
    console.log('Lead inserted successfully (empty?):', data);
    if (data && data.length > 0) {
       console.log('Available columns from dummy row:', Object.keys(data[0]));
       // Clean up
       await supabase.from('leads').delete().eq('id', data[0].id);
    }
  }
}

testEmptyInsert();
