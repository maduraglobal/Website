"use client";

import React from 'react';
import { Plane, ArrowRight } from 'lucide-react';

export default function FlightDetailsTable() {
  const flights = [
    {
      airline: "Indigo",
      flightNo: "6E-1201",
      from: "Mumbai (BOM)",
      to: "Hanoi (HAN)",
      departure: "04 Jun, 07:30",
      arrival: "04 Jun, 13:15",
    },
    {
      airline: "VietJet Air",
      flightNo: "VJ-322",
      from: "Hanoi (HAN)",
      to: "Da Nang (DAD)",
      departure: "06 Jun, 10:00",
      arrival: "06 Jun, 11:15",
    },
    {
      airline: "Indigo",
      flightNo: "6E-1202",
      from: "Da Nang (DAD)",
      to: "Mumbai (BOM)",
      departure: "08 Jun, 18:45",
      arrival: "08 Jun, 23:30",
    }
  ];

  return (
    <div className="overflow-hidden space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-[13px] uppercase tracking-wider">
              <th className="px-2 py-4 font-bold">Airline</th>
              <th className="px-2 py-4 font-bold">From -{'>'} To</th>
              <th className="px-2 py-4 font-bold text-right">Departure / Arrival</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {flights.map((flight, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-2 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                      <Plane className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-gray-800">{flight.airline}</p>
                      <p className="text-[12px] text-gray-400 font-medium">{flight.flightNo}</p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-6">
                  <div className="flex items-center gap-3 text-[14px] font-bold text-gray-700">
                    <span>{flight.from}</span>
                    <ArrowRight className="w-4 h-4 text-gray-300" />
                    <span>{flight.to}</span>
                  </div>
                </td>
                <td className="px-2 py-6 text-right">
                  <div className="space-y-1">
                    <p className="text-[14px] font-bold text-gray-800">{flight.departure}</p>
                    <p className="text-[12px] text-gray-400 font-medium">Arrival: {flight.arrival}</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-[12px] text-gray-400 space-y-1 pt-4 border-t border-gray-50 tracking-widest font-bold">
        <p>Note:</p>
        <p>• Flight details are tentative only. The airline, departure, arrival times and routing may change.</p>
        <p>• Baggage allowance is as per airline policy.</p>
      </div>
    </div>
  );
}
