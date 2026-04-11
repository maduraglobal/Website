"use client";

import Link from "next/link";
import React, { useEffect, useState, use, useRef } from "react";
import { useRouter } from "next/navigation";
import { formatRegionalPrice } from "../../config/country";
import { ImagesSlider } from "../components/ui/images-slider";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import PopupForm from "../components/PopupForm";
import CorporateOffice from "../components/CorporateOffice";
import AwardsSection from "../components/AwardsSection";
import TestimonialsDraggable from "../components/TestimonialsDraggable";
import TestimonialsDraggableInHero from "../components/TestimonialsDraggableInHero";
import { Users, Globe, Award, Star as StarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import TourInclusions from "../components/tours/TourInclusions";
import TourCard from "../components/tours/TourCard";
import VerticalTourCard from "../components/tours/VerticalTourCard";
import { getDestinations } from "@/utils/crm";

const supabase = createClient();



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

const offerSlides = [
  {
    title: "Best Of Japan",
    category: "Japan China Korea Taiwan",
    stops: ["Osaka", "Kyoto", "Hiroshima", "Tokyo", "Fuji"],
    detailText: "7 Days | 01 May | from Ex-Mumbai",
    priceInr: 279000,
    joiningPriceInr: 224000,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2940&auto=format&fit=crop",
    desc: "Book your own flight tickets and join the tour directly at the first destination and leave from the last destination."
  },
  {
    title: "European Glories",
    category: "France Switzerland Italy",
    stops: ["Paris", "Lucerne", "Mt. Titlis", "Venice", "Rome"],
    detailText: "12 Days | 15 May | from Ex-Mumbai",
    priceInr: 455000,
    joiningPriceInr: 390000,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2940&auto=format&fit=crop",
    desc: "Experience the magic of Europe with premium stays and all-inclusive sightseeing."
  },
  {
    title: "Dubai Grandeur",
    category: "UAE Special",
    stops: ["Dubai City", "Burj Khalifa", "Desert Safari", "Abu Dhabi", "Ferrari World"],
    detailText: "6 Days | Weekly | from Ex-Mumbai",
    priceInr: 112000,
    joiningPriceInr: 85000,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2940&auto=format&fit=crop",
    desc: "A luxury escape to the city of gold with private transfers and desert adventures."
  }
];

const logoItems = Array.from({ length: 40 }, (_, i) => ({
  quote: "",
  name: "",
  title: "",
  image: `/images/logos/img-${i + 1}.jpg`,
}));

export default function Home({ params }: { params: Promise<{ region: string }> }) {
  const { region } = use(params);
  const router = useRouter();

  const [displayTours, setDisplayTours] = useState<any[]>([]);
  const [topDestinations, setTopDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [activeHero, setActiveHero] = useState(0);
  const [activeOffer, setActiveOffer] = useState(0);
  const [searchTo, setSearchTo] = useState("");
  const [searchMonth, setSearchMonth] = useState("");
  
  const destScrollRef = useRef<HTMLDivElement>(null);

  const scrollDest = (direction: 'left' | 'right') => {
    if (destScrollRef.current) {
      const scrollAmount = 400;
      destScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleNextSlide = () => setActiveHero((p) => (p + 1) % heroSlides.length);
  const handlePrevSlide = () => setActiveHero((p) => (p === 0 ? heroSlides.length - 1 : p - 1));
  const handleNextOffer = () => setActiveOffer((p) => (p + 1) % offerSlides.length);
  const handlePrevOffer = () => setActiveOffer((p) => (p === 0 ? offerSlides.length - 1 : p - 1));

  useEffect(() => {
    async function fetchTours() {
      try {
        const { data, error } = await supabase
          .from('tours')
          .select('*')
          .limit(3)
          .order('rating', { ascending: false });

        if (error) {
          console.error('Supabase error:', error);
          setErrorStatus(error.message);
        } else {
          setDisplayTours(data || []);
        }

        // Fetch Dynamic Destinations
        const dests = await getDestinations();
        setTopDestinations(dests.slice(0, 6));

      } catch (err: any) {
        console.error('Fetch error:', err);
        setErrorStatus(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTours();
  }, []);



  const handleSearch = () => {
    let url = `/${region}/tours`;
    const searchParamsObj = new URLSearchParams();
    if (searchTo) searchParamsObj.append('search', searchTo);
    if (searchMonth) searchParamsObj.append('month', searchMonth);
    const query = searchParamsObj.toString();
    if (query) url += `?${query}`;
    router.push(url);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-[#171717] text-[14px]">
      {/* HERO SECTION - 60vh */}
      <section className="relative w-full h-[70vh] flex flex-col pt-12 lg:pt-16 pb-6 overflow-visible">
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

        <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 relative z-10 flex-1 flex flex-col items-center justify-center mt-10">
          {/* Centered Text */}
          <div className="w-full text-[#191974] space-y-3">
            <h1 className="text-[32px] md:text-[56px]  tracking-tight leading-[1.1] text-white drop-shadow-xl text-center mt-6 md:mt-0">
              The World is Waiting.<br />
              Start Exploring.
            </h1>
          </div>
        </div>
      </section>

      {/* SEARCH BAR SECTION - Overlapping Hero */}
      <div className="w-full relative z-30 -mt-10 md:-mt-14">
        <div className="max-w-6xl mx-auto w-full px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center border border-gray-200 rounded-2xl md:rounded-full bg-white shadow-2xl py-2 px-3 transition-shadow hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)]">
            <div className="w-full lg:flex-1 px-8 py-1 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-100 group cursor-pointer">
              <label className="text-[14px]  tracking-widest text-[#ee2229] mb-0.5 ">Depart From</label>
              <div className="flex items-center justify-between w-full">
                <input
                  suppressHydrationWarning
                  type="text"
                  placeholder="Where From?"
                  className="w-full text-[14px] font-bold text-gray-900 outline-none bg-transparent placeholder-gray-400"
                />
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            <div className="w-full lg:flex-1 px-8 py-1 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-100 group cursor-pointer">
              <label className="text-[14px]  tracking-widest text-[#ee2229] mb-0.5 ">Going To</label>
              <div className="flex items-center justify-between w-full">
                <input
                  suppressHydrationWarning
                  type="text"
                  value={searchTo}
                  onChange={(e) => setSearchTo(e.target.value)}
                  placeholder="Where to?"
                  className="w-full text-[14px] font-bold text-gray-900 outline-none bg-transparent placeholder-gray-400"
                />
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            <div className="w-full lg:flex-1 px-8 py-1 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-100 group cursor-pointer relative">
              <label className="text-[14px]  tracking-widest text-[#ee2229] mb-0.5 ">Month</label>
              <div className="relative w-full flex items-center justify-between">
                <select
                  suppressHydrationWarning
                  value={searchMonth}
                  onChange={(e) => setSearchMonth(e.target.value)}
                  className="w-full text-[14px]  text-gray-900 outline-none bg-transparent appearance-none cursor-pointer"
                >
                  <option value="">Any Month</option>
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            <div className="w-full lg:w-auto p-1 flex h-full">
              <button
                suppressHydrationWarning
                onClick={handleSearch}
                className="w-full lg:w-30 bg-[#ee2229] hover:bg-[#191974] text-white  py-3 px-6 rounded-full transition-all shadow-md active:scale-95 text-[13px] tracking-widest flex items-center justify-center gap-2 "
              >
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LOGO CAROUSEL SECTION */}
      <div className="w-full h-[15vh] min-h-15 bg-white border-b border-gray-100 flex items-center justify-center overflow-hidden relative z-10">
        <InfiniteMovingCards items={logoItems} speed="slow" direction="left" className="bg-transparent w-full" />
      </div>

      <section className="py-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <p className="text-[26px]  text-[#191974] ">Top Destinations</p>
            <p className="text-[14px] text-black ">Discover the world&apos;s most sought-after holiday spots.</p>
          </div>

          <div className="relative group">
            <button 
              onClick={() => scrollDest('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur shadow-lg rounded-full flex items-center justify-center text-[#191974] hover:bg-[#ee2229] hover:text-white transition-all -ml-5 opacity-0 group-hover:opacity-100 border border-gray-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scrollDest('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur shadow-lg rounded-full flex items-center justify-center text-[#191974] hover:bg-[#ee2229] hover:text-white transition-all -mr-5 opacity-0 group-hover:opacity-100 border border-gray-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div 
              ref={destScrollRef}
              className="flex overflow-x-auto gap-4 lg:gap-5 pb-6 snap-x snap-mandatory no-scrollbar scroll-smooth"
            >
              {(topDestinations.length > 0 ? topDestinations : []).map((card, idx) => {
                const fallbacks = [
                  '1544620347-c4fd4a3d5957', // Asia
                  '1513635269975-59663e0ac1ad', // Europe
                  '1512453979798-5ea266f8880c', // Middle East
                  '1499856871958-5b9627545d1a', // Paris
                  '1516026672322-bc52d61a55d5', // Africa
                  '1528072164453-f4e8ef0d475a'  // Sydney
                ];
                const displayImage = card.image_url || card.image || `https://images.unsplash.com/photo-${fallbacks[idx % fallbacks.length]}?auto=format&fit=crop&q=80&w=600`;
                return (
                  <Link
                    key={idx}
                    href={`/${region}/destinations/${card.slug || card.id}`}
                    className="relative min-w-[200px] h-[280px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 snap-start cursor-pointer group block rounded-2xl border border-gray-100 shrink-0"
                  >
                    <img
                      src={displayImage}
                      alt={card.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/90 pointer-events-none" />
                    <div className="absolute top-4 left-4 right-4">
                      <p className="text-white text-[18px] leading-tight tracking-tight font-bold drop-shadow-md">{card.name}</p>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-left">
                      <p className="text-white/60 text-[10px] font-bold tracking-widest mb-0.5 uppercase">Starting from</p>
                      <p className="text-white text-[15px] font-bold">
                        {formatRegionalPrice(card.base_price || (25000 + idx * 5000), region)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-8 bg-[#F8F9FF]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-[26px]  text-[#191974]  ">Featured Tours</p>
              <p className="text-[14px] text-black ">Explore some of our most popular tours selected for you.</p>
            </div>
          </div>

          <div className="w-full">
            {loading ? (
              <div className="py-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#191974] mx-auto mb-4"></div>
                <p className="text-gray-500 font-bold  tracking-widest text-xs">Finding the best adventures...</p>
              </div>
            ) : errorStatus ? (
              <div className="py-12 text-center bg-red-50 rounded-2xl border border-red-100">
                <p className="text-red-600  mb-1">Something went wrong</p>
                <p className="text-red-400 text-xs">{errorStatus}</p>
              </div>
            ) : displayTours.length === 0 ? (
              <div className="py-12 text-center bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-[#191974]  mb-1">No tours currently listed</p>
                <p className="text-gray-500 text-xs">Please check back soon.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {displayTours.map((tour, idx) => (
                  <VerticalTourCard key={idx} tour={tour} region={region} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Offers Banner Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative w-full h-100 lg:h-112.5 rounded-3xl overflow-hidden group shadow-2xl">
            <motion.img
              key={offerSlides[activeOffer].image}
              src={offerSlides[activeOffer].image}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/40 to-transparent" />

            <div className="relative h-full flex flex-col justify-center px-10 lg:px-20 text-white max-w-2xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-1.5 h-12 bg-[#ee2229] rounded-full" />
                <div>
                  <p className="text-xs  tracking-[0.3em] uppercae opacity-70 mb-1">Featured Offer</p>
                  <p className="text-xl lg:text-xl tracking-tight">{offerSlides[activeOffer].title}</p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-xl  mb-2 text-white/90">
                  {offerSlides[activeOffer].detailText}{' '}
                  <span className="text-[#ee2229]">
                    {formatRegionalPrice(offerSlides[activeOffer].priceInr, region)}
                  </span>
                </p>
                <p className="text-[13px] opacity-60 max-w-md font-medium leading-relaxed tracking-wider">{offerSlides[activeOffer].desc}</p>
              </div>

              <button
                suppressHydrationWarning
                className="book-now-btn bg-[#ee2229] border border-[#ee2229] hover:bg-transparent text-white px-10 py-3.5 rounded-lg text-xs tracking-[0.2em] transition-all transform active:scale-95 shadow-xl shadow-red-500/30"
                data-package={offerSlides[activeOffer].title}
                data-price={offerSlides[activeOffer].priceInr}
                data-original-price={offerSlides[activeOffer].joiningPriceInr}
              >
                Book Journey
              </button>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <button suppressHydrationWarning onClick={handlePrevOffer} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-[#ee2229] hover:border-[#ee2229] transition-all cursor-pointer"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg></button>
              <button suppressHydrationWarning onClick={handleNextOffer} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-[#ee2229] hover:border-[#ee2229] transition-all cursor-pointer"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg></button>
            </div>
          </div>
        </div>
      </section>

      <AwardsSection />


      <PopupForm />
    </div>
  );
}
