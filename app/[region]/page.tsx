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
      bg: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2920&auto=format&fit=crop",
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

  const logoItems = Array.from({ length: 40 }, (_, i) => ({
    quote: "",
    name: "",
    title: "",
    image: `/images/logos/img-${i + 1}.jpg`,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-background text-[#171717] font-arial text-[14px]">

      {/* HERO SECTION WITH FULL BG AND CAROUSEL */}
      <section className="relative w-full h-[50vh] lg:h-[55vh] flex flex-col justify-between pt-16 lg:pt-20 pb-8 overflow-visible">
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
          <div className="w-full lg:w-[45%] text-white space-y-6 mb-12 lg:mb-0">
            <h1 className="text-[60px] lg:text-[65px] font-bold leading-[1.1] font-inter tracking-tight">
              The World is Waiting.<br />
              Start Exploring.
            </h1>
            <p className="text-[17px] text-white/90 max-w-lg font-inter-tight leading-relaxed">
              The world is full of beautiful places — and your next adventure is just a few clicks away. Find your dream destination and start your journey with us.
            </p>
            <div className="pt-4">
              <Link href={`/${region}/destination`} className="inline-block border border-white text-white px-8 py-3.5 rounded-lg font-bold text-[13px] uppercase tracking-wider hover:bg-white hover:text-black transition-colors shadow-lg">
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
                <button onClick={handlePrevSlide} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-black/50 hover:bg-[#191974] flex items-center justify-center text-white backdrop-blur-md transition-all border border-white/30 cursor-pointer shadow-xl hover:scale-105 active:scale-95">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={handleNextSlide} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-black/50 hover:bg-[#191974] flex items-center justify-center text-white backdrop-blur-md transition-all border border-white/30 cursor-pointer shadow-xl hover:scale-105 active:scale-95">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Flat Search Bar */}
      <div className="w-full bg-[#fcfafa] border-b border-gray-100 z-20 py-2">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-6 lg:gap-10">

            <div className="w-full lg:flex-1 border-b border-gray-200  pb-1.5 flex flex-col">
              <label className="text-[11px]  text-gray-900 mb-0.5">Depart From</label>
              <input type="text" placeholder="New Delhi" className="w-full text-[16px] text-gray-900 outline-none bg-transparent placeholder-gray-900" />
            </div>

            <div className="w-full lg:flex-1 border-b border-gray-200   pb-1.5 flex flex-col">
              <label className="text-[11px]  text-gray-900 mb-0.5">Going To</label>
              <input type="text" placeholder="Going to" className="w-full text-[16px] text-gray-900 outline-none bg-transparent placeholder-gray-900" />
            </div>

            <div className="w-full lg:flex-1 border-b border-gray-200  pb-1.5 flex flex-col relative lg:w-auto">
              <label className="text-[11px]  text-gray-900 mb-0.5">Month of Travel(Optional)</label>
              <select className="w-full text-[16px] text-gray-900 outline-none bg-transparent appearance-none cursor-pointer">
                <option value="">Select Month</option>
                <option value="jan">January</option>
                <option value="feb">February</option>
                <option value="mar">March</option>
                <option value="apr">April</option>
                <option value="may">May</option>
                <option value="jun">June</option>
                <option value="jul">July</option>
                <option value="aug">August</option>
                <option value="sep">September</option>
                <option value="oct">October</option>
                <option value="nov">November</option>
                <option value="dec">December</option>
              </select>
              <div className="absolute right-0 bottom-1.5 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            <div className="w-full lg:w-[120px] shrink-0 flex justify-end pb-1.5">
              <button className="w-full bg-[#da2424] hover:bg-[#b01e1e] text-white font-bold py-2 px-6 rounded-md transition-colors whitespace-nowrap shadow-sm text-[14px]">
                Search
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Logos Ribbon */}
      <div className="w-full h-[10vh] lg:h-[12vh] bg-white border-b border-gray-100 flex items-center justify-center overflow-hidden relative z-10">
        <InfiniteMovingCards items={logoItems} speed="slow" direction="left" className="bg-transparent w-full pt-0 pb-0" />
      </div>

      {/* Explore By Category */}
      <section className="pt-20 pb-10 bg-white">
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
      </section>

      <section className="pt-12 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="font-inter text-[32px] font-bold text-gray-900 mb-2">Featured Tours</h2>
              <p className="font-arial text-[14px] text-gray-500">Explore some of our most popular tours selected for you.</p>
            </div>
            <button className="font-arial text-[14px] font-bold text-gray-700 border border-gray-200 rounded-full px-6 py-2.5 hover:bg-gray-50 transition-colors whitespace-nowrap">
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
                <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col group transition-all hover:shadow-lg">
                  <Link href={`/${region}/tours/${tour.slug}`} className="cursor-pointer">
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={tour.image_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800'}
                        alt={tour.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e: any) => {
                          e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800';
                        }}
                      />
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-bold px-2 py-1 flex items-center gap-1 uppercase tracking-wider rounded-sm shadow-sm">
                        <span>{tour.rating > 4.5 ? 'Best Seller' : 'Trending'}</span>
                        <span className="w-px h-2.5 bg-white/30"></span>
                        <span>{tour.duration}</span>
                      </div>
                    </div>
                  </Link>

                  {/* Content Section */}
                  <div className="p-4 flex flex-col flex-1">
                    <Link href={`/${region}/tours/${tour.slug}`}>
                      <h3 className="text-[16px] font-bold text-gray-800 mb-3 line-clamp-1 group-hover:text-[#191974] transition-colors cursor-pointer">
                        {tour.title}
                      </h3>
                    </Link>

                    {/* Icon Grid */}
                    <div className="border-t border-gray-50 pt-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Includes</span>
                        <div className="flex gap-2.5 text-gray-300">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </div>
                      </div>
                    </div>

                    {/* Price Section */}
                    <div className="mt-auto">
                      <span className="text-[10px] text-gray-400 font-bold uppercase block mb-0.5">Starting From</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[20px] font-bold text-[#191974]">{formatRegionalPrice(tour.base_price_inr, region)}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-4">
                      <Link
                        href={`/${region}/tours/${tour.slug}`}
                        className="w-full bg-[#191974] hover:bg-[#ee2229] text-white py-2.5 rounded text-[13px] font-bold text-center transition-all block shadow-sm uppercase tracking-wide"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
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

      <section className="py-32 bg-gray-50/50 border-y border-gray-100 overflow-hidden flex flex-col items-center">
        <div className="text-center mb-16 relative z-10 w-full max-w-7xl px-4">
          <h2 className="text-[32px] font-black font-inter text-[#191974] mb-4 uppercase tracking-tight">Guest Testimonials</h2>
          <p className="text-[26px] text-gray-400 font-inter font-light">Hear from those who've experienced the world with us.</p>
        </div>
        <InfiniteMovingCards
          speed="slow"
          items={[
            { quote: "An absolutely luxurious experience. The Aceternity Tour exceeded all my expectations.", name: "Rajesh S.", title: "Europe Explorer" },
            { quote: "Flawless execution from booking to return. Highly recommended for family trips.", name: "Priya V.", title: "Japan Tour" },
            { quote: "The tour managers were exceptionally professional and the hotels were fantastic.", name: "Amit K.", title: "Australia Grandeur" },
            { quote: "Every single day was planned to perfection. A truly premium travel company.", name: "Neha D.", title: "Swiss Escapade" }
          ]}
        />
      </section>

      <section className="py-32 relative overflow-hidden bg-[#191974]">
        <div className="absolute inset-0 bg-[#ee2229] opacity-20 rounded-[100%] blur-[150px] translate-y-1/2 scale-150"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-20">
          <h2 className="text-[56px] lg:text-[65px] font-black font-inter text-white mb-8 drop-shadow-2xl uppercase tracking-tighter leading-none">
            Plan Your Dream <br />Trip Today
          </h2>
          <p className="text-[26px] text-white/60 font-inter font-light mb-12 max-w-3xl mx-auto leading-relaxed">
            Ready to explore? Book your fully managed luxury package and let us handle the rest.
          </p>
          <Link href={`/${region}/tours`} className="inline-block bg-[#ee2229] text-white px-12 py-4 rounded-full text-[16px] font-bold tracking-wide hover:bg-white hover:text-[#ee2229] transition-all duration-300 shadow-2xl hover:-translate-y-1">
            Browse All Tours
          </Link>
        </div>
      </section>

    </div>
  );
}
