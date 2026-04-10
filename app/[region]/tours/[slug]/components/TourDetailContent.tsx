"use client";

import React, { useState, useEffect } from 'react';
import TourTabs from '@/app/components/tours/TourTabs';
import ItineraryTimeline from '@/app/components/tours/ItineraryTimeline';
import AccommodationTable from '@/app/components/tours/AccommodationTable';
import BookingSidebar from '@/app/components/tours/BookingSidebar';
import DeparturePricing from '@/app/components/tours/DeparturePricing';
import TourInclusions from '@/app/components/tours/TourInclusions';
import Link from 'next/link';
import {
  Clock, MapPin, ShieldCheck, FileText, Info, AlertCircle,
  CheckCircle2, Star, Calendar, Users, Camera, ChevronRight, Home,
  ArrowUpCircle, Zap, Plane, Gem, Check, X
} from 'lucide-react';

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
  { id: 'upgrades', label: 'Upgrades' },
];

const MOCK_CITIES = ["Mumbai", "Bangalore", "Chennai", "Cochin", "Hyderabad", "Delhi", "Kolkata"];
const MOCK_DATES: Record<string, any[]> = MOCK_CITIES.reduce((acc, city) => {
  acc[city] = [
    { id: `${city}-1`, day: "THU", date: "15", month: "Oct", year: "2026", price: 536000, savings: 15000, isLowest: true },
    { id: `${city}-2`, day: "SAT", date: "22", month: "Oct", year: "2026", price: 541000, savings: 10000 },
    { id: `${city}-3`, day: "TUE", date: "05", month: "Nov", year: "2026", price: 529000, savings: 15000 },
    { id: `${city}-4`, day: "FRI", date: "18", month: "Nov", year: "2026", price: 536000, savings: 5000 },
  ];
  return acc;
}, {} as Record<string, any[]>);

export default function TourDetailContent({ tour, itinerary, region }: TourDetailContentProps) {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [selectedCity, setSelectedCity] = useState(MOCK_CITIES[0]);
  const [selectedDateId, setSelectedDateId] = useState(MOCK_DATES[MOCK_CITIES[0]][0].id);

  const selectedDateObj = MOCK_DATES[selectedCity].find(d => d.id === selectedDateId);
  const formattedDate = selectedDateObj ? `${selectedDateObj.date} ${selectedDateObj.month} ${selectedDateObj.year}` : "Select Date";

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -140;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="text-[14px] bg-white text-gray-900">
      <TourTabs tabs={TABS} activeTab={activeTab} onTabChange={scrollToSection} />

      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] font-bold text-gray-400 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link href={`/${region}`} className="hover:text-[#191974] flex items-center gap-1 group">
            <Home className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" /> Home
          </Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <Link href={`/${region}/tours`} className="hover:text-[#191974]">Tours</Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <span className="text-[#191974]">{tour.title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3 flex flex-col gap-6">

            {/* Departure & Pricing Section - NEW */}
            <section id="pricing">
              <DeparturePricing
                cities={MOCK_CITIES}
                dates={MOCK_DATES}
                selectedCity={selectedCity}
                selectedDateId={selectedDateId}
                region={region}
                onCityChange={(city) => {
                  setSelectedCity(city);
                  setSelectedDateId(MOCK_DATES[city][0].id);
                }}
                onDateChange={setSelectedDateId}
              />
            </section>

            {/* TOUR HIGHLIGHTS */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-[#ee2229] rounded-full" />
                <p className="text-[26px]  text-[#191974]">Quick Highlights</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: Camera, text: "Scenic Visuals", color: "text-blue-500" },
                  { icon: Users, text: "Group Experience", color: "text-purple-500" },
                  { icon: ShieldCheck, text: "A-Grade Safety", color: "text-[#191974]" },
                  { icon: Star, text: "Premium Service", color: "text-amber-500" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center justify-center gap-2 bg-gray-50/50 p-4 rounded-xl border border-gray-100 hover:bg-white hover:shadow-md transition-all text-center group">
                    <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-[11px]  text-[#191974] opacity-70 tracking-tighter ">{item.text}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* TOUR INCLUSIONS VISUAL - NEW */}
            <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <TourInclusions variant="large" />
            </section>

            {/* 1. ITINERARY SECTION */}
            <section id="itinerary" className="scroll-mt-40">
              <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-[26px]  text-[#191974] ">Day-Wise Itinerary</h2>
                </div>
                <span className="text-[14px]  text-[#ee2229] bg-red-50 border border-red-100 px-3 py-1 rounded-sm tracking-widest ">{tour.duration}</span>
              </div>
              <ItineraryTimeline itinerary={itinerary} />
            </section>

            {/* 2. TOUR DETAILS (ACCOMMODATION) SECTION */}
            <section id="details" className="scroll-mt-40 bg-[#f7f7ff]/50 border border-[#191974]/5 px-6 py-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6 border-b border-[#191974]/10 pb-4">
                <p className="text-[26px]  text-[#191974] tracking-tight">Hotel & Accommodations</p>
              </div>
              <AccommodationTable />
            </section>

            {/* 3. TOUR INFORMATION (INCLUSIONS / EXCLUSIONS) SECTION */}
            <section id="info" className="scroll-mt-40">
              <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
                <p className="text-[26px]  text-[#191974] ">Policies & Information</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                  <p className="text-[14px]  text-[#191974]  flex items-center gap-2  border-b border-[#191974]/10 pb-3">
                    <CheckCircle2 className="w-5 h-5" />
                    Tour Inclusions
                  </p>
                  <ul className="space-y-4">
                    {(tour.inclusions || ["Economy class Airfare", "Internal Flights (if any)", "Visa Fees (Selected Countries)", "Daily Breakfast, Lunch & Dinner", "Professional Tour Manager", "Travel Insurance up to 70 yrs"]).map((item: string, i: number) => (
                      <li key={i} className="flex gap-3 text-[13px] text-gray-500 items-start group">
                        <Check className="w-4 h-4 text-[#191974] mt-0.5 shrink-0" />
                        <span className="font-bold opacity-80 group-hover:text-[#191974] transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                  <p className="text-[14px]  text-[#ee2229]  flex items-center gap-2   border-b border-red-50 pb-3">
                    <AlertCircle className="w-5 h-5" />
                    Tour Exclusions
                  </p>
                  <ul className="space-y-4">
                    {(tour.exclusions || ["GST (5%) and TCS (as applicable)", "Tips to Local Guides & Drivers", "Personal expenses (laundry, calls)", "Optional sightseeing", "Anything not in inclusions"]).map((item: string, i: number) => (
                      <li key={i} className="flex gap-3 text-[13px] text-gray-400 items-start group">
                        <div className="w-4 h-4 flex items-center justify-center mt-0.5 shrink-0">
                          <X className="w-3.5 h-3.5 text-red-500" strokeWidth={3} />
                        </div>
                        <span className="font-bold opacity-70 group-hover:text-red-500 transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. NEED TO KNOW SECTION */}
            <section id="needtoknow" className="scroll-mt-40 bg-[#191974] px-6 py-6 rounded-2xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4 relative z-10">
                <h2 className="text-[26px]">Important - Need to Know</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                {[
                  { title: "Weather", text: "Check local forecast before packing." },
                  { title: "Documents", text: "Carry valid Passport & Visa copies." },
                  { title: "Arrival", text: "Reach the airport 4 hours prior." },
                  { title: "Currency", text: "Carry sufficient local currency." }
                ].map((note, i) => (
                  <div key={i} className="flex flex-col gap-1 bg-white/10 p-4 rounded-xl border border-white/10">
                    <span className="text-[10px]   text-[#ee2229] tracking-widest">{note.title}</span>
                    <span className="text-[13px] font-bold opacity-90">{note.text}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. CANCELLATION POLICY SECTION */}
            <section id="policy" className="scroll-mt-40">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <p className="text-[26px]  text-[#191974] ">Cancellation Policy</p>
              </div>
              <div className="overflow-hidden border border-gray-100 rounded-xl shadow-sm">
                <table className="w-full text-left ">
                  <thead className="bg-[#191974] text-white">
                    <tr>
                      <th className="px-6 py-4 text-[11px]  tracking-widest ">No. of Days</th>
                      <th className="px-6 py-4 text-[11px]  tracking-widest  text-right">Penalty Charges</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 bg-white">
                    {[
                      { days: "61 Days & More", penalty: "₹10,000 /-" },
                      { days: "46 - 60 Days", penalty: "25% of Tour Cost" },
                      { days: "31 - 45 Days", penalty: "50% of Tour Cost" },
                      { days: "Less than 30 Days", penalty: "100% (No Refund)" }
                    ].map((row, idx) => (
                      <tr key={idx} className={row.days.includes("Less") ? "bg-red-50/50" : ""}>
                        <td className="px-6 py-4 text-[13px] text-[#191974] ">{row.days}</td>
                        <td className="px-6 py-4 text-[13px]  text-[#191974] text-right">{row.penalty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 6. UPGRADES SECTION - NEW */}
            <section id="upgrades" className="scroll-mt-40">
              <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
                <h2 className="text-[24px]  text-[#191974] tracking-tight">Available Upgrades</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Business Class Airfare", icon: Plane, desc: "Experience luxury travel with premium seats and hospitality." },
                  { title: "Private Transfers", icon: Zap, desc: "Skip the group coach and travel in your own private vehicle." },
                  { title: "Room Upgrades", icon: Gem, desc: "Upgrade to Junior Suites or Beachfront villas locally." },
                  { title: "Prime Seats", icon: ArrowUpCircle, desc: "Book front-row seats in the group coach for better views." }
                ].map((up, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-white border border-gray-100 rounded-2xl hover:border-[#191974]/30 hover:shadow-xl transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-[#191974]/5 flex items-center justify-center shrink-0 group-hover:bg-[#ee2229]/10 transition-colors">
                      <up.icon className="w-6 h-6 text-[#191974] group-hover:text-[#ee2229]" />
                    </div>
                    <div>
                      <h4 className="text-[14px]  text-[#191974] mb-1">{up.title}</h4>
                      <p className="text-[14px] text-gray-500 leading-normal mb-3">{up.desc}</p>
                      <button className="text-[14px]  text-[#ee2229]  tracking-widest hover:underline flex items-center gap-1">Enquire Now <ChevronRight className="w-3 h-3" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Compact Footer */}
            <div className="mt-12 bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center">
              <h3 className="text-[26px]  text-[#191974] mb-2 tracking-tight">The Madura Standard</h3>
              <p className="text-[14px]  text-gray-400 ">Expert travel guidance since 1986.</p>
              <div className="flex flex-wrap justify-center gap-10">
                {["Price Integrity", "Expert Managers", "Curated Hotels"].map((feature, i) => (
                  <div key={feature} className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#ee2229]" />
                    <span className="text-[14px]  text-[#191974] ">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <BookingSidebar
              tourName={tour.title}
              price={selectedDateObj?.price || tour.price || 45000}
              selectedCity={selectedCity}
              selectedDate={formattedDate}
              emiAmount={selectedDateObj ? `₹${(Math.round(selectedDateObj.price / 12)).toLocaleString('en-IN')}` : "₹5,219"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
