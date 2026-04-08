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
    <div className="flex flex-col gap-10 font-arial">
      <div className="flex justify-between items-end border-b border-gray-100 pb-8">
        <h2 className="text-[26px] font-inter font-light text-[#191974] tracking-tight ">
          Tactical Itinerary <span className="text-gray-300 font-bold text-[14px] ml-4 tracking-widest">{itinerary.length} Phases</span>
        </h2>
        <div className="flex gap-6">
          <button onClick={expandAll} className="text-[#ee2229] font-black text-[11px] hover:text-[#191974] transition-colors  tracking-[0.2em] font-inter-tight">Expand All</button>
          <span className="text-gray-100 font-light">|</span>
          <button onClick={collapseAll} className="text-[#ee2229] font-black text-[11px] hover:text-[#191974] transition-colors  tracking-[0.2em] font-inter-tight">Collapse All</button>
        </div>
      </div>

      <div className="relative pl-12 space-y-8 before:content-[''] before:absolute before:left-[15px] before:top-4 before:bottom-4 before:w-[2px] before:bg-linear-to-b before:from-[#191974]/20 (3) before:via-[#ee2229]/20 before:to-[#191974]/20 before:opacity-30">
        {itinerary.map((item) => (
          <div key={item.day} className="relative group">
            {/* Timeline Dot */}
            <div className={cn(
              "absolute -left-[45px] top-4 w-7 h-7 rounded-full border-4 border-white shadow-xl z-10 transition-all duration-500",
              expandedDays.includes(item.day) ? "bg-[#ee2229] scale-110" : "bg-gray-100 group-hover:bg-[#191974]"
            )} />

            {/* Content Card */}
            <div className={cn(
              "bg-white rounded-3xl border transition-all duration-500 overflow-hidden",
              expandedDays.includes(item.day) ? "border-[#ee2229]/20 shadow-2xl" : "border-gray-50 shadow-sm hover:shadow-xl hover:border-gray-100"
            )}>
              <button
                onClick={() => toggleDay(item.day)}
                className="w-full flex items-center justify-between p-8 text-left bg-white transition-colors"
              >
                <div className="flex items-center gap-8">
                  <span className="text-[14px] font-black text-[#ee2229]  tracking-[0.3em] font-inter-tight whitespace-nowrap min-w-[70px]">Day {item.day}</span>
                  <h3 className="text-[20px] font-black text-[#191974] font-inter  tracking-tight leading-none">{item.title}</h3>
                </div>
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border border-gray-50 transition-all duration-500",
                  expandedDays.includes(item.day) ? "bg-[#191974] text-white rotate-180" : "text-gray-300"
                )}>
                  <ChevronDown className="w-5 h-5" strokeWidth={3} />
                </div>
              </button>

              <div className={cn(
                "transition-all duration-700 ease-in-out",
                expandedDays.includes(item.day) ? "max-h-[2000px] opacity-100 visible" : "max-h-0 opacity-0 invisible"
              )}>
                <div className="px-10 pb-10 pt-2 border-t border-gray-50">
                  <div className="text-[14px] text-gray-500 font-arial font-bold  tracking-tighter leading-relaxed mb-8 whitespace-pre-line opacity-80">
                    {item.description}
                  </div>

                  {item.meals && (
                    <div className="flex items-center gap-4 bg-[#191974]/5 px-6 py-4 rounded-2xl border border-[#191974]/10 shadow-inner">
                      <div className="w-8 h-8 rounded-full bg-[#191974] flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                      </div>
                      <span className="text-[11px] font-black text-[#191974]  tracking-[0.2em] opacity-40">Provisions:</span>
                      <span className="text-[14px] text-[#191974] font-black  tracking-tight">{item.meals}</span>
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
