"use client";
import React from 'react';
import { MapPin, Navigation, Eye, Maximize2 } from 'lucide-react';

interface TourMapProps {
   tourTitle: string;
   className?: string;
}

export default function TourMap({ tourTitle, className = "" }: TourMapProps) {
   return (
      <div className={`relative w-full rounded-[32px] overflow-hidden group shadow-2xl border border-gray-100 ${className}`}>
         {/* Map Content Layer */}
         <div className="relative aspect-video md:aspect-21/9 w-full bg-gray-100">
            <img
               src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=2000"
               alt={`Route map for ${tourTitle}`}
               className="w-full h-full object-cover opacity-60 grayscale-[0.5]"
            />

            {/* Stylized Routes / Markers (Visual Representation) */}
            <div className="absolute inset-0">
               <svg className="w-full h-full opacity-40">
                  <path
                     d="M 200,300 Q 400,200 600,400 T 1000,300"
                     fill="none"
                     stroke="#ee2229"
                     strokeWidth="3"
                     strokeDasharray="8 8"
                     className="animate-pulse"
                  />
               </svg>

               {/* Markers */}
               <div className="absolute top-[40%] left-[20%] group/marker">
                  <div className="relative flex flex-col items-center">
                     <div className="w-4 h-4 rounded-full bg-[#191974] border-2 border-white shadow-lg animate-bounce" />
                     <div className="mt-2 bg-white px-3 py-1 rounded-full text-[10px] font-bold text-[#191974] shadow-md opacity-0 group-hover/marker:opacity-100 transition-opacity">
                        START
                     </div>
                  </div>
               </div>

               <div className="absolute top-[35%] right-[25%] group/marker">
                  <div className="relative flex flex-col items-center">
                     <div className="w-4 h-4 rounded-full bg-[#ee2229] border-2 border-white shadow-lg" />
                     <div className="mt-2 bg-[#191974] text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-md opacity-0 group-hover/marker:opacity-100 transition-opacity">
                        DESTINATION
                     </div>
                  </div>
               </div>
            </div>

            {/* Overlay Controls */}
            <div className="absolute inset-0 bg-linear-to-t from-[#191974]/40 to-transparent pointer-events-none" />

            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
               <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 max-w-xs">
                  <div className="flex items-center gap-3 text-[#191974] mb-2">
                     <Navigation className="w-5 h-5 text-[#ee2229]" />
                     <span className="text-[14px] font-black tracking-tight">Interactive Route Guide</span>
                  </div>
                  <p className="text-[12px] text-gray-500 font-medium leading-relaxed">
                     Explore the detailed path and points of interest across {tourTitle}.
                  </p>
               </div>

               <button className="bg-[#191974] hover:bg-[#ee2229] text-white p-4 rounded-2xl shadow-2xl transition-all active:scale-95 group/btn">
                  <Maximize2 className="w-6 h-6 group-hover/btn:rotate-90 transition-transform" />
               </button>
            </div>
         </div>

         {/* Floating Badge */}
         <div className="absolute top-8 left-8 bg-[#191974] text-white px-6 py-2.5 rounded-full text-[11px] font-bold tracking-[0.2em] flex items-center gap-3 shadow-2xl">
            <MapPin className="w-4 h-4 text-[#ee2229]" />
            TOUR ROUTE MAP
         </div>

         <div className="absolute top-8 right-8">
            <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-4 shadow-xl border border-white/20">
               <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                     <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                     </div>
                  ))}
               </div>
               <span className="text-[11px] font-bold text-[#191974]">1.2k views</span>
            </div>
         </div>
      </div>
   );
}
