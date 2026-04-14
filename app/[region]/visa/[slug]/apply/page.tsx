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
    { id: 1, firstName: '', lastName: '', dob: '', gender: '', maritalStatus: '', passportNumber: '', passportExpiry: '', passportIssuePlace: '' }
  ]);

  const addTraveler = () => {
    setTravelers([
      ...travelers,
      { id: travelers.length + 1, firstName: '', lastName: '', dob: '', gender: '', maritalStatus: '', passportNumber: '', passportExpiry: '', passportIssuePlace: '' }
    ]);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] pb-12 font-inter text-[#191974]">
      {/* 1. TOP NAV BAR */}
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
                  className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border border-gray-200 outline-none focus:border-[#191974] focus:ring-4 focus:ring-[#191974]/5 transition-all text-[#191974] font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-gray-500">Last Name*</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border border-gray-200 outline-none focus:border-[#191974] focus:ring-4 focus:ring-[#191974]/5 transition-all text-[#191974] font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-gray-500">Date of Birth*</label>
                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border border-gray-200 outline-none focus:border-[#191974] focus:ring-4 focus:ring-[#191974]/5 transition-all text-[#191974] font-medium text-left"
                />
              </div>
              <div className="space-y-1.5 font-medium">
                <label className="text-[12px] font-bold text-gray-500">Gender*</label>
                <select className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border border-gray-200 outline-none focus:border-[#191974] appearance-none cursor-pointer font-bold text-[14px]">
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-gray-500">Marital Status*</label>
                <select className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border border-gray-200 outline-none focus:border-[#191974] appearance-none cursor-pointer font-bold text-[14px]">
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
                  className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border border-gray-200 outline-none focus:border-[#191974] transition-all text-[#191974] font-bold uppercase tracking-widest"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-gray-500">Passport Valid Till*</label>
                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border border-gray-200 outline-none focus:border-[#191974] transition-all text-[#191974] font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-gray-500">Passport place of issue*</label>
                <input
                  type="text"
                  placeholder="Passport place of issue"
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
                  className="w-full px-5 py-3.5 rounded-2xl bg-gray-100/50 border border-gray-200 outline-none focus:border-[#191974] font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-gray-500">Phone Number</label>
                <div className="flex gap-3">
                  <div className="w-24 px-4 py-3.5 rounded-2xl bg-gray-100/50 border border-gray-200 flex items-center justify-between font-bold cursor-pointer">
                    <img src="https://flagcdn.com/w40/in.png" className="w-6 h-4 object-cover rounded shadow-sm" />
                    <ChevronLeft className="w-4 h-4 -rotate-90 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="flex-1 px-5 py-3.5 rounded-2xl bg-gray-100/50 border border-gray-200 outline-none focus:border-[#191974] font-medium"
                  />
                </div>
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
            <button className="flex-1 py-4 px-6 rounded-2xl border border-[#191974] bg-[#191974]/5 text-[#191974] font-bold text-[14px] flex items-center justify-center gap-3">
              <CheckCircle2 className="w-5 h-5 fill-[#191974] text-white" /> Direct flight
            </button>
            <button className="flex-1 py-4 px-6 rounded-2xl border border-gray-100 text-gray-400 font-bold text-[14px] hover:border-gray-200 transition-colors">
              Multi Stop
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
              <input
                type="text"
                placeholder="dd/mm/yyyy"
                className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border border-gray-200 outline-none focus:border-[#191974] font-medium"
              />
            </div>
          </div>
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
              <select className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border border-gray-200 outline-none focus:border-[#191974] font-bold text-[14px] appearance-none cursor-pointer">
                <option value="">Select location</option>
                <option value="bangkok">Bangkok</option>
                <option value="phuket">Phuket</option>
              </select>
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
              <button className="flex-[2] py-4 px-6 rounded-2xl bg-[#191974] text-white font-bold text-[14px] hover:bg-[#0f0f4a] transition-all shadow-xl shadow-[#191974]/20 active:scale-95 uppercase tracking-widest">
                Submit application
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
