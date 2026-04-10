"use client";

import React from 'react';
import { MapPin, Navigation, Compass } from 'lucide-react';

interface TourMapProps {
  tourTitle: string;
}

export default function TourMap({ tourTitle }: TourMapProps) {
  return (
    <div className="relative w-full rounded-[32px] overflow-hidden bg-gray-50 border border-gray-100 shadow-sm aspect-16/9 md:aspect-21/9 group">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#191974 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
      
      {/* Map Illustration Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-4xl mx-auto p-12">
           {/* Abstract Route Path */}
           <svg viewBox="0 0 800 400" className="w-full h-full text-gray-200">
             <path 
                d="M100,200 Q200,100 300,250 T500,150 T700,200" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeDasharray="8 8" 
             />
             <circle cx="100" cy="200" r="12" className="text-[#ee2229] fill-[#ee2229] animate-pulse" />
             <circle cx="300" cy="250" r="8" className="text-[#191974] fill-[#191974]" />
             <circle cx="500" cy="150" r="8" className="text-[#191974] fill-[#191974]" />
             <circle cx="700" cy="200" r="12" className="text-[#ee2229] fill-[#ee2229]" />
           </svg>

           {/* Location Tags */}
           <div className="absolute top-[50%] left-[10%] -translate-y-full flex flex-col items-center">
              <div className="bg-white px-3 py-1.5 rounded-lg shadow-lg border border-gray-100 text-[11px] font-bold text-[#191974] mb-2 transform -rotate-12">START</div>
              <MapPin className="w-6 h-6 text-[#ee2229]" />
           </div>

           <div className="absolute top-[35%] right-[10%] -translate-y-full flex flex-col items-center">
              <div className="bg-white px-3 py-1.5 rounded-lg shadow-lg border border-gray-100 text-[11px] font-bold text-[#191974] mb-2 transform rotate-12">FINISH</div>
              <MapPin className="w-6 h-6 text-[#ee2229]" />
           </div>

           {/* Compass Overlay */}
           <div className="absolute bottom-8 right-8 bg-white/80 backdrop-blur-md p-4 rounded-full border border-white shadow-xl">
              <Compass className="w-8 h-8 text-[#191974] animate-[spin_10s_linear_infinite]" />
           </div>
        </div>
      </div>

      {/* Overlay UI */}
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end">
         <div className="space-y-1">
            <h3 className="text-white text-[18px] font-bold">Interactive Route Explorer</h3>
            <p className="text-white/70 text-[13px] font-medium">Visualizing your journey across {tourTitle}</p>
         </div>
         <button className="bg-white text-[#191974] px-6 py-2.5 rounded-full text-[12px] font-bold tracking-widest hover:bg-[#ee2229] hover:text-white transition-all shadow-xl active:scale-95 flex items-center gap-2">
            PREVIEW ROUTE
            <Navigation className="w-4 h-4" />
         </button>
      </div>
    </div>
  );
}
