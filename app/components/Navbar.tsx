"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { countryConfigs } from "../../config/country";

const destinations = {
  "India": ["Andaman", "Assam", "Arunachal pradesh", "Golden Triangle", "Gujarat", "Himachal Pradesh", "Karnataka", "Kashmir", "Kerala", "Maharashtra", "Madhya Pradesh", "North East India", "Orissa", "Rajasthan", "Tamil Nadu", "Telangana", "Goa", "Sikkim", "Delhi", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
  "Mainland Europe": ["Austria", "Belgium", "Finland", "France", "Germany", "Iceland", "Ireland", "Italy", "Luxembourg", "Netherlands", "Norway", "Poland", "Portugal", "Denmark", "Spain", "Sweden", "Switzerland", "United Kingdom", "Vatican City"],
  "Australasia": ["Australia", "New Zealand", "Fiji", "Queensland"],
  "East Asia": ["China", "Japan", "South Korea", "Taiwan", "Hong Kong"],
  "Eastern Europe": ["Greece", "Bulgaria", "Czech Republic", "Hungary", "Russia", "Croatia"],
  "Middle East": ["Jordan", "Kuwait", "Oman", "Qatar", "Saudi Arabia", "Turkey", "Dubai"],
  "South East Asia": ["Bhutan", "Maldives", "Nepal", "Sri Lanka", "Cambodia", "Indonesia", "Malaysia", "Philippines", "Singapore", "Thailand", "Vietnam"],
  "Africa": ["Egypt", "Kenya", "Madagascar", "Mauritius", "Morocco", "Mozambique", "Namibia", "Seychelles", "South Africa"],
  "North America": ["Canada", "United States of America", "Mexico"],
  "Central Asia": ["Kazakhstan", "Uzbekistan", "Azerbaijan"]
};

type DestinationKey = keyof typeof destinations;

export default function Navbar() {
  const [activeRegion, setActiveRegion] = useState<DestinationKey>("India");
  const pathname = usePathname();
  const router = useRouter();

  // Extract region from pathname (e.g. /en-in/tours -> 'en-in')
  const currentRegionCode = (pathname?.split('/')[1] || 'en-in').toLowerCase();
  const activeCountryConfig = countryConfigs[currentRegionCode] || countryConfigs['en-in'];

  const switchRegion = (newRegion: string) => {
    if (!pathname) return;
    const segments = pathname.split('/');
    if (['en-in', 'en-au', 'en-us'].includes(segments[1])) {
      segments[1] = newRegion;
      router.push(segments.join('/'));
    } else {
      router.push(`/${newRegion}${pathname === '/' ? '' : pathname}`);
    }
  };

  const getFlagURL = (id: string) => {
    const code = id?.toLowerCase() === 'en-in' ? 'in' : id?.toLowerCase() === 'en-au' ? 'au' : 'us';
    return `https://flagcdn.com/w40/${code}.png`;
  };

  return (
    <div className="w-full flex flex-col fixed top-0 left-0 z-100 shadow-md">

      {/* 🔷 TOP HEADER */}
      <div className="bg-white text-[#191974] px-4 lg:px-8 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href={`/${currentRegionCode}`} className="flex items-center shrink-0">
          <Image
            src="/logo.webp"
            alt="Madura Travel Logo"
            width={160}
            height={50}
            className="object-contain"
            priority
          />
        </Link>

        {/* 🔍 Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder='Search "Destination"'
              className="w-full px-6 py-2.5 rounded-full text-white text-[14px] font-arial outline-none bg-[#191974] placeholder:text-white/60 font-medium"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>
        </div>

        {/* Utilities */}
        <div className="flex items-center space-x-6 font-arial">

          {/* Contact info box */}
          <div className="hidden xl:flex items-center border border-gray-200 px-4 py-1.5 rounded-lg gap-2 cursor-pointer hover:border-[#191974] transition-all group">
            <span className="text-[14px] font-bold">+91 90 92 94 94 94</span>
            <svg className="w-2.5 h-2.5 opacity-40 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
          </div>

          {/* Login */}
          <Link href={`/${currentRegionCode}/login`} className="text-[14px] font-bold hover:text-[#ee2229] transition-colors">Login</Link>

          {/* Country Selector */}
          <div className="relative group cursor-pointer z-150">
            <div className="flex items-center gap-2 border border-gray-100 px-3 py-1.5 rounded-lg font-bold text-[13px] hover:border-gray-200 bg-white">
              <img
                src={getFlagURL(activeCountryConfig.id)}
                alt={`${activeCountryConfig.name} flag`}
                className="w-5 h-3.5 object-cover rounded-sm shadow-sm"
              />
              <span>{activeCountryConfig.name}</span>
              <svg className="w-2.5 h-2.5 ml-1 opacity-40 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 9l-7 7-7-7" /></svg>
            </div>

            {/* FLYOUT MENU */}
            <div className="absolute top-full right-0 mt-1 w-[220px] bg-white shadow-2xl rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200 overflow-hidden">
              <div className="p-2 flex flex-col gap-1">
                {Object.values(countryConfigs).map((config) => (
                  <div
                    key={config.id}
                    onClick={() => switchRegion(config.id)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-[13px] font-bold transition-all ${activeCountryConfig.id === config.id ? 'bg-gray-50 text-[#ee2229]' : 'text-[#191974] hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={getFlagURL(config.id)} alt={config.name} className="w-5 h-3.5 object-cover rounded-sm shadow-xs" />
                      <span>{config.name}</span>
                    </div>
                    {activeCountryConfig.id === config.id && <div className="w-1.5 h-1.5 rounded-full bg-[#ee2229]" />}
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 px-4 py-2 border-t border-gray-100">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">Switch Regional Pricing</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔷 BOTTOM NAVBAR */}
      <nav className="bg-white text-[#191974] px-6 lg:px-16 py-3.5 flex items-center lg:justify-center gap-6 lg:gap-10 text-[14px] font-black tracking-widest font-inter uppercase relative border-b border-gray-100 shadow-sm overflow-x-auto lg:overflow-visible whitespace-nowrap lg:whitespace-normal [&::-webkit-scrollbar]:hidden">

        <div className="relative group cursor-pointer py-1">
          <span className="flex items-center hover:text-[#ee2229] transition-colors group">
            Destinations
            <svg className="w-2.5 h-2.5 ml-1.5 opacity-40 group-hover:rotate-180 group-hover:text-[#ee2229] transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
          </span>
          {/* MEGAMENU CONTAINER */}
          <div className="absolute top-full left-0 w-[980px] bg-white text-black shadow-[0_25px_80px_rgba(0,0,0,0.25)] rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-110 hidden lg:flex border border-gray-100 mt-4 max-h-[550px] overflow-hidden">

            {/* Left Regions Sidebar */}
            <div className="w-[300px] bg-[#f8f9fa] flex flex-col border-r border-gray-100 shrink-0">
              <div className="px-8 py-5 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-20">
                <span className="text-[13px] font-black text-[#191974] uppercase tracking-[0.25em]">Global Regions</span>
              </div>
              <div className="flex-1 py-2">
                {Object.keys(destinations).map((region) => (
                  <div
                    key={region}
                    onMouseEnter={() => setActiveRegion(region as DestinationKey)}
                    className={`px-8 py-3 cursor-pointer text-[14px] transition-all flex justify-between items-center group/region relative border-b border-gray-100/10 ${activeRegion === region ? 'bg-white text-[#191974] font-black shadow-sm' : 'text-[#191974]/60 hover:text-[#191974] hover:bg-white/50'}`}
                  >
                    <span className="uppercase tracking-[0.05em] relative z-10">{region}</span>
                    {activeRegion === region && (
                      <div className="absolute inset-y-0 left-0 w-1.5 bg-[#ee2229]" />
                    )}
                    <svg className={`w-3.5 h-3.5 transition-transform ${activeRegion === region ? 'translate-x-0 opacity-100 text-[#ee2229]' : '-translate-x-2 opacity-0 group-hover/region:translate-x-0 group-hover/region:opacity-40'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Destinations Content Area Area Area */}
            <div className="flex-1 p-8 lg:p-10 bg-white flex flex-col">
              {/* Header */}
              <div className="mb-6 border-b border-gray-100 pb-6 flex items-end justify-between">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[#ee2229] text-[11px] font-black uppercase tracking-[0.3em]">Tour Packages in</span>
                  <h3 className="text-[38px] font-black text-[#191974] uppercase tracking-tighter font-inter leading-none">
                    {activeRegion}
                  </h3>
                </div>
                <Link href={`/${currentRegionCode}/destination`} className="group/all flex items-center gap-2 text-[11px] font-black text-[#191974] hover:text-[#ee2229] transition-colors uppercase tracking-widest pb-1 border-b-2 border-transparent hover:border-[#ee2229]">
                  Expore all {activeRegion}
                  <svg className="w-3.5 h-3.5 group-hover/all:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" /></svg>
                </Link>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-3 gap-x-10 gap-y-3">
                {destinations[activeRegion].map((place, idx) => (
                  <Link
                    key={idx}
                    href={`/${currentRegionCode}/destination/${place.toLowerCase().replace(/ /g, '-')}`}
                    className="text-[#191974]/80 hover:text-[#ee2229] hover:font-black transition-all font-inter font-black text-[14px] uppercase tracking-tighter flex items-center gap-3 group/link relative py-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-100 group-hover/link:bg-[#ee2229] group-hover/link:scale-125 transition-all" />
                    {place}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 🇮🇳 INDIA */}
        <div className="relative group cursor-pointer py-1">
          <span className="flex items-center hover:text-[#ee2229] transition-colors group">
            India
            <svg className="w-2.5 h-2.5 ml-1.5 opacity-40 group-hover:rotate-180 group-hover:text-[#ee2229] transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
          </span>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[400px] bg-white shadow-xl rounded-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 hidden lg:block">
            <div className="p-4 grid grid-cols-2 gap-x-4 gap-y-1">
              {destinations["India"].map((place) => (
                <Link key={place} href={`/${currentRegionCode}/destination/${place.toLowerCase().replace(/ /g, "-")}`} className="block px-2 py-1.5 text-[13px] text-[#191974] font-bold hover:bg-gray-50 hover:text-[#ee2229] transition-all font-arial uppercase tracking-tighter rounded-md">
                  {place}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* SPECIALITY TOURS */}
        <div className="relative group cursor-pointer py-1">
          <span className="flex items-center hover:text-[#ee2229] transition-colors group">
            Speciality Tours
            <svg className="w-2.5 h-2.5 ml-1.5 opacity-40 group-hover:rotate-180 group-hover:text-[#ee2229] transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
          </span>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[220px] bg-white shadow-xl rounded-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 hidden lg:block">
            <div className="py-2">
              {["Family Tour", "Group Tour", "Spiritual Tour", "Honeymoon Tour", "Luxury Retreats"].map((tour) => (
                <Link key={tour} href={`/${currentRegionCode}/tours`} className="block px-6 py-2.5 text-[13px] text-[#191974] font-bold hover:bg-gray-50 hover:text-[#ee2229] transition-all font-arial uppercase tracking-tighter">
                  {tour}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Link href="#" className="hover:text-[#ee2229] transition-colors font-black">Customized Holidays</Link>
        <Link href={`/${currentRegionCode}/visa`} className="hover:text-[#ee2229] transition-colors font-black">Visa</Link>

        {/* COMPANY */}
        <div className="relative group cursor-pointer py-1">
          <span className="flex items-center hover:text-[#ee2229] transition-colors group">
            Company
            <svg className="w-2.5 h-2.5 ml-1.5 opacity-40 group-hover:rotate-180 group-hover:text-[#ee2229] transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
          </span>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[220px] bg-white shadow-xl rounded-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 hidden lg:block">
            <div className="py-2">
              {["Our Story", "Careers", "Testimonials", "Media"].map((item) => (
                <Link key={item} href={`/${currentRegionCode}/${item.toLowerCase().replace(/ /g, "-")}`} className="block px-6 py-2.5 text-[13px] text-[#191974] font-bold hover:bg-gray-50 hover:text-[#ee2229] transition-all font-arial uppercase tracking-tighter">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Link href={`/${currentRegionCode}/inbound`} className="hover:text-[#ee2229] transition-colors font-black">Inbound</Link>
        <Link href="#" className="hover:text-[#ee2229] transition-colors font-black">Weddings</Link>
        <Link href={`/${currentRegionCode}/contact`} className="hover:text-[#ee2229] transition-colors font-black">Contact Us</Link>
      </nav>
    </div>
  );
}