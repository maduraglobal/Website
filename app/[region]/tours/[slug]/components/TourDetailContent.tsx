"use client";

import React, { useState } from 'react';
import TourTabs from '@/app/components/tours/TourTabs';
import ItineraryTimeline from '@/app/components/tours/ItineraryTimeline';
import AccommodationTable from '@/app/components/tours/AccommodationTable';
import DeparturePricing from '@/app/components/tours/DeparturePricing';
import TourInclusions from '@/app/components/tours/TourInclusions';
import UpgradesSection from '@/app/components/tours/UpgradesSection';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Clock, MapPin, CheckCircle2, Star, Calendar, Users, Camera, ChevronRight,
  Plane, Check, X, Utensils, Phone, MessageCircle, Heart, Download, Mail, Share2,
  Map as MapIcon, HelpCircle, Bed, Bus, Shield, CloudRain, Navigation, FileText,
  CreditCard, AlertCircle, Zap, ArrowRight, ThumbsUp, Plus, Minus, ChevronDown,
  Heading4, Sparkles
} from 'lucide-react';
import { formatRegionalPrice } from '@/config/country';
import TourMap from '@/app/components/tours/TourMap';
import { createClient } from '@/utils/supabase/client';
import { Pencil } from 'lucide-react';
import PhonePrefixSelector from '@/app/components/ui/PhonePrefixSelector';


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
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
  const [detailsSubTab, setDetailsSubTab] = useState('accommodation');
  const [infoSubTab, setInfoSubTab] = useState('inclusions');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [travellerCount, setTravellerCount] = useState({ adults: 1, children: 0, infants: 0 });
  const [roomCount, setRoomCount] = useState(1);
  const [isTravellerMenuOpen, setIsTravellerMenuOpen] = useState(false);
  const [isEditingCity, setIsEditingCity] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [customDate, setCustomDate] = useState<{ date: string, month: string, year: string } | null>(null);
  const { openBooking } = useBooking();

  const updateTraveller = (type: keyof typeof travellerCount, delta: number) => {
    setTravellerCount(prev => {
      const newCount = {
        ...prev,
        [type]: Math.max(type === 'adults' ? 1 : 0, prev[type] + delta)
      };
      // Auto-update rooms: minimum rooms needed for adults + children
      const minRooms = Math.ceil((newCount.adults + newCount.children) / 2);
      if (roomCount < minRooms) {
        setRoomCount(minRooms);
      }
      return newCount;
    });
  };

  const cityList = tour.cities?.split('▶') || ["Hanoi", "Halong Bay", "Hoi An", "Da Nang"];
  const [selectedCity, setSelectedCity] = useState(cityList[0]);
  const [selectedDateId, setSelectedDateId] = useState('d1');

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedDateId('d1');
    setCustomDate(null);
    // Automatically select the first date for the new city
    if (mockDates[city] && mockDates[city].length > 0) {
      setSelectedDateId(mockDates[city][0].id);
    }
  };

  const supabase = createClient();

  const router = useRouter();

  const handleBookNow = () => {
    const searchParams = new URLSearchParams({
      tour: tour.slug || 'premium-package',
      city: selectedCity,
      date: `${selectedDateObject.date} ${selectedDateObject.month} ${selectedDateObject.year}`,
      price: selectedDateObject.price.toString(),
      savings: selectedDateObject.savings.toString(),
      rooms: roomCount.toString(),
      adults: travellerCount.adults.toString(),
      children: travellerCount.children.toString(),
      infants: travellerCount.infants.toString()
    });
    router.push(`/${region}/booking?${searchParams.toString()}`);
  };

  const handleEnquire = () => {
    window.dispatchEvent(new Event('openEnquiry'));
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

  const selectedDateObject = selectedDateId === 'custom' && customDate
    ? { ...customDate, price: tour.price || 105000, savings: 0 }
    : (mockDates[selectedCity]?.find((d: any) => d.id === selectedDateId) || mockDates[selectedCity]?.[0] || mockDates[cityList[0]][0]);

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
                      GROUP TOUR
                    </span>
                    <span className="text-gray-500 text-[12px] font-medium flex items-center gap-1 uppercase tracking-wider">
                      Experience
                    </span>
                    <span className="text-gray-500 text-[12px] font-medium flex items-center gap-1 uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3 text-green-500" /> Culture
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-900 leading-tight">
                    {tour.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-[13px] font-medium">
                    <span className="bg-gray-100 px-3 py-1.5 rounded-full text-gray-700">{tour.duration || "5 Days"}</span>
                    <span className="bg-gray-100 px-3 py-1.5 rounded-full text-gray-700">1 Country</span>
                    <span className="bg-gray-100 px-3 py-1.5 rounded-full text-gray-700 flex items-center gap-1">
                      4 Cities <HelpCircle className="w-3 h-3 text-gray-400" />
                    </span>

                    {/* Download Details Button */}
                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-2 bg-blue-50 text-[#191974] px-4 py-1.5 rounded-full text-[12px] font-bold hover:bg-blue-100 transition-all border border-blue-100 group"
                    >
                      <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                      Download Details
                    </button>

                    {/* Admin Quick Edit Button */}
                    {isAdmin && (
                      <Link
                        href="/admin/tours"
                        className="ml-auto flex items-center gap-2 bg-gray-900 text-white px-4 py-1.5 rounded-full text-[12px] font-bold hover:bg-black transition-all border border-gray-800 animate-bounce hover:animate-none"
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
                <div className="py-4 md:py-8 border-t border-gray-100">
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
                <TourTabs tabs={TABS} activeTab={activeTab} onTabChange={scrollToSection} />

                {/* Section: Itinerary (Day Wise) */}
                <section id="itinerary" className="pt-8 space-y-4">
                  {/* <div className="flex items-center justify-between border-b border-gray-50 pb-6">
                    <h2 className="text-[28px] font-bold text-gray-900">Itinerary <span className="text-gray-400 font-normal text-[14px] lowercase">(Day Wise)</span></h2>
                    <button className="text-[#191974] font-bold text-[14px] hover:underline flex items-center gap-1">View all days <ChevronRight className="w-4 h-4" /></button>
                  </div> */}

                  <div className="bg-orange-50/40 p-5 rounded-2xl border-white flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3 text-[14px] text-gray-700 flex-wrap">
                      <span className="px-3 py-1 bg-white rounded-lg border border-orange-200 text-orange-700 font-bold text-[12px]">Notice</span>
                      Viewing itinerary for <span className="font-bold underline decoration-dotted">{selectedDateObject.date} {selectedDateObject.month} {selectedDateObject.year} from {selectedCity}</span>
                      <button
                        onClick={() => scrollToSection('pricing')}
                        className="ml-4 text-[#191974] flex items-center gap-1 font-bold bg-white px-3 py-1 rounded-full border border-gray-200 hover:bg-gray-50 shadow-sm transition-all"
                      >
                        <Calendar className="w-3.5 h-3.5" /> Change Departure Date
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col xl:flex-row gap-6 md:gap-10 mt-6 md:mt-10">
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

                {/* Section: Details (Image 5 Style) */}
                <section id="details" className="pt-8 space-y-6">
                  <div>
                    <h2 className="font-bold text-gray-900">Tour details</h2>
                    <p className="text-[13px] font-normal text-gray-400 italic">Best facilities with no added cost.</p>
                  </div>

                  {/* Sub Tabs */}
                  <div className="grid grid-cols-3 bg-blue-50/50 rounded-xl overflow-hidden p-1 border border-blue-100">
                    <button
                      onClick={() => setDetailsSubTab('flight')}
                      className={`py-3 px-4 text-[13px] font-bold rounded-lg transition-all ${detailsSubTab === 'flight' ? 'bg-[#191974] text-white shadow-md' : 'text-gray-500 hover:bg-white/50'}`}
                    >
                      Flight Details
                    </button>
                    <button
                      onClick={() => setDetailsSubTab('accommodation')}
                      className={`py-3 px-4 text-[13px] font-bold rounded-lg transition-all ${detailsSubTab === 'accommodation' ? 'bg-[#191974] text-white shadow-md' : 'text-gray-500 hover:bg-white/50'}`}
                    >
                      Accommodation Details
                    </button>
                    <button
                      onClick={() => setDetailsSubTab('reporting')}
                      className={`py-3 px-4 text-[13px] font-bold rounded-lg transition-all ${detailsSubTab === 'reporting' ? 'bg-[#191974] text-white shadow-md' : 'text-gray-500 hover:bg-white/50'}`}
                    >
                      Reporting & Dropping
                    </button>
                  </div>

                  <div className="mt-4 md:mt-8">
                    {detailsSubTab === 'flight' && (
                      <div className="p-5 md:p-8 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-50 pb-2 md:pb-4">
                          <p className="font-bold text-gray-800">Flight Route</p>
                          <p className="font-bold text-[#191974]">Tentative Schedule</p>
                        </div>
                        <div className="space-y-2 md:space-y-4">
                          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                            <div>
                              <p className="text-[14px] font-bold">Mumbai &rarr; Hanoi</p>
                              <p className="text-[12px] text-gray-500">Vietjet Air | VJ896</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[14px] font-bold">23:30 - 06:00</p>
                              <p className="text-[12px] text-gray-500">Direct Flight</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {detailsSubTab === 'accommodation' && (
                      <div className="p-4 md:p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
                        <AccommodationTable />
                      </div>
                    )}

                    {detailsSubTab === 'reporting' && (
                      <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-6">
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <h4 className="font-bold text-[#191974]">Reporting Detail</h4>
                            <p className="text-[14px] text-gray-600">Reporting at Mumbai International Airport at 20:30 Hrs on Day 1.</p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-bold text-[#191974]">Dropping Detail</h4>
                            <p className="text-[14px] text-gray-600">Arriving at Mumbai International Airport at 22:30 Hrs on the last day.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* Section: Information (Image 5 Style) */}
                <section id="info" className="pt-8 space-y-6">
                  <div>
                    <h2 className="font-bold text-gray-900">Tour Information</h2>
                    <p className="text-[13px] font-normal text-gray-400 italic">Read this to prepare for your tour in the best way!</p>
                  </div>

                  {/* Sub Tabs */}
                  <div className="grid grid-cols-3 bg-blue-50/50 rounded-xl overflow-hidden p-1 border border-blue-100">
                    <button
                      onClick={() => setInfoSubTab('inclusions')}
                      className={`py-3 px-4 text-[13px] font-bold rounded-lg transition-all ${infoSubTab === 'inclusions' ? 'bg-[#191974] text-white shadow-md' : 'text-gray-500 hover:bg-white/50'}`}
                    >
                      Tour Inclusions
                    </button>
                    <button
                      onClick={() => setInfoSubTab('exclusions')}
                      className={`py-3 px-4 text-[13px] font-bold rounded-lg transition-all ${infoSubTab === 'exclusions' ? 'bg-[#191974] text-white shadow-md' : 'text-gray-500 hover:bg-white/50'}`}
                    >
                      Tour Exclusions
                    </button>
                    <button
                      onClick={() => setInfoSubTab('preparation')}
                      className={`py-3 px-4 text-[13px] font-bold rounded-lg transition-all ${infoSubTab === 'preparation' ? 'bg-[#191974] text-white shadow-md' : 'text-gray-500 hover:bg-white/50'}`}
                    >
                      Advance Preparation
                    </button>
                  </div>

                  <div className="mt-4 md:mt-8">
                    {infoSubTab === 'inclusions' && (
                      <div className="p-5 md:p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
                        <ul className="space-y-4">
                          {[
                            "To and fro economy class air travel for 'Mumbai to Mumbai Tour' guests as mentioned in the itinerary",
                            "Airfare and Airport taxes",
                            "Baggage Allowance as per the airline policy",
                            "Tour Manager Services throughout the tour",
                            "Accommodation in premium hotels on twin sharing basis",
                            "All meals as per the itinerary (Breakfast, Lunch, Dinner)"
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-4 text-[14px] text-gray-700 font-medium group">
                              <Check className="w-5 h-5 text-[#191974] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {infoSubTab === 'exclusions' && (
                      <div className="p-5 md:p-8 bg-white border border-red-50 rounded-2xl shadow-sm">
                        <ul className="space-y-4">
                          {[
                            "Anything not mentioned in the inclusions",
                            "Any personal expenses, tips, porterage etc.",
                            "Excess baggage charges",
                            "Optional tours and sightseeing",
                            "Travel Insurance (unless specified)"
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-4 text-[14px] text-gray-700 font-medium group">
                              <X className="w-5 h-5 text-[#ee2229] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {infoSubTab === 'preparation' && (
                      <div className="p-5 md:p-8 bg-white border border-orange-50 rounded-2xl shadow-sm space-y-6">
                        <p className="text-[14px] text-gray-700 leading-relaxed font-bold">Please pack comfortably and according to the weather updates in the Need to Know section.</p>
                        <ul className="text-[14px] text-gray-600 space-y-4 list-disc pl-5">
                          <li>Carry universal adapters for charging electronic devices.</li>
                          <li>Always keep a digital copy of your Passport and Visa on your phone.</li>
                          <li>Bring any required personal medication as local equivalents might be difficult to find.</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </section>

                {/* Section: Need to Know */}
                <section id="needtoknow" className="pt-12 md:pt-24 space-y-5 md:space-y-8">
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
                <section id="pricing" className="pt-12 md:pt-24 space-y-5 md:space-y-8">
                  <h2 className="text-[28px] font-bold text-gray-900">Departure and Pricing <span className="text-[14px] font-normal text-gray-400 ml-2 italic">Select your preferred date for the final price.</span></h2>
                  <DeparturePricing
                    cities={cityList}
                    dates={mockDates}
                    selectedCity={selectedCity}
                    selectedDateId={selectedDateId}
                    onCityChange={handleCityChange}
                    onDateChange={setSelectedDateId}
                    region={region}
                  />
                </section>

                <section id="policy" className="pt-8 space-y-6">
                  <h2 className="font-bold text-gray-900">Cancellation Policy &amp; Payment Terms</h2>

                  <div className="bg-blue-50/30 border border-blue-100 rounded-2xl p-5 flex flex-wrap items-center gap-6">
                    <div>
                      <p className="text-[14px] text-[#191974] font-bold">{selectedCity} departure, {selectedDateObject.date} {selectedDateObject.month} {selectedDateObject.year}.</p>
                    </div>
                    <button
                      onClick={() => scrollToSection('pricing')}
                      className="flex items-center gap-2 text-[13px] font-bold text-gray-700 border border-gray-200 bg-white px-4 py-2 rounded-full hover:border-[#191974] transition-all"
                    >
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
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden font-inter">
                <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <h3 className="text-[14px] font-bold text-[#191974] uppercase tracking-wider">Booking Summary</h3>
                </div>

                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-y-6">
                    <p className="text-[13px] text-gray-400 font-medium tracking-tight">Dept. city</p>
                    <div className="flex items-center justify-end">
                      {isEditingCity ? (
                        <div className="flex items-center gap-1">
                          <select
                            value={selectedCity}
                            onChange={(e) => {
                              handleCityChange(e.target.value);
                              setIsEditingCity(false);
                            }}
                            className="text-[13px] text-[#191974] font-bold bg-gray-50 border border-gray-200 rounded px-1 outline-none"
                            autoFocus
                          >
                            {cityList.map((city: string) => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                          <button onClick={() => setIsEditingCity(false)} className="text-gray-400">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setIsEditingCity(true)}
                          className="text-[13px] text-[#191974] font-bold text-left flex items-center justify-end gap-1 hover:text-[#ee2229] transition-colors group"
                        >
                          {selectedCity}
                          <Pencil className="w-3 h-3 text-gray-300 group-hover:text-[#ee2229]" />
                        </button>
                      )}
                    </div>

                    <p className="text-[13px] text-gray-400 font-medium tracking-tight">Dept. date</p>
                    <div className="flex items-center justify-end">
                      {isEditingDate ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="date"
                            onChange={(e) => {
                              const date = new Date(e.target.value);
                              if (!isNaN(date.getTime())) {
                                const day = date.getDate().toString().padStart(2, '0');
                                const month = date.toLocaleDateString('en-GB', { month: 'short' });
                                const year = date.getFullYear().toString();
                                setCustomDate({ date: day, month: month, year: year });
                                setSelectedDateId('custom');
                              }
                              setIsEditingDate(false);
                            }}
                            className="text-[13px] text-[#191974] font-bold bg-gray-50 border border-gray-200 rounded px-1 outline-none"
                            autoFocus
                          />
                          <button onClick={() => setIsEditingDate(false)} className="text-gray-400">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setIsEditingDate(true)}
                          className="text-[13px] text-[#191974] font-bold text-left flex items-center justify-end gap-1 hover:text-[#ee2229] transition-colors group"
                        >
                          {selectedDateObject.date} {selectedDateObject.month} {selectedDateObject.year}
                          <Pencil className="w-3 h-3 text-gray-300 group-hover:text-[#ee2229]" />
                        </button>
                      )}
                    </div>

                    <p className="text-[13px] text-gray-400 font-medium tracking-tight">Travellers</p>
                    <div className="relative">
                      <button
                        onClick={() => setIsTravellerMenuOpen(!isTravellerMenuOpen)}
                        className="flex items-center justify-end gap-1 text-[13px] text-[#191974] font-bold hover:text-[#ee2229] transition-all cursor-pointer group w-full"
                      >
                        {travellerCount.adults}A | {travellerCount.children}C | {travellerCount.infants}I
                        <ChevronDown className={`w-3.5 h-3.5 text-[#191974] transition-transform ${isTravellerMenuOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isTravellerMenuOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setIsTravellerMenuOpen(false)} />
                          <div className="absolute top-full right-0 mt-2 w-[240px] bg-white shadow-2xl rounded-2xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            {[
                              { label: 'Adults', sub: '12+ yrs', key: 'adults' },
                              { label: 'Children', sub: '2-12 yrs', key: 'children' },
                              { label: 'Infants', sub: 'Under 2 yrs', key: 'infants' }
                            ].map((type) => (
                              <div key={type.key} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                <div>
                                  <p className="text-[13px] font-bold text-[#191974]">{type.label}</p>
                                  <p className="text-[10px] text-gray-400">{type.sub}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); updateTraveller(type.key as any, -1); }}
                                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600 disabled:opacity-30"
                                    disabled={type.key === 'adults' ? travellerCount.adults <= 1 : (travellerCount as any)[type.key] <= 0}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="text-[13px] font-bold text-[#191974] w-4 text-center">{(travellerCount as any)[type.key]}</span>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); updateTraveller(type.key as any, 1); }}
                                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            ))}

                            {/* Room Selector in the same menu */}
                            <div className="flex items-center justify-between py-2 border-t border-gray-100 mt-2">
                              <div>
                                <p className="text-[13px] font-bold text-[#191974]">Rooms</p>
                                <p className="text-[10px] text-gray-400">Total rooms</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={(e) => { e.stopPropagation(); setRoomCount(Math.max(Math.ceil((travellerCount.adults + travellerCount.children) / 2), roomCount - 1)); }}
                                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600 disabled:opacity-30"
                                  disabled={roomCount <= Math.ceil((travellerCount.adults + travellerCount.children) / 2)}
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-[13px] font-bold text-[#191974] w-4 text-center">{roomCount}</span>
                                <button
                                  onClick={(e) => { e.stopPropagation(); setRoomCount(roomCount + 1); }}
                                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <p className="text-[13px] text-gray-400 font-medium tracking-tight">Rooms</p>
                    <button
                      onClick={() => setIsTravellerMenuOpen(true)}
                      className="text-[13px] text-[#191974] font-bold text-left flex items-center justify-end gap-1 hover:text-[#ee2229] transition-colors"
                    >
                      {roomCount} Room{roomCount > 1 ? 's' : ''}
                      <Pencil className="w-3 h-3 text-gray-300 ml-1" />
                    </button>
                  </div>

                  <div className="pt-6 border-t border-dashed border-gray-200">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="text-[14px] font-bold text-[#191974]">Basic Price</p>
                        <button onClick={() => scrollToSection('pricing')} className="text-[11px] text-[#191974] font-bold flex items-center gap-1 hover:underline mt-1 cursor-pointer">
                          View Pricing Table <ChevronRight className="w-2.5 h-2.5" />
                        </button>
                        <button onClick={() => scrollToSection('policy')} className="text-[11px] text-[#191974] font-bold flex items-center gap-1 hover:underline cursor-pointer">
                          Cancellation Policy <ChevronRight className="w-2.5 h-2.5" />
                        </button>
                      </div>
                      <p className="text-[26px] font-bold text-[#191974]">
                        {formatRegionalPrice(selectedDateObject.price, region)}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <div>
                        <p className="text-[13px] font-bold text-[#191974]">EMI Available</p>
                        <button onClick={() => scrollToSection('pricing')} className="text-[11px] text-[#191974] font-bold flex items-center gap-1 hover:underline cursor-pointer">
                          Check eligibility <ChevronRight className="w-2.5 h-2.5" />
                        </button>
                      </div>
                      <p className="text-[18px] font-bold text-[#191974]">
                        {formatRegionalPrice(Math.round(selectedDateObject.price / 12), region)}<span className="text-[12px] font-normal text-gray-400">/month</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      <a href="tel:+919092949494" className="text-[13px] font-bold text-[#191974] border-b-2 border-gray-200">+91 9092949494</a>
                    </div>
                  </div>
                </div>

                <div className="bg-[#ee2229] p-5 flex justify-center">
                  <button
                    onClick={handleBookNow}
                    className="w-full bg-white text-[#191974] py-4 rounded-xl font-bold text-[15px] hover:bg-[#191974] hover:text-white transition-all shadow-lg active:scale-95"
                  >
                    Book Online Now
                  </button>
                </div>
              </div>

              {/* Tailor-Made Holidays Card */}
              <div className="bg-linear-to-br from-[#191974] to-[#3f36d5] rounded-3xl p-8 text-white relative overflow-hidden group shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                    <Sparkles className="w-6 h-6 text-[#ee2229]" />
                  </div>
                  <h4 className="text-xl font-bold mb-3">Not what you're looking for?</h4>
                  <p className="text-sm text-white/70 mb-8 font-medium leading-relaxed">Our experts can craft a personalized itinerary just for you.</p>
                  
                  <Link 
                    href={`/${region}/customized-holidays`}
                    className="inline-flex items-center gap-2 bg-[#ee2229] text-white px-6 py-3 rounded-xl font-bold text-[12px] uppercase tracking-widest hover:bg-white hover:text-[#191974] transition-all"
                  >
                    Tailor-Made Holidays <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#191974] uppercase tracking-wider">Email</label>
                    <input type="email" placeholder="john@example.com" className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3.5 text-[14px] outline-none focus:border-[#ee2229] transition-all" />
                  </div> */}

              {/* <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#191974] uppercase tracking-wider">Phone Number</label>
                    <div className="flex gap-2">
                      <div className="w-24 bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3.5 text-[14px] font-bold text-[#191974] flex items-center justify-center gap-2 cursor-pointer">
                        <span>+91</span>
                        <ChevronRight className="w-3 h-3 rotate-90" />
                      </div>
                      <input type="text" placeholder="Mobile Number" className="flex-1 bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3.5 text-[14px] outline-none focus:border-[#ee2229] transition-all" />
                    </div>
                  </div> */}

              {/* <div className="pt-4 space-y-3">
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
                </div> */}

              {/* <div className="pt-4 flex items-center justify-center gap-6 text-[12px] text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-green-500" />
                    <span>Secure Payments</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-green-500" />
                    <span>Verified Agent</span>
                  </div>
                </div>
              </div> */}

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
                    <div className="flex rounded-xl border border-gray-200 bg-white overflow-hidden focus-within:border-[#ee2229] transition-all relative">
                      <PhonePrefixSelector
                        value={selectedCountryCode}
                        onChange={(code: string) => setSelectedCountryCode(code)}
                        variant="sidebar"
                      />
                      <input
                        type="text"
                        placeholder="Mobile No.*"
                        className="flex-1 px-4 py-4 text-[14px] outline-none placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <button onClick={handleEnquire} className="w-full bg-[#ee2229] text-white py-4 rounded-xl font-bold text-[15px] hover:bg-[#ee2229] transition-all shadow-lg  active:scale-95 flex items-center justify-center gap-2 cursor-pointer">
                    <Phone className="w-5 h-5" />
                    Request Call Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isMapOpen && (
          <div className="fixed inset-0 z-100 flex flex-col items-center justify-center p-4 md:p-12 pt-16 md:pt-12">
            <div
              className="absolute inset-0 bg-[#0a0a1a]/95 backdrop-blur-xl"
              onClick={() => setIsMapOpen(false)}
            />
            {/* Close Button Outside */}
            <button
              onClick={() => setIsMapOpen(false)}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-110 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center cursor-pointer transition-all border border-white/20"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <div className="relative w-full max-w-6xl aspect-4/5 sm:aspect-square md:aspect-21/9 bg-white rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl z-105">
              <TourMap tourTitle={tour.title} itinerary={itinerary} fullsize cities={tour.cities?.split('▶').map((c: string) => c.trim())} />
            </div>
          </div>
        )}

      </div>
    </>
  );
}