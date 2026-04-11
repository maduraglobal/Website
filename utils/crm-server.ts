import { createClient } from '@/utils/supabase/server';
import { Tour, Destination, slugify } from './crm-types';

/**
 * Server-only database fetchers for Tours & Destinations (4.2)
 * These should ONLY be called from Server Components or API Routes.
 */

function formatImageUrl(url: string | null | undefined): string {
  if (!url) return 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800';
  if (url.startsWith('http') || url.startsWith('https') || url.startsWith('/')) return url;
  return `/images/${url}`;
}

export async function getToursFromDB(params: { country?: string; destination?: string } = {}): Promise<Tour[]> {
  const supabase = await createClient();
  
  let { data: rawTours, error } = await supabase.from('tours').select('*');
  if (error) {
    console.error('getToursFromDB error:', error);
    throw error;
  }

  let filteredTours = rawTours || [];

  // Filter by destination using the new destination_id/destination_name columns
  if (params.destination) {
    const { data: destRows } = await supabase
      .from('destinations')
      .select('id, name, slug')
      .or(`slug.ilike.${params.destination},name.ilike.${params.destination}`);

    const targetDest = destRows?.[0];

    if (targetDest) {
      filteredTours = filteredTours.filter(t =>
        t.destination_id === targetDest.id ||
        t.destination_name?.toLowerCase() === targetDest.name?.toLowerCase()
      );
    } else {
      // Slug-based fallback
      filteredTours = filteredTours.filter(t =>
        t.destination_name?.toLowerCase().includes(params.destination!.toLowerCase())
      );
    }
  }

  // Map using EXACT column names confirmed from the tours table schema
  return filteredTours.map((t: any) => {
    const imageUrl = t.image_url ?? t.images?.[0] ?? null;
    const destination = t.destination_name ?? 'N/A';
    
    return {
      id: t.id,
      title: t.title ?? 'Tour',
      slug: t.slug ?? t.id,
      price: t.base_price_inr ?? 0,
      duration: t.duration ?? 'N/A',
      destination,
      images: [formatImageUrl(imageUrl)],
      itinerary_id: t.id,
      tags: t.highlights ?? [],
      rating: t.rating ?? null,
      // Raw fields used by TourCard
      base_price_inr: t.base_price_inr ?? 0,
      image_url: formatImageUrl(imageUrl),
      destination_name: destination,
      duration_days: null,
      cities_count: null,
      description: t.description ?? '',
      inclusions: t.inclusions ?? [],
      exclusions: t.exclusions ?? [],
      category: t.category ?? '',
      review_count: t.review_count ?? 0,
    };
  });
}

export async function getDestinationsFromDB(): Promise<Destination[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('destinations').select('*').order('name');
  if (error) {
    console.error('getDestinationsFromDB error:', error);
    throw error;
  }

  return (data || []).map((d: any) => ({
    ...d,
    slug: d.slug || slugify(d.name),
    image_url: formatImageUrl(d.image_url)
  }));
}

export async function getDestinationBySlugFromDB(slug: string): Promise<Destination | null> {
  const destinations = await getDestinationsFromDB();
  const normalizedSlug = slug.toLowerCase();
  
  return destinations.find(d => 
    (d.slug && d.slug.toLowerCase() === normalizedSlug) || 
    d.id === slug || 
    slugify(d.name) === normalizedSlug
  ) || null;
}

export async function getTourBySlugFromDB(slug: string): Promise<Tour | null> {
  const tours = await getToursFromDB();
  return tours.find(t => t.slug === slug || t.id === slug) || null;
}

export async function getItineraryByTourIdFromDB(tourId: string): Promise<any[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('tour_itineraries')
      .select('days, version, updated_at')
      .eq('tour_id', tourId)
      .eq('is_published', true)
      .order('version', { ascending: false })
      .limit(1)
      .single();

    if (error || !data?.days) return [];

    // Parse the days array from JSONB
    const days = Array.isArray(data.days) ? data.days : [];

    return days.map((d: any) => ({
      day: d.day,
      title: d.title || `Day ${d.day}`,
      description: d.description || '',
      activities: d.activities || [],
      meals: d.meals || '',
    }));
  } catch {
    return [];
  }
}
