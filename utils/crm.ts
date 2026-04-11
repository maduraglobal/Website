import { Tour, Destination, slugify } from './crm-types';
export type { Tour, Destination };
export { slugify };

/**
 * Public Isomorphic Data Fetchers
 * These methods are designed to be safe for use in Client Components.
 * On the server (SSR), they will return empty values to avoid 'localhost' fetch issues.
 */
export async function getTours(params: { country?: string; destination?: string } = {}): Promise<Tour[]> {
  if (typeof window === 'undefined') return [];

  const query = new URLSearchParams();
  if (params.country) query.append('country', params.country);
  if (params.destination) query.append('destination', params.destination);

  const res = await fetch(`/api/tours?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch tours');
  return res.json();
}

export async function getDestinations(): Promise<Destination[]> {
  if (typeof window === 'undefined') return [];

  const res = await fetch('/api/destinations');
  if (!res.ok) throw new Error('Failed to fetch destinations');
  return res.json();
}

/**
 * Fetches a single tour by slug or ID
 */
export async function getTourBySlug(slug: string): Promise<Tour | null> {
  const tours = await getTours();
  return tours.find(t => t.slug === slug || t.id === slug) || null;
}

/**
 * Fetches a single destination by slug, ID, or Name
 */
export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  const destinations = await getDestinations();
  const normalizedSlug = slug.toLowerCase();
  
  return destinations.find(d => 
    (d.slug && d.slug.toLowerCase() === normalizedSlug) || 
    d.id === slug || 
    slugify(d.name) === normalizedSlug
  ) || null;
}

/**
 * Fetches itinerary for a specific tour
 * Note: Should only be used client-side for dynamic loading. 
 * Server-side should use crm-server.ts.
 */
export async function getItineraryByTourId(tourId: string): Promise<any[]> {
  return [];
}
