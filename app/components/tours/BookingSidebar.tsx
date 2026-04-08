"use client";

import React, { useState } from 'react';
import { cn } from '@/utils/cn';

interface BookingSidebarProps {
  price?: number;
  tourName: string;
}

export default function BookingSidebar({ price = 45000, tourName }: BookingSidebarProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enquiry for:', tourName, formData);
    alert('Thank you! Our travel expert will contact you within 24 hours.');
    setFormData({ fullName: '', mobileNo: '' });
  };

  return (
    <div className="flex flex-col gap-8 relative font-arial">
      {/* Trust Stats */}
      <div className="bg-white rounded-3xl border border-gray-50 shadow-xl p-8 grid grid-cols-3 gap-6">
        <div className="text-center border-r border-gray-100">
          <p className="text-[20px] font-black text-[#191974] font-inter">5M+</p>
          <p className="text-[9px] text-gray-300  font-black tracking-widest leading-tight mt-1">Global<br />Guests</p>
        </div>
        <div className="text-center border-r border-gray-100">
          <p className="text-[20px] font-black text-[#191974] font-inter">30K+</p>
          <p className="text-[9px] text-gray-300  font-black tracking-widest leading-tight mt-1">Tour<br />Success</p>
        </div>
        <div className="text-center">
          <p className="text-[20px] font-black text-[#191974] font-inter">30Y+</p>
          <p className="text-[9px] text-gray-300  font-black tracking-widest leading-tight mt-1">Heritage<br />Expert</p>
        </div>
      </div>

      {/* Pricing and Main CTA */}
      <div className="bg-white rounded-3xl border border-gray-50 shadow-2xl overflow-hidden">
        <div className="p-10">
          <div className="mb-8">
            <span className="text-[11px] text-gray-400 font-bold  tracking-widest mb-2 block">Premium Package from</span>
            <div className="flex items-baseline gap-2">
              <span className="text-[32px] font-black text-[#191974] font-inter tracking-tighter">₹ {price.toLocaleString()}</span>
              <span className="text-[12px] text-gray-300 font-bold  tracking-widest">per pax</span>
            </div>
          </div>

          <button className="w-full bg-[#ee2229] hover:bg-[#191974] text-white font-black py-5 rounded-2xl text-[14px] font-inter-tight  tracking-widest transition-all mb-8 shadow-xl shadow-red-500/20 active:scale-95">
            Availability & Booking
          </button>

          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Save", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /> },
              { label: "PDF", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /> },
              { label: "Mail", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
              { label: "Share", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /> }
            ].map((action) => (
              <button key={action.label} className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-full border border-gray-50 flex items-center justify-center group-hover:bg-[#191974] group-hover:text-white transition-all text-gray-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{action.icon}</svg>
                </div>
                <span className="text-[9px] text-gray-400 font-black  tracking-widest">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enquiry Form */}
      <div className="bg-[#191974] rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#ee2229]" />
        <h3 className="text-[20px] font-black font-inter mb-2  tracking-tight">Expert Callback</h3>
        <p className="text-[13px] text-white/50 mb-8 font-arial leading-snug">Personalized guidance from our senior consultants.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-white/40  tracking-[0.2em] ml-1">Full Identity</label>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#ee2229] transition-all text-[14px] font-bold"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-white/40  tracking-[0.2em] ml-1">Contact Number</label>
            <div className="flex gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-[14px] font-bold text-white/40">
                +91
              </div>
              <input
                type="tel"
                placeholder="Mobile ID"
                required
                pattern="[0-9]{10}"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#ee2229] transition-all text-[14px] font-bold"
                value={formData.mobileNo}
                onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#ee2229] hover:bg-white hover:text-[#191974] text-white font-black py-4.5 rounded-xl transition-all  text-[14px] font-inter-tight tracking-widest shadow-xl shadow-black/20 mt-4 active:scale-95"
          >
            Request Assistance
          </button>
        </form>
      </div>
    </div>
  );
}
