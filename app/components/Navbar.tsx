"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { countryConfigs } from "../../config/country";
import LoginPopup from "./LoginPopup";
import { Globe, ShieldCheck, LogOut } from "lucide-react";
import { createClient } from '@/utils/supabase/client';

const destinations = {
  // ... existing destinations ...
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

const popularDestinations = ["India", "Australia", "Dubai", "Vietnam", "Singapore", "Malaysia", "Sri Lanka"];
const allDestinations = Object.values(destinations).flat();

type DestinationKey = keyof typeof destinations;

import SidebarFeaturedContent from "./SidebarFeaturedContent";

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState<DestinationKey>("India");
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [sidebarDestRegion, setSidebarDestRegion] = useState<DestinationKey>("India");
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  const currentRegionCode = (pathname?.split('/')[1] || 'en-in').toLowerCase();
  const activeCountryConfig = countryConfigs[currentRegionCode] || countryConfigs['en-in'];

  const filteredResults = allDestinations.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (place: string) => {
    setQuery(place);
    setIsOpen(false);
    router.push(`/${currentRegionCode}/destination/${place.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error(e);
    }
    setUser(null);
    setIsAdmin(false);
    setSidebarOpen(false);
    window.location.href = `/${currentRegionCode}`;
  };

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

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Lock body scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  // Handle Session
  useEffect(() => {
    const checkAdmin = async (email: string | undefined) => {
      if (!email) return false;
      const { data } = await supabase.from('admin_users').select('email').eq('email', email).single();
      return !!data;
    };

    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setIsAdmin(await checkAdmin(session?.user?.email));
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event: string, session: any) => {
      setUser(session?.user || null);
      setIsAdmin(await checkAdmin(session?.user?.email));
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <>
      <div className="w-full flex flex-col fixed top-0 left-0 z-100 shadow-md">

        {/* 🔹 TOP HEADER */}
        <div className="bg-white text-[#191974] px-4 lg:px-8 py-3 flex items-center justify-between">

          {/* Logo */}
          <Link href={`/${currentRegionCode}`} className="flex items-center shrink-0">
            <Image
              src="/logo.webp"
              alt="Madura Travel Logo"
              width={160}
              height={50}
              className="object-contain"
              style={{ height: 'auto' }}
              priority
            />
          </Link>

          {/* Right side: Search + Phone + Login + Country + Hamburger */}
          <div className="flex items-center gap-4 ">

            {/* ðŸ” SEARCH BAR */}
            <div className="relative w-56 hidden sm:block">
              <input
                type="text"
                value={query}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setTimeout(() => setIsOpen(false), 150)}
                onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
                placeholder='Search "Destination"'
                className="w-full px-4 py-1.5 rounded-full border border-[#191974] text-[13px] outline-none focus:border-[#ee2229] transition-colors"
                suppressHydrationWarning
              />
              {isOpen && (
                <div className="absolute w-full bg-white shadow-2xl rounded-xl mt-2 z-50 border border-gray-100 overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <div className="px-4 py-2 border-b border-gray-50">
                    <p className="text-[10px]  text-gray-400  tracking-widest">
                      {query.trim().length === 0 ? "Popular Destinations" : "Search Results"}
                    </p>
                  </div>
                  {(query.trim().length === 0 ? popularDestinations : filteredResults).length > 0 ? (
                    (query.trim().length === 0 ? popularDestinations : filteredResults).map((place, index) => (
                      <div
                        key={index}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleSelect(place)}
                        className="px-4 py-2.5 cursor-pointer hover:bg-[#191974]/5 text-[13px] text-[#191974] font-bold  tracking-wide transition-colors flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#ee2229] shrink-0" />
                        {place}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-400 text-[13px]">No results found</div>
                  )}
                </div>
              )}
            </div>

            {/* Contact info box with Dropdown */}
            <div className="hidden xl:block relative group">
              <div className="flex items-center border border-gray-200 px-4 py-1.5 rounded-lg gap-2 cursor-pointer hover:border-[#191974] transition-all group-hover:bg-gray-50">
                <span className="text-[14px] font-bold text-[#191974]">+91 90 92 94 94 94</span>
                <svg className="w-2.5 h-2.5 opacity-40 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
              </div>

              {/* Phone Numbers Dropdown */}
              <div className="absolute top-full right-0 mt-2 w-[320px] bg-white shadow-2xl rounded-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200 z-200 overflow-hidden">
                <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50">
                  <p className="text-[13px] text-[#191974] tracking-widest">Contact Us</p>
                </div>
                <div className="px-5 py-4 flex flex-col gap-4">

                  {/* Call us */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#191974]/8 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[#191974]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-[10px] text-gray-400 tracking-wider">Call us</p>
                      <a href="tel:18003135555" className="text-[16px] text-[#191974] hover:text-[#ee2229] transition-colors tracking-tight">+91 90 92 94 94 94</a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#191974]/8 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[#191974]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-[10px] text-gray-400 tracking-wider">You can also call us on</p>
                      <a href="tel:+919092949494" className="text-[15px] text-[#191974] hover:text-[#ee2229] transition-colors tracking-tight">+91 90 92 94 94 94</a>
                    </div>
                  </div>

                  {/* International */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#191974]/8 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[#191974]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>


                    <div>
                      <p className="text-[10px] text-gray-400 font-semibold">International</p>
                      <a href="tel:+61434500743" className="text-[15px] text-[#191974] hover:text-[#ee2229] transition-colors tracking-tight">+61 434 500 743</a>
                    </div>
                  </div>


                  <div className="h-px bg-gray-100" />

                  {/* Email */}
                  <a href="mailto:travel@maduratravel.com" className="flex items-center gap-3 group/email">
                    <div className="w-7 h-7 rounded-full bg-[#191974]/8 flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 text-[#191974] group-hover/email:text-[#ee2229] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <span className="text-[13px] font-bold text-[#191974] group-hover/email:text-[#ee2229] transition-colors underline underline-offset-2">mail@maduratravel.com</span>
                  </a>

                  {/* Office */}
                  {/* <Link href={`/${currentRegionCode}/contact`} className="flex items-center justify-between gap-3 group/office">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#191974]/8 flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-[#191974] group-hover/office:text-[#ee2229] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                      <span className="text-[13px] font-bold text-[#191974] group-hover/office:text-[#ee2229] transition-colors underline underline-offset-2">Nearest Madura Office</span>
                    </div>
                    <svg className="w-3.5 h-3.5 text-gray-400 group-hover/office:text-[#ee2229] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                  </Link> */}

                  {/* Business Hours */}
                  {/* <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#191974]/8 flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 text-[#191974]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <p className="text-[13px] text-gray-500 font-semibold">Business hours <span className="text-[#191974]">10 AM - 7 PM</span></p>
                  </div> */}
                </div>

                {/* 24/7 Marker */}
                <div className="bg-[#191974] px-4 py-2.5 flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] text-white tracking-widest">24/7 Support Active</span>
                </div>
              </div>
            </div>

            {/* Login */}
            {!user ? (
              <button suppressHydrationWarning onClick={() => setIsLoginOpen(true)} className="hidden md:block text-[14px] font-bold hover:text-[#ee2229] transition-colors">
                Log In
              </button>
            ) : (
              <button
                suppressHydrationWarning
                onClick={handleSignOut}
                className="hidden md:block text-[14px] font-bold hover:text-[#ee2229] transition-colors text-red-500"
              >
                Log Out
              </button>
            )}

            {/* Country Selector */}
            <div className="relative group cursor-pointer z-150">
              <div className="flex items-center gap-3 border border-gray-100 px-3 py-1.5 rounded-lg font-bold text-[13px] hover:border-gray-200 bg-white transition-all">
                <div className="flex items-center gap-1.5 border-r border-gray-100 pr-2">
                  <Globe className="w-4 h-4 text-[#191974]" />
                  <span className="text-[12px] text-[#191974]">{activeCountryConfig.language}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src={getFlagURL(activeCountryConfig.id)}
                    alt={`${activeCountryConfig.name} flag`}
                    className="w-5 h-3.5 object-cover rounded-sm shadow-sm"
                  />
                  <div className="flex flex-col leading-none">
                    <span className="text-[12px]  text-[#191974]">{activeCountryConfig.name}</span>
                    <span className="text-[9px] font-bold text-gray-400">{activeCountryConfig.currencySymbol} {activeCountryConfig.currencyCode}</span>
                  </div>
                </div>
                <svg className="w-2.5 h-2.5 ml-1 opacity-40 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 9l-7 7-7-7" /></svg>
              </div>

              {/* FLYOUT MENU */}
              <div className="absolute top-full right-0 mt-1 w-[280px] bg-white shadow-2xl rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <p className="text-[10px]  text-gray-400  tracking-widest capitalize">Select Region & Language</p>
                </div>
                <div className="p-2 flex flex-col gap-1">
                  {Object.values(countryConfigs).map((config) => (
                    <div
                      key={config.id}
                      onClick={() => switchRegion(config.id)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all cursor-pointer ${activeCountryConfig.id === config.id
                        ? 'bg-[#191974]/5 border border-[#191974]/10'
                        : 'hover:bg-gray-50 border border-transparent'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <img src={getFlagURL(config.id)} alt={config.name} className="w-6 h-4 object-cover rounded-sm shadow-sm" />
                        <div className="flex flex-col">
                          <span className="text-[12px]  text-[#191974]">{config.name}</span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-bold text-[#ee2229] ">{config.language}</span>
                            <span className="text-[10px] text-gray-400">·</span>
                            <span className="text-[10px] font-bold text-gray-400">{config.currencySymbol} - {config.currencyCode}</span>
                          </div>
                        </div>
                      </div>
                      {activeCountryConfig.id === config.id
                        ? <div className="w-2 h-2 rounded-full bg-[#ee2229]" />
                        : <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                      }
                    </div>
                  ))}
                </div>
                <div className="bg-[#191974] px-4 py-2.5 flex items-center justify-center gap-2">
                  <span className="text-[9px] text-white   tracking-widest ">Global Pricing Support Active</span>
                </div>
              </div>
            </div>

            {/* â˜° HAMBURGER BUTTON */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex flex-col justify-center items-center w-10 h-10 rounded-lg border border-gray-200 hover:border-[#191974] hover:bg-gray-50 transition-all gap-1.5 shrink-0"
              aria-label="Open menu"
              suppressHydrationWarning
            >
              <span className="w-5 h-0.5 bg-[#191974] rounded-full transition-all" />
              <span className="w-5 h-0.5 bg-[#191974] rounded-full transition-all" />
              <span className="w-5 h-0.5 bg-[#191974] rounded-full transition-all" />
            </button>

          </div>
        </div>
      </div>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SIDEBAR OVERLAY + DRAWER
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}

      {/* Backdrop (Dimmed/Blurred) */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-200 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SIDEBAR OVERLAY CONTENT (Testimonials + Drawer)
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div className={`fixed top-0 right-0 h-full flex z-210 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Testimonials Section (White BG, Left of Sidebar) */}
        <div className="hidden lg:flex w-[340px] h-full bg-white border-r border-gray-100 flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.05)] overflow-hidden">
          <SidebarFeaturedContent isVisible={sidebarOpen} />
        </div>

        {/* Drawer (Right Sidebar) */}
        <div className="h-full w-[340px] max-w-[90vw] bg-white flex flex-col shadow-2xl">

          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#191974] shrink-0">
            <Link href={`/${currentRegionCode}`} onClick={() => setSidebarOpen(false)}>
              <Image src="/logo.webp" alt="Madura Travel" width={120} height={38} className="object-contain brightness-0 invert" />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Scrollable Menu */}
          <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">

            {/* User Greeting Section */}
            <div className="px-6 py-6 mb-2 bg-[#191974]/2 border-b border-gray-100">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] mb-1.5 ">Welcome</p>
              <h3 className="text-[22px] font-bold text-[#191974] tracking-tight">
                {user ? `Hello ${user.user_metadata?.first_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Member'}!` : 'Hello Folks'}
              </h3>
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setSidebarOpen(false)}
                  className="inline-flex items-center gap-2 mt-3 text-[11px] font-bold text-[#ee2229] bg-red-50 px-4 py-1.5 rounded-full border border-red-100 animate-pulse"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  ADMIN PANEL ACCESSIBLE
                </Link>
              )}
            </div>

            {/* â”€â”€â”€ DESTINATIONS â”€â”€â”€ */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => toggleSection('destinations')}
                className="w-full flex items-center justify-between px-6 py-4 text-[#191974]  text-[13px]  tracking-widest hover:bg-gray-50 transition-colors"
              >
                <span className="flex items-center gap-3">
                  Destinations
                </span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedSection === 'destinations' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {expandedSection === 'destinations' && (
                <div className="pb-2">
                  {/* Region tabs */}
                  <div className="px-4 pb-2 flex flex-col gap-px">
                    {Object.keys(destinations).map((region) => (
                      <div key={region}>
                        <button
                          onClick={() => setSidebarDestRegion(region as DestinationKey)}
                          className={`w-full text-left px-4 py-2.5 rounded-lg text-[12px]   tracking-wider flex items-center justify-between transition-all ${sidebarDestRegion === region ? 'bg-[#191974] text-white' : 'text-[#191974]/60 hover:text-[#191974] hover:bg-gray-50'}`}
                        >
                          {region}
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                        </button>
                        {sidebarDestRegion === region && (
                          <div className="px-4 pt-1 pb-2 grid grid-cols-2 gap-x-3 gap-y-1">
                            {destinations[region as DestinationKey].map((place) => (
                              <Link
                                key={place}
                                href={`/${currentRegionCode}/destination/${place.toLowerCase().replace(/ /g, '-')}`}
                                onClick={() => setSidebarOpen(false)}
                                className="text-[12px] text-[#191974] font-bold hover:text-[#ee2229] transition-colors flex items-center gap-1.5 py-1"
                              >
                                <span className="w-1 h-1 rounded-full bg-[#ee2229] shrink-0" />
                                {place}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* â”€â”€â”€ INDIA â”€â”€â”€ */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => toggleSection('india')}
                className="w-full flex items-center justify-between px-6 py-4 text-[#191974]  text-[13px]  tracking-widest hover:bg-gray-50 transition-colors"
              >
                <span className="flex items-center gap-3">
                  India
                </span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedSection === 'india' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {expandedSection === 'india' && (
                <div className="px-6 pb-4 grid grid-cols-2 gap-x-3 gap-y-1">
                  {destinations["India"].map((place) => (
                    <Link
                      key={place}
                      href={`/${currentRegionCode}/destination/${place.toLowerCase().replace(/ /g, '-')}`}
                      onClick={() => setSidebarOpen(false)}
                      className="text-[12px] text-[#191974] font-bold hover:text-[#ee2229] transition-colors flex items-center gap-1.5 py-1"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#ee2229] shrink-0" />
                      {place}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* â”€â”€â”€ SPECIALITY TOURS â”€â”€â”€ */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => toggleSection('speciality')}
                className="w-full flex items-center justify-between px-6 py-4 text-[#191974]  text-[13px]  tracking-widest hover:bg-gray-50 transition-colors"
              >
                <span className="flex items-center gap-3">
                  Speciality Tours
                </span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedSection === 'speciality' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {expandedSection === 'speciality' && (
                <div className="px-6 pb-3 flex flex-col gap-1">
                  {["Family Tour", "Group Tour", "Spiritual Tour", "Honeymoon Tour", "Luxury Retreats"].map((tour) => (
                    <Link
                      key={tour}
                      href={`/${currentRegionCode}/tours`}
                      onClick={() => setSidebarOpen(false)}
                      className="text-[13px] text-[#191974] font-bold hover:text-[#ee2229] transition-colors flex items-center gap-2 py-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#ee2229] shrink-0" />
                      {tour}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* --- SIMPLE LINKS --- */}
            {[
              { label: "Customized Holidays", href: "/en-in/contact" },
              { label: "Visa", href: `/${currentRegionCode}/visa` },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 text-[#191974]  text-[13px]  tracking-widest hover:bg-gray-50 hover:text-[#ee2229] transition-colors"
              >
                {label}
              </Link>
            ))}

            {/* --- COMPANY --- */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => toggleSection('company')}
                className="w-full flex items-center justify-between px-6 py-4 text-[#191974]  text-[13px]  tracking-widest hover:bg-gray-50 transition-colors"
              >
                <span className="flex items-center gap-3">
                  Company
                </span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedSection === 'company' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {expandedSection === 'company' && (
                <div className="px-6 pb-3 flex flex-col gap-1">
                  {["Our Story", "Careers", "Testimonials", "Media"].map((item) => (
                    <Link
                      key={item}
                      href={`/${currentRegionCode}/${item.toLowerCase().replace(/ /g, "-")}`}
                      onClick={() => setSidebarOpen(false)}
                      className="text-[13px] text-[#191974] font-bold hover:text-[#ee2229] transition-colors flex items-center gap-2 py-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#ee2229] shrink-0" />
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* --- MORE SIMPLE LINKS --- */}
            {[
              { label: "Inbound", href: `/${currentRegionCode}/inbound` },
              { label: "Weddings", href: "#" },
              { label: "Contact Us", href: `/${currentRegionCode}/contact` },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 text-[#191974]  text-[13px]  tracking-widest hover:bg-gray-50 hover:text-[#ee2229] transition-colors"
              >
                {label}
              </Link>
            ))}

            {/* --- ADMIN OPTIONS --- */}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 text-[#ee2229] font-bold text-[13px] tracking-widest hover:bg-red-50 transition-colors"
              >
                <ShieldCheck className="w-5 h-5" />
                Admin Dashboard
              </Link>
            )}

          </div>

          {/* Sidebar Footer */}
          <div className="shrink-0 bg-gray-50 px-6 py-6 border-t border-gray-100 flex flex-col gap-4">
            {user ? (
              <button
                suppressHydrationWarning
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 border border-red-100 text-[#ee2229] text-[12px] tracking-widest rounded-xl hover:bg-[#ee2229] hover:text-white transition-all shadow-sm font-bold"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            ) : (
              <button
                suppressHydrationWarning
                onClick={() => {
                  setSidebarOpen(false);
                  setIsLoginOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 text-[#191974]  text-[12px]  tracking-widest rounded-xl hover:bg-[#191974] hover:text-white transition-all shadow-sm font-bold"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                Sign In
              </button>
            )}

            <div>
              <p className="text-[10px] text-gray-400  tracking-widest mb-1.5 ">Reach Us</p>
              <a href="tel:18003135555" className="text-[16px]  text-[#191974] hover:text-[#ee2229] transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ee2229]" />
                +91 90929 49494
              </a>
              <p className="text-[10px] text-gray-400 mt-0.5 font-bold  tracking-tight">Toll Free · 10 AM - 7 PM</p>
            </div>
          </div>

        </div>
      </div>
      <LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}