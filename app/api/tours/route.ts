import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { Tour } from '@/utils/crm-types';

/**
 * GET /api/tours - List all tours with optional filters
 */
export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  
  const destinationId = searchParams.get('destination_id');
  const categoryId = searchParams.get('category_id');
  const visibility = searchParams.get('visibility');

  let query = supabase.from('tours').select('*, destinations(name), tour_categories(name)');

  if (destinationId) query = query.eq('destination_id', destinationId);
  if (categoryId) query = query.eq('category_id', categoryId);
  if (visibility !== null) query = query.eq('visibility', visibility === 'true');

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

/**
 * POST /api/tours - Create a new tour package
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const { itinerary, ...body } = await request.json();

  // Basic validation
  if (!body.title || !body.price || !body.destination_id) {
    return NextResponse.json({ error: 'Missing required fields: title, price, destination_id' }, { status: 400 });
  }

  // 1. Create the Tour
  const { data: tour, error: tourError } = await supabase
    .from('tours')
    .insert([{
      ...body,
      slug: body.slug || body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
    }])
    .select()
    .single();

  if (tourError) return NextResponse.json({ error: tourError.message }, { status: 500 });

  // 2. Create the Itinerary if provided
  if (itinerary && Array.isArray(itinerary) && itinerary.length > 0) {
    await supabase.from('tour_itineraries').insert([{
      tour_id: tour.id,
      days: itinerary,
      version: 1,
      is_published: true
    }]);
  }

  return NextResponse.json(tour, { status: 201 });
}
