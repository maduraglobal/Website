"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import { formatRegionalPrice } from '@/config/country';
import FiltersSidebar, { TourFilters } from '@/app/components/tours/FiltersSidebar';
import FallbackImage from '@/app/components/FallbackImage';

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
}

export default function ToursListingContent({ initialTours, region }: ToursListingContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<TourFilters>({
    search: searchParams.get('search') || '',
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
        month: urlMonth
      }));
    }
  }, [searchParams]);

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
      // 1. Search Filter
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesTitle = tour.title.toLowerCase().includes(query);
        const matchesTags = tour.tags?.some(tag => tag.toLowerCase().includes(query));
        if (!matchesTitle && !matchesTags) return false;
      }

      // 2. Duration Filter
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

      // 3. Specialty (Tags) Filter - Match any selected
      if (filters.specialty.length > 0) {
        const matchesSpecialty = filters.specialty.some(s => tour.tags?.includes(s));
        if (!matchesSpecialty) return false;
      }

      // 4. Month Filter (Mock logic - in real app, tours would have specific departure dates)
      // Since our tours don't have month data yet, we'll allow all if month is selected
      // but in a real scenario we'd check tour.departure_dates

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
          availableSpecialties={availableSpecialties}
        />
      </aside>

      {/* Main Content Area */}
      <div className="w-full md:w-3/4 flex flex-col">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-[20px]  text-[#191974] tracking-tight ">
              {filteredTours.length} {filteredTours.length === 1 ? 'Package' : 'Packages'} Found
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredTours.map((tour) => (
              <div key={tour.id} className="bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-sm flex flex-col group transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1">
                <Link href={`/${region}/tours/${tour.slug}`} className="relative h-56 overflow-hidden block">
                  <FallbackImage
                    src={tour.images[0]}
                    fallbackSrc="/images/img-8.jpg"
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-md text-[#191974] text-[10px]  px-3 py-1.5 rounded-full shadow-sm uppercase tracking-widest border border-white/20">
                      {tour.duration}
                    </span>
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {(tour.tags || ['Premium']).slice(0, 2).map(tag => (
                      <span key={tag} className="text-[9px]  text-[#ee2229] uppercase tracking-[0.15em] bg-red-50 px-2 py-0.5 rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link href={`/${region}/tours/${tour.slug}`}>
                    <h3 className="text-[16px]  text-[#191974] mb-4 leading-tight line-clamp-2 h-[40px] hover:text-[#ee2229] transition-colors ">
                      {tour.title}
                    </h3>
                  </Link>

                  <div className="mt-auto pt-4 border-t border-gray-50">
                    <div className="flex items-end justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-gray-400  uppercase tracking-widest mb-1">Starting from</span>
                        <span className="text-[20px]  text-[#191974] tracking-tighter leading-none">
                          {formatRegionalPrice(tour.price, region)}
                        </span>
                      </div>
                      <Link
                        href={`/${region}/tours/${tour.slug}`}
                        className="bg-[#191974] hover:bg-[#ee2229] text-white px-5 py-2.5 rounded-xl text-[11px]  uppercase tracking-widest transition-all shadow-lg shadow-blue-900/10 active:scale-95"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
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
              onClick={() => setFilters({ search: '', duration: [], specialty: [], month: '' })}
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
