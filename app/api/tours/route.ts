import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

/**
 * Tours Source of Truth API (4.1)
 * Retrieves standardized tour information exclusively from the CRM.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country');
  const destinationSlug = searchParams.get('destination');
  
  try {
    const supabase = await createClient();

    // Fetch all tours and map locally to prevent complex join errors on schema mismatch
    let query = supabase.from('tours').select('*');

    if (destinationSlug) {
      // Basic filtering if possible, but let's stick to simple select for now
    }

    const { data: rawTours, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform to standardized structure (4.1)
    const tours = rawTours.map((t: any) => ({
      id: t.id,
      title: t.title,
      slug: t.slug,
      price: t.base_price_inr || t.price || 0,
      duration: t.duration_days ? `${t.duration_days} Days` : (t.duration || 'N/A'),
      destination: t.destination_name || 'South East Asia', 
      images: t.image_url ? [t.image_url] : (t.images || []),
      itinerary_id: t.id 
    }));

    return NextResponse.json(tours);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
