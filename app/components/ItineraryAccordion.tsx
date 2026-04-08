"use client";

import React, { useState } from 'react';

type ItineraryDay = {
  day: number;
  title: string;
  description: string;
};

export default function ItineraryAccordion({ itinerary }: { itinerary: ItineraryDay[] }) {
  const [openDay, setOpenDay] = useState<number | null>(1);

  const toggleDay = (day: number) => {
    setOpenDay(openDay === day ? null : day);
  };

  return (
    <div className="flex flex-col gap-4">
      {itinerary.map((item) => (
        <div key={item.day} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all">
          <button
            onClick={() => toggleDay(item.day)}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
          >
            <div className="flex items-center gap-4">
              <span className="bg-[#191974] text-white text-[12px] font-bold px-3 py-1 rounded-full  tracking-wide shrink-0">
                Day {item.day}
              </span>
              <span className="font-bold font-inter text-[16px] text-[#171717]">{item.title}</span>
            </div>
            <svg
              className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openDay === item.day ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${openDay === item.day ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <div className="p-5 text-[14px] text-gray-600 font-inter-tight leading-relaxed border-t border-gray-100 bg-white">
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
