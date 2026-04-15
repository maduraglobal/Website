'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function PopupForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [selectedCountry, setSelectedCountry] = useState({ code: '+91', flag: '🇮🇳', name: 'India' });
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Newsletter popup disabled — BookingModal handles the openPopup event.
    // Re-enable the timer below if you want a newsletter popup after page load.
    // const timer = setTimeout(() => setIsVisible(true), 8000);
    // return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Phone validation - must include country code
    const phoneRegex = /^\+?\d{1,4}\s?\d{7,14}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Include country code (e.g. +91...)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log('Popup form submitted:', formData);
    handleClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Popup Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-[850px] bg-white rounded-3xl overflow-hidden  flex flex-col md:flex-row min-h-[500px]"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-gray-100 transition-colors text-gray-400"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Image Side */}
            <div className="hidden md:flex md:w-[45%] bg-[#f8f9fa] relative items-center justify-center p-8 overflow-hidden">
              {/* Decorative background for the image */}
              <div className="absolute inset-0 opacity-10">
                <img src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=800" alt="Travel" className="w-full h-full object-cover grayscale" />
              </div>

              <div className="relative z-10 w-full h-full flex items-center justify-center">
                {/* Suitcase Illustration / Image */}
                <img
                  src="https://img.freepik.com/free-vector/travel-tourism-illustration-with-world-famous-landmarks-suitcase_1284-33031.jpg"
                  alt="Travel Suitcase"
                  className="w-full h-auto max-w-[320px] drop- animate-float"
                />
              </div>
            </div>

            {/* Right Form Side */}
            <div className="md:w-[55%] p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="text-[28px] md:text-[34px]  leading-tight text-[#191974] mb-3 font-poppins">
                  Join a community of <br />
                  <span className="text-[#ee2229]">4M+ happy guests</span>
                </h2>
                <p className="text-gray-500 text-[15px] leading-relaxed">
                  Get the latest travel deals, new tour announcements, travel ideas & a whole lot more.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative group">
                  <input
                    required
                    type="text"
                    placeholder="Full Name*"
                    className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 text-[15px] outline-none focus:border-[#ee2229] transition-all group-hover:border-gray-200"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="relative group">
                  <input
                    required
                    type="email"
                    placeholder="Email ID*"
                    className={`w-full border-2 rounded-2xl px-5 py-4 text-[15px] outline-none transition-all group-hover:border-gray-200 ${errors.email ? 'border-red-500' : 'border-gray-100 focus:border-[#ee2229]'}`}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    }}
                  />
                  {errors.email && <p className="text-[10px] text-red-500 font-bold mt-1 px-2">{errors.email}</p>}
                </div>

                <div className="flex gap-3 relative">
                  <div
                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                    className="w-[100px] border-2 border-gray-100 rounded-2xl px-3 py-4 flex items-center justify-center gap-2 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-all"
                  >
                    <span className="text-[18px]">{selectedCountry.flag}</span>
                    <span className="text-[14px] font-bold text-gray-500">{selectedCountry.code}</span>
                  </div>

                  {isCountryDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-[220px] bg-white  rounded-2xl border border-gray-100 z-100 py-2 overflow-hidden">
                      {[
                        { code: '+91', flag: '🇮🇳', name: 'India' },
                        { code: '+61', flag: '🇦🇺', name: 'Australia' },
                        { code: '+1', flag: '🇺🇸', name: 'USA' },
                        { code: '+44', flag: '🇬🇧', name: 'UK' },
                        { code: '+971', flag: '🇦🇪', name: 'UAE' },
                      ].map((c) => (
                        <div
                          key={c.code}
                          onClick={() => {
                            setSelectedCountry(c);
                            setIsCountryDropdownOpen(false);
                          }}
                          className="px-5 py-3 hover:bg-gray-50 flex items-center gap-3 cursor-pointer transition-colors"
                        >
                          <span className="text-xl">{c.flag}</span>
                          <span className="text-[14px] font-bold text-[#191974]">{c.code}</span>
                          <span className="text-[12px] text-gray-400">{c.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <input
                    required
                    type="tel"
                    placeholder="Mobile No.*"
                    className={`flex-1 border-2 rounded-2xl px-5 py-4 text-[15px] outline-none transition-all group-hover:border-gray-200 ${errors.phone ? 'border-red-500' : 'border-gray-100 focus:border-[#ee2229]'}`}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                    }}
                  />
                </div>
                {errors.phone && <p className="text-[10px] text-red-500 font-bold px-2">{errors.phone}</p>}

                <button
                  type="submit"
                  className="w-full bg-[#f4a021] hover:bg-[#e89410] text-black  py-4.5 rounded-2xl text-[16px] transition-all   active:scale-[0.98] mt-4  tracking-widest"
                >
                  Send Enquiry
                </button>
              </form>

              <p className="mt-6 text-[12px] text-center text-gray-400">
                By subscribing, you agree to our <a href="#" className="underline">Privacy Policy</a>
              </p>
            </div>
          </motion.div>
        </div>
      )}

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </AnimatePresence>
  );
}
