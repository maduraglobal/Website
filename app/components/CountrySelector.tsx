"use client";

import React, { useState } from 'react';
import { useCountry } from '@/context/CountryContext';
import { COUNTRY_CONFIG } from '@/config/country';
import { Check, Globe, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CountrySelector() {
  const { selectedCountry, setCountry } = useCountry();
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelection, setTempSelection] = useState(selectedCountry.id);

  const countries = [
    { id: 'en-in', name: 'India', flag: '🇮🇳', currency: 'INR' },
    { id: 'en-au', name: 'Australia', flag: '🇦🇺', currency: 'AUD' },
    { id: 'en-us', name: 'USA', flag: '🇺🇸', currency: 'USD' },
  ];

  const handleApply = () => {
    setCountry(tempSelection);
    setIsOpen(false);
  };

  const currentCountry = countries.find(c => c.id === selectedCountry.id) || countries[0];

  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsOpen(true);
          setTempSelection(selectedCountry.id);
        }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-100 hover:border-gray-200 bg-white transition-all shadow-sm"
      >
        <span className="text-lg">{currentCountry.flag}</span>
        <div className="flex flex-col items-start leading-none">
          <span className="text-[11px] font-bold text-[#191974]">{currentCountry.name}</span>
          <span className="text-[9px] text-gray-400 font-bold uppercase">{selectedCountry.currencyCode}</span>
        </div>
        <ChevronDown className="w-3 h-3 text-gray-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10005]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-3xl shadow-2xl z-[10006] overflow-hidden border border-gray-100"
            >
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#191974]/5 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-[#191974]" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-[#191974]">Select Region</h3>
                    <p className="text-[11px] text-gray-400 font-medium">Choose your location & currency</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="p-4 space-y-2">
                {countries.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setTempSelection(c.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border-2 ${
                      tempSelection === c.id 
                        ? 'border-[#ee2229] bg-[#ee2229]/5 shadow-[0_0_20px_rgba(238,34,41,0.1)]' 
                        : 'border-transparent hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{c.flag}</span>
                      <div className="flex flex-col items-start leading-tight">
                        <span className={`text-[15px] font-bold ${tempSelection === c.id ? 'text-[#ee2229]' : 'text-[#191974]'}`}>
                          {c.name}
                        </span>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">{c.currency}</p>
                      </div>
                    </div>
                    {tempSelection === c.id && (
                      <div className="w-6 h-6 rounded-full bg-[#ee2229] flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="p-6 bg-gray-50/50 flex flex-col gap-3">
                <div className="flex items-center justify-between text-[13px] px-1">
                  <span className="text-gray-400 font-medium">Selected Currency:</span>
                  <span className="font-bold text-[#191974] bg-white px-2 py-0.5 rounded border border-gray-100 shadow-sm">
                    {countries.find(c => c.id === tempSelection)?.currency}
                  </span>
                </div>
                <button
                  onClick={handleApply}
                  className="w-full bg-[#191974] text-white py-4 rounded-xl font-bold hover:bg-[#ee2229] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  Apply Changes
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
