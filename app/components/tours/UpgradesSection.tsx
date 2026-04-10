"use client";
import React from 'react';
import { Plane, Bed, Star, Zap, Check, ArrowRight } from 'lucide-react';

const UPGRADES = [
  {
    title: "Premium Economy / Business Class",
    description: "Upgrade your travel experience with extra legroom, premium meals, and priority boarding.",
    price: "From ₹45,000",
    icon: Plane,
    color: "blue"
  },
  {
    title: "Single Room Supplement",
    description: "Prefer your own private space? Upgrade to a single occupancy room throughout the tour.",
    price: "From ₹32,000",
    icon: Bed,
    color: "purple"
  },
  {
    title: "4-Star to 5-Star Hotel Upgrade",
    description: "Indulge in luxury with hand-picked 5-star properties in key cities on your itinerary.",
    price: "From ₹18,500",
    icon: Star,
    color: "orange"
  },
  {
    title: "Private Airport Transfers",
    description: "Skip the group coach and enjoy private, premium car transfers on arrival and departure.",
    price: "From ₹4,500",
    icon: Zap,
    color: "green"
  }
];

export default function UpgradesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {UPGRADES.map((upgrade, index) => (
        <div 
          key={index} 
          className="group bg-white rounded-2xl border border-gray-100 p-6 flex items-start gap-4 hover:border-[#191974] hover:shadow-xl transition-all cursor-pointer relative overflow-hidden"
        >
          {/* Decorative background element */}
          <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-5 rounded-full bg-${upgrade.color}-500 group-hover:scale-150 transition-transform duration-500`} />
          
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm
            ${upgrade.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
              upgrade.color === 'purple' ? 'bg-purple-50 text-purple-600' : 
              upgrade.color === 'orange' ? 'bg-orange-50 text-orange-600' : 
              'bg-green-50 text-green-600'}`}
          >
            <upgrade.icon className="w-6 h-6" />
          </div>
          
          <div className="space-y-2 flex-1 relative z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-bold text-gray-900 group-hover:text-[#191974] transition-colors">{upgrade.title}</h3>
              <Check className="w-4 h-4 text-gray-200 group-hover:text-[#ee2229] transition-colors" />
            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors">
              {upgrade.description}
            </p>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[14px] font-bold text-[#191974]">{upgrade.price}</span>
              <button className="flex items-center gap-1 text-[12px] font-bold text-[#ee2229] opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                ADD <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ))}
      
      <div className="md:col-span-2 p-5 bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center space-y-2">
        <p className="text-[13px] text-gray-500 font-medium">Looking for something more specific?</p>
        <button className="text-[#191974] font-bold text-[14px] hover:underline flex items-center gap-1">
          Talk to our upgrade experts <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
