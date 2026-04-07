import { createClient } from './utils/supabase/server';

async function listTours() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('tours').select('slug, title');
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Tours in database:');
    console.table(data);
  }
}

listTours();
