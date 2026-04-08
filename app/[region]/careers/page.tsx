'use client';

import React, { use } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Heart, Rocket, Users, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function CareersPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = use(params);

  const perks = [
    { icon: <Heart className="w-8 h-8" />, title: "Inclusive Culture", desc: "Work in a supportive environment that values diversity and work-life harmony." },
    { icon: <Rocket className="w-8 h-8" />, title: "Global Exposure", desc: "Gain unparalleled experience in the international travel and visa industry." },
    { icon: <Users className="w-8 h-8" />, title: "Expert Mentorship", desc: "Learn from industry veterans who have shaped travel trends for 40 years." },
    { icon: <CheckCircle2 className="w-8 h-8" />, title: "Career Growth", desc: "We provide clear pathways for professional advancement and leadership." }
  ];

  const jobs = [
    { title: "Senior Tour Manager", dept: "Operations", loc: "Chennai, India", type: "Full-Time" },
    { title: "Visa Documentation Specialist", dept: "Visa Services", loc: "Delhi, India", type: "Full-Time" },
    { title: "B2B Sales Executive", dept: "Corporate Sales", loc: "Multiple Locations", type: "Remote/Hybrid" },
    { title: "Digital Marketing Manager", dept: "Marketing", loc: "Chennai, India", type: "Full-Time" }
  ];

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* ── HERO SECTION ── */}
      <section className="pt-40 pb-24 bg-[#191974] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000"
            alt="Team Work"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#191974]/80" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-[52px] md:text-[76px] font-black text-white  tracking-tighter leading-none mb-6">
              Adventure <span className="text-[#ee2229]">Awaits</span> Your Career
            </h1>
            <p className="text-[18px] md:text-[22px] text-white/70 font-light mb-10 leading-relaxed">
              Join a legacy of excellence. At Madura Travel, we don't just plan journeys—we build careers that inspire and innovate in the world of global travel.
            </p>
            <button className="bg-[#ee2229] hover:bg-white hover:text-[#191974] text-white px-10 py-4 rounded-xl font-bold  tracking-widest transition-all">
              View Openings
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── WHY JOIN US ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-black text-[#191974]  tracking-tighter mb-4">Why Madura Travel?</h2>
            <p className="text-gray-400 font-bold  tracking-widest text-[13px]">Build your future with the travel pioneers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:border-[#ee2229] transition-all hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 group text-center">
                <div className="text-[#ee2229] mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">{perk.icon}</div>
                <h3 className="text-[20px] font-black text-[#191974] mb-3 ">{perk.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed text-[15px]">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOB LISTINGS ── */}
      <section className="py-24 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-black text-[#191974]  tracking-tighter mb-4">Current Open Positions</h2>
            <div className="w-20 h-1.5 bg-[#ee2229] mx-auto rounded-full" />
          </div>

          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div>
                  <h4 className="text-[22px] font-black text-[#191974] mb-2">{job.title}</h4>
                  <div className="flex flex-wrap gap-4 text-[13px] text-gray-400 font-bold  tracking-wider">
                    <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-[#ee2229]" /> {job.dept}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#ee2229]" /> {job.loc}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-4 py-1.5 rounded-full bg-gray-50 text-gray-500 text-[11px] font-black  tracking-widest">{job.type}</span>
                  <button className="w-12 h-12 rounded-2xl bg-[#191974] text-white flex items-center justify-center group-hover:bg-[#ee2229] transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center bg-[#191974] p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ee2229]/20 rounded-full blur-[80px]" />
            <h3 className="text-[28px] font-black  mb-4">Don't see a fit?</h3>
            <p className="text-white/60 mb-8 max-w-lg mx-auto font-light">We're always looking for travel enthusiasts. Send your resume to our talent team!</p>
            <a href="mailto:careers@maduratravel.com" className="inline-block bg-[#ee2229] text-white px-10 py-4 rounded-xl font-bold  tracking-widest hover:bg-white hover:text-[#191974] transition-all">
              Apply Spontaneously
            </a>
          </div>
        </div>
      </section>

      {/* ── CULTURE IMAGES ── */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {[
            "https://images.unsplash.com/photo-1542744173-8e7e5141b2b2?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
          ].map((img, i) => (
            <div key={i} className="aspect-square rounded-4xl overflow-hidden shadow-lg group">
              <Image
                src={img}
                alt="Culture"
                width={400} height={400}
                className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
