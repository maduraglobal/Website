"use client";

import React, { useState } from 'react';
import TourTabs from '@/app/components/tours/TourTabs';
import ItineraryTimeline from '@/app/components/tours/ItineraryTimeline';
import AccommodationTable from '@/app/components/tours/AccommodationTable';
import DeparturePricing from '@/app/components/tours/DeparturePricing';
import TourInclusions from '@/app/components/tours/TourInclusions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Clock, MapPin, CheckCircle2, Star, Calendar, Users, Camera, ChevronRight,
  Plane, Check, X, Utensils, Phone, MessageCircle, Heart, Download, Mail, Share2,
  Map as MapIcon, HelpCircle, Bed, Bus, Shield
} from 'lucide-react';
import { formatRegionalPrice } from '@/config/country';
import TourMap from '@/app/components/tours/TourMap';

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

import BookingDetailsForm from '@/app/components/tours/BookingDetailsForm';

export default function TourDetailContent({ tour, itinerary, region }: TourDetailContentProps) {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [isBookingMode, setIsBookingMode] = useState(false);
  const [travellerCount, setTravellerCount] = useState({ adults: 1, children: 0, infants: 0 });
  const router = useRouter();

  const scrollToSection = (id: string) => {
    if (isBookingMode) setIsBookingMode(false);
    setTimeout(() => {
      setActiveTab(id);
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -140;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  const cityList = tour.cities?.split('▶') || ["Hanoi", "Halong Bay", "Hoi An", "Da Nang"];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main 2-Column Grid */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT COLUMN (2/3) */}
          <div className="lg:w-2/3 space-y-8">
            {isBookingMode ? (
              <div className="space-y-6">
                <button
                  onClick={() => setIsBookingMode(false)}
                  className="text-[#191974] font-bold text-[14px] flex items-center gap-2 hover:underline mb-4"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" /> Back to Tour Itinerary
                </button>
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                  <BookingDetailsForm
                    onCountUpdate={(counts) => setTravellerCount(counts)}
                  />
                </div>
              </div>
            ) : (
              <>
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

                {/* Tour Includes Icons Row */}
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
                </div>

                <TourTabs tabs={TABS} activeTab={activeTab} onTabChange={scrollToSection} />

                <section id="itinerary" className="pt-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-[24px] font-bold text-gray-900">Itinerary <span className="text-gray-400 font-normal text-[14px]">(Day Wise)</span></h2>
                  </div>
                  <ItineraryTimeline itinerary={itinerary} />
                </section>

                <section id="details" className="pt-16 space-y-8">
                  <h2 className="text-[24px] font-bold text-gray-900">Tour details</h2>
                  <AccommodationTable />
                </section>
              </>
            )}
          </div>

          {/* RIGHT COLUMN (1/3) - SIDEBAR */}
          <div className="lg:w-1/3 space-y-6">
            {/* Sidebar Booking Summary Card (Screenshot 2 Match) */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden sticky top-30 font-inter">
              <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h3 className="text-[14px] font-bold text-[#191974] uppercase tracking-wider">Booking Summary</h3>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-y-6">
                  <p className="text-[13px] text-gray-500 font-medium">Dept. city</p>
                  <p className="text-[13px] text-gray-300 font-medium">Mumbai</p>

                  <p className="text-[13px] text-gray-500 font-medium">Dept. date</p>
                  <p className="text-[13px] text-[#191974] font-bold">23 Jun 2026 &rarr; 28 Jun 2026</p>

                  <p className="text-[13px] text-gray-500 font-medium">Travellers</p>
                  <p className="text-[13px] text-[#191974] font-bold">
                    {travellerCount.adults} Adult(s) | {travellerCount.children} Child | {travellerCount.infants} Infant
                  </p>

                  <p className="text-[13px] text-gray-500 font-medium">Rooms</p>
                  <p className="text-[13px] text-[#191974] font-bold">
                    {Math.ceil(travellerCount.adults / 2)} Room(s)
                  </p>
                </div>

                <div className="pt-6 border-t border-dashed border-gray-200">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="text-[14px] font-bold text-[#191974]">Basic Price</p>
                      <button className="text-[11px] text-[#191974] font-bold flex items-center gap-1 hover:underline mt-1">
                        View Pricing Table <ChevronRight className="w-2.5 h-2.5" />
                      </button>
                      <button className="text-[11px] text-[#191974] font-bold flex items-center gap-1 hover:underline">
                        Cancellation Policy <ChevronRight className="w-2.5 h-2.5" />
                      </button>
                    </div>
                    <p className="text-[26px] font-bold text-[#191974]">
                      {formatRegionalPrice(tour.price || 105000, region)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <div>
                      <p className="text-[13px] font-bold text-[#191974]">EMI Available</p>
                      <button className="text-[11px] text-[#191974] font-bold flex items-center gap-1 hover:underline">
                        Check eligibility <ChevronRight className="w-2.5 h-2.5" />
                      </button>
                    </div>
                    <p className="text-[18px] font-bold text-[#191974]">
                      {formatRegionalPrice(Math.round((tour.price || 105000) / 12), region)}<span className="text-[12px] font-normal text-gray-400">/month</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <p className="text-[13px] font-bold text-[#191974] border-b-2 border-gray-200">+91 9092949494</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#191974] p-4 flex gap-3">
                <button className="flex-1 bg-white text-[#191974] py-3 rounded-lg font-bold text-[13px] hover:bg-gray-50 transition-all">
                  Enquire Now
                </button>
                <button
                  onClick={() => setIsBookingMode(true)}
                  className="flex-1 bg-[#ffffff] text-[#191974] py-3 rounded-lg font-bold text-[13px] hover:bg-[#ee2229] transition-all"
                >
                  Book Online
                </button>
              </div>
            </div>

            {/* Request a Quote Card (Screenshot 3 Match) */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 space-y-6 font-inter">
              <div>
                <h3 className="text-[20px] font-bold text-[#191974]">Request a Quote</h3>
                <p className="text-[14px] text-gray-500 mt-1">Let our experts craft the perfect package for you.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#191974] uppercase tracking-wider">Full Name</label>
                  <input type="text" placeholder="e.g. John Doe" className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3.5 text-[14px] outline-none focus:border-[#ee2229] transition-all" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#191974] uppercase tracking-wider">Email</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3.5 text-[14px] outline-none focus:border-[#ee2229] transition-all" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#191974] uppercase tracking-wider">Phone Number</label>
                  <div className="flex gap-2">
                    <div className="w-24 bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3.5 text-[14px] font-bold text-[#191974] flex items-center justify-center gap-2 cursor-pointer">
                      <span>+91</span>
                      <ChevronRight className="w-3 h-3 rotate-90" />
                    </div>
                    <input type="text" placeholder="Mobile Number" className="flex-1 bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3.5 text-[14px] outline-none focus:border-[#ee2229] transition-all" />
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <button className="w-full bg-[#ee2229] text-white py-4 rounded-xl font-bold text-[14px] hover:bg-[#d91d24] transition-all shadow-lg shadow-red-500/20 active:scale-95">
                    Enquire Now
                  </button>
                  <button
                    onClick={() => router.push(`/${region}/booking?tour=${tour.slug || tour.id}&price=${tour.price || 0}&savings=0`)}
                    className="w-full bg-[#191974] text-white py-4 rounded-xl font-bold text-[14px] hover:bg-[#ffbb00] transition-all shadow-lg shadow-yellow-500/10 active:scale-95"
                  >
                    Book Online Instantly
                  </button>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-6 text-[12px] text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-green-500" />
                  <span>Secure Payments</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-green-500" />
                  <span>Verified Agent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
