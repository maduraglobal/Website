import React from 'react';
import Link from 'next/link';
import { getTours, getItineraryByTourId, Tour } from '@/utils/crm';
import { notFound } from 'next/navigation';
import TourDetailContent from './components/TourDetailContent';
import FallbackImage from '@/app/components/FallbackImage';

export default async function TourDetailPage({ params }: { params: Promise<{ region: string, slug: string }> }) {
  const { region, slug } = await params;

  // Fetch Tour Details exclusively from CRM (4.1)
  const tours = await getTours();
  const tour = tours.find(t => t.slug === slug);

  let currentTour: Tour | undefined = tour;
  let isMock = false;

  if (!currentTour) {
    if (slug.startsWith('premium-experience') || slug.startsWith('mock')) {
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

  // Fetch Itinerary exclusively from CRM (4.1)
  const itineraryData = await getItineraryByTourId(currentTour.id);

  const itinerary = itineraryData?.length ? itineraryData.map((item: any) => ({
    day: item.day_number,
    title: item.title,
    description: item.description,
    meals: item.meals || "Breakfast, Lunch, Dinner"
  })) : Array.from({ length: 6 }).map((_, i) => ({
    day: i + 1,
    title: `Amazing Experience Day ${i + 1}`,
    description: `Enjoy a full day of sightseeing and amazing premium experiences in the heart of the region. Local transfers and premium meals included.`,
    meals: "Breakfast, Lunch, Dinner"
  }));

  const validImgUrl = currentTour.images?.[0] || '/images/img-8.jpg';

  return (
    <div className="bg-white min-h-screen text-[#191974] text-[14px]">
      {/* 1. Breadcrumb - Moved higher and simplified */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-[12px] text-gray-500">
          <Link href={`/${region}`} className="hover:text-[#ee2229]">Home</Link>
          <span className="text-gray-300">&gt;</span>
          <Link href={`/${region}/tours`} className="hover:text-[#ee2229]">World</Link>
          <span className="text-gray-300">&gt;</span>
          <Link href={`/${region}/tours`} className="hover:text-[#ee2229]">South East Asia</Link>
          <span className="text-gray-300">&gt;</span>
          <span className="font-bold">{currentTour.title}</span>
        </div>
      </div>

      {/* 2. Panoramic Hero Image - Responsive and rounded corners */}
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

      {/* 3. Interactive Content Section (Tabs + Main + Sidebar) */}
      <TourDetailContent tour={currentTour} itinerary={itinerary} region={region} />
    </div>
  );
}
