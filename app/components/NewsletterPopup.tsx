"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, User, Phone, Percent } from 'lucide-react';
import Image from 'next/image';
import PhonePrefixSelector from './ui/PhonePrefixSelector';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');

  useEffect(() => {
    // Show popup after 5 seconds if not closed before
    const hasSeenPopup = localStorage.getItem('madura_newsletter_seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('madura_newsletter_seen', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribed:', { name, email, phone });
    handleClose();
    alert('Thank you for subscribing!');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-[440px] bg-white rounded-[32px] overflow-hidden "
          >
            {/* Discount Badge */}
            <div className="absolute top-4 left-4 z-20 w-12 h-12 bg-[#191974]/10 rounded-2xl flex items-center justify-center rotate-[-15deg]">
              <Percent className="w-6 h-6 text-[#191974]" />
            </div>

            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white rounded-full transition-colors "
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Top Illustration */}
            <div className="relative h-[220px] w-full bg-[#f8f9fc]">
              <Image 
                src="/travel_pop_up_banner_1776235630243.png"
                alt="Travel Illustration"
                fill
                className="object-contain p-6"
              />
            </div>

            {/* Form Area */}
            <div className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-[22px] font-bold text-[#191974] leading-tight">
                  Join a community of <br />
                  <span className="text-[#ee2229]">9,44,008 happy guests</span>
                </h3>
                <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
                  Get the latest travel deals, new tour announcements, travel ideas & a whole lot more.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#191974] transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  <input 
                    required
                    type="text"
                    placeholder="Full Name*"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50 border-b-2 border-transparent focus:border-[#191974] focus:bg-white outline-none pl-11 pr-4 py-4 rounded-xl font-semibold text-[#191974] text-[14px] transition-all"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#191974] transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input 
                    required
                    type="email"
                    placeholder="Email ID*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border-b-2 border-transparent focus:border-[#191974] focus:bg-white outline-none pl-11 pr-4 py-4 rounded-xl font-semibold text-[#191974] text-[14px] transition-all"
                  />
                </div>

                <div className="relative group">
                  <div className="flex bg-gray-50 border-b-2 border-transparent focus-within:border-[#191974] focus-within:bg-white rounded-xl transition-all">
                    <PhonePrefixSelector 
                      value={selectedCountryCode}
                      onChange={(code: string) => setSelectedCountryCode(code)}
                      variant="simple"
                      className="w-[85px] shrink-0"
                    />
                    <input 
                      required
                      type="tel"
                      placeholder="Mobile No.*"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 bg-transparent outline-none px-4 py-4 font-semibold text-[#191974] text-[14px]"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-[#191974] font-bold py-4 rounded-xl   active:scale-[0.98] transition-all text-[15px] mt-2 uppercase tracking-wider"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
