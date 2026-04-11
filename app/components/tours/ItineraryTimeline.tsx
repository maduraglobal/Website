"use client";
import React from 'react';
import { cn } from '@/utils/cn';
import { Dot } from 'lucide-react';

type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  meals?: string;
};

interface ItineraryTimelineProps {
  itinerary: ItineraryDay[];
}

export default function ItineraryTimeline({ itinerary }: ItineraryTimelineProps) {
  // Hardcoded dates for demo matching the image "04 Jun, 26"
  const getDayDate = (dayIdx: number) => {
    const baseDate = 4;
    return `${baseDate + dayIdx < 10 ? '0' : ''}${baseDate + dayIdx} Jun, 26`;
  };

  return (
    <div className="flex flex-col gap-0 relative pl-4 lg:pl-0">
      {/* Vertical Line */}
      <div className="absolute left-[7px] top-6 bottom-6 w-[2px] bg-gray-100 z-0"></div>

      {itinerary.map((item, idx) => (
        <div key={item.day} className="relative pb-10 group">
          {/* Timeline Dot */}
          <div className={cn(
            "absolute left-0 top-[6px] w-[16px] h-[16px] rounded-full border-2 border-white shadow-sm z-10 transition-all duration-300",
            idx === 0 ? "bg-[#191974]" : "bg-gray-200 group-hover:bg-[#191974]"
          )}></div>

          {/* Content */}
          <div className="pl-8 space-y-1">
            <p className="text-[13px] text-gray-500 font-medium">
              Day {item.day} / {getDayDate(idx)}
            </p>
            <h4 className={cn(
               "text-[16px] font-bold leading-tight group-hover:underline transition-all cursor-pointer",
               idx === 0 ? "text-[#191974]" : "text-gray-900"
            )}>
              {item.title}
            </h4>
            
            {item.description && (
              <div className="pt-3 pb-2 text-[14px] text-gray-600 leading-relaxed max-w-2xl">
                {item.description}
              </div>
            )}
            
            {item.meals && (
              <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest pt-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ee2229]"></span>
                Meals: <span className="text-gray-900">{item.meals}</span>
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
