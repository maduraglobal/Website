import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { id, days } = body;

    if (!id || !days || !Array.isArray(days)) {
      return NextResponse.json({ error: 'Invalid tour ID or itinerary data' }, { status: 400 });
    }

    // 1. Get current version from tour_itineraries
    const { data: currentItin } = await supabase
      .from('tour_itineraries')
      .select('version')
      .eq('tour_id', id)
      .order('version', { ascending: false })
      .limit(1)
      .single();
    
    const nextVersion = (currentItin?.version || 0) + 1;
    const updatedAt = new Date().toISOString();

    // 2. Prepare the JSONB days array
    const formattedDays = days.map((day: any) => ({
      day: day.day_number || day.day,
      title: day.title,
      description: day.description,
      meals: day.meals,
      activities: day.activities || []
    }));

    // 3. Upsert into tour_itineraries
    // We want to keep history, but for simplicity we'll just insert a new version
    // and mark it as published.
    // First, unpublish old versions for this tour
    await supabase
      .from('tour_itineraries')
      .update({ is_published: false })
      .eq('tour_id', id);

    const { error: insertError } = await supabase
      .from('tour_itineraries')
      .insert({
        tour_id: id,
        days: formattedDays,
        updated_by: 'Website Admin',
        updated_at: updatedAt,
        version: nextVersion,
        is_published: true
      });

    if (insertError) throw insertError;

    return NextResponse.json({ 
      success: true, 
      version: nextVersion,
      updated_at: updatedAt
    });

  } catch (error: any) {
    console.error('Itinerary Update Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

