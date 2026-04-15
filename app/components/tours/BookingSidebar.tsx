"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';
import { formatRegionalPrice } from '@/config/country';
import { Pencil, ChevronDown } from 'lucide-react';

interface BookingSidebarProps {
  price?: number;
  tourName: string;
  selectedCity?: string;
  selectedDate?: string;
  emiAmount?: string;
  region?: string;
  travellerCount?: { adults: number; children: number; infants: number };
}

export default function BookingSidebar({
  price = 45000,
  tourName,
  selectedCity = "Mumbai",
  selectedDate = "Select Date",
  emiAmount = "₹3,750",
  region = "en-in",
  travellerCount = { adults: 1, children: 0, infants: 0 }
}: BookingSidebarProps) {
  const router = useRouter();

  const handleBookNow = () => {
    const params = new URLSearchParams({
      tour: tourName,
      city: selectedCity,
      date: selectedDate,
      price: price.toString(),
      savings: '0'
    });
    router.push(`/${region}/booking?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden sticky top-23.5">
        <div className="p-5 border-b border-gray-50 bg-gray-50/30">
          <div className="flex items-center gap-2 text-[#191974]">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1" />
            </svg>
            <p className="text-[18px] font-bold uppercase tracking-wider">Booking Summary</p>
          </div>
        </div>

        <div className="p-6">
          {/* Booking Summary Details */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-gray-400 font-medium tracking-tight">Dept. city</span>
              <div className="flex items-center gap-1 cursor-pointer hover:text-[#ee2229] transition-colors group">
                <span className="text-[13px] text-[#191974] font-bold">{selectedCity}</span>
                <Pencil className="w-3 h-3 text-gray-300" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-gray-400 font-medium tracking-tight">Dept. date</span>
              <div className="flex items-center gap-1 cursor-pointer hover:text-[#ee2229] transition-colors group">
                <span className="text-[13px] text-[#191974] font-bold">{selectedDate}</span>
                <Pencil className="w-3 h-3 text-gray-300" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-gray-400 font-medium tracking-tight">Travellers</span>
              <div className="flex items-center gap-1 cursor-pointer hover:text-[#ee2229] transition-colors group">
                <span className="text-[13px] text-[#191974] font-bold">
                  {travellerCount.adults}A | {travellerCount.children}C | {travellerCount.infants}I
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#191974]" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-gray-400 font-medium tracking-tight">Rooms</span>
              <div className="flex items-center gap-1 cursor-pointer hover:text-[#ee2229] transition-colors group">
                <span className="text-[13px] text-[#191974] font-bold">{Math.ceil(travellerCount.adults / 2)} Room(s)</span>
                <Pencil className="w-3 h-3 text-gray-300" />
              </div>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-200 pt-6 mb-6">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[14px] text-gray-400 font-medium">Basic Price</span>
              <span className="text-[26px] font-bold text-[#191974] tracking-tighter leading-none">
                {formatRegionalPrice(price, region)}
              </span>
            </div>
            <div className="flex justify-between items-center text-[11px] text-[#191974] font-bold">
              <span className="hover:underline cursor-pointer flex items-center gap-1 uppercase tracking-tighter">View Pricing Table &rsaquo;</span>
              <span className="hover:underline cursor-pointer uppercase tracking-tighter">Cancellation Policy &rsaquo;</span>
            </div>
          </div>

          <div className="mb-8 p-4 bg-gray-50 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[13px] text-[#191974] font-bold">EMI Available</p>
                <span className="text-[12px] text-gray-400 border-b border-gray-300 hover:border-[#191974] cursor-pointer">Check eligibility &rsaquo;</span>
              </div>
              <div className="text-right">
                <p className="text-[15px] font-bold text-[#191974] leading-none mb-0.5">
                  {formatRegionalPrice(Math.round(price / 12), region)}
                </p>
                <span className="text-[11px] text-gray-400 font-bold">/ month</span>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mb-6 py-4 border-y border-gray-50">
            <div className="flex items-center justify-center gap-2 text-[13px] text-[#191974] font-bold">
              <span className="w-8 h-8 rounded-full bg-[#191974]/5 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </span>
              1800 313 5555
              <span className="text-gray-200 mx-1">|</span>
              <span className="text-[12px] hover:underline cursor-pointer">Locate nearest Madura Travel</span>
            </div>
          </div>

          {/* Book Online CTA */}
          <div className="pb-2">
            <button
              onClick={handleBookNow}
              className="w-full bg-[#ee2229] border-2 border-[#ee2229] text-white font-bold py-4 rounded-xl text-[14px] tracking-widest transition-all hover:bg-[#191974] hover:border-[#191974] active:scale-95 uppercase shadow-xl shadow-red-500/10"
            >
              Book Online
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
