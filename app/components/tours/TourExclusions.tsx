"use client";
import React from 'react';

export default function TourExclusions() {
  const exclusions = [
    "Government Service Tax (GST) & TCS as applicable",
    "Any increase in Airfare, Visa fees, Airport taxes, Fuel surcharge etc.",
    "Cost of any optional tours",
    "Cost of any personal expenses such as laundry, phone calls, beverages, etc.",
    "Any meals not mentioned in the itinerary",
    "Extra baggage charges",
    "Anything not specifically mentioned in the 'Tour Inclusions' section"
  ];

  return (
    <ul className="space-y-4">
      {exclusions.map((item, index) => (
        <li key={index} className="flex items-start gap-4">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-2"></div>
          <span className="text-[14px] text-gray-700 leading-relaxed font-medium">{item}</span>
        </li>
      ))}
    </ul>
  );
}
