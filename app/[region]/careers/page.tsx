"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';

const JOB_OPENINGS = [
  {
    id: 1,
    title: "Senior Tour Manager — Europe",
    department: "Operations",
    location: "Mumbai, India",
    type: "Full-time",
    description: "Lead and manage premium European tour groups of 30-40 travelers. Requires 3+ years of experience in international tour management, fluent English, and exceptional hospitality skills.",
    tags: ["Operations", "International"]
  },
  {
    id: 2,
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Remote / Mumbai",
    type: "Full-time",
    description: "Build and scale our Next.js booking platform. Must have strong TypeScript, React, and Node.js experience. Supabase and Vercel experience is a bonus.",
    tags: ["Engineering", "Remote"]
  },
  {
    id: 3,
    title: "Digital Marketing Manager",
    department: "Marketing",
    location: "Mumbai, India",
    type: "Full-time",
    description: "Drive growth across SEO, SEM, and social channels. Plan and execute multi-channel campaigns targeting high-intent travelers. 5+ years in digital marketing required.",
    tags: ["Marketing", "Growth"]
  },
  {
    id: 4,
    title: "Customer Experience Executive",
    department: "Support",
    location: "Pune, India",
    type: "Full-time",
    description: "Be the first point of contact for travelers seeking assistance. Handle booking queries, itinerary changes, and post-trip feedback with empathy and efficiency.",
    tags: ["Support", "Customer Facing"]
  },
  {
    id: 5,
    title: "Visa Processing Specialist",
    department: "Operations",
    location: "Mumbai / Delhi",
    type: "Full-time",
    description: "Manage end-to-end visa documentation and processing for 20+ countries. Must have embassy liaison experience and attention to detail.",
    tags: ["Operations", "Visa"]
  },
  {
    id: 6,
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Contract",
    description: "Design premium user interfaces for our booking platform and mobile app. Figma expertise and experience with travel/e-commerce platforms required.",
    tags: ["Design", "Remote"]
  }
];

export default function CareersPage() {
  const params = useParams();
  const region = (params?.region as string) || 'in';
  const [selectedDept, setSelectedDept] = useState("All");
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  const departments = ["All", ...Array.from(new Set(JOB_OPENINGS.map(j => j.department)))];
  const filteredJobs = selectedDept === "All" ? JOB_OPENINGS : JOB_OPENINGS.filter(j => j.department === selectedDept);

  return (
    <div className="bg-[var(--background)] min-h-screen">

      {/* Hero */}
      <div className="w-full bg-[#191974] py-24 text-center text-white relative overflow-hidden">
        <div className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] bg-[#ee2229] opacity-15 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-80px] right-[-80px] w-[400px] h-[400px] bg-[#00a1e5] opacity-10 rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">
          <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-widest mb-6">We&apos;re Hiring</span>
          <h1 className="text-[40px] md:text-[56px] font-bold font-inter mb-4 leading-tight">Build the Future<br/>of Travel With Us</h1>
          <p className="font-inter-tight opacity-90 max-w-2xl text-[16px] md:text-[18px]">
            Join a passionate team that&apos;s redefining how India travels the world. We&apos;re looking for dreamers, builders, and explorers.
          </p>
        </div>
      </div>

      {/* Perks */}
      <section className="max-w-7xl mx-auto px-4 py-16 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🌍", title: "Travel Perks", desc: "Free international trips for employees" },
            { icon: "💰", title: "Competitive Pay", desc: "Industry-leading compensation" },
            { icon: "🏠", title: "Hybrid Work", desc: "Flexible remote + office model" },
            { icon: "📈", title: "Fast Growth", desc: "Clear career progression paths" }
          ].map((perk, idx) => (
            <div key={idx} className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm text-center hover:shadow-lg transition-shadow">
              <span className="text-[32px] mb-3 block">{perk.icon}</span>
              <h3 className="text-[16px] font-bold text-[#171717] mb-1 font-inter">{perk.title}</h3>
              <p className="text-[13px] text-gray-500 font-inter-tight">{perk.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Job Listings */}
      <section className="max-w-5xl mx-auto px-4 py-10 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-[36px] font-bold font-inter text-[#191974] mb-4">Open Positions</h2>
          <p className="text-[16px] text-gray-500 font-inter-tight">Find the role that fits your passion.</p>
        </div>

        {/* Department Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all ${
                selectedDept === dept
                  ? 'bg-[#191974] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Job Cards */}
        <div className="flex flex-col gap-4">
          {filteredJobs.map(job => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
            >
              <div
                className="p-6 flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
              >
                <div>
                  <h3 className="text-[18px] font-bold text-[#171717] font-inter mb-1">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-[13px] text-gray-500 font-inter-tight">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {job.location}
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{job.type}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{job.department}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex gap-2">
                    {job.tags.map(tag => (
                      <span key={tag} className="bg-[#191974]/5 text-[#191974] text-[11px] font-bold px-3 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform ${expandedJob === job.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>

              {expandedJob === job.id && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                  <p className="text-[14px] text-gray-600 font-inter-tight leading-relaxed mb-6">{job.description}</p>
                  <button className="bg-[#ee2229] hover:bg-[#d61e24] text-white px-8 py-3 rounded-xl text-[14px] font-bold transition-colors shadow-sm">
                    Apply Now
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16 text-gray-400 font-inter-tight">
            <p className="text-[18px] font-bold mb-2">No openings in this department right now.</p>
            <p className="text-[14px]">Check back soon or send us your resume at careers@maduratravel.com</p>
          </div>
        )}
      </section>
    </div>
  );
}
