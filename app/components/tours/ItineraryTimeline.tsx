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
    <div className="flex flex-col gap-4 ">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <h3 className="text-[14px]  text-gray-300 tracking-widest uppercase">
          {itinerary.length} Phases
        </h3>
        <div className="flex gap-4">
          <button onClick={expandAll} className="text-[#ee2229]  text-[10px] hover:text-[#191974] transition-colors tracking-widest uppercase">Expand All</button>
          <span className="text-gray-100 font-light">|</span>
          <button onClick={collapseAll} className="text-[#ee2229]  text-[10px] hover:text-[#191974] transition-colors tracking-widest uppercase">Collapse All</button>
        </div>
      </div>

      <div className="relative pl-10 space-y-0 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
        {itinerary.map((item) => (
          <div key={item.day} className="relative">
            {/* Timeline Dot */}
            <div className={cn(
              "absolute -left-[35px] top-4 w-[16px] h-[16px] rounded-full border-[3px] border-white shadow-sm z-10 transition-all duration-300",
              expandedDays.includes(item.day) ? "bg-[#ee2229] scale-110" : "bg-gray-300"
            )} />

            {/* Content Item */}
            <div className={cn(
              "transition-all duration-300 border-b border-gray-50 last:border-0",
              expandedDays.includes(item.day) ? "bg-gray-50/30" : "bg-transparent"
            )}>
              <button
                onClick={() => toggleDay(item.day)}
                className="w-full flex items-center justify-between py-4 pr-4 text-left hover:bg-gray-50/80 transition-colors group"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-[11px]  text-[#ee2229] uppercase tracking-widest whitespace-nowrap opacity-80">Day {item.day}</span>
                  <h4 className="text-[16px]  text-[#191974] tracking-tight leading-tight group-hover:text-[#ee2229] transition-colors">{item.title}</h4>
                </div>
                <div className={cn(
                  "shrink-0 transition-all",
                  expandedDays.includes(item.day) ? "text-[#ee2229] rotate-180" : "text-gray-400"
                )}>
                  <ChevronDown className="w-4 h-4" strokeWidth={3} />
                </div>
              </button>

              <div className={cn(
                "transition-all duration-300 overflow-hidden",
                expandedDays.includes(item.day) ? "max-h-[1500px] opacity-100" : "max-h-0 opacity-0"
              )}>
                <div className="pb-6 pr-6">
                  <div className="text-[14px] text-gray-600 font-medium leading-relaxed mb-4 whitespace-pre-line">
                    {item.description}
                  </div>

                  {item.meals && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Utensils className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-bold uppercase tracking-widest mr-1">Meals:</span>
                      <span className="text-[12px] text-gray-600 font-bold">{item.meals}</span>
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
