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
    <div className="bg-white min-h-screen font-arial text-[14px]">

      {/* Header Banner */}
      <div className="w-full bg-[#191974] py-16 text-center text-white">
        <h1 className="text-[32px] font-black font-inter mb-4 uppercase tracking-tight">All Holiday Packages</h1>
        <p className="font-inter text-[26px] font-light opacity-90 max-w-2xl mx-auto leading-tight">Explore curated, all-inclusive tour packages.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">

        {/* Left Sidebar (Filters) */}
        <aside className="w-full md:w-1/4 shrink-0 flex flex-col gap-6">

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-[#191974] text-[16px] border-b border-gray-100 pb-3 mb-4 uppercase font-inter tracking-wider">Destination</h3>
            <div className="flex flex-col gap-3 font-arial text-[14px]">
              {['Europe', 'South East Asia', 'India'].map(dest => (
                <label key={dest} className="flex items-center gap-2 cursor-pointer text-[#191974] hover:text-[#ee2229] transition-colors font-semibold">
                  <input type="checkbox" className="rounded text-[#ee2229] focus:ring-[#ee2229]" /> {dest}
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-[#191974] text-[16px] border-b border-gray-100 pb-3 mb-4 uppercase font-inter tracking-wider">Duration</h3>
            <div className="flex flex-col gap-3 font-arial text-[14px]">
              {['3 to 5 Days', '6 to 9 Days', '10+ Days'].map(dur => (
                <label key={dur} className="flex items-center gap-2 cursor-pointer text-[#191974] hover:text-[#ee2229] transition-colors font-semibold">
                  <input type="checkbox" className="rounded text-[#ee2229] focus:ring-[#ee2229]" /> {dur}
                </label>
              ))}
            </div>
          </div>

        </aside>

        {/* Right Content Area (Grid) */}
        <div className="w-full md:w-3/4 flex flex-col">

          <div className="flex justify-between items-center mb-10">
            <span className="text-[14px] font-bold text-[#191974] tracking-wide">Showing {displayTours.length} Packages</span>
            <select className="border border-gray-200 rounded-lg px-4 py-2 text-[14px] outline-none text-[#191974] font-bold bg-white cursor-pointer shadow-sm hover:border-gray-300">
              <option>Sort by: Popularity</option>
              <option>Price: Low to High</option>
              {/* ... other options */}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayTours.map((tour) => (
              <div key={tour.id} className="bg-white border border-gray-200 rounded-[12px] overflow-hidden shadow-sm flex flex-col group transition-all hover:shadow-xl">
                <Link href={`/${region}/tours/${tour.slug}`} className="cursor-pointer">
                  <div className="relative h-56 overflow-hidden">
                    <img src={tour.image_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800'} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                       <div className="w-8 h-8 rounded-full bg-[#ee2229] flex items-center justify-center text-white font-black text-[10px] shadow-md border border-white/20">XD</div>
                       <div className="bg-white/90 backdrop-blur-sm text-[#191974] text-[11px] font-bold px-3 py-1 rounded-full"> {tour.duration} </div>
                    </div>
                  </div>
                </Link>

                <div className="p-5 flex flex-col flex-1">
                  <p className="text-[11px] text-[#ee2229] font-black uppercase tracking-widest mb-1 font-inter-tight">Explorer</p>
                  <Link href={`/${region}/tours/${tour.slug}`}>
                    <h3 className="text-[17px] font-bold text-[#191974] mb-4 leading-snug line-clamp-2 h-[48px] hover:text-[#ee2229] mb-4 transition-colors font-inter">{tour.title}</h3>
                  </Link>
                  
                  <div className="flex items-center justify-between mb-6 pt-4 border-t border-gray-100">
                    <div className="flex flex-col">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Starts from</p>
                      <p className="text-[22px] font-black text-[#191974] leading-none tracking-tighter">
                        {formatRegionalPrice(tour.base_price_inr || 245000, region)}
                      </p>
                    </div>
                     <Link href={`/${region}/booking?tour=${tour.slug}`} className="bg-[#ee2229] text-white px-5 py-2.5 rounded-lg text-[13px] font-bold font-inter-tight hover:bg-[#191974] transition-all uppercase tracking-widest shadow-md">
                        Book Now
                     </Link>
                  </div>

                  <div className="flex items-center justify-between py-3 border-t border-gray-50 mt-auto">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Included</span>
                    <div className="flex gap-2.5 text-[#191974]">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
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
