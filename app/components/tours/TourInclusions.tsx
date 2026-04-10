"use client";
import React from 'react';

export default function TourInclusions() {
  const inclusions = [
    "To and fro economy class air travel for 'Mumbai to Mumbai Tour' guests as mentioned in the itinerary",
    "Airfare, Airport taxes and Visa Fees",
    "Baggage Allowance as per the airline policy",
    "Tour Manager Services throughout the tour",
    "Travel by comfortable A/C coach as per the tour itinerary",
    "Entrance fees of all sightseeing places to be visited from inside",
    "Accommodation in comfortable and convenient hotels on twin sharing basis",
    "All Meals – Breakfast, Lunch, Dinner (set menu) as mentioned in the itinerary",
    "All Tips – Guide, Driver & Restaurants",
    "Cost of internal airfare as mentioned in the itinerary",
    "Complimentary insurance up to 59 years of age"
  ];

  return (
    <ul className="space-y-4">
      {inclusions.map((item, index) => (
        <li key={index} className="flex items-start gap-4">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0 mt-2"></div>
          <span className="text-[14px] text-gray-700 leading-relaxed font-medium">{item}</span>
        </li>
      ))}
    </ul>
  );
}
