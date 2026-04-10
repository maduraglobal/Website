"use client";
import React from 'react';
import { Building2, Utensils, Plane, Camera, Bus, FileCheck2 } from 'lucide-react';

const inclusions = [
  { icon: Building2, label: 'Hotel' },
  { icon: Utensils, label: 'Meals' },
  { icon: Plane, label: 'Flight' },
  { icon: Camera, label: 'Sightseeing' },
  { icon: Bus, label: 'Transport' },
];

export default function TourInclusions({ className = "", variant = "small" }: { className?: string, variant?: "small" | "large" }) {
  const isLarge = variant === "large";

  return (
    <div className={`space-y-3 ${className}`}>
      <p className={`${isLarge ? 'text-[26px]' : 'text-[11px] uppercase tracking-wider font-bold'} text-[#191974] mb-1`}>
        Tour Includes
      </p>
      <div className={`flex items-center ${isLarge ? 'gap-8 overflow-x-auto no-scrollbar pb-2' : 'gap-2.5 flex-wrap md:flex-nowrap'}`}>
        {inclusions.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1.5 group/icon shrink-0 cursor-default">
            <div className={`${isLarge ? 'w-16 h-16' : 'w-10 h-10'} rounded-xl bg-white flex items-center justify-center p-2.5 border border-gray-200 group-hover/icon:border-[#191974] group-hover/icon:bg-[#191974] transition-all duration-300 shadow-sm`}>
              <item.icon className={`w-full h-full text-[#191974] group-hover/icon:text-white ${isLarge ? 'stroke-[1.5]' : 'stroke-[1.8]'} transition-colors duration-300`} />
            </div>
            <span className={`${isLarge ? 'text-[14px]' : 'text-[9px]'} text-gray-500 font-bold tracking-tight text-center leading-none group-hover/icon:text-[#191974] transition-colors`}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
