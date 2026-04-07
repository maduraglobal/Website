import React from 'react';
import { formatRegionalPrice } from '../../../config/country';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';

export default async function ToursListingPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const supabase = await createClient();

  // Fetch Tours from Supabase
  const { data: tours, error } = await supabase
    .from('tours')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tours:', error);
  }

  const displayTours = tours || [];

  return (
    <div className="bg-background min-h-screen">

      {/* Header Banner */}
      <div className="w-full bg-[#191974] py-16 text-center text-white">
        <h1 className="text-[32px] md:text-[40px] font-bold font-inter mb-3">All Holiday Packages</h1>
        <p className="font-inter-tight opacity-90 max-w-2xl mx-auto">Explore carefully curated, all-inclusive tour packages across the globe. Seamlessly planned for you.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">

        {/* Left Sidebar (Filters) */}
        <aside className="w-full md:w-1/4 shrink-0 flex flex-col gap-6">

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-[#171717] text-[16px] border-b border-gray-100 pb-3 mb-4">Destination</h3>
            <div className="flex flex-col gap-3 font-inter-tight text-[14px]">
              <label className="flex items-center gap-2 cursor-pointer hover:text-[#ee2229] transition-colors">
                <input type="checkbox" className="rounded text-[#191974] focus:ring-[#191974]" /> Europe
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-[#ee2229] transition-colors">
                <input type="checkbox" className="rounded text-[#191974] focus:ring-[#191974]" /> South East Asia
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-[#ee2229] transition-colors">
                <input type="checkbox" className="rounded text-[#191974] focus:ring-[#191974]" /> India
              </label>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-[#171717] text-[16px] border-b border-gray-100 pb-3 mb-4">Duration</h3>
            <div className="flex flex-col gap-3 font-inter-tight text-[14px]">
              <label className="flex items-center gap-2 cursor-pointer hover:text-[#ee2229] transition-colors">
                <input type="checkbox" className="rounded text-[#191974] focus:ring-[#191974]" /> 3 to 5 Days
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-[#ee2229] transition-colors">
                <input type="checkbox" className="rounded text-[#191974] focus:ring-[#191974]" /> 6 to 9 Days
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-[#ee2229] transition-colors">
                <input type="checkbox" className="rounded text-[#191974] focus:ring-[#191974]" /> 10+ Days
              </label>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-[#171717] text-[16px] border-b border-gray-100 pb-3 mb-4">Tour Type</h3>
            <div className="flex flex-col gap-3 font-inter-tight text-[14px]">
              <label className="flex items-center gap-2 cursor-pointer hover:text-[#ee2229] transition-colors">
                <input type="checkbox" className="rounded text-[#191974] focus:ring-[#191974]" /> Family Tours
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-[#ee2229] transition-colors">
                <input type="checkbox" className="rounded text-[#191974] focus:ring-[#191974]" /> Honeymoon Special
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-[#ee2229] transition-colors">
                <input type="checkbox" className="rounded text-[#191974] focus:ring-[#191974]" /> Women's Special
              </label>
            </div>
          </div>

        </aside>

        {/* Right Content Area (Grid) */}
        <div className="w-full md:w-3/4 flex flex-col">

          <div className="flex justify-between items-center mb-6">
            <span className="text-[14px] font-inter-tight text-gray-500 font-bold tracking-wide">Showing {displayTours.length} Packages</span>
            <select className="border border-gray-200 rounded-lg px-4 py-2 text-[14px] outline-none text-[#171717] font-semibold bg-white cursor-pointer shadow-sm hover:border-gray-300">
              <option>Sort by: Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Duration: Longest First</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
            {displayTours.map((tour) => (
              <div key={tour.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md flex flex-col group transition-all hover:shadow-xl">
                <Link href={`/${region}/tours/${tour.slug}`} className="cursor-pointer">
                  {/* Image Section */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={tour.image_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800'} 
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e: any) => {
                        e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800';
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-[#ee2229] text-white text-[10px] font-bold px-2 py-1 flex items-center gap-1 uppercase tracking-wider rounded-sm shadow-sm">
                      <span className="text-white/90">{tour.rating > 4.5 ? 'Best Seller' : 'Trending'}</span>
                      <span className="w-px h-3 bg-white/30 px-0 mx-1"></span>
                      <span>{tour.duration}</span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm cursor-pointer hover:bg-white transition-colors">
                      <svg className="w-5 h-5 text-gray-300 hover:text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                    </div>
                  </div>
                </Link>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-1">
                  <Link href={`/${region}/tours/${tour.slug}`}>
                    <h3 className="text-[18px] font-bold text-gray-800 mb-2 line-clamp-2 hover:text-[#191974] transition-colors cursor-pointer min-h-[54px]">{tour.title}</h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(tour.rating || 4.5) ? 'fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[12px] text-gray-500 font-medium">({tour.review_count || '1.2k'})</span>
                  </div>
                  
                  {/* Destinations - Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6 min-h-[48px]">
                    {(tour.destinations || ['Europe', 'Asia']).slice(0, 3).map((dest: string) => (
                      <span key={dest} className="text-[10px] text-gray-600 font-bold px-2 py-1 bg-gray-50 border border-gray-100 rounded-md uppercase tracking-wider">
                        {dest}
                      </span>
                    ))}
                  </div>

                  {/* Icon Grid (Kesari Style) */}
                  <div className="border-t border-gray-100 pt-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-bold text-gray-800">Includes</span>
                      <div className="flex gap-3 text-gray-400">
                        <svg className="w-4 h-4 hover:text-[#191974] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                        <svg className="w-4 h-4 hover:text-[#191974] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <svg className="w-4 h-4 hover:text-[#191974] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        <svg className="w-4 h-4 hover:text-[#191974] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      </div>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="mt-auto">
                    <span className="text-[10px] text-gray-400 block mb-0.5 font-bold uppercase tracking-widest">Starting From</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[24px] font-extrabold text-gray-900">{formatRegionalPrice(tour.base_price_inr || 245000, region)}</span>
                      <span className="text-[13px] text-gray-400 line-through">{formatRegionalPrice((tour.base_price_inr || 245000) * 1.2, region)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-col gap-3">
                    <Link
                      href={`/${region}/booking?tour=${tour.slug}`}
                      className="w-full bg-[#ee2229] hover:bg-[#d61e24] text-white py-3 rounded-md text-[14px] font-bold text-center transition-all shadow-sm"
                    >
                      Book Online
                    </Link>
                    <div className="flex items-center justify-between gap-4">
                      <button className="flex-1 flex items-center justify-center gap-2 text-[12px] font-bold text-teal-600 hover:text-teal-700 transition-colors uppercase tracking-wider">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.222-4.032c1.503.893 3.129 1.364 4.795 1.365 5.279 0 9.571-4.292 9.573-9.571 0-2.559-1.001-4.965-2.818-6.782-1.817-1.817-4.222-2.813-6.783-2.813-5.276 0-9.569 4.292-9.572 9.571-.001 1.763.483 3.482 1.398 5.011l-.914 3.342 3.42-.897zm11.445-7.712c-.318-.16-.1.88-2.613-2.313-2.022-2.358-1.589-2.357-1.871-2.484-.336-.151-1.127-.197-1.488.16-.36.357-1.092 1.066-1.092 2.601 0 1.535 2.115 2.922 1.411 3.3.704.378 1.922 4.137 4.116 5.084.542.233 1.021.253 1.458.12.51-.156 1.056-.43 1.268-.992.212-.562.212-1.042.148-1.141-.064-.1-.232-.16-.549-.319z" /></svg>
                        Request Callback
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 text-[12px] font-bold text-gray-500 hover:text-gray-700 transition-colors uppercase tracking-wider border-l border-gray-100">
                        Get Itinerary
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
