"use client";

import React, { useState, use } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronLeft, Info, HelpCircle, User, Plane, Building2, Briefcase, Plus,
  CheckCircle2, Globe, Calendar, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

import { getDestinationBySlug } from '@/app/data/visaData';
import { getCountryConfig, formatRegionalPrice } from '@/config/country';

export default function VisaApplyPage({ params }: { params: Promise<{ region: string, slug: string }> }) {
  const resolvedParams = use(params);
  const { region, slug } = resolvedParams;
  const router = useRouter();
  const searchParams = useSearchParams();
  const countryConfig = getCountryConfig(region);
  const citizen = searchParams.get('citizen') || countryConfig.name;

  const destination = getDestinationBySlug(slug);
  const destName = destination ? destination.name : (slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') : "Thailand");

  // Multi-Traveler State
  const [travelers, setTravelers] = useState([
    { id: 1, firstName: '', lastName: '', dob: '', gender: '', maritalStatus: '', passportNumber: '', passportExpiry: '', passportIssuePlace: '', email: '', phone: '', countryCode: 'in' }
  ]);

  const [flightType, setFlightType] = useState('direct');
  const [selectedCountryCode, setSelectedCountryCode] = useState('in');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{1,4}\s?\d{7,14}$/;
    const passportRegex = /^[A-Z0-9]{5,12}$/i;

    travelers.forEach((t, i) => {
      if (!t.firstName) newErrors[`t-${t.id}-firstName`] = "First name is required";
      if (!t.lastName) newErrors[`t-${t.id}-lastName`] = "Last name is required";
      
      if (!emailRegex.test(t.email)) {
        newErrors[`t-${t.id}-email`] = "Valid email required";
      }

      if (!t.phone) {
        newErrors[`t-${t.id}-phone`] = "Phone and country code required";
      }

      if (!passportRegex.test(t.passportNumber)) {
        newErrors[`t-${t.id}-passportNumber`] = "Alphanumeric passport required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      const firstError = Object.keys(errors)[0];
      const element = document.getElementsByName(firstError)[0];
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setIsSubmitting(true);
    // Simulate secure submission to CRM/Database
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const visaFee = parseInt(destination?.price.replace(/,/g, '') || '0');
  const totalFee = visaFee * travelers.length;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center p-6 text-[#191974]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden"
        >
          <div className="bg-[#191974] p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/20">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Application Received!</h2>
              <p className="text-white/60 text-sm font-medium">Reference: <span className="text-white">#MDV-{Math.floor(100000 + Math.random() * 900000)}</span></p>
            </div>
          </div>

          <div className="p-10 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-gray-400 uppercase tracking-widest text-[11px]">Destination</span>
                <span>{destName}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-gray-400 uppercase tracking-widest text-[11px]">Travelers</span>
                <span>{travelers.length} {travelers.length === 1 ? 'Person' : 'People'}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-gray-400 uppercase tracking-widest text-[11px]">Visa Type</span>
                <span className="text-[#191974]">{destination?.type || 'E-VISA'}</span>
              </div>
              
              <hr className="border-gray-50 border-dashed" />
              
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Total Amount</p>
                  <p className="text-3xl font-bold text-[#191974] tracking-tight">{formatRegionalPrice(totalFee, region)}</p>
                </div>
                <Globe className="w-10 h-10 text-gray-100" />
              </div>
            </div>

            <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex items-start gap-4">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-[12px] text-blue-700/80 leading-relaxed font-medium">
                Your application has been logged in our secure processing queue. Proceed to the payment gateway to finalize your submission.
              </p>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => window.location.href = `https://checkout.${countryConfig.paymentGateway}.com/pay`}
                className="w-full py-4 rounded-2xl bg-[#ee2229] text-white font-bold text-[14px] uppercase tracking-widest shadow-xl shadow-red-500/20 hover:bg-[#191974] transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <Plus className="w-5 h-5 rotate-45" /> Pay with {countryConfig.paymentGateway === 'razorpay' ? 'Razorpay' : 'Stripe'}
              </button>
              <button 
                onClick={() => router.push(`/${region}/visa`)}
                className="w-full py-4 text-gray-400 font-bold text-[12px] hover:text-[#191974] transition-colors"
              >
                Cancel and Return
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const countryCodes = [
    { code: 'in', name: 'India', dial: '+91' },
    { code: 'ae', name: 'UAE', dial: '+971' },
    { code: 'om', name: 'Oman', dial: '+968' },
    { code: 'qa', name: 'Qatar', dial: '+974' },
    { code: 'sa', name: 'Saudi', dial: '+966' },
  ];

  const addTraveler = () => {
    setTravelers([
      ...travelers,
      { id: Date.now(), firstName: '', lastName: '', dob: '', gender: '', maritalStatus: '', passportNumber: '', passportExpiry: '', passportIssuePlace: '', email: '', phone: '', countryCode: 'in' }
    ]);
  };

  const updateTraveler = (id: number, field: string, value: string) => {
    setTravelers(travelers.map(t => t.id === id ? { ...t, [field]: value } : t));
    if (errors[`t-${id}-${field}`]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[`t-${id}-${field}`];
        return next;
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] pb-12 font-inter text-[#191974]">
      {/* 1. TOP NAV BAR ... (omitted for brevity in instruction, keeping same) */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3">
            {destination && (
              <img
                src={`https://flagcdn.com/w80/${destination.flag}.png`}
                className="w-8 h-6 object-cover rounded shadow-sm"
                alt={destName}
              />
            )}
            <div className="text-center">
              <h1 className="text-[16px] font-bold leading-none mb-1">{destName} TDAC</h1>
              <div className="flex items-center gap-3 text-[11px] font-bold text-gray-400">
                <span>Validity: {destination?.valid || '90 days'}</span>
                <span>Stay: {destination?.valid || '60 days'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#191974] font-bold text-[12px]">
            <span className="flex items-center gap-1 bg-[#191974]/10 px-3 py-1.5 rounded-full">
              <Clock className="w-3.5 h-3.5" /> In 1 hour
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">
        {/* PROGRESS INFO */}
        <div className="flex items-center justify-between text-[13px] font-bold px-4 mb-2">
          <div className="flex items-center gap-2 text-[#191974]">
            <HelpCircle className="w-4 h-4" /> Have questions?
          </div>
          <div className="text-gray-400 uppercase tracking-widest text-[11px]">
            Step 1 of 4: Traveler Details
          </div>
        </div>

        {/* TRAVELER SECTIONS */}
        {travelers.map((traveler, index) => (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={traveler.id}
            className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 space-y-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#191974]/5 flex items-center justify-center text-[#191974]">
                  <User className="w-6 h-6" />
                </div>
                <h2 className="text-[18px] font-bold uppercase tracking-tight">Traveler {index + 1}</h2>
              </div>
              {index > 0 && (
                <button
                  onClick={() => setTravelers(travelers.filter(t => t.id !== traveler.id))}
                  className="text-[12px] font-bold text-red-500 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-gray-500">First Name*</label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={traveler.firstName}
                  onChange={(e) => updateTraveler(traveler.id, 'firstName', e.target.value)}
                  className={`w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border outline-none focus:ring-4 focus:ring-[#191974]/5 transition-all text-[#191974] font-medium ${errors[`t-${traveler.id}-firstName`] ? 'border-red-500' : 'border-gray-200 focus:border-[#191974]'}`}
                  name={`t-${traveler.id}-firstName`}
                />
                {errors[`t-${traveler.id}-firstName`] && <p className="text-[10px] text-red-500 font-bold px-2">{errors[`t-${traveler.id}-firstName`]}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-gray-500">Last Name*</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={traveler.lastName}
                  onChange={(e) => updateTraveler(traveler.id, 'lastName', e.target.value)}
                  className={`w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border outline-none focus:ring-4 focus:ring-[#191974]/5 transition-all text-[#191974] font-medium ${errors[`t-${traveler.id}-lastName`] ? 'border-red-500' : 'border-gray-200 focus:border-[#191974]'}`}
                  name={`t-${traveler.id}-lastName`}
                />
                {errors[`t-${traveler.id}-lastName`] && <p className="text-[10px] text-red-500 font-bold px-2">{errors[`t-${traveler.id}-lastName`]}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-gray-500">Date of Birth*</label>
                <div className="relative group">
                  <input
                    type="date"
                    value={traveler.dob}
                    onChange={(e) => updateTraveler(traveler.id, 'dob', e.target.value)}
                    className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border border-gray-200 outline-none focus:border-[#191974] focus:ring-4 focus:ring-[#191974]/5 transition-all text-[#191974] font-medium appearance-none"
                  />
                  <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#191974] transition-colors pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1.5 font-medium">
                <label className="text-[12px] font-bold text-gray-500">Gender*</label>
                <select
                  value={traveler.gender}
                  onChange={(e) => updateTraveler(traveler.id, 'gender', e.target.value)}
                  className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border border-gray-200 outline-none focus:border-[#191974] appearance-none cursor-pointer font-bold text-[14px]"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-gray-500">Marital Status*</label>
                <select
                  value={traveler.maritalStatus}
                  onChange={(e) => updateTraveler(traveler.id, 'maritalStatus', e.target.value)}
                  className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border border-gray-200 outline-none focus:border-[#191974] appearance-none cursor-pointer font-bold text-[14px]"
                >
                  <option value="">Select marital status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-gray-500">Passport Number*</label>
                <input
                  type="text"
                  placeholder="Passport Number"
                  value={traveler.passportNumber}
                  onChange={(e) => updateTraveler(traveler.id, 'passportNumber', e.target.value)}
                  className={`w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border outline-none focus:border-[#191974] transition-all text-[#191974] font-bold uppercase tracking-widest ${errors[`t-${traveler.id}-passportNumber`] ? 'border-red-500' : 'border-gray-200'}`}
                  name={`t-${traveler.id}-passportNumber`}
                />
                {errors[`t-${traveler.id}-passportNumber`] && <p className="text-[10px] text-red-500 font-bold px-2">{errors[`t-${traveler.id}-passportNumber`]}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-gray-500">Passport Valid Till*</label>
                <div className="relative group">
                  <input
                    type="date"
                    value={traveler.passportExpiry}
                    onChange={(e) => updateTraveler(traveler.id, 'passportExpiry', e.target.value)}
                    className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border border-gray-200 outline-none focus:border-[#191974] transition-all text-[#191974] font-medium appearance-none"
                  />
                  <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#191974] transition-colors pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-gray-500">Passport place of issue*</label>
                <input
                  type="text"
                  placeholder="Passport place of issue"
                  value={traveler.passportIssuePlace}
                  onChange={(e) => updateTraveler(traveler.id, 'passportIssuePlace', e.target.value)}
                  className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border border-gray-200 outline-none focus:border-[#191974] transition-all text-[#191974] font-medium"
                />
              </div>
            </div>

            <hr className="border-gray-100" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-gray-500">Email*</label>
                <input
                  type="email"
                  placeholder="Primary Email"
                  value={traveler.email}
                  onChange={(e) => updateTraveler(traveler.id, 'email', e.target.value)}
                  className={`w-full px-5 py-3.5 rounded-2xl bg-gray-100/50 border outline-none focus:border-[#191974] font-medium ${errors[`t-${traveler.id}-email`] ? 'border-red-500' : 'border-gray-200'}`}
                  name={`t-${traveler.id}-email`}
                />
                {errors[`t-${traveler.id}-email`] && <p className="text-[10px] text-red-500 font-bold px-2">{errors[`t-${traveler.id}-email`]}</p>}
              </div>
              <div className="space-y-1.5 relative">
                <label className="text-[12px] font-bold text-gray-500">Phone Number (inc. CC)*</label>
                <div className="flex gap-3">
                  <div
                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                    className="w-24 px-4 py-3.5 rounded-2xl bg-gray-100/50 border border-gray-200 flex items-center justify-between font-bold cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    <img src={`https://flagcdn.com/w40/${selectedCountryCode}.png`} className="w-6 h-4 object-cover rounded shadow-sm" alt="Flag" />
                    <ChevronLeft className={`w-4 h-4 transition-transform ${isCountryDropdownOpen ? 'rotate-90' : '-rotate-90'} text-gray-400`} />
                  </div>

                  {isCountryDropdownOpen && (
                    <div className="absolute top-20 left-0 w-48 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                      {countryCodes.map((c) => (
                        <div
                          key={c.code}
                          onClick={() => {
                            setSelectedCountryCode(c.code);
                            setIsCountryDropdownOpen(false);
                            // Update the dial code in the phone field if empty or starts with +
                            const dial = c.dial;
                            if (!traveler.phone.startsWith('+')) {
                              updateTraveler(traveler.id, 'phone', dial + traveler.phone);
                            }
                          }}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                        >
                          <img src={`https://flagcdn.com/w40/${c.code}.png`} className="w-6 h-4 object-cover rounded shadow-sm" alt={c.name} />
                          <span className="text-[13px] font-bold">{c.dial}</span>
                          <span className="text-[11px] text-gray-400 capitalize">{c.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <input
                    type="tel"
                    placeholder="Phone with country code (+91...)"
                    value={traveler.phone}
                    onChange={(e) => updateTraveler(traveler.id, 'phone', e.target.value)}
                    className={`flex-1 px-5 py-3.5 rounded-2xl bg-gray-100/50 border outline-none focus:border-[#191974] font-medium ${errors[`t-${traveler.id}-phone`] ? 'border-red-500' : 'border-gray-200'}`}
                    name={`t-${traveler.id}-phone`}
                  />
                </div>
                {errors[`t-${traveler.id}-phone`] && <p className="text-[10px] text-red-500 font-bold px-2 mt-1">{errors[`t-${traveler.id}-phone`]}</p>}
              </div>
            </div>
          </motion.section>
        ))}

        {/* 2. TRAVEL DETAILS */}
        <section className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#191974]/5 flex items-center justify-center text-[#191974]">
              <Plane className="w-6 h-6" />
            </div>
            <h2 className="text-[18px] font-bold uppercase tracking-tight">Departure & Arrival</h2>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setFlightType('direct')}
              className={`flex-1 py-4 px-6 rounded-2xl border transition-all font-bold text-[14px] flex items-center justify-center gap-3 ${flightType === 'direct'
                ? 'border-[#191974] bg-[#191974]/5 text-[#191974]'
                : 'border-gray-100 text-gray-400 hover:border-gray-200'
                }`}
            >
              <CheckCircle2 className={`w-5 h-5 fill-[#191974] text-white transition-opacity ${flightType === 'direct' ? 'opacity-100' : 'opacity-0'}`} /> Direct flight
            </button>
            <button
              onClick={() => setFlightType('multi')}
              className={`flex-1 py-4 px-6 rounded-2xl border transition-all font-bold text-[14px] flex items-center justify-center gap-3 ${flightType === 'multi'
                ? 'border-[#191974] bg-[#191974]/5 text-[#191974]'
                : 'border-gray-100 text-gray-400 hover:border-gray-200'
                }`}
            >
              <CheckCircle2 className={`w-5 h-5 fill-[#191974] text-white transition-opacity ${flightType === 'multi' ? 'opacity-100' : 'opacity-0'}`} /> Multi Stop
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-gray-500">Flight Number*</label>
              <input
                type="text"
                placeholder="Flight Number"
                className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border border-gray-200 outline-none focus:border-[#191974] font-medium"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-gray-500">{destName} Arrival Date*</label>
              <div className="relative group">
                <input
                  type="date"
                  className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border border-gray-200 outline-none focus:border-[#191974] font-medium appearance-none"
                />
                <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#191974] transition-colors pointer-events-none" />
              </div>
            </div>
          </div>

          {flightType === 'multi' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="pt-6 border-t border-gray-100 mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-gray-500">Connecting Flight*</label>
                <input
                  type="text"
                  placeholder="Flight Number"
                  className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border border-gray-200 outline-none focus:border-[#191974] font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-gray-500">Layover Duration*</label>
                <input
                  type="text"
                  placeholder="e.g. 4 Hours"
                  className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border border-gray-200 outline-none focus:border-[#191974] font-medium"
                />
              </div>
            </motion.div>
          )}
        </section>

        {/* 3. HOTEL DETAILS */}
        <section className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#191974]/5 flex items-center justify-center text-[#191974]">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-[18px] font-bold uppercase tracking-tight">Hotel Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-gray-500">Hotel Name*</label>
              <input
                type="text"
                placeholder="Hotel Name"
                className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border border-gray-200 outline-none focus:border-[#191974] font-medium"
              />
            </div>
            <div className="space-y-1.5 font-medium">
              <label className="text-[12px] font-bold text-gray-500">Hotel Location*</label>
              <input
                type="text"
                placeholder="Hotel Location"
                className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border border-gray-200 outline-none focus:border-[#191974] font-medium"
              />


            </div>
          </div>
        </section>

        {/* 4. OCCUPATION */}
        <section className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#191974]/5 flex items-center justify-center text-[#191974]">
              <Briefcase className="w-6 h-6" />
            </div>
            <h2 className="text-[18px] font-bold uppercase tracking-tight">Occupation</h2>
          </div>

          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-gray-500">Occupation*</label>
            <input
              type="text"
              placeholder="e.g. Software Engineer"
              className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border border-gray-200 outline-none focus:border-[#191974] font-medium"
            />
          </div>
        </section>

        {/* STICKY ACTION BUTTONS */}
        <div className="sticky bottom-4 z-40">
          <div className="flex flex-col md:flex-row gap-4 bg-white/80 backdrop-blur-xl p-6 rounded-[32px] border border-gray-100 shadow-2xl">
            <button
              onClick={addTraveler}
              className="flex-1 py-4 px-6 rounded-2xl border border-[#191974] text-[#191974] font-bold text-[14px] hover:bg-[#191974]/5 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" /> Add travelers
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-[2] py-4 px-6 rounded-2xl bg-[#191974] text-white font-bold text-[14px] hover:bg-[#0f0f4a] transition-all shadow-xl shadow-[#191974]/20 active:scale-95 uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Submit application"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
