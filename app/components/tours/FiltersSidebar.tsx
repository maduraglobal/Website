"use client";

import React, { useState } from 'react';
import { Search, ChevronDown, Calendar, SlidersHorizontal, MapPin, X } from 'lucide-react';

export type TourFilters = {
  search: string;
  duration: string[];
  specialty: string[];
  month: string;
};

interface FiltersSidebarProps {
  filters: TourFilters;
  onFilterChange: (filters: TourFilters) => void;
  availableSpecialties: string[];
}

export default function FiltersSidebar({ filters, onFilterChange, availableSpecialties }: FiltersSidebarProps) {
  const [isExpanded, setIsExpanded] = useState({
    duration: true,
    specialty: true
  });

  const toggleSection = (section: keyof typeof isExpanded) => {
    setIsExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateFilters = (updates: Partial<TourFilters>) => {
    onFilterChange({ ...filters, ...updates });
  };

  const handleCheckboxChange = (category: 'duration' | 'specialty', value: string) => {
    const current = filters[category];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    updateFilters({ [category]: updated });
  };

  const clearAll = () => {
    onFilterChange({
      search: '',
      duration: [],
      specialty: [],
      month: ''
    });
  };

  const activeCount = filters.duration.length + filters.specialty.length + (filters.search ? 1 : 0) + (filters.month ? 1 : 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <h3 className="text-[17px]  text-[#191974] flex items-center gap-2  tracking-tight ">
          <SlidersHorizontal className="w-4 h-4 text-[#ee2229]" /> Filters
          {activeCount > 0 && (
            <span className="bg-[#ee2229] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {activeCount}
            </span>
          )}
        </h3>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="text-[11px]  text-[#ee2229] uppercase tracking-widest hover:underline flex items-center gap-1"
          >
            Clear
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
          placeholder="Search destinations..."
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-[#191974]/20 focus:border-[#191974] transition-all placeholder:text-gray-300"
        />
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
        {filters.search && (
          <button
            onClick={() => updateFilters({ search: '' })}
            className="absolute right-3 top-3.5 text-gray-300 hover:text-gray-500"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Date Month Selector */}
        <div className="space-y-3">
          <label className="text-[12px]  text-[#191974] uppercase tracking-widest block opacity-40">Travel Month</label>
          <div className="relative">
            <select
              value={filters.month}
              onChange={(e) => updateFilters({ month: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[13px] text-[#191974] font-bold outline-none focus:border-[#191974] appearance-none cursor-pointer"
            >
              <option value="">Any Month</option>
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3.5 top-3.5 pointer-events-none" />
          </div>
        </div>

        {/* Duration */}
        <div className="border-t border-gray-100 pt-6">
          <button
            onClick={() => toggleSection('duration')}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="text-[12px]  text-[#191974] uppercase tracking-widest opacity-40">Duration</span>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isExpanded.duration ? 'rotate-180' : ''}`} />
          </button>

          {isExpanded.duration && (
            <div className="mt-4 flex flex-wrap gap-2">
              {['1-3 Days', '4-6 Days', '7-10 Days', '11+ Days'].map((duration) => (
                <button
                  key={duration}
                  onClick={() => handleCheckboxChange('duration', duration)}
                  className={`px-3 py-2 text-[11px]  border rounded-lg transition-all tracking-tighter ${filters.duration.includes(duration)
                      ? 'bg-[#191974] border-[#191974] text-white shadow-md'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-[#191974]'
                    }`}
                >
                  {duration}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Specialty */}
        <div className="border-t border-gray-100 pt-6">
          <button
            onClick={() => toggleSection('specialty')}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="text-[12px]  text-[#191974] uppercase tracking-widest opacity-40">Tour Type</span>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isExpanded.specialty ? 'rotate-180' : ''}`} />
          </button>

          {isExpanded.specialty && (
            <div className="mt-4 space-y-2.5">
              {availableSpecialties.map((specialty) => (
                <label key={specialty} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.specialty.includes(specialty)}
                      onChange={() => handleCheckboxChange('specialty', specialty)}
                      className="peer w-5 h-5 appearance-none border border-gray-300 rounded-lg checked:bg-[#ee2229] checked:border-[#ee2229] transition-all cursor-pointer"
                    />
                    <svg className="absolute w-3 h-3 text-white left-1 top-1 opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 10" fill="none">
                      <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className={`text-[13px] font-bold transition-colors ${filters.specialty.includes(specialty) ? 'text-[#191974]' : 'text-gray-500 group-hover:text-[#191974]'
                    }`}>
                    {specialty}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
