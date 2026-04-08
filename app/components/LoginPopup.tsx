"use client";

import React, { useEffect } from "react";
import { X, Mail, Phone, Github, Chrome } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginPopup({ isOpen, onClose }: LoginPopupProps) {
  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-210 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#191974]/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[450px] bg-white rounded-[32px] shadow-[0_32px_80px_rgba(25,25,116,0.3)] overflow-hidden flex flex-col items-center"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-[#191974] transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content Body */}
            <div className="w-full p-8 md:p-12 flex flex-col items-center">
              {/* Brand Logo */}
              <div className="mb-10 scale-125">
                <Image
                  src="/logo.webp"
                  alt="Madura Travel"
                  width={140}
                  height={44}
                  className="object-contain"
                />
              </div>

              <div className="text-center mb-10">
                <h2 className="text-[24px] font-black text-[#191974] mb-2 tracking-tight">Welcome Back</h2>
                <p className="text-[14px] text-gray-400 font-medium">Experience the journey you&apos;ve always dreamed of.</p>
              </div>

              {/* Login Form Placeholder / Options */}
              <div className="w-full space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-[#191974]/40 uppercase tracking-[0.15em] ml-1">Email or Mobile</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. travel@example.com"
                      className="w-full bg-gray-50 border border-transparent focus:border-[#191974] focus:bg-white rounded-2xl px-6 py-4 text-[14px] font-bold text-[#191974] outline-none transition-all placeholder:text-gray-300"
                    />
                  </div>
                </div>

                <button className="w-full bg-[#ee2229] hover:bg-[#191974] text-white font-black py-4 rounded-2xl text-[14px] tracking-widest transition-all shadow-xl shadow-red-500/20 active:scale-95 uppercase font-inter">
                  Continue to Journey
                </button>
              </div>

              {/* Divider */}
              <div className="w-full flex items-center gap-4 my-8">
                <div className="h-px flex-1 bg-gray-100" />
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none">Social Key</span>
                <div className="h-px flex-1 bg-gray-100" />
              </div>

              {/* Social Login Buttons */}
              <div className="w-full grid grid-cols-2 gap-4">
                 <button className="flex items-center justify-center gap-3 bg-white border border-gray-100 rounded-2xl py-3.5 hover:bg-gray-50 transition-all font-bold text-[#191974] text-[13px] active:scale-95 shadow-sm">
                   <Chrome className="w-4 h-4 text-[#4285F4]" />
                   Google
                 </button>
                 <button className="flex items-center justify-center gap-3 bg-white border border-gray-100 rounded-2xl py-3.5 hover:bg-gray-50 transition-all font-bold text-[#191974] text-[13px] active:scale-95 shadow-sm">
                   <div className="w-4 h-4 bg-[#1877F2] rounded-sm flex items-center justify-center">
                     <span className="text-white text-[10px]">f</span>
                   </div>
                   Facebook
                 </button>
              </div>

              {/* Footer Links */}
              <div className="mt-12 text-center">
                <p className="text-[13px] text-gray-400 font-medium">
                  Don&apos;t have an account?{" "}
                  <button className="text-[#ee2229] font-black hover:underline underline-offset-4 ml-1">Create Account</button>
                </p>
                <button className="mt-4 text-[11px] font-black text-gray-300 uppercase tracking-widest hover:text-[#191974] transition-colors">
                  Trouble Logging In?
                </button>
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="w-full h-2 bg-linear-to-r from-[#191974] via-[#ee2229] to-[#191974] shrink-0" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
