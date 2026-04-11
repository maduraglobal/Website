"use client";

import React, { useEffect, useState } from "react";
import { X, Mail, Phone, Loader2 } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginPopup({ isOpen, onClose }: LoginPopupProps) {
  const router = useRouter();
  const supabase = createClient();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setFormData({ email: '', password: '' });
      setError(null);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (authError || !authData.user) {
      setError("Incorrect email or password. Please try again.");
      setLoading(false);
      return;
    }

    const user = authData.user;
    let isAdmin = false;

    if (user?.email) {
      const { data } = await supabase.from('admin_users').select('email').eq('email', user.email).single();
      if (data) isAdmin = true;
    }

    if (isAdmin) {
      router.push('/admin');
    } else {
      // Create a lead in CRM for normal user login (Running asynchronously to speed up login)
      (async () => {
        try {
          await supabase.from('leads').insert([{
            email: user.email,
            first_name: user.user_metadata?.first_name || '',
            last_name: user.user_metadata?.last_name || '',
            phone: user.user_metadata?.phone || '',
            source: 'Website Login',
            status: 'New'
          }]);
        } catch (err) {
          console.error(err);
        }
      })();
      
      // Perform a hard reload of the current page to ensure fresh session state across all components
      window.location.reload();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center p-4">
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

              <div className="text-center mb-8">
                <h2 className="text-[24px] font-bold text-[#191974] mb-2 tracking-tight">Welcome Back</h2>
                <p className="text-[14px] text-gray-400 font-medium">Experience the journey you&apos;ve always dreamed of.</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-1">
                    {error}
                  </div>
                )}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#191974]/40 uppercase tracking-[0.15em] ml-1">Email</label>
                  <div className="relative">
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. travel@example.com"
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#191974] focus:bg-white rounded-2xl px-5 py-3.5 text-[14px] font-bold text-[#191974] outline-none transition-all placeholder:text-gray-300 placeholder:font-normal"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between">
                     <label className="text-[11px] font-bold text-[#191974]/40 uppercase tracking-[0.15em] ml-1">Password</label>
                     <button type="button" className="text-[11px] text-[#ee2229] font-bold hover:underline">Forgot?</button>
                  </div>
                  <div className="relative">
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter your password"
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#191974] focus:bg-white rounded-2xl px-5 py-3.5 pr-12 text-[14px] font-bold text-[#191974] outline-none transition-all placeholder:text-gray-300 placeholder:font-normal"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#191974]"
                    >
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      )}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#ee2229] hover:bg-[#191974] text-white font-bold py-4 rounded-2xl text-[14px] tracking-widest transition-all shadow-xl shadow-red-500/20 active:scale-95 flex items-center justify-center gap-2 mt-2 disabled:bg-gray-300 disabled:shadow-none"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Authenticating...</>
                  ) : (
                    "Continue to Journey"
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="w-full flex items-center gap-4 my-8">
                <div className="h-px flex-1 bg-gray-100" />
                <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest leading-none">Social Key</span>
                <div className="h-px flex-1 bg-gray-100" />
              </div>

              {/* Social Login Buttons */}
              <div className="w-full flex gap-3">
                <button 
                  onClick={async () => {
                    try {
                      setLoading(true);
                      setError(null);
                      const { error } = await supabase.auth.signInWithOAuth({
                        provider: 'google',
                        options: {
                          redirectTo: `${window.location.origin}${window.location.pathname}`
                        }
                      });
                      if (error) throw error;
                    } catch (err: any) {
                      setError(err.message || 'Failed to initialize Google login');
                      setLoading(false);
                    }
                  }}
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 py-3 rounded-xl text-[13px] font-semibold text-[#171717] hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                  Google
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 py-3 rounded-xl text-[13px] font-semibold text-[#171717] hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                  <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  Facebook
                </button>
              </div>

              {/* Footer Links */}
              <div className="mt-10 text-center">
                <p className="text-[13px] text-gray-500">
                  Don&apos;t have an account?{" "}
                  <button onClick={() => window.location.href='/en-in/signup'} className="text-[#191974] font-bold hover:underline ml-1">Create Account</button>
                </p>
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

