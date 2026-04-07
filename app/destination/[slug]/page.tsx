import React from 'react';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import DestinationHeader from '@/app/components/tours/DestinationHeader';
import FiltersSidebar from '@/app/components/tours/FiltersSidebar';
import TourCard from '@/app/components/tours/TourCard';

export default async function DestinationToursPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  // Try fetching destination
  const { data: destination, error: destError } = await supabase
    .from('destinations')
    .select('*')
    .eq('slug', slug)
    .single();

  // For UI preview purposes, we'll allow mock data if DB is empty/fails
  const destName = destination?.name || slug.replace('-', ' ');

  // Try fetching tours for this destination
  let tours = [];
  if (destination) {
    const { data } = await supabase
      .from('tours')
      .select('*')
      .eq('destination_id', destination.id);
    if (data) tours = data;
  }

  // Fallback mock tours if nothing in DB
  if (!tours || tours.length === 0) {
    const defaultImages = [
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1587474260580-5a3d0d80c356?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=800'
    ];

    tours = Array.from({ length: 6 }).map((_, i) => ({
      id: `mock-${i}`,
      title: `${destName} Premium Experience ${i + 1}`,
      slug: `premium-experience-${i + 1}`,
      price: 35000 + (i * 5000),
      duration_days: 5 + i,
      cities_count: 2 + (i % 3),
      image_url: defaultImages[i % defaultImages.length]
    }));
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-[#171717] font-sans">


      <DestinationHeader 
        destinationName={destName} 
        totalTours={tours.length} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Breadcrumb / Layout Top */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="text-sm text-gray-500 font-medium">
            <span className="hover:text-[#ee2229] cursor-pointer">Home</span> / 
            <span className="hover:text-[#ee2229] cursor-pointer ml-1">Destinations</span> / 
            <span className="text-[#191974] font-bold ml-1 capitalize">{destName}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-600">Sort By:</span>
            <select className="bg-white border border-gray-200 text-sm rounded-lg focus:ring-[#191974] focus:border-[#191974] block p-2 font-medium">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Duration: Short to Long</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Sidebar */}
          <div className="w-full lg:w-1/4 shrink-0">
            <FiltersSidebar />
          </div>

          {/* Right Content Area */}
          <div className="w-full lg:w-3/4 flex flex-col space-y-6">
            
            {/* Active Filters Display */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 overflow-x-auto">
              <span className="text-sm font-bold text-gray-700 shrink-0">Active Filters:</span>
              <span className="bg-[#191974]/5 text-[#191974] px-3 py-1.5 rounded-lg text-xs font-bold border border-[#191974]/10 shrink-0">
                {destName} <button className="ml-1 text-gray-400 hover:text-[#ee2229]">×</button>
              </span>
              <button className="text-xs font-bold text-[#ee2229] ml-auto shrink-0 hover:underline">Clear All</button>
            </div>

            {/* Tour Cards Grid */}
            <div className="space-y-6">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} destinationSlug={slug} />
              ))}
            </div>

            {/* Pagination Component */}
            <div className="py-8 flex justify-center">
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-[#191974] transition-colors shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button className="w-10 h-10 rounded-xl bg-[#191974] text-white flex items-center justify-center font-bold shadow-md shadow-[#191974]/20">1</button>
                <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:border-[#191974] hover:text-[#191974] transition-colors shadow-sm">2</button>
                <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:border-[#191974] hover:text-[#191974] transition-colors shadow-sm">3</button>
                <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-[#191974] transition-colors shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>


    </div>
  );
}
