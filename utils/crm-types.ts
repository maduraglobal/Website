/**
 * Common types and helpers for the CRM system (4.1)
 * This file is purely isomorphic and contains no environment-specific dependencies.
 */

export type BookingStatus = "pending" | "payment_initiated" | "confirmed" | "failed" | "cancelled";

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface Itinerary {
  id: string;
  tour_id: string;
  days: ItineraryDay[];
  updated_by: string;
  updated_at: string;
  version: number;
}

export interface Tour {
  id: string;
  title: string;
  slug: string;
  price: number;
  currency?: "INR" | "AUD" | "USD";
  duration: string;
  duration_days?: number;
  duration_nights?: number;
  destination_id?: string;
  category_id?: string;
  image_url?: string;
  images: string[];
  travelers?: {
    adults: number;
    children: number;
    infants: number;
  };
  flight_details?: string;
  accommodation_details?: string;
  inclusions?: string[];
  exclusions?: string[];
  visibility?: boolean;
  itinerary_id: string;
  tags?: string[];
  rating?: number;
  meta_title?: string;
  meta_description?: string;
  // Localized/Formatted fields for card display
  destination: string;
}

export interface Destination {
  id: string;
  parent_id: string | null;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  meta_title?: string;
  meta_description?: string;
}

/**
 * Helper to generate a URL-safe slug from a string
 */
export function slugify(text: string): string {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-"); // Replace multiple - with single -
}
