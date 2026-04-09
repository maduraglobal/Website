"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, Star, MapPin, CheckCircle2, ShieldCheck, Globe, Building2, Map, Users, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

import { destinations } from '@/app/data/visaData';

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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDestinations = destinations.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="font-sans min-h-screen flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="bg-[#191974] pt-16 pb-12 px-4 relative overflow-hidden flex-1">
        <div className="max-w-6xl mx-auto text-center relative z-10 pt-10">
          <h5 className="text-white text-3xl md:text-5xl font-inter mb-8 tracking-tight leading-tight">
            Choose Destination.<br /> We'll Handle the Visa
          </h5>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row bg-white rounded-xl md:rounded-full p-1.5 mb-6 shadow-2xl overflow-hidden">
            <div className="flex-1 flex items-center px-4 py-3 border-b md:border-b-0 md:border-r border-gray-100">
              <MapPin className="text-[#ee2229] w-4 h-4 mr-2 shrink-0" />
              <div className="flex flex-col items-start text-left">
                <span className="text-[9px] font-bold text-gray-400">Citizen of</span>
                <input type="text" value="India" readOnly className="w-full text-[#191974] font-black p-0 border-none outline-none bg-transparent" />
              </div>
            </div>
            <div className="flex-[1.5] flex items-center px-4 py-3">
              <Search className="text-[#ee2229] w-4 h-4 mr-2 shrink-0" />
              <div className="flex flex-col items-start w-full text-left">
                <span className="text-[9px] font-bold text-gray-400">Travelling to</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter country name..."
                  className="w-full text-[#191974] font-black p-0 border-none outline-none bg-transparent placeholder-gray-300"
                />
              </div>
            </div>
            <button className="bg-[#ee2229] hover:bg-[#d11e24] active:scale-95 text-white font-black py-4 px-10 rounded-lg md:rounded-full transition-all tracking-widest text-xs uppercase shadow-lg shadow-red-500/20">
              SEARCH
            </button>
          </div>

          {/* Badge */}
          <div className="inline-block bg-[#F59E0B]/15 border border-[#F59E0B]/30 backdrop-blur-md rounded-full px-6 py-3">
            <p className="text-[#FBBF24] font-bold text-sm flex items-center gap-2 tracking-widest ">
              <CheckCircle2 className="w-5 h-5 fill-current text-[#ee2229]" />
              99.2% Visas Delivered On Time
            </p>
          </div>
        </div>

        {/* Background Graphic elements */}
        <div className="absolute top-0 right-0 opacity-10 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      </section>

      {/* 2. POPULAR DESTINATIONS */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-[#191974] mb-1 text-center">Popular Destinations</h2>
          <p className="text-gray-400 text-center mb-10 font-medium text-sm">Select your next travel destination</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDestinations.map((dest, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  href={`/${region}/visa/${dest.name.toLowerCase().replace(/ /g, '-')}`}
                  className="group relative rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer block h-[440px] bg-white"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-90 group-hover:from-black transition-all"></div>
                  </div>

                  {/* Visa Type Badge */}
                  <div className="absolute top-6 right-6 z-10">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-inter tracking-widest px-3 py-1.5 rounded-full ">
                      {dest.type}
                    </div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-white z-10">
                    {/* Flag Icon */}
                    <div className="flex justify-center mb-4 transform group-hover:-translate-y-2 transition-transform duration-500">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-2xl">
                        <img
                          src={`https://flagcdn.com/w160/${dest.flag}.png`}
                          alt={dest.name}
                          className="w-full h-full object-cover shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Country Name */}
                    <h3 className="text-2xl font-serif  tracking-widest text-center mb-6 drop-shadow-xl">
                      {dest.name}
                    </h3>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-y-4 gap-x-4 border-t border-white/10 pt-6 mb-8">
                      <div className="text-center">
                        <p className="text-[9px]  font-inter tracking-widest text-white/40 mb-1">Validity</p>
                        <p className="text-[12px] font-inter  text-white/90">{dest.valid}</p>
                      </div>
                      <div className="text-center border-l border-white/10">
                        <p className="text-[9px]  font-inter tracking-widest text-white/40 mb-1">Start From</p>
                        <p className="text-[12px] font-inter  text-[#ee2229]">₹{dest.price}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-4">
                      <div className="bg-[#ee2229] hover:bg-[#ff333a] text-white py-3.5 rounded-2xl text-center font-inter text-xs tracking-[0.2em] transition-all shadow-xl shadow-red-500/20 active:scale-95">
                        GET START NOW
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MEET OUR VISA EXPERTS */}
      <section className="py-12 px-4 bg-[#f8f9fa] overflow-hidden border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl lg:text-4xl font-inter text-[#191974]">Meet Our Visa Experts</h2>
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

          <div className="flex gap-4 overflow-x-auto pb-8 snap-x no-scrollbar">
            {experts.map((expert, i) => (
              <div key={i} className="min-w-[280px] md:min-w-[300px] bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow snap-start text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 border-4 border-gray-50 shadow-inner">
                  <img src={expert.img} className="w-full h-full object-cover" alt={expert.name} />
                </div>
                <h4 className="text-xl font-inter text-[#191974] mb-1">{expert.name}</h4>
                <p className="text-sm text-gray-500 font-bold tracking-wide  mb-4">{expert.role}</p>
                <p className="text-xs font-inter text-[#ee2229] bg-red-50 inline-block px-4 py-1.5 rounded-lg border border-red-100">{expert.exp} Experience</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-12 px-4 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black text-[#191974] text-center mb-12 leading-tight">Applying Is This Simple</h2>

          <div className="relative">
            {/* Line connecting the steps (desktop) */}
            <div className="hidden md:block absolute top-[48px] left-[15%] right-[15%] h-1 bg-gray-200"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
              {/* Step 1 */}
              <div className="text-center group">
                <div className="w-24 h-24 mx-auto rounded-full bg-white border-[6px] border-gray-200 group-hover:border-[#191974] flex items-center justify-center transition-colors mb-6 shadow-md relative group-hover:-translate-y-2 transform duration-300">
                  <span className="text-3xl font-inter text-[#191974]">1</span>
                </div>
                <div className="w-14 h-14 mx-auto bg-[#191974]/5 rounded-2xl flex items-center justify-center mb-5 text-[#191974]">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-inter text-[#191974] mb-3 leading-tight">Submit documents <br />& pay online</h4>
              </div>

              {/* Step 2 (Active) */}
              <div className="text-center group">
                <div className="w-24 h-24 mx-auto rounded-full bg-[#ee2229] border-[6px] border-[#ee2229]/20 flex items-center justify-center mb-6 shadow-xl shadow-[#ee2229]/30 relative -translate-y-2">
                  <span className="text-3xl font-inter text-white">2</span>
                </div>
                <div className="w-14 h-14 mx-auto bg-[#ee2229]/10 rounded-2xl flex items-center justify-center mb-5 text-[#ee2229]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-inter text-[#191974] mb-3 leading-tight">We verify & process <br />your Visa application</h4>
              </div>

              {/* Step 3 */}
              <div className="text-center group">
                <div className="w-24 h-24 mx-auto rounded-full bg-white border-[6px] border-gray-200 group-hover:border-[#191974] flex items-center justify-center transition-colors mb-6 shadow-md relative group-hover:-translate-y-2 transform duration-300">
                  <span className="text-3xl font-inter text-[#191974]">3</span>
                </div>
                <div className="w-14 h-14 mx-auto bg-[#191974]/5 rounded-2xl flex items-center justify-center mb-5 text-[#191974]">
                  <Map className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-inter text-[#191974] mb-3 leading-tight">Receive Visa <br />documents</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="py-12 px-4 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-[#191974] text-center mb-10">Why Choose Us</h2>
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
                <p className="text-sm md:text-base font-inter text-[#191974] whitespace-pre-line leading-snug">{usp.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS */}
      <section className="py-24 px-4 bg-[#f8f9fa]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-inter text-[#191974] text-center mb-16">What Customers Say About Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-10 rounded-4xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex text-[#ee2229] mb-6 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
              </div>
              <p className="text-gray-600 mb-8 font-medium text-lg leading-relaxed">"Excellent service handling our visas. Everything was communicated clearly, and we got our approvals well before time. Really highly recommend Madura travel service."</p>
              <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                <h4 className="text-lg font-inter text-[#191974]">Nupur Sawant</h4>
                <span className="text-[#ee2229] font-inter text-sm tracking-widest  cursor-pointer hover:underline">Read more</span>
              </div>
            </div>

            <div className="bg-white p-10 rounded-4xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex text-[#ee2229] mb-6 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
              </div>
              <p className="text-gray-600 mb-8 font-medium text-lg leading-relaxed">"Super fast and flawless process. The team provided checklist for required documents explicitly. My Australia visa was perfectly arranged without any hiccups."</p>
              <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                <h4 className="text-lg font-inter text-[#191974]">Mayur Waman</h4>
                <span className="text-[#ee2229] font-inter text-sm tracking-widest  cursor-pointer hover:underline">Read more</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VISIT US / LOCATIONS */}
      <section className="py-24 px-4 bg-[#FAF8F5] border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-inter text-[#191974] text-center mb-16">Visit Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { city: "Mumbai", addr: "Antigravity HQ, Andheri East, Mumbai, Maharashtra 400059." },
              { city: "Delhi", addr: "Antigravity Towers, Connaught Place, New Delhi 110001." },
              { city: "Chennai", addr: "Madura travel service, T Nagar, Chennai, Tamil Nadu 600017." }
            ].map((loc, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-200 hover:border-[#191974]/30 transition-colors">
                <div className="w-16 h-16 bg-[#191974]/5 text-[#191974] rounded-2xl flex items-center justify-center mb-8 border border-[#191974]/10">
                  <Building2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-inter text-[#191974] mb-4">{loc.city}</h3>
                <p className="text-gray-500 text-base font-medium mb-8 leading-relaxed">{loc.addr}</p>
                <p className="text-[#191974] font-inter text-xs  tracking-widest flex items-center gap-2 hover:text-[#ee2229] cursor-pointer group">
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
          <h3 className="text-xl font-inter text-gray-300 mb-10 text-center  tracking-[0.3em]">Global Visa Directory</h3>

          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 border-b border-gray-100 mb-12">
            {["Asia", "Europe", "North America", "South America", "Australia", "Africa", "Gulf"].map((continent) => (
              <button
                key={continent}
                onClick={() => setActiveContinent(continent)}
                className={`pb-5 text-sm font-inter tracking-widest  transition-all relative ${activeContinent === continent ? 'text-[#ee2229]' : 'text-gray-400 hover:text-[#191974]'}`}
              >
                {continent}
                {activeContinent === continent && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#ee2229] rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Directory Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {activeContinent === "Asia" && (
              <>
                <div>
                  <h4 className="font-inter text-[#191974] tracking-widest  text-xs mb-6">East Asia</h4>
                  <ul className="space-y-4 font-bold text-[#191974]/60">
                    <li><Link href={`/${region}/visa/japan`} className="hover:text-[#ee2229] transition-colors">Japan Visa</Link></li>
                    <li><Link href={`/${region}/visa/china`} className="hover:text-[#ee2229] transition-colors">China Visa</Link></li>
                    <li><Link href={`/${region}/visa/south-korea`} className="hover:text-[#ee2229] transition-colors">South Korea Visa</Link></li>
                    <li><Link href={`/${region}/visa/taiwan`} className="hover:text-[#ee2229] transition-colors">Taiwan Visa</Link></li>
                    <li><Link href={`/${region}/visa/hong-kong`} className="hover:text-[#ee2229] transition-colors">Hong Kong Visa</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-inter text-[#191974] tracking-widest  text-xs mb-6">Southeast Asia</h4>
                  <ul className="space-y-4 font-bold text-[#191974]/60">
                    <li><Link href={`/${region}/visa/singapore`} className="hover:text-[#ee2229] transition-colors">Singapore Visa</Link></li>
                    <li><Link href={`/${region}/visa/malaysia`} className="hover:text-[#ee2229] transition-colors">Malaysia Visa</Link></li>
                    <li><Link href={`/${region}/visa/thailand`} className="hover:text-[#ee2229] transition-colors">Thailand Visa</Link></li>
                    <li><Link href={`/${region}/visa/vietnam`} className="hover:text-[#ee2229] transition-colors">Vietnam Visa</Link></li>
                    <li><Link href={`/${region}/visa/indonesia`} className="hover:text-[#ee2229] transition-colors">Indonesia Visa</Link></li>
                    <li><Link href={`/${region}/visa/cambodia`} className="hover:text-[#ee2229] transition-colors">Cambodia Visa</Link></li>
                    <li><Link href={`/${region}/visa/laos`} className="hover:text-[#ee2229] transition-colors">Laos Visa</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-inter text-[#191974] tracking-widest  text-xs mb-6">West & Central Asia</h4>
                  <ul className="space-y-4 font-bold text-[#191974]/60">
                    <li><Link href={`/${region}/visa/united-arab-emirates`} className="hover:text-[#ee2229] transition-colors">UAE Visa</Link></li>
                    <li><Link href={`/${region}/visa/oman`} className="hover:text-[#ee2229] transition-colors">Oman Visa</Link></li>
                    <li><Link href={`/${region}/visa/turkey`} className="hover:text-[#ee2229] transition-colors">Turkey Visa</Link></li>
                    <li><Link href={`/${region}/visa/jordan`} className="hover:text-[#ee2229] transition-colors">Jordan Visa</Link></li>
                    <li><Link href={`/${region}/visa/uzbekistan`} className="hover:text-[#ee2229] transition-colors">Uzbekistan Visa</Link></li>
                    <li><Link href={`/${region}/visa/azerbaijan`} className="hover:text-[#ee2229] transition-colors">Azerbaijan Visa</Link></li>
                    <li><Link href={`/${region}/visa/georgia`} className="hover:text-[#ee2229] transition-colors">Georgia Visa</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-inter text-[#191974] tracking-widest  text-xs mb-6">South Asia</h4>
                  <ul className="space-y-4 font-bold text-[#191974]/60">
                    <li><Link href={`/${region}/visa/sri-lanka`} className="hover:text-[#ee2229] transition-colors">Sri Lanka Visa</Link></li>
                    <li><Link href={`/${region}/visa/russia`} className="hover:text-[#ee2229] transition-colors">Russia Visa</Link></li>
                  </ul>
                </div>
              </>
            )}
            {activeContinent === "Europe" && (
              <>
                <div>
                  <h4 className="font-inter text-[#191974] tracking-widest  text-xs mb-6">Western Europe</h4>
                  <ul className="space-y-4 font-bold text-[#191974]/60">
                    <li><Link href={`/${region}/visa/france`} className="hover:text-[#ee2229] transition-colors">France Visa</Link></li>
                    <li><Link href={`/${region}/visa/netherlands`} className="hover:text-[#ee2229] transition-colors">Netherlands Visa</Link></li>
                    <li><Link href={`/${region}/visa/switzerland`} className="hover:text-[#ee2229] transition-colors">Switzerland Visa</Link></li>
                    <li><Link href={`/${region}/visa/austria`} className="hover:text-[#ee2229] transition-colors">Austria Visa</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-inter text-[#191974] tracking-widest  text-xs mb-6">British Isles</h4>
                  <ul className="space-y-4 font-bold text-[#191974]/60">
                    <li><Link href={`/${region}/visa/united-kingdom`} className="hover:text-[#ee2229] transition-colors">United Kingdom Visa</Link></li>
                    <li><Link href={`/${region}/visa/ireland`} className="hover:text-[#ee2229] transition-colors">Ireland Visa</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-inter text-[#191974] tracking-widest  text-xs mb-6">Southern Europe</h4>
                  <ul className="space-y-4 font-bold text-[#191974]/60">
                    <li><Link href={`/${region}/visa/spain`} className="hover:text-[#ee2229] transition-colors">Spain Visa</Link></li>
                    <li><Link href={`/${region}/visa/greece`} className="hover:text-[#ee2229] transition-colors">Greece Visa</Link></li>
                    <li><Link href={`/${region}/visa/italy`} className="hover:text-[#ee2229] transition-colors">Italy Visa</Link></li>
                  </ul>
                </div>
              </>
            )}
            {activeContinent === "North America" && (
              <>
                <div>
                  <h4 className="font-inter text-[#191974] tracking-widest  text-xs mb-6">Major Destinations</h4>
                  <ul className="space-y-4 font-bold text-[#191974]/60">
                    <li><Link href={`/${region}/visa/united-states`} className="hover:text-[#ee2229] transition-colors">United States Visa</Link></li>
                    <li><Link href={`/${region}/visa/canada`} className="hover:text-[#ee2229] transition-colors">Canada Visa</Link></li>
                  </ul>
                </div>
              </>
            )}
            {activeContinent === "Australia" && (
              <>
                <div>
                  <h4 className="font-inter text-[#191974] tracking-widest  text-xs mb-6">Oceania</h4>
                  <ul className="space-y-4 font-bold text-[#191974]/60">
                    <li><Link href={`/${region}/visa/australia`} className="hover:text-[#ee2229] transition-colors">Australia Visa</Link></li>
                    <li><Link href={`/${region}/visa/new-zealand`} className="hover:text-[#ee2229] transition-colors">New Zealand Visa</Link></li>
                  </ul>
                </div>
              </>
            )}
            {activeContinent === "Africa" && (
              <>
                <div>
                  <h4 className="font-inter text-[#191974] tracking-widest  text-xs mb-6">Sub-Saharan Africa</h4>
                  <ul className="space-y-4 font-bold text-[#191974]/60">
                    <li><Link href={`/${region}/visa/south-africa`} className="hover:text-[#ee2229] transition-colors">South Africa Visa</Link></li>
                    <li><Link href={`/${region}/visa/kenya`} className="hover:text-[#ee2229] transition-colors">Kenya Visa</Link></li>
                    <li><Link href={`/${region}/visa/zimbabwe`} className="hover:text-[#ee2229] transition-colors">Zimbabwe Visa</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-inter text-[#191974] tracking-widest  text-xs mb-6">North Africa</h4>
                  <ul className="space-y-4 font-bold text-[#191974]/60">
                    <li><Link href={`/${region}/visa/egypt`} className="hover:text-[#ee2229] transition-colors">Egypt Visa</Link></li>
                    <li><Link href={`/${region}/visa/morocco`} className="hover:text-[#ee2229] transition-colors">Morocco Visa</Link></li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
