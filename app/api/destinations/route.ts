import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

/**
 * Destinations API (4.3)
 * Fetches all available destinations for SEO pages, filtering, and categorization.
 */
export async function GET() {
  try {
    const supabase = await createClient();

    const { data: destinations, error } = await supabase
      .from('destinations')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(destinations);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
