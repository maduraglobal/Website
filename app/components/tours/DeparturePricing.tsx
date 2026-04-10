"use client";

import React, { useState } from 'react';
import { cn } from "@/utils/cn";
import { Check, Info, TrendingDown } from "lucide-react";

interface DepartureDate {
  id: string;
  date: string;
  day: string;
  month: string;
  year: string;
  price: number;
  savings: number;
  isLowest?: boolean;
}

interface DeparturePricingProps {
  cities: string[];
  dates: Record<string, DepartureDate[]>;
  selectedCity: string;
  selectedDateId: string;
  onCityChange: (city: string) => void;
  onDateChange: (dateId: string) => void;
}

export default function DeparturePricing({
  cities,
  dates,
  selectedCity,
  selectedDateId,
  onCityChange,
  onDateChange
}: DeparturePricingProps) {
  const currentDates = dates[selectedCity] || [];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-50">
        <p className="text-[26px]  text-[#191974] mb-1">Select Departure City & Date</p>
        <p className="text-gray-400 text-[13px] font-medium ">As seats fill, prices increase! Book your tour today.</p>
      </div>

      <div className="p-4 space-y-6">
        {/* City Selection */}
        <div className="space-y-4">
          <p className="text-[#191974] text-[14px] ">Choose Departure City</p>
          <div className="flex flex-wrap gap-3">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => onCityChange(city)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-[13px] font-bold transition-all border",
                  selectedCity === city
                    ? "bg-[#191974] text-white border-[#191974] shadow-md shadow-blue-900/10"
                    : "bg-white text-gray-500 border-gray-200 hover:border-[#191974]/30"
                )}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Date Selection Grid */}
        <div className="space-y-4">
          <p className="text-[#191974] text-[14px]  flex items-center gap-2">
            Available Dates
            <span className="text-[11px] font-bold bg-blue-50 text-[#191974] px-2 py-0.5 rounded border border-blue-100 normal-case tracking-normal">Early Payment, Extra Savings!</span>
          </p>

          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
            {currentDates.map((d) => (
              <button
                key={d.id}
                onClick={() => onDateChange(d.id)}
                className={cn(
                  "relative flex shrink-0 w-50 rounded-xl border-2 transition-all p-0 overflow-hidden group",
                  selectedDateId === d.id
                    ? "border-[#191974] bg-[#191974]/5 shadow-lg shadow-blue-500/5"
                    : "border-gray-100 hover:border-gray-200 bg-white"
                )}
              >
                {/* Month/Year Side Strip */}
                <div className={cn(
                  "w-10 shrink-0 flex flex-col items-center justify-center p-2 text-[10px]  uppercase tracking-tighter border-r",
                  selectedDateId === d.id ? "bg-[#191974] text-white border-[#191974]" : "bg-gray-100 text-gray-400 border-gray-100"
                )}>
                  <span className="rotate-270 whitespace-nowrap">{d.month} {d.year}</span>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-3 text-left flex flex-col justify-between h-full min-h-27.5">
                  <div>
                    <p className={cn(
                      "text-[10px]  mb-0.5",
                      selectedDateId === d.id ? "text-[#191974]" : "text-gray-400"
                    )}>{d.day}</p>
                    <p className="text-2xl  text-[#191974] leading-none mb-2">{d.date}</p>
                    <p className="text-[16px]  text-[#191974]">{d.price.toLocaleString('en-IN')}</p>
                  </div>

                  {d.savings > 0 && (
                    <div className="mt-2 bg-amber-50 text-amber-600 text-[10px] font-bold px-2 py-1 rounded border border-amber-100 flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      Save â‚¹{d.savings.toLocaleString('en-IN')}
                    </div>
                  )}

                  {d.isLowest && (
                    <div className="absolute top-2 right-2 flex items-center justify-center h-4 px-1.5 bg-[#ee2229] text-white text-[8px]  rounded-sm uppercase tracking-tighter">
                      Lowest
                    </div>
                  )}

                  {selectedDateId === d.id && (
                    <div className="absolute top-2 right-2 text-[#191974]">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl flex items-start gap-3">
            <div className="mt-0.5"><Info className="w-4 h-4 text-orange-500" /></div>
            <p className="text-[12px] text-orange-700 leading-relaxed">
              <span>Save Up To â‚¹15,000</span> With Full Payment Between 180 - 209 Days Before Departure.
              Only one available date left for this route!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
