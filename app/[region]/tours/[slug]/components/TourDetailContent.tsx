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
import FallbackImage from '@/app/components/FallbackImage';
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

export default function TourDetailContent({ tour, itinerary, region }: TourDetailContentProps) {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  
  const cityList = tour.cities?.split('▶') || ["Hanoi", "Halong Bay", "Hoi An", "Da Nang"];
  const [selectedCity, setSelectedCity] = useState(cityList[0]);
  const [selectedDateId, setSelectedDateId] = useState('d1');

  const supabase = createClient();


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
          <div className="flex flex-col lg:flex-row gap-8">

            {/* LEFT COLUMN (2/3) */}
            <div className="lg:w-2/3 space-y-8">
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
                    Vietnam Hanoi (1N) <span className="text-gray-300">---&gt;</span> Halong (1N) <span className="text-gray-300">---&gt;</span> Hoi An <span className="text-gray-300">---&gt;</span> Da Nang (2N)
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

              {/* Tour Includes Icons Row (Image 2 style) */}
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
                <div className="flex items-center justify-between border-b border-gray-50 pb-6">
                  <h2 className="text-[28px] font-bold text-gray-900">Itinerary <span className="text-gray-400 font-normal text-[14px] lowercase">(Day Wise)</span></h2>
                  <button className="text-[#191974] font-bold text-[14px] hover:underline flex items-center gap-1">View all days <ChevronRight className="w-4 h-4" /></button>
                </div>

                <div className="bg-orange-50/40 p-5 rounded-2xl border border-orange-100 flex items-center justify-between shadow-sm">
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
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {
                          icon: Share2,
                          label: "Send Itinerary",
                          onClick: () => {
                            if (navigator.share) {
                              navigator.share({
                                title: tour.title,
                                text: `Check out this amazing tour: ${tour.title}`,
                                url: window.location.href,
                              }).catch(() => { });
                            } else {
                              navigator.clipboard.writeText(window.location.href);
                              alert("Link copied to clipboard!");
                            }
                          }
                        },
                        {
                          icon: Download,
                          label: "Print Itinerary",
                          onClick: () => window.print()
                        },
                        {
                          icon: Mail,
                          label: "Email Itinerary",
                          onClick: () => {
                            window.location.href = `mailto:?subject=Itinerary: ${tour.title}&body=Check out this tour at: ${window.location.href}`;
                          }
                        },
                        {
                          icon: MapIcon,
                          label: "View Map",
                          onClick: () => setIsMapOpen(true)
                        }
                      ].map((act, i) => (
                        <button
                          key={i}
                          onClick={act.onClick}
                          className="flex flex-col items-center justify-center gap-3 p-5 bg-white border border-gray-100 rounded-2xl hover:border-[#191974] hover:shadow-lg transition-all cursor-pointer group text-center outline-none focus:ring-2 focus:ring-[#191974]/20"
                        >
                          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-[#191974] transition-colors">
                            <act.icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">{act.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-12 bg-gray-50 p-8 rounded-[32px] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[18px] font-bold text-gray-900">Know, before you book</h3>
                    <button className="text-[#191974] font-bold text-[14px] underline">Read More</button>
                  </div>
                  <div className="text-[13px] text-gray-600 space-y-3 leading-relaxed">
                    <p><span className="font-bold text-gray-900">Please note:</span> Airline: On group tours, we generally fly with airlines that are group-friendly.</p>
                    <p>Group tours are based on economy class, if you wish to travel by Premium Economy / Business Class / First Class, we can arrange the same at an additional cost subject to availability.</p>
                  </div>
                </div>
              </section>

              {/* Section: Accommodation (Image 4 Style) */}
              <section id="details" className="pt-24 space-y-12">
                <div>
                  <h2 className="text-[28px] font-bold text-gray-900">Tour details</h2>
                  <p className="text-[14px] font-normal text-gray-400 italic mt-1">Best facilities with no added cost.</p>
                </div>

                {/* 1. Flight Details */}
                <div className="space-y-4">
                  <h3 className="text-[20px] font-bold text-gray-900 flex items-center gap-2">
                    <Plane className="w-5 h-5 text-[#191974]" /> Flight Details
                  </h3>
                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 italic text-gray-500 text-[14px]">
                    Flight details are updated closer to the departure date. For general guidance, flights usually depart from major international hubs. Please coordinate with your tour manager 15 days prior to joining.
                  </div>
                </div>

                {/* 2. Accommodation Details */}
                <div className="space-y-4">
                  <h3 className="text-[20px] font-bold text-gray-900 flex items-center gap-2">
                    <Bed className="w-5 h-5 text-[#191974]" /> Accommodation Details
                  </h3>
                  <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    <AccommodationTable />
                  </div>
                </div>

                {/* 3. Reporting & Dropping */}
                <div className="space-y-4">
                  <h3 className="text-[20px] font-bold text-gray-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#191974]" /> Reporting & Dropping
                  </h3>
                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-2">
                      <p className="font-bold text-gray-900 text-[14px]">Reporting Point:</p>
                      <p className="text-gray-600 text-[14px]">Day 1: Airport Terminal / Designated Hotel Lobby (Detailed confirmation will be strictly provided manually to your email).</p>
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="font-bold text-gray-900 text-[14px]">Dropping Point:</p>
                      <p className="text-gray-600 text-[14px]">Final Day: Airport Drop-off based on scheduled outbound flights.</p>
                    </div>
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
                  <div className="border border-orange-100 rounded-2xl overflow-hidden shadow-sm bg-orange-50/20 p-6 md:p-8 space-y-4">
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
                  <div className="bg-orange-50/40 border border-orange-100 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                        <Navigation className="w-5 h-5 text-orange-600" />
                      </div>
                      <h3 className="text-[16px] font-bold text-gray-900">Transport</h3>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[13px] font-bold text-gray-700">Air Travel:</p>
                      <ul className="space-y-2 text-[14px] text-gray-600">
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ee2229] mt-2 shrink-0" /><span>Mumbai – Hanoi // Hanoi – Da Nang // Da Nang – Mumbai</span></li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ee2229] mt-2 shrink-0" /><span>We use combination of Airlines like Indigo, Akasa Air, Air India, Air India Express, Nok Air, Air Asia, Viet Air, Malindo Airlines, Batik Air, Malaysian Airlines, Singapore Airlines, etc.</span></li>
                      </ul>
                    </div>
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
              {/* Section: Upgrades - Removed as requested */}

            </div>

            {/* RIGHT COLUMN (1/3) - SIDEBAR */}
            <div className="lg:w-1/3 space-y-8 h-fit pt-6">

              {/* Want us to call you? Lead Form Box */}
              <div className="bg-white p-8 rounded-[32px] border border-gray-200 shadow-xl space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10 space-y-2">
                  <h3 className="text-[24px] font-bold text-gray-900">Request a Quote</h3>
                  <p className="text-gray-500 text-[14px]">Let our experts craft the perfect package for you.</p>
                </div>
                <form className="relative z-10 space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Request submitted!"); }}>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-600 uppercase tracking-widest ml-1">Full Name</label>
                    <input required type="text" placeholder="e.g. John Doe" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 text-[14px] text-gray-900 placeholder-gray-400 outline-none focus:border-[#191974] focus:bg-white transition-all font-medium" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-600 uppercase tracking-widest ml-1">Email</label>
                    <input required type="email" placeholder="john@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 text-[14px] text-gray-900 placeholder-gray-400 outline-none focus:border-[#191974] focus:bg-white transition-all font-medium" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-600 uppercase tracking-widest ml-1">Phone Number</label>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50">
                        <span className="text-[14px] font-bold text-gray-900">+91</span>
                      </div>
                      <input required type="tel" placeholder="Mobile Number" className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 text-[14px] text-gray-900 placeholder-gray-400 outline-none focus:border-[#191974] focus:bg-white transition-all font-medium" />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-[#ee2229] hover:bg-[#191974] text-white py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-[14px] tracking-widest active:scale-95 transition-all mt-4">
                    Enquire Now
                  </button>
                </form>
              </div> {/* END sidebar card */}

            </div> {/* END RIGHT COLUMN */}

          </div> {/* END main grid */}
        </div> {/* END container */}

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
              <TourMap tourTitle={tour.title} itinerary={itinerary} fullsize />
            </div>
          </div>
        )}

      </div>
    </>
  );
}