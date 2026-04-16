"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronRight, MessageSquare, Award, Users, ShieldCheck, Heart } from 'lucide-react';
import Image from 'next/image';

const CELEBRITY_TESTIMONIALS = [
  {
    name: "Mr. Anbil Mahesh",
    role: "Minister for Education - Government of Tamilnadu",
    quote: "I extend my heartfelt thanks to the entire Madura Travel Service team for their professional assistance in organizing international trips for the students of Tamil Nadu's government schools. Traveling with the students made me feel like a young boy again. Kudos to Madura for their incredible efforts.",
    image: "https://images.unsplash.com/photo-1556157382-97dee2dcb34e?q=80&w=200&h=200&auto=format&fit=crop", // placeholder
    badge: "Government"
  },
  {
    name: "Mr. Napoleon",
    role: "Cine Actor & Politician",
    quote: "Mr. Sriharan Balan and his exceptional team provided seamless service, taking on the monumental task of organizing my son’s wedding in Tokyo, Japan, in November 2024, with absolute ease. Every guest was treated like a VIP from start to finish.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop", // placeholder
    badge: "Tokyo Wedding 2024"
  },
  {
    name: "Mr. Kamal Haasan",
    role: "Cine Actor & Director",
    quote: "Mr. V.K.T. Balan was more than just a travel consultant; he was a cherished friend and pillar of support throughout my decades-long journey in cinema. His guidance and expertise enriched numerous travel programs and shoots.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop", // placeholder
    badge: "Cinematic Legend"
  },
  {
    name: "Mr. Venkatesh Bhat",
    role: "TCDC Fame & CEO, Accord Hotels",
    quote: "My long-standing association with Madura Travel Service has made my global travels seamless and stress-free. Their expertise in handling visas ensures timely approvals without any delays. Truly exceptional service every time!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop", // placeholder
    badge: "CEO Accord Hotels"
  },
  {
    name: "Mrs. P. Susheela",
    role: "Legendary Singer",
    quote: "My journey with Madura Travel Service began when Mr. VKT Balan helped me obtain my first passport. Since then, he has been a constant support, helping me travel the world and share my voice globally. Madura Travel Service feels like family.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop", // placeholder
    badge: "Symphony of Travel"
  },
  {
    name: "Mr. Sandy",
    role: "Dance Master",
    quote: "Mr. Sriharan Balan has been a tremendous support during my international shows. His professional team is always available 24/7, ensuring that my travel experiences are smooth and enjoyable.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&h=200&auto=format&fit=crop", // placeholder
    badge: "International Shows"
  }
];

const CUSTOMER_REVIEWS = [
  {
    name: "S Vijay",
    platform: "Google Review",
    rating: 5,
    text: "We had a wonderful experience with Madura Travel Service for our Sri Lanka trip. All the arrangements were well taken care of, and everything went smoothly. A special thanks to Mr. Sudharsan, who was very polite and ensuring we were comfortable throughout.",
    date: "2 months ago"
  },
  {
    name: "Shiv Sash",
    platform: "Google Review",
    rating: 5,
    text: "We had an amazing trip organized by Madura Travels! It was well planned Bali trip. The local guides were very friendly, kind and patient. We had a car with a separate tour guide. They were responsive and connected through the journey.",
    date: "1 month ago"
  },
  {
    name: "Vasu_digital",
    platform: "Google Review",
    rating: 5,
    text: "Madura Travels arranged Singapore packages for my vacation, excellently designed travel plan within the budget. Team support us in all ways and easily reachable wherever required. Good hospitality and more supportive. My next vacation also will be Madura Travels.",
    date: "3 weeks ago"
  },
  {
    name: "Hariharan Balasubramanian",
    platform: "Google Review",
    rating: 5,
    text: "Systematic and cautious approach to each and every step of the VISA processing. My sincere thanks to the whole team mates for your courteous and warm welcome. Timely updates were provided and my family is delighted.",
    date: "4 months ago"
  },
  {
    name: "Sushmitha Sudhakar",
    platform: "Google Review",
    rating: 5,
    text: "I had travelled to Sri Lanka from Madura Travels. It was good experience there we had nice service especially Mathulani mam who guided and the driver they given was so professional and very good service. Thank you.",
    date: "Recent"
  },
  {
    name: "Jagadeesh Jayaraman",
    platform: "Google Review",
    rating: 5,
    text: "Recently we took their tour services! By understanding our requirements, Ms. Fathima gave a right tour plan! Good planning, co-ordination, gave us a wonderful experience! Thank you!",
    date: "2 months ago"
  }
];

export default function TestimonialPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 overflow-hidden bg-[#191974]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#ee2229] text-white text-[12px] font-bold rounded-full uppercase tracking-widest mb-6">
              Testimonials
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Trusted by Celebrities, <br />
              <span className="text-[#ee2229]">Loved by Travelers.</span>
            </h1>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              For nearly four decades, Madura Travel Service has been the preferred choice for leaders, legends, and world-class travelers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: "Happy Travelers", value: "1M+" },
              { icon: Award, label: "Awards Won", value: "50+" },
              { icon: ShieldCheck, label: "Years Experience", value: "40+" },
              { icon: Star, label: "Google Rating", value: "4.8/5" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-4"
              >
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-[#191974] mb-3">
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-3xl font-bold text-[#191974] mb-1">{stat.value}</p>
                <p className="text-[13px] text-gray-500 font-bold uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Celebrity Testimonials */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#191974] mb-3">
                Endorsed by Excellence
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed italic">
                Hear from the visionaries and leaders who trust us with their global journeys.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[#ee2229] font-bold uppercase tracking-widest text-[13px]">
              <Users className="w-5 h-5" />
              Celebrity Partners
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CELEBRITY_TESTIMONIALS.map((tc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-[#191974]/5 rounded-[40px] p-8 hover:bg-[#191974] transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-[#191974]/10"
              >
                <div className="flex flex-col h-full">
                  <div className="relative w-20 h-20 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-[#ee2229] rounded-2xl rotate-12 -z-10 opacity-20 group-hover:opacity-100 group-hover:rotate-45 transition-all"></div>
                    <img 
                      src={tc.image} 
                      alt={tc.name} 
                      className="w-full h-full object-cover rounded-2xl shadow-xl grayscale-[0.8] group-hover:grayscale-0 transition-all border-2 border-white"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-white text-[#191974] p-1.5 rounded-lg shadow-md group-hover:bg-[#ee2229] group-hover:text-white transition-colors">
                      <Quote className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="inline-block px-3 py-1 bg-white/80 group-hover:bg-white text-[#191974] text-[10px] font-bold rounded-full uppercase tracking-tighter mb-4 w-fit shadow-sm">
                    {tc.badge}
                  </span>

                  <blockquote className="text-[15px] font-medium text-gray-700 leading-relaxed group-hover:text-blue-50 mb-8 flex-grow">
                    "{tc.quote}"
                  </blockquote>

                  <div className="pt-6 border-t border-[#191974]/10 group-hover:border-white/10">
                    <h4 className="text-[18px] font-bold text-[#191974] group-hover:text-white mb-1">{tc.name}</h4>
                    <p className="text-[12px] text-gray-500 group-hover:text-blue-200 font-medium">{tc.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Wall of Love */}
      <section className="py-12 bg-[#f8faff] rounded-t-[40px] md:rounded-t-[80px]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#191974] mb-6">Real Stories, Real Smiles</h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
              <span className="text-[#191974] font-bold ml-2">4.8 Rating on Google</span>
            </div>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {CUSTOMER_REVIEWS.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="break-inside-avoid bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <img 
                      src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" 
                      alt="Google" 
                      className="h-3 opacity-30 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
                <p className="text-[15px] text-gray-700 leading-relaxed mb-6 font-medium italic">
                  "{review.text}"
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div>
                    <h5 className="text-[14px] font-bold text-[#191974]">{review.name}</h5>
                    <p className="text-[11px] text-gray-400">{review.platform}</p>
                  </div>
                  <span className="text-[11px] text-gray-300 font-bold uppercase tracking-widest">{review.date}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button className="bg-[#191974] text-white px-10 py-5 rounded-full font-bold text-[15px] hover:bg-[#ee2229] transition-all shadow-xl hover:-translate-y-1 flex items-center mx-auto gap-3 group">
              View More Reviews on Google
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-12 bg-[#191974] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ee2229] rounded-full filter blur-[150px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <Heart className="w-16 h-16 text-[#ee2229] mx-auto mb-8 animate-pulse" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8">
            Ready to start your own incredible journey?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto bg-[#ee2229] text-white px-10 py-5 rounded-2xl font-bold text-[15px] hover:bg-white hover:text-[#191974] transition-all shadow-xl uppercase tracking-widest">
              Plan My Trip Now
            </button>
            <button className="w-full sm:w-auto border-2 border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-[15px] hover:bg-white/10 transition-all uppercase tracking-widest">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
