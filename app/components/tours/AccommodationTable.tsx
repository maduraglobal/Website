"use client";

import React from 'react';
import { Calendar } from 'lucide-react';

export default function AccommodationTable() {
  const displayData = [
    { city: "Halong - Vietnam", hotel: "Ha Long New Day Hotel / or similar", checkIn: "04 Jun - 05 Jun" },
    { city: "Hanoi - Vietnam", hotel: "hoa binh hotel hanoi / or similar", checkIn: "05 Jun - 06 Jun" },
    { city: "Da Nang - Vietnam", hotel: "Royal Lotus Hotel Danang / or similar", checkIn: "06 Jun - 08 Jun" },
  ];

  return (
    <div className="overflow-hidden space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-[13px] uppercase tracking-wider">
              <th className="px-2 py-4 font-bold">City - Country</th>
              <th className="px-2 py-4 font-bold">Hotel</th>
              <th className="px-2 py-4 font-bold text-right">Check In - Check Out</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {displayData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-2 py-6 text-[14px] font-bold text-gray-800">{item.city}</td>
                <td className="px-2 py-6 text-[14px] text-gray-600 font-medium">{item.hotel}</td>
                <td className="px-2 py-6 text-[14px] text-gray-800 font-bold text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Calendar className="w-4 h-4 text-gray-300" />
                    {item.checkIn}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-[12px] text-gray-400 space-y-1 pt-4 border-t border-gray-50  tracking-widest font-bold">
        <p>Note:</p>
        <p>• Flight details are tentative only. The airline, departure, arrival times and routing may change.</p>
        <p>• Hotel details are tentative only. The hotel or place of accommodation may change.</p>
      </div>
    </div>
  );
}
