"use client";
import React from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/app/components/ui/draggable-card";
import { Quote, MessageSquare } from "lucide-react";
import { cn } from "@/utils/cn";

const testimonials = [
  {
    quote: "An absolutely luxurious experience. Madura Travel exceeded all my expectations.",
    name: "Rajesh S.",
    title: "Europe Explorer",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800",
    className: "absolute top-5 left-[5%] rotate-[-6deg]",
  },
  {
    quote: "Flawless execution from booking to return. Highly recommended for family trips.",
    name: "Priya V.",
    title: "Japan Tour",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
    className: "absolute top-16 left-[20%] rotate-[4deg]",
  },
  {
    quote: "The tour managers were exceptionally professional and the hotels were fantastic.",
    name: "Amit K.",
    title: "Australia Grandeur",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800",
    className: "absolute top-0 left-[40%] rotate-[-2deg]",
  },
  {
    quote: "Every single day was planned to perfection. A truly premium travel company.",
    name: "Neha D.",
    title: "Swiss Escapade",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800",
    className: "absolute top-24 left-[55%] rotate-[3deg]",
  },
];

export default function SidebarFeaturedContent({ isVisible }: { isVisible: boolean }) {
  return (
    <div className={cn(
      "hidden lg:flex flex-col h-full w-full px-6 py-12 transition-all duration-500",
      isVisible ? "opacity-100" : "opacity-0"
    )}>
      {/* Header Info */}
      <div className="mb-10 px-2">
        <h2 className="text-[28px]  text-[#191974]  tracking-tighter leading-none mb-1">
          Testimonials
        </h2>
        <div className="w-10 h-1 bg-[#ee2229] rounded-full" />
        <p className="text-gray-400 mt-4 text-[10px] font-bold  tracking-widest">Customer Feedback</p>
      </div>

      {/* Draggable Stack Container */}
      <div className="flex-1 w-full relative">
        <DraggableCardContainer className="relative h-full w-full items-center justify-center">
          {testimonials.map((testimonial, idx) => (
            <DraggableCardBody
              key={idx}
              className={cn(
                "absolute w-[280px] min-h-[360px] p-0 flex flex-col bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden transition-all",
                idx === 0 && "rotate-[-4deg] z-10",
                idx === 1 && "rotate-2 translate-y-6 z-20",
                idx === 2 && "-rotate-2 translate-y-12 z-30",
                idx === 3 && "rotate-3 translate-y-16 z-40"
              )}
            >
              <div className="h-40 w-full relative overflow-hidden shrink-0">
                <img
                  src={testimonial.image}
                  alt={testimonial.title}
                  className="pointer-events-none w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-4">
                  <p className="text-white  text-[10px]  tracking-wider">{testimonial.title}</p>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <Quote className="w-6 h-6 text-[#ee2229] mb-4 opacity-20" />
                <p className="text-[13px] text-[#191974] font-medium italic leading-relaxed mb-6 line-clamp-6">
                  "{testimonial.quote}"
                </p>

                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div>
                    <p className=" text-[#191974] text-[13px]">{testimonial.name}</p>
                    <p className="text-[8px] text-[#ee2229]   tracking-widest mt-0.5">Verified Traveler</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                    <StarIcon className="w-3 h-3 text-[#ee2229] fill-[#ee2229]" />
                  </div>
                </div>
              </div>
            </DraggableCardBody>
          ))}
        </DraggableCardContainer>
      </div>
    </div>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}
