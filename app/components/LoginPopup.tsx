"use client";

import React, { useEffect, useState } from "react";
import { X, Loader2, Phone, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginPopup({ isOpen, onClose }: LoginPopupProps) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setPhoneNumber("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Logic for phone authentication would go here
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-210 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden z-220 pb-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 sm:p-12 flex flex-col items-center">
              {/* Logo Area */}
              <div className="mb-8 hidden sm:block">
                <Image
                  src="/logo.webp"
                  alt="Madura Travel"
                  width={140}
                  height={45}
                  className="object-contain"
                />
              </div>

              {/* Title Section */}
              <div className="text-center mb-10 mt-4 sm:mt-0">
                <h2 className="text-[24px] sm:text-[28px] font-bold text-[#191974] tracking-tight mb-3">
                  Welcome to Madura Travel
                </h2>
                <p className="text-[14px] sm:text-[15px] text-gray-400 font-medium leading-relaxed max-w-[280px] mx-auto">
                  Please enter your mobile number to receive a verification code
                </p>
              </div>

              {/* Phone Input Group (Matching Image 1) */}
              <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
                <div className="relative group">
                  <label className="absolute -top-3 left-6 px-2 bg-white text-[12px] font-bold text-gray-400 z-100 group-focus-within:text-[#191974]">
                    Mobile No.*
                  </label>
                  <div className="flex h-[60px] sm:h-[64px] bg-white border-2 border-gray-100 rounded-2xl overflow-hidden focus-within:border-[#191974] transition-all">
                    {/* Flag/Country Selector Section */}
                    <div className="w-[100px] border-r border-gray-100 flex items-center justify-center gap-2 px-3 bg-gray-50/30 cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-1">
                        <img 
                          src="https://flagcdn.com/w40/in.png" 
                          alt="ID" 
                          className="w-6 h-4 object-cover rounded shadow-xs" 
                        />
                        <span className="text-[10px] text-gray-400">▼</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center px-4 border-r border-gray-50 bg-gray-50/10">
                      <span className="text-[16px] font-bold text-gray-500">{countryCode}</span>
                    </div>

                    <input
                      required
                      autoFocus
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                      placeholder="Mobile Number"
                      className="flex-1 px-4 text-[18px] font-bold text-[#191974] outline-none placeholder:text-gray-200"
                    />
                  </div>
                </div>

                {/* Google reCAPTCHA Placeholder UI */}
                <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-gray-300 rounded bg-white" />
                    <span className="text-sm font-medium text-gray-600">I&apos;m not a robot</span>
                  </div>
                  <div className="flex flex-col items-center opacity-40">
                    <ShieldCheck className="w-6 h-6 text-[#191974]" />
                    <span className="text-[8px] font-bold uppercase tracking-tight">reCAPTCHA</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-[12px] text-gray-400 font-medium">
                    By continuing you agree to our <br/>
                    <a href="#" className="underline text-[#191974] font-bold">Terms of Use</a> & <a href="#" className="underline text-[#191974] font-bold">Privacy Policy</a>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || phoneNumber.length < 10}
                  className="w-full h-[60px] bg-[#ee2229] hover:bg-[#191974] disabled:bg-gray-200 text-white font-bold rounded-2xl text-[16px] tracking-widest shadow-xl shadow-red-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "GET OTP"}
                </button>
              </form>
            </div>

            {/* Bottom Accent */}
            <div className="h-2 bg-linear-to-r from-[#191974] via-[#ee2229] to-[#191974]" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

