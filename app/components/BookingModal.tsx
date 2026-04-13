'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Phone, Mail, User, Send, CheckCircle, Info, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { formatRegionalPrice, getCountryConfig } from '@/config/country';
import BookingDetailsForm from './tours/BookingDetailsForm';

// ─── Context ────────────────────────────────────────────────────────────────

interface BookingContextType {
  isOpen: boolean;
  openBooking: (data?: BookingData) => void;
  closeBooking: () => void;
  bookingData: BookingData | null;
}

interface BookingData {
  packageName: string;
  discountedPrice: string;
  originalPrice: string;
  isDetailed?: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within a BookingProvider');
  return context;
};

// ─── Provider ───────────────────────────────────────────────────────────────

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  const openBooking = (data?: BookingData) => {
    setBookingData(data ?? {
      packageName: 'Custom Holiday Package',
      discountedPrice: '0',
      originalPrice: '0',
    });
    setIsOpen(true);
  };

  const closeBooking = () => setIsOpen(false);

  // Listen for class-based triggers, text-based triggers, and window event (openPopup)
  useEffect(() => {
    const TRIGGER_TEXTS = ['book now', 'book online', 'confirm booking', 'explore tours', 'apply now', 'quick enquiry'];

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // 1. Class-based: closest element with .book-now-btn
      const byClass = target.closest('.book-now-btn') as HTMLElement | null;
      if (byClass) {
        e.preventDefault();
        openBooking({
          packageName: byClass.getAttribute('data-package') ?? 'Custom Holiday Package',
          discountedPrice: byClass.getAttribute('data-price') ?? '0',
          originalPrice: byClass.getAttribute('data-original-price') ?? '0',
        });
        return;
      }

      // 2. Text-based: button or anchor whose visible text matches trigger words
      // Skip if inside a data-no-modal container or if the button has its own react onClick fiber
      const clickedEl = target.closest('button, a') as HTMLElement | null;
      if (clickedEl && !clickedEl.closest('[data-no-modal]')) {
        const text = (clickedEl.textContent ?? '').trim().toLowerCase();
        // Only match exact short labels to avoid triggering on long descriptive text
        const exactMatch = ['book now', 'book online', 'confirm booking'].some(t => text === t);
        if (exactMatch) {
          e.preventDefault();
          openBooking({
            packageName: clickedEl.getAttribute('data-package') ?? 'Custom Holiday Package',
            discountedPrice: clickedEl.getAttribute('data-price') ?? '0',
            originalPrice: clickedEl.getAttribute('data-original-price') ?? '0',
          });
        }
      }
    };

    const handleOpenEvent = () => openBooking();

    document.addEventListener('click', handleGlobalClick);
    window.addEventListener('openPopup', handleOpenEvent);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('openPopup', handleOpenEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BookingContext.Provider value={{ isOpen, openBooking, closeBooking, bookingData }}>
      {children}
      <BookingModal />
    </BookingContext.Provider>
  );
};

// ─── Modal ──────────────────────────────────────────────────────────────────

const BookingModal = () => {
  const { isOpen, closeBooking, bookingData } = useBooking();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addGST, setAddGST] = useState(false);

  const pathname = usePathname();
  const region = (pathname?.split('/')[1] ?? 'en-in').toLowerCase();
  const config = getCountryConfig(region);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'India',
    state: '',
    gender: '',
    dob: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setFormData({ firstName: '', lastName: '', email: '', phone: '', country: 'India', state: '', gender: '', dob: '' });
      setErrors({});
      setIsSubmitted(false);
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
    if (!formData.phone.match(/^\+?[\d\s-]{10,}$/)) newErrors.phone = 'Valid phone is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        closeBooking();
      }, 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div key="booking-modal" className="fixed inset-0 flex items-center justify-center p-4 z-99999">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBooking}
            className="absolute inset-0 bg-[#191974]/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full ${bookingData?.isDetailed ? 'max-w-4xl' : 'max-w-2xl'} bg-white rounded-[2.5rem] shadow-2xl overflow-hidden overflow-y-auto max-h-[95vh] font-inter`}
          >
            <button
              onClick={closeBooking}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#191974] hover:bg-[#ee2229] hover:text-white transition-all z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="p-20 text-center">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-[28px] font-bold text-[#191974] mb-2">Booking Success!</h3>
                <p className="text-gray-500">Our travel expert will contact you shortly.</p>
              </div>
            ) : bookingData?.isDetailed ? (
              <div className="p-0">
                <BookingDetailsForm 
                  onCountUpdate={() => {}} 
                />
              </div>
            ) : (
              <div className="p-8 md:p-12">
                <div className="mb-10">
                  <div className="bg-red-50 text-[#ee2229] p-4 rounded-xl flex items-center gap-3 mb-8 border border-red-100/50">
                    <div className="w-5 h-5 rounded-full border-2 border-[#ee2229] flex items-center justify-center font-bold text-[12px]">!</div>
                    <p className="text-[13px] font-medium tracking-tight">As seats fill, prices increase! Book before it is all sold out.</p>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-[20px] font-bold text-[#191974]">Lead traveller details</h3>
                    <Info className="w-4 h-4 text-blue-500 cursor-pointer" />
                  </div>
                  <p className="text-gray-400 text-[14px] font-medium leading-none">Enter details as registered in your identification document</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                    {/* First Name */}
                    <div className="relative">
                      <label className="absolute -top-2.5 left-3 bg-white px-2 text-[11px] text-gray-400 font-bold z-10 uppercase tracking-wider">First Name*</label>
                      <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter first name"
                        className={`w-full px-5 py-4 rounded-xl border outline-none transition-all text-[15px] font-medium ${errors.firstName ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-[#191974]'}`}
                      />
                      {errors.firstName && <p className="text-[11px] text-red-500 mt-1 ml-1">{errors.firstName}</p>}
                    </div>

                    {/* Last Name */}
                    <div className="relative">
                      <label className="absolute -top-2.5 left-3 bg-white px-2 text-[11px] text-gray-400 font-bold z-10 uppercase tracking-wider">Last Name*</label>
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter last name"
                        className={`w-full px-5 py-4 rounded-xl border outline-none transition-all text-[15px] font-medium ${errors.lastName ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-[#191974]'}`}
                      />
                      {errors.lastName && <p className="text-[11px] text-red-500 mt-1 ml-1">{errors.lastName}</p>}
                    </div>

                    {/* Mobile Number */}
                    <div className="relative">
                      <label className="absolute -top-2.5 left-3 bg-white px-2 text-[11px] text-gray-400 font-bold z-10 uppercase tracking-wider">Mobile No.*</label>
                      <div className={`flex rounded-xl border overflow-hidden transition-all ${errors.phone ? 'border-red-500' : 'border-gray-200 focus-within:border-[#191974]'}`}>
                        <div className="flex items-center gap-2 px-3 bg-gray-50 border-r border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                          <img src={`https://flagcdn.com/w40/${region === 'en-au' ? 'au' : region === 'en-us' ? 'us' : 'in'}.png`} alt="Flag" className="w-5 h-3.5 object-cover rounded-sm" />
                          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                        <div className="flex items-center px-4 bg-gray-50/50 text-gray-500 text-[15px] font-bold border-r border-gray-100">
                          {region === 'en-au' ? '+61' : region === 'en-us' ? '+1' : '+91'}
                        </div>
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          type="tel"
                          placeholder="98844XXXXX"
                          className="w-full px-4 py-4 outline-none text-[15px] font-medium"
                        />
                      </div>
                      {errors.phone && <p className="text-[11px] text-red-500 mt-1 ml-1">{errors.phone}</p>}
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <label className="absolute -top-2.5 left-3 bg-white px-2 text-[11px] text-gray-400 font-bold z-10 uppercase tracking-wider">Email ID*</label>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="example@mail.com"
                        className={`w-full px-5 py-4 rounded-xl border outline-none transition-all text-[15px] font-medium ${errors.email ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-[#191974]'}`}
                      />
                      {errors.email && <p className="text-[11px] text-red-500 mt-1 ml-1">{errors.email}</p>}
                    </div>

                    {/* State */}
                    <div className="relative">
                      <label className="absolute -top-2.5 left-3 bg-white px-2 text-[11px] text-gray-400 font-bold z-10 uppercase tracking-wider">State*</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-5 py-4 rounded-xl border outline-none transition-all appearance-none text-[15px] font-medium bg-white ${errors.state ? 'border-red-500' : 'border-gray-200 focus:border-[#191974]'}`}
                      >
                        <option value="">Select State</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Karnataka">Karnataka</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      {errors.state && <p className="text-[11px] text-red-500 mt-1 ml-1 font-bold italic">{errors.state} is required</p>}
                    </div>

                    {/* Gender */}
                    <div className="relative">
                      <label className="absolute -top-2.5 left-3 bg-white px-2 text-[11px] text-gray-400 font-bold z-10 uppercase tracking-wider">Gender*</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={`w-full px-5 py-4 rounded-xl border outline-none transition-all appearance-none text-[15px] font-medium bg-white ${errors.gender ? 'border-red-500' : 'border-gray-200 focus:border-[#191974]'}`}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      {errors.gender && <p className="text-[11px] text-red-500 mt-1 ml-1 font-bold italic">{errors.gender} is required</p>}
                    </div>

                    {/* Date of Birth */}
                    <div className="relative">
                      <label className="absolute -top-2.5 left-3 bg-white px-2 text-[11px] text-gray-400 font-bold z-10 uppercase tracking-wider">Date of birth*</label>
                      <div className="relative">
                        <input
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          type="date"
                          className="w-full px-5 py-4 rounded-xl border border-gray-200 outline-none focus:border-[#191974] text-[15px] font-medium bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* GST Options */}
                  <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="flex flex-col">
                      <h4 className="text-[16px] font-bold text-[#191974]">Do you want to add GST ?</h4>
                      <p className="text-gray-400 text-[12px] font-medium">You can't do this later!</p>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-full px-4 border border-gray-100">
                      <span className={`text-[13px] font-bold ${addGST ? 'text-gray-400' : 'text-[#ee2229]'}`}>No</span>
                      <button
                        type="button"
                        onClick={() => setAddGST(!addGST)}
                        className={`w-12 h-6 rounded-full relative transition-all duration-300 ${addGST ? 'bg-[#191974]' : 'bg-gray-200'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${addGST ? 'left-7' : 'left-1'}`}></div>
                      </button>
                      <span className={`text-[13px] font-bold ${addGST ? 'text-[#191974]' : 'text-gray-400'}`}>Yes</span>
                    </div>
                  </div>

                  {/* Co-travellers */}
                  <div className="space-y-4 pt-4">
                    <h4 className="text-[16px] font-bold text-[#191974]">Co-traveller details</h4>
                    <div className="flex items-center justify-between p-6 bg-gray-50/50 border border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-100/50 transition-all">
                      <span className="text-[15px] font-bold text-[#191974]">Adult 2</span>
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm border border-gray-100">
                        <Plus className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Submission */}
                  <div className="pt-10 flex flex-col md:flex-row items-center gap-6 border-t border-gray-50">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full md:w-2/3 bg-[#191974]hover:bg-[#ffbb00] text-[#191974] font-bold py-5 rounded-2xl text-[16px] shadow-xl shadow-yellow-500/10 transition-all flex items-center justify-center gap-3 active:scale-95 group"
                    >
                      {isLoading ? (
                        <span className="w-6 h-6 border-3 border-[#191974]/20 border-t-[#191974] rounded-full animate-spin" />
                      ) : (
                        <>
                          NEXT
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-all" />
                        </>
                      )}
                    </button>
                    <div className="text-center md:text-left text-[12px] text-gray-400 font-medium leading-snug">
                      Almost there! Next step: Review & Payment. <br />
                      <span className="text-blue-500 cursor-pointer hover:underline">Terms & Conditions apply.</span>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>);
};

