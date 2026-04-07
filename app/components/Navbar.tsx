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
      <div className="bg-white  text-[#191974] px-4 lg:px-8 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href={`/${currentRegionCode}`} className="flex items-center shrink-0">
          <Image
            src="/logo.webp"
            alt="Madura Travel Logo"
            width={140}
            height={45}
            className="object-contain"
            priority
          />
        </Link>

        {/* 🔍 Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <div className="relative w-full">
            <input
              type="text"
              placeholder='Search "Destination"'
              className="w-full px-5 py-2.5 rounded-full text-white text-sm outline-none bg-[#191974] border-[#191974] font-medium"
            />
            {/* <div className="absolute right-4 top-2.5 flex items-center gap-2">
              <span className="text-gray-400 cursor-pointer text-lg">🎤</span>
              <span className="text-gray-400 text-lg">🔍</span>
            </div> */}
          </div>
        </div>

        {/* Utilities */}
        <div className="flex items-center space-x-4">

          {/* Contact */}
          <div className="hidden lg:flex flex-col relative group">
            <div className="flex items-center bg-white px-4 py-2 rounded-md gap-2 border border-[#191974] cursor-pointer hover:bg-white transition-all">
              <div className="flex flex-col">
                <a href="tel:+919092949494" className="text-[14px] font-bold leading-none hover:text-[#ee2229] transition-colors">+91 90 92 94 94 94</a>
              </div>
              <svg
                className="w-2.5 h-2.5 ml-1 opacity-60 transition-transform group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Contact Dropdown */}
            <div className="absolute top-full right-0 mt-2 w-[340px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
              <div className="p-6 flex flex-col gap-5">
                <h3 className="text-[18px] font-bold text-[#171717] font-inter">Contact Us</h3>

                {/* Toll Free */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#191974]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] text-gray-500 font-medium">Our Toll Free Numbers:</span>
                    <a href="tel:+919092949494" className="text-[15px] font-bold text-[#171717] hover:text-[#ee2229] transition-colors">+91 90 92 94 94 94</a>
                  </div>
                </div>

                {/* Local Call */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#ee2229]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] text-gray-500 font-medium">You can also call us on:</span>
                    <a href="tel:+919092949494" className="text-[14px] font-bold text-[#171717] hover:text-[#ee2229] transition-colors">+91 90 92 94 94 94</a>
                    <a href="tel:+919092949494" className="text-[14px] font-bold text-[#171717] hover:text-[#ee2229] transition-colors">+91 90 92 94 94 94</a>
                  </div>
                </div>

                {/* NRI / Foreign */}
                <div className="flex gap-3 pt-2 border-t border-gray-50">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] text-gray-500 font-medium">Foreign Nationals/NRIs:</span>
                    <div className="mt-1">
                      <span className="text-[11px] text-gray-400 block uppercase">Within India</span>
                      <a href="tel:+919152004511" className="text-[14px] font-bold text-[#171717] hover:text-[#ee2229] transition-colors">+91 915 200 4511</a>
                    </div>
                    <div className="mt-1">
                      <span className="text-[11px] text-gray-400 block uppercase">Outside India</span>
                      <a href="tel:+918879972221" className="text-[14px] font-bold text-[#171717] hover:text-[#ee2229] transition-colors">+91 887 997 2221</a>
                    </div>
                  </div>
                </div>

                {/* Footer Links */}
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                  <Link href="mailto:mail@maduratravel.com" className="flex items-center gap-2 text-[13px] text-[#191974] font-semibold hover:underline">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    mail@maduratravel.com
                  </Link>
                  <Link href="#" className="flex items-center gap-2 text-[13px] text-[#191974] font-semibold hover:underline">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    Nearest Madura Travel Office &gt;
                  </Link>
                  <div className="flex items-center gap-2 text-[12px] text-gray-500 font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Business hours <span className="font-bold text-[#171717] ml-1">9.30AM - 6PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Login */}
          <div className="flex items-center gap-2 group cursor-pointer hover:text-[#191974] transition-colors">
            {/* <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-lg">👤</div> */}
            <div className="flex flex-col items-center">
              <Link href={`/${currentRegionCode}/login`} className="text-[12px] font-bold leading-none">Login</Link>

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />

            </div>
          </div>

          {/* Country Selector */}
          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-1.5 bg-white text-black px-3 py-1.5 rounded-[4px] font-bold text-[13px] border border-gray-100 shadow-sm hover:border-gray-200 transition-all">
              <img
                src={getFlagURL(activeCountryConfig.id)}
                alt={`${activeCountryConfig.name} flag`}
                className="w-5 h-3.5 object-cover rounded-sm shadow-sm"
              />
              <span className="whitespace-nowrap">{activeCountryConfig.name}</span>
              <svg
                className="w-2.5 h-2.5 opacity-60 transition-transform group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Dropdown */}
            <div className="absolute top-full right-0 mt-2 w-[180px] bg-white shadow-xl rounded-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
              <div className="py-1">
                {Object.values(countryConfigs).map((config) => (
                  <button
                    key={config.id}
                    onClick={() => switchRegion(config.id)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#ee2229] transition-colors"
                  >
                    <img
                      src={getFlagURL(config.id)}
                      alt={config.name}
                      className="w-5 h-3.5 object-cover rounded-sm shadow-sm"
                    />
                    <span className="font-medium">{config.name}</span>
                    {activeCountryConfig.id === config.id && (
                      <span className="ml-auto text-[#ee2229] text-[10px]">●</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔷 BOTTOM NAVBAR */}
      <nav className="bg-[#191974] text-white px-8 lg:px-16 py-3 flex items-center justify-between text-[13px] font-black tracking-[0.05em] border-t border-[#1e4a8a] shadow-inner font-inter uppercase">

        {/* Destination Dropdown */}
        <div className="relative group cursor-pointer py-1">
          <span className="flex items-center hover:text-red-500 transition-colors uppercase">
            Destinations
            <svg
              className="w-2.5 h-2.5 ml-1 opacity-60 transition-transform group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
          <div className="absolute top-full left-0 w-[800px] bg-white text-black shadow-2xl rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 flex overflow-hidden border border-gray-200 mt-2">
            <div className="w-1/3 bg-gray-50 flex flex-col max-h-[500px] overflow-y-auto">
              {Object.keys(destinations).map((region) => (
                <div
                  key={region}
                  onMouseEnter={() => setActiveRegion(region as DestinationKey)}
                  className={`px-5 py-3 cursor-pointer text-[13px] transition-colors flex justify-between items-center ${activeRegion === region ? 'bg-white border-l-4 border-red-600 font-bold text-[#191974]' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {region}
                  <span className="text-gray-400">›</span>
                </div>
              ))}
            </div>
            <div className="w-2/3 p-6 bg-white flex flex-col">
              <h3 className="text-[16px] font-bold text-[#191974] mb-4 border-b border-gray-100 pb-2 uppercase">{activeRegion}</h3>
              <div className="grid grid-cols-3 gap-x-4 gap-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {destinations[activeRegion].map((place, idx) => (
                  <Link key={idx} href={`/${currentRegionCode}/destination/${place.toLowerCase().replace(/ /g, '-')}`} className="text-[12px] text-gray-600 hover:text-red-600 hover:underline transition-all">
                    {place}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">

          {/* Trigger */}
          <span className="hover:text-[#ee2229] transition uppercase group flex items-center cursor-pointer">
            India
            <svg
              className="w-2.5 h-2.5 ml-1 opacity-60 transition-transform group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>

          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-2 w-[220px] bg-white shadow-xl rounded-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 max-h-[300px] overflow-y-auto">

            {destinations["India"].map((place, idx) => (
              <Link
                key={idx}
                href={`/${currentRegionCode}/destination/${place.toLowerCase().replace(/ /g, "-")}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#ee2229] transition"
              >
                {place}
              </Link>
            ))}

          </div>
        </div>
        <div className="relative group">

          {/* Trigger */}
          <span className="hover:text-[#ee2229] transition uppercase flex items-center cursor-pointer">
            Speciality Tours
            <svg
              className="w-2.5 h-2.5 ml-1 opacity-60 transition-transform group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>

          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-2 w-[220px] bg-white shadow-xl rounded-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">

            {[
              "Family Tour",
              "Group Tour",
              "Spiritual Tour",
              "Honeymoon Tour",
            ].map((tour, idx) => (
              <Link
                key={idx}
                href={`/tours/${tour.toLowerCase().replace(/ /g, "-")}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#ee2229] transition"
              >
                {tour}
              </Link>
            ))}

          </div>
        </div>
        <Link href="#" className="hover:text-red-500 transition-colors uppercase group flex items-center">
          Customized Holidays
          <svg
            className="w-2.5 h-2.5 ml-1 opacity-60 transition-transform group-hover:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Link>
        <Link href={`/${currentRegionCode}/visa`} className="hover:text-red-500 transition-colors uppercase">Visa</Link>
        <div className="relative group">

          {/* Trigger */}
          <span className="hover:text-[#ee2229] transition uppercase flex items-center cursor-pointer">
            Company
            <svg
              className="w-2.5 h-2.5 ml-1 opacity-60 transition-transform group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>

          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-2 w-[200px] bg-white shadow-xl rounded-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">

            <Link
              href={`/${currentRegionCode}/our-story`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#ee2229]"
            >
              Our Story
            </Link>

            <Link
              href={`/${currentRegionCode}/careers`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#ee2229]"
            >
              Careers
            </Link>

            <Link
              href={`/${currentRegionCode}/testimonials`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#ee2229]"
            >
              Testimonials
            </Link>

            <Link
              href={`/${currentRegionCode}/media`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#ee2229]"
            >
              Media
            </Link>

          </div>
        </div>
        <Link href="#" className="hover:text-red-500 transition-colors uppercase group flex items-center">
          Inbound
          <svg
            className="w-2.5 h-2.5 ml-1 opacity-60 transition-transform group-hover:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Link>
        <Link href="#" className="hover:text-red-500 transition-colors uppercase">Weddings</Link>
        <Link href="#" className="hover:text-red-500 transition-colors uppercase">Contact Us</Link>
      </nav>

    </div >
  );
}