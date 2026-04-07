"use client";

import React, { useState } from 'react';
import TourTabs from '@/app/components/tours/TourTabs';
import ItineraryTimeline from '@/app/components/tours/ItineraryTimeline';
import AccommodationTable from '@/app/components/tours/AccommodationTable';
import BookingSidebar from '@/app/components/tours/BookingSidebar';

interface TourDetailContentProps {
  tour: any;
  itinerary: any[];
  region: string;
}

const TABS = [
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'details', label: 'Tour Details' },
  { id: 'info', label: 'Tour Information' },
  { id: 'needtoknow', label: 'Need to Know' },
  { id: 'policy', label: 'Cancellation Policy' },
];

export default function TourDetailContent({ tour, itinerary, region }: TourDetailContentProps) {
  const [activeTab, setActiveTab] = useState('itinerary');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'itinerary':
        return <ItineraryTimeline itinerary={itinerary} />;
      case 'details':
        return (
          <div className="space-y-12 animate-in fade-in duration-700">
            <h2 className="text-[26px] font-inter font-light text-[#191974] tracking-tight border-b border-gray-100 pb-6 uppercase">Accommodation Details</h2>
            <AccommodationTable />
          </div>
        );
      case 'info':
        return (
          <div className="space-y-12 animate-in fade-in duration-700">
            <section>
              <h2 className="text-[26px] font-inter font-light text-[#191974] tracking-tight mb-8 border-b border-gray-100 pb-6 uppercase">Inclusions & Exclusions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-white border border-[#191974]/10 p-8 rounded-2xl shadow-sm">
                  <h3 className="text-[12px] font-black text-[#191974] mb-6 flex items-center gap-2 uppercase tracking-widest">
                    <div className="w-5 h-5 rounded-full bg-[#191974] flex items-center justify-center text-white p-1"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg></div>
                    Inclusions
                  </h3>
                  <ul className="space-y-4">
                    {(tour.inclusions || ["Airfare", "Accommodation", "Meals", "Visa", "Insurance"]).map((item: string, i: number) => (
                      <li key={i} className="flex gap-3 text-[14px] text-gray-500 font-arial leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#191974] mt-2 shrink-0 opacity-40" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white border border-[#ee2229]/10 p-8 rounded-2xl shadow-sm">
                  <h3 className="text-[12px] font-black text-[#ee2229] mb-6 flex items-center gap-2 uppercase tracking-widest">
                    <div className="w-5 h-5 rounded-full bg-[#ee2229] flex items-center justify-center text-white p-1"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" /></svg></div>
                    Exclusions
                  </h3>
                  <ul className="space-y-4">
                    {(tour.exclusions || ["Personal expenses", "Laundry", "Tips"]).map((item: string, i: number) => (
                      <li key={i} className="flex gap-3 text-[14px] text-gray-400 font-arial leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ee2229] mt-2 shrink-0 opacity-40" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        );
      case 'needtoknow':
        return (
          <div className="space-y-12 animate-in fade-in duration-700">
            <h2 className="text-[26px] font-inter font-light text-[#191974] tracking-tight mb-8 border-b border-gray-100 pb-6 uppercase">Need to Know</h2>
            <div className="bg-[#191974]/5 border border-[#191974]/10 p-10 rounded-2xl">
              <ul className="space-y-5">
                {[
                  "Original Passport with 6 months validity.",
                  "2 recent color photographs (3.5 x 4.5 cm).",
                  "Bank statements for last 6 months.",
                  "No refunds for any unused services.",
                  "Itinerary is subject to change based on local conditions."
                ].map((note, i) => (
                  <li key={i} className="flex gap-4 text-[14px] text-[#191974] font-arial items-start leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ee2229] mt-2.5 shrink-0" /> {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'policy':
        return (
          <div className="space-y-12 animate-in fade-in duration-700">
            <h2 className="text-[26px] font-inter font-light text-[#191974] tracking-tight mb-8 border-b border-gray-100 pb-6 uppercase">Cancellation Policy</h2>
            <div className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm">
              <table className="w-full text-left font-arial">
                <thead className="bg-[#191974] text-white">
                  <tr>
                    <th className="px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em] opacity-80">Timeline</th>
                    <th className="px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em] opacity-80 text-right">Penalty Charges</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="px-8 py-5 text-[14px] text-gray-500 font-bold uppercase">More than 45 Days</td>
                    <td className="px-8 py-5 text-[14px] font-black text-[#191974] text-right">Non-refundable Deposit</td>
                  </tr>
                  <tr>
                    <td className="px-8 py-5 text-[14px] text-gray-500 font-bold uppercase">30 - 45 Days</td>
                    <td className="px-8 py-5 text-[14px] font-black text-[#191974] text-right">50% of Tour Cost</td>
                  </tr>
                  <tr>
                    <td className="px-8 py-5 text-[14px] text-gray-500 font-bold uppercase">Less than 30 Days</td>
                    <td className="px-8 py-5 text-[14px] font-black text-[#ee2229] text-right">100% Non-refundable</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="font-arial text-[14px]">
      <TourTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              {renderTabContent()}
            </div>

            {/* Why travel with section */}
            <div className="mt-20 bg-gray-50 rounded-3xl p-12 border border-gray-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#ee2229]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
              <h3 className="text-[26px] font-inter font-light text-[#191974] mb-12 text-center uppercase tracking-tight">The Madura Standard</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
                {[
                  { title: "Price Integrity", icon: "💎", desc: "Guaranteed transparency with no unexpected surcharges." },
                  { title: "Expert Vanguards", icon: "🛡️", desc: "Seasoned tour managers accompany all international departures." },
                  { title: "Curated Excellence", icon: "⭐", desc: "Every itinerary is refined through three decades of expertise." }
                ].map((item, i) => (
                  <div key={i} className="text-center group">
                    <div className="text-[48px] mb-6 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                    <h4 className="text-[12px] font-black text-[#191974] mb-3 uppercase tracking-widest">{item.title}</h4>
                    <p className="text-[13px] text-gray-400 leading-relaxed font-arial font-bold uppercase tracking-tighter opacity-60">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <BookingSidebar tourName={tour.title} price={tour.base_price_inr || tour.price} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
