"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
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
    category: 'World',
    priceRange: [],
    countries: defaultDestination ? [defaultDestination] : (searchParams.get('search') ? [searchParams.get('search')!] : []),
    duration: [],
    specialty: [],
    month: searchParams.get('month') || ''
  });

  const [sortBy, setSortBy] = useState('popularity');

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
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-10 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-1/4 shrink-0">
        <FiltersSidebar
          filters={filters}
          onFilterChange={setFilters}
          availableCountries={availableCountries}
        />
      </aside>

      {/* Main Content Area */}
      <div className="w-full md:w-3/4 flex flex-col">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-[20px]  text-[#191974] tracking-tight ">
              {title || `${filteredTours.length} ${filteredTours.length === 1 ? 'Package' : 'Packages'} Found`}
            </h2>
            {filters.search && (
              <p className="text-[13px] text-gray-400 font-medium">Showing results for &quot;{filters.search}&quot;</p>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-[12px]  text-gray-300  tracking-widest whitespace-nowrap">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 sm:flex-none border border-gray-200 rounded-xl px-4 py-2.5 text-[13px]  text-[#191974] bg-white outline-none cursor-pointer hover:border-[#191974] transition-all shadow-sm"
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {filteredTours.length > 0 ? (
          <div className={layout === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
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
            <h3 className="text-[18px]  text-[#191974] mb-2 tracking-tight">No tours match your filters</h3>
            <p className="text-gray-400 text-[14px] mb-8 max-w-xs mx-auto">Try adjusting your selection or search criteria to find what you&apos;re looking for.</p>
            <button
              onClick={() => setFilters({ search: '', category: 'World', priceRange: [], countries: [], duration: [], specialty: [], month: '' })}
              className="bg-[#ee2229] hover:bg-[#191974] text-white px-8 py-3 rounded-full text-[12px]  uppercase tracking-widest transition-all shadow-xl shadow-red-500/20 active:scale-95 text-center"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
