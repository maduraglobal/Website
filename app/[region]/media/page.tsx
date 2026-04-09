'use client';

import React, { use } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowRight, Share2, Newspaper } from 'lucide-react';
import Image from 'next/image';

export default function MediaPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = use(params);

  const news = [
    {
      title: "Madura Travel Service Celebrates 38 Years of Excellence",
      date: "Jan 17, 2024",
      cat: "Corporate",
      img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
      desc: "Celebrating a milestone journey from a single office in Chennai to a global travel powerhouse serving millions of travelers."
    },
    {
      title: "New Visa-Free Destinations for Indian Passport Holders",
      date: "Mar 12, 2024",
      cat: "Travel News",
      img: "https://images.unsplash.com/photo-1544011501-a9917d16ba4d?auto=format&fit=crop&q=80&w=800",
      desc: "Stay updated on the latest visa policies. Several new countries have announced visa-free entry for Indian citizens this quarter."
    },
    {
      title: "Sustainability in Travel: Our New Green Initiatives",
      date: "Feb 28, 2024",
      cat: "Sustainability",
      img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
      desc: "Madura Travel commits to carbon-neutral tour operations by 2030. Read about our journey towards sustainable tourism."
    },
    {
      title: "Summer 2024: Top 10 Luxury Destinations Revealed",
      date: "Apr 05, 2024",
      cat: "Feature",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
      desc: "Discover where our guests are heading this summer. From the Swiss Alps to the beaches of Fiji, luxury travel is booming."
    },
    {
      title: "Awarded 'Best International Tour Operator' 2023",
      date: "Dec 15, 2023",
      cat: "Awards",
      img: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800",
      desc: "Continuing our winning streak. Madura Travel has been recognized for its outstanding service and integrity in tourism."
    },
    {
      title: "Expanding our MICE division into Central Asia",
      date: "May 10, 2024",
      cat: "Business",
      img: "https://images.unsplash.com/photo-1517457373958-b7bdd458ad20?auto=format&fit=crop&q=80&w=800",
      desc: "Facilitating corporate growth. Our new dedicated team in Kazakhstan is now ready to host large-scale corporate events."
    }
  ];

  return (
    <div className="min-h-screen bg-white ">
      {/* â”€â”€ HERO SECTION â”€â”€ */}
      <section className="pt-40 pb-20 bg-gray-50 border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 text-[#ee2229]   tracking-[0.3em] mb-4 text-[12px]">
              <Newspaper className="w-5 h-5" />
              Press & Insights
            </div>
            <h1 className="text-[48px] md:text-[72px]  text-[#191974]  tracking-tighter leading-none mb-6">
              Media & <span className="text-[#ee2229]">News</span>
            </h1>
            <p className="text-[18px] md:text-[22px] text-gray-400  max-w-2xl ">
              Stay updated with the latest from the world of travel, our corporate milestones, and industry insights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* â”€â”€ FEATURED NEWS (Magazine Style) â”€â”€ */}
      <section className="py-24 px-6 relative z-10 -mt-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#191974] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[500px]"
          >
            <div className="lg:w-3/5 relative">
              <Image
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200"
                alt="Featured News"
                fill
                className="object-cover"
              />
            </div>
            <div className="lg:w-2/5 p-12 md:p-16 flex flex-col justify-center bg-[#191974] text-white">
              <div className="flex items-center gap-4 text-[#ee2229] text-[12px]   tracking-widest mb-6">
                <span>Featured Article</span>
                <span className="w-10 h-px bg-[#ee2229]" />
                <span>June 2024</span>
              </div>
              <h2 className="text-[32px] md:text-[42px]  leading-tight mb-6  tracking-tight">
                The Future of Global Travel: A 2024 Outlook by Madura Travel
              </h2>
              <p className="text-white/60  text-[17px] leading-relaxed mb-8">
                Explore the emerging trends, digital transformations, and the new travel patterns shaping the global tourism landscape this year.
              </p>
              <button className="self-start flex items-center gap-2 text-white   tracking-widest group">
                Read Full Story
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform text-[#ee2229]" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* â”€â”€ NEWS GRID â”€â”€ */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {news.map((item, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col"
              >
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 shadow-xl">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-[11px]  text-[#191974]  tracking-widest flex items-center gap-1.5 shadow-lg">
                    <Tag className="w-3 h-3 text-[#ee2229]" />
                    {item.cat}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-gray-400 text-[12px] font-bold  tracking-widest mb-4">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#ee2229]" /> {item.date}</span>
                </div>

                <h3 className="text-[22px]  text-[#191974] leading-tight mb-4 group-hover:text-[#ee2229] transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-gray-500  leading-relaxed mb-6 line-clamp-3">
                  {item.desc}
                </p>

                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                  <button className="flex items-center gap-2 text-[12px]  text-[#191974]  tracking-widest group/btn transition-colors hover:text-[#ee2229]">
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                  </button>
                  <Share2 className="w-5 h-5 text-gray-300 hover:text-[#ee2229] cursor-pointer transition-colors" />
                </div>
              </motion.article>
            ))}
          </div>

          {/* â”€â”€ PAGINATION â”€â”€ */}
          <div className="flex justify-center items-center gap-2 mt-24">
            <button className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-[#191974] font-bold hover:bg-[#191974] hover:text-white transition-all">1</button>
            <button className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#191974] font-bold hover:bg-[#191974] hover:text-white transition-all">2</button>
            <button className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#191974] font-bold hover:bg-[#191974] hover:text-white transition-all">3</button>
            <span className="px-4 text-gray-300">...</span>
            <button className="px-6 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#191974] font-bold hover:bg-[#191974] hover:text-white transition-all  tracking-widest text-[11px]">Next</button>
          </div>
        </div>
      </section>
    </div>
  );
}
