'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Phone, Mail, User, Send, CheckCircle, Info, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { formatRegionalPrice, getCountryConfig } from '@/config/country';
import BookingDetailsForm from './tours/BookingDetailsForm';
import PhonePrefixSelector from './ui/PhonePrefixSelector';

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
  const pathname = usePathname();

  const openBooking = (data?: BookingData) => {
    // Safety check: Don't open the modal if we are already on the dedicated booking page
    if (pathname?.includes('/booking')) return;

    setBookingData(data ?? {
      packageName: 'Custom Holiday Package',
      discountedPrice: '0',
      originalPrice: '0',
    });
    setIsOpen(true);
  };

  const closeBooking = () => setIsOpen(false);

  // Auto-close modal when navigating to /booking page
  useEffect(() => {
    if (pathname?.includes('/booking') && isOpen) {
      setIsOpen(false);
    }
  }, [pathname, isOpen]);

  // Listen for class-based triggers, text-based triggers, and window event (openPopup)
  useEffect(() => {
    const TRIGGER_TEXTS = ['book now', 'book online', 'confirm booking', 'explore tours', 'apply now', 'quick enquiry'];

    const handleGlobalClick = (e: MouseEvent) => {
      // ALL click interception is DISABLED.
      // Booking buttons now navigate to the dedicated /booking page via router.push or Link.
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
  const [selectedCountryCode, setSelectedCountryCode] = useState(region === 'en-au' ? '+61' : region === 'en-us' ? '+1' : '+91');

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
    // Include the country code in the final payload
    console.log('Final Phone:', selectedCountryCode + formData.phone);
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
    const finalValue = name === 'phone' ? value.replace(/\D/g, '') : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
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
            className={`relative w-full ${bookingData?.isDetailed ? 'max-w-4xl' : 'max-w-2xl'} bg-white rounded-[2.5rem]  overflow-hidden overflow-y-auto max-h-[95vh] font-inter`}
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
                  onCountUpdate={() => { }}
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
                    <h3 className="text-[20px] font-bold text-[#191974]">Request an Enquiry</h3>
                    <Info className="w-4 h-4 text-blue-500 cursor-pointer" />
                  </div>
                  <p className="text-gray-400 text-[14px] font-medium leading-none">Our travel experts will contact you soon</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    {/* First Name */}
                    <div className="relative">
                      <label className="absolute -top-2.5 left-3 bg-white px-2 text-[11px] text-gray-400 font-bold z-10 uppercase tracking-wider">Full Name*</label>
                      <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter full name"
                        className={`w-full px-5 py-3.5 rounded-xl border outline-none transition-all text-[15px] font-medium ${errors.firstName ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-[#191974]'}`}
                      />
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
                        className={`w-full px-5 py-3.5 rounded-xl border outline-none transition-all text-[15px] font-medium ${errors.email ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-[#191974]'}`}
                      />
                    </div>

                    {/* Mobile Number */}
                    <div className="relative">
                      <label className="absolute -top-2.5 left-3 bg-white px-2 text-[11px] text-gray-400 font-bold z-10 uppercase tracking-wider">Mobile No.*</label>
                      <div className={`flex rounded-xl border transition-all ${errors.phone ? 'border-red-500' : 'border-gray-200 focus-within:border-[#191974]'}`}>
                        <PhonePrefixSelector 
                          value={selectedCountryCode}
                          onChange={(code: string) => setSelectedCountryCode(code)}
                          variant="outline"
                        />
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          type="tel"
                          placeholder="Your Mobile Number"
                          className="w-full px-4 py-3.5 outline-none text-[15px] font-medium"
                        />
                      </div>
                    </div>

                    {/* State */}
                    <div className="relative">
                      <label className="absolute -top-2.5 left-3 bg-white px-2 text-[11px] text-gray-400 font-bold z-10 uppercase tracking-wider">State*</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-5 py-3.5 rounded-xl border outline-none transition-all text-[15px] font-medium appearance-none bg-white ${errors.state ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-[#191974]'}`}
                      >
                        <option value="">Select State</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <label className="absolute -top-2.5 left-3 bg-white px-2 text-[11px] text-gray-400 font-bold z-10 uppercase tracking-wider">How can we help you? (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. I'm looking for a customized family tour for 5 people..."
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 outline-none focus:border-[#191974] transition-all text-[15px] font-medium resize-none"
                    ></textarea>
                  </div>
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#191974] text-white py-5 rounded-2xl font-bold text-[16px] hover:bg-[#ee2229] transition-all   active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 group"
                    >
                      {isLoading ? "Processing..." : "Submit Enquiry"}
                      <Send className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isLoading ? 'animate-pulse' : ''}`} />
                    </button>
                    <p className="text-center text-gray-400 text-[11px] mt-4 uppercase  font-bold">Your information is secure with us</p>
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

export default BookingModal;
