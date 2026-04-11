/**
 * Common types and helpers for the CRM system (4.1)
 * This file is purely isomorphic and contains no environment-specific dependencies.
 */

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
  base_price?: string | number;
}

/**
 * Helper to generate a URL-safe slug from a string
 */
export function slugify(text: string): string {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')  // Remove all non-word chars
    .replace(/--+/g, '-');    // Replace multiple - with single -
}
