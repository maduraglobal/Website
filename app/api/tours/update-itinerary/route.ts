import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { Itinerary } from '@/utils/crm-types';

/**
 * POST /api/tours/update-itinerary - Versioned update of tour itinerary
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const { tour_id, days } = await request.json();

  if (!tour_id || !days) {
    return NextResponse.json({ error: 'Missing tour_id or days array' }, { status: 400 });
  }

  // 1. Get current user for updated_by
  const { data: { user } } = await supabase.auth.getUser();
  
  // 2. Fetch current version to increment
  const { data: currentItinerary } = await supabase
    .from('itineraries')
    .select('version')
    .eq('tour_id', tour_id)
    .single();

  const nextVersion = (currentItinerary?.version || 0) + 1;

  // 3. Upsert itinerary
  const { data, error } = await supabase
    .from('itineraries')
    .upsert({
      tour_id,
      days,
      updated_by: user?.id,
      updated_at: new Date().toISOString(),
      version: nextVersion
    }, { onConflict: 'tour_id' })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // 4. Update the tour's itinerary_id reference
  await supabase
    .from('tours')
    .update({ itinerary_id: data.id })
    .eq('id', tour_id);

  return NextResponse.json(data);
}
