"use client";

import React from "react";

// ─── Data ────────────────────────────────────────────────────────────────────



const airlineLogos = [
  "Emirates", "Thai Airways", "Malaysia Airlines",
  "Singapore Airlines", "IndiGo", "Air India",
  "Sahara Airlines", "Jet Airways", "SriLankan Airlines",
];

const accreditations = [
  "IATA", "TAAI", "IATO", "IAAI",
  "TN Travel Mart Society",
  "TAFI", "TTTHA", "ADTOI", "ATOAI", "OTOAI",
];

const certifications = [
  { name: "Hong Kong", emoji: "🇭🇰" },
  { name: "Aussie Specialist", emoji: "🇦🇺" },
  { name: "100% Pure Kiwi Specialist", emoji: "🇳🇿" },
  { name: "Certified South African Specialist", emoji: "🇿🇦" },
  { name: "Israel Ministry of Tourism", emoji: "🇮🇱" },
  { name: "Dubai Specialist", emoji: "🇦🇪" },
  { name: "Matai Fiji", emoji: "🇫🇯" },
  { name: "Qatar Specialist", emoji: "🇶🇦" },
  { name: "Magical Kenya", emoji: "🇰🇪" },
  { name: "Tourism Malaysia", emoji: "🇲🇾" },
  { name: "European Quartet Specialist", emoji: "🇪🇺" },
  { name: "Explore France", emoji: "🇫🇷" },
  { name: "Amazing Thailand", emoji: "🇹🇭" },
  { name: "Switzerland", emoji: "🇨🇭" },
  { name: "Magic Mexico Specialist", emoji: "🇲🇽" },
  { name: "Japan Travel Specialist", emoji: "🇯🇵" },
  { name: "USA Discovery Program", emoji: "🇺🇸" },
  { name: "BritAgent", emoji: "🇬🇧" },
  { name: "All in Türkiye Specialist", emoji: "🇹🇷" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AwardsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* ══════════════════════════════════════════════ */}
        {/* 1. GOVERNMENT RECOGNITIONS                     */}
        {/* ══════════════════════════════════════════════ */}
        <div className="mb-16">
          {/* Label badge */}
          <div className="flex justify-center mb-4">
            <span className="bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-black uppercase tracking-[0.25em] px-4 py-1.5 rounded-full">
              Government Recognitions
            </span>
          </div>

          {/* Main heading */}
          <h2 className="text-center text-[28px] md:text-[36px] font-black text-[#191974] mb-8 uppercase tracking-tight leading-tight">
            Awards &amp; Recognitions
          </h2>

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
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-600 mb-1">
                {card.label}
              </p>

              {/* Main title */}
              <p className="text-[13px] font-bold text-[#191974] text-center leading-snug">
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
