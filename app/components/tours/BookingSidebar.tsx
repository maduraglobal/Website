"use client";

import React, { useState } from 'react';
import { cn } from '@/utils/cn';

interface BookingSidebarProps {
  price?: number;
  tourName: string;
  selectedCity?: string;
  selectedDate?: string;
  emiAmount?: string;
  region?: string;
  travellerCount?: { adults: number; children: number; infants: number };
}

import { useBooking } from '@/app/components/BookingModal';
import { formatRegionalPrice } from '@/config/country';

export default function BookingSidebar({
  price = 45000,
  tourName,
  selectedCity = "Mumbai",
  selectedDate = "Select Date",
  emiAmount = "₹3,750",
  region = "en-in",
  travellerCount = { adults: 1, children: 0, infants: 0 }
}: BookingSidebarProps) {
  const { openBooking } = useBooking();

  const handleEnquire = () => {
    openBooking({
      packageName: `Enquiry: ${tourName} (${selectedCity})`,
      discountedPrice: '0',
      originalPrice: '0',
    });
  };

  const handleBookNow = () => {
    openBooking({
      packageName: `${tourName}`,
      discountedPrice: price.toString(),
      originalPrice: (price * 1.15).toString(),
    });
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
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-gray-400 font-medium tracking-tight">Dept. city</span>
              <span className="text-gray-900 font-bold">{selectedCity}</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-gray-400 font-medium tracking-tight">Dept. date</span>
              <span className="text-gray-900 font-bold">{selectedDate}</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-gray-400 font-medium tracking-tight">Travellers</span>
              <span className="text-[#191974] font-bold">
                {travellerCount.adults} Adult(s) | {travellerCount.children} Child | {travellerCount.infants} Infant
              </span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-gray-400 font-medium tracking-tight">Rooms</span>
              <span className="text-[#191974] font-bold">{Math.ceil(travellerCount.adults / 2)} Room(s)</span>
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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5.25V3h1.5v2.25H3zm13.125 15.625l-1.062 1.062-1.062-1.062 1.062-1.062 1.062 1.062zm-9.187 0l-1.062 1.062-1.062-1.062 1.062-1.062 1.062 1.062z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 18.75V21h1.5v-2.25H2.25zm19.5 0V21h-1.5v-2.25h1.5zM7.5 7.5h9v9h-9v-9zM3.75 3.75v16.5h16.5V3.75H3.75z" /></svg>
              </span>
              1800 313 5555
              <span className="text-gray-200 mx-1">|</span>
              <span className="text-[12px] hover:underline cursor-pointer">Locate nearest Madura Travel</span>
            </div>
          </div>

          {/* Dual CTAs */}
          <div className="grid grid-cols-2 gap-3 pb-2">
            <button
              onClick={handleEnquire}
              className="w-full bg-white border-2 border-[#191974] text-[#191974] font-bold py-4 rounded-xl text-[12px] tracking-widest transition-all hover:bg-gray-50 active:scale-95 uppercase"
            >
              Enquire Now
            </button>
            <button
              onClick={handleBookNow}
              className="w-full bg-[#191974] border-2 border-[#191974] text-white font-bold py-4 rounded-xl text-[12px] tracking-widest transition-all hover:bg-[#ee2229] hover:border-[#ee2229] active:scale-95 uppercase shadow-xl shadow-blue-500/10"
            >
              Book Online
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
