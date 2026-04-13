"use client";
import React from 'react';

export default function AdvancePreparation() {
  const prep = [
    { title: "Passport & Visa", desc: "Ensure your passport is valid for at least 6 months from the return date. Complete all visa formalities in time." },
    { title: "Currency", desc: "Carry a mix of US Dollars and local currency (Vietnamese Dong). Multi-currency forex cards are also recommended." },
    { title: "Weather & Clothing", desc: "Pack light cotton clothes for warmer days and a light jacket for breezy evenings. Don't forget an umbrella or raincoat." },
    { title: "Health", desc: "Consult your doctor for any necessary vaccinations. Carry your regular medicines and a basic first-aid kit." }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {prep.map((item, index) => (
        <div key={index} className="space-y-2">
          <h3 className="text-[14px] font-bold text-[#191974] uppercase tracking-wider">{item.title}</h3>
          <p className="text-[14px] text-gray-600 leading-relaxed font-medium">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
