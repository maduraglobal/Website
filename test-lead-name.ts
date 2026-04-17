import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testLeadInsertWithName() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
  
  console.log('Testing Lead Insertion with "name" column...');
  const testLead = { 
    name: 'Test User', 
    email: 'test@example.com', 
    phone: '1234567890', 
    source: 'Test Script',
    status: 'New',
    message: 'Manual test insertion with name'
  };

  const { data, error } = await supabase
    .from('leads')
    .insert([testLead])
    .select();

  if (error) {
    console.error('Lead insertion failed:', error);
  } else {
    console.log('Lead inserted successfully:', data);
  }
}

testLeadInsertWithName();
