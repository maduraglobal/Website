"use client";

import Link from "next/link";
import React, { useEffect, useState, use } from "react";
import { formatRegionalPrice } from "../../config/country";
import { ImagesSlider } from "../components/ui/images-slider";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import PopupForm from "../components/PopupForm";
import CorporateOffice from "../components/CorporateOffice";
import AwardsSection from "../components/AwardsSection";
import { Users, Globe, Award, Star as StarIcon } from "lucide-react";

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
      {/* HERO SECTION - 60vh */}
      <section className="relative w-full h-[65vh] flex flex-col pt-12 lg:pt-16 pb-6 overflow-visible">
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
          <div className="w-full text-[#191974] space-y-3 mb-6 lg:mb-0">
            <h1 className="text-[32px] md:text-[56px] font-black font-inter tracking-tight leading-[1.1] text-white drop-shadow-xl text-center lg:text-left mt-6 md:mt-0">
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
              <label className="text-[10px] font-black tracking-widest text-[#ee2229] mb-0.5">Depart From</label>
              <div className="flex items-center justify-between w-full">
                <input
                  type="text"
                  placeholder="Where From?"
                  className="w-full text-[14px] font-bold text-gray-900 outline-none bg-transparent placeholder-gray-400"
                />
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            <div className="w-full lg:flex-1 px-8 py-1 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-100 group cursor-pointer">
              <label className="text-[10px] font-black tracking-widest text-[#ee2229] mb-0.5">Going To</label>
              <div className="flex items-center justify-between w-full">
                <input
                  type="text"
                  placeholder="Where to?"
                  className="w-full text-[14px] font-bold text-gray-900 outline-none bg-transparent placeholder-gray-400"
                />
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            <div className="w-full lg:flex-1 px-8 py-1 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-100 group cursor-pointer relative">
              <label className="text-[10px] font-black tracking-widest text-[#ee2229] mb-0.5">Month</label>
              <div className="relative w-full flex items-center justify-between">
                <select className="w-full text-[14px] font-bold text-gray-900 outline-none bg-transparent appearance-none cursor-pointer">
                  <option value="">Any Month</option>
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(m => (
                    <option key={m} value={m.toLowerCase()}>{m}</option>
                  ))}
                </select>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            <div className="w-full lg:w-auto p-1 flex h-full">
              <button className="w-full lg:w-[120px] bg-[#ee2229] hover:bg-[#d11920] text-white font-black py-3 px-6 rounded-full transition-all shadow-md active:scale-95 text-[13px] tracking-widest flex items-center justify-center gap-2">
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LOGO CAROUSEL SECTION */}
      <div className="w-full h-[15vh] min-h-[60px] bg-white border-b border-gray-100 flex items-center justify-center overflow-hidden relative z-10">
        <InfiniteMovingCards items={logoItems} speed="slow" direction="left" className="bg-transparent w-full" />
      </div>

      <section className="py-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="font-inter text-[16px] font-black text-[#191974] mb-2 tracking-tight">Top Destinations</h2>
            <p className="font-inter text-[16px] text-gray-400 font-light">Discover the world&apos;s most sought-after holiday spots.</p>
          </div>

          <div className="flex overflow-x-auto gap-4 lg:gap-5 pb-6 custom-scrollbar snap-x snap-mandatory">
            {[
              { name: 'Asia', basePrice: 13551, image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop', slug: 'india' },
              { name: 'Mainland Europe', basePrice: 14511, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&auto=format&fit=crop', slug: 'france' },
              { name: 'Middle East', basePrice: 21748, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop', slug: 'dubai' },
              { name: 'Europe', basePrice: 23887, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&auto=format&fit=crop', slug: 'italy' },
              { name: 'Africa', basePrice: 34111, image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=600&auto=format&fit=crop', slug: 'egypt' },
              { name: 'Australia & NZ', basePrice: 46175, image: 'https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?q=80&w=600&auto=format&fit=crop', slug: 'australia' }
            ].map((card, idx) => (
              <Link
                key={idx}
                href={`/${region}/destination/${card.slug}`}
                className="relative min-w-[300px] h-[220px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 snap-start cursor-pointer group block rounded-2xl"
              >
                <img src={card.image} alt={card.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
                <div className="absolute top-4 left-4 right-4">
                  <p className="text-white text-[20px] font-inter leading-tight tracking-tight">{card.name}</p>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <p className="text-white/70 text-[10px] font-bold tracking-widest uppercase mb-0.5">Starting from</p>
                  <p className="text-white text-[16px] font-black">{formatRegionalPrice(card.basePrice, region)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-12 bg-[#F8F9FF]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="font-inter text-[16px] font-black text-[#191974] mb-2 tracking-tight uppercase">Featured Tours</h2>
              <p className="font-inter text-[16px] text-gray-400 font-light">Explore some of our most popular tours selected for you.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {loading ? (
              <div className="col-span-full py-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#191974] mx-auto mb-4"></div>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Finding the best adventures...</p>
              </div>
            ) : errorStatus ? (
              <div className="col-span-full py-12 text-center bg-red-50 rounded-2xl border border-red-100">
                <p className="text-red-600 font-black mb-1">Something went wrong</p>
                <p className="text-red-400 text-xs">{errorStatus}</p>
              </div>
            ) : displayTours.length === 0 ? (
              <div className="col-span-full py-12 text-center bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-[#191974] font-black mb-1">No tours currently listed</p>
                <p className="text-gray-500 text-xs">Please check back soon.</p>
              </div>
            ) : (
              displayTours.map((tour, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
                  <Link href={`/${region}/tours/${tour.slug}`} className="relative block h-[180px] shrink-0 overflow-hidden">
                    <img src={tour.image_url} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-white/90 backdrop-blur-sm text-[#191974] text-[10px] font-black px-2.5 py-1 rounded-lg">
                        {tour.duration}
                      </span>
                    </div>
                  </Link>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-[10px] font-black text-[#ee2229] uppercase tracking-widest mb-1">Best Seller</p>
                    <Link href={`/${region}/tours/${tour.slug}`}>
                      <h3 className="text-sm font-black text-[#191974] mb-3 leading-snug line-clamp-2 hover:text-[#ee2229] transition-colors uppercase">
                        {tour.title}
                      </h3>
                    </Link>
                    <div className="mt-auto">
                      <div className="flex items-end justify-between mb-3 border-t border-gray-50 pt-3">
                        <div>
                          <p className="text-[9px] text-gray-400 font-bold uppercase mb-0.5">Starting at</p>
                          <p className="text-lg font-black text-[#191974]">{formatRegionalPrice(tour.base_price_inr, region)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] font-bold text-[#ee2229] uppercase">EMI</p>
                          <p className="text-[10px] font-black text-[#191974]">₹5,259/mo</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Link href={`/${region}/tours/${tour.slug}`} className="border border-[#191974] text-[#191974] py-2 rounded-lg text-[11px] font-black text-center hover:bg-[#191974]/5 uppercase">Details</Link>
                        <button className="book-now-btn bg-[#191974] text-white py-2 rounded-lg text-[11px] font-black hover:bg-[#ee2229] uppercase shadow-lg shadow-blue-500/10" data-package={tour.title}>Book Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Offers Banner Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative w-full h-[400px] lg:h-[450px] rounded-[24px] overflow-hidden group shadow-2xl">
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
                  <p className="text-xs font-black tracking-[0.3em] uppercase opacity-70 mb-1">Featured Offer</p>
                  <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{offerSlides[activeOffer].title}</h2>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-xl font-light mb-2 text-white/90">
                  {offerSlides[activeOffer].details.split('₹')[0]} <span className="text-[#ee2229] font-black">₹{offerSlides[activeOffer].details.split('₹')[1]}</span>
                </p>
                <p className="text-[13px] opacity-60 max-w-md font-medium leading-relaxed uppercase tracking-wider">{offerSlides[activeOffer].desc}</p>
              </div>

              <button className="book-now-btn bg-[#ee2229] border border-[#ee2229] hover:bg-transparent text-white px-10 py-3.5 rounded-lg font-black text-xs uppercase tracking-[0.2em] transition-all transform active:scale-95 shadow-xl shadow-red-500/30" data-package={offerSlides[activeOffer].title}>Book Journey</button>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={handlePrevOffer} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-[#ee2229] hover:border-[#ee2229] transition-all cursor-pointer"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg></button>
              <button onClick={handleNextOffer} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-[#ee2229] hover:border-[#ee2229] transition-all cursor-pointer"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg></button>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS HIGHLIGHT */}
      <section className="py-12 bg-[#191974] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">Trusted by Millions Worldwide</h2>
            <div className="w-20 h-1 bg-[#ee2229] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { val: "4M+", label: "Happy Customers", icon: <Users className="w-6 h-6" /> },
              { val: "28K+", label: "Destinations", icon: <Globe className="w-6 h-6" /> },
              { val: "40+", label: "Years Experience", icon: <Award className="w-6 h-6" /> },
              { val: "10K+", label: "5-Star Ratings", icon: <StarIcon className="w-6 h-6" /> }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm">
                <div className="w-12 h-12 bg-[#ee2229] rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-red-500/20">{stat.icon}</div>
                <h3 className="text-3xl font-black text-white mb-1 uppercase tracking-tighter">{stat.val}</h3>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AwardsSection />

      <section className="py-12 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-[24px] font-black text-[#191974] mb-2 uppercase tracking-tight">Why Choose Madura Travel</h2>
          <p className="text-gray-400 font-bold mb-10 uppercase tracking-widest text-[12px]">Setting the standard for premium global travel.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "All Inclusive", desc: "Flights, visas, stays, and meals - everything taken care of." },
              { title: "Expert Support", desc: "Travel with seasoned professionals at every step." },
              { title: "Premium Stays", desc: "Handpicked 4-star and 5-star properties worldwide." }
            ].map((feat, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-100 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all">
                <h3 className="font-black text-[#191974] mb-2 uppercase text-sm">{feat.title}</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8F9FF] flex flex-col items-center">
        <div className="text-center mb-10 px-4">
          <h2 className="text-2xl font-black text-[#191974] mb-2 uppercase">Guest Testimonials</h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">Real experiences from real travelers.</p>
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

      <PopupForm />
    </div>
  );
}
