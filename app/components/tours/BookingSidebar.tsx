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
    alert('Thank you! We will call you back soon.');
    setFormData({ fullName: '', mobileNo: '' });
  };

  return (
    <div className="flex flex-col gap-6 sticky top-24">
      {/* Trust Stats */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 grid grid-cols-3 gap-4">
        <div className="text-center border-r border-gray-100">
          <p className="text-[18px] font-bold text-[#191974]">5M+</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold leading-tight">Happy<br/>Guests</p>
        </div>
        <div className="text-center border-r border-gray-100">
          <p className="text-[18px] font-bold text-[#191974]">30K+</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold leading-tight">Tours<br/>Completed</p>
        </div>
        <div className="text-center">
          <p className="text-[18px] font-bold text-[#191974]">250+</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold leading-tight">Travel<br/>Experts</p>
        </div>
      </div>

      {/* Pricing and Main CTA */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
        <div className="p-6">
          <div className="mb-4">
            <span className="text-[12px] text-gray-500 font-medium">Starts from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-[28px] font-black text-[#171717]">₹ {price.toLocaleString()}</span>
              <span className="text-[14px] text-gray-400">per person</span>
            </div>
          </div>
          
          <button className="w-full bg-[#FFD700] hover:bg-[#F0C800] text-[#191974] font-black py-4 rounded-xl text-[16px] uppercase tracking-wider transition-all mb-4 shadow-sm">
            Dates & Prices
          </button>

          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: "Wishlist", label: "Wishlist" },
              { icon: "Download", label: "PDF" },
              { icon: "Email", label: "Email" },
              { icon: "Share", label: "Share" }
            ].map((action) => (
              <button key={action.label} className="flex flex-col items-center gap-1 group">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#191974] group-hover:text-white transition-colors text-gray-400">
                   <span className="text-[10px]"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg></span>
                </div>
                <span className="text-[10px] text-gray-500 font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enquiry Form */}
      <div className="bg-[#191974] rounded-2xl p-6 text-white shadow-lg">
        <h3 className="text-[18px] font-bold mb-1">Want us to call you?</h3>
        <p className="text-[13px] text-blue-200 mb-6">Leave your details and our travel expert will call you back.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              type="text" 
              placeholder="Full Name"
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all text-[14px]"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>
          <div>
            <div className="flex gap-2">
              <div className="bg-white/10 border border-white/20 rounded-xl px-3 py-3 text-[14px] flex items-center">
                +91
              </div>
              <input 
                type="tel" 
                placeholder="Mobile Number"
                required
                pattern="[0-9]{10}"
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all text-[14px]"
                value={formData.mobileNo}
                onChange={(e) => setFormData({...formData, mobileNo: e.target.value})}
              />
            </div>
          </div>
          <button 
            type="submit"
            className="w-full bg-white text-[#191974] font-bold py-3 rounded-xl hover:bg-[#FFD700] transition-colors uppercase text-[14px] tracking-wide"
          >
            Request Call Back
          </button>
        </form>
      </div>
    </div>
  );
}
