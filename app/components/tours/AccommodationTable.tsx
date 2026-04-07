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
    <div className="overflow-hidden border border-gray-200 rounded-xl bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 font-bold text-[#191974] text-[14px] uppercase tracking-wider">City</th>
            <th className="px-6 py-4 font-bold text-[#191974] text-[14px] uppercase tracking-wider">Hotel Name</th>
            <th className="px-6 py-4 font-bold text-[#191974] text-[14px] uppercase tracking-wider text-center">Nights</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {displayData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-bold text-[#171717] text-[15px]">{item.city}</td>
              <td className="px-6 py-4 text-gray-600 text-[14px]">{item.hotel}</td>
              <td className="px-6 py-4 text-gray-600 text-[14px] text-center font-medium bg-gray-50/50">{item.nights}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="p-4 bg-blue-50 border-t border-blue-100">
        <p className="text-[12px] text-blue-800 flex items-start gap-2">
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Note: Check-in / Check-out time is as per Hotel Policy. Hotel names are subject to change depending on availability.
        </p>
      </div>
    </div>
  );
}
