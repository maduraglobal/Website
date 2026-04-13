import React from 'react';
import Link from 'next/link';
import { getToursFromDB, getTourBySlugFromDB, getItineraryByTourIdFromDB } from '@/utils/crm-server';
import { Tour } from '@/utils/crm';
import { notFound } from 'next/navigation';
import TourDetailContent from './components/TourDetailContent';
import FallbackImage from '@/app/components/FallbackImage';

export default async function TourDetailPage({ params }: { params: Promise<{ region: string, slug: string }> }) {
  const { region, slug } = await params;

  // Fetch Tour Details exclusively from CRM (4.1)
  const tour = await getTourBySlugFromDB(slug);
  
  let currentTour: Tour | undefined = tour || undefined;
  let isMock = false;

  if (!currentTour) {
    const FEATURED_TOURS: Record<string, Partial<Tour>> = {
      'best-of-japan': {
        id: 'feat-japan',
        title: 'Best Of Japan',
        slug: 'best-of-japan',
        duration: '7 Days | 6 Nights',
        price: 279000,
        images: ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200'],
      },
      'european-glories': {
        id: 'feat-europe',
        title: 'European Glories',
        slug: 'european-glories',
        duration: '12 Days | 11 Nights',
        price: 455000,
        images: ['https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=1200'],
      },
      'dubai-grandeur': {
        id: 'feat-dubai',
        title: 'Dubai Grandeur',
        slug: 'dubai-grandeur',
        duration: '6 Days | 5 Nights',
        price: 112000,
        images: ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200'],
      }
    };

    if (FEATURED_TOURS[slug]) {
      currentTour = {
        ...FEATURED_TOURS[slug],
        destination: region.toUpperCase(),
        tags: ["Featured", "Best Seller"],
        itinerary_id: `mock-${slug}`
      } as Tour;
    } else if (slug.startsWith('premium-experience') || slug.startsWith('mock')) {
      isMock = true;
      currentTour = {
        id: 'mock-1',
        title: `${region.charAt(0).toUpperCase() + region.slice(1)} Premium Tour Showcase`,
        slug: slug,
        duration: '7 Days | 6 Nights',
        images: ['https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=1200'],
        tags: ["Premium", "Family", "Best Seller"],
        price: 45000,
        destination: region.toUpperCase(),
        itinerary_id: 'mock-1'
      };
    } else {
      return notFound();
    }
  }

  if (!currentTour) return notFound(); // Safety guard

  // ─── ITINERARY GENERATION ──────────────────────────────────────────────────
  let itinerary;
  if (slug === 'best-of-japan') {
    itinerary = [
      { day: 1, title: "Osaka Arrival", description: "Arrive at Kansai Airport. Visit Osaka Castle and Dotonbori.", meals: "Dinner" },
      { day: 2, title: "Kyoto Heritage", description: "Visit Kinkaku-ji and Fushimi Inari-taisha.", meals: "B, L, D" },
      { day: 3, title: "Nara Deer Park", description: "Interact with the deer in Nara and visit Todai-ji.", meals: "B, L, D" },
      { day: 4, title: "Bullet Train to Tokyo", description: "Experience the Shinkansen. Visit Harajuku.", meals: "B, L, D" },
      { day: 5, title: "Mt. Fuji & Hakone", description: "Lake Ashi cruise and panoramic views of Fuji.", meals: "B, L, D" },
      { day: 6, title: "Tokyo City Lights", description: "Visit Shibuya Crossing and Senso-ji Temple.", meals: "B, L, D" },
      { day: 7, title: "Sayonara Japan", description: "Transfer to Narita International Airport for departure.", meals: "Breakfast" }
    ];
  } else if (slug === 'european-glories') {
    itinerary = Array.from({ length: 12 }).map((_, i) => ({
      day: i + 1,
      title: `Europe Discovery Day ${i + 1}`,
      description: "Explore the historic capitals and stunning landscapes of France, Switzerland, and Italy.",
      meals: "B, L, D"
    }));
  } else if (slug === 'dubai-grandeur') {
    itinerary = [
      { day: 1, title: "Welcome to Dubai", description: "Dhow Cruise Dinner in the evening.", meals: "Dinner" },
      { day: 2, title: "City Tour & Burj Khalifa", description: "Half day city tour and visit to 124th floor.", meals: "B, D" },
      { day: 3, title: "Desert Safari", description: "Dune bashing, camel rides, and BBQ dinner.", meals: "B, D" },
      { day: 4, title: "Abu Dhabi Exploration", description: "Visit Sheikh Zayed Grand Mosque and Ferrari World.", meals: "B, L" },
      { day: 5, title: "Luxury Shopping", description: "Visit Dubai Mall and Emirates Mall.", meals: "Breakfast" },
      { day: 6, title: "Departure", description: "Transfer to Dubai Airport.", meals: "Breakfast" }
    ];
  } else {
    // Default fallback
    const itineraryData = await getItineraryByTourIdFromDB(currentTour.id);
    itinerary = itineraryData?.length ? itineraryData.map((item: any) => ({
      day: item.day_number,
      title: item.title,
      description: item.description,
      meals: item.meals || "Breakfast, Lunch, Dinner"
    })) : Array.from({ length: 7 }).map((_, i) => ({
      day: i + 1,
      title: `Amazing Experience Day ${i + 1}`,
      description: `Enjoy a full day of sightseeing and amazing premium experiences.`,
      meals: "Breakfast, Lunch, Dinner"
    }));
  }

  const validImgUrl = currentTour.images?.[0] || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop';

  return (
    <div className="bg-white min-h-screen text-[#191974] text-[14px]">
      {/* 1. Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-[12px] text-gray-500 font-inter">
          <Link href={`/${region}`} className="hover:text-[#ee2229]">Home</Link>
          <span className="text-gray-300">&gt;</span>
          <Link href={`/${region}/tours`} className="hover:text-[#ee2229]">World</Link>
          <span className="text-gray-300">&gt;</span>
          <span className="font-bold">{currentTour.title}</span>
        </div>
      </div>

      {/* 2. Panoramic Hero Image */}
      <div className="max-w-7xl mx-auto px-4 mb-4">
        <div className="w-full h-[300px] md:h-[450px] relative overflow-hidden rounded-2xl shadow-sm">
          <FallbackImage
            src={validImgUrl}
            fallbackSrc="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop"
            alt={currentTour.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 3. Interactive Content Section */}
      <TourDetailContent tour={currentTour} itinerary={itinerary} region={region} />
    </div>
  );
}
