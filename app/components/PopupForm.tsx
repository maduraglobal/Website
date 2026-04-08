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

  useEffect(() => {
    // Show popup after 3 seconds on every hard refresh
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    const handleOpenPopup = () => setIsVisible(true);
    window.addEventListener('openPopup', handleOpenPopup);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('openPopup', handleOpenPopup);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            className="relative w-full max-w-[850px] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[500px]"
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
                  className="w-full h-auto max-w-[320px] drop-shadow-2xl animate-float"
                />
              </div>
            </div>

            {/* Right Form Side */}
            <div className="md:w-[55%] p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="text-[28px] md:text-[34px] font-black leading-tight text-[#191974] mb-3 font-poppins">
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
                    className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 text-[15px] outline-none focus:border-[#ee2229] transition-all group-hover:border-gray-200"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="flex gap-3">
                  <div className="w-[100px] border-2 border-gray-100 rounded-2xl px-3 py-4 flex items-center justify-center gap-2 bg-gray-50">
                    <img src="https://flagcdn.com/w20/in.png" alt="IN" className="w-5" />
                    <span className="text-[14px] font-bold text-gray-500">+91</span>
                  </div>
                  <input
                    required
                    type="tel"
                    placeholder="Mobile No.*"
                    className="flex-1 border-2 border-gray-100 rounded-2xl px-5 py-4 text-[15px] outline-none focus:border-[#ee2229] transition-all group-hover:border-gray-200"
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#f4a021] hover:bg-[#e89410] text-black font-black py-4.5 rounded-2xl text-[16px] transition-all shadow-xl shadow-orange-500/20 active:scale-[0.98] mt-4 uppercase tracking-widest"
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
