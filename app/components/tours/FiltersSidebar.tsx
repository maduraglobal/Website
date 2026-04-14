"use client";

import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, X, Check } from 'lucide-react';

export type TourFilters = {
  search: string;
  category: 'India' | 'World';
  priceRange: string[];
  countries: string[];
  duration: string[];
  specialty: string[];
  month: string;
};

interface FiltersSidebarProps {
  filters: TourFilters;
  onFilterChange: (filters: TourFilters) => void;
  availableCountries: { name: string; count: number }[];
}

export default function FiltersSidebar({ filters, onFilterChange, availableCountries }: FiltersSidebarProps) {
  const [isExpanded, setIsExpanded] = useState({
    price: true,
    countries: true,
  });

  const [countrySearch, setCountrySearch] = useState('');

  const toggleSection = (section: keyof typeof isExpanded) => {
    setIsExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateFilters = (updates: Partial<TourFilters>) => {
    onFilterChange({ ...filters, ...updates });
  };

  const handleArrayToggle = (category: 'priceRange' | 'countries', value: string) => {
    const current = filters[category];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    updateFilters({ [category]: updated });
  };

  const clearAll = () => {
    onFilterChange({
      search: '',
      category: 'World',
      priceRange: [],
      countries: [],
      duration: [],
      specialty: [],
      month: ''
    });
  };

  const filteredCountries = availableCountries.filter(c => 
    c.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const priceRanges = [
    { label: '₹ 49,000 - 1.5L', value: '49k-1.5l', min: 49000, max: 150000 },
    { label: '₹ 1.5L - 2.6L', value: '1.5l-2.6l', min: 150000, max: 260000 },
    { label: '₹ 2.6L - 3.7L', value: '2.6l-3.7l', min: 260000, max: 370000 },
    { label: '₹ 3.7L above', value: '3.7l-above', min: 370000, max: 1000000 },
  ];

  return (
    <div className="w-full space-y-4 font-inter text-[#1a1a1a]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-[15px] font-bold flex items-center gap-2">
          <span className="w-1 h-5 bg-[#ee2229] rounded-full"></span>
          Filter Your Tour
        </h3>
        <button
          onClick={clearAll}
          className="text-[12px] text-gray-500 hover:text-[#ee2229] underline underline-offset-2"
        >
          Reset
        </button>
      </div>

      {/* India / World Toggle */}
      <div className="flex gap-2 p-1 bg-gray-50 rounded-xl">
        <button
          onClick={() => updateFilters({ category: 'India' })}
          className={`flex-1 py-2.5 rounded-lg text-[13px] font-bold transition-all ${
            filters.category === 'India' 
            ? 'bg-white text-[#ee2229] shadow-sm' 
            : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          India
        </button>
        <button
          onClick={() => updateFilters({ category: 'World' })}
          className={`flex-1 py-2.5 rounded-lg text-[13px] font-bold transition-all ${
            filters.category === 'World' 
            ? 'bg-white text-[#ee2229] shadow-sm' 
            : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          World
        </button>
      </div>

      {/* Price Range */}
      <div className="border border-gray-100 rounded-2xl p-4 bg-white">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-[13px] font-bold mb-4"
        >
          Price Range
          {isExpanded.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isExpanded.price && (
          <div className="grid grid-cols-2 gap-2">
            {priceRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => handleArrayToggle('priceRange', range.value)}
                className={`py-2 px-3 text-[11px] font-medium border rounded-lg text-center transition-all ${
                  filters.priceRange.includes(range.value)
                  ? 'bg-[#ee2229]/5 border-[#ee2229] text-[#ee2229]'
                  : 'bg-white border-gray-100 text-gray-500 hover:border-gray-300'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Countries Section */}
      <div className="border border-gray-100 rounded-2xl p-4 bg-white">
        <button
          onClick={() => toggleSection('countries')}
          className="flex items-center justify-between w-full text-[13px] font-bold mb-4"
        >
          Countries
          {isExpanded.countries ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isExpanded.countries && (
          <div className="space-y-4">
            {/* Search within countries */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={countrySearch}
                onChange={(e) => setCountrySearch(e.target.value)}
                className="w-full pl-3 pr-10 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[12px] outline-none focus:border-[#ee2229] transition-all"
              />
              <Search className="absolute right-3 top-2.5 w-3.5 h-3.5 text-gray-400" />
            </div>

            {/* Countries List */}
            <div className="max-h-60 overflow-y-auto pr-2 space-y-2.5 scrollbar-thin scrollbar-thumb-gray-200">
              {filteredCountries.map((country) => (
                <label key={country.name} className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.countries.includes(country.name)}
                        onChange={() => handleArrayToggle('countries', country.name)}
                        className="peer w-4 h-4 appearance-none border border-gray-300 rounded checked:bg-gray-800 checked:border-gray-800 transition-all cursor-pointer"
                      />
                      <Check className="absolute w-3 h-3 text-white left-0.5 top-0.5 opacity-0 peer-checked:opacity-100 pointer-events-none stroke-[3]" />
                    </div>
                    <span className={`text-[12px] transition-colors ${
                      filters.countries.includes(country.name) ? 'font-bold text-gray-900' : 'text-gray-500 group-hover:text-gray-900'
                    }`}>
                      {country.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium">({country.count})</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
