const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function listTours() {
  const { data, error } = await supabase.from('tours').select('slug, title');
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Tours in database:');
    console.table(data);
  }
}

listTours();
