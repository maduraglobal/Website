import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { Tour } from '@/utils/crm-types';

/**
 * GET /api/tours/[id] - Get single tour with itinerary
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;

  const { data, error } = await supabase
    .from('tours')
    .select('*, destinations(*), itineraries(*)')
    .eq('id', id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

/**
 * PUT /api/tours/[id] - Update a tour package
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;
  const { itinerary, ...body } = await request.json();

  // 1. Update the Tour
  const { data: tour, error: tourError } = await supabase
    .from('tours')
    .update(body)
    .eq('id', id)
    .select()
    .single();

  if (tourError) return NextResponse.json({ error: tourError.message }, { status: 500 });

  // 2. Update/Upsert the Itinerary
  if (itinerary && Array.isArray(itinerary)) {
    // Delete old itineraries or just insert a new version
    // For this simple version, we'll just insert a new published version
    await supabase.from('tour_itineraries').insert([{
      tour_id: id,
      days: itinerary,
      version: Math.floor(Date.now() / 1000), // simplistic versioning
      is_published: true
    }]);
  }

  return NextResponse.json(tour);
}

/**
 * DELETE /api/tours/[id] - Remove a tour package
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;

  // Ideally, we should also handle itinerary cleanup here if needed
  const { error } = await supabase.from('tours').delete().eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
