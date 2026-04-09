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
    className: "absolute top-10 left-[10%] rotate-[-4deg]",
  },
  {
    quote: "Flawless execution from booking to return. Highly recommended for family trips.",
    name: "Priya V.",
    title: "Japan Tour",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
    className: "absolute top-32 left-[25%] rotate-[3deg]",
  },
  {
    quote: "The tour managers were exceptionally professional and the hotels were fantastic.",
    name: "Amit K.",
    title: "Australia Grandeur",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800",
    className: "absolute top-10 left-[45%] rotate-[-2deg]",
  },
  {
    quote: "Every single day was planned to perfection. A truly premium travel company.",
    name: "Neha D.",
    title: "Swiss Escapade",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800",
    className: "absolute top-40 right-[15%] rotate-[5deg]",
  },
];

export default function TestimonialsDraggable() {
  return (
    <section className="py-24 bg-[#F8F9FF] overflow-hidden relative min-h-[700px]">
      <div className="text-center mb-16 px-4 relative z-20">
        <h2 className="text-3xl  text-[#191974] mb-3 uppercase tracking-tight">Guest Testimonials</h2>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">Drag the cards to explore real traveler experiences.</p>
      </div>

      <DraggableCardContainer className="relative h-[500px] w-full max-w-7xl mx-auto items-center justify-center">
        {testimonials.map((testimonial, idx) => (
          <DraggableCardBody
            key={idx}
            className={`${testimonial.className} w-[320px] min-h-[400px] p-0 flex flex-col bg-white border border-gray-100 shadow-xl overflow-hidden`}
          >
            <div className="h-48 w-full relative overflow-hidden">
              <img
                src={testimonial.image}
                alt={testimonial.title}
                className="pointer-events-none w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-4">
                <p className="text-white  text-sm uppercase tracking-wider">{testimonial.title}</p>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <Quote className="w-8 h-8 text-[#ee2229] mb-4 opacity-20" />
              <p className="text-[15px] text-[#191974] font-medium italic leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              <div className="mt-auto pt-4 border-t border-gray-50">
                <p className=" text-[#191974] text-base">{testimonial.name}</p>
                <p className="text-[10px] text-[#ee2229]  uppercase tracking-widest mt-0.5">Verified Traveler</p>
              </div>
            </div>
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>
    </section>
  );
}
