"use client";

import React from 'react';

type Accommodation = {
  city: string;
  hotel: string;
  nights: number;
};

interface AccommodationTableProps {
  accommodations?: Accommodation[];
}

export default function AccommodationTable({ accommodations }: AccommodationTableProps) {
  // Fallback data if none provided (for demo/missing data)
  const displayData = accommodations || [
    { city: "Cochin", hotel: "Quality Airport Hotel or similar", nights: 1 },
    { city: "Munnar", hotel: "Elephant Passage or similar", nights: 2 },
    { city: "Thekkady", hotel: "Greenwoods Resort or similar", nights: 1 },
    { city: "Alleppey", hotel: "Premium Houseboat", nights: 1 },
  ];

  return (
    <div className="overflow-hidden border border-gray-100 rounded-3xl bg-white shadow-2xl ">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#191974] text-white">
          <tr>
            <th className="px-6 py-3  text-[11px]  tracking-[0.2em] opacity-80">Designated City</th>
            <th className="px-6 py-3  text-[11px]  tracking-[0.2em] opacity-80">Accommodations Selection</th>
            <th className="px-6 py-3  text-[11px]  tracking-[0.2em] opacity-80 text-center">Nights</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {displayData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4  text-[#191974] text-[16px]  tracking-tight">{item.city}</td>
              <td className="px-6 py-4 text-gray-500 text-[14px] font-bold  tracking-tighter opacity-70">{item.hotel}</td>
              <td className="px-6 py-4 text-[#191974] text-[14px] text-center  bg-[#191974]/5">{item.nights}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#ee2229] flex items-center justify-center shrink-0 shadow-lg shadow-red-500/20">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-[11px] text-[#191974]   tracking-widest opacity-40 leading-relaxed">
          Operational Standards: Check-in / Check-out timing is governed by Hotel Policy. Preferred selections are subject to availability and may be substituted with equivalents.
        </p>
      </div>
    </div>
  );
}
