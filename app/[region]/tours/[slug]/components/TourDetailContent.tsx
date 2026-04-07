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
          <div className="space-y-8">
            <h2 className="text-[24px] font-black text-[#171717]">Accommodation Details</h2>
            <AccommodationTable />
          </div>
        );
      case 'info':
        return (
          <div className="space-y-10">
            <section>
              <h2 className="text-[24px] font-black text-[#171717] mb-6">Inclusions & Exclusions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
                <div className="bg-green-50/50 border border-green-100 p-6 rounded-2xl">
                  <h3 className="text-[16px] font-bold text-green-800 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                    Inclusions
                  </h3>
                  <ul className="space-y-3">
                    {(tour.inclusions || ["Airfare", "Accommodation", "Meals", "Visa", "Insurance"]).map((item: string, i: number) => (
                      <li key={i} className="flex gap-2 text-[14px] text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50/50 border border-red-100 p-6 rounded-2xl">
                  <h3 className="text-[16px] font-bold text-red-800 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600">✕</div>
                    Exclusions
                  </h3>
                  <ul className="space-y-3">
                    {(tour.exclusions || ["Personal expenses", "Laundry", "Tips"]).map((item: string, i: number) => (
                      <li key={i} className="flex gap-2 text-[14px] text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" /> {item}
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
          <div className="space-y-8 text-black">
            <h2 className="text-[24px] font-black text-[#171717]">Need to Know</h2>
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
              <ul className="space-y-4">
                {[
                  "Original Passport with 6 months validity.",
                  "2 recent color photographs (3.5 x 4.5 cm).",
                  "Bank statements for last 6 months.",
                  "No refunds for any unused services.",
                  "Itinerary is subject to change based on local conditions."
                ].map((note, i) => (
                  <li key={i} className="flex gap-3 text-[14px] text-blue-900">
                    <span className="font-bold text-[#191974]">•</span> {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'policy':
        return (
          <div className="space-y-8 text-black">
            <h2 className="text-[24px] font-black text-[#171717]">Cancellation Policy</h2>
            <div className="overflow-hidden border border-gray-200 rounded-2xl">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-[13px] font-black text-gray-500 uppercase tracking-wider">Days before Departure</th>
                    <th className="px-6 py-4 text-[13px] font-black text-gray-500 uppercase tracking-wider">Cancellation Charges</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="px-6 py-4 text-[14px] text-gray-600">More than 45 Days</td>
                    <td className="px-6 py-4 text-[14px] font-bold text-[#171717]">Booking Amount</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-[14px] text-gray-600">30 - 45 Days</td>
                    <td className="px-6 py-4 text-[14px] font-bold text-[#171717]">50% of Tour Cost</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-[14px] text-gray-600">Less than 30 Days</td>
                    <td className="px-6 py-4 text-[14px] font-bold text-red-600">100% Non-refundable</td>
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
    <div>
      <TourTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {renderTabContent()}
            </div>

            {/* Why travel with section */}
            <div className="mt-16 bg-gray-50 rounded-3xl p-10 border border-gray-200/50">
              <h3 className="text-[24px] font-black text-[#191974] mb-8 text-center">Why travel with Madura Travel?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Best Price Guarantee", icon: "💰", desc: "No hidden costs, transparent pricing for every tour." },
                  { title: "Expert Guidance", icon: "👨‍💼", desc: "Our certified tour managers ensure a smooth journey." },
                  { title: "Tailored Experience", icon: "✨", desc: "Crafting dreams into reality with personalized care." }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="text-[40px] mb-4">{item.icon}</div>
                    <h4 className="font-bold text-[#171717] mb-2">{item.title}</h4>
                    <p className="text-[13px] text-gray-500 leading-relaxed font-inter-tight">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <BookingSidebar tourName={tour.title} price={tour.base_price_inr} />
          </div>
        </div>
      </div>
    </div>
  );
}
