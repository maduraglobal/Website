"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import { formatRegionalPrice } from '@/config/country';
import FiltersSidebar, { TourFilters } from '@/app/components/tours/FiltersSidebar';
import FallbackImage from '@/app/components/FallbackImage';
import VerticalTourCard from '@/app/components/tours/VerticalTourCard';
import TourCard from '@/app/components/tours/TourCard';

interface Tour {
  id: string;
  title: string;
  slug: string;
  duration: string;
  images: string[];
  price: number;
  destination: string;
  itinerary_id: string;
  tags?: string[];
  rating?: number;
}

interface ToursListingContentProps {
  initialTours: Tour[];
  region: string;
  layout?: 'grid' | 'list';
  title?: string;
  defaultDestination?: string;
}

export default function ToursListingContent({ initialTours, region, layout = 'grid', title, defaultDestination }: ToursListingContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<TourFilters>({
    search: searchParams.get('search') || '',
    category: 'All',
    priceRange: [],
    countries: defaultDestination ? [defaultDestination] : (searchParams.get('search') ? [searchParams.get('search')!] : []),
    duration: [],
    specialty: [],
    month: searchParams.get('month') || ''
  });

  const [sortBy, setSortBy] = useState('popularity');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isFilterDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isFilterDrawerOpen]);

  // Sync with URL params if they change externally (e.g. back button)
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    const urlMonth = searchParams.get('month') || '';
    if (urlSearch !== filters.search || urlMonth !== filters.month) {
      setFilters(prev => ({
        ...prev,
        search: urlSearch,
        month: urlMonth,
        countries: urlSearch ? [urlSearch] : prev.countries
      }));
    }
  }, [searchParams]);

  const indianStates = [
    "Andaman", "Assam", "Arunachal Pradesh", "Gujarat", "Himachal Pradesh", "Karnataka", "Kashmir", "Kerala", "Maharashtra", "Madhya Pradesh", "Orissa", "Rajasthan", "Tamil Nadu", "Telangana", "Goa", "Sikkim", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const availableCountries = useMemo(() => {
    const counts: Record<string, number> = {};
    initialTours.forEach(tour => {
      const dest = tour.destination || 'Other';
      counts[dest] = (counts[dest] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  }, [initialTours]);

  // Extract unique specialties from all tours
  const availableSpecialties = useMemo(() => {
    const specialties = new Set<string>();
    initialTours.forEach(tour => {
      if (tour.tags) {
        tour.tags.forEach(tag => specialties.add(tag));
      }
    });
    // Add defaults if none found
    if (specialties.size === 0) {
      ['Premium', 'Family', 'Group Tour', 'Adventure', 'Honeymoon'].forEach(s => specialties.add(s));
    }
    return Array.from(specialties);
  }, [initialTours]);

  const parseDays = (duration: string) => {
    const match = duration.match(/(\d+)\s*Days/i);
    return match ? parseInt(match[1]) : 0;
  };

  const filteredTours = useMemo(() => {
    return initialTours.filter(tour => {
      // 1. Category Filter (India vs World)
      const isIndia = indianStates.some(state => tour.destination?.includes(state));
      if (filters.category === 'India' && !isIndia) return false;
      if (filters.category === 'World' && isIndia) return false;
      // 'All' shows everything

      // 2. Search Filter
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesTitle = tour.title.toLowerCase().includes(query);
        const matchesTags = tour.tags?.some(tag => tag.toLowerCase().includes(query));
        const matchesDest = tour.destination?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesTags && !matchesDest) return false;
      }

      // 3. Price Range Filter
      if (filters.priceRange.length > 0) {
        const matchesPrice = filters.priceRange.some(range => {
          const price = tour.price;
          if (range === '49k-1.5l') return price >= 49000 && price <= 150000;
          if (range === '1.5l-2.6l') return price > 150000 && price <= 260000;
          if (range === '2.6l-3.7l') return price > 260000 && price <= 370000;
          if (range === '3.7l-above') return price > 370000;
          return false;
        });
        if (!matchesPrice) return false;
      }

      // 4. Countries Filter
      if (filters.countries.length > 0) {
        if (!filters.countries.includes(tour.destination)) return false;
      }

      // 5. Duration Filter
      if (filters.duration.length > 0) {
        const days = parseDays(tour.duration);
        const matchesDuration = filters.duration.some(range => {
          if (range === '1-3 Days') return days >= 1 && days <= 3;
          if (range === '4-6 Days') return days >= 4 && days <= 6;
          if (range === '7-10 Days') return days >= 7 && days <= 10;
          if (range === '11+ Days') return days >= 11;
          return false;
        });
        if (!matchesDuration) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0; // default popularity
    });
  }, [initialTours, filters, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-10 relative">
      {/* Overlay */}
      {isFilterDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-[99] transition-opacity duration-300"
          onClick={() => setIsFilterDrawerOpen(false)}
        />
      )}

      {/* Filter Drawer */}
      <div 
        className={`fixed top-0 left-0 h-[100dvh] w-[85vw] max-w-[340px] bg-white z-[100] transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${
          isFilterDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 bg-white sticky top-0 shrink-0">
          <h2 className="text-[16px] font-bold text-[#191974] flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" /> Filters
          </h2>
          <button 
            onClick={() => setIsFilterDrawerOpen(false)}
            className="p-2 -mr-2 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50/50">
          <FiltersSidebar
            filters={filters}
            onFilterChange={setFilters}
            availableCountries={availableCountries}
          />
        </div>
        {/* Sticky bottom Apply button for mobile convenience */}
        <div className="p-4 border-t border-gray-100 bg-white sticky bottom-0 shrink-0">
          <button 
            onClick={() => setIsFilterDrawerOpen(false)}
            className="w-full bg-[#191974] text-white py-3 rounded-xl text-[13px] font-bold hover:bg-[#191974]/90 transition-colors shadow-lg shadow-[#191974]/20"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full">
        {/* Results Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div>
            <h2 className="text-[20px] text-[#191974] tracking-tight font-bold">
              {title || `${filteredTours.length} ${filteredTours.length === 1 ? 'Package' : 'Packages'} Found`}
            </h2>
            {filters.search && (
              <p className="text-[13px] text-gray-500 mt-1">Showing results for &quot;<span className="font-semibold text-[#191974]">{filters.search}</span>&quot;</p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-gray-200 rounded-xl px-5 py-2.5 text-[13px] font-semibold text-[#191974] bg-white outline-none cursor-pointer hover:border-[#191974] hover:bg-gray-50 transition-all shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filter Tours
            </button>
            <div className="w-[1px] h-8 bg-gray-200 hidden md:block"></div>
            <div className="flex-1 md:flex-none flex items-center gap-3">
              <span className="text-[12px] text-gray-400 font-medium tracking-wide whitespace-nowrap uppercase">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-[#191974] bg-white outline-none cursor-pointer hover:border-[#191974] transition-all shadow-sm focus:ring-2 focus:ring-[#191974]/10"
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filteredTours.length > 0 ? (
          <div className={layout === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
            : "flex flex-col space-y-6"
          }>
            {filteredTours.map((tour) => (
              layout === 'grid' ? (
                <VerticalTourCard key={tour.id} tour={tour} region={region} />
              ) : (
                <TourCard key={tour.id} tour={tour} region={region} destinationSlug={tour.destination} />
              )
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-24 text-center bg-gray-50 rounded-[32px] border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <SlidersHorizontal className="w-8 h-8 text-[#191974]/20" />
            </div>
            <h3 className="text-[18px] font-bold text-[#191974] mb-2 tracking-tight">No tours match your filters</h3>
            <p className="text-gray-500 text-[14px] mb-8 max-w-xs mx-auto">Try adjusting your selection or search criteria to find what you&apos;re looking for.</p>
            <button
              onClick={() => setFilters({ search: '', category: 'World', priceRange: [], countries: [], duration: [], specialty: [], month: '' })}
              className="bg-[#ee2229] hover:bg-[#191974] text-white px-8 py-3 rounded-full text-[12px] font-bold uppercase tracking-widest transition-all shadow-xl shadow-red-500/20 active:scale-95 text-center inline-block cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
