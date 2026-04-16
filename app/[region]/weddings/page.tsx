"use client";

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Heart, 
  MapPin, 
  Camera, 
  Music, 
  Utensils, 
  Sparkles, 
  ChevronRight, 
  Calendar, 
  Users,
  CheckCircle2,
  ArrowRight,
  Phone
} from 'lucide-react';
import { getCountryConfig } from '@/config/country';

export default function WeddingsPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = use(params);
  const countryConfig = getCountryConfig(region);

  const weddingDestinations = [
    {
      id: 1,
      title: "Royal Jaipur Wedding",
      location: "Jaipur, India",
      image: "https://images.unsplash.com/photo-1595914193375-da8529729831?auto=format&fit=crop&q=80&w=1200",
      description: "Experience the grandeur of royalty with a palace wedding in the Pink City. Traditional ceremonies meet modern luxury.",
      highlights: ["Palace Venue", "Elephant Procession", "Royal Banquet"]
    },
    {
      id: 2,
      title: "Tropical Bliss Bali",
      location: "Uluwatu, Bali",
      image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=1200",
      description: "Exchange vows overlooking the Indian Ocean. A serene, exotic paradise for the perfect destination wedding.",
      highlights: ["Cliff-top Chapel", "Sunset Reception", "Traditional Balinese Decor"]
    },
    {
      id: 3,
      title: "Mediterranean Dream",
      location: "Santorini, Greece",
      image: "https://images.unsplash.com/photo-1549412658-062e76ca4fc9?auto=format&fit=crop&q=80&w=1200",
      description: "Classic blue domes and whitewashed walls provide a stunning backdrop for an intimate, romantic celebration.",
      highlights: ["Caldera Views", "White-themed Decor", "Private Yacht Photoshoot"]
    }
  ];

  return (
    <div className="min-h-screen bg-white font-inter text-[#191974]">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1519225495806-7ad3776ca4fc?auto=format&fit=crop&q=80&w=1920"
          alt="Destination Weddings"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#191974]/90 via-[#191974]/30 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 text-[#ee2229] font-bold tracking-[0.3em] uppercase mb-6 drop-shadow-md">
              <Heart className="w-5 h-5 fill-[#ee2229]" />
              Signature Weddings by Madura
            </div>
            <h1 className="text-[52px] md:text-[84px] text-white font-bold leading-[0.9] tracking-tighter mb-8 italic">
              Your Dream Wedding, <br />
              <span className="text-white/80">Everywhere.</span>
            </h1>
            <p className="text-xl text-white/90 max-w-xl leading-relaxed mb-10 font-medium">
              We curate extraordinary destination weddings that blend cultural traditions with breathtaking global locations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${region}/contact`}
                className="bg-[#ee2229] text-white px-10 py-5 rounded-full font-bold tracking-widest hover:bg-white hover:text-[#191974] transition-all shadow-xl active:scale-95"
              >
                BOOK CONSULTATION
              </Link>
              <button
                onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-bold tracking-widest hover:bg-white hover:text-[#191974] transition-all"
              >
                VIEW DESTINATIONS
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[42px] font-bold tracking-tight mb-4 text-[#191974]">Comprehensive Planning</h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-medium">From venue selection to the last guest's departure, we handle every detail so you can focus on the moment.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: MapPin, title: "Venue Selection", desc: "Access to world-exclusive palaces and resorts." },
              { icon: Utensils, title: "Gourmet Catering", desc: "Customized menus featuring global and local cuisines." },
              { icon: Camera, title: "Media Production", desc: "Award-winning photographers and cinematographers." },
              { icon: Sparkles, title: "Themed Decor", desc: "Bespoke design concepts tailored to your story." }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#191974]/5 border border-gray-100 group-hover:bg-[#ee2229] group-hover:text-white transition-all">
                  <item.icon className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-[18px] mb-2">{item.title}</h4>
                <p className="text-sm text-gray-400 font-medium px-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DESTINATIONS SHOWCASE --- */}
      <section id="destinations" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <p className="text-[#ee2229] font-bold tracking-[0.2em] mb-4 uppercase text-[12px]">Global Portfolio</p>
              <h2 className="text-[42px] font-bold leading-none tracking-tight">Iconic Wedding Locations</h2>
            </div>
            <Link href={`/${region}/contact`} className="flex items-center gap-2 font-bold text-[#ee2229] group">
              ENQUIRE FOR CUSTOM DESTINATION <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {weddingDestinations.map(dest => (
              <div key={dest.id} className="group flex flex-col bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden hover:border-[#ee2229]/20 transition-all shadow-xl shadow-gray-50/50">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={dest.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-[#191974]">
                    <MapPin className="w-3.5 h-3.5 text-[#ee2229]" />
                    {dest.location}
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-1">
                  <h3 className="text-[24px] font-bold mb-4 group-hover:text-[#ee2229] transition-colors">{dest.title}</h3>
                  <p className="text-gray-500 text-[14px] leading-relaxed mb-8 flex-1">{dest.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    {dest.highlights.map(h => (
                      <div key={h} className="flex items-center gap-3 text-[12px] font-bold text-[#191974] uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4 text-[#ee2229]" />
                        {h}
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/${region}/contact`}
                    className="w-full bg-[#191974] text-white py-4 rounded-full font-bold text-[12px] tracking-widest text-center hover:bg-[#ee2229] transition-all"
                  >
                    PLAN MY WEDDING
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- STATS / USP --- */}
      <section className="bg-[#191974] py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { val: "500+", label: "Weddings Organized" },
              { val: "25+", label: "Destinations Globally" },
              { val: "100%", label: "Satisfaction Rate" },
              { val: "40+", label: "Years Experience" }
            ].map((stat, i) => (
              <div key={i} className="space-y-4">
                <div className="text-[52px] font-bold tracking-tighter leading-none">{stat.val}</div>
                <div className="text-[12px] text-white/50 font-bold uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT CTA --- */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#f8faff] rounded-[48px] p-12 md:p-20 text-center border-2 border-[#191974]/5">
            <h2 className="text-[36px] md:text-[52px] font-bold leading-tight mb-8">Ready to Start Your Forever?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-12 font-medium">Let's hop on a call and discuss your vision. Our initial consultation is free and we'll help you narrow down the perfect location.</p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href={`/${region}/contact`}
                className="bg-[#191974] text-white px-12 py-5 rounded-full font-bold tracking-widest flex items-center justify-center gap-3 hover:bg-[#ee2229] transition-all shadow-xl"
              >
                <Phone className="w-5 h-5" /> TALK TO AN EXPERT
              </Link>
              <Link
                href={`/${region}/contact`}
                className="bg-white border-2 border-[#191974]/10 text-[#191974] px-12 py-5 rounded-full font-bold tracking-widest hover:border-[#ee2229] transition-all"
              >
                REQUEST PROPOSAL
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
