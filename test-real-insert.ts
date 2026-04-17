import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testRealLeadInsert() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
  
  const name = "Full Test User";
  const email = "realtest@example.com";
  const phone = "9999999999";
  const tour_id = "General Enquiry";
  const message = "Test Message";

  const nameParts = name.trim().split(' ');
  const first_name = nameParts[0];
  const last_name = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

  console.log('Inserting lead with:', { first_name, last_name, email, phone });

  const { data: leadData, error: leadError } = await supabase
    .from('leads')
    .insert([
      { 
        first_name, 
        last_name, 
        email, 
        phone, 
        source: tour_id || 'Website Enquiry',
        status: 'New',
        message: message || ''
      }
    ])
    .select()
    .single();

  if (leadError) {
    console.error('Lead creation error:', leadError);
  } else {
    console.log('Lead created successfully:', leadData);
  }
}

testRealLeadInsert();
