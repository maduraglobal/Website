"use client";

import React, { use } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Globe, Phone, Award, ShieldCheck, Heart } from 'lucide-react';
import { getCountryConfig } from '@/config/country';

const Linkedin = (props: any) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

export default function TeamPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = use(params);
  const countryConfig = getCountryConfig(region);

  const team = [
    {
      id: 1,
      name: "Venkatachalam S.",
      role: "Founder & Chairman",
      image: "https://ui-avatars.com/api/?name=Venkatachalam+S&background=191974&color=fff&size=512",
      desc: "A visionary with over 40 years of pioneering experience in the global travel industry. Under his leadership, Madura has grown into a household name for trust and quality.",
      qualities: ["Visionary", "40+ Years Experience", "Industry Pioneer"]
    },
    {
      id: 2,
      name: "Madura Venkatachalam",
      role: "Managing Director",
      image: "https://ui-avatars.com/api/?name=Madura+V&background=ee2229&color=fff&size=512",
      desc: "Driving the modern era of Madura Travel with a focus on digital innovation and sustainable luxury travel. Passionate about creating seamless global experiences.",
      qualities: ["Innovation Lead", "Customer Focused", "Global Strategist"]
    },
    {
      id: 3,
      name: "S. Bhakti",
      role: "Senior Visa Officer",
      image: "https://ui-avatars.com/api/?name=Bhakti+S&background=191974&color=fff&size=512",
      desc: "Expert in complex visa regulations with a consistent 99.2% approval rate. She leads our doc-verification team with unmatched precision.",
      qualities: ["Visa Expert", "99% Success", "Compliance Pro"]
    },
    {
      id: 4,
      name: "Jay Surve",
      role: "Head of Operations",
      image: "https://ui-avatars.com/api/?name=Jay+Surve&background=ee2229&color=fff&size=512",
      desc: "Ensures every itinerary is executed to perfection. From airport transfers to luxury hotel check-ins, Jay keeps the gears turning smoothly.",
      qualities: ["Ops Master", "Logistics Pro", "24/7 Support"]
    },
    {
      id: 5,
      name: "Anju Nair",
      role: "Destination Wedding Specialist",
      image: "https://ui-avatars.com/api/?name=Anju+Nair&background=191974&color=fff&size=512",
      desc: "Turns dreams into reality across exotic locations. Anju manages complex event logistics with grace and artistic flair.",
      qualities: ["Luxury Wedding Expert", "Event Planner", "Global Curation"]
    },
    {
      id: 6,
      name: "Raj Bhatt",
      role: "Senior Tour Manager",
      image: "https://ui-avatars.com/api/?name=Raj+Bhatt&background=ee2229&color=fff&size=512",
      desc: "Specializes in high-end European and American tours. Raj's hidden-gem knowledge makes every trip unforgettable.",
      qualities: ["Tour Specialist", "Local Insight", "Fluent in 5 Languages"]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#191974] font-inter">
      {/* --- HERO --- */}
      <section className="pt-40 pb-20 bg-gray-50 border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-[#ee2229] font-bold tracking-[0.4em] uppercase text-[12px] mb-6">Our People, Your Journey</p>
            <h1 className="text-[52px] md:text-[72px] font-bold tracking-tighter leading-none mb-8">Meet the Dream <span className="text-[#ee2229]">Architects.</span></h1>
            <p className="text-[17px] text-gray-500 font-medium leading-relaxed">
              At Madura Travel, we don't just sell tours; we build memories. Our team consists of seasoned experts dedicated to making your travel seamless, safe, and extraordinary.
            </p>
          </motion.div>
        </div>

        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-100/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </section>

      {/* --- VALUES SHOWCASE --- */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-wrap gap-8 justify-center border-b border-gray-50">
        {[
          { icon: ShieldCheck, label: "Trust First" },
          { icon: Award, label: "Excellence Driven" },
          { icon: Heart, label: "Customer Obsessed" },
          { icon: Globe, label: "Global Presence" }
        ].map((v, i) => (
          <div key={i} className="flex items-center gap-3 text-gray-400 font-bold uppercase tracking-widest text-[11px]">
            <v.icon className="w-4 h-4 text-[#ee2229]" />
            {v.label}
          </div>
        ))}
      </div>

      {/* --- TEAM GRID --- */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {team.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white flex flex-col items-center text-center space-y-8"
              >
                {/* Photo Container */}
                <div className="relative w-64 h-64 mx-auto rounded-[3rem] overflow-hidden shadow-2xl shadow-[#191974]/5 border-8 border-white transform transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#191974]/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#191974] hover:bg-[#ee2229] hover:text-white transition-all"><Linkedin className="w-4 h-4" /></button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#191974] hover:bg-[#ee2229] hover:text-white transition-all"><Mail className="w-4 h-4" /></button>
                  </div>
                </div>

                <div className="space-y-4 max-w-sm">
                  <div>
                    <h3 className="text-[24px] font-bold tracking-tight mb-1 group-hover:text-[#ee2229] transition-colors">{member.name}</h3>
                    <p className="text-[12px] text-[#ee2229] font-bold uppercase tracking-[0.2em]">{member.role}</p>
                  </div>
                  <p className="text-[14px] text-gray-400 leading-relaxed font-medium">
                    {member.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    {member.qualities.map(q => (
                      <span key={q} className="bg-gray-50 px-4 py-1.5 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        {q}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- JOIN THE TEAM --- */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto bg-[#191974] rounded-[48px] p-12 md:p-24 text-white flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative shadow-2xl">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-[42px] md:text-[52px] font-bold leading-none tracking-tighter mb-8">Work With the World.</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10">
              We are always on the lookout for passionate travel designers, visa experts, and operations masters. Join the Madura family and build the future of travel.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href={`/${region}/careers`} className="bg-[#ee2229] text-white px-10 py-5 rounded-full font-bold tracking-widest hover:bg-white hover:text-[#191974] transition-all">VIEW OPENINGS</Link>
              <div className="flex items-center gap-4 text-white/50 font-bold uppercase tracking-widest text-[11px]">
                <Phone className="w-5 h-5" /> HR Support: +91 90929 49494
              </div>
            </div>
          </div>
          
          <div className="relative w-full lg:w-[400px] h-[300px] lg:h-[400px] rounded-[3rem] overflow-hidden shadow-2xl transform lg:rotate-6">
            <Image
               src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
               alt="Team Culture"
               fill
               className="object-cover"
            />
          </div>

          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#ee2229]/20 rounded-full blur-[80px]" />
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
