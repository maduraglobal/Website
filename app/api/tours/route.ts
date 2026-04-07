import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get('destination');
  
  try {
    const supabase = await createClient();

    let query = supabase.from('tours').select(`
      *,
      destinations!inner(slug)
    `);

    if (destination) {
      query = query.eq('destinations.slug', destination);
    }

    const { data: tours, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(tours);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
