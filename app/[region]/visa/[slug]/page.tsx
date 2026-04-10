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
    <div className="min-h-screen bg-white font-inter text-black text-[14px]">

      {/* ===== HERO SECTION ===== */}
      <section className="w-full bg-[#191974] text-white py-12 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="text-[12px] font-bold mb-8 flex items-center gap-2 tracking-widest opacity-80">
            <Link href={`/${region}`} className="text-white hover:text-[#ee2229] transition-colors">HOME</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-30" />
            <Link href={`/${region}/visa`} className="text-white hover:text-[#ee2229] transition-colors">VISA</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-30" />
            <span className="text-[#ee2229]">{destName.toUpperCase()} VISA</span>
          </div>

          <h1 className="text-[32px] font-black leading-tight mb-4 max-w-2xl">
            {destName} Visa Online for Indian Citizens
          </h1>

          <div className="inline-flex bg-[#12803c] text-white font-bold px-4 py-1.5 rounded-full text-[12px] items-center gap-2 mb-8 shadow-xl">
            <CheckCircle2 className="w-4 h-4" /> 99.2% Approval Rate
          </div>

          <div className="flex flex-col sm:flex-row gap-12 mb-10">
            <div className="space-y-1">
              <p className="text-[11px] text-white/50 uppercase tracking-[0.2em] font-black">Processing time</p>
              <p className="text-[20px] font-bold">{visaTypes[0]?.pTime || 'Up to 5 days'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] text-white/50 uppercase tracking-[0.2em] font-black">Starting from</p>
              <p className="text-[20px] font-bold text-[#ee2229]">{formatRegionalPrice(currentData.startingPrice, region)}</p>
            </div>
          </div>

          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 text-[12px] font-bold tracking-widest">
            {currentData.partner.toUpperCase()}
          </div>
        </div>

        <div className="absolute top-0 right-0 bottom-0 w-1/2 opacity-30 pointer-events-none" style={{ backgroundImage: `url('${currentData.heroImg}')`, backgroundSize: 'cover', backgroundPosition: 'center', maskImage: 'linear-gradient(to right, transparent, black)' }}></div>
      </section>

      {/* ===== STICKY NAV BAR ===== */}
      <div className="sticky top-[74px] z-40 bg-white border-b border-gray-100 shadow-sm overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex gap-8 items-center min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                scrollToId(tab.replace(/\s+/g, '-').toLowerCase());
              }}
              className={`py-5 text-[14px] font-bold whitespace-nowrap transition-all relative ${activeTab === tab ? 'text-[#191974]' : 'text-gray-400 hover:text-[#191974]'}`}
            >
              {tab}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-[#ee2229] transition-transform duration-300 ${activeTab === tab ? 'scale-x-100' : 'scale-x-0'}`}></div>
            </button>
          ))}
        </div>
      </div>

      {/* ===== MAIN CONTENT LAYOUT ===== */}
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-16 items-start">

        {/* LEFT CONTENT COLUMN */}
        <div className="w-full lg:w-[68%] flex flex-col gap-12">

          {/* 1. Guarantee Banner */}
          <div className="rounded-[24px] overflow-hidden bg-[#191974] p-8 text-white relative flex flex-col sm:flex-row items-center gap-6 shadow-2xl">
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md shrink-0">
              <ShieldCheck className="w-10 h-10 text-[#ee2229]" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-[20px] font-bold mb-1">Guaranteed 100% Fee Refund</h3>
              <p className="text-[14px] text-white/70">Automatic refund if your visa application is rejected by immigration.</p>
            </div>
          </div>

          {/* 2. Types of Visas */}
          <div id="types-of-visas" className="space-y-8">
            <h2 className="text-[26px] font-bold text-[#191974]">Types of {destName} Visas</h2>

            <div className="bg-gray-50/50 p-6 rounded-[24px] border border-gray-100 mb-10">
              <p className="text-[#ee2229] font-bold text-[13px] tracking-widest mb-6 uppercase">Current Pricing Estimates</p>
              <DeparturePricing
                cities={pricingCities}
                dates={pricingDates}
                selectedCity={selectedCity}
                selectedDateId={selectedDateId}
                onCityChange={setSelectedCity}
                onDateChange={setSelectedDateId}
                region={region}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visaTypes.map((v, i) => (
                <div key={i} className="bg-white rounded-[24px] border border-gray-100 p-8 hover:shadow-2xl hover:border-red-100 transition-all group flex flex-col relative overflow-hidden">
                  {v.pop && (
                    <div className="absolute top-0 right-0 bg-[#ee2229] text-white text-[10px] font-bold px-6 py-1.5 rounded-bl-2xl uppercase tracking-widest">
                      Popular
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-[22px] font-bold text-[#191974] group-hover:text-[#ee2229] transition-colors">{v.name}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-8 mb-10">
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Processing</p>
                      <div className="flex items-center gap-2 text-[#191974] font-bold">
                        <Clock className="w-4 h-4 text-[#ee2229]" />
                        <span>{v.pTime}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Validity</p>
                      <div className="flex items-center gap-2 text-[#191974] font-bold">
                        <ShieldCheck className="w-4 h-4 text-[#ee2229]" />
                        <span>{v.valid}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-8 border-t border-gray-50 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Fee Starts</p>
                      <p className="text-[28px] font-black text-[#191974] leading-none">
                        {formatRegionalPrice(v.fees, region)}
                      </p>
                    </div>
                    <button
                      className="bg-[#191974] text-white px-8 py-3.5 rounded-full font-bold text-[12px] tracking-widest hover:bg-[#ee2229] transition-all shadow-xl active:scale-95 flex items-center gap-2"
                      data-package={`${destName} ${v.name}`}
                      data-price={v.fees}
                    >
                      APPLY NOW
                      <Zap className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Social Proof */}
          <div className="bg-[#191974]/5 border border-[#191974]/10 p-8 rounded-[32px] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-full p-2.5 flex items-center justify-center shadow-sm">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" className="w-full" alt="Google" />
              </div>
              <div>
                <p className="text-[16px] font-bold text-[#191974]">Madura Travel Reviews</p>
                <div className="flex text-amber-500 gap-0.5 mt-0.5"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></div>
              </div>
            </div>
            <div className="text-[14px] font-bold text-[#191974] bg-white px-6 py-2.5 rounded-full border border-gray-200 shadow-sm">
              Rated <strong className="text-[#ee2229]">4.9/5</strong> by 821+ travelers
            </div>
          </div>

          {/* 4. Documents Required */}
          <div id="documents" className="space-y-8">
            <h2 className="text-[26px] font-bold text-[#191974]">Documentation Checklist</h2>

            <div className="grid grid-cols-1 gap-4">
              {[
                "Scanned colour copy of first & last page of Passport",
                "Passport size photo with white background",
                "Confirmed return flight tickets",
                "Hotel booking details"
              ].map((doc, i) => (
                <div key={i} className="flex items-center gap-5 bg-white border border-gray-100 p-6 rounded-2xl hover:border-red-100 transition-all shadow-sm group">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#191974] font-black pointer-events-none group-hover:bg-[#ee2229] group-hover:text-white transition-colors">
                    {i + 1}
                  </div>
                  <span className="text-[15px] font-bold text-[#191974]">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. FAQs */}
          <div id="faqs" className="space-y-8">
            <h2 className="text-[26px] font-bold text-[#191974]">Common Questions</h2>
            <div className="space-y-3">
              {faqs.slice(0, 6).map((q, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-[12px] overflow-hidden hover:border-[#191974]/30 transition-all">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left px-8 py-5 flex justify-between items-center text-[15px] group"
                  >
                    <span className={`font-bold transition-colors ${openFaq === i ? 'text-[#ee2229]' : 'text-[#191974] group-hover:text-[#ee2229]'}`}>{q}</span>
                    {openFaq === i ? <ChevronUp className="w-5 h-5 text-[#ee2229]" /> : <ChevronDown className="w-5 h-5 text-gray-300" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-8 pb-6 text-gray-500 font-medium leading-relaxed border-t border-gray-50 pt-4">
                      Applying through Madura Travel ensures professional review of your documents, significantly reducing rejection risks. Our experts manage the entire submission process, providing regular status updates.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-full lg:w-[32%] lg:sticky lg:top-[160px] space-y-8">

          <div className="bg-[#191974] rounded-[24px] shadow-2xl overflow-hidden border border-white/5">
            <div className="bg-[#ee2229] text-white text-center font-bold text-[11px] py-2 tracking-[0.2em] uppercase">
              Instant Application
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-1">
                <h3 className="text-[22px] font-black text-white">Apply Now</h3>
                <p className="text-white/50 text-[13px] font-medium">Get your visa processed in simple steps.</p>
              </div>

              <form className="space-y-3">
                <input type="email" placeholder="Email Address" className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-[14px] outline-none focus:border-[#ee2229] transition-colors" />
                <input type="tel" placeholder="Mobile Number" className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-[14px] outline-none focus:border-[#ee2229] transition-colors" />
                <button className="w-full bg-[#ee2229] text-white font-black text-[13px] tracking-widest py-4 rounded-xl mt-4 shadow-xl shadow-red-500/20 active:scale-95 transition-all">
                  CONTINUE APPLICATION
                </button>
              </form>

              <div className="flex items-center gap-4 text-white/40 pt-4">
                <ShieldCheck className="w-5 h-5" />
                <p className="text-[11px] font-bold tracking-tight">Secured & encrypted application portal</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {[
              { icon: MessageCircle, label: "WhatsApp Support", detail: "+91 8879008992", color: "text-green-500", bg: "bg-green-50" },
              { icon: Phone, label: "Call Experts", detail: "022 4066 6444", color: "text-blue-500", bg: "bg-blue-50" },
              { icon: Clock, label: "Working Hours", detail: "09:00 AM - 09:00 PM", color: "text-amber-500", bg: "bg-amber-50" }
            ].map((act, i) => (
              <div key={i} className="flex items-center gap-4 bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:border-[#191974]/30 transition-all cursor-pointer">
                <div className={`w-12 h-12 rounded-xl ${act.bg} ${act.color} flex items-center justify-center`}>
                  <act.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">{act.label}</p>
                  <p className="text-[16px] font-black text-[#191974]">{act.detail}</p>
                </div>
              </div>
            ))}
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
              © 2025 www.antigravitytravels.com All Rights Reserved
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
