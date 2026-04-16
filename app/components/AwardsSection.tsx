"use client";

import React from "react";

export default function AwardsSection() {
  return (
    <section className="py-6 md:py-10 bg-[#f7f7ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Existing Government Recognitions & Badges */}
        <div className="mb-6 md:mb-10">
          <p className="text-center text-[22px] text-[#191974]">
            Awards &amp; Recognitions
          </p>

          {/* Ministry Badges */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-5 md:mb-8">
            <div className="h-20 flex items-center justify-center transition-all duration-500 hover:scale-105">
              <img src="/Awardsimages/Incre.png" alt="Incredible India" className="h-full w-auto object-contain" />
            </div>
            <div className="h-20 flex items-center justify-center transition-all duration-500 hover:scale-105">
              <img src="/Awardsimages/ench.jpeg" alt="Enchanting Tamil Nadu" className="h-full w-auto object-contain" />
            </div>
          </div>

          <h5 className="text-center text-[20px] md:text-[22px] text-[#191974] mb-5 tracking-tight">
            Government Recognitions
          </h5>

          {/* 4 Award Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { imgSrc: "/Awardsimages/1.webp", label: "Primary Host", title: "Tamil Nadu Tourism Award" },
              { imgSrc: "/Awardsimages/22-1.png", label: "Record Holder", title: "Guinness World Records" },
              { imgSrc: "/Awardsimages/33-1.png", label: "M.I.C.E Leader", title: "Hong Kong Tourism Board" },
              { imgSrc: "/Awardsimages/44-1.png", label: "Record Holder", title: "Limca Book of Records" },
            ].map((card) => (
              <div
                key={card.title}
                className="flex flex-col items-center justify-center gap-3 bg-white border border-gray-100 rounded-[16px] p-4 hover:border-[#191974]/20 transition-all duration-300 group"
              >
                <img src={card.imgSrc} alt={card.title} className="h-16 w-16 object-contain transition-transform duration-500 group-hover:scale-110" />
                <div className="text-center">
                  <p className="text-[20px] text-[#ee2229]">{card.label}</p>
                  <p className="text-[14px]  text-[#191974] leading-snug">{card.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NEW 2-Column Grid (Airline Awards & Our Accreditations) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">

          {/* Card 1: Airline Awards */}
          <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-100 flex flex-col h-full hover:-translate-y-1 transition-all duration-500">
            <div className="mb-4 border-b border-gray-100 pb-4">
              <p className="text-[20px] text-[#191974]">Airline Awards</p>
              <p className="text-[13px] text-gray-500 mt-1">Recognized by the world&apos;s leading carriers</p>
            </div>
            <div className="flex-1 flex items-center justify-center bg-[#f7f7ff]/50 rounded-[16px] p-4 border border-white/50">
              <img
                src="/Awardsimages/airline.png"
                alt="Airline Awards"
                className="w-full h-auto max-h-50 object-contain transition-transform duration-700"
              />
            </div>
          </div>

          {/* Card 2: Our Accreditations */}
          <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-100 flex flex-col h-full hover:-translate-y-1 transition-all duration-500">
            <div className="mb-4 border-b border-gray-100 pb-4">
              <p className="text-[20px] text-[#191974]">Our Accreditations</p>
              <p className="text-[13px] text-gray-500 mt-1">Certified by top global tourism boards</p>
            </div>
            <div className="flex-1 flex items-center justify-center bg-[#f7f7ff]/50 rounded-[16px] p-4 border border-white/50">
              <img
                src="/Awardsimages/Tourism.png"
                alt="Our Accreditations"
                className="w-full h-auto max-h-50 object-contain transition-transform duration-700"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
