'use client';

import React, { use } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Globe, Target, Eye, Rocket, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function OurStoryPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = use(params);

  const milestones = [
    { year: "1986", title: "The Foundation", desc: "Founded on Jan 17th in Egmore, Chennai, starting with a vision to redefine travel services." },
    { year: "1995", title: "Regional Expansion", desc: "Expanded across South India, becoming a household name for reliable visa assistance." },
    { year: "2010", title: "Global Footprint", desc: "Launched international tour operations across Europe and South East Asia." },
    { year: "2024", title: "Legacy of Excellence", desc: "Celebrating 38+ years with 4M+ happy guests and a global network." }
  ];

  const stats = [
    { val: "40+", label: "Years Experience", icon: <Award /> },
    { val: "4M+", label: "Happy Customers", icon: <Users /> },
    { val: "60+", label: "Countries Covered", icon: <Globe /> },
    { val: "100%", label: "Service Integrity", icon: <CheckCircle2 /> }
  ];

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* ── HERO BANNER ── */}
      <section className="relative pt-40 pb-24 bg-[#191974] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000" 
            alt="Legacy" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#191974]/80" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[56px] md:text-[80px] font-black text-white uppercase tracking-tighter leading-none mb-6">
              Our <span className="text-[#ee2229]">Story</span>
            </h1>
            <p className="text-[20px] md:text-[24px] text-white/70 font-light max-w-2xl mx-auto uppercase tracking-widest">
              From a Visionary Dream to a Global Legacy
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── COMPANY INTRODUCTION (Kesar Style Split) ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="relative rounded-4xl overflow-hidden shadow-2xl group">
              <Image 
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1200" 
                alt="Madura Office" 
                width={800} height={1000} 
                className="group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-8 left-8 bg-white p-6 rounded-2xl shadow-xl">
                <p className="text-[32px] font-black text-[#191974] leading-none">Est. 1986</p>
                <p className="text-[#ee2229] font-bold uppercase tracking-widest text-[12px] mt-1">Founding Year</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-[36px] md:text-[48px] font-black text-[#191974] uppercase tracking-tighter leading-tight">
              A Trusted Name in <br />
              <span className="text-[#ee2229]">Indian Travel History</span>
            </h2>
            <div className="space-y-6 text-gray-600 font-light text-[18px] leading-relaxed">
              <p>
                Founded on January 17th, 1986, in Egmore, Chennai, <strong>Madura Travel Service (P) Ltd.</strong> has been a cornerstone of the Indian travel industry for nearly four decades.
              </p>
              <p>
                What began as a passionate endeavor to simplify travel has evolved into a global service provider specializing in International Tours, Visa Assistance, and Corporate Travel. Our journey is defined by a commitment to transparency, service excellence, and creating memories that last a lifetime.
              </p>
            </div>
            <div className="flex gap-4 pt-4">
              <button className="bg-[#191974] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#ee2229] transition-all">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center text-[#ee2229] mx-auto mb-4 group-hover:-rotate-6 transition-transform">
                  {stat.icon}
                </div>
                <p className="text-[42px] font-black text-[#191974] leading-none mb-2">{stat.val}</p>
                <p className="text-[12px] text-gray-400 font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-red-50 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
         
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
          <div className="bg-[#191974] p-12 rounded-[2.5rem] text-white shadow-2xl relative group overflow-hidden">
            <Target className="w-16 h-16 text-[#ee2229] mb-8 group-hover:scale-110 transition-transform" />
            <h3 className="text-[32px] font-black uppercase tracking-tighter mb-4">Our Mission</h3>
            <p className="text-white/70 text-[18px] font-light leading-relaxed">
              To provide personalized, high-quality travel and visa services that exceed expectations, ensuring every journey is seamless, safe, and unforgettable for every traveler.
            </p>
          </div>
          <div className="bg-gray-50 p-12 rounded-[2.5rem] border border-gray-100 shadow-xl relative group overflow-hidden">
            <Eye className="w-16 h-16 text-[#ee2229] mb-8 group-hover:scale-110 transition-transform" />
            <h3 className="text-[32px] font-black text-[#191974] uppercase tracking-tighter mb-4">Our Vision</h3>
            <p className="text-gray-500 text-[18px] font-light leading-relaxed">
              To be the most preferred travel partner globally, recognized for our integrity, innovative solutions, and for connecting people with the diverse beauty of the world.
            </p>
          </div>
        </div>
      </section>

      {/* ── TIMELINE JOURNEY ── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-black text-[#191974] uppercase tracking-tighter mb-4">Our Growth Journey</h2>
            <div className="w-20 h-1.5 bg-[#ee2229] mx-auto rounded-full" />
          </div>
          
          <div className="space-y-12 relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 hidden md:block" />
            
            {milestones.map((ms, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="w-full md:w-1/2 text-center md:text-right">
                  <div className={`p-8 rounded-3xl bg-white shadow-lg border border-gray-100 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <span className="text-[32px] font-black text-[#ee2229] leading-none mb-2 block">{ms.year}</span>
                    <h4 className="text-[20px] font-black text-[#191974] mb-2 uppercase">{ms.title}</h4>
                    <p className="text-gray-500 font-light leading-relaxed">{ms.desc}</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#191974] border-4 border-white shadow-xl z-10 shrink-0 hidden md:block" />
                <div className="w-full md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
