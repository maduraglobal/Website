import React from 'react';
import Link from 'next/link';

const PRESS_RELEASES = [
  {
    id: 1,
    date: "Mar 15, 2026",
    title: "Madura Travel Launches AI-Powered Itinerary Builder",
    excerpt: "The new feature uses machine learning to generate personalized travel itineraries based on traveler preferences, budget, and travel history.",
    source: "Business Standard",
    tag: "Technology"
  },
  {
    id: 2,
    date: "Feb 28, 2026",
    title: "Madura Travel Expands to 15 New Destinations in 2026",
    excerpt: "Including Central Asian routes to Uzbekistan and Kazakhstan, the company aims to tap into the growing demand for offbeat travel experiences.",
    source: "Economic Times",
    tag: "Expansion"
  },
  {
    id: 3,
    date: "Jan 10, 2026",
    title: "Record-Breaking Q4: 150,000 Travelers Served",
    excerpt: "Madura Travel reported its best quarter in company history, driven by strong demand for European and Southeast Asian packages.",
    source: "Mint",
    tag: "Growth"
  },
  {
    id: 4,
    date: "Nov 20, 2025",
    title: "Partnership with Emirates for Exclusive Group Fares",
    excerpt: "A strategic partnership with Emirates Airlines to offer exclusive group fares, priority boarding, and extra baggage for Madura tour groups.",
    source: "Travel + Leisure India",
    tag: "Partnership"
  },
  {
    id: 5,
    date: "Oct 5, 2025",
    title: "Madura Travel Wins 'Most Trusted Travel Brand' Award",
    excerpt: "Recognized by the Travel & Tourism Association of India for exceptional service quality, safety standards, and customer satisfaction.",
    source: "NDTV Profit",
    tag: "Award"
  },
  {
    id: 6,
    date: "Aug 12, 2025",
    title: "Launch of Madura Travel Mobile App 3.0",
    excerpt: "The revamped app features real-time itinerary tracking, in-trip SOS support, and digital visa document management.",
    source: "TechCrunch India",
    tag: "Technology"
  }
];

export default async function MediaPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;

  return (
    <div className="bg-[var(--background)] min-h-screen">

      {/* Hero */}
      <div className="w-full bg-[#191974] py-24 text-center text-white relative overflow-hidden">
        <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-[#ee2229] opacity-15 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">
          <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-widest mb-6">Press & Updates</span>
          <h1 className="text-[40px] md:text-[56px] font-bold font-inter mb-4 leading-tight">Media & News</h1>
          <p className="font-inter-tight opacity-90 max-w-2xl text-[16px] md:text-[18px]">
            Stay up to date with the latest news, press releases, and milestones from Madura Travel.
          </p>
        </div>
      </div>

      {/* Press Releases Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-[36px] font-bold font-inter text-[#191974] mb-4">Latest Updates</h2>
          <p className="text-[16px] text-gray-500 font-inter-tight">Press coverage and company announcements.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRESS_RELEASES.map((item) => (
            <article key={item.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col">
              {/* Colored header strip */}
              <div className="h-2 bg-gradient-to-r from-[#191974] to-[#00a1e5] group-hover:from-[#ee2229] group-hover:to-[#f4a021] transition-all duration-500"></div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold text-[#191974] bg-[#191974]/5 px-3 py-1 rounded-full uppercase tracking-wider">{item.tag}</span>
                  <span className="text-[12px] text-gray-400 font-inter-tight font-semibold">{item.date}</span>
                </div>
                <h3 className="text-[18px] font-bold text-[#171717] mb-3 font-inter leading-snug group-hover:text-[#191974] transition-colors">{item.title}</h3>
                <p className="text-[14px] text-gray-600 font-inter-tight leading-relaxed mb-4 flex-1">{item.excerpt}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-[12px] text-gray-400 font-bold">Source: {item.source}</span>
                  <span className="text-[13px] text-[#ee2229] font-bold hover:underline cursor-pointer flex items-center gap-1">
                    Read More
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Media Kit / Contact */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-[28px] font-bold font-inter text-[#171717] mb-4">Media Enquiries</h2>
          <p className="text-[15px] text-gray-600 font-inter-tight leading-relaxed mb-8 max-w-2xl mx-auto">
            For press inquiries, interview requests, or access to our media kit, please contact our communications team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:media@maduratravel.com" className="bg-[#191974] hover:bg-[#111155] text-white px-8 py-3.5 rounded-xl text-[14px] font-bold transition-colors shadow-sm">
              media@maduratravel.com
            </a>
            <button className="bg-white border-2 border-[#191974] text-[#191974] hover:bg-[#191974] hover:text-white px-8 py-3.5 rounded-xl text-[14px] font-bold transition-all">
              Download Media Kit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
