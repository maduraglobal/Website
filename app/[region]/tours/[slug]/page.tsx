import React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import TourDetailContent from './components/TourDetailContent';

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
    // If it's a mock slug from our UI preview logic, generate a mock tour instead of 404
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
      console.error('Error fetching tour:', error);
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
  })) : Array.from({length: 6}).map((_, i) => ({
    day: i + 1,
    title: `Amazing Experience Day ${i + 1}`,
    description: `Enjoy a full day of sightseeing and amazing premium experiences in the heart of the region. Local transfers and premium meals included.`,
    meals: "Breakfast, Lunch, Dinner"
  }));

  return (
    <div className="bg-white min-h-screen text-black">
      {/* 1. Breadcrumbs & Title Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-[12px] text-gray-400 font-bold mb-4 uppercase tracking-wider">
            <Link href={`/${region}`} className="hover:text-[#191974]">Home</Link>
            <span>/</span>
            <Link href={`/${region}/tours`} className="hover:text-[#191974]">Tours</Link>
            <span>/</span>
            <span className="text-[#191974]">{currentTour.title}</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-[10px] font-black tracking-widest uppercase bg-[#FFD700] text-[#191974] px-2.5 py-1 rounded-md">
                  Best Seller
                </span>
                {(currentTour.tags || ["Family", "Premium", "Group Tour"]).map((tag: string) => (
                  <span key={tag} className="text-[10px] font-black tracking-widest uppercase bg-gray-100 text-gray-500 px-2.5 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-[32px] md:text-[48px] font-black font-inter text-[#171717] leading-tight tracking-tight">
                {currentTour.title}
              </h1>
              <div className="flex items-center gap-6 mt-2">
                <span className="text-[14px] font-black text-[#ee2229] uppercase tracking-widest flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {currentTour.duration}
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                  <span className="text-[12px] font-bold text-gray-400 ml-1">(4.9/5)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Panoramic Hero Image */}
      <div className="w-full h-[400px] md:h-[550px] relative overflow-hidden">
        <img
          src={currentTour.image_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1200'}
          alt={currentTour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
        <div className="absolute bottom-10 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4">
            <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30 px-6 py-2.5 rounded-full text-[13px] font-bold transition-all uppercase tracking-widest">
              View Gallery (12+)
            </button>
          </div>
        </div>
      </div>

      {/* 3. Interactive Content Section (Tabs + Main + Sidebar) */}
      <TourDetailContent tour={currentTour} itinerary={itinerary} region={region} />

    </div>
  );
}
