"use client";

import { Heading1 } from "lucide-react";
import React from "react";

// ─── Data ────────────────────────────────────────────────────────────────────







// ─── Component ────────────────────────────────────────────────────────────────

export default function AwardsSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* ══════════════════════════════════════════════ */}
        {/* 1. GOVERNMENT RECOGNITIONS                     */}
        {/* ══════════════════════════════════════════════ */}
        <div className="mb-8">
          {/* Label badge */}


          {/* Main heading */}
          <h1 className="text-center text-[26px] md:text-[36px]  text-[#191974] mb-8  tracking-tight leading-tight">
            Award &amp; Recognitions
          </h1>

          {/* Ministry Badges */}
          <div className="flex flex-wrap justify-center gap-50 mb-12">
            <div className="h-20 flex items-center justify-center transition-all duration-500">
              <img
                src="/Awardsimages/Incre.png"
                alt="Incredible India"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="h-20 flex items-center justify-center  transition-all duration-500">
              <img
                src="/Awardsimages/ench.jpeg"
                alt="Enchanting Tamil Nadu"
                className="h-full w-auto object-contain"
              />
            </div>
          </div>



        </div>
        <h1 className="text-center text-[26px] md:text-[36px]  text-[#191974] mb-8  tracking-tight leading-tight">
          Government Recognitions
        </h1>
        {/* ── 4 Award Cards – Image version ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              imgSrc: "/Awardsimages/1.webp",   // 👉 replace with your image
              label: "Primary Host",
              title: "Tamil Nadu Tourism Award",
            },
            {
              imgSrc: "/Awardsimages/22-1.png",
              label: "Record Holder",
              title: "Guinness World Records",
            },
            {
              imgSrc: "/Awardsimages/33-1.png",
              label: "M.I.C.E Leader",
              title: "Hong Kong Tourism Board",
            },
            {
              imgSrc: "/Awardsimages/44-1.png",
              label: "Record Holder",
              title: "Limca Book of Records",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="flex flex-col items-center justify-center gap-3 border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md hover:border-[#191974]/30 transition-all group"
            >
              {/* Image – keep it square for a uniform look */}
              <img
                src={card.imgSrc}
                alt={card.title}
                className="h-16 w-16 object-contain transition-all duration-300"
              />

              {/* Small label (e.g. “Primary Host”) */}
              <p className="text-[14px]  text-[#ee2229] mb-1">
                {card.label}
              </p>

              {/* Main title */}
              <p className="text-[14px]  text-[#191974] text-center leading-snug">
                {card.title}
              </p>
            </div>
          ))}
        </div>


        {/* Divider */}




      </div>
    </section>
  );
}
