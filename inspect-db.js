require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function inspect() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  
  console.log('--- Inspecting tours table ---');
  const { data: tours, error: tErr } = await supabase.from('tours').select('*').limit(1);
  if (tErr) console.error('Tour Err:', tErr);
  else if (tours[0]) console.log('Tour columns:', Object.keys(tours[0]));

  console.log('\n--- Inspecting destinations table ---');
  const { data: dests, error: dErr } = await supabase.from('destinations').select('*').limit(1);
  if (dErr) console.error('Dest Err:', dErr);
  else if (dests[0]) console.log('Dest columns:', Object.keys(dests[0]));
}

inspect();
