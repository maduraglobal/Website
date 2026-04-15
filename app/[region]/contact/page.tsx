'use client';

import React, { use } from 'react';
import { motion } from 'framer-motion';
import CorporateOffice from '../../components/CorporateOffice';
import BranchLocations from '../../components/BranchLocations';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from 'lucide-react';
import PhonePrefixSelector from '../../components/ui/PhonePrefixSelector';
import { useState } from 'react';

export default function ContactPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = use(params);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-12 md:pt-16 pb-16 bg-[#191974] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ee2229] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[48px] md:text-[64px]  text-white  tracking-tighter leading-none mb-6">
              Get in <span className="text-[#ee2229]">Touch</span>
            </h1>
            <p className="text-[18px] md:text-[22px] text-white/60  max-w-2xl mx-auto ">
              Whether you have a specific query or want to plan your next dream vacation, our travel experts are here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Strips */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Phone className="w-6 h-6 text-[#ee2229]" />, title: "Call Us", detail: "+91 90929 49494", sub: "Available Mon-Sat 9:30 AM - 7 PM" },
            { icon: <Mail className="w-6 h-6 text-[#ee2229]" />, title: "Email Us", detail: "mail@maduratravel.com", sub: "We'll get back within 24 hours" },
            { icon: <Clock className="w-6 h-6 text-[#ee2229]" />, title: "whatsapp", detail: "+91 90929 49494", sub: "24/7 WhatsApp Support" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-5 p-6 rounded-2xl bg-white border border-gray-100 hover: hover: transition-all">
              <div className="w-12 h-12 rounded-xl bg-white  flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-gray-400  tracking-widest mb-1">{item.title}</h3>
                <p className="text-[14px]  text-[#191974] leading-tight">{item.detail}</p>
                <p className="text-[14px] text-gray-500 mt-1">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Office Section (HQ Focus) */}
      <CorporateOffice />

      {/* Global Branch Directory */}


      {/* Contact Form Section */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[42px]  text-[#191974]  tracking-tighter mb-4">Send us a Message</h2>
            <p className="text-gray-500  text-[18px]">Fill out the form below and a travel specialist will contact you shortly.</p>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[12px]  text-[#191974]  tracking-widest ml-1">Full Name</label>
              <input type="text" placeholder="Your Name" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#ee2229] outline-none transition-all " />
            </div>
            <div className="space-y-2">
              <label className="text-[12px]  text-[#191974]  tracking-widest ml-1">Email Address</label>
              <input type="email" placeholder="email@example.com" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#ee2229] outline-none transition-all " />
            </div>
            <div className="space-y-2">
              <label className="text-[12px]  text-[#191974]  tracking-widest ml-1">Mobile Number</label>
              <div className="flex bg-gray-50 border border-gray-200 rounded-2xl focus-within:border-[#ee2229] transition-all overflow-hidden">
                <PhonePrefixSelector 
                  selectedCode={selectedCountryCode}
                  onSelect={(code) => setSelectedCountryCode(code)}
                  variant="minimal"
                  className="scale-90"
                />
                <input type="tel" placeholder="00000 00000" className="flex-1 px-4 py-4 bg-transparent outline-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[12px]  text-[#191974]  tracking-widest ml-1">Tour Interest</label>
              <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#ee2229] outline-none transition-all appearance-none cursor-pointer text-[#191974] font-medium">
                <option>General Holiday</option>
                <option>Visa Assistance</option>
                <option>Corporate Travel</option>
                <option>Group Tour</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[12px]  text-[#191974]  tracking-widest ml-1">Your Message</label>
              <textarea rows={5} placeholder="How can we help you?" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#ee2229] outline-none transition-all resize-none"></textarea>
            </div>
            <div className="md:col-span-2 pt-4">
              <button className="w-full bg-[#191974] hover:bg-[#ee2229] text-white  py-5 rounded-2xl  tracking-[0.2em] transition-all flex items-center justify-center gap-3 group  ">
                Send Enquiry
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
