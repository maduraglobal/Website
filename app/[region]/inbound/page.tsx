'use client';

import React, { use } from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  Map as MapIcon,
  Bed,
  Car,
  Languages,
  Package,
  ShieldCheck,
  Award,
  Globe2,
  Star,
  Send
} from 'lucide-react';
import Image from 'next/image';

export default function InboundPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = use(params);

  const services = [
    { icon: <Compass className="w-8 h-8" />, title: "Guided India Tours", desc: "Expertly curated itineraries covering heritage, culture, and spirituality." },
    { icon: <ShieldCheck className="w-8 h-8" />, title: "Visa Assistance", desc: "Seamless e-visa and sticker visa support for international travelers." },
    { icon: <Bed className="w-8 h-8" />, title: "Hotel Bookings", desc: "Handpicked 4-star and 5-star luxury properties across India." },
    { icon: <Car className="w-8 h-8" />, title: "Transport Services", desc: "Private chauffeurs and luxury coaches for comfortable travel." },
    { icon: <Languages className="w-8 h-8" />, title: "Multilingual Guides", desc: "Government-approved guides fluent in multiple international languages." },
    { icon: <Package className="w-8 h-8" />, title: "Custom Packages", desc: "Bespoke itineraries tailored to your unique interests and schedules." }
  ];

  const destinations = [
    { title: "The Taj Mahal", loc: "Agra, Uttar Pradesh", img: "https://images.unsplash.com/photo-1564507592333-c60657ece523?auto=format&fit=crop&q=80&w=800" },
    { title: "The Pink City", loc: "Jaipur, Rajasthan", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=800" },
    { title: "Backwaters", loc: "Alleppey, Kerala", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800" },
    { title: "Ghats of Ganga", loc: "Varanasi, Uttar Pradesh", img: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800" }
  ];

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* ── HERO SECTION ── */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=2000"
            alt="Inbound India"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#191974]/80 via-[#191974]/40 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[56px] md:text-[84px] font-black  tracking-tighter leading-none mb-6 drop-shadow-2xl">
              Discover the <br />
              <span className="text-[#ee2229]">Soul of India</span>
            </h1>
            <p className="text-[20px] md:text-[24px] font-light max-w-2xl mx-auto mb-10 text-white/90">
              Curated inbound travel experiences for international travelers. Heritage, Luxury, and Spirituality await you.
            </p>
            <button
              className="book-now-btn bg-[#ee2229] hover:bg-white hover:text-[#191974] text-white px-12 py-5 rounded-xl font-black  tracking-widest transition-all shadow-2xl"
              data-package="Soul of India - Heritage Tour"
              data-price="1,49,999"
              data-original-price="1,89,999"
            >
              Explore Tours
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT INBOUND SERVICES ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-[36px] md:text-[48px] font-black text-[#191974]  tracking-tighter leading-tight">
              A Gateway to <br />
              <span className="text-[#ee2229]">Authentic India</span>
            </h2>
            <div className="space-y-6 text-gray-600 text-[18px] font-light leading-relaxed">
              <p>
                At Madura Travel, we understand that visiting India is more than just a trip—it's a spiritual and cultural awakening. Our dedicated inbound division specializes in handling international clients with the highest standards of hospitality.
              </p>
              <p>
                From the ivory-white majesty of the Taj Mahal to the serene backwaters of Kerala, we provide end-to-end support to ensure your journey through the Indian subcontinent is smooth, safe, and deeply enriching.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="border-l-4 border-[#ee2229] pl-6">
                <p className="text-[32px] font-black text-[#191974]">40+</p>
                <p className="text-[12px] text-gray-400 font-bold  tracking-widest">Years Expertise</p>
              </div>
              <div className="border-l-4 border-[#ee2229] pl-6">
                <p className="text-[32px] font-black text-[#191974]">Government</p>
                <p className="text-[12px] text-gray-400 font-bold  tracking-widest">Approved Agent</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
              <Image
                src="https://images.unsplash.com/photo-1524492707947-5c3b44b80e55?auto=format&fit=crop&q=80&w=1200"
                alt="About India"
                width={800} height={1000}
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#ee2229]/5 rounded-full blur-[80px]" />
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ── */}
      <section className="py-24 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-black text-[#191974]  tracking-tighter mb-4">Our Premium Services</h2>
            <div className="w-20 h-1.5 bg-[#ee2229] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-4xl border border-gray-100 shadow-xl shadow-blue-900/5 group text-center lg:text-left"
              >
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[#ee2229] mb-6 group-hover:bg-[#191974] group-hover:text-white transition-all">
                  {svc.icon}
                </div>
                <h3 className="text-[20px] font-black text-[#191974] mb-3 ">{svc.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed text-[15px]">{svc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR DESTINATIONS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-black text-[#191974]  tracking-tighter mb-4">Iconic Landmarks</h2>
            <p className="text-gray-400 font-bold  tracking-widest text-[13px]">The best of India waiting for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, i) => (
              <div key={i} className="group relative aspect-3/4 rounded-[2.5rem] overflow-hidden shadow-xl">
                <Image src={dest.img} alt={dest.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h4 className="text-white text-[22px] font-black leading-tight mb-1">{dest.title}</h4>
                  <p className="text-white/60 text-[12px]  font-bold tracking-widest">{dest.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24 bg-[#191974] px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ee2229]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { icon: <Award className="w-8 h-8" />, title: "40+ Years Experience", desc: "Decades of trust in global tourism." },
            { icon: <Globe2 className="w-8 h-8" />, title: "Global Trusted", desc: "Thousands of satisfied global clients." },
            { icon: <ShieldCheck className="w-8 h-8" />, title: "End-to-End Support", desc: "We are with you at every milestone." },
            { icon: <Package className="w-8 h-8" />, title: "Personalized Journeys", desc: "Itineraries crafted just for you." }
          ].map((item, i) => (
            <div key={i} className="text-center text-white">
              <div className="w-16 h-16 bg-[#ee2229] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#ee2229]/20">
                {item.icon}
              </div>
              <h4 className="text-[18px] font-black mb-2  tracking-tight">{item.title}</h4>
              <p className="text-white/50 text-[14px] font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-black text-[#191974]  tracking-tighter mb-4">Guest Experiences</h2>
            <p className="text-gray-400 font-bold  tracking-widest text-[13px]">Stories from across the globe</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: "John & Sarah Miller", loc: "London, UK", quote: "Our heritage tour of Rajasthan was life-changing. Madura Travel's guides were so knowledgeable and the hotels were palatial. Highly recommended!" },
              { name: "Yuki Tanaka", loc: "Tokyo, Japan", quote: "Very professional service. The transport was clean and safe, and the visa process was handled efficiently. A great partner for India travel." }
            ].map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-4xl border border-gray-100 shadow-xl shadow-blue-900/5 relative">
                <div className="flex gap-1 mb-6 text-[#ee2229]">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-600 font-light italic leading-relaxed text-[17px] mb-8">"{t.quote}"</p>
                <div>
                  <p className="text-[#191974] font-black text-[18px]">{t.name}</p>
                  <p className="text-[#ee2229] text-[11px] font-bold  tracking-widest mt-1">{t.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / ENQUIRY ── */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#191974] rounded-[3rem] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ee2229]/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />

            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-[32px] md:text-[42px] font-black  tracking-tighter mb-4">Plan Your Indian Journey</h2>
                <p className="text-white/60 font-light max-w-lg mx-auto">Tell us where you want to go and our specialists will contact you.</p>
              </div>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Full Name" className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 focus:border-[#ee2229] outline-none transition-all placeholder:text-white/30" />
                <input type="text" placeholder="Country" className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 focus:border-[#ee2229] outline-none transition-all placeholder:text-white/30" />
                <input type="email" placeholder="Email Address" className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 focus:border-[#ee2229] outline-none transition-all placeholder:text-white/30 md:col-span-2" />
                <select className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 focus:border-[#ee2229] outline-none transition-all appearance-none md:col-span-2 cursor-pointer text-white/60">
                  <option>Interested in... Heritage Tour</option>
                  <option>Interested in... Spiritual Journey</option>
                  <option>Interested in... Luxury Retreat</option>
                  <option>Interested in... Wildlife Adventure</option>
                </select>
                <button className="bg-[#ee2229] hover:bg-white hover:text-[#191974] text-white py-5 rounded-xl font-black  tracking-[0.2em] md:col-span-2 transition-all flex items-center justify-center gap-3 mt-4">
                  Send Inquiry
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
