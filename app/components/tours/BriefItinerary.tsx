"use client";

import React from 'react';
import { MapPin, ChevronRight, Circle } from 'lucide-react';

interface BriefItineraryProps {
  cities: string[];
}

export default function BriefItinerary({ cities }: BriefItineraryProps) {
  return (
    <div className="w-full bg-white border-y border-gray-100 py-6 overflow-hidden">
      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth px-2">
        {cities.map((city, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center min-w-max group cursor-default">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-500 ${idx === 0 || idx === cities.length - 1 ? 'bg-[#ee2229] border-[#ee2229] scale-110 shadow-[0_0_10px_rgba(238,34,41,0.4)]' : 'bg-white border-gray-300 group-hover:border-[#191974]'}`} />
                  {idx === 0 && <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-[#ee2229] tracking-widest whitespace-nowrap">START</span>}
                  {idx === cities.length - 1 && <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-[#ee2229] tracking-widest whitespace-nowrap">END</span>}
                </div>
                <span className={`text-[13px] font-bold tracking-tight transition-colors ${idx === 0 || idx === cities.length - 1 ? 'text-[#191974]' : 'text-gray-400 group-hover:text-[#191974]'}`}>
                  {city.trim()}
                </span>
              </div>
            </div>
            {idx < cities.length - 1 && (
              <div className="flex items-center gap-1 opacity-20">
                <div className="w-8 h-[1px] bg-[#191974]" />
                <ChevronRight className="w-3 h-3 text-[#191974]" />
                <div className="w-8 h-[1px] bg-[#191974]" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
