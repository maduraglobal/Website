'use client';

import React, { use } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, MapPin, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function TestimonialsPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = use(params);

  const stats = [
    { val: "4.9/5", label: "Average Rating" },
    { val: "10K+", label: "Verified Reviews" },
    { val: "98%", label: "Customer Satisfaction" }
  ];

  const testimonials = [
    {
      name: "Rajesh Subramanian",
      location: "Chennai, India",
      role: "Europe Traveler",
      stars: 5,
      image: "https://i.pravatar.cc/150?u=rajesh",
      quote: "My 15-day Grand Europe tour with Madura Travel was absolutely flawless. From the visa assistance to the accommodation and the expert tour manager, everything was handled with extreme professionalism. A truly premium experience!"
    },
    {
      name: "Priya Venkatesh",
      location: "Bangalore, India",
      role: "Japan Tour",
      stars: 5,
      image: "https://i.pravatar.cc/150?u=priya",
      quote: "The Japan Cherry Blossom tour was a dream come true. The itinerary was perfectly balanced between sightseeing and relaxation. Their attention to detail is why they have been in business for 40 years."
    },
    {
      name: "Amit Kumar",
      location: "Delhi, India",
      role: "Australian Grandeur",
      stars: 5,
      image: "https://i.pravatar.cc/150?u=amit",
      quote: "I was worried about my complex visa situation, but the experts at Madura Travel made it look easy. Their knowledge of global visa policies is unmatched. My Australia trip was smooth as silk!"
    },
    {
      name: "Dr. Ananya Rao",
      location: "Hyderabad, India",
      role: "Family Vacation",
      stars: 5,
      image: "https://i.pravatar.cc/150?u=ananya",
      quote: "Travelled with my elderly parents to Dubai. The team ensured we had accessible transport and the hotels were top-notch. Madura Travel doesn't just sell tours; they care for their guests."
    },
    {
      name: "Suresh Menon",
      location: "Mumbai, India",
      role: "Corporate Travel",
      stars: 4,
      image: "https://i.pravatar.cc/150?u=suresh",
      quote: "Handling our corporate MICE travel for 200+ employees was no small feat. Madura Travel managed the logistics, flights, and event planning perfectly. Highly reliable partner for corporate travel."
    },
    {
      name: "Neha Deshmukh",
      location: "Pune, India",
      role: "Swiss Escapade",
      stars: 5,
      image: "https://i.pravatar.cc/150?u=neha",
      quote: "Swiss Alps were breathtaking, and so was the service! Every meal was curated, and our tour manager felt like family. Looking forward to my next trip with them."
    }
  ];

  return (
    <div className="min-h-screen bg-white ">
      {/* â”€â”€ HERO SECTION â”€â”€ */}
      <section className="pt-40 pb-20 bg-[#191974] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ee2229] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[48px] md:text-[72px]  text-white  tracking-tighter leading-none mb-6">
              What Our <span className="text-[#ee2229]">Guests Say</span>
            </h1>
            <p className="text-[18px] md:text-[22px] text-white/60 font-light max-w-2xl mx-auto">
              Real stories from our global community of travelers. Trust built over 40 years of excellence.
            </p>

            <div className="flex flex-wrap justify-center gap-10 mt-12">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-[36px]  text-white leading-none mb-1">{s.val}</p>
                  <p className="text-[12px] text-white/40  tracking-widest font-bold">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* â”€â”€ FEATURED TESTIMONIAL â”€â”€ */}
      <section className="py-24 px-6 relative -mt-16 z-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-blue-900/10 border border-gray-100 flex flex-col md:flex-row items-center gap-12"
          >
            <div className="md:w-1/3 text-center">
              <div className="relative w-40 h-40 mx-auto mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
                  alt="Featured Customer"
                  width={160} height={160}
                  className="rounded-full border-4 border-[#ee2229]/20"
                />
                <div className="absolute -bottom-2 -right-2 bg-[#ee2229] w-10 h-10 rounded-full flex items-center justify-center text-white border-4 border-white">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-[24px]  text-[#191974]">Vikram Sathya</h3>
              <p className="text-gray-400 font-bold  tracking-widest text-[11px]">USA Grand Tour</p>
            </div>

            <div className="md:w-2/3 relative">
              <Quote className="absolute -top-10 -left-10 w-24 h-24 text-gray-400/10" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[#ee2229] text-[#ee2229]" />)}
              </div>
              <p className="text-[20px] md:text-[24px] text-gray-600 font-light leading-relaxed italic">
                "Our USA West Coast tour was beyond incredible. Every detail, from the luxury coaches to the perfectly located hotels, was meticulously planned. Madura Travel's legacy of trust is evident in every step they take."
              </p>
              <div className="mt-8 flex items-center gap-3 text-[#191974] font-bold">
                <MapPin className="w-5 h-5 text-[#ee2229]" />
                San Francisco, USA
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* â”€â”€ TESTIMONIALS GRID â”€â”€ */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-4xl border border-gray-100 shadow-xl shadow-blue-900/5 hover:-translate-y-2 transition-all group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Image src={t.image} alt={t.name} width={60} height={60} className="rounded-2xl grayscale group-hover:grayscale-0 transition-all" />
                  <div>
                    <p className="text-[17px]  text-[#191974] leading-none mb-1">{t.name}</p>
                    <p className="text-[11px] text-[#ee2229] font-bold  tracking-widest">{t.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(t.stars)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#ee2229] text-[#ee2229]" />)}
                </div>

                <p className="text-gray-600 font-light leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>

                <div className="pt-4 border-t border-gray-50 flex items-center gap-2 text-gray-400 text-[13px] font-medium">
                  <MapPin className="w-4 h-4 text-gray-300" />
                  {t.location}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-20">
            <button className="bg-transparent border-2 border-[#191974] text-[#191974] px-10 py-4 rounded-full   tracking-widest hover:bg-[#191974] hover:text-white transition-all">
              Load More Stories
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
