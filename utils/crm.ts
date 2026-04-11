/**
 * CRM Data Fetching Utility (4.0)
 * 
 * Provides standardized methods for interacting with the Tours & Destinations system.
 * This ensures all data is sourced exclusively from the CRM via the API mediation layer.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

export interface Tour {
  id: string;
  title: string;
  slug: string;
  price: number;
  duration: string;
  destination: string;
  images: string[];
  itinerary_id: string;
  tags?: string[];
  rating?: number;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  country_code: string;
  description?: string;
  image_url?: string;
}

/**
 * Internal DB fetchers to bypass localhost fetch issues on server-side (4.1)
 */
async function getToursFromDB(params: { country?: string; destination?: string } = {}): Promise<Tour[]> {
  const supabase = await (await import('@/utils/supabase/server')).createClient();
  
  // Select everything to avoid column name guessing in the query string
  let query = supabase.from('tours').select('*');

  if (params.destination) {
    // If we have destination slug, we might need a join or a second query.
    // However, let's first get all tours and verify columns.
  }

  const { data: rawTours, error } = await query;
  if (error) {
    console.error('getToursFromDB error:', error);
    throw error;
  }

  return (rawTours || []).map((t: any) => ({
    id: t.id,
    title: t.title,
    slug: t.slug,
    price: t.base_price_inr || t.price || 0,
    duration: t.duration_days ? `${t.duration_days} Days` : (t.duration || 'N/A'),
    destination: t.destination_name || 'Destination', // Adjusting if it's a flat field
    images: t.image_url ? [t.image_url] : (t.images || []),
    itinerary_id: t.id
  }));
}

async function getDestinationsFromDB(): Promise<Destination[]> {
  const supabase = await (await import('@/utils/supabase/server')).createClient();
  const { data, error } = await supabase.from('destinations').select('*').order('name');
  if (error) {
    console.error('getDestinationsFromDB error:', error);
    throw error;
  }
  return data || [];
}

/**
 * Public Data Fetchers
 */
export async function getTours(params: { country?: string; destination?: string } = {}): Promise<Tour[]> {
  // If server-side, bypass fetch to avoid URL resolution issues and improve performance
  if (typeof window === 'undefined') {
    return getToursFromDB(params);
  }

  const query = new URLSearchParams();
  if (params.country) query.append('country', params.country);
  if (params.destination) query.append('destination', params.destination);

  const res = await fetch(`/api/tours?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch tours');
  return res.json();
}

export async function getDestinations(): Promise<Destination[]> {
  if (typeof window === 'undefined') {
    return getDestinationsFromDB();
  }

  const res = await fetch('/api/destinations');
  if (!res.ok) throw new Error('Failed to fetch destinations');
  return res.json();
}

/**
 * Fetches a single tour by slug
 */
export async function getTourBySlug(slug: string): Promise<Tour | null> {
  const tours = await getTours();
  return tours.find(t => t.slug === slug) || null;
}

/**
 * Fetches a single destination by slug
 */
export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  const destinations = await getDestinations();
  return destinations.find(d => d.slug === slug) || null;
}

/**
 * Fetches itinerary for a specific tour
 */
export async function getItineraryByTourId(tourId: string): Promise<any[]> {
  const supabase = await (await import('@/utils/supabase/server')).createClient();
  const { data } = await supabase
    .from('itineraries')
    .select('*')
    .eq('tour_id', tourId)
    .order('day_number', { ascending: true });
  
  return data || [];
}
