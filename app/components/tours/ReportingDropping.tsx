"use client";

import React from 'react';
import { MapPin, Clock } from 'lucide-react';

export default function ReportingDropping() {
  const reporting = [
    {
      type: "Reporting",
      location: "Chhatrapati Shivaji Maharaj International Airport - Terminal 2",
      city: "Mumbai",
      time: "04 Jun, 04:30 AM",
      description: "Please report at the airline check-in counter. Our tour manager will meet you there."
    },
    {
      type: "Dropping",
      location: "Chhatrapati Shivaji Maharaj International Airport - Terminal 2",
      city: "Mumbai",
      time: "08 Jun, 11:30 PM",
      description: "The tour ends upon arrival at Mumbai airport."
    }
  ];

  return (
    <div className="space-y-8">
      {reporting.map((item, index) => (
        <div key={index} className="flex gap-6 p-6 rounded-2xl border border-gray-100 bg-gray-50/30">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.type === 'Reporting' ? 'bg-[#191974] text-white' : 'bg-[#ee2229] text-white'}`}>
            <MapPin className="w-6 h-6" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h3 className="text-[16px] font-bold text-gray-900">{item.type} Details</h3>
              <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase ${item.type === 'Reporting' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {item.type}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-[14px] font-bold text-gray-800 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-300" />
                {item.location}, {item.city}
              </p>
              <p className="text-[14px] font-bold text-[#ee2229] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#ee2229]/30" />
                {item.time}
              </p>
              <p className="text-[13px] text-gray-500 leading-relaxed pt-2 border-t border-gray-100">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="text-[12px] text-gray-400 space-y-1 pt-4 border-t border-gray-50 tracking-widest font-bold uppercase">
        <p>Note:</p>
        <p>• Reporting time is usually 3-4 hours prior to flight departure.</p>
        <p>• Dropping time depends on flight arrival and immigration procedures.</p>
      </div>
    </div>
  );
}
