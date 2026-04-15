"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Phone, User, Mail, Check } from 'lucide-react';
import Image from 'next/image';
import PhonePrefixSelector from './ui/PhonePrefixSelector';

export default function FloatingEnquiry() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Close with Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enquiry submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsOpen(false);
      setFormData({ name: '', email: '', phone: '' });
    }, 2000);
  };

  return (
    <>
      {/* 🚀 FLOATING BUTTON */}
      <button
        suppressHydrationWarning
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-1000 flex items-center gap-3 bg-[#f8d448] text-[#191974] px-6 py-4 rounded-full shadow-[0_10px_30px_rgba(248,212,72,0.4)] hover:shadow-[0_15px_40px_rgba(248,212,72,0.6)] hover:-translate-y-1 active:scale-95 transition-all duration-300 font-bold group"
      >

        <span className="hidden md:inline">Enquire Now</span>
        <MessageSquare className="w-5 h-5 md:hidden" />
      </button>

      {/* 🔹 POPUP OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-10001 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative w-full max-w-[420px] bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Close Button */}
              <button
                suppressHydrationWarning
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>

              {/* 📷 Header Illustration (Inspired by screenshot) */}
              <div className="relative h-[200px] w-full bg-[#f8f9fc] overflow-hidden pt-6">
                <div className="absolute inset-0 opacity-40">
                  <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="absolute top-20 right-20 w-3 h-3 rounded-full bg-blue-300"></div>
                  <div className="absolute bottom-10 left-1/2 w-2 h-2 rounded-full bg-red-400"></div>
                </div>

                <div className="relative w-full h-full flex justify-center">
                  <Image
                    src="https://img.freepik.com/free-vector/travel-tourism-illustration-with-world-famous-landmarks-suitcase_1284-33031.jpg"
                    alt="Travel Landmarks"
                    width={320}
                    height={160}
                    className="object-contain drop-shadow-xl"
                  />
                </div>

                {/* Decoration */}
                <div className="absolute top-6 left-6 w-12 h-12 bg-white/40 rounded-2xl rotate-12 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-lg bg-yellow-400 opacity-20 transform -rotate-12"></div>
                </div>
              </div>

              {/* ✍️ Form Area */}
              <div className="p-8 pb-10">
                {!isSubmitted ? (
                  <>
                    <div className="text-center mb-8">
                      <h3 className="text-[20px] font-bold text-[#191974] leading-tight mb-2">
                        Join a community of <br />
                        <span className="text-[#3ed49e]">9,44,008 happy guests</span>
                      </h3>
                      <p className="text-[12px] text-gray-400 font-medium leading-relaxed max-w-[280px] mx-auto">
                        Get the latest travel deals, new tour announcements, travel ideas & a whole lot more.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name with floating label style from screenshot */}
                      <div className="relative">
                        <label className="absolute -top-2.5 left-4 px-2 bg-white text-[12px] font-bold text-[#191974] z-10">
                          Full Name*
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full h-[54px] px-5 bg-white border-2 border-[#191974] rounded-xl text-[14px] font-bold text-[#191974] outline-none transition-all placeholder:text-transparent"
                        />
                      </div>

                      {/* Email */}
                      <div className="relative">
                        <input
                          required
                          type="email"
                          placeholder="Email ID*"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-[54px] px-5 bg-white border border-gray-200 rounded-xl text-[14px] font-bold text-[#191974] outline-none transition-all placeholder:text-gray-400 focus:border-[#191974]"
                        />
                      </div>

                      {/* Phone with Flag Selector UI */}
                      <div className="relative">
                        <label className="absolute -top-2.5 left-4 px-2 bg-white text-[12px] font-bold text-gray-400 z-10 group-focus-within:text-[#191974]">
                          Mobile No.*
                        </label>
                        <div className="flex h-[54px] bg-white border border-gray-200 rounded-xl focus-within:border-[#191974] transition-all relative">
                          <PhonePrefixSelector 
                            selectedCode={selectedCountryCode}
                            onSelect={(code) => setSelectedCountryCode(code)}
                            variant="minimal"
                            className="bg-transparent border-none scale-90 -ml-1"
                          />
                          <input
                            required
                            type="tel"
                            className="flex-1 px-4 text-[14px] font-bold text-[#191974] outline-none"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Subscribe Button */}
                      <button
                        suppressHydrationWarning
                        type="submit"
                        className="w-full h-[56px] bg-[#f8d448] hover:bg-[#ffe066] text-[#191974] font-bold rounded-xl text-[15px] uppercase tracking-widest shadow-lg shadow-yellow-400/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
                      >
                        Subscribe
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="py-12 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                      <Check className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-[22px] font-bold text-[#191974] mb-2">Thank You!</h3>
                    <p className="text-gray-500 font-medium">Your enquiry has been received.<br />We'll get back to you soon.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
