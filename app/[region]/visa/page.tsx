"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, Star, MapPin, CheckCircle2, ShieldCheck, Globe, Building2, Map, Users, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

import { destinations } from '@/app/data/visaData';
import { formatRegionalPrice } from '@/config/country';
import VisaCard from '@/app/components/visa/VisaCard';

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
  const [searchQuery, setSearchQuery] = useState("");
  const [activeContinent, setActiveContinent] = useState("All");

  const continents = ["All", "Asia", "Europe", "Americas", "Africa", "Oceania"];

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesContinent = activeContinent === "All" || dest.continent === activeContinent;
    return matchesSearch && matchesContinent;
  });

  const resetFilters = () => {
    setSearchQuery("");
    setActiveContinent("All");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="bg-[#191974] pt-24 pb-16 px-4 relative overflow-hidden flex-1">
        <div className="max-w-6xl mx-auto text-center relative z-10 pt-10">
          <h5 className="text-white text-3xl md:text-6xl  mb-8 tracking-tight leading-tight">
            Choose Destination.<br /> We'll Handle the <span className="text-[#ee2229]">Visa</span>
          </h5>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row bg-white rounded-2xl md:rounded-full p-2 mb-8 shadow-2xl overflow-hidden">
            <div className="flex-1 flex items-center px-6 py-4 border-b md:border-b-0 md:border-r border-gray-100">
              <MapPin className="text-[#ee2229] w-5 h-5 mr-3 shrink-0" />
              <div className="flex flex-col items-start text-left">
                <span className="text-[10px]  text-gray-400 uppercase tracking-widest ">Citizen of</span>
                <input type="text" value="India" readOnly className="w-full text-[#191974]  p-0 border-none outline-none bg-transparent" />
              </div>
            </div>
            <div className="flex-[1.5] flex items-center px-6 py-4">
              <Search className="text-[#ee2229] w-5 h-5 mr-3 shrink-0" />
              <div className="flex flex-col items-start w-full text-left">
                <span className="text-[10px]  text-gray-400  tracking-widest ">Travelling to</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter country name..."
                  className="w-full text-[#191974]  p-0 border-none outline-none bg-transparent placeholder-gray-300"
                />
              </div>
            </div>
            <button className="bg-[#ee2229] hover:bg-[#191974] active:scale-95 text-white  py-4 px-12 rounded-xl md:rounded-full transition-all tracking-[0.2em] text-[13px]  shadow-xl shadow-red-500/20">
              SEARCH
            </button>
          </div>

          {/* Trust Badge */}
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#191974] bg-gray-200 overflow-hidden">
                  <img src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} alt="user" />
                </div>
              ))}
            </div>
            <p className="text-white/80 font-bold text-[13px] tracking-wide">
              <span className="text-white ">99.2%</span> Visas Delivered On Time
            </p>
          </div>
        </div>

        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-500/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </section>

      {/* 2. POPULAR DESTINATIONS */}
      <section className="py-16 px-4 bg-white min-h-[600px]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-[32px] md:text-[42px]  text-[#191974] leading-tight ">Explore Destinations</h2>
              <p className="text-gray-400 mt-2 font-medium">Find visa requirements for your next journey.</p>
            </div>

            {/* Continent Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
              {continents.map((continent) => (
                <button
                  key={continent}
                  onClick={() => setActiveContinent(continent)}
                  className={`px-5 py-2.5 rounded-xl text-[12px]   tracking-widest transition-all ${activeContinent === continent
                    ? 'bg-white text-[#ee2229] shadow-md shadow-black/5 border border-gray-100'
                    : 'text-gray-400 hover:text-[#191974]'
                    }`}
                >
                  {continent}
                </button>
              ))}
            </div>
          </div>

          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDestinations.map((dest, i) => (
                <VisaCard 
                  key={dest.slug} 
                  dest={dest} 
                  region={region} 
                  index={i} 
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-24 text-center bg-gray-50 rounded-[48px] border border-dashed border-gray-200">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Globe className="w-10 h-10 text-gray-200" />
              </div>
              <h3 className="text-[22px]  text-[#191974] mb-3 tracking-tight">No destinations found</h3>
              <p className="text-gray-400 font-medium mb-10 max-w-md mx-auto">We couldn&apos;t find any visa services matching your criteria. Try adjusting your search or continent selection.</p>
              <button
                onClick={resetFilters}
                className="bg-[#191974] hover:bg-[#ee2229] text-white px-10 py-4 rounded-full  text-[13px]  tracking-widest transition-all shadow-xl shadow-blue-900/10 active:scale-95"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

    {/* 3. MEET OUR VISA EXPERTS */ }
    <section className="py-12 px-4 bg-[#f8f9fa] overflow-hidden border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl lg:text-4xl text-[#191974]">Meet Our Visa Experts</h2>
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
              <h4 className="text-xl text-[#191974] mb-1">{expert.name}</h4>
              <p className="text-sm text-gray-500 font-bold tracking-wide  mb-4">{expert.role}</p>
              <p className="text-xs text-[#ee2229] bg-red-50 inline-block px-4 py-1.5 rounded-lg border border-red-100">{expert.exp} Experience</p>
            </div>
          ))}
        </div>
      </div>
      </section >

    {/* 4. HOW IT WORKS */ }
    < section className = "py-12 px-4 bg-[#FAF8F5]" >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl  text-[#191974] text-center mb-12 leading-tight">Applying Is This Simple</h2>

        <div className="relative">
          {/* Line connecting the steps (desktop) */}
          <div className="hidden md:block absolute top-[48px] left-[15%] right-[15%] h-1 bg-gray-200"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="w-24 h-24 mx-auto rounded-full bg-white border-[6px] border-gray-200 group-hover:border-[#191974] flex items-center justify-center transition-colors mb-6 shadow-md relative group-hover:-translate-y-2 transform duration-300">
                <span className="text-3xl text-[#191974]">1</span>
              </div>
              <div className="w-14 h-14 mx-auto bg-[#191974]/5 rounded-2xl flex items-center justify-center mb-5 text-[#191974]">
                <CreditCard className="w-6 h-6" />
              </div>
              <h4 className="text-xl text-[#191974] mb-3 leading-tight">Submit documents <br />& pay online</h4>
            </div>

            {/* Step 2 (Active) */}
            <div className="text-center group">
              <div className="w-24 h-24 mx-auto rounded-full bg-[#ee2229] border-[6px] border-[#ee2229]/20 flex items-center justify-center mb-6 shadow-xl shadow-[#ee2229]/30 relative -translate-y-2">
                <span className="text-3xl text-white">2</span>
              </div>
              <div className="w-14 h-14 mx-auto bg-[#ee2229]/10 rounded-2xl flex items-center justify-center mb-5 text-[#ee2229]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xl text-[#191974] mb-3 leading-tight">We verify & process <br />your Visa application</h4>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="w-24 h-24 mx-auto rounded-full bg-white border-[6px] border-gray-200 group-hover:border-[#191974] flex items-center justify-center transition-colors mb-6 shadow-md relative group-hover:-translate-y-2 transform duration-300">
                <span className="text-3xl text-[#191974]">3</span>
              </div>
              <div className="w-14 h-14 mx-auto bg-[#191974]/5 rounded-2xl flex items-center justify-center mb-5 text-[#191974]">
                <Map className="w-6 h-6" />
              </div>
              <h4 className="text-xl text-[#191974] mb-3 leading-tight">Receive Visa <br />documents</h4>
            </div>
          </div>
        </div>
      </div>
      </section >

    {/* 5. WHY CHOOSE US */ }
    < section className = "py-12 px-4 bg-white border-y border-gray-100" >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl  text-[#191974] text-center mb-10">Why Choose Us</h2>
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
              <p className="text-sm md:text-base text-[#191974] whitespace-pre-line leading-snug">{usp.title}</p>
            </div>
          ))}
        </div>
      </div>
      </section >

    {/* 6. CUSTOMER REVIEWS */ }
    < section className = "py-24 px-4 bg-[#f8f9fa]" >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl lg:text-4xl text-[#191974] text-center mb-16">What Customers Say About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-10 rounded-4xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex text-[#ee2229] mb-6 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
            </div>
            <p className="text-gray-600 mb-8 font-medium text-lg leading-relaxed">"Excellent service handling our visas. Everything was communicated clearly, and we got our approvals well before time. Really highly recommend Madura travel service."</p>
            <div className="flex items-center justify-between border-t border-gray-100 pt-6">
              <h4 className="text-lg text-[#191974]">Nupur Sawant</h4>
              <span className="text-[#ee2229] text-sm tracking-widest  cursor-pointer hover:underline">Read more</span>
            </div>
          </div>

          <div className="bg-white p-10 rounded-4xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex text-[#ee2229] mb-6 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
            </div>
            <p className="text-gray-600 mb-8 font-medium text-lg leading-relaxed">"Super fast and flawless process. The team provided checklist for required documents explicitly. My Australia visa was perfectly arranged without any hiccups."</p>
            <div className="flex items-center justify-between border-t border-gray-100 pt-6">
              <h4 className="text-lg text-[#191974]">Mayur Waman</h4>
              <span className="text-[#ee2229] text-sm tracking-widest  cursor-pointer hover:underline">Read more</span>
            </div>
          </div>
        </div>
      </div>
      </section >

    {/* 7. VISIT US / LOCATIONS */ }
    < section className = "py-24 px-4 bg-[#FAF8F5] border-t border-gray-200" >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl text-[#191974] text-center mb-16">Visit Us</h2>
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
              <h3 className="text-2xl text-[#191974] mb-4">{loc.city}</h3>
              <p className="text-gray-500 text-base font-medium mb-8 leading-relaxed">{loc.addr}</p>
              <p className="text-[#191974] text-xs  tracking-widest flex items-center gap-2 hover:text-[#ee2229] cursor-pointer group">
                View on Google Maps <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </p>
            </div>
          ))}
        </div>
      </div>
      </section >

    {/* 8. COUNTRY DIRECTORY FOOTER */ }
    < section className = "py-20 px-4 bg-white border-t border-gray-200" >
      <div className="max-w-7xl mx-auto">
        <h3 className="text-xl text-gray-300 mb-10 text-center  tracking-[0.3em]">Global Visa Directory</h3>

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 border-b border-gray-100 mb-12">
          {["Asia", "Europe", "North America", "South America", "Australia", "Africa", "Gulf"].map((continent) => (
            <button
              key={continent}
              onClick={() => setActiveContinent(continent)}
              className={`pb-5 text-sm tracking-widest  transition-all relative ${activeContinent === continent ? 'text-[#ee2229]' : 'text-gray-400 hover:text-[#191974]'}`}
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
                <h4 className="text-[#191974] tracking-widest  text-xs mb-6">East Asia</h4>
                <ul className="space-y-4 font-bold text-[#191974]/60">
                  <li><Link href={`/${region}/visa/japan`} className="hover:text-[#ee2229] transition-colors">Japan Visa</Link></li>
                  <li><Link href={`/${region}/visa/china`} className="hover:text-[#ee2229] transition-colors">China Visa</Link></li>
                  <li><Link href={`/${region}/visa/south-korea`} className="hover:text-[#ee2229] transition-colors">South Korea Visa</Link></li>
                  <li><Link href={`/${region}/visa/taiwan`} className="hover:text-[#ee2229] transition-colors">Taiwan Visa</Link></li>
                  <li><Link href={`/${region}/visa/hong-kong`} className="hover:text-[#ee2229] transition-colors">Hong Kong Visa</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[#191974] tracking-widest  text-xs mb-6">Southeast Asia</h4>
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
                <h4 className="text-[#191974] tracking-widest  text-xs mb-6">West & Central Asia</h4>
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
                <h4 className="text-[#191974] tracking-widest  text-xs mb-6">South Asia</h4>
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
                <h4 className="text-[#191974] tracking-widest  text-xs mb-6">Western Europe</h4>
                <ul className="space-y-4 font-bold text-[#191974]/60">
                  <li><Link href={`/${region}/visa/france`} className="hover:text-[#ee2229] transition-colors">France Visa</Link></li>
                  <li><Link href={`/${region}/visa/netherlands`} className="hover:text-[#ee2229] transition-colors">Netherlands Visa</Link></li>
                  <li><Link href={`/${region}/visa/switzerland`} className="hover:text-[#ee2229] transition-colors">Switzerland Visa</Link></li>
                  <li><Link href={`/${region}/visa/austria`} className="hover:text-[#ee2229] transition-colors">Austria Visa</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[#191974] tracking-widest  text-xs mb-6">British Isles</h4>
                <ul className="space-y-4 font-bold text-[#191974]/60">
                  <li><Link href={`/${region}/visa/united-kingdom`} className="hover:text-[#ee2229] transition-colors">United Kingdom Visa</Link></li>
                  <li><Link href={`/${region}/visa/ireland`} className="hover:text-[#ee2229] transition-colors">Ireland Visa</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[#191974] tracking-widest  text-xs mb-6">Southern Europe</h4>
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
                <h4 className="text-[#191974] tracking-widest  text-xs mb-6">Major Destinations</h4>
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
                <h4 className="text-[#191974] tracking-widest  text-xs mb-6">Oceania</h4>
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
                <h4 className="text-[#191974] tracking-widest  text-xs mb-6">Sub-Saharan Africa</h4>
                <ul className="space-y-4 font-bold text-[#191974]/60">
                  <li><Link href={`/${region}/visa/south-africa`} className="hover:text-[#ee2229] transition-colors">South Africa Visa</Link></li>
                  <li><Link href={`/${region}/visa/kenya`} className="hover:text-[#ee2229] transition-colors">Kenya Visa</Link></li>
                  <li><Link href={`/${region}/visa/zimbabwe`} className="hover:text-[#ee2229] transition-colors">Zimbabwe Visa</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[#191974] tracking-widest  text-xs mb-6">North Africa</h4>
                <ul className="space-y-4 font-bold text-[#191974]/60">
                  <li><Link href={`/${region}/visa/egypt`} className="hover:text-[#ee2229] transition-colors">Egypt Visa</Link></li>
                  <li><Link href={`/${region}/visa/morocco`} className="hover:text-[#ee2229] transition-colors">Morocco Visa</Link></li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
      </section >
    </div >
  );
}
