import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testNameColumn() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
  
  console.log('Testing Name Column...');
  const { data, error } = await supabase
    .from('leads')
    .insert([{ name: 'Test User' }])
    .select();

  if (error) {
    console.error('Test Result:', error);
  } else {
    console.log('Success! Columns:', Object.keys(data[0]));
  }
}

testNameColumn();
