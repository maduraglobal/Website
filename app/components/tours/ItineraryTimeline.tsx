"use client";

import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { ChevronDown } from 'lucide-react';

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
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);

  const toggleDay = (day: number) => {
    setExpandedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day) 
        : [...prev, day]
    );
  };

  const expandAll = () => setExpandedDays(itinerary.map(i => i.day));
  const collapseAll = () => setExpandedDays([]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[24px] font-black text-[#171717]">Itinerary <span className="text-gray-400 font-medium text-[16px]">({itinerary.length} Days)</span></h2>
        <div className="flex gap-4">
          <button onClick={expandAll} className="text-[#191974] font-bold text-[13px] hover:underline uppercase tracking-tight">Expand All</button>
          <span className="text-gray-300">|</span>
          <button onClick={collapseAll} className="text-[#191974] font-bold text-[13px] hover:underline uppercase tracking-tight">Collapse All</button>
        </div>
      </div>

      <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
        {itinerary.map((item) => (
          <div key={item.day} className="relative">
            {/* Timeline Dot */}
            <div className={cn(
              "absolute -left-[32px] top-0 w-6 h-6 rounded-full border-4 border-white shadow-sm z-10 transition-colors duration-300",
              expandedDays.includes(item.day) ? "bg-[#191974]" : "bg-gray-200"
            )} />

            {/* Content Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <button 
                onClick={() => toggleDay(item.day)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[14px] font-black text-[#191974] uppercase tracking-widest whitespace-nowrap">Day {item.day}</span>
                  <h3 className="text-[17px] font-bold text-[#171717] leading-tight">{item.title}</h3>
                </div>
                <ChevronDown className={cn(
                  "w-5 h-5 text-gray-400 transition-transform duration-300",
                  expandedDays.includes(item.day) ? "rotate-180" : ""
                )} />
              </button>

              <div className={cn(
                "transition-all duration-300 ease-in-out overflow-hidden",
                expandedDays.includes(item.day) ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              )}>
                <div className="px-6 pb-6 pt-2 border-t border-gray-50">
                  <div className="text-[15px] text-gray-600 leading-relaxed font-inter-tight mb-4 whitespace-pre-line">
                    {item.description}
                  </div>
                  
                  {item.meals && (
                    <div className="flex items-center gap-3 bg-orange-50 px-4 py-2 rounded-lg border border-orange-100/50">
                      <span className="text-[12px] font-black text-orange-800 uppercase tracking-wider">Meals:</span>
                      <span className="text-[13px] text-orange-700 font-bold">{item.meals}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
