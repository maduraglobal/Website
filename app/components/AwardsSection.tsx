"use client";

import React from "react";

export default function AwardsSection() {
  return (
    <section className="py-16 bg-[#f7f7ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Existing Government Recognitions & Badges */}
        <div className="mb-16">
          <h5 className="text-center text-[26px] md:text-[36px] text-[#191974] font-bold mb-8 tracking-tight">
            Awards &amp; Recognitions
          </h5>

          {/* Ministry Badges */}
          <div className="flex flex-wrap justify-center gap-10 mb-12">
            <div className="h-20 flex items-center justify-center transition-all duration-500 hover:scale-105">
              <img src="/Awardsimages/Incre.png" alt="Incredible India" className="h-full w-auto object-contain" />
            </div>
            <div className="h-20 flex items-center justify-center transition-all duration-500 hover:scale-105">
              <img src="/Awardsimages/ench.jpeg" alt="Enchanting Tamil Nadu" className="h-full w-auto object-contain" />
            </div>
          </div>

          <h5 className="text-center text-[22px] md:text-[28px] text-[#191974] font-bold mb-8 tracking-tight">
            Government Recognitions
          </h5>

          {/* 4 Award Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { imgSrc: "/Awardsimages/1.webp", label: "Primary Host", title: "Tamil Nadu Tourism Award" },
              { imgSrc: "/Awardsimages/22-1.png", label: "Record Holder", title: "Guinness World Records" },
              { imgSrc: "/Awardsimages/33-1.png", label: "M.I.C.E Leader", title: "Hong Kong Tourism Board" },
              { imgSrc: "/Awardsimages/44-1.png", label: "Record Holder", title: "Limca Book of Records" },
            ].map((card) => (
              <div
                key={card.title}
                className="flex flex-col items-center justify-center gap-4 bg-white border border-gray-100 rounded-[20px] p-6 shadow-sm hover:shadow-xl hover:border-[#191974]/20 transition-all duration-300 group"
              >
                <img src={card.imgSrc} alt={card.title} className="h-16 w-16 object-contain transition-transform duration-500 group-hover:scale-110" />
                <div className="text-center">
                  <p className="text-[11px] font-bold text-[#ee2229] uppercase tracking-widest mb-1">{card.label}</p>
                  <p className="text-[14px] font-bold text-[#191974] leading-snug">{card.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NEW 2-Column Grid (Airline Awards & Our Accreditations) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

          {/* Card 1: Airline Awards */}
          <div className="bg-white rounded-[24px] p-10 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col h-full hover:shadow-[0_25px_50px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500">
            <div className="mb-8 border-b border-gray-100 pb-5">
              <h3 className="text-[24px] font-bold text-[#191974] tracking-tight">Airline Awards</h3>
              <p className="text-[14px] text-gray-500 mt-2 font-light">Recognized by the world&apos;s leading carriers</p>
            </div>
            <div className="flex-1 flex items-center justify-center bg-[#f7f7ff]/50 rounded-[20px] p-8 border border-white/50">
              <img
                src="/Awardsimages/airline.png"
                alt="Airline Awards"
                className="w-full h-auto max-h-[200px] object-contain transition-transform duration-700"
              />
            </div>
          </div>

          {/* Card 2: Our Accreditations */}
          <div className="bg-white rounded-[24px] p-10 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col h-full hover:shadow-[0_25px_50px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500">
            <div className="mb-8 border-b border-gray-100 pb-5">
              <h3 className="text-[24px] font-bold text-[#191974] tracking-tight">Our Accreditations</h3>
              <p className="text-[14px] text-gray-500 mt-2 font-light">Certified by top global tourism boards</p>
            </div>
            <div className="flex-1 flex items-center justify-center bg-[#f7f7ff]/50 rounded-[20px] p-8 border border-white/50">
              <img
                src="/Awardsimages/Tourism.png"
                alt="Our Accreditations"
                className="w-full h-auto max-h-[200px] object-contain transition-transform duration-700"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
