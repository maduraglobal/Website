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
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
];

interface PhonePrefixSelectorProps {
  selectedCode: string;
  onSelect: (code: string, flag: string) => void;
  className?: string;
  variant?: 'outline' | 'minimal' | 'sidebar';
}

export default function PhonePrefixSelector({ 
  selectedCode, 
  onSelect, 
  className = "",
  variant = 'outline'
}: PhonePrefixSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCountry = countries.find(c => c.code === selectedCode) || countries[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const baseStyles = "flex items-center gap-2 px-3 transition-all cursor-pointer select-none";
  const variantStyles = {
    outline: "bg-gray-50 border-r border-gray-100 hover:bg-gray-100",
    minimal: "bg-white border-2 border-gray-100 rounded-2xl hover:border-gray-200",
    sidebar: "bg-gray-50/50 border-r border-gray-100 hover:bg-white"
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
        <div className="absolute top-full left-0 mt-2 w-[220px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)] rounded-2xl border border-gray-100 z-[100] py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="px-4 py-2 border-b border-gray-50">
            <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Select Country</p>
          </div>
          <div className="max-h-[280px] overflow-y-auto custom-scrollbar">
            {countries.map((c) => (
              <div 
                key={c.code}
                onClick={() => {
                  onSelect(c.code, c.flag);
                  setIsOpen(false);
                }}
                className={`px-5 py-3 hover:bg-gray-50 flex items-center justify-between cursor-pointer transition-colors ${selectedCode === c.code ? 'bg-blue-50/50' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{c.flag}</span>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#191974]">{c.name}</span>
                    <span className="text-[12px] text-gray-400">{c.code}</span>
                  </div>
                </div>
                {selectedCode === c.code && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ee2229]" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
