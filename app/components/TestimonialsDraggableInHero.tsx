"use client";
import React from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/app/components/ui/draggable-card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "An absolutely luxurious experience. Madura Travel exceeded all my expectations.",
    name: "Rajesh S.",
    title: "Europe Explorer",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800",
    className: "absolute top-5 left-[5%] rotate-[-4deg]",
  },
  {
    quote: "Flawless execution from booking to return. Highly recommended for family trips.",
    name: "Priya V.",
    title: "Japan Tour",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
    className: "absolute top-20 left-[20%] rotate-[3deg]",
  },
  {
    quote: "The tour managers were exceptionally professional and the hotels were fantastic.",
    name: "Amit K.",
    title: "Australia Grandeur",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800",
    className: "absolute top-10 left-[40%] rotate-[-2deg]",
  },
];

export default function TestimonialsDraggableInHero() {
  return (
    <DraggableCardContainer className="relative h-[400px] w-full items-center justify-center">
      {testimonials.map((testimonial, idx) => (
        <DraggableCardBody 
          key={idx} 
          className={`${testimonial.className} w-[280px] min-h-[350px] p-0 flex flex-col bg-white border border-gray-100 shadow-2xl overflow-hidden`}
        >
          <div className="h-32 w-full relative overflow-hidden">
             <img
              src={testimonial.image}
              alt={testimonial.title}
              className="pointer-events-none w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
               <p className="text-white font-black text-[10px] uppercase tracking-wider">{testimonial.title}</p>
            </div>
          </div>
          
          <div className="p-5 flex flex-col flex-1">
            <Quote className="w-6 h-6 text-[#ee2229] mb-3 opacity-20" />
            <p className="text-[13px] text-[#191974] font-medium italic leading-relaxed mb-4 line-clamp-4">
              "{testimonial.quote}"
            </p>
            
            <div className="mt-auto pt-3 border-t border-gray-50 text-left">
              <p className="font-black text-[#191974] text-[13px]">{testimonial.name}</p>
              <p className="text-[8px] text-[#ee2229] font-black uppercase tracking-widest mt-0.5">Verified Traveler</p>
            </div>
          </div>
        </DraggableCardBody>
      ))}
      
      {/* Visual Indicator */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-[9px] font-black uppercase tracking-[0.3em] pointer-events-none">
        Drag to Explore Cards
      </div>
    </DraggableCardContainer>
  );
}
