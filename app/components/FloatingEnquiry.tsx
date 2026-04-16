"use client";

import React, { useState, useEffect } from 'react';
import { MessageSquare, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PhonePrefixSelector from './ui/PhonePrefixSelector';

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
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');

  // Close with Escape key & Listen for global 'openEnquiry' event
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[10010] flex items-center gap-3 bg-[#191974] text-white px-6 py-4 rounded-full font-bold group shadow-lg"
      >
        <span className="hidden md:inline">Enquire Now</span>
        <MessageSquare className="w-5 h-5 md:hidden" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10020] bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="relative w-full max-w-[360px] my-auto bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-3">
                  <h2 className="text-[15px] font-bold text-gray-900">Planning Your Dream Trip?</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-2.5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {/* Name */}
                    <div className="flex flex-col gap-0.5">
                      <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-tight ml-0.5">Name</label>
                      <input
                        type="text"
                        placeholder="Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 text-[12px] placeholder:text-gray-400 bg-gray-50 border border-gray-200 outline-none focus:border-[#191974] rounded focus:bg-white transition-all"
                        style={{ height: '34px' }}
                      />
                    </div>
                    {/* Phone */}
                    <div className="flex flex-col gap-0.5">
                      <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-tight ml-0.5">Phone</label>
                      <div className="flex bg-gray-50 border border-gray-200 rounded focus-within:border-[#191974] focus-within:bg-white transition-all overflow-hidden" style={{ height: '34px' }}>
                        <PhonePrefixSelector
                          selectedCode={selectedCountryCode}
                          onSelect={(code) => setSelectedCountryCode(code)}
                          variant="minimal"
                          className="border-none bg-transparent scale-75 -ml-2 text-[#191974]"
                        />
                        <input
                          type="tel"
                          placeholder="Phone"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="flex-1 px-1 bg-transparent border-none outline-none text-[12px] placeholder:text-gray-400 font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {/* Email */}
                    <div className="flex flex-col gap-0.5">
                      <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-tight ml-0.5">Email</label>
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 text-[12px] placeholder:text-gray-400 bg-gray-50 border border-gray-200 outline-none focus:border-[#191974] rounded focus:bg-white transition-all"
                        style={{ height: '34px' }}
                      />
                    </div>
                    {/* Date of Travel */}
                    <div className="flex flex-col gap-0.5">
                      <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-tight ml-0.5">Date of Travel</label>
                      <input
                        type="date"
                        required
                        value={formData.travelDate}
                        onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                        className="w-full px-3 text-[12px] text-gray-700 bg-gray-50 border border-gray-200 outline-none focus:border-[#191974] rounded focus:bg-white transition-all"
                        style={{ height: '34px' }}
                      />
                    </div>
                  </div>

                  {/* Nationality */}
                  <div className="flex flex-col gap-0.5">
                    <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-tight ml-0.5">Nationality</label>
                    <input
                      type="text"
                      placeholder="Nationality"
                      required
                      value={formData.nationality}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                      className="w-full px-3 text-[12px] placeholder:text-gray-400 bg-gray-50 border border-gray-200 outline-none focus:border-[#191974] rounded focus:bg-white transition-all"
                      style={{ height: '34px' }}
                    />
                  </div>

                  {/* Type of Enquiry */}
                  <div className="flex flex-col gap-0.5 relative">
                    <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-tight ml-0.5">Type of Enquiry?</label>
                    <div className="relative">
                      <select
                        required
                        value={formData.enquiryType}
                        onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                        className="w-full px-3 text-[12px] text-gray-900 bg-gray-50 border border-gray-200 outline-none focus:border-[#191974] rounded appearance-none cursor-pointer focus:bg-white transition-all"
                        style={{ height: '34px' }}
                      >
                        <option value="Air Ticket">Air Ticket</option>
                        <option value="Visa">Visa</option>
                        <option value="Tour Packages">Tour Packages</option>
                        <option value="Hotel Booking">Hotel Booking</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#191974] text-white font-bold text-[13px] rounded-lg hover:bg-blue-900 transition-colors shadow-sm active:scale-[0.98]"
                      style={{ height: '38px' }}
                    >
                      Submit
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
