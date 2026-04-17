"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface CountryInfo {
  code: string;
  flag: string;
  name: string;
}

const countries: CountryInfo[] = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+66", flag: "🇹🇭", name: "Thailand" },
  { code: "+62", flag: "🇮🇩", name: "Indonesia" },
  { code: "+84", flag: "🇻🇳", name: "Vietnam" },
  { code: "+960", flag: "🇲🇻", name: "Maldives" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+973", flag: "🇧🇭", name: "Bahrain" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+64", flag: "🇳🇿", name: "New Zealand" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "+41", flag: "🇨🇭", name: "Switzerland" },
  { code: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+82", flag: "🇰🇷", name: "South Korea" },
];

export const cleanPhoneInput = (val: string, code: string) => {
  let cleaned = val;
  if (cleaned.startsWith(code)) {
    cleaned = cleaned.slice(code.length);
  } else if (code.startsWith('+') && cleaned.startsWith(code.slice(1))) {
    cleaned = cleaned.slice(code.length - 1);
  }
  return cleaned.replace(/\D/g, '');
};

interface PhonePrefixSelectorProps {
  value: string;
  onChange: (code: string) => void;
  className?: string;
  variant?: 'outline' | 'minimal' | 'sidebar' | 'simple';
}

export default function PhonePrefixSelector({
  value,
  onChange,
  className = "",
  variant = 'outline'
}: PhonePrefixSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCountry = countries.find(c => c.code === value) || countries[0];

  const filteredCountries = countries.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.code.includes(searchQuery)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const baseStyles = "flex items-center gap-2 px-3 transition-all cursor-pointer select-none";
  const variantStyles = {
    outline: "bg-gray-50 border-r border-gray-100 hover:bg-gray-100",
    minimal: "bg-white border-2 border-gray-100 rounded-2xl hover:border-gray-200",
    sidebar: "bg-gray-50/50 border-r border-gray-100 hover:bg-white",
    simple: "bg-white border border-gray-200 rounded-xl hover:border-[#191974]"
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`${baseStyles} ${variantStyles[variant]} h-full`}
      >
        <span className="text-[18px]">{activeCountry.flag}</span>
        <span className="text-[14px] font-bold text-gray-500">{activeCountry.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[240px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)] rounded-2xl border border-gray-100 z-100 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="px-3 py-2">
            <input
              autoFocus
              type="text"
              placeholder="Search country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[12px] placeholder:text-gray-400 outline-none focus:border-[#191974] transition-all"
            />
          </div>
          <div className="px-4 py-1 border-b border-gray-50">
            <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Select Country</p>
          </div>
          <div className="max-h-[280px] overflow-y-auto custom-scrollbar">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => (
                <div
                  key={`${c.name}-${c.code}`}
                  onClick={() => {
                    onChange(c.code);
                    setIsOpen(false);
                    setSearchQuery("");
                  }}
                  className={`px-5 py-3 hover:bg-gray-50 flex items-center justify-between cursor-pointer transition-colors ${value === c.code ? 'bg-blue-50/50' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{c.flag}</span>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-[#191974]">{c.name}</span>
                      <span className="text-[12px] text-gray-400">{c.code}</span>
                    </div>
                  </div>
                  {value === c.code && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ee2229]" />
                  )}
                </div>
              ))
            ) : (
              <div className="px-5 py-8 text-center">
                <p className="text-[12px] text-gray-400">No country found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
