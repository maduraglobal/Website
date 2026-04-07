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
              <div key={tour.id} className="bg-white border border-gray-200 rounded-[12px] overflow-hidden shadow-sm flex flex-col group transition-all hover:shadow-xl font-arial">
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
                    {/* Top Badges */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                       <div className="w-8 h-8 rounded-full bg-[#ee2229] flex items-center justify-center text-white font-black text-[10px] shadow-md border border-white/20">
                          XD
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm text-gray-900 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                          {tour.duration}
                        </div>
                    </div>
                    {/* Map Button */}
                    <div className="absolute bottom-4 right-4 text-black">
                      <button className="bg-black/50 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 hover:bg-black/70 transition-colors">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.19 7 11.85 7 9z"/><circle cx="12" cy="9" r="2.5"/></svg>
                        Map
                      </button>
                    </div>
                  </div>
                </Link>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-[13px] text-gray-500 mb-1">Explorer</p>
                  <Link href={`/${region}/tours/${tour.slug}`}>
                    <h3 className="text-[17px] font-bold text-gray-900 mb-2 leading-snug line-clamp-2 h-[48px] hover:text-[#191974] transition-colors">{tour.title}</h3>
                  </Link>
                  
                  <p className="text-[13px] text-gray-600 mb-4">1 Dates</p>

                  {/* Icon Grid */}
                  <div className="flex items-center justify-between mb-4 border-t border-gray-50 pt-3">
                    <span className="text-[13px] font-bold text-gray-900">Tour Includes</span>
                    <div className="flex gap-3 text-red-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="bg-gray-50 -mx-5 px-5 py-5 mt-auto border-t border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-[10px] text-gray-500 font-medium">All inclusive price starts</p>
                        <p className="text-[24px] font-black text-gray-900 leading-tight">
                          {formatRegionalPrice(tour.base_price_inr || 245000, region)}*
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1.5 text-[#191974]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <div className="text-left">
                             <p className="text-[11px] font-bold leading-none">EMI from</p>
                             <p className="text-[12px] font-bold text-[#191974]">₹5,259/month</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 pb-2">
                       <Link href={`/${region}/tours/${tour.slug}`} className="border border-red-600 text-red-600 py-2.5 rounded-[6px] text-[13px] font-bold text-center hover:bg-red-50 transition-colors">
                          View Tour
                        </Link>
                        <Link href={`/${region}/booking?tour=${tour.slug}`} className="bg-[#ee2229] text-white py-2.5 rounded-[6px] text-[13px] font-bold text-center hover:bg-red-700 transition-colors shadow-sm">
                          Book Online
                        </Link>
                    </div>

                    {/* Bottom Links */}
                    <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                         </div>
                         <span className="text-[12px] font-bold text-red-600 border-b border-red-600 leading-tight cursor-pointer uppercase tracking-wide">Request Callback</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                         <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                         <span className="text-[12px] font-medium text-gray-600 uppercase tracking-wide">Itinerary</span>
                      </div>
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
