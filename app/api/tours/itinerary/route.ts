import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

/**
 * GET /api/tours/itinerary?tour_id=xxx
 * Fetch the published itinerary for a specific tour.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tourId = searchParams.get('tour_id');

  if (!tourId) {
    return NextResponse.json({ error: 'tour_id is required' }, { status: 400 });
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('tour_itineraries')
      .select('*')
      .eq('tour_id', tourId)
      .eq('is_published', true)
      .order('version', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return NextResponse.json({ days: [] });
    }

    return NextResponse.json({
      id: data.id,
      tour_id: data.tour_id,
      days: data.days || [],
      version: data.version,
      updated_at: data.updated_at,
      updated_by: data.updated_by,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * POST /api/tours/update-itinerary
 * Admin endpoint to save/update itinerary content for a tour.
 * Body: { tour_id, days, updated_by }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tour_id, days, updated_by } = body;

    if (!tour_id || !Array.isArray(days)) {
      return NextResponse.json(
        { error: 'tour_id and days array are required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get current version number
    const { data: existing } = await supabase
      .from('tour_itineraries')
      .select('version')
      .eq('tour_id', tour_id)
      .order('version', { ascending: false })
      .limit(1)
      .single();

    const nextVersion = (existing?.version || 0) + 1;

    // Unpublish previous versions
    await supabase
      .from('tour_itineraries')
      .update({ is_published: false })
      .eq('tour_id', tour_id);

    // Insert new published version
    const { data, error } = await supabase
      .from('tour_itineraries')
      .insert({
        tour_id,
        days,
        version: nextVersion,
        updated_by: updated_by || 'admin',
        updated_at: new Date().toISOString(),
        is_published: true,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      version: data.version,
      id: data.id,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
