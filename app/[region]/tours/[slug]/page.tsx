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
  })) : Array.from({length: 6}).map((_, i) => ({
    day: i + 1,
    title: `Amazing Experience Day ${i + 1}`,
    description: `Enjoy a full day of sightseeing and amazing premium experiences in the heart of the region. Local transfers and premium meals included.`,
    meals: "Breakfast, Lunch, Dinner"
  }));

  return (
    <div className="bg-white min-h-screen text-[#191974] font-arial text-[14px]">
      {/* 1. Breadcrumbs & Title Section */}
      <div className="bg-white border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center gap-2 text-[11px] text-gray-300 font-black mb-6 uppercase tracking-widest">
            <Link href={`/${region}`} className="hover:text-[#ee2229] transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <Link href={`/${region}/tours`} className="hover:text-[#ee2229] transition-colors">Tours</Link>
            <span className="opacity-30">/</span>
            <span className="text-[#ee2229] font-black">{currentTour.title}</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-[10px] font-black tracking-widest uppercase bg-[#ee2229] text-white px-3 py-1.5 rounded-sm shadow-lg shadow-red-500/20">
                  Best Seller
                </span>
                {(currentTour.tags || ["Family", "Premium", "Group Tour"]).map((tag: string) => (
                  <span key={tag} className="text-[10px] font-black tracking-widest uppercase bg-[#191974]/5 text-[#191974] px-3 py-1.5 rounded-sm border border-[#191974]/10">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-[32px] md:text-[40px] font-black font-inter text-[#191974] leading-tight tracking-tight uppercase">
                {currentTour.title}
              </h1>
              <div className="flex items-center gap-8 mt-4">
                <span className="text-[14px] font-black text-[#ee2229] uppercase tracking-widest flex items-center gap-2 font-inter-tight">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {currentTour.duration}
                </span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-4 h-4 text-[#ee2229] fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                  <span className="text-[11px] font-black text-gray-300 ml-2 tracking-widest uppercase">(4.9 Rated)</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex flex-col items-end gap-1">
               <span className="text-[11px] font-black text-gray-300 uppercase tracking-widest">Share this Tour</span>
               <div className="flex gap-2">
                  <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-[#ee2229] hover:text-white transition-all cursor-pointer"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg></div>
                  <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-[#ee2229] hover:text-white transition-all cursor-pointer"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg></div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Panoramic Hero Image */}
      <div className="w-full h-[50vh] min-h-[450px] relative overflow-hidden">
        <img
          src={currentTour.image_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1200'}
          alt={currentTour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#191974]/60 to-transparent"></div>
        <div className="absolute bottom-10 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4">
            <button className="bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white border border-white/20 px-8 py-3 rounded-xl text-[12px] font-black transition-all uppercase tracking-[0.2em] shadow-2xl">
              Launch Immersive Gallery
            </button>
          </div>
        </div>
      </div>

      {/* 3. Interactive Content Section (Tabs + Main + Sidebar) */}
      <TourDetailContent tour={currentTour} itinerary={itinerary} region={region} />

    </div>
  );
}
