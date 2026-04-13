"use client";
import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  // Track open days, default Day 1 as open [idx 0]
  const [expandedDays, setExpandedDays] = useState<number[]>([0]);

  const toggleDay = (idx: number) => {
    setExpandedDays(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const getDayDate = (dayIdx: number) => {
    const baseDate = 4;
    return `${baseDate + dayIdx < 10 ? '0' : ''}${baseDate + dayIdx} Jun, 26`;
  };

  return (
    <div className="flex flex-col gap-0 relative pl-4 lg:pl-0">
      {/* Vertical Line */}
      <div className="absolute left-[7px] top-6 bottom-6 w-[2px] bg-gray-100 z-0"></div>

      {itinerary.map((item, idx) => {
        const isExpanded = expandedDays.includes(idx);
        
        return (
          <div key={`${item.day || idx}-${idx}`} className="relative pb-6 group">
            {/* Timeline Dot */}
            <div className={cn(
              "absolute left-0 top-[8px] w-[16px] h-[16px] rounded-full border-2 border-white shadow-sm z-10 transition-all duration-300",
              isExpanded || idx === 0 ? "bg-[#191974]" : "bg-gray-200 group-hover:bg-[#191974]"
            )}></div>

            {/* Content Button (Header) */}
            <div 
              onClick={() => toggleDay(idx)}
              className="pl-8 cursor-pointer select-none group/header"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-[13px] text-gray-400 font-bold uppercase tracking-wider">
                    Day-{item.day || (idx + 1)} / {getDayDate(idx)}
                  </p>
                  <h4 className={cn(
                     "text-[16px] font-bold leading-tight transition-all",
                     isExpanded ? "text-[#191974]" : "text-gray-900 group-hover/header:text-[#191974]"
                  )}>
                    {item.title}
                  </h4>
                </div>
                <div className={cn(
                  "w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center transition-all duration-300 group-hover/header:bg-gray-100",
                  isExpanded && "rotate-180 bg-blue-50 text-[#191974]"
                )}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              {/* Expandable Content section */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-4 border-t border-gray-50 mt-4">
                      {item.description && (
                        <div className="text-[15px] text-gray-600 leading-relaxed max-w-2xl font-medium">
                          {item.description}
                        </div>
                      )}
                      
                      {item.meals && (
                        <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.15em] pt-5 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ee2229]"></span>
                          MEALS: <span className="text-gray-900">{item.meals}</span>
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}
