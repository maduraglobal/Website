"use client";

import React, { useState, useEffect } from 'react';
import { MessageSquare, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingEnquiry() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    travelDate: '',
    nationality: '',
    enquiryType: 'Air Ticket'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('keydown', handleEsc);
    window.addEventListener('openEnquiry', handleOpen);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('openEnquiry', handleOpen);
    };
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
    if (!formData.phone.match(/^\d{10,15}$/)) newErrors.phone = 'Enter a valid phone number (10–15 digits)';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          tour_id: formData.enquiryType || 'General Enquiry',
          message: `Travel Date: ${formData.travelDate}, Nationality: ${formData.nationality}`
        })
      });
      if (response.ok) {
        alert("Enquiry submitted successfully! Our expert will contact you soon.");
        setIsOpen(false);
        setFormData({ name: '', phone: '', email: '', travelDate: '', nationality: '', enquiryType: 'Air Ticket' });
      } else {
        alert("Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      alert("Error occurred. Please check your connection.");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-10010 flex items-center gap-3 bg-[#191974] text-white px-6 py-4 rounded-full font-bold group shadow-lg"
      >
        <span className="hidden md:inline">Enquire Now</span>
        <MessageSquare className="w-5 h-5 md:hidden" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-10020 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="relative w-full max-w-[480px] my-auto bg-white rounded-2xl shadow-2xl flex flex-col"
            >
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                  <h2 className="text-[18px] md:text-[20px] font-bold text-[#191974]">Planning Your Dream Trip?</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-400 hover:text-[#191974] hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wider ml-1">Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        required
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                        }}
                        className={`w-full h-12 px-4 text-[14px] font-medium placeholder:text-gray-400 bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} outline-none focus:border-[#ee2229] focus:ring-1 focus:ring-[#ee2229] rounded-xl focus:bg-white transition-all`}
                      />
                      {errors.name && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.name}</p>}
                    </div>

                    {/* Phone — clean single input, no country selector */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wider ml-1">Phone</label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        placeholder="Enter phone number"
                        required
                        value={formData.phone}
                        maxLength={15}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 15) });
                          if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                        }}
                        className={`w-full h-12 px-4 text-[14px] font-medium placeholder:text-gray-400 bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} outline-none focus:border-[#ee2229] focus:ring-1 focus:ring-[#ee2229] rounded-xl focus:bg-white transition-all`}
                      />
                      {errors.phone && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wider ml-1">Email</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        required
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                        }}
                        className={`w-full h-12 px-4 text-[14px] font-medium placeholder:text-gray-400 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} outline-none focus:border-[#ee2229] focus:ring-1 focus:ring-[#ee2229] rounded-xl focus:bg-white transition-all`}
                      />
                      {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email}</p>}
                    </div>

                    {/* Date of Travel */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wider ml-1">Date of Travel</label>
                      <input
                        type="date"
                        required
                        value={formData.travelDate}
                        onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                        className="w-full h-12 px-4 text-[14px] font-medium text-[#191974] bg-gray-50 border border-gray-200 outline-none focus:border-[#ee2229] focus:ring-1 focus:ring-[#ee2229] rounded-xl focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Nationality */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wider ml-1">Nationality</label>
                    <input
                      type="text"
                      placeholder="e.g. Indian, American, UAE Resident"
                      required
                      value={formData.nationality}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                      className="w-full h-12 px-4 text-[14px] font-medium placeholder:text-gray-400 bg-gray-50 border border-gray-200 outline-none focus:border-[#ee2229] focus:ring-1 focus:ring-[#ee2229] rounded-xl focus:bg-white transition-all"
                    />
                  </div>

                  {/* Type of Enquiry */}
                  <div className="flex flex-col gap-1.5 relative">
                    <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wider ml-1">Type of Enquiry?</label>
                    <div className="relative">
                      <select
                        required
                        value={formData.enquiryType}
                        onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                        className="w-full h-12 px-4 pr-10 text-[14px] font-medium text-[#191974] bg-gray-50 border border-gray-200 outline-none focus:border-[#ee2229] focus:ring-1 focus:ring-[#ee2229] rounded-xl appearance-none cursor-pointer focus:bg-white transition-all"
                      >
                        <option value="Air Ticket">Air Ticket</option>
                        <option value="Visa">Visa</option>
                        <option value="Tour Packages">Tour Packages</option>
                        <option value="Hotel Booking">Hotel Booking</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full h-14 bg-[#ee2229] hover:bg-[#191974] text-white font-bold text-[15px] uppercase tracking-widest rounded-xl transition-colors shadow-lg active:scale-[0.98]"
                    >
                      Send Enquiry
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
