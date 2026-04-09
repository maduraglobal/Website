"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
  CheckCircle2, ChevronRight, ChevronDown, ChevronUp, Star, Phone, MessageCircle, Clock,
  MapPin, ShieldCheck, FileText, Globe, Building2, Check, ExternalLink, ChevronLeft, Users,
  Sparkles, Calendar, Zap
} from 'lucide-react';

// Helpers
const scrollToId = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const yOffset = -120;
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

import { getDestinationBySlug, VisaDestination } from '@/app/data/visaData';
import { formatRegionalPrice } from '@/config/country';
import DeparturePricing from '@/app/components/tours/DeparturePricing';

export default function DynamicVisaDetailPage({ params }: { params: Promise<{ region: string, slug: string }> }) {
  const resolvedParams = use(params);
  const { region, slug } = resolvedParams;

  const destination = getDestinationBySlug(slug);
  const destName = destination ? destination.name : (slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') : "Dubai");

  // Get current country data or fallback to a safe default
  const currentData = destination ? { ...destination, heroImg: destination.image } : {
    startingPrice: "4,500",
    partner: "Authorised Visa Agent",
    heroImg: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200",
    visaTypes: [{ name: "Tourist Visa", pop: true, pTime: "5-7 days", stay: "30 days", valid: "90 days", entry: "Single", fees: "4,500" }],
    attractions: [{ title: "Popular Landmarks", desc: "Explore the most iconic sites and cultural heritage of this beautiful destination." }],
    embassy: "Contact our support for the latest embassy address and submission details."
  };

  // State for interactive elements
  const [activeTab, setActiveTab] = useState("Types Of Visas");
  const [isSidebarLetUsCallOpen, setSidebarLetUsCallOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openDocs, setOpenDocs] = useState(true);

  // DEPARTURE PRICING DATA
  const pricingCities = ["All departures", "Mumbai", "Bangalore", "Chennai", "Cochin", "Hyderabad", "Indore", "Kolkata", "New Delhi"];
  const [selectedCity, setSelectedCity] = useState("All departures");
  const [selectedDateId, setSelectedDateId] = useState("d1");

  const pricingDates: Record<string, any[]> = {
    "All departures": [
      { id: "d1", date: "06", day: "SAT", month: "Jun", year: "2026", price: 525000, savings: 15000, isLowest: true },
      { id: "d2", date: "15", day: "THU", month: "Oct", year: "2026", price: 525000, savings: 15000 }
    ]
  };
  // Mocking cities
  pricingCities.forEach(city => {
    if (city !== "All departures") pricingDates[city] = pricingDates["All departures"];
  });

  // DATA
  const visaTypes = currentData.visaTypes;

  const faqs = [
    `How much does a ${destName} visa cost?`,
    `Is a ${destName} visa free for Indians?`,
    `How to apply for a ${destName} visa for Indian Citizens?`,
    `Can I get my ${destName} visa in 2 days?`,
    `What are ${destName} visa fees from India?`,
    `Can we go to ${destName} without a visa?`,
    `How much does a ${destName} trip cost from India?`,
    `How much is the 14 day tourist visa for ${destName === 'Dubai' ? 'UAE' : destName}?`,
    `Can I apply for a ${destName === 'Dubai' ? 'UAE' : destName} visa online?`,
    `How long does a ${destName} visa take?`,
    `Can we get a ${destName} visa on arrival?`,
    `What is the ${destName} Golden Visa price?`
  ];

  const experts = [
    { name: "Bhakti Khedekar", role: "Senior Visa Officer", exp: "6 yrs", img: "https://ui-avatars.com/api/?name=Bhakti+Khedekar&background=f3f4f6&color=191974" },
    { name: "Jay Surve", role: "Senior Visa Officer", exp: "6 yrs", img: "https://ui-avatars.com/api/?name=Jay+Surve&background=f3f4f6&color=191974" },
    { name: "Raj Bhatt", role: "Senior Visa Officer", exp: "5 yrs", img: "https://ui-avatars.com/api/?name=Raj+Bhatt&background=f3f4f6&color=191974" }
  ];

  const attractions = currentData.attractions;

  // STICKY TABS
  const tabs = ["Types Of Visas", "Documents", "Process", "Why Choose Us", "Sample Visa", "FAQs", "Embassy", "Visit Us"];

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#333] text-[14px] leading-relaxed">

      {/* ===== HERO SECTION ===== */}
      <section className="w-full bg-linear-to-r from-[#191974] to-[#2a2a8a] text-white py-8 px-4 shadow-inner relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="text-[13px] font-medium mb-6 flex items-center gap-2">
            <Link href={`/${region}`} className="text-white hover:text-white/80">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <Link href={`/${region}/visa`} className="text-[#ee2229] hover:underline">Visa</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="text-[#ee2229]">{destName} Visa</span>
          </div>

          <h1 className="text-[32px] md:text-[56px]  mb-4 leading-tight drop-shadow-md">
            {destName} Visa Online for Indians
          </h1>

          <div className="inline-flex bg-[#12803c] text-white font-bold px-4 py-1.5 rounded text-[13px] items-center gap-1.5 mb-6 shadow-md">
            <CheckCircle2 className="w-4 h-4" /> 99.2% Visas Approved before Time
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            <div>
              <p className="text-[13px] text-white/70  tracking-widest font-bold mb-1">Processing time</p>
              <p className="text-[18px] font-bold">{visaTypes[0]?.pTime || 'Up to 5 days'}</p>
            </div>
            <div className="hidden sm:block w-px bg-white/20 h-10 mt-1"></div>
            <div>
              <p className="text-[13px] text-white/70  tracking-widest font-bold mb-1">Starting from</p>
              <p className="text-[18px] font-bold">{formatRegionalPrice(currentData.startingPrice, region)}/â€“</p>
            </div>
          </div>

          <div className="inline-block bg-[#111155] border border-white/20 rounded-full px-5 py-2 text-[13px] font-medium shadow-md">
            {currentData.partner}
          </div>
        </div>

        {/* Abstract Hero Background (Fallback if image not loading) */}
        <div className="absolute top-0 right-0 bottom-0 w-1/2 opacity-20 pointer-events-none" style={{ backgroundImage: `url('${currentData.heroImg}')`, backgroundSize: 'cover', backgroundPosition: 'center', maskImage: 'linear-gradient(to right, transparent, black)' }}></div>
      </section>

      {/* ===== STICKY NAV BAR ===== */}
      <div className="sticky top-[74px] z-40 bg-[#191974] text-white shadow-xl w-full border-b border-white/10 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex gap-8 items-center min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                scrollToId(tab.replace(/\s+/g, '-').toLowerCase());
              }}
              className={`py-4 text-[14px] font-medium whitespace-nowrap transition-colors relative ${activeTab === tab ? 'text-white' : 'text-white/60 hover:text-white'}`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#ee2229]"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ===== MAIN CONTENT LAYOUT ===== */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-8 items-start relative">

        {/* LEFT CONTENT COLUMN (70%) */}
        <div className="w-full lg:w-[70%] flex flex-col gap-6 pb-12">

          {/* 1. Guarantee Banner */}
          <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200">
            <div className="bg-linear-to-r from-indigo-900 to-blue-700 p-5 flex items-center gap-4 text-white">
              <div className="bg-[#fcb900] text-indigo-900 p-2 rounded-full shadow-lg">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-[18px] font-bold leading-tight">Guaranteed 100% fee refund if Visa Rejected</h3>
                <p className="text-[13px] opacity-90">Terms and conditions apply.</p>
              </div>
            </div>
          </div>

          {/* 2. Types of Visas */}
          <div id="types-of-visas" className="pt-2">
            <h2 className="text-[22px] font-medium text-[#191974] mb-6 border-b border-gray-300 pb-2">Types of {destName} Visas for Indians</h2>

            {/* Departure Pricing Integration */}
            <div className="mb-10">
              <p className="text-gray-500 italic mb-4">As seats fill, prices increase! So book today!</p>
              <DeparturePricing
                cities={pricingCities}
                dates={pricingDates}
                selectedCity={selectedCity}
                selectedDateId={selectedDateId}
                onCityChange={setSelectedCity}
                onDateChange={setSelectedDateId}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visaTypes.map((v, i) => (
                <div key={i} className="bg-white rounded-[24px] border border-gray-100 shadow-[0_8px_30px_rgba(25,25,116,0.04)] p-6 hover:shadow-[0_20px_50px_rgba(25,25,116,0.12)] transition-all duration-500 group relative flex flex-col">
                  {v.pop && (
                    <div className="absolute -top-3 right-6 bg-linear-to-r from-amber-400 to-orange-500 text-white text-[10px]  px-4 py-1.5 rounded-full shadow-lg shadow-amber-500/20 flex items-center gap-1.5 z-10 uppercase tracking-widest">
                      <Sparkles className="w-3.5 h-3.5" /> Popular Choice
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-[19px]  text-[#191974] tracking-tight group-hover:text-[#ee2229] transition-colors">{v.name}</h3>
                    <div className="w-10 h-1 bg-gray-100 rounded-full mt-2 group-hover:w-16 transition-all duration-500" />
                  </div>

                  <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#191974] flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400  uppercase tracking-widest">Processing</p>
                        <p className="text-[13px] font-bold text-[#191974]">{v.pTime}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400   tracking-widest">Stay Period</p>
                        <p className="text-[13px] font-bold text-[#191974]">{v.stay}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400  uppercase tracking-widest">Validity</p>
                        <p className="text-[13px] font-bold text-[#191974]">{v.valid}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400   tracking-widest">Entry Type</p>
                        <p className="text-[13px] font-bold text-[#191974]">{v.entry}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-gray-400  uppercase tracking-widest mb-1">Starting From</p>
                      <p className="text-[22px]  text-[#191974] leading-none">
                        {formatRegionalPrice(v.fees, region)}<span className="text-sm font-bold text-gray-400">/â€“</span>
                      </p>
                    </div>
                    <button
                      className="book-now-btn bg-[#191974] hover:bg-[#ee2229] text-white px-6 py-3 rounded-xl  text-[12px]  tracking-widest transition-all shadow-xl shadow-blue-900/10 active:scale-95 flex items-center gap-2 group/btn"
                      data-package={`${destName} ${v.name}`}
                      data-price={v.fees}
                      data-original-price={v.fees ? (parseInt(v.fees.replace(/,/g, '')) * 1.5).toLocaleString('en-IN') : "0"}
                    >
                      Apply Now
                      <Zap className="w-3.5 h-3.5 group-hover/btn:fill-current" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Google Reviews Banner */}
          <div className="bg-teal-50 border border-teal-100 p-5 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-[16px] font-bold text-[#191974]">Madura Travel Service â€“ Reviews</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold text-teal-800">EXCELLENT</span>
                <div className="flex text-yellow-500"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></div>
              </div>
            </div>
            <div className="text-[13px] text-teal-700 font-medium bg-white px-4 py-2 border border-teal-200 rounded">
              <strong>821</strong> reviews on Google
            </div>
          </div>

          {/* 4. Visa Price Includes */}
          <div>
            <h2 className="text-[20px] font-medium text-[#191974] mb-4">{destName} Visa Price Includes</h2>
            <ul className="space-y-3 mb-4">
              {[
                "Consulate application fees",
                "Madura travel service service charges",
                "All taxes included"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3 h-3" strokeWidth={3} /></div>
                  <span className="text-[15px]">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-600 leading-relaxed text-[14.5px]">
              You can apply for your 96 hours, 14 days, 30 days or 60 days {destName} visa from any city in India. The process remains standard and entirely online for maximum convenience.
            </p>
          </div>

          {/* 5. Documents Required */}
          <div id="documents" className="pt-4">
            <h2 className="text-[22px] font-medium text-[#191974] mb-6 border-b border-gray-300 pb-2">Documents Required for {destName} Visa</h2>

            <div className="border border-amber-200 rounded-lg overflow-hidden bg-amber-50/30">
              <button onClick={() => setOpenDocs(!openDocs)} className="w-full text-left bg-amber-100 hover:bg-amber-200 transition-colors px-5 py-4 flex justify-between items-center text-[#191974] font-bold text-[15px]">
                Must have Documents for {destName} Entry Visa:
                {openDocs ? <ChevronUp className="w-5 h-5 text-[#ee2229]" /> : <ChevronDown className="w-5 h-5 text-[#ee2229]" />}
              </button>
              {openDocs && (
                <div className="p-6 bg-white border-t border-amber-200">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="bg-[#ee2229] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0 mt-0.5">1</span>
                      <span className="text-[14.5px]">Scanned colour copy of first and last page of valid Passport</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-[#ee2229] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0 mt-0.5">2</span>
                      <span className="text-[14.5px]">Scanned colour copy of passport size photograph with white background</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-[#ee2229] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0 mt-0.5">3</span>
                      <span className="text-[14.5px]">Confirmed return flight tickets</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-[#ee2229] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0 mt-0.5">4</span>
                      <span className="text-[14.5px]">Hotel booking details</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* 6. Experts Team */}
          <div className="pt-4">
            <div className="flex justify-between items-end mb-6 border-b border-gray-300 pb-2">
              <h2 className="text-[22px] font-medium text-[#191974]">Meet Our Team Of Visa Experts</h2>
              <div className="flex gap-2 pb-2">
                <button className="w-8 h-8 rounded border border-[#191974] text-[#191974] flex items-center justify-center hover:bg-[#191974] hover:text-white transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded bg-[#191974] text-white flex items-center justify-center hover:bg-[#111155] transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x">
              {experts.map((exp, i) => (
                <div key={i} className="min-w-[200px] border border-gray-200 rounded-lg p-5 flex flex-col items-center text-center bg-white shadow-sm snap-start">
                  <img src={exp.img} className="w-16 h-16 rounded-full border-2 border-gray-100 mb-3" />
                  <h4 className="font-bold text-[#191974] text-[15px]">{exp.name}</h4>
                  <p className="text-gray-500 text-[13px] font-medium leading-tight my-1">{exp.role}</p>
                  <p className="text-[#ee2229] text-[12px] font-bold  tracking-wide bg-red-50 px-2 py-0.5 rounded mt-2">{exp.exp} Experience</p>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Sample Visa */}
          <div id="sample-visa" className="pt-4">
            <h2 className="text-[22px] font-medium text-[#191974] mb-6 border-b border-gray-300 pb-2">{destName} Sample Visa</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden group">
              <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-50 flex items-center justify-center p-8">
                <img
                  src="/images/sample-visa.png"
                  alt={`${destName} Sample Visa`}
                  className="max-w-full max-h-full object-contain shadow-2xl rounded-lg transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full border border-gray-100 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-[10px]  text-[#191974]  tracking-widest">Official Reference</span>
                </div>
              </div>
              <div className="p-6 border-t border-gray-50 bg-gray-50/30">
                <p className="text-[14px] text-gray-600 leading-relaxed italic">
                  *This is a reference document to show the format of a processed {destName} Tourist Visa. Your actual visa will contain your personal details and specific validity dates as issued by the immigration authorities.
                </p>
              </div>
            </div>
          </div>

          {/* 8. FAQs */}
          <div id="faqs" className="pt-4">
            <h2 className="text-[22px] font-medium text-[#191974] mb-6 border-b border-gray-300 pb-2">{destName} Visa FAQs</h2>
            <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
              {faqs.map((q, i) => (
                <div key={i} className="border-b border-gray-200 last:border-b-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left px-5 py-4 flex justify-between items-center text-[15px] hover:bg-gray-50 transition-colors"
                  >
                    <span className={`font-medium ${openFaq === i ? 'text-[#ee2229]' : 'text-[#333]'}`}>{q}</span>
                    <span className="text-[#ee2229] text-[20px]  leading-none">{openFaq === i ? '-' : '+'}</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-gray-600 text-[14.5px]">
                      Yes, absolutely. The entire process for the {destName} visa is straightforward and handled efficiently by our team. Prices and exact turnaround times vary depending on the specific visa tier you select! Contact our support for customized assistance.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 8. Why Choose Us */}
          <div id="why-choose-us" className="pt-4">
            <h2 className="text-[22px] font-medium text-[#191974] mb-6 border-b border-gray-300 pb-2">Why Choose Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10">
              {[
                { icon: Globe, t: "Visa services for all countries" },
                { icon: Star, t: "40+ years of experience in visa processing" },
                { icon: CheckCircle2, t: "99.8% visa success rate" },
                { icon: Users, t: "Start-to-end visa assistance" }
              ].map((u, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#191974]/10 text-[#191974] flex items-center justify-center shrink-0">
                    <u.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[14.5px] font-medium">{u.t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 9. Simple Steps */}
          <div id="process" className="bg-sky-50 p-8 rounded-xl border border-sky-100 pt-4">
            <h2 className="text-[22px] font-medium text-[#191974] mb-4">Simple Steps to Get a {destName} Visa</h2>
            <p className="text-[14.5px] text-gray-700 mb-6">Securing a visa shouldn't be complicated. Just fulfill the minimum requirements, provide accurate details, and let our experts maneuver the embassy processing on your behalf.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-[16px] font-bold text-[#191974] mb-3">{destName} Visa Requirements</h3>
                <ul className="space-y-2 text-[14px]">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#ee2229] rounded-full"></div> Valid passport & entry visa</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#ee2229] rounded-full"></div> Sufficient funds</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#ee2229] rounded-full"></div> Accurate declarations</li>
                </ul>
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-[#191974] mb-3">Travel Checklist</h3>
                <ul className="space-y-2 text-[14px]">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#191974] rounded-full"></div> Passport with 6 months validity</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#191974] rounded-full"></div> Valid {destName} Visa</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#191974] rounded-full"></div> Return documentation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 10. Tourist Attractions */}
          <div className="pt-4">
            <h2 className="text-[22px] font-medium text-[#191974] mb-6 border-b border-gray-300 pb-2">{destName} Tourist Attractions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {attractions.map((att, i) => (
                <div key={i} className="flex gap-4">
                  <div className="text-[#ee2229] text-[24px]  leading-none">{i + 1}.</div>
                  <div>
                    <h3 className="font-bold text-[#191974] text-[16px] mb-1">{att.title}</h3>
                    <p className="text-[13px] text-gray-600">{att.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 11. Terms & Conditions */}
          <div className="pt-4 border-t border-gray-200">
            <h2 className="text-[18px] font-bold text-gray-500 mb-4">Terms & Conditions</h2>
            <ol className="list-decimal pl-5 space-y-2 text-[13px] text-gray-500 text-justify">
              <li>Visa issuance is subject to the sole discretion of the Embassy/Consulate.</li>
              <li>The Processing time is strictly dictated by the immigration authorities.</li>
              <li>Fees once paid are entirely non-refundable outside of explicit guarantee frameworks.</li>
              <li>Madura travel service solely acts as a processing facilitator to simplify applications.</li>
              <li>Any additional document demands from immigration must be fulfilled promptly.</li>
              <li>Price notices are subject to immediate regulatory changes without prior notice.</li>
              <li>Any falsified documents hold the applicant entirely liable.</li>
              <li>Visitor visas strictly prohibit any form of paid employment or work.</li>
              <li>Overstaying visa durations can result in severe legal fines and permanent bans.</li>
              <li>Health and travel insurance is strongly recommended and may be obligatory.</li>
              <li>Read complete legal terms on our main policy page before finalizing bookings.</li>
            </ol>
          </div>

          {/* 12. Visit Us + Embassy */}
          <div id="visit-us" className="pt-4">
            <h2 className="text-[22px] font-medium text-[#191974] mb-6 border-b border-gray-300 pb-2">Visit Us & Embassy</h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-3">
                {['Mumbai Office', 'Delhi Branch', 'Chennai Outlet'].map((off) => (
                  <div key={off} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center bg-white shadow-sm cursor-pointer hover:border-[#191974]">
                    <span className="font-bold text-[#191974] flex items-center gap-3"><Building2 className="w-4 h-4 text-gray-400" /> {off}</span>
                    <span className="text-[#191974] font-bold text-[18px]">+</span>
                  </div>
                ))}
              </div>
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-[#191974] mb-4 flex items-center gap-2"><Globe className="w-5 h-5 text-[#ee2229]" /> {destName} Embassy Setup</h3>
                <p className="text-[14px] leading-relaxed text-gray-600 whitespace-pre-line">
                  {currentData.embassy}
                </p>
              </div>
            </div>
          </div>

          {/* 13. Other Types of Visas */}
          <div className="bg-[#FAF8F5] p-8 rounded-xl border border-gray-200 mt-6 overflow-hidden">
            <h2 className="text-[20px] font-medium text-[#191974] mb-6">Other Types of {destName} Visas</h2>
            <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x pb-2">
              {[
                { t: "96Hours", p: "2,999" },
                { t: "14Days", p: "7,199" },
                { t: "30Days", p: "7,499" },
                { t: "60Days", p: "13,499" }
              ].map((o, i) => (
                <div key={i} className="min-w-[200px] bg-white border border-gray-200 p-4 rounded-lg shadow-sm snap-start hover:shadow-md transition-shadow cursor-pointer">
                  <p className="font-bold text-[14.5px] text-gray-800 mb-2">{o.t} {destName} Visa</p>
                  <p className="text-[16px]  text-[#191974]">{formatRegionalPrice(o.p, region)}/â€“</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT STICKY SIDEBAR (30%) */}
        <div className="w-full lg:w-[30%] lg:sticky lg:top-[140px] flex flex-col gap-5">

          <div id="apply-online" className="bg-[#191974] rounded-lg shadow-xl overflow-hidden border border-[#2a2a8a]">
            {/* Notice Bar */}
            <div className="bg-[#facc15] text-[#191974] text-center font-bold text-[13px] py-2 px-3">
              â± It takes less than 2 minutes to Apply
            </div>

            {/* Apply Form */}
            <div className="p-6 text-white">
              <h3 className="text-[18px] font-medium mb-5">Apply Online</h3>
              <form className="flex flex-col gap-4 text-[#333]">
                <input type="email" placeholder="Email ID*" className="w-full px-4 py-3 rounded bg-white border-0 text-[14px] outline-none" />
                <input type="tel" placeholder="Contact No*" className="w-full px-4 py-3 rounded bg-white border-0 text-[14px] outline-none" />
                <select className="w-full px-4 py-3 rounded bg-white border-0 text-[14px] outline-none text-gray-600 appearance-none">
                  <option value="">Select Visa Type*</option>
                  {visaTypes.map((v, i) => <option key={i}>{v.name}</option>)}
                </select>
                <select className="w-full px-4 py-3 rounded bg-white border-0 text-[14px] outline-none text-gray-600 appearance-none">
                  <option value="">No of Travellers*</option>
                  <option>1 Traveller</option>
                  <option>2 Travellers</option>
                  <option>3 Travellers</option>
                </select>

                <div className="flex justify-between items-center text-white mt-2 border-t border-white/20 pt-4">
                  <span className="text-[15px] font-medium">Total Price:</span>
                  <span className="text-[22px] ">â‚¹0</span>
                </div>

                <button
                  type="button"
                  className="book-now-btn w-full bg-[#ee2229] hover:bg-[#d11e24] text-white font-bold text-[15px] py-4 rounded transition-colors shadow-lg shadow-red-500/20 mt-2 tracking-wide"
                  data-package={`${destName} Visa Application`}
                  data-price={currentData.startingPrice}
                  data-original-price={parseInt(currentData.startingPrice.replace(/,/g, '')) * 1.5 ? (parseInt(currentData.startingPrice.replace(/,/g, '')) * 1.5).toLocaleString('en-IN') : "0"}
                >
                  APPLY NOW
                </button>
              </form>
            </div>
          </div>

          {/* Support Actions */}
          <div className="flex flex-col gap-3">

            <button
              onClick={() => setSidebarLetUsCallOpen(!isSidebarLetUsCallOpen)}
              className="flex justify-between items-center bg-[#191974] text-white p-4 rounded-lg font-medium hover:bg-[#111155] transition-colors border border-[#2a2a8a] shadow-md"
            >
              <span>Let us Call You</span>
              <span className="text-[#ee2229] font-bold text-[20px] leading-none">{isSidebarLetUsCallOpen ? '-' : '+'}</span>
            </button>
            {isSidebarLetUsCallOpen && (
              <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                <p className="text-[13px] text-gray-500 mb-3">Leave your details and our experts will reach out instantly.</p>
                <input type="tel" placeholder="Your Phone Number" className="w-full border border-gray-300 p-2 text-[13px] rounded mb-3" />
                <button className="w-full bg-[#191974] text-white py-2 font-bold text-[13px] rounded">Request Callback</button>
              </div>
            )}

            <a href="#" className="flex items-center gap-4 bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:border-green-500 group">
              <div className="bg-green-100 text-green-600 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p className="text-[12px] text-gray-500  font-bold tracking-wider">Visa on WhatsApp</p>
                <p className="text-[16px] font-bold text-[#191974]">+91 8879008992</p>
              </div>
            </a>

            <a href="tel:02240666444" className="flex items-center gap-4 bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:border-[#191974] group">
              <div className="bg-blue-50 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p className="text-[12px] text-gray-500  font-bold tracking-wider">Call us on</p>
                <p className="text-[16px] font-bold text-[#191974]">022 4066 6444</p>
              </div>
            </a>

            <div className="flex items-center gap-4 bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
              <div className="bg-orange-50 text-orange-500 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[12px] text-gray-500  font-bold tracking-wider">Timing</p>
                <p className="text-[16px] font-bold text-[#191974]">9am to 9pm</p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ===== LOCAL FOOTER APPEND ===== */}
      {/* Appended specifically because customer requested footer details explicitly for this view, 
          although layout.tsx handles full footer. This serves as a minimal directory footer. */}
      <footer className="bg-[#191974] text-white pt-12 pb-6 border-t border-white/10 mt-10">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex flex-wrap gap-x-12 gap-y-6 lg:justify-between border-b border-white/10 pb-8 mb-6 text-[13px]">
            <div className="min-w-[150px]">
              <h4 className="text-[#ee2229] font-bold  tracking-widest mb-3 text-[12px]">International Tour Packages</h4>
              <p className="text-white/60 space-x-2 leading-loose">
                <a className="hover:text-white" href="#">Dubai</a> <span className="text-white/20">|</span> <a className="hover:text-white" href="#">Singapore</a> <span className="text-white/20">|</span> <a className="hover:text-white" href="#">Europe</a> <span className="text-white/20">|</span> <a className="hover:text-white" href="#">Thailand</a>
              </p>
            </div>
            <div className="min-w-[150px]">
              <h4 className="text-[#ee2229] font-bold  tracking-widest mb-3 text-[12px]">Domestic Tour Packages</h4>
              <p className="text-white/60 space-x-2 leading-loose">
                <a className="hover:text-white" href="#">Kerala</a> <span className="text-white/20">|</span> <a className="hover:text-white" href="#">Rajasthan</a> <span className="text-white/20">|</span> <a className="hover:text-white" href="#">Kashmir</a> <span className="text-white/20">|</span> <a className="hover:text-white" href="#">Goa</a>
              </p>
            </div>
            <div className="min-w-[150px]">
              <h4 className="text-[#ee2229] font-bold  tracking-widest mb-3 text-[12px]">Visa</h4>
              <p className="text-white/60 space-x-2 leading-loose">
                <a className="hover:text-white" href="#">Dubai Visa</a> <span className="text-white/20">|</span> <a className="hover:text-white" href="#">Singapore Visa</a> <span className="text-white/20">|</span> <a className="hover:text-white" href="#">US Visa</a>
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-4 opacity-70">
              <span className="font-bold border border-white/30 px-3 py-1 rounded text-[11px] ">VISA</span>
              <span className="font-bold border border-white/30 px-3 py-1 rounded text-[11px] ">Mastercard</span>
              <span className="font-bold border border-white/30 px-3 py-1 rounded text-[11px] ">Amex</span>
              <span className="font-bold border border-white/30 px-3 py-1 rounded text-[11px] ">Diners Club</span>
              <span className="font-bold border border-white/30 px-3 py-1 rounded text-[11px] ">RuPay</span>
            </div>
            <div className="text-[12px] opacity-40 text-center md:text-right">
              Â© 2025 www.antigravitytravels.com All Rights Reserved
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
