"use client";

import React, { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Compass, Map, Sparkles, PhoneCall, Globe, 
  ChevronRight, Calendar, Users, Star, 
  Clock, ShieldCheck, Heart, Camera
} from 'lucide-react';
import { formatRegionalPrice } from '@/config/country';

const categories = [
  {
    title: "Romantic Escapes",
    desc: "Private villas, sunset cruises, and intimate dinners in exotic locations.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
    icon: <Heart className="w-6 h-6" />
  },
  {
    title: "Adventure Trails",
    desc: "Hiking, diving, and exploring the wild with expert local guides.",
    image: "https://images.unsplash.com/photo-1533240332313-0db360459ad6?auto=format&fit=crop&q=80&w=800",
    icon: <Compass className="w-6 h-6" />
  },
  {
    title: "Family Holidays",
    desc: "Hassle-free itineraries designed for all ages and family bonding.",
    image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&q=80&w=800",
    icon: <Users className="w-6 h-6" />
  },
  {
    title: "Luxury Getaways",
    desc: "Ultra-premium stays, private jets, and exclusive access experiences.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
    icon: <Sparkles className="w-6 h-6" />
  }
];

const steps = [
  {
    title: "Select Destination",
    desc: "Pick your dream spot or ask our experts for inspiration.",
    icon: <Map className="w-6 h-6" />
  },
  {
    title: "Share Your Style",
    desc: "Tell us about your preferences, budget, and travel pace.",
    icon: <Camera className="w-6 h-6" />
  },
  {
    title: "Get Custom Quote",
    desc: "We build a detailed itinerary and quote within 24 hours.",
    icon: <Clock className="w-6 h-6" />
  }
];

const inspirations = [
  {
    id: 1,
    title: "Bespoke Swiss & Paris",
    days: "10 Days",
    rating: 4.9,
    price: 345000,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=800",
    tags: ["Private Tour", "Luxury"]
  },
  {
    id: 2,
    title: "Customized Bali Escape",
    days: "7 Days",
    rating: 4.8,
    price: 85000,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
    tags: ["Couple Special", "Villas"]
  },
  {
    id: 3,
    title: "Signature Dubai Getaway",
    days: "6 Days",
    rating: 4.7,
    price: 112000,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
    tags: ["Shopping", "Desert"]
  }
];

export default function CustomizedHolidaysPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = use(params);

  return (
    <div className="min-h-screen bg-white font-inter text-[#191974]">
      {/* HERO SECTION */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Customized Travel"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 bg-[#ee2229] px-4 py-1.5 rounded-full text-[12px] font-extrabold uppercase tracking-[0.2em] mb-6">
              <Sparkles className="w-4 h-4" /> Tailor-Made Experiences
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight">
              Create Your Own <br />
              <span className="text-[#ee2229]">Dream Holiday</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              Don't settle for fixed itineraries. Tell us where you want to go, and we'll build a journey around you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('openEnquiry'))}
                className="bg-[#ee2229] text-white px-10 py-5 rounded-2xl font-extrabold text-[14px] uppercase tracking-widest hover:bg-[#191974] transition-all shadow-2xl shadow-red-500/20 active:scale-95"
              >
                Start Designing Now
              </button>
              <Link href={`/${region}/tours`} className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-extrabold text-[14px] uppercase tracking-widest hover:bg-white hover:text-[#191974] transition-all">
                Browse Inspiration
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">How it Works?</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[13px]">In 3 Simple Steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-[1px] bg-gray-200 z-0" />
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 rounded-3xl bg-white shadow-xl shadow-[#191974]/5 flex items-center justify-center text-[#ee2229] mb-8 group-hover:bg-[#191974] group-hover:text-white transition-all duration-500 border border-gray-100">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Experience Travel <br /> Your Way</h2>
              <p className="text-gray-500 text-lg leading-relaxed font-medium">Whether you're looking for extreme thrills or quiet luxury, we specialize in curating specific themes tailored to your interests.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-[#ee2229] rounded-full" />
              <span className="font-extrabold text-[12px] uppercase tracking-[0.2em] text-[#191974]">Endless Possibilities</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="relative h-[450px] rounded-[32px] overflow-hidden group cursor-pointer shadow-lg shadow-[#191974]/5"
              >
                <img src={cat.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={cat.title} />
                <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/20 to-black/90" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-4 group-hover:bg-[#ee2229] transition-colors">
                    {cat.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{cat.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 transform">
                    {cat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INSPIRATION PACKAGES */}
      <section className="py-24 bg-[#191974] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <div>
              <span className="text-[#ee2229] font-extrabold text-[12px] uppercase tracking-[0.3em] mb-4 block">Most Loved</span>
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">Inspiration for Your <br /> Next Bespoke Journey</h2>
            </div>
            <Link href={`/${region}/tours`} className="flex items-center gap-3 font-bold group">
              View All Packages <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#ee2229] transition-all"><ChevronRight className="w-5 h-5" /></div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {inspirations.map((item) => (
              <div key={item.id} className="bg-white/5 backdrop-blur-md rounded-[32px] overflow-hidden border border-white/10 group">
                <div className="relative h-64 overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {item.tags.map(t => (
                      <span key={t} className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-3 text-white/60 text-[11px] font-bold uppercase tracking-widest">
                    <span>{item.days} Tour</span>
                    <div className="flex items-center gap-1 text-[#ee2229]">
                      <Star className="w-3.5 h-3.5 fill-current" /> {item.rating}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-6">{item.title}</h4>
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-0.5">Est. Budget</p>
                      <p className="text-xl font-bold">{formatRegionalPrice(item.price, region)}</p>
                    </div>
                    <button 
                      onClick={() => window.dispatchEvent(new CustomEvent('openEnquiry'))}
                      className="bg-[#ee2229] hover:bg-white hover:text-[#191974] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#f8f9fc] rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden group border border-gray-100">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ee2229]/5 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#191974]/5 rounded-full blur-3xl -ml-32 -mb-32" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white shadow-2xl rounded-3xl flex items-center justify-center text-[#191974] mx-auto mb-10 group-hover:scale-110 transition-transform duration-500">
                <PhoneCall className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Ready to Plan Your Escape?</h2>
              <p className="text-gray-500 text-lg mb-12 max-w-xl mx-auto font-medium">Talk to our travel experts today. We'll listen to your ideas and craft a journey that's uniquely yours.</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('openEnquiry'))}
                  className="w-full sm:w-auto bg-[#191974] text-white px-10 py-5 rounded-2xl font-extrabold text-[14px] uppercase tracking-widest hover:bg-[#ee2229] transition-all active:scale-95 shadow-xl shadow-blue-500/20"
                >
                  Request a Free Quote
                </button>
                <a href="tel:+919092949494" className="w-full sm:w-auto border-2 border-gray-200 px-10 py-5 rounded-2xl font-extrabold text-[14px] uppercase tracking-widest hover:border-[#191974] transition-all">
                  Call +91 90929 49494
                </a>
              </div>
              
              <div className="mt-12 flex items-center justify-center gap-8 grayscale opacity-50">
                <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> <span className="text-[11px] font-bold uppercase tracking-wider">Secure Payment</span></div>
                <div className="flex items-center gap-2"><Sparkles className="w-5 h-5" /> <span className="text-[11px] font-bold uppercase tracking-wider">Expert Planning</span></div>
                <div className="flex items-center gap-2"><Globe className="w-5 h-5" /> <span className="text-[11px] font-bold uppercase tracking-wider">Global Support</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
