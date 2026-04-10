"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import { createClient } from '../../../../utils/supabase/client';
import DestinationHeader from '@/app/components/tours/DestinationHeader';
import TourCard from '@/app/components/tours/TourCard';

interface Tour {
  id: string;
  title: string;
  slug: string;
  price?: number;
  duration_days?: number;
  cities_count?: number;
  image_url: string;
  tags?: string[];
  highlights?: string[];
}

export default function DestinationToursPage() {
  const params = useParams();
  const region = (params?.region as string) || 'en-in';
  const slug = (params?.slug as string) || '';
  
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [destinationName, setDestinationName] = useState('');
  const [sortBy, setSortBy] = useState('Recommended');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All Tours']);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);

  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      setLoading(true);
      
      try {
        // Try fetching destination
        const { data: destination, error: destError } = await supabase
          .from('destinations')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (destError) {
          console.error('Error fetching destination:', destError);
        }

        const name = destination?.name || slug.split(':')[0].replace(/-/g, ' ');
        setDestinationName(name);

        // Try fetching tours for this destination
        let fetchedTours: Tour[] = [];
        if (destination) {
          const { data, error: toursError } = await supabase
            .from('tours')
            .select('*')
            .eq('destination_id', destination.id);
          
          if (toursError) {
            console.error('Error fetching tours:', toursError);
          } else if (data) {
            fetchedTours = data;
          }
        }

        // Fallback mock tours if nothing in DB
        if (!fetchedTours || fetchedTours.length === 0) {
          const defaultImages = [
            'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1587474260580-5a3d0d80c356?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=800'
          ];

          fetchedTours = Array.from({ length: 6 }).map((_, i) => ({
            id: `mock-${i}`,
            title: `${name} Premium Experience ${i + 1}`,
            slug: `premium-experience-${i + 1}`,
            price: 35000 + (i * 5000),
            duration_days: 3 + (i * 2),
            cities_count: 2 + (i % 3),
            image_url: defaultImages[i % defaultImages.length],
            tags: i % 2 === 0 ? ["Family"] : i % 3 === 0 ? ["Premium"] : ["Adventure"],
            highlights: ['Premium Accommodation', 'Sightseeing Transfers', 'All Meals Included']
          }));
        }
        setTours(fetchedTours);
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug, supabase]);


  const toggleCategory = (cat: string) => {
    if (cat === 'All Tours') {
      setSelectedCategories(['All Tours']);
      return;
    }
    let newCats = selectedCategories.filter(c => c !== 'All Tours');
    if (newCats.includes(cat)) {
      newCats = newCats.filter(c => c !== cat);
      setSelectedCategories(newCats.length === 0 ? ['All Tours'] : newCats);
    } else {
      setSelectedCategories([...newCats, cat]);
    }
  };

  const toggleDuration = (dur: string) => {
    if (selectedDurations.includes(dur)) {
      setSelectedDurations(selectedDurations.filter(d => d !== dur));
    } else {
      setSelectedDurations([...selectedDurations, dur]);
    }
  };

  const filteredTours = useMemo(() => {
    let result = tours;

    // Filter by Category
    if (!selectedCategories.includes('All Tours')) {
      result = result.filter(t => t.tags?.some(tag => selectedCategories.includes(tag)));
    }

    // Filter by Duration
    if (selectedDurations.length > 0) {
      result = result.filter(t => {
        const d = t.duration_days || 0;
        if (selectedDurations.includes("1–3 Days") && d <= 3) return true;
        if (selectedDurations.includes("4–6 Days") && d >= 4 && d <= 6) return true;
        if (selectedDurations.includes("7–10 Days") && d >= 7 && d <= 10) return true;
        if (selectedDurations.includes("11+ Days") && d >= 11) return true;
        return false;
      });
    }

    // Sort
    if (sortBy === 'Price: Low to High') {
      result = [...result].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'Price: High to Low') {
      result = [...result].sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'Duration: Short to Long') {
      result = [...result].sort((a, b) => (a.duration_days || 0) - (b.duration_days || 0));
    }

    return result;
  }, [tours, selectedCategories, selectedDurations, sortBy]);

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-[#171717]">
      <DestinationHeader
        destinationName={destinationName}
        totalTours={filteredTours.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="text-[14px] text-gray-500 font-medium lowercase tracking-wide">
            <span>Home</span> / <span>Destinations</span> / <span className="text-[#191974] capitalize">{destinationName}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[14px] text-[#191974]">Sort By:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 text-[14px] rounded-lg p-2.5 font-bold text-[#191974] outline-none"
            >
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Duration: Short to Long</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-1/4 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <h3 className="text-[14px] font-bold text-[#191974] mb-5 tracking-widest uppercase">Filter Tours</h3>
              <div className="space-y-4">
                {["All Tours", "Family", "Honeymoon", "Adventure", "Premium"].map((label) => (
                  <label key={label} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedCategories.includes(label)} 
                      onChange={() => toggleCategory(label)}
                      className="w-4 h-4 rounded accent-[#191974]" 
                    />
                    <span className="text-[13px] text-gray-600 group-hover:text-[#191974] transition-colors">{label}</span>
                  </label>
                ))}
              </div>
              <hr className="my-5 border-gray-100" />
              <h3 className="text-[14px] font-bold text-[#191974] mb-4 tracking-widest uppercase">Duration</h3>
              <div className="space-y-3">
                {["1–3 Days", "4–6 Days", "7–10 Days", "11+ Days"].map((d) => (
                  <label key={d} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedDurations.includes(d)}
                      onChange={() => toggleDuration(d)}
                      className="w-4 h-4 rounded accent-[#191974]" 
                    />
                    <span className="text-[13px] text-gray-600 group-hover:text-[#191974] transition-colors">{d}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/4 flex flex-col space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 min-h-[60px]">
              <span className="text-[12px] text-[#191974] tracking-widest">Results: {filteredTours.length}</span>
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map(cat => cat !== 'All Tours' && (
                  <span key={cat} className="bg-[#191974] text-white px-3 py-1.5 rounded-lg text-xs flex items-center gap-2">
                    {cat} <button onClick={() => toggleCategory(cat)} className="ml-1 opacity-50 hover:opacity-100">×</button>
                  </span>
                ))}
                {selectedDurations.map(dur => (
                  <span key={dur} className="bg-[#ee2229] text-white px-3 py-1.5 rounded-lg text-xs flex items-center gap-2">
                    {dur} <button onClick={() => toggleDuration(dur)} className="ml-1 opacity-50 hover:opacity-100">×</button>
                  </span>
                ))}
              </div>
              {(selectedCategories.length > 1 || selectedDurations.length > 0) && (
                <button 
                  onClick={() => { setSelectedCategories(['All Tours']); setSelectedDurations([]); }}
                  className="text-[11px] text-[#ee2229] ml-auto hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="space-y-6">
              {loading ? (
                <div className="flex flex-col items-center py-20 gap-4">
                  <div className="w-10 h-10 border-4 border-[#191974]/20 border-t-[#191974] rounded-full animate-spin" />
                  <p className="text-gray-400">Finding tours for you...</p>
                </div>
              ) : filteredTours.length > 0 ? (
                filteredTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} destinationSlug={slug} region={region} />
                ))
              ) : (
                <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-gray-200">
                  <h3 className="text-xl font-bold text-[#191974] mb-2">No tours match your filter</h3>
                  <button 
                    onClick={() => { setSelectedCategories(['All Tours']); setSelectedDurations([]); }}
                    className="bg-[#191974] text-white px-8 py-3 rounded-xl font-bold mt-4"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

