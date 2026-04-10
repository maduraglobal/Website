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

    // 1. Get current version if any
    const { data: currentItin } = await supabase
      .from('itineraries')
      .select('version')
      .eq('tour_id', id)
      .order('version', { ascending: false })
      .limit(1);
    
    const nextVersion = (currentItin?.[0]?.version || 0) + 1;
    const updatedAt = new Date().toISOString();

    // 2. Prepare records for upsert
    // Note: If we want to replace the whole itinerary, we might want to delete old ones first,
    // but upsert by ID is safer for individual day updates.
    // However, if we removed days in the UI, we should handle that.
    
    // Simple approach for this prototype: Delete all old days for this tour and insert new ones
    // This effectively "versions" the entire set.
    const { error: deleteError } = await supabase
      .from('itineraries')
      .delete()
      .eq('tour_id', id);

    if (deleteError) throw deleteError;

    const { error: insertError } = await supabase
      .from('itineraries')
      .insert(
        days.map((day: any) => ({
          tour_id: id,
          day_number: day.day_number,
          title: day.title,
          description: day.description,
          meals: day.meals,
          activities: day.activities || [],
          updated_by: 'Website Admin',
          updated_at: updatedAt,
          version: nextVersion
        }))
      );

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
