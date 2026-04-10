"use client";

import React, { useState } from 'react';
import TourTabs from '@/app/components/tours/TourTabs';
import ItineraryTimeline from '@/app/components/tours/ItineraryTimeline';
import AccommodationTable from '@/app/components/tours/AccommodationTable';
import DeparturePricing from '@/app/components/tours/DeparturePricing';
import TourInclusions from '@/app/components/tours/TourInclusions';
import Link from 'next/link';
import {
  Clock, MapPin, CheckCircle2, Star, Calendar, Users, Camera, ChevronRight, 
  Plane, Check, X, Utensils, Phone, MessageCircle, Heart, Download, Mail, Share2, 
  Map as MapIcon, HelpCircle, Bed, Bus, Shield
} from 'lucide-react';
import { formatRegionalPrice } from '@/config/country';
import TourMap from '../../../../components/tours/TourMap';

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

export default function TourDetailContent({ tour, itinerary, region }: TourDetailContentProps) {
  const [activeTab, setActiveTab] = useState('itinerary');

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -140;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const cityList = tour.cities?.split('▶') || ["Hanoi", "Halong Bay", "Hoi An", "Da Nang"];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main 2-Column Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN (2/3) */}
          <div className="lg:w-2/3 space-y-8">
            {/* Badges & Title Section */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-[#ee2229] text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 uppercase">
                  GROUP TOUR <span className="bg-white/20 px-1 rounded">ASPV</span>
                </span>
                <span className="text-gray-500 text-[12px] font-medium flex items-center gap-1">
                  Experience
                </span>
                <span className="text-gray-500 text-[12px] font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-green-500" /> Culture
                </span>
              </div>
              
              <h1 className="text-[32px] font-bold text-gray-900 leading-tight">
                {tour.title}
              </h1>

              <div className="flex items-center gap-4 text-[13px] font-medium">
                <span className="bg-gray-100 px-3 py-1 rounded-full">{tour.duration || "5 Days"}</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">1 Country</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
                  4 Cities <HelpCircle className="w-3 h-3 text-gray-400" />
                </span>
              </div>

              <div className="flex items-center gap-2 text-[13px] text-gray-600">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="flex items-center gap-2">
                  Vietnam Hanoi (1N) <span className="text-gray-300">---&gt;</span> Halong (1N) <span className="text-gray-300">---&gt;</span> Hoi An <span className="text-gray-300">---&gt;</span> Da Nang (2N)
                </span>
              </div>

              <button 
                onClick={() => scrollToSection('itinerary')}
                className="text-[#191974] font-bold text-[14px] flex items-center gap-1 hover:underline"
              >
                View day-wise tour itinerary <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Tour Includes Icons Row (Image 2 style) */}
            <div className="py-8 border-t border-gray-100">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                {[
                  { icon: Bed, label: "Hotel" },
                  { icon: Utensils, label: "Meals" },
                  { icon: Plane, label: "Flight" },
                  { icon: MapIcon, label: "Sightseeing" },
                  { icon: Bus, label: "Transport" },
                  { icon: Shield, label: "Visa" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 text-center">
                    <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center text-yellow-600">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl border border-gray-100 flex items-start gap-4">
                 <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                    <Users className="w-5 h-5" />
                 </div>
                 <p className="text-[13px] text-gray-600 font-medium">
                   Tour includes the services of Veena World's Tour Manager.
                 </p>
              </div>
            </div>

            {/* Content Tabs */}
            <TourTabs tabs={TABS} activeTab={activeTab} onTabChange={scrollToSection} />

            {/* Section: Itinerary */}
            <section id="itinerary" className="pt-8 space-y-6">
               <div className="flex items-center justify-between">
                  <h2 className="text-[24px] font-bold text-gray-900">Itinerary <span className="text-gray-400 font-normal text-[14px]">(Day Wise)</span></h2>
                  <button className="text-[#191974] font-bold text-[14px] hover:underline">View all days</button>
               </div>
               
               <div className="bg-yellow-50/50 p-4 rounded-xl border border-yellow-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[14px] text-gray-700">
                    Viewing itinerary for <span className="font-bold">04 Jun 2026 from Mumbai</span>
                    <button className="ml-2 text-gray-900 flex items-center gap-1 font-bold"><ChevronRight className="w-3 h-3 border border-black rounded-full" /> Change Departure Date</button>
                  </div>
               </div>

               <div className="flex flex-col md:flex-row gap-8 mt-8">
                  <div className="flex-1">
                    <ItineraryTimeline itinerary={itinerary} />
                  </div>
                  <div className="w-full md:w-[280px] shrink-0 space-y-4">
                     <div className="relative h-[200px] rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-gray-100">
                        <TourMap tourTitle={tour.title} />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow-xl flex items-center gap-2">
                           <MapIcon className="w-4 h-4 text-[#ee2229]" />
                           <span className="text-[13px] font-bold text-gray-900">Map View</span>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                        {[
                          { icon: Share2, label: "Send" },
                          { icon: Download, label: "Print" },
                          { icon: Mail, label: "Email" },
                          { icon: MapIcon, label: "Compare" }
                        ].map((act, i) => (
                           <div key={i} className="flex flex-col items-center gap-2 p-3 bg-white border border-gray-100 rounded-xl hover:border-[#191974] transition-all cursor-pointer">
                              <act.icon className="w-5 h-5 text-gray-400" />
                              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">{act.label}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </section>

            {/* Section: Accommodation (Image 4 Style) */}
            <section id="details" className="pt-16 space-y-8">
               <h2 className="text-[24px] font-bold text-gray-900">Tour details</h2>
               <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="flex border-b border-gray-100 overflow-x-auto bg-gray-50/50">
                    {['Flight Details', 'Accommodation Details', 'Reporting & Dropping'].map((label, i) => (
                      <button key={i} className={`px-8 py-5 text-[13px] font-bold whitespace-nowrap ${i === 1 ? 'bg-[#191974] text-white' : 'text-gray-500 hover:text-gray-800'}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                  <div className="p-6">
                    <AccommodationTable />
                  </div>
               </div>
            </section>

            {/* Section: Information (Image 5 Style) */}
            <section id="info" className="pt-16 space-y-8">
               <h2 className="text-[24px] font-bold text-gray-900">Tour Information</h2>
               <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="flex border-b border-gray-100 overflow-x-auto bg-gray-50/50">
                    {['Tour Inclusions', 'Tour Exclusions', 'Advance Preparation'].map((label, i) => (
                      <button key={i} className={`px-8 py-5 text-[13px] font-bold whitespace-nowrap ${i === 0 ? 'bg-[#191974] text-white' : 'text-gray-500 hover:text-gray-800'}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                  <div className="p-8">
                    <TourInclusions />
                  </div>
               </div>
            </section>

          </div>

          {/* RIGHT COLUMN (1/3) - SIDEBAR */}
          <div className="lg:w-1/3 space-y-6">
            {/* Testimonial Sidebar Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 relative overflow-hidden group hover:shadow-md transition-all">
               <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                     <ChevronRight className="w-5 h-5 text-gray-300 rotate-180 cursor-pointer" />
                     <ChevronRight className="w-5 h-5 text-gray-400 cursor-pointer" />
                  </div>
               </div>
               
               <p className="text-[14px] text-gray-600 leading-relaxed italic">
                 "We Enjoyed the trip...tour manager shreyash was extremely helpful and good natured person .. we would love to do more trips in future with veena world looking forward to it and good hospitality ..."
               </p>

               <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div>
                    <p className="text-[13px] font-bold text-gray-900">Manisha</p>
                    <p className="text-[11px] text-gray-400">Travelled Dec 22, 2025</p>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <div className="shrink-0">
                       <p className="text-[12px] font-bold text-gray-900">Shreyas Sawant</p>
                       <p className="text-[10px] text-gray-400">Tour Manager</p>
                    </div>
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                       <img src="https://i.pravatar.cc/100?img=12" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                  </div>
               </div>
            </div>

            {/* Main Price Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden sticky top-30">
               {/* Top Section */}
               <div className="p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                       <p className="text-[14px] font-bold text-gray-900">Mumbai to Mumbai</p>
                       <p className="text-[12px] text-gray-400">Starts from</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[12px] text-gray-400">All-inclusive tour from</p>
                       <p className="text-[12px] text-gray-900 font-bold">Mumbai to Mumbai</p>
                    </div>
                  </div>
                  <p className="text-[32px] font-bold text-gray-900 leading-none">
                    {formatRegionalPrice(tour.price || 105000, region)}
                  </p>
               </div>

               {/* Middle Section (Dark Blue) */}
               <div className="bg-[#191974] p-6 space-y-6">
                  <p className="text-center text-white/70 text-[11px] font-medium tracking-wide">Prices are on a twin-sharing basis.</p>
                  
                  <button className="w-full bg-[#ffd600] hover:bg-[#ffea00] text-gray-900 py-4 rounded-full font-bold text-[16px] transition-all transform active:scale-95 shadow-lg flex items-center justify-center">
                    Dates & Prices
                  </button>

                  <div className="flex items-center justify-between pt-4">
                    <button className="text-[12px] font-bold text-white flex items-center gap-1 hover:underline">
                      EMI starts at <span className="text-[#ffd600]">₹10,224/mo</span> <ChevronRight className="w-3 h-3" />
                    </button>
                    <button className="text-[12px] font-bold text-white flex items-center gap-1 hover:underline">
                      Pricing Table <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
               </div>

               {/* Bottom Quick Actions Icons */}
               <div className="p-4 grid grid-cols-4 gap-2 bg-gray-50/50">
                  {[
                    { icon: Heart, label: "Wishlist" },
                    { icon: Download, label: "Download" },
                    { icon: Mail, label: "Email" },
                    { icon: Share2, label: "Share" }
                  ].map((act, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 cursor-pointer group">
                       <act.icon className="w-5 h-5 text-gray-400 group-hover:text-[#ee2229] transition-all" />
                       <span className="text-[10px] font-medium text-gray-500">{act.label}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Want us to call you? Lead Form Box */}
            <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 space-y-6">
               <h3 className="text-[18px] font-bold text-gray-900">Want us to call you?</h3>
               <div className="space-y-4">
                  <input type="text" placeholder="Full Name*" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-[14px] outline-none focus:border-[#191974]" />
                  <div className="flex gap-2">
                    <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-3 bg-white">
                       <img src="https://flagcdn.com/w20/in.png" alt="IN" className="w-4 h-3" />
                       <span className="text-[14px] font-medium">+91</span>
                    </div>
                    <input type="text" placeholder="Mobile No.*" className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 text-[14px] outline-none focus:border-[#191974]" />
                  </div>
                  <button className="w-full bg-[#ffd600] text-gray-900 py-3 rounded-lg flex items-center justify-center gap-2 font-bold text-[14px] hover:bg-[#ffea00] active:scale-95 transition-all">
                     <Phone className="w-4 h-4" /> Request Call Back
                  </button>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
