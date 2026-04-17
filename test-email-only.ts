import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testEmailOnly() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
  
  console.log('Testing Email-only Insertion...');
  const { data, error } = await supabase
    .from('leads')
    .insert([{ email: 'test@example.com' }])
    .select();

  if (error) {
    console.error('Insertion failed:', error);
  } else {
    console.log('Inserted successfully! Columns:', Object.keys(data[0]));
    // Cleanup
    await supabase.from('leads').delete().eq('id', data[0].id);
  }
}

testEmailOnly();
