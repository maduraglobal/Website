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

  const heroImages = [
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2920&fill=blur", // Paris
    "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2940&fill=blur", // Swiss
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2940&fill=blur", // Bali
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden text-black">

      {/* HERO SECTION */}
      <section className="h-[85vh] w-full relative">
        <ImagesSlider className="h-[85vh]" images={heroImages}>
          <div className="z-50 flex flex-col justify-center items-center text-center px-4">
            <h1 className="font-bold text-4xl md:text-6xl text-white mb-6 drop-shadow-2xl font-inter">
              Explore the World with Madura Travel
            </h1>
            <p className="text-white text-lg md:text-xl font-light font-inter-tight opacity-90 max-w-3xl mb-12 drop-shadow-md">
              Discover breathtaking destinations and exclusive all-inclusive holiday packages designed for the modern explorer.
            </p>

            <div className="bg-white/10 backdrop-blur-xl p-4 md:p-6 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] w-full max-w-5xl border border-white/20 flex flex-col md:flex-row gap-4">
              <div className="flex-1 bg-white/60 hover:bg-white transition-colors rounded-2xl p-3 flex flex-col items-start px-4">
                <span className="text-[11px] text-[#191974] font-bold uppercase tracking-widest pl-1 mb-1">Destination</span>
                <input type="text" placeholder="Where do you want to go?" className="w-full bg-transparent outline-none text-[#171717] font-semibold text-[15px] placeholder-gray-500" />
              </div>
              <div className="flex-1 bg-white/60 hover:bg-white transition-colors rounded-2xl p-3 flex flex-col items-start px-4">
                <span className="text-[11px] text-[#191974] font-bold uppercase tracking-widest pl-1 mb-1">Duration</span>
                <select className="w-full bg-transparent outline-none text-[#171717] font-semibold text-[15px] cursor-pointer appearance-none">
                  <option>Any Duration</option>
                  <option>1-4 Days</option>
                  <option>5-9 Days</option>
                  <option>10+ Days</option>
                </select>
              </div>
              <button className="bg-[#ee2229] hover:bg-white hover:text-[#ee2229] border-2 border-transparent hover:border-[#ee2229] text-white px-10 py-3 rounded-2xl text-[15px] font-bold uppercase tracking-wider transition-all duration-300 shadow-xl">
                Search
              </button>
            </div>
          </div>
        </ImagesSlider>
      </section>

      {/* TOP DESTINATIONS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-bold font-inter text-[#191974] mb-4">Top Destinations</h2>
            <p className="text-[16px] text-gray-500 font-inter-tight max-w-2xl mx-auto">Explore carefully curated, all-inclusive tour packages across the globe.</p>
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

      {/* WHY CHOOSE US (ACETERNITY STYLE GRID) */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-bold font-inter text-[#191974] mb-4">Why Choose Madura Travel</h2>
            <p className="text-[16px] text-gray-500 font-inter-tight">Premium services designed for the seamless holiday experience.</p>
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

      {/* INFINITE TESTIMONIALS */}
      <section className="py-24 bg-gray-50 border-y border-gray-100 overflow-hidden flex flex-col items-center">
        <div className="text-center mb-12 relative z-10 w-full max-w-7xl px-4">
          <h2 className="text-[36px] font-bold font-inter text-[#191974] mb-4">Guest Testimonials</h2>
          <p className="text-[16px] text-gray-500 font-inter-tight">Hear from those who've experienced the world with us.</p>
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

      {/* CTA BANNER */}
      <section className="py-24 relative overflow-hidden bg-[#191974]">
        <div className="absolute inset-0 bg-[#ee2229] opacity-10 rounded-[100%] blur-[120px] translate-y-1/2 scale-150"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-20">
          <h2 className="text-[40px] md:text-[56px] font-bold font-inter text-white mb-6 drop-shadow-xl">
            Plan Your Dream Trip Today
          </h2>
          <p className="text-[18px] text-white/80 font-inter-tight mb-10 max-w-2xl mx-auto">
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
