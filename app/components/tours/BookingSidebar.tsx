"use client";

import React, { useState } from 'react';
import { cn } from '@/utils/cn';

interface BookingSidebarProps {
  price?: number;
  tourName: string;
  selectedCity?: string;
  selectedDate?: string;
  emiAmount?: string;
}

import { useBooking } from '@/app/components/BookingModal';

export default function BookingSidebar({ 
  price = 45000, 
  tourName, 
  selectedCity = "Mumbai", 
  selectedDate = "Select Date",
  emiAmount = "₹5,219"
}: BookingSidebarProps) {
  const { openBooking } = useBooking();
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enquiry for:', tourName, formData);
    alert('Thank you! Our travel expert will contact you within 24 hours.');
    setFormData({ fullName: '', mobileNo: '' });
  };

  const handleEnquire = () => {
    openBooking({
      packageName: `${selectedCity} to ${tourName} Enquiry`,
      discountedPrice: price.toString(),
      originalPrice: (price * 1.2).toString(),
    });
  };

  const handleBookNow = () => {
    openBooking({
      packageName: `${tourName} - ${selectedCity} Departure`,
      discountedPrice: price.toString(),
      originalPrice: (price * 1.2).toString(),
    });
  };

  return (
    <div className="flex flex-col gap-4 relative font-arial">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden sticky top-[94px]">
        <div className="p-5 border-b border-gray-50 bg-gray-50/30">
          <div className="flex items-center gap-2 text-[#191974]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1" />
            </svg>
            <h3 className="text-[14px] font-black uppercase tracking-widest font-inter">Booking Summary</h3>
          </div>
        </div>

        <div className="p-6">
          {/* Booking Summary Details */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-gray-400 font-medium">Dept. city</span>
              <span className="text-[#191974] font-black">{selectedCity}</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-gray-400 font-medium">Dept. date</span>
              <span className="text-[#191974] font-black">{selectedDate}</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-gray-400 font-medium">Travellers</span>
              <span className="text-gray-300 font-medium italic">0 Adult(s) | 0 Child | 0 Infant</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-gray-400 font-medium">Rooms</span>
              <span className="text-gray-300 font-medium italic">0 Room</span>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-200 pt-6 mb-6">
            <div className="flex justify-between items-end mb-1">
              <span className="text-[13px] text-gray-400 font-black uppercase">Basic Price</span>
              <span className="text-[24px] font-black text-[#191974] font-inter tracking-tighter leading-none">
                ₹{price.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between items-center text-[11px] text-[#191974] font-bold">
              <span className="hover:underline cursor-pointer flex items-center gap-1">View Pricing Table &rsaquo;</span>
              <span className="hover:underline cursor-pointer">Cancellation Policy &rsaquo;</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center">
               <div>
                 <p className="text-[12px] text-[#191974] font-black">EMI Available</p>
                 <span className="text-[11px] text-[#191974] border-b border-gray-400 hover:border-[#191974] cursor-pointer">Check eligibility &rsaquo;</span>
               </div>
               <div className="text-right">
                 <p className="text-[18px] font-black text-[#191974] leading-none mb-0.5">{emiAmount}</p>
                 <span className="text-[10px] text-gray-400 font-bold uppercase">/ month</span>
               </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-[14px] text-[#191974] font-black">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5.25V3h1.5v2.25H3zm13.125 15.625l-1.062 1.062-1.062-1.062 1.062-1.062 1.062 1.062zm-9.187 0l-1.062 1.062-1.062-1.062 1.062-1.062 1.062 1.062z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 18.75V21h1.5v-2.25H2.25zm19.5 0V21h-1.5v-2.25h1.5zM7.5 7.5h9v9h-9v-9zM3.75 3.75v16.5h16.5V3.75H3.75z" /></svg>
               1800 313 5555
               <span className="text-gray-200 mx-1">|</span>
               <span className="text-[11px] hover:underline cursor-pointer">Locate nearest brand</span>
            </div>
          </div>

          {/* Dual CTAs */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleEnquire}
              className="w-full bg-white border-2 border-[#191974] text-[#191974] font-black py-3.5 rounded-lg text-[13px] tracking-widest transition-all hover:bg-gray-50 active:scale-95 uppercase font-inter"
            >
              Enquire
            </button>
            <button 
              onClick={handleBookNow}
              className="w-full bg-[#ffcc00] border-2 border-[#ffcc00] text-[#191974] font-black py-3.5 rounded-lg text-[13px] tracking-widest transition-all hover:bg-[#ffbb00] active:scale-95 uppercase font-inter shadow-lg shadow-yellow-500/10"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
