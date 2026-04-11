import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

/**
 * Tours Source of Truth API (4.2)
 * Retrieves standardized tour information exclusively from the CRM.
 * Handles multiple column naming conventions for schema resilience.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const destinationSlug = searchParams.get('destination');
  const country = searchParams.get('country');
  
  try {
    const supabase = await createClient();
    const { data: rawTours, error } = await supabase.from('tours').select('*');

    if (error) {
      console.error('Tours API error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    let tours = rawTours || [];

    // Filter by destination if provided
    if (destinationSlug) {
      const { data: dest } = await supabase
        .from('destinations')
        .select('id, name, slug')
        .or(`slug.eq.${destinationSlug},id.eq.${destinationSlug}`);
      const targetDest = dest?.[0];
      if (targetDest) {
        tours = tours.filter((t: any) =>
          t.destination_id === targetDest.id ||
          t.destination_name === targetDest.name ||
          t.destination === targetDest.name ||
          t.destination?.toLowerCase() === targetDest.name?.toLowerCase()
        );
      }
    }

    // Filter by country if provided
    if (country) {
      tours = tours.filter((t: any) => t.country_code === country || t.country === country);
    }

    // Normalize to standard Tour shape — handle multiple possible column names
    const normalized = tours.map((t: any) => {
      const price = t.base_price_inr ?? t.base_price ?? t.price_inr ?? t.price ?? 0;
      const duration = t.duration_days
        ? `${t.duration_days} Days`
        : t.duration_nights
        ? `${t.duration_nights} Nights`
        : t.duration ?? 'N/A';
      const imageUrl = t.image_url ?? t.cover_image_url ?? t.thumbnail ?? t.images?.[0] ?? null;
      const destination = t.destination_name ?? t.destination ?? t.country ?? 'N/A';
      const slug = t.slug ?? t.id;

      return {
        id: t.id,
        title: t.title ?? t.name ?? t.creative_title ?? 'Tour',
        slug,
        price,
        duration,
        destination,
        images: imageUrl ? [imageUrl] : [],
        itinerary_id: t.id,
        tags: t.tags ?? t.highlights ?? [],
        rating: t.rating ?? null,
        duration_days: t.duration_days ?? null,
        cities_count: t.cities_count ?? t.stops ?? null,
        // Pass through raw fields for TourCard to use
        base_price_inr: price,
        image_url: imageUrl,
        destination_name: destination,
      };
    });

    return NextResponse.json(normalized);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
