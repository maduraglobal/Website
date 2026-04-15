"use client";

import React, { useState } from 'react';
import { Info, Plus, ChevronDown, Calendar, Smartphone } from 'lucide-react';
import PhonePrefixSelector from '../ui/PhonePrefixSelector';

interface TravelerFormData {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  country: string;
  state: string;
  gender: string;
  dob: string;
}

interface BookingDetailsFormProps {
  onCountUpdate?: (counts: { adults: number; children: number; infants: number }) => void;
}

export default function BookingDetailsForm({ onCountUpdate }: BookingDetailsFormProps) {
  const [formData, setFormData] = useState<TravelerFormData>({
    firstName: '',
    lastName: '',
    mobile: '9884460018',
    email: 'tech@gmail.com',
    country: 'India',
    state: '',
    gender: '',
    dob: ''
  });
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');

  const [addGST, setAddGST] = useState(false);
  const [coTravelers, setCoTravelers] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [counts, setCounts] = useState({ adults: 1, children: 0, infants: 0 });

  const updateCounts = (newCounts: { adults: number; children: number; infants: number }) => {
    setCounts(newCounts);
    onCountUpdate?.(newCounts);

    // Sync co-travellers list with counts
    // Lead is Adult 1, so we need adults-1 co-adults
    const targetCoAdults = Math.max(0, newCounts.adults - 1);
    const targetChildren = Math.max(0, newCounts.children);
    const targetInfants = Math.max(0, newCounts.infants);

    let newList: any[] = [];
    for (let i = 0; i < targetCoAdults; i++) newList.push({ id: `adult-${i}`, type: 'Adult' });
    for (let i = 0; i < targetChildren; i++) newList.push({ id: `child-${i}`, type: 'Child' });
    for (let i = 0; i < targetInfants; i++) newList.push({ id: `infant-${i}`, type: 'Infant' });

    setCoTravelers(newList);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    const phoneRegex = /^\+?\d{1,4}\s?\d{7,14}$/;
    if (!phoneRegex.test(formData.mobile)) {
      newErrors.mobile = "Include country code (e.g. +91)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReview = () => {
    if (validateForm()) {
      console.log("Form is valid, proceeding...");
    }
  };

  const adjustCount = (type: keyof typeof counts, delta: number) => {
    const newCounts = { ...counts };
    const minVal = type === 'adults' ? 1 : 0;
    newCounts[type] = Math.max(minVal, newCounts[type] + delta);
    updateCounts(newCounts);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl  border border-gray-100 font-inter">
      {/* Warning Header */}
      <div className="bg-red-50 text-[#ee2229] p-4 rounded-xl flex items-center gap-3 mb-10 border border-red-100/50">
        <div className="w-5 h-5 rounded-full border-2 border-[#ee2229] flex items-center justify-center font-bold text-[12px]">!</div>
        <p className="text-[14px] font-medium">As seats fill, prices increase! Book before it is all sold out.</p>
      </div>

      {/* Configuration Section */}
      <div className="mb-10 p-6 bg-gray-50/50 rounded-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Adults', sub: '12+ years', key: 'adults' },
          { label: 'Children', sub: '2-12 years', key: 'children' },
          { label: 'Infants', sub: '0-2 years', key: 'infants' },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#191974]">{item.label}</span>
              <span className="text-[11px] text-gray-400">{item.sub}</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => adjustCount(item.key as any, -1)}
                className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#191974] hover:border-[#ee2229] hover:text-[#ee2229] transition-all disabled:opacity-30"
                disabled={item.key === 'adults' ? counts.adults <= 1 : (counts as any)[item.key] <= 0}
              >
                &minus;
              </button>
              <span className="text-[16px] font-bold text-[#191974] min-w-[20px] text-center">{(counts as any)[item.key]}</span>
              <button
                onClick={() => adjustCount(item.key as any, 1)}
                className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#191974] hover:border-[#ee2229] hover:text-[#ee2229] transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lead Traveller Header */}
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-[18px] font-bold text-[#191974]">Lead traveller details</h3>
        <Info className="w-4 h-4 text-blue-500 cursor-pointer" />
      </div>
      <p className="text-gray-400 text-[14px] mb-8 font-medium">Enter details as registered in your Aadhaar card</p>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 mb-12 border-b border-gray-100 pb-12">
        <div className="relative group">
          <label className="absolute -top-2.5 left-3 bg-white px-2 text-[12px] text-gray-400 font-medium z-10">First Name*</label>
          <input type="text" placeholder="Tech" className="w-full px-4 py-4 rounded-xl border border-gray-200 outline-none focus:border-[#191974] text-[15px] font-medium" />
        </div>
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-2 text-[12px] text-gray-400 font-medium z-10">Last Name*</label>
          <input type="text" placeholder="tech" className="w-full px-4 py-4 rounded-xl border border-gray-200 outline-none focus:border-[#191974] text-[15px] font-medium" />
        </div>
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-2 text-[12px] text-gray-400 font-medium z-10">Mobile No.*</label>
          <div className={`flex rounded-xl border transition-all ${errors.mobile ? 'border-red-500' : 'border-gray-200 focus-within:border-[#191974]'}`}>
            <PhonePrefixSelector 
              selectedCode={selectedCountryCode}
              onSelect={(code) => setSelectedCountryCode(code)}
              variant="outline"
              className="h-[54px]"
            />
            <input 
              type="tel" 
              value={formData.mobile} 
              onChange={e => {
                setFormData({...formData, mobile: e.target.value});
                if (errors.mobile) setErrors(prev => ({...prev, mobile: ''}));
              }}
              className="w-full px-4 py-4 outline-none text-[15px] font-medium" 
            />
          </div>
          {errors.mobile && <p className="text-[10px] text-red-500 font-bold mt-1 px-2">{errors.mobile}</p>}
        </div>
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-2 text-[12px] text-gray-400 font-medium z-10">Email ID*</label>
          <input 
            type="email" 
            value={formData.email}
            onChange={e => {
              setFormData({...formData, email: e.target.value});
              if (errors.email) setErrors(prev => ({...prev, email: ''}));
            }}
            placeholder="tech@gmail.com" 
            className={`w-full px-4 py-4 rounded-xl border outline-none transition-all text-[15px] font-medium ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-[#191974]'}`} 
          />
          {errors.email && <p className="text-[10px] text-red-500 font-bold mt-1 px-2">{errors.email}</p>}
        </div>
      </div>

      {/* Dynamic Co-travellers */}
      <div className="space-y-6">
        <h4 className="text-[18px] font-bold text-[#191974]">Co-traveller details</h4>

        {coTravelers.map((traveler, index) => {
          // Calculate display index for specific types
          const typeArray = coTravelers.slice(0, index + 1).filter(t => t.type === traveler.type);
          const displayIndex = traveler.type === 'Adult' ? typeArray.length + 1 : typeArray.length;

          return (
            <div key={traveler.id} className="p-6 bg-gray-50/50 border border-gray-200 rounded-3xl space-y-6 relative animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider ${traveler.type === 'Adult' ? 'bg-blue-100 text-blue-700' :
                  traveler.type === 'Child' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                  {traveler.type}
                </span>
                <h5 className="text-[16px] font-bold text-[#191974]">{traveler.type} {displayIndex}</h5>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="First Name*" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-[#191974] text-[14px] bg-white" />
                <input type="text" placeholder="Last Name*" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-[#191974] text-[14px] bg-white" />
                <div className="w-full px-4 py-3.5 rounded-xl border border-gray-200 flex justify-between items-center bg-white cursor-pointer hover:border-[#191974] transition-all"><span className="text-gray-400 text-[14px]">Gender*</span><ChevronDown className="w-4 h-4 text-gray-400" /></div>
                <div className="w-full px-4 py-3.5 rounded-xl border border-gray-200 flex justify-between items-center bg-white cursor-pointer hover:border-[#191974] transition-all"><span className="text-gray-400 text-[14px]">Date of birth*</span><Calendar className="w-5 h-5 text-gray-400" /></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12">
        <button 
          onClick={handleReview}
          className="w-full bg-[#191974] text-white font-bold py-5 rounded-2xl text-[16px]   hover:bg-[#ee2229] transition-all uppercase tracking-widest active:scale-[0.98]"
        >
          Review Details
        </button>
      </div>
    </div>
  );
}
