"use client";

import React, { useState } from 'react';
import TourTabs from '@/app/components/tours/TourTabs';
import ItineraryTimeline from '@/app/components/tours/ItineraryTimeline';
import AccommodationTable from '@/app/components/tours/AccommodationTable';
import DeparturePricing from '@/app/components/tours/DeparturePricing';
import TourInclusions from '@/app/components/tours/TourInclusions';
import UpgradesSection from '@/app/components/tours/UpgradesSection';
import Link from 'next/link';
import {
  Clock, MapPin, CheckCircle2, Star, Calendar, Users, Camera, ChevronRight,
  Plane, Check, X, Utensils, Phone, MessageCircle, Heart, Download, Mail, Share2,
  Map as MapIcon, HelpCircle, Bed, Bus, Shield, CloudRain, Navigation, FileText,
  CreditCard, AlertCircle, Zap, ArrowRight, ThumbsUp
} from 'lucide-react';
import { formatRegionalPrice } from '@/config/country';
import TourMap from '@/app/components/tours/TourMap';
import { createClient } from '@/utils/supabase/client';
import { Pencil } from 'lucide-react';


interface TourDetailContentProps {
  tour: any;
  itinerary: any[];
  region: string;
}

const TABS = [
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'pricing', label: 'Departure and Pricing' },
  { id: 'details', label: 'Tour Details' },
  { id: 'info', label: 'Tour Information' },
  { id: 'needtoknow', label: 'Need to Know' },
  { id: 'policy', label: 'Cancellation Policy' },
  { id: 'upgrades', label: 'Upgrades' },
];

import { useBooking } from '@/app/components/BookingModal';

export default function TourDetailContent({ tour, itinerary, region }: TourDetailContentProps) {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [travellerCount, setTravellerCount] = useState({ adults: 1, children: 0, infants: 0 });
  const { openBooking } = useBooking();

  const cityList = tour.cities?.split('▶') || ["Hanoi", "Halong Bay", "Hoi An", "Da Nang"];
  const [selectedCity, setSelectedCity] = useState(cityList[0]);
  const [selectedDateId, setSelectedDateId] = useState('d1');

  const supabase = createClient();

  const handleBookNow = () => {
    openBooking({
      packageName: tour.title,
      discountedPrice: tour.price?.toString() || '105000',
      originalPrice: tour.originalPrice?.toString() || '125000',
      isDetailed: true,
    });
  };

  const handleEnquire = () => {
    openBooking({
      packageName: `Enquiry: ${tour.title}`,
      discountedPrice: '0',
      originalPrice: '0',
    });
  };

  React.useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAdmin(session?.user?.email === 'admin@maduratravel.com');
    };
    checkAdmin();
  }, [supabase]);


  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -140;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };


  // Mock dates for DeparturePricing
  const mockDates: Record<string, any[]> = {
    [cityList[0]]: [
      { id: 'd1', date: '04', day: 'Wed', month: 'Jun', year: '2026', price: tour.price || 105000, savings: 15000, isLowest: true },
      { id: 'd2', date: '11', day: 'Wed', month: 'Jun', year: '2026', price: (tour.price || 105000) + 5000, savings: 5000 }
    ],
    [cityList[1] || 'Other']: [
      { id: 'd3', date: '15', day: 'Sun', month: 'Jun', year: '2026', price: tour.price || 110000, savings: 10000, isLowest: true }
    ]
  };

  return (
    <>
      <div className="bg-white min-h-screen pb-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Main 2-Column Grid */}
          <div className="flex flex-col lg:flex-row gap-8">            {/* LEFT COLUMN (2/3) */}
            <div className="lg:w-2/3 space-y-8">
              <div className="space-y-6 pt-6">
                {/* Badges & Title Section */}
                <div className="space-y-4 pt-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-[#ee2229] text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 uppercase">
                      GROUP TOUR <span className="bg-white/20 px-1 rounded">ASPV</span>
                    </span>
                    <span className="text-gray-500 text-[12px] font-medium flex items-center gap-1 uppercase tracking-wider">
                      Experience
                    </span>
                    <span className="text-gray-500 text-[12px] font-medium flex items-center gap-1 uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3 text-green-500" /> Culture
                    </span>
                  </div>

                  <p className="text-[36px] font-bold text-gray-900 leading-tight">
                    {tour.title}
                  </p>

                  <div className="flex items-center gap-4 text-[13px] font-medium">
                    <span className="bg-gray-100 px-3 py-1.5 rounded-full text-gray-700">{tour.duration || "5 Days"}</span>
                    <span className="bg-gray-100 px-3 py-1.5 rounded-full text-gray-700">1 Country</span>
                    <span className="bg-gray-100 px-3 py-1.5 rounded-full text-gray-700 flex items-center gap-1">
                      4 Cities <HelpCircle className="w-3 h-3 text-gray-400" />
                    </span>

                    {/* Admin Quick Edit Button */}
                    {isAdmin && (
                      <Link
                        href="/admin/tours"
                        className="ml-auto flex items-center gap-2 bg-gray-900 text-white px-4 py-1.5 rounded-full text-[12px] font-bold hover:bg-black transition-all shadow-lg animate-bounce hover:animate-none"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit Tour Details
                      </Link>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-[13px] text-gray-600 border-b border-gray-50 pb-4">
                    <MapPin className="w-4 h-4 text-[#ee2229]" />
                    <span className="flex items-center gap-2 flex-wrap">
                      {tour.title.toLowerCase().includes('japan') ? (
                        <>Tokyo (2N) <span className="text-gray-300">---&gt;</span> Mt. Fuji <span className="text-gray-300">---&gt;</span> Kyoto (1N) <span className="text-gray-300">---&gt;</span> Osaka (2N)</>
                      ) : tour.title.toLowerCase().includes('europe') ? (
                        <>London (2N) <span className="text-gray-300">---&gt;</span> Paris (2N) <span className="text-gray-300">---&gt;</span> Swiss (2N)</>
                      ) : (
                        <>{tour.cities || "Vietnam Hanoi (1N) ---> Halong (1N) ---> Hoi An ---> Da Nang (2N)"}</>
                      )}
                    </span>
                  </div>

                  <button
                    onClick={() => scrollToSection('itinerary')}
                    suppressHydrationWarning
                    className="text-[#191974] font-bold text-[14px] flex items-center gap-1 hover:underline"
                  >
                    View day-wise tour itinerary <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Tour Includes Icons Row */}
                <div className="py-8 border-t border-gray-100">
                  <h3 className="text-[14px] font-bold text-gray-900 mb-6 uppercase tracking-wider">Tour Includes</h3>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
                    {[
                      { icon: Bed, label: "Hotel" },
                      { icon: Utensils, label: "Meals" },
                      { icon: Plane, label: "Flight" },
                      { icon: Camera, label: "Sightseeing" },
                      { icon: Bus, label: "Transport" },
                      { icon: Shield, label: "Visa" },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 text-center group cursor-pointer">
                        <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-[#191974] group-hover:bg-[#191974] group-hover:text-white transition-all">
                          <item.icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 ">{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-5 rounded-2xl border border-blue-50 bg-blue-50/20 flex items-start gap-4">
                    <div className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center text-blue-600 shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <p className="text-[13px] text-gray-700 font-medium leading-relaxed">
                      Tour includes the services of Madura Travel service's Tour Manager.
                    </p>
                  </div>
                </div>

                {/* Content Tabs */}
                <div className="sticky top-[80px] z-40 bg-white">
                  <TourTabs tabs={TABS} activeTab={activeTab} onTabChange={scrollToSection} />
                </div>

                {/* Section: Itinerary (Day Wise) */}
                <section id="itinerary" className="pt-16 space-y-6">
                  {/* <div className="flex items-center justify-between border-b border-gray-50 pb-6">
                    <h2 className="text-[28px] font-bold text-gray-900">Itinerary <span className="text-gray-400 font-normal text-[14px] lowercase">(Day Wise)</span></h2>
                    <button className="text-[#191974] font-bold text-[14px] hover:underline flex items-center gap-1">View all days <ChevronRight className="w-4 h-4" /></button>
                  </div> */}

                  <div className="bg-orange-50/40 p-5 rounded-2xl border-white flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3 text-[14px] text-gray-700 flex-wrap">
                      <span className="px-3 py-1 bg-white rounded-lg border border-orange-200 text-orange-700 font-bold text-[12px]">Notice</span>
                      Viewing itinerary for <span className="font-bold underline decoration-dotted">04 Jun 2026 from Mumbai</span>
                      <button className="ml-4 text-[#191974] flex items-center gap-1 font-bold bg-white px-3 py-1 rounded-full border border-gray-200 hover:bg-gray-50 shadow-sm transition-all"><MapIcon className="w-3.5 h-3.5" /> Change Departure Date</button>
                    </div>
                  </div>

                  <div className="flex flex-col xl:flex-row gap-10 mt-10">
                    <div className="flex-1">
                      <ItineraryTimeline itinerary={itinerary} />
                    </div>
                    <div className="w-full xl:w-[320px] shrink-0 space-y-6">
                      <button
                        onClick={() => setIsMapOpen(true)}
                        className="w-full relative h-[100px] rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-gray-200 bg-gray-50 flex items-center justify-center hover:border-black transition-all"
                      >
                        <div className="absolute inset-0 bg-map-pattern opacity-10"></div>
                        <div className="bg-white px-6 py-2.5 rounded-full shadow-md flex items-center gap-3 group-hover:scale-105 transition-all z-10 border border-gray-100">
                          <MapIcon className="w-5 h-5 text-gray-700" />
                          <span className="text-[14px] font-bold text-gray-900">Map View</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </section>

                {/* Section: Information (Image 5 Style) */}
                <section id="info" className="pt-24 space-y-12">
                  <div>
                    <h2 className="text-[28px] font-bold text-gray-900">Tour Information</h2>
                    <p className="text-[14px] font-normal text-gray-400 italic mt-1">Read this to prepare for your tour in the best way!</p>
                  </div>

                  {/* 1. Tour Inclusions */}
                  <div className="space-y-4">
                    <h3 className="text-[20px] font-bold text-[#191974] flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#191974]" /> Tour Inclusions
                    </h3>
                    <div className="border border-green-100 rounded-2xl overflow-hidden shadow-sm bg-white">
                      <TourInclusions />
                    </div>
                  </div>

                  {/* 2. Tour Exclusions */}
                  <div className="space-y-4">
                    <h3 className="text-[20px] font-bold text-[#ee2229] flex items-center gap-2">
                      <X className="w-5 h-5 text-[ee2229]" /> Tour Exclusions
                    </h3>
                    <div className="border border-red-100 rounded-2xl overflow-hidden shadow-sm bg-red-50/20 p-6 md:p-8">
                      <ul className="text-[14px] text-gray-700 space-y-3">
                        <li className="flex gap-3"><span className="text-red-500 font-bold mt-0.5">✕</span> Anything not mentioned in the inclusions</li>
                        <li className="flex gap-3"><span className="text-red-500 font-bold mt-0.5">✕</span> Any personal expenses, tips, porterage etc.</li>
                        <li className="flex gap-3"><span className="text-red-500 font-bold mt-0.5">✕</span> Excess baggage charges</li>
                        <li className="flex gap-3"><span className="text-red-500 font-bold mt-0.5">✕</span> Optional tours and sightseeing</li>
                        <li className="flex gap-3"><span className="text-red-500 font-bold mt-0.5">✕</span> Travel Insurance (unless specified)</li>
                      </ul>
                    </div>
                  </div>

                  {/* 3. Advance Preparation */}
                  <div className="space-y-4">
                    <h3 className="text-[20px] font-bold text-orange-700 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-orange-600" /> Advance Preparation
                    </h3>
                    <div className="border border-white rounded-2xl overflow-hidden shadow-sm bg-orange-50/20 p-6 md:p-8 space-y-4">
                      <p className="text-[14px] text-gray-700 leading-relaxed font-bold">Please pack comfortably and according to the weather updates in the Need to Know section.</p>
                      <ul className="text-[14px] text-gray-600 space-y-2 list-disc pl-5">
                        <li>Carry universal adapters for charging electronic devices.</li>
                        <li>Always keep a digital copy of your Passport and Visa on your phone.</li>
                        <li>Bring any required personal medication as local equivalents might be difficult to find.</li>
                      </ul>
                    </div>
                  </div>

                </section>

                {/* Section: Need to Know */}
                <section id="needtoknow" className="pt-24 space-y-8">
                  <div>
                    <h2 className="text-[28px] font-bold text-gray-900">Need to Know</h2>
                    <p className="text-[14px] text-gray-400 italic mt-1">Things to consider before the trip!</p>
                  </div>

                  <div className="space-y-8">
                    {/* Weather */}
                    <div className="bg-blue-50/40 border border-blue-100 rounded-2xl p-6 space-y-3">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                          <CloudRain className="w-5 h-5 text-blue-600" />
                        </div>
                        <h3 className="text-[16px] font-bold text-gray-900">Weather</h3>
                      </div>
                      <ul className="space-y-2 text-[14px] text-gray-600">
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />Warm & humid with tropical rains, unexpected showers during the day</li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />For detailed information about weather kindly visit <a href="https://www.accuweather.com" target="_blank" className="text-[#191974] underline font-medium">www.accuweather.com</a></li>
                      </ul>
                    </div>

                    {/* Transport */}
                    <div className="bg-white border-white rounded-2xl p-6 space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                          <Navigation className="w-5 h-5 text-orange-600" />
                        </div>
                        <h3 className="text-[16px] font-bold text-gray-900">Transport</h3>
                      </div>

                      <p className="text-[13px] font-bold text-gray-700">Air Travel:</p>
                      <ul className="space-y-2 text-[14px] text-gray-600">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ee2229] mt-2 shrink-0" />
                          <span>
                            {tour.title.toLowerCase().includes('japan')
                              ? "Mumbai – Tokyo // Osaka – Mumbai"
                              : "Mumbai – Hanoi // Hanoi – Da Nang // Da Nang – Mumbai"}
                          </span>
                        </li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ee2229] mt-2 shrink-0" /><span>We use combination of Airlines like Indigo, Akasa Air, Air India, Air India Express, Nok Air, Air Asia, Viet Air, Malindo Airlines, Batik Air, Malaysian Airlines, Singapore Airlines, etc.</span></li>
                      </ul>
                      <div className="space-y-3 pt-2 border-t border-orange-100">
                        <p className="text-[13px] font-bold text-gray-700">Coach Travel:</p>
                        <ul className="space-y-2 text-[14px] text-gray-600">
                          <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ee2229] mt-2 shrink-0" />A/C coach – Seating capacity depends upon group size</li>
                        </ul>
                      </div>
                    </div>

                    {/* Documents Required */}
                    <div className="bg-green-50/40 border border-green-100 rounded-2xl p-6 space-y-3">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                          <FileText className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="text-[16px] font-bold text-gray-900">Documents Required for Travel</h3>
                      </div>
                      <ul className="space-y-2 text-[14px] text-gray-600">
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />Original passport with minimum 6 months validity from the date of tour arrival along with sufficient blank pages for visa</li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />A valid Tourist Visa for the duration of the tour</li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />For all Schengen countries passport validity should not exceed more than 10 years</li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />Handwritten passport is not acceptable</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section: Cancellation Policy */}
                {/* Section: Departure and Pricing */}
                <section id="pricing" className="pt-24 space-y-8">
                  <h2 className="text-[28px] font-bold text-gray-900">Departure and Pricing <span className="text-[14px] font-normal text-gray-400 ml-2 italic">Select your preferred date for the final price.</span></h2>
                  <DeparturePricing
                    cities={cityList}
                    dates={mockDates}
                    selectedCity={selectedCity}
                    selectedDateId={selectedDateId}
                    onCityChange={setSelectedCity}
                    onDateChange={setSelectedDateId}
                    region={region}
                  />
                </section>

                <section id="policy" className="pt-24 space-y-8">
                  <h2 className="text-[28px] font-bold text-gray-900">Cancellation Policy &amp; Payment Terms</h2>

                  <div className="bg-blue-50/30 border border-blue-100 rounded-2xl p-5 flex flex-wrap items-center gap-6">
                    <div>
                      <p className="text-[14px] text-[#191974] font-bold">Mumbai departure, 04 Jun 2026.</p>
                    </div>
                    <button className="flex items-center gap-2 text-[13px] font-bold text-gray-700 border border-gray-200 bg-white px-4 py-2 rounded-full hover:border-[#191974] transition-all">
                      <Calendar className="w-4 h-4" /> Change Departure Date
                    </button>
                  </div>

                  <div className="space-y-2 text-[14px] text-gray-700">
                    <p><span className="font-bold">Tour Price:</span> {formatRegionalPrice(tour.price || 105000, region)} / per person on twin sharing</p>
                    <p className="text-gray-400 text-[13px]">Cancellation charges rise closer to departure, with the exact amount deducted shown.</p>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                    {[
                      { pct: 10, amount: 10500, range: '121–900 days prior', dates: '17 Dec 2023 – 03 Feb 2026', color: 'border-[#191974]', badge: 'bg-[#191974] text-white' },
                      { pct: 15, amount: 15750, range: '91–120 days prior', dates: '04 Feb 2026 – 05 Mar 2026', color: 'border-[#191974]', badge: 'bg-[#191974] text-white' },
                      { pct: 20, amount: 21000, range: '61–90 days prior', dates: '06 Mar 2026 – 04 Apr 2026', color: 'border-[#191974]', badge: 'bg-[#191974] text-white' },
                      { pct: 30, amount: 31500, range: '46–60 days prior', dates: '05 Apr 2026 – 19 Apr 2026', color: 'border-[#191974]', badge: 'bg-[#191974] text-white' },
                      { pct: 40, amount: 42000, range: '31–45 days prior', dates: '20 Apr 2026 – 04 May 2026', color: 'border-[#191974]', badge: 'bg-[#191974] text-white' },
                      { pct: 50, amount: 52500, range: '16–30 days prior', dates: '05 May 2026 – 19 May 2026', color: 'border-[#191974]', badge: 'bg-[#191974] text-white' },
                      { pct: 75, amount: 78750, range: '6–15 days prior', dates: '20 May 2026 – 29 May 2026', color: 'border-[#191974]', badge: 'bg-[#191974] text-white' },
                      { pct: 100, amount: 105000, range: '0–5 days prior', dates: '30 May 2026 – 04 Jun 2026', color: 'border-[#ee2229]', badge: 'bg-[#ee2229] text-white' },
                    ].map((row, i) => (
                      <div key={i} className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 p-5 border-b border-gray-50 last:border-b-0 border-l-4 ${row.color} hover:bg-gray-50/50 transition-all`}>
                        <div className="flex-1 min-w-0">
                          <span className="font-bold text-[15px] text-gray-900">{formatRegionalPrice(row.amount, region)}</span>
                          <span className="text-[13px] text-gray-500 ml-2">({row.pct}% deduction from tour amount)</span>
                        </div>
                        <div className="flex items-center gap-4 text-[13px] shrink-0">
                          <span className={`px-3 py-1 rounded-full font-bold text-[11px] ${row.badge}`}>{row.range}</span>
                          <span className="text-gray-400 hidden sm:block">{row.dates}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* RIGHT COLUMN (1/3) - SIDEBAR */}
            <div className="lg:w-1/3 space-y-6 h-fit pt-6 sticky top-24">
              {/* Sidebar Booking Summary Card (Screenshot 2 Match) */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden font-inter">
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
                      <p className="text-[13px] font-bold text-[#191974] border-b-2 border-gray-200">1800 313 5555</p>
                    </div>
                    <p className="text-[12px] text-gray-400"><span className="text-[#191974] font-bold border-b-2 border-gray-200">Locate</span> nearest branch</p>
                  </div>
                </div>

                <div className="bg-[#191974] p-4 flex gap-3">
                  <button className="flex-1 bg-white text-[#191974] py-3 rounded-lg font-bold text-[13px] hover:bg-gray-50 transition-all">
                    Enquire Now
                  </button>
                  <button
                    onClick={handleBookNow}
                    className="flex-1 bg-white text-[#191974] py-3 rounded-lg font-bold text-[13px] hover:bg-[#ee2229] transition-all"
                  >
                    Book Online
                  </button>
                </div>
              </div>

              {/* Request a Quote Card */}
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
                      onClick={handleBookNow}
                      className="w-full bg-[#191974] text-white py-4 rounded-xl font-bold text-[14px] hover:bg-[#ee2229] transition-all shadow-lg shadow-yellow-500/10 active:scale-95"
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

              {/* Request Call Back Card */}
              <div className="bg-[#f8faff] rounded-3xl border border-blue-100 shadow-sm p-8 space-y-6 font-inter">
                <div>
                  <h3 className="text-[20px] font-bold text-[#191974]">Want us to call you?</h3>
                </div>

                <div className="space-y-4">
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Full Name*"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-[14px] outline-none focus:border-[#ee2229] transition-all placeholder:text-gray-400"
                    />
                  </div>

                  <div className="relative">
                    <div className="flex rounded-xl border border-gray-200 bg-white overflow-hidden focus-within:border-[#ee2229] transition-all">
                      <div className="flex items-center gap-2 px-3 bg-gray-50/50 border-r border-gray-100 cursor-pointer">
                        <img src="https://flagcdn.com/w40/in.png" alt="India" className="w-5 h-3.5 object-cover rounded-sm" />
                        <ChevronRight className="w-3 h-3 rotate-90 text-gray-400" />
                      </div>
                      <div className="flex items-center px-4 text-gray-400 text-[14px] font-bold border-r border-gray-100">+91</div>
                      <input
                        type="text"
                        placeholder="Mobile No.*"
                        className="flex-1 px-4 py-4 text-[14px] outline-none placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <button className="w-full bg-[#ee2229] text-[#191974] py-4 rounded-xl font-bold text-[15px] hover:bg-[#ee2229] transition-all shadow-lg  active:scale-95 flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    Request Call Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isMapOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-12">
            <div
              className="absolute inset-0 bg-[#0a0a1a]/95 backdrop-blur-xl"
              onClick={() => setIsMapOpen(false)}
            />
            <div className="relative w-full max-w-6xl aspect-square md:aspect-21/9 bg-white rounded-[40px] overflow-hidden shadow-2xl">
              <button
                onClick={() => setIsMapOpen(false)}
                className="absolute top-6 right-6 z-50 w-12 h-12 bg-gray-900/10 hover:bg-gray-900/20 rounded-full flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>
              <TourMap tourTitle={tour.title} itinerary={itinerary} fullsize cities={tour.cities?.split('▶').map((c: string) => c.trim())} />
            </div>
          </div>
        )}

      </div>
    </>
  );
}