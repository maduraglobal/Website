"use client";
import React, { useState } from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/app/components/ui/draggable-card";
import { Quote, ChevronLeft, ChevronRight, MessageSquareText } from "lucide-react";
import { cn } from "@/utils/cn";

const testimonials = [
  {
    quote: "An absolutely luxurious experience. Madura Travel exceeded all my expectations.",
    name: "Rajesh S.",
    title: "Europe Explorer",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800",
  },
  {
    quote: "Flawless execution from booking to return. Highly recommended for family trips.",
    name: "Priya V.",
    title: "Japan Tour",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
  },
  {
    quote: "The tour managers were exceptionally professional and the hotels were fantastic.",
    name: "Amit K.",
    title: "Australia Grandeur",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800",
  },
];

export default function SideTestimonials() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* 🔷 FIXED SIDEBAR */}
      <div 
        className={cn(
          "fixed top-24 left-0 h-[calc(100vh-120px)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-[90] flex items-center",
          isOpen ? "w-80 translate-x-0" : "w-12 -translate-x-2"
        )}
      >
        <div className={cn(
          "h-full w-full bg-white/80 backdrop-blur-xl border-y border-r border-gray-100 shadow-[20px_0_50px_rgba(0,0,0,0.05)] rounded-r-3xl flex flex-col items-center py-8 relative overflow-hidden transition-opacity duration-300",
          !isOpen && "opacity-0 invisible"
        )}>
          {/* Header */}
          <div className="px-6 w-full mb-8">
            <div className="flex items-center gap-2 mb-1">
               <MessageSquareText className="w-4 h-4 text-[#ee2229]" />
               <span className="text-[10px] font-black text-[#ee2229] uppercase tracking-widest">Guest Voices</span>
            </div>
            <h3 className="text-xl font-black text-[#191974] uppercase tracking-tighter">Testimonials</h3>
          </div>

          {/* Draggable Stack Container */}
          <div className="flex-1 w-full px-4 relative flex items-center justify-center">
            <DraggableCardContainer className="relative h-full w-full flex items-center justify-center">
              {testimonials.map((testimonial, idx) => (
                <DraggableCardBody 
                  key={idx} 
                  className={cn(
                    "absolute w-64 min-h-[320px] p-0 flex flex-col bg-white border border-gray-50 shadow-xl rounded-2xl overflow-hidden",
                    idx === 0 && "rotate-[-2deg]",
                    idx === 1 && "rotate-[1deg] translate-y-4",
                    idx === 2 && "rotate-[-1deg] translate-y-8"
                  )}
                >
                  <div className="h-24 w-full relative overflow-hidden shrink-0">
                     <img
                      src={testimonial.image}
                      alt={testimonial.title}
                      className="pointer-events-none w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-3">
                       <p className="text-white font-black text-[9px] uppercase tracking-wider">{testimonial.title}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 flex flex-col flex-1">
                    <Quote className="w-5 h-5 text-[#ee2229] mb-2 opacity-20" />
                    <p className="text-[12px] text-[#191974] font-medium italic leading-relaxed mb-4 line-clamp-5">
                      "{testimonial.quote}"
                    </p>
                    
                    <div className="mt-auto pt-3 border-t border-gray-50">
                      <p className="font-black text-[#191974] text-[12px]">{testimonial.name}</p>
                      <p className="text-[7px] text-[#ee2229] font-black uppercase tracking-widest mt-0.5">Verified Traveler</p>
                    </div>
                  </div>
                </DraggableCardBody>
              ))}
            </DraggableCardContainer>
          </div>

          <p className="mt-6 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Drag to shuffle</p>
        </div>

        {/* 🔷 TOGGLE BUTTON */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "absolute -right-5 w-10 h-10 bg-white border border-gray-100 rounded-full shadow-lg flex items-center justify-center text-[#191974] hover:bg-[#ee2229] hover:text-white transition-all z-10",
            !isOpen && "right-0"
          )}
        >
          {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
    </>
  );
}
