"use client";

import React from 'react';
import { MapPin, Navigation, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

interface TourMapProps {
  tourTitle: string;
  onPreview?: () => void;
  fullsize?: boolean;
  itinerary?: any[];
}

export default function TourMap({ tourTitle, onPreview, fullsize, itinerary }: TourMapProps) {
  // Generate dynamic points for the route based on itinerary length
  const points = itinerary && itinerary.length > 0 
    ? itinerary.map((_, i) => ({
        x: 100 + (600 / (itinerary.length - 1)) * i,
        y: 200 + Math.sin(i * 1.5) * 60
      }))
    : [{x: 100, y: 200}, {x: 400, y: 150}, {x: 700, y: 200}];

  // Generate SVG path string
  const pathD = points.length > 1
    ? points.reduce((acc, p, i) => i === 0 ? `M${p.x},${p.y}` : `${acc} L${p.x},${p.y}`, "")
    : "M100,200 L700,200";

  return (
    <div className={`relative w-full overflow-hidden bg-gray-50 border border-gray-100 shadow-sm transition-all duration-700 ${fullsize ? 'h-full aspect-none' : 'rounded-[32px] aspect-16/9 md:aspect-21/9'} group`}>
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#191974 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      
      {/* Map Illustration */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-5xl mx-auto p-12 md:p-20">
           {/* Dynamic Route Path */}
           <svg viewBox="0 0 800 400" className="w-full h-full text-gray-200 drop-shadow-lg">
             <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ee2229" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#191974" stopOpacity="0.8" />
                </linearGradient>
             </defs>
             <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d={pathD} 
                fill="none" 
                stroke="url(#routeGradient)" 
                strokeWidth="4" 
                strokeDasharray="8 8" 
                strokeLinecap="round"
             />
             
             {points.map((p, i) => (
                <g key={i} className="group/point cursor-pointer">
                   <circle 
                    cx={p.x} cy={p.y} r={i === 0 || i === points.length - 1 ? "10" : "6"} 
                    className={`${i === 0 || i === points.length - 1 ? 'fill-[#ee2229]' : 'fill-[#191974]'} transition-all group-hover/point:scale-150`}
                   />
                   {/* Label for key points or all if fullsize */}
                   {(fullsize || i === 0 || i === points.length - 1) && (
                     <foreignObject x={p.x - 50} y={p.y + 15} width="100" height="40">
                        <div className="text-center">
                            <p className="text-[9px] font-bold text-[#191974] bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-sm inline-block truncate max-w-full">
                                {itinerary?.[i]?.title || (i === 0 ? 'START' : 'STOP')}
                            </p>
                        </div>
                     </foreignObject>
                   )}
                </g>
             ))}
           </svg>

           {/* Start/Finish MapPins for prominence */}
           <div className="absolute transition-all duration-300" style={{ left: `${(points[0].x / 800) * 100}%`, top: `${(points[0].y / 400) * 100}%`, transform: 'translate(-50%, -100%)' }}>
              <div className="bg-white px-3 py-1.5 rounded-lg shadow-xl border border-gray-100 text-[10px] font-bold text-[#ee2229] mb-1 whitespace-nowrap">START JOURNEY</div>
              <MapPin className="w-6 h-6 text-[#ee2229]" />
           </div>

           <div className="absolute transition-all duration-300" style={{ left: `${(points[points.length-1].x / 800) * 100}%`, top: `${(points[points.length-1].y / 400) * 100}%`, transform: 'translate(-50%, -100%)' }}>
              <div className="bg-white px-3 py-1.5 rounded-lg shadow-xl border border-gray-100 text-[10px] font-bold text-[#191974] mb-1 whitespace-nowrap">MISSION COMPLETE</div>
              <MapPin className="w-6 h-6 text-[#ee2229]" />
           </div>

           {/* Compass Overlay */}
           <div className="absolute top-12 right-12 bg-white/40 backdrop-blur-sm p-4 rounded-full border border-white/20 shadow-xl hidden md:block">
              <Compass className="w-10 h-10 text-[#191974] animate-[spin_15s_linear_infinite]" />
           </div>
        </div>
      </div>

      {/* Overlay UI */}
      {!fullsize && <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />}
      <div className={`absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end ${fullsize ? 'bg-linear-to-t from-gray-50 via-transparent to-transparent' : ''}`}>
         <div className="space-y-1">
            <h3 className={`${fullsize ? 'text-gray-900' : 'text-white'} text-[18px] font-bold`}>Interactive Route Explorer</h3>
            <p className={`${fullsize ? 'text-gray-500' : 'text-white/70'} text-[13px] font-medium`}>Visualizing your itinerary across the region</p>
         </div>
         {!fullsize && (
           <button 
              onClick={(e) => {
                e.stopPropagation();
                onPreview?.();
              }}
              className="bg-white text-[#191974] px-6 py-2.5 rounded-full text-[12px] font-bold tracking-widest hover:bg-[#ee2229] hover:text-white transition-all shadow-xl active:scale-95 flex items-center gap-2 pointer-events-auto"
           >
              PREVIEW ROUTE
              <Navigation className="w-4 h-4" />
           </button>
         )}
      </div>
    </div>
  );
}
