"use client";

import Link from "next/link";
import React, { useEffect, useState, use } from "react";
import { formatRegionalPrice } from "../../config/country";
import { ImagesSlider } from "../components/ui/images-slider";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function Home({ params }: { params: Promise<{ region: string }> }) {
  const { region } = use(params);
  const [displayTours, setDisplayTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [activeHero, setActiveHero] = useState(0);
  const [activeOffer, setActiveOffer] = useState(0);

  useEffect(() => {
    async function fetchTours() {
      try {
        const { data, error } = await supabase
          .from('tours')
          .select('*')
          .limit(4)
          .order('rating', { ascending: false });

        if (error) {
          console.error('Supabase error:', error);
          setErrorStatus(error.message);
        } else {
          setDisplayTours(data || []);
          if (!data || data.length === 0) {
            console.log("No tours found in Supabase 'tours' table.");
          }
        }
      } catch (err: any) {
        console.error('Fetch error:', err);
        setErrorStatus(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTours();
  }, []);

  const heroSlides = [
    {
      bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2946&auto=format&fit=crop", // Luxury Beach
      card1: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1920&auto=format&fit=crop", // Dubai
      card2: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1920&auto=format&fit=crop", // Paris
    },
    {
      bg: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2940&auto=format&fit=crop", // Swiss
      card1: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1920&auto=format&fit=crop", // Paris 
      card2: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2940&auto=format&fit=crop", // Bali
    },
    {
      bg: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2940&auto=format&fit=crop", // Bali
      card1: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1920&auto=format&fit=crop", // Bali Card
      card2: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1920&auto=format&fit=crop", // Dubai
    }
  ];

  const handleNextSlide = () => setActiveHero((p) => (p + 1) % heroSlides.length);
  const handlePrevSlide = () => setActiveHero((p) => (p === 0 ? heroSlides.length - 1 : p - 1));

  const offerSlides = [
    {
      title: "Best Of Japan",
      category: "Japan China Korea Taiwan",
      stops: ["Osaka", "Kyoto", "Hiroshima", "Tokyo", "Fuji"],
      details: "7 Days | 01 May | from Ex-Mumbai ₹2,79,000",
      joiningPrice: "₹2,24,000",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2940&auto=format&fit=crop",
      desc: "Book your own flight tickets and join the tour directly at the first destination and leave from the last destination."
    },
    {
      title: "European Glories",
      category: "France Switzerland Italy",
      stops: ["Paris", "Lucerne", "Mt. Titlis", "Venice", "Rome"],
      details: "12 Days | 15 May | from Ex-Mumbai ₹4,55,000",
      joiningPrice: "₹3,90,000",
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2940&auto=format&fit=crop",
      desc: "Experience the magic of Europe with premium stays and all-inclusive sightseeing."
    },
    {
      title: "Dubai Grandeur",
      category: "UAE Special",
      stops: ["Dubai City", "Burj Khalifa", "Desert Safari", "Abu Dhabi", "Ferrari World"],
      details: "6 Days | Weekly | from Ex-Mumbai ₹1,12,000",
      joiningPrice: "₹85,000",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2940&auto=format&fit=crop",
      desc: "A luxury escape to the city of gold with private transfers and desert adventures."
    }
  ];

  const handleNextOffer = () => setActiveOffer((p) => (p + 1) % offerSlides.length);
  const handlePrevOffer = () => setActiveOffer((p) => (p === 0 ? offerSlides.length - 1 : p - 1));

  const logoItems = Array.from({ length: 40 }, (_, i) => ({
    quote: "",
    name: "",
    title: "",
    image: `/images/logos/img-${i + 1}.jpg`,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-background text-[#171717] font-arial text-[14px]">

      {/* HERO SECTION WITH FULL BG AND CAROUSEL */}
      <section className="relative w-full h-[60vh] flex flex-col justify-between pt-16 lg:pt-20 pb-8 overflow-visible">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            key={heroSlides[activeHero].bg}
            src={heroSlides[activeHero].bg}
            alt="Hero Background"
            className="w-full h-full object-cover transition-all"
          />
          {/* Overlay to darken image slightly for text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between mt-10">

          {/* Left Text */}
          <div className="w-full lg:w-[45%] text-[#191974] space-y-6 mb-12 lg:mb-0">
            <h1 className="text-[32px] font-black font-inter tracking-tight uppercase leading-tight">
              The World is Waiting.<br />
              Start Exploring.
            </h1>
            <p className="text-[26px] text-white font-inter font-light leading-snug">
              Find your dream destination and start your journey with us.
            </p>
            <div className="pt-4">
              <Link href={`/${region}/destination`} className="inline-block bg-white text-[#191974] px-8 py-3.5 rounded-lg font-bold text-[14px] font-inter-tight uppercase tracking-wider hover:bg-white hover:text-[#ee2229] transition-colors shadow-lg">
                SHOW ALL DESTINATIONS
              </Link>
            </div>
          </div>

          {/* Right Carousel */}
          <div className="w-full lg:w-[50%] flex flex-col items-end relative mt-10 lg:mt-0 z-20">
            <div className="flex gap-4 overflow-visible w-full justify-end pr-8 lg:pr-12 relative">
              {/* Card 1 */}
              <div className="w-[140px] md:w-[180px] lg:w-[220px] h-[180px] md:h-[220px] lg:h-[260px] shrink-0 rounded-[16px] lg:rounded-[20px] overflow-hidden relative shadow-lg transition-transform hover:scale-[1.02] cursor-pointer bg-gray-900 border border-white/20">
                <img key={heroSlides[activeHero].card1} src={heroSlides[activeHero].card1} alt="Card 1" className="w-full h-full object-cover" />
              </div>
              {/* Card 2 */}
              <div className="w-[140px] md:w-[180px] lg:w-[220px] h-[180px] md:h-[220px] lg:h-[260px] shrink-0 rounded-[16px] lg:rounded-[20px] overflow-hidden relative shadow-lg transition-transform hover:scale-[1.02] cursor-pointer bg-gray-900 border border-white/20 hidden sm:block">
                <img key={heroSlides[activeHero].card2} src={heroSlides[activeHero].card2} alt="Card 2" className="w-full h-full object-cover" />
              </div>

              {/* Carousel Controls */}
              <div className="absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
                <button onClick={handlePrevSlide} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/80 backdrop-blur-xl hover:bg-white flex items-center justify-center text-[#191974] transition-all border border-white/40 cursor-pointer shadow-2xl hover:scale-110 active:scale-90">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={handleNextSlide} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/80 backdrop-blur-xl hover:bg-white flex items-center justify-center text-[#191974] transition-all border border-white/40 cursor-pointer shadow-2xl hover:scale-110 active:scale-90">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Pill-Shaped Minimalist Search Bar */}
      <div className="w-full bg-white z-20 py-8">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center border border-gray-200 rounded-full bg-white shadow-lg py-2 px-3 transition-shadow hover:shadow-xl">

            {/* Depart From */}
            <div className="w-full lg:flex-1 px-8 py-2 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-200 group cursor-pointer">
              <label className="text-[11px] font-medium text-gray-400 mb-0.5">Depart From</label>
              <div className="flex items-center justify-between w-full">
                <input
                  type="text"
                  placeholder="Where From?"
                  className="w-full text-[15px] font-bold text-gray-900 outline-none bg-transparent placeholder-gray-400"
                />
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            {/* Going To */}
            <div className="w-full lg:flex-1 px-8 py-2 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-200 group cursor-pointer">
              <label className="text-[11px] font-medium text-gray-400 mb-0.5">Going To</label>
              <div className="flex items-center justify-between w-full">
                <input
                  type="text"
                  placeholder="Where to?"
                  className="w-full text-[15px] font-bold text-gray-900 outline-none bg-transparent placeholder-gray-400"
                />
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            {/* Month of Travel */}
            <div className="w-full lg:flex-1 px-8 py-2 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-200 group cursor-pointer relative">
              <label className="text-[11px] font-medium text-gray-400 mb-0.5">Month Of Travel</label>
              <div className="relative w-full flex items-center justify-between">
                <select className="w-full text-[15px] font-bold text-gray-900 outline-none bg-transparent appearance-none cursor-pointer">
                  <option value="">Any Month</option>
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(m => (
                    <option key={m} value={m.toLowerCase()}>{m}</option>
                  ))}
                </select>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            {/* Group/Type (Added to match ref image width) */}
            {/* <div className="w-full lg:flex-[0.6] px-8 py-2 flex flex-col border-b lg:border-b-0 group cursor-pointer">
              <label className="text-[11px] font-medium text-gray-400 mb-0.5">Holidays</label>
              <div className="flex items-center justify-between w-full">
                <span className="text-[15px] font-bold text-gray-900">Select Types</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div> */}

            {/* Compact Search Button */}
            <div className="w-full lg:w-auto p-1.5 flex h-full">
              <button className="w-full lg:w-[130px] bg-[#ee2229] hover:bg-[#d11920] text-white font-black py-4 px-8 rounded-full transition-all shadow-md active:scale-95 text-[14px] uppercase tracking-widest flex items-center justify-center gap-2">
                <span>Search</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Logos Ribbon */}
      <div className="w-full h-[20vh] bg-white border-b border-gray-100 flex items-center justify-center overflow-hidden relative z-10">
        <InfiniteMovingCards items={logoItems} speed="slow" direction="left" className="bg-transparent w-full pt-0 pb-0" />
      </div>

      <section className="pt-12 pb-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10">
            <h2 className="font-inter text-[16px] font-black text-[#191974] mb-2 uppercase tracking-tight">Top Destinations</h2>
            <p className="font-inter text-[16px] text-gray-400 font-light">Discover the world&apos;s most sought-after holiday spots.</p>
          </div>

          <div className="flex overflow-x-auto gap-4 lg:gap-5 pb-6 custom-scrollbar snap-x snap-mandatory">
            {[
              { name: 'Asia', price: '₹13,551', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop', slug: 'india' },
              { name: 'Mainland Europe', price: '₹14,511', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&auto=format&fit=crop', slug: 'france' },
              { name: 'Middle East', price: '₹21,748', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop', slug: 'dubai' },
              { name: 'Europe', price: '₹23,887', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&auto=format&fit=crop', slug: 'italy' },
              { name: 'Africa', price: '₹34,111', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=600&auto=format&fit=crop', slug: 'egypt' },
              { name: 'Australia & NZ', price: '₹46,175', image: 'https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?q=80&w=600&auto=format&fit=crop', slug: 'australia' }
            ].map((card, idx) => (
              <Link
                key={idx}
                href={`/${region}/destination/${card.slug}`}
                className="relative w-[160px] h-[230px] lg:w-[160px] lg:h-[230px] shrink-0 rounded-[12px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 snap-start cursor-pointer group block"
              >
                <img src={card.image} alt={card.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/10 to-black/90 pointer-events-none" />

                <div className="absolute top-4 left-4 right-4">
                  <h3 className="text-white text-[13px] lg:text-[13px] leading-tight drop-shadow-md">{card.name}</h3>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/80 text-[10px] font-medium mb-0.5 drop-shadow-md">Starting from</p>
                  <p className="text-white font-black text-[16px] lg:text-[15px] tracking-tight drop-shadow-md">{card.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Explore By Category */}
      {/* <section className="pt-20 pb-10 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10">
            <h2 className="font-inter text-[32px] font-bold text-gray-900 mb-2">Explore By Category</h2>
            <p className="font-arial text-[14px] text-gray-500">We will help you find the experience you are looking for.</p>
          </div>
          <div className="flex flex-wrap gap-8 justify-between lg:justify-start lg:gap-16">
            {[
              { name: 'Educational', color: 'bg-blue-50', icon: 'M12 14l9-5-9-5-9 5 9 5z' },
              { name: 'Cultural', color: 'bg-orange-50', icon: 'M3 21v-4m22 4v-4m-3.1-3.1l-4-4m-10.8 4l-4-4' },
              { name: 'Heritage', color: 'bg-green-50', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16' },
              { name: 'Bird Watching', color: 'bg-red-50', icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2' },
              { name: 'Cruises', color: 'bg-purple-50', icon: 'M13 10V3L4 14h7v8l9-11h-7z' },
            ].map(cat => (
              <div key={cat.name} className="flex flex-col items-center gap-3 cursor-pointer group hover:-translate-y-1 transition-transform">
                <div className={`w-16 h-16 rounded-full ${cat.color} flex items-center justify-center group-hover:shadow-md transition-shadow border border-gray-100`}>
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={cat.icon} /></svg>
                </div>
                <span className="text-[12px] font-bold text-gray-700">{cat.name} Tours</span>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <section className="pt-12 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="font-inter text-[16px] font-black text-[#191974] mb-2 uppercase tracking-tight">Featured Tours</h2>
              <p className="font-inter text-[16px] text-gray-400 font-light">Explore some of our most popular tours selected for you.</p>
            </div>
            <button className="font-inter-tight text-[14px] font-bold text-[#191974] border border-gray-200 rounded-full px-6 py-2.5 hover:bg-gray-50 transition-colors whitespace-nowrap uppercase tracking-widest">
              Explore all &rsaquo;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full py-20 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#191974] mx-auto mb-4"></div>
                <p className="text-gray-500">Searching for the best destinations...</p>
              </div>
            ) : errorStatus ? (
              <div className="col-span-full py-20 text-center bg-red-50 rounded-3xl border border-red-100">
                <p className="text-red-600 font-bold mb-2">Something went wrong</p>
                <p className="text-red-400 text-sm">{errorStatus}</p>
              </div>
            ) : displayTours.length === 0 ? (
              <div className="col-span-full py-20 text-center bg-blue-50 rounded-3xl border border-blue-100">
                <p className="text-[#191974] font-bold mb-2">No destinations currently listed</p>
                <p className="text-gray-500 text-sm">Please check back soon or run the SQL seed script.</p>
              </div>
            ) : (
              displayTours.map((tour, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-[12px] overflow-hidden shadow-sm flex flex-col group transition-all hover:shadow-xl font-arial">
                  <Link href={`/${region}/tours/${tour.slug}`} className="cursor-pointer">
                    {/* Image Section */}
                    <div className="relative h-[200px] overflow-hidden">
                      <img
                        src={tour.image_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800'}
                        alt={tour.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e: any) => {
                          e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800';
                        }}
                      />
                      {/* Top Badges */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#ee2229] flex items-center justify-center text-white font-black text-[10px] shadow-md border border-white/20">
                          XD
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm text-gray-900 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                          {tour.duration}
                        </div>
                      </div>
                      {/* Map Button */}
                      <div className="absolute bottom-3 right-3">
                        <button className="bg-black/50 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 hover:bg-black/70 transition-colors">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.19 7 11.85 7 9z" /><circle cx="12" cy="9" r="2.5" /></svg>
                          Map
                        </button>
                      </div>
                    </div>
                  </Link>

                  {/* Content Section */}
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-[12px] text-gray-500 font-medium mb-1 font-inter-tight">Explorer</p>
                    <Link href={`/${region}/tours/${tour.slug}`}>
                      <h3 className="text-[18px] font-bold text-[#191974] mb-3 leading-tight font-inter hover:text-[#ee2229] transition-colors">
                        {tour.title}
                      </h3>
                    </Link>

                    <p className="text-[14px] text-gray-500 mb-4 font-arial uppercase tracking-wide">1 Dates Available</p>

                    {/* Icon Grid */}
                    <div className="flex items-center justify-between mb-5 border-t border-gray-50 pt-4">
                      <span className="text-[14px] font-bold text-gray-800">Tour Includes</span>
                      <div className="flex gap-3 text-[#ee2229]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                    </div>

                    {/* Price Section */}
                    <div className="bg-gray-50 -mx-5 px-5 py-5 mt-auto border-t border-gray-100">
                      <div className="flex justify-between items-start mb-5">
                        <div>
                          <p className="text-[11px] text-gray-500 font-medium mb-1 leading-none">All inclusive price starts</p>
                          <p className="text-[24px] font-black text-[#191974] leading-none tracking-tighter">
                            {formatRegionalPrice(tour.base_price_inr, region)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-[#ee2229] uppercase">EMI from</p>
                          <p className="text-[12px] font-black text-[#191974]">₹5,259/mo</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-3">
                        <Link href={`/${region}/tours/${tour.slug}`} className="border border-[#191974] text-[#191974] py-2.5 rounded-lg text-[13px] font-bold text-center font-inter-tight hover:bg-[#ee2229]/5 transition-colors uppercase tracking-widest">
                          View Details
                        </Link>
                        <Link href={`/${region}/booking?tour=${tour.slug}`} className="bg-[#191974] text-white py-2.5 rounded-lg text-[13px] font-bold text-center font-inter-tight hover:bg-[#ee2229] transition-all shadow-md uppercase tracking-widest">
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Offers Banner Section (Ref Image Layout) */}
      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative w-full h-[400px] lg:h-[500px] rounded-[12px] overflow-hidden group shadow-2xl">
            {/* Background Image */}
            <motion.img
              key={offerSlides[activeOffer].image}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              src={offerSlides[activeOffer].image}
              alt={offerSlides[activeOffer].title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark Overlay Wrapper */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />

            {/* Banner Content Container */}
            <motion.div
              key={offerSlides[activeOffer].title}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-full flex flex-col justify-center px-10 lg:px-20 text-white max-w-2xl"
            >

              <div className="flex items-start gap-4 mb-3">
                <div className="w-2 h-14 bg-[#ee2229] rounded-full shrink-0" />
                <div>
                  <p className="text-[14px] lg:text-[16px] font-bold tracking-widest mb-1 opacity-90 uppercase leading-none font-inter-tight">Specials</p>
                  <h2 className="text-[32px] lg:text-[40px] font-black leading-tight text-white tracking-tight uppercase font-inter">{offerSlides[activeOffer].title}</h2>
                </div>
              </div>

              {/* Destination Stops */}
              <div className="flex flex-wrap items-center gap-3 mb-8 text-[14px] font-arial font-bold uppercase tracking-widest text-[#ee2229]">
                {offerSlides[activeOffer].stops.map((stop, sIdx) => (
                  <React.Fragment key={stop}>
                    <span>{stop}</span>
                    {sIdx < offerSlides[activeOffer].stops.length - 1 && <span className="w-1.5 h-1.5 rounded-full bg-white opacity-40" />}
                  </React.Fragment>
                ))}
              </div>

              {/* Timing and Pricing */}
              <div className="mb-10">
                <p className="text-[26px] font-light font-inter mb-2 text-white/90">
                  {offerSlides[activeOffer].details.split('₹')[0]} <span className="text-[#ee2229] font-black">₹{offerSlides[activeOffer].details.split('₹')[1]}</span>
                </p>
                <p className="text-[14px] font-arial leading-relaxed opacity-60 max-w-md">
                  {offerSlides[activeOffer].desc}
                </p>
              </div>

              {/* Action and Disclaimer */}
              <div className="flex flex-col items-start gap-3">
                <Link href={`/${region}/booking`} className="bg-[#ee2229] hover:bg-[#191974] text-white px-14 py-4 rounded-lg font-black text-[14px] font-inter-tight transition-all transform active:scale-95 shadow-2xl uppercase tracking-widest">
                  Confirm Booking
                </Link>
                <p className="text-[10px] opacity-30 font-bold uppercase tracking-widest mt-2">*TERMS AND CONDITIONS APPLY</p>
              </div>
            </motion.div>

            {/* Navigation Chevrons */}
            <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-6">
              <button
                onClick={handlePrevOffer}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-all cursor-pointer border border-white/10 group/btn shadow-lg"
              >
                <svg className="w-6 h-6 text-white group-hover/btn:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={handleNextOffer}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-all cursor-pointer border border-white/10 group/btn shadow-lg"
              >
                <svg className="w-6 h-6 text-white group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {offerSlides.map((_, dotIdx) => (
                <div
                  key={dotIdx}
                  onClick={() => setActiveOffer(dotIdx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${dotIdx === activeOffer ? 'w-12 bg-[#ffcc00]' : 'w-8 bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>

            {/* Floating Info-Blue Badge (Bottom Right Ref) */}


          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-[32px] font-black font-inter text-[#191974] mb-4 uppercase tracking-tight">Why Choose Madura Travel</h2>
            <p className="text-[26px] text-gray-400 font-inter font-light">Premium services designed for the seamless holiday experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "All Inclusive Packages", desc: "Flights, visas, accommodations, and meals are entirely covered." },
              { title: "Expert Tour Managers", desc: "Travel with seasoned professionals who take care of every detail." },
              { title: "Premium Hotels", desc: "Rest in beautifully curated 4-star and 5-star properties globally." }
            ].map((feat, idx) => (
              <div key={idx} className="group relative bg-[#191974]/5 border border-[#191974]/10 p-10 rounded-3xl hover:bg-[#191974]/10 transition-colors overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#ee2229] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                <div className="w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-6 text-[#191974]">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-[20px] font-bold text-[#171717] mb-3">{feat.title}</h3>
                <p className="text-gray-600 font-inter-tight leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#f8f9ff] border-y border-gray-100 overflow-hidden flex flex-col items-center relative">
        <div className="absolute left-0 top-0 w-64 h-64 bg-red-500/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />

        <div className="text-center mb-16 relative z-10 w-full max-w-7xl px-4">
          <h2 className="text-[36px] font-black font-inter text-[#191974] mb-3 uppercase tracking-tighter">Guest Testimonials</h2>
          <div className="w-24 h-1.5 bg-[#ee2229] mx-auto rounded-full mb-6" />
          <p className="text-[22px] text-gray-400 font-inter font-light max-w-2xl mx-auto">Hear from those who&apos;ve experienced the world with Madura Travel.</p>
        </div>
        <InfiniteMovingCards
          speed="slow"
          items={[
            { quote: "An absolutely luxurious experience. Madura Travel exceeded all my expectations.", name: "Rajesh S.", title: "Europe Explorer" },
            { quote: "Flawless execution from booking to return. Highly recommended for family trips.", name: "Priya V.", title: "Japan Tour" },
            { quote: "The tour managers were exceptionally professional and the hotels were fantastic.", name: "Amit K.", title: "Australia Grandeur" },
            { quote: "Every single day was planned to perfection. A truly premium travel company.", name: "Neha D.", title: "Swiss Escapade" }
          ]}
        />
      </section>



    </div>
  );
}
