import { createClient } from './utils/supabase/server.js';

async function inspect() {
  const supabase = await createClient();
  
  console.log('--- Inspecting tours table ---');
  const { data: tour, error: tErr } = await supabase.from('tours').select('*').limit(1).single();
  if (tErr) console.error('Tour Err:', tErr);
  else console.log('Tour columns:', Object.keys(tour));

  console.log('\n--- Inspecting destinations table ---');
  const { data: dest, error: dErr } = await supabase.from('destinations').select('*').limit(1).single();
  if (dErr) console.error('Dest Err:', dErr);
  else console.log('Dest columns:', Object.keys(dest));
}

inspect();
