"use client";

import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { ChevronDown, Utensils } from 'lucide-react';

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
    <div className="flex flex-col gap-4 font-arial">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <h3 className="text-[14px] font-black text-gray-300 tracking-widest uppercase">
          {itinerary.length} Phases
        </h3>
        <div className="flex gap-4">
          <button onClick={expandAll} className="text-[#ee2229] font-black text-[10px] hover:text-[#191974] transition-colors tracking-widest uppercase">Expand All</button>
          <span className="text-gray-100 font-light">|</span>
          <button onClick={collapseAll} className="text-[#ee2229] font-black text-[10px] hover:text-[#191974] transition-colors tracking-widest uppercase">Collapse All</button>
        </div>
      </div>

      <div className="relative pl-8 space-y-3 before:content-[''] before:absolute before:left-[10px] before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
        {itinerary.map((item) => (
          <div key={item.day} className="relative group">
            {/* Timeline Dot */}
            <div className={cn(
              "absolute -left-[32px] top-4 w-4 h-4 rounded-full border-2 border-white shadow-md z-10 transition-all duration-300",
              expandedDays.includes(item.day) ? "bg-[#ee2229]" : "bg-gray-200"
            )} />

            {/* Content Card */}
            <div className={cn(
              "bg-white rounded-xl border transition-all duration-300 overflow-hidden",
              expandedDays.includes(item.day) ? "border-[#191974]/10 shadow-md" : "border-gray-100 shadow-sm"
            )}>
              <button
                onClick={() => toggleDay(item.day)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-center gap-5">
                  <span className="text-[12px] font-black text-[#ee2229] tracking-tighter whitespace-nowrap">Day {item.day}</span>
                  <h4 className="text-[16px] font-black text-[#191974] font-inter tracking-tight leading-tight">{item.title}</h4>
                </div>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                  expandedDays.includes(item.day) ? "text-[#191974] rotate-180" : "text-gray-300"
                )}>
                  <ChevronDown className="w-4 h-4" strokeWidth={3} />
                </div>
              </button>

              <div className={cn(
                "transition-all duration-300 overflow-hidden",
                expandedDays.includes(item.day) ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
              )}>
                <div className="px-6 pb-6 pt-2 border-t border-gray-50">
                  <div className="text-[13px] text-gray-500 font-bold tracking-tight leading-relaxed mb-6 whitespace-pre-line opacity-80">
                    {item.description}
                  </div>

                  {item.meals && (
                    <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                      <Utensils className="w-4 h-4 text-[#191974] opacity-40" />
                      <span className="text-[11px] font-black text-[#191974] tracking-widest uppercase opacity-40">Meals:</span>
                      <span className="text-[12px] text-[#191974] font-bold">{item.meals}</span>
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
