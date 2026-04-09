"use client";

import React, { useEffect } from "react";
import { X, Mail, Phone } from "lucide-react";
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
                <h2 className="text-[24px]  text-[#191974] mb-2 tracking-tight">Welcome Back</h2>
                <p className="text-[14px] text-gray-400 font-medium">Experience the journey you&apos;ve always dreamed of.</p>
              </div>

              {/* Login Form Placeholder / Options */}
              <div className="w-full space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px]  text-[#191974]/40 uppercase tracking-[0.15em] ml-1">Email or Mobile</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. travel@example.com"
                      className="w-full bg-gray-50 border border-transparent focus:border-[#191974] focus:bg-white rounded-2xl px-6 py-4 text-[14px] font-bold text-[#191974] outline-none transition-all placeholder:text-gray-300"
                    />
                  </div>
                </div>

                <button className="w-full bg-[#ee2229] hover:bg-[#191974] text-white  py-4 rounded-2xl text-[14px] tracking-widest transition-all shadow-xl shadow-red-500/20 active:scale-95 uppercase ">
                  Continue to Journey
                </button>
              </div>

              {/* Divider */}
              <div className="w-full flex items-center gap-4 my-8">
                <div className="h-px flex-1 bg-gray-100" />
                <span className="text-[10px]  text-gray-300 uppercase tracking-widest leading-none">Social Key</span>
                <div className="h-px flex-1 bg-gray-100" />
              </div>

              {/* Social Login Buttons */}
              <div className="w-full grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 bg-white border border-gray-100 rounded-2xl py-3.5 hover:bg-gray-50 transition-all font-bold text-[#191974] text-[13px] active:scale-95 shadow-sm">
                  <svg viewBox="0 0 24 24" className="w-4 h-4">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
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
                  <button className="text-[#ee2229]  hover:underline underline-offset-4 ml-1">Create Account</button>
                </p>
                <button className="mt-4 text-[11px]  text-gray-300 uppercase tracking-widest hover:text-[#191974] transition-colors">
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
