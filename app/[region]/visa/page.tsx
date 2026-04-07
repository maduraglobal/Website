"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, Star, MapPin, CheckCircle2, ShieldCheck, Globe, Building2, Map, Users, CreditCard } from 'lucide-react';

// Destinations Data
const destinations = [
  { name: "Dubai", price: "3,499", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800" },
  { name: "Malaysia", price: "499", image: "https://images.unsplash.com/photo-1596422846543-75c6fa190074?auto=format&fit=crop&q=80&w=800" },
  { name: "Singapore", price: "2,100", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800" },
  { name: "Sri Lanka", price: "999", image: "https://images.unsplash.com/photo-1538356111053-748a48e1acb8?auto=format&fit=crop&q=80&w=800" },
  { name: "Thailand", price: "499", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800" },
  { name: "Australia", price: "12,999", image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800" }
];

// Experts Data
const experts = [
  { name: "Rahim Sayyed", role: "Senior Visa Officer", exp: "5 yrs", img: "https://ui-avatars.com/api/?name=Rahim+Sayyed&background=f3f4f6&color=191974" },
  { name: "Sameer Kazi", role: "Senior Visa Officer", exp: "4 yrs", img: "https://ui-avatars.com/api/?name=Sameer+Kazi&background=f3f4f6&color=191974" },
  { name: "Adil Ansari", role: "Holiday Expert", exp: "3 yrs", img: "https://ui-avatars.com/api/?name=Adil+Ansari&background=f3f4f6&color=191974" },
  { name: "Anushree Manoj", role: "Visa Officer", exp: "2 yrs", img: "https://ui-avatars.com/api/?name=Anushree+Manoj&background=f3f4f6&color=ee2229" }
];

export default function VisaServicesPage() {
  const params = useParams();
  const region = params?.region as string || "india";
  const [activeContinent, setActiveContinent] = useState("Asia");

  return (
    <div className="font-sans min-h-screen flex flex-col pt-16">
      {/* 1. HERO SECTION */}
      <section className="bg-[#191974] pt-24 pb-20 px-4 relative overflow-hidden flex-1">
        <div className="max-w-6xl mx-auto text-center relative z-10 pt-10">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black mb-10 tracking-tight leading-tight">
            Choose Destination.<br /> We'll Handle the Visa
          </h1>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row bg-white rounded-2xl md:rounded-full p-2 mb-8 shadow-2xl">
            <div className="flex-1 flex items-center px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200">
              <MapPin className="text-gray-400 w-5 h-5 mr-3 shrink-0" />
              <input type="text" placeholder="I am a citizen of..." defaultValue="India" readOnly className="w-full text-[#191974] font-bold text-lg outline-none bg-transparent" />
            </div>
            <div className="flex-1 flex items-center px-6 py-4">
              <Search className="text-gray-400 w-5 h-5 mr-3 shrink-0" />
              <input type="text" placeholder="Travelling to..." className="w-full text-[#191974] font-bold text-lg outline-none bg-transparent placeholder-gray-400" />
            </div>
            <button className="bg-[#ee2229] hover:bg-[#d11e24] active:scale-95 text-white font-black py-4 md:py-3 px-10 rounded-xl md:rounded-full transition-all mt-2 md:mt-0 w-full md:w-auto tracking-widest text-sm shadow-lg shadow-red-500/30">
              SEARCH
            </button>
          </div>

          {/* Badge */}
          <div className="inline-block bg-[#F59E0B]/15 border border-[#F59E0B]/30 backdrop-blur-md rounded-full px-6 py-3">
            <p className="text-[#FBBF24] font-bold text-sm flex items-center gap-2 tracking-widest uppercase">
              <CheckCircle2 className="w-5 h-5 fill-current text-[#ee2229]" />
              99.2% Visas Delivered On Time
            </p>
          </div>
        </div>

        {/* Background Graphic elements */}
        <div className="absolute top-0 right-0 opacity-10 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      </section>

      {/* 2. POPULAR DESTINATIONS */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black text-[#191974] mb-2 text-center">Popular Destinations</h2>
          <p className="text-gray-500 text-center mb-16 font-medium text-lg">Select your next travel destination</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {destinations.map((dest, i) => (
              <Link href={`/${region}/visa/${dest.name.toLowerCase().replace(/ /g, '-')}`} key={i} className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer block">
                <div className="h-72 w-full relative">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>
                </div>
                {/* Circle Badge */}
                <div className="absolute top-6 left-6 bg-[#ee2229] text-white rounded-full w-20 h-20 flex flex-col items-center justify-center p-2 shadow-2xl rotate-12 group-hover:rotate-0 transition-transform">
                  <span className="text-[8px] font-black uppercase tracking-widest text-white/90 leading-none mb-0.5">Starting</span>
                  <span className="text-sm font-black leading-none">₹{dest.price}/-</span>
                  <span className="text-[7px] font-black uppercase tracking-widest text-white/90 leading-none mt-0.5">Only</span>
                </div>
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-3xl font-black text-white">{dest.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MEET OUR VISA EXPERTS */}
      <section className="py-24 px-4 bg-[#f8f9fa] overflow-hidden border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl lg:text-4xl font-black text-[#191974]">Meet Our Visa Experts</h2>
              <p className="text-gray-500 mt-3 font-medium text-lg">Professionals dedicated to securing your visa smoothly</p>
            </div>
            <div className="hidden md:flex gap-3">
              <button className="w-12 h-12 rounded-full border-2 border-[#191974] text-[#191974] flex items-center justify-center hover:bg-[#191974] hover:text-white transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button className="w-12 h-12 rounded-full bg-[#191974] text-white flex items-center justify-center shadow-xl shadow-[#191974]/30 hover:bg-[#111155] transition-colors hover:scale-105 transform">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex gap-8 overflow-x-auto pb-8 snap-x no-scrollbar">
            {experts.map((expert, i) => (
              <div key={i} className="min-w-[280px] md:min-w-[300px] bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow snap-start text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 border-4 border-gray-50 shadow-inner">
                  <img src={expert.img} className="w-full h-full object-cover" alt={expert.name} />
                </div>
                <h4 className="text-xl font-black text-[#191974] mb-1">{expert.name}</h4>
                <p className="text-sm text-gray-500 font-bold tracking-wide uppercase mb-4">{expert.role}</p>
                <p className="text-xs font-black text-[#ee2229] bg-red-50 inline-block px-4 py-1.5 rounded-lg border border-red-100">{expert.exp} Experience</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-24 px-4 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black text-[#191974] text-center mb-20 leading-tight">Applying With Antigravity Travels <br /><span className="text-[#ee2229]">Is This Simple</span></h2>

          <div className="relative">
            {/* Line connecting the steps (desktop) */}
            <div className="hidden md:block absolute top-[48px] left-[15%] right-[15%] h-1 bg-gray-200"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {/* Step 1 */}
              <div className="text-center group">
                <div className="w-24 h-24 mx-auto rounded-full bg-white border-[6px] border-gray-200 group-hover:border-[#191974] flex items-center justify-center transition-colors mb-6 shadow-md relative group-hover:-translate-y-2 transform duration-300">
                  <span className="text-3xl font-black text-[#191974]">1</span>
                </div>
                <div className="w-14 h-14 mx-auto bg-[#191974]/5 rounded-2xl flex items-center justify-center mb-5 text-[#191974]">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-black text-[#191974] mb-3 leading-tight">Submit documents <br />& pay online</h4>
              </div>

              {/* Step 2 (Active) */}
              <div className="text-center group">
                <div className="w-24 h-24 mx-auto rounded-full bg-[#ee2229] border-[6px] border-[#ee2229]/20 flex items-center justify-center mb-6 shadow-xl shadow-[#ee2229]/30 relative -translate-y-2">
                  <span className="text-3xl font-black text-white">2</span>
                </div>
                <div className="w-14 h-14 mx-auto bg-[#ee2229]/10 rounded-2xl flex items-center justify-center mb-5 text-[#ee2229]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-black text-[#191974] mb-3 leading-tight">We verify & process <br />your Visa application</h4>
              </div>

              {/* Step 3 */}
              <div className="text-center group">
                <div className="w-24 h-24 mx-auto rounded-full bg-white border-[6px] border-gray-200 group-hover:border-[#191974] flex items-center justify-center transition-colors mb-6 shadow-md relative group-hover:-translate-y-2 transform duration-300">
                  <span className="text-3xl font-black text-[#191974]">3</span>
                </div>
                <div className="w-14 h-14 mx-auto bg-[#191974]/5 rounded-2xl flex items-center justify-center mb-5 text-[#191974]">
                  <Map className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-black text-[#191974] mb-3 leading-tight">Receive Visa <br />documents</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="py-24 px-4 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black text-[#191974] text-center mb-16">Why Choose Us</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-12">
            {[
              { icon: Globe, title: "Visa Services for 180+ Countries" },
              { icon: Star, title: "45+\nyears of expertise" },
              { icon: Building2, title: "150+\nBranches Worldwide" },
              { icon: Users, title: "Support from Start to Stamp" },
              { icon: MapPin, title: "Doorstep\nConvenience" },
              { icon: ShieldCheck, title: "Safety &\nConfidentiality" }
            ].map((usp, i) => (
              <div key={i} className="flex flex-col items-center text-center group cursor-pointer">
                <div className="bg-[#191974] group-hover:bg-[#ee2229] group-hover:-translate-y-2 transition-all duration-300 w-20 h-20 rounded-[1.25rem] flex items-center justify-center text-white mb-5 shadow-xl shadow-gray-200">
                  <usp.icon className="w-8 h-8" />
                </div>
                <p className="text-sm md:text-base font-black text-[#191974] whitespace-pre-line leading-snug">{usp.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS */}
      <section className="py-24 px-4 bg-[#f8f9fa]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black text-[#191974] text-center mb-16">What Customers Say About Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-10 rounded-4xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex text-[#ee2229] mb-6 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
              </div>
              <p className="text-gray-600 mb-8 font-medium text-lg leading-relaxed">"Excellent service handling our visas. Everything was communicated clearly, and we got our approvals well before time. Really highly recommend Antigravity travels."</p>
              <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                <h4 className="text-lg font-black text-[#191974]">Nupur Sawant</h4>
                <span className="text-[#ee2229] font-black text-sm tracking-widest uppercase cursor-pointer hover:underline">Read more</span>
              </div>
            </div>

            <div className="bg-white p-10 rounded-4xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex text-[#ee2229] mb-6 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
              </div>
              <p className="text-gray-600 mb-8 font-medium text-lg leading-relaxed">"Super fast and flawless process. The team provided checklist for required documents explicitly. My Australia visa was perfectly arranged without any hiccups."</p>
              <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                <h4 className="text-lg font-black text-[#191974]">Mayur Waman</h4>
                <span className="text-[#ee2229] font-black text-sm tracking-widest uppercase cursor-pointer hover:underline">Read more</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VISIT US / LOCATIONS */}
      <section className="py-24 px-4 bg-[#FAF8F5] border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black text-[#191974] text-center mb-16">Visit Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { city: "Mumbai", addr: "Antigravity HQ, Andheri East, Mumbai, Maharashtra 400059." },
              { city: "Delhi", addr: "Antigravity Towers, Connaught Place, New Delhi 110001." },
              { city: "Chennai", addr: "Antigravity Travels, T Nagar, Chennai, Tamil Nadu 600017." }
            ].map((loc, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-200 hover:border-[#191974]/30 transition-colors">
                <div className="w-16 h-16 bg-[#191974]/5 text-[#191974] rounded-2xl flex items-center justify-center mb-8 border border-[#191974]/10">
                  <Building2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-[#191974] mb-4">{loc.city}</h3>
                <p className="text-gray-500 text-base font-medium mb-8 leading-relaxed">{loc.addr}</p>
                <p className="text-[#191974] font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:text-[#ee2229] cursor-pointer group">
                  View on Google Maps <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. COUNTRY DIRECTORY FOOTER */}
      <section className="py-20 px-4 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl font-black text-gray-300 mb-10 text-center uppercase tracking-[0.3em]">Global Visa Directory</h3>

          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 border-b border-gray-100 mb-12">
            {["Asia", "Europe", "North America", "South America", "Australia", "Africa", "Gulf"].map((continent) => (
              <button
                key={continent}
                onClick={() => setActiveContinent(continent)}
                className={`pb-5 text-sm font-black tracking-widest uppercase transition-all relative ${activeContinent === continent ? 'text-[#ee2229]' : 'text-gray-400 hover:text-[#191974]'}`}
              >
                {continent}
                {activeContinent === continent && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#ee2229] rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Directory Content (Asia selected by default) */}
          {activeContinent === "Asia" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div>
                <h4 className="font-black text-[#191974] tracking-widest uppercase text-xs mb-6">Western Asia</h4>
                <ul className="space-y-4 font-bold text-[#191974]/60">
                  <li><Link href={`/${region}/visa/dubai`} className="hover:text-[#ee2229] transition-colors">Dubai Visa</Link></li>
                  <li><Link href={`/${region}/visa/saudi-arabia`} className="hover:text-[#ee2229] transition-colors">Saudi Visa</Link></li>
                  <li><Link href={`/${region}/visa/oman`} className="hover:text-[#ee2229] transition-colors">Oman Visa</Link></li>
                  <li><Link href={`/${region}/visa/turkey`} className="hover:text-[#ee2229] transition-colors">Turkey Visa</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-black text-[#191974] tracking-widest uppercase text-xs mb-6">East Asia</h4>
                <ul className="space-y-4 font-bold text-[#191974]/60">
                  <li><a href="#" className="hover:text-[#ee2229] transition-colors">Japan Visa</a></li>
                  <li><a href="#" className="hover:text-[#ee2229] transition-colors">China Visa</a></li>
                  <li><a href="#" className="hover:text-[#ee2229] transition-colors">South Korea Visa</a></li>
                  <li><a href="#" className="hover:text-[#ee2229] transition-colors">Taiwan Visa</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-black text-[#191974] tracking-widest uppercase text-xs mb-6">South Asia</h4>
                <ul className="space-y-4 font-bold text-[#191974]/60">
                  <li><a href="#" className="hover:text-[#ee2229] transition-colors">Sri Lanka Visa</a></li>
                  <li><a href="#" className="hover:text-[#ee2229] transition-colors">Bangladesh Visa</a></li>
                  <li><a href="#" className="hover:text-[#ee2229] transition-colors">Nepal Visa</a></li>
                  <li><a href="#" className="hover:text-[#ee2229] transition-colors">Maldives Visa</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-black text-[#191974] tracking-widest uppercase text-xs mb-6">Southeast Asia</h4>
                <ul className="space-y-4 font-bold text-[#191974]/60">
                  <li><Link href={`/${region}/visa/singapore`} className="hover:text-[#ee2229] transition-colors">Singapore Visa</Link></li>
                  <li><Link href={`/${region}/visa/malaysia`} className="hover:text-[#ee2229] transition-colors">Malaysia Visa</Link></li>
                  <li><Link href={`/${region}/visa/thailand`} className="hover:text-[#ee2229] transition-colors">Thailand Visa</Link></li>
                  <li><Link href={`/${region}/visa/vietnam`} className="hover:text-[#ee2229] transition-colors">Vietnam Visa</Link></li>
                  <li><Link href={`/${region}/visa/indonesia`} className="hover:text-[#ee2229] transition-colors">Indonesia Visa</Link></li>
                </ul>
              </div>
            </div>
          )}
          {activeContinent !== "Asia" && (
            <div className="text-center py-20 text-gray-400 font-bold tracking-wide">
              Select countries available under {activeContinent}. Contact us for more details.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
