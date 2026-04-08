"use client";

import React, { useState } from 'react';
import { Search, ChevronDown, Calendar, SlidersHorizontal, MapPin } from 'lucide-react';

export default function FiltersSidebar() {
  const [isExpanded, setIsExpanded] = useState({
    cities: true,
    duration: true,
    specialty: true
  });

  const toggleSection = (section: keyof typeof isExpanded) => {
    setIsExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <h3 className="text-[18px] font-black text-[#191974] flex items-center gap-2  tracking-tight font-inter">
          <SlidersHorizontal className="w-5 h-5 text-[#ee2229]" /> Filters
        </h3>
        <button className="text-[13px] font-bold text-[#ee2229] hover:underline  tracking-tighter font-inter-tight">Clear All</button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search packages..."
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[14px] font-arial focus:outline-none focus:ring-2 focus:ring-[#191974]/20 focus:border-[#191974] transition-all"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
      </div>

      <div className="space-y-6">
        {/* Date Range */}
        <div className="space-y-3">
          <label className="text-[14px] font-black text-[#191974] block  tracking-tight font-inter">Travel Dates</label>
          <div className="relative">
            <input
              type="month"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[14px] font-arial text-gray-700 focus:outline-none focus:border-[#191974]"
            />
            <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Cities */}
        <div className="border-t border-gray-100 pt-6">
          <button
            onClick={() => toggleSection('cities')}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="text-[14px] font-black text-[#191974]  tracking-tight font-inter">Cities</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded.cities ? 'rotate-180' : ''}`} />
          </button>

          {isExpanded.cities && (
            <div className="mt-4 space-y-3">
              {['Delhi', 'Agra', 'Jaipur', 'Shimla', 'Manali'].map((city) => (
                <label key={city} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input type="checkbox" className="peer w-5 h-5 appearance-none border border-gray-300 rounded checked:bg-[#191974] checked:border-[#191974] transition-all cursor-pointer" />
                    <svg className="absolute w-3 h-3 text-white left-1 top-1 opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[14px] text-gray-600 font-arial group-hover:text-[#191974] transition-colors">{city}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Duration */}
        <div className="border-t border-gray-100 pt-6">
          <button
            onClick={() => toggleSection('duration')}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="text-[14px] font-black text-[#191974]  tracking-tight font-inter">Tour Duration</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded.duration ? 'rotate-180' : ''}`} />
          </button>

          {isExpanded.duration && (
            <div className="mt-4 flex flex-wrap gap-2">
              {['1-3 Days', '4-6 Days', '7-10 Days', '11+ Days'].map((duration) => (
                <button key={duration} className="px-3 py-2 text-[12px] font-black border border-gray-200 text-gray-600 rounded-lg hover:border-[#191974] hover:bg-[#191974]/5 transition-all font-inter  tracking-tighter">
                  {duration}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Specialty */}
        <div className="border-t border-gray-100 pt-6">
          <button
            onClick={() => toggleSection('specialty')}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="text-[14px] font-black text-[#191974]  tracking-tight font-inter">Specialty Tour</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded.specialty ? 'rotate-180' : ''}`} />
          </button>

          {isExpanded.specialty && (
            <div className="mt-4 space-y-3">
              {['Family', 'Honeymoon', 'Group Tour', 'Adventure', 'Luxury'].map((specialty) => (
                <label key={specialty} className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" name="specialty" className="w-5 h-5 text-[#191974] focus:ring-[#191974] border-gray-300 cursor-pointer" />
                  <span className="text-[14px] text-gray-600 font-arial group-hover:text-[#191974] transition-colors">{specialty}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
