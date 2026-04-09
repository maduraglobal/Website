'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Phone, Mail, User, Send, CheckCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { formatRegionalPrice } from '@/config/country';

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

  const pathname = usePathname();
  const region = (pathname?.split('/')[1] ?? 'en-in').toLowerCase();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    adults: 1,
    children: 0,
    infants: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', email: '', phone: '', date: '', adults: 1, children: 0, infants: 0 });
      setErrors({});
      setIsSubmitted(false);
    }
  }, [isOpen]);

  // ESC key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBooking();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeBooking]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
    if (!formData.phone.match(/^\+?[\d\s-]{10,}$/)) newErrors.phone = 'Valid phone number is required';

    if (!formData.date) {
      newErrors.date = 'Travel date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) newErrors.date = 'Travel date cannot be in the past';
    }

    if (formData.adults < 1 && formData.children < 1 && formData.infants < 1) newErrors.adults = 'Select travelers';
    if (formData.children < 0) newErrors.children = 'Cannot be negative';
    if (formData.infants < 0) newErrors.infants = 'Cannot be negative';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for field on change
    if (errors[name]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          key="booking-modal"
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ zIndex: 99999 }}
        >
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBooking}
            className="absolute inset-0 bg-[#191974]/40 backdrop-blur-md"
          />

          {/* Modal card */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 24 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={closeBooking}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#191974] hover:bg-[#ee2229] hover:text-white transition-all z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              /* ── Success state ── */
              <div className="p-12 text-center py-24">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-[28px]  text-[#191974] mb-2 ">
                  Booking Initiated!
                </h3>
                <p className="text-gray-500 font-light">
                  Our travel expert will contact you shortly to confirm your itinerary.
                </p>
              </div>
            ) : (
              /* ── Form state ── */
              <div className="flex flex-col max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-8 md:p-10 bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
                  <p className="text-[#ee2229] text-[11px]   tracking-[0.2em] mb-1">
                    Book Your Experience
                  </p>
                  <h2 className="text-[22px] md:text-[26px]  text-[#191974] leading-tight mb-4  tracking-tighter pr-10">
                    {bookingData?.packageName ?? 'Tour Package'}
                  </h2>

                  <div className="flex items-end gap-3">
                    <div className="flex flex-col leading-none">
                      <span className="text-[10px] text-gray-400 font-bold  mb-1">From</span>
                      <span className="text-[28px]  text-[#ee2229]">
                        {bookingData?.discountedPrice === '0' ? 'Price on Request' : formatRegionalPrice(bookingData?.discountedPrice ?? '0', region)}
                      </span>
                    </div>
                    {bookingData?.originalPrice !== '0' && (
                      <span className="text-[16px] text-gray-400 line-through mb-1">
                        {formatRegionalPrice(bookingData?.originalPrice ?? '0', region)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-[11px]  text-[#191974]  tracking-widest ml-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          type="text"
                          placeholder="John Doe"
                          className={`w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border outline-none transition-all text-[15px] ${errors.name ? 'border-red-500 focus:border-red-600' : 'border-gray-200 focus:border-[#191974]'}`}
                        />
                      </div>
                      {errors.name && <p className="text-red-500 text-[10px] ml-1 font-bold">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[11px]  text-[#191974]  tracking-widest ml-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          type="email"
                          placeholder="john@example.com"
                          className={`w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border outline-none transition-all text-[15px] ${errors.email ? 'border-red-500 focus:border-red-600' : 'border-gray-200 focus:border-[#191974]'}`}
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-[10px] ml-1 font-bold">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-[11px]  text-[#191974]  tracking-widest ml-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          type="tel"
                          placeholder="+91 00000 00000"
                          className={`w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border outline-none transition-all text-[15px] ${errors.phone ? 'border-red-500 focus:border-red-600' : 'border-gray-200 focus:border-[#191974]'}`}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-[10px] ml-1 font-bold">{errors.phone}</p>}
                    </div>

                    {/* Travel Date */}
                    <div className="space-y-1.5">
                      <label className="text-[11px]  text-[#191974]  tracking-widest ml-1">
                        Travel Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          className={`w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border outline-none transition-all text-[15px] ${errors.date ? 'border-red-500 focus:border-red-600' : 'border-gray-200 focus:border-[#191974]'}`}
                        />
                      </div>
                      {errors.date && <p className="text-red-500 text-[10px] ml-1 font-bold">{errors.date}</p>}
                    </div>
                  </div>
                  
                  {/* Travelers Grid */}
                  <div className="grid grid-cols-3 gap-3 md:gap-5">
                    {/* Adults */}
                    <div className="space-y-1.5">
                      <label className="text-[11px]  text-[#191974]  tracking-widest ml-1">
                        Adults (12+ Yrs)
                      </label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          name="adults"
                          value={formData.adults}
                          onChange={handleChange}
                          type="number"
                          min="1"
                          className={`w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border outline-none transition-all text-[15px] ${errors.adults ? 'border-red-500 focus:border-red-600' : 'border-gray-200 focus:border-[#191974]'}`}
                        />
                      </div>
                      {errors.adults && <p className="text-red-500 text-[10px] ml-1 font-bold">{errors.adults}</p>}
                    </div>

                    {/* Children */}
                    <div className="space-y-1.5">
                      <label className="text-[11px]  text-[#191974]  tracking-widest ml-1">
                        Children (2–12 Yrs)
                      </label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          name="children"
                          value={formData.children}
                          onChange={handleChange}
                          type="number"
                          min="0"
                          className={`w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border outline-none transition-all text-[15px] ${errors.children ? 'border-red-500 focus:border-red-600' : 'border-gray-200 focus:border-[#191974]'}`}
                        />
                      </div>
                      {errors.children && <p className="text-red-500 text-[10px] ml-1 font-bold">{errors.children}</p>}
                    </div>

                    {/* Infants */}
                    <div className="space-y-1.5">
                      <label className="text-[11px]  text-[#191974]  tracking-widest ml-1">
                        Infants (0-2 Yrs)
                      </label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          name="infants"
                          value={formData.infants}
                          onChange={handleChange}
                          type="number"
                          min="0"
                          className={`w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border outline-none transition-all text-[15px] ${errors.infants ? 'border-red-500 focus:border-red-600' : 'border-gray-200 focus:border-[#191974]'}`}
                        />
                      </div>
                      {errors.infants && <p className="text-red-500 text-[10px] ml-1 font-bold">{errors.infants}</p>}
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#191974] hover:bg-[#ee2229] disabled:bg-gray-400 text-white  py-4 rounded-full  tracking-[0.25em] transition-all flex items-center justify-center gap-3 group shadow-xl"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        <>
                          Confirm Booking
                          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-gray-400 text-center mt-4 font-medium  tracking-widest">
                      By clicking &quot;Confirm Booking&quot; you agree to our Terms &amp; Conditions
                    </p>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

