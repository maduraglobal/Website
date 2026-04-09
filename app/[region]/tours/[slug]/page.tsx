import React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import TourDetailContent from './components/TourDetailContent';
import FallbackImage from '@/app/components/FallbackImage';

export default async function TourDetailPage({ params }: { params: Promise<{ region: string, slug: string }> }) {
  const { region, slug } = await params;
  const supabase = await createClient();

  // Fetch Tour Details from Supabase
  const { data: tour, error } = await supabase
    .from('tours')
    .select('*')
    .eq('slug', slug)
    .single();

  let currentTour = tour;
  let isMock = false;

  if (error || !currentTour) {
    if (slug.startsWith('premium-experience') || slug.startsWith('mock')) {
      isMock = true;
      currentTour = {
        id: 'mock-1',
        title: `${region.charAt(0).toUpperCase() + region.slice(1)} Premium Tour Showcase`,
        slug: slug,
        duration: '7 Days | 6 Nights',
        image_url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=1200',
        tags: ["Premium", "Family", "Best Seller"],
        price: 45000
      };
    } else {
      return notFound();
    }
  }

  // Fetch Itinerary for this tour
  const { data: itineraryData } = await supabase
    .from('itineraries')
    .select('*')
    .eq('tour_id', currentTour.id)
    .order('day_number', { ascending: true });

  const itinerary = itineraryData?.length ? itineraryData.map(item => ({
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

  const validImgUrl = (currentTour.image_url && typeof currentTour.image_url === 'string' && currentTour.image_url.trim().startsWith('http'))
    ? currentTour.image_url.trim()
    : '/images/img-8.jpg';

  return (
    <div className="bg-white min-h-screen text-[#191974] text-[14px]">
      {/* 1. Breadcrumbs & Title Section */}
      <div className="bg-white border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center gap-2 text-[11px] text-gray-300  mb-6  tracking-widest">
            <Link href={`/${region}`} className="hover:text-[#ee2229] transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <Link href={`/${region}/tours`} className="hover:text-[#ee2229] transition-colors">Tours</Link>
            <span className="opacity-30">/</span>
            <span className="text-[#ee2229] ">{currentTour.title}</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="flex-1">

              <h1 className="text-[32px] md:text-[65px]  text-[#191974] leading-tight tracking-tight ">
                {currentTour.title}
              </h1>
              <div className="flex items-center gap-8 mt-4">
                <span className="text-[14px]  text-[#ee2229]  tracking-widest flex items-center gap-2 ">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {currentTour.duration}
                </span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-4 h-4 text-[#ee2229] fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                  <span className="text-[11px]  text-gray-300 ml-2 tracking-widest ">(4.9 Rated)</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Panoramic Hero Image */}
      <div className="w-full h-[50vh] min-h-[450px] relative overflow-hidden">
        <FallbackImage
          src={validImgUrl}
          fallbackSrc="/images/img-8.jpg"
          alt={currentTour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#191974]/60 to-transparent"></div>
      </div>

      {/* 3. Interactive Content Section (Tabs + Main + Sidebar) */}
      <TourDetailContent tour={currentTour} itinerary={itinerary} region={region} />

    </div>
  );
}
