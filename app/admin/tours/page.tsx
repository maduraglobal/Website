"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Map,
  Edit3,
  Globe,
  Loader2,
  Settings2
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import TourCard from '@/app/components/tours/TourCard';

export default function ToursManagement() {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const supabase = createClient();

  useEffect(() => {
    async function fetchTours() {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .order('id', { ascending: true });

      if (data) setTours(data);
      setLoading(false);
    }
    fetchTours();
  }, []);

  const filteredTours = tours.filter(tour =>
    tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (tour.slug && tour.slug.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <p className="text-[32px] font-bold text-[#191974] flex items-center gap-3">
            <Map className="w-8 h-8 text-[#ee2229]" />
            Tour Catalog
          </p>
          <p className="text-gray-500 font-medium">Live preview and management of your travel packages.</p>
        </div>

        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tours..."
            className="w-full bg-white border border-gray-100 pl-12 pr-4 py-4 rounded-2xl shadow-sm focus:outline-none focus:border-[#ee2229] transition-all text-[15px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="py-32 flex flex-col items-center justify-center gap-4 text-gray-400">
          <Loader2 className="w-10 h-10 animate-spin text-[#191974]" />
          <p className="font-bold tracking-[0.2em] text-[12px] uppercase">Refreshing Catalog...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTours.map((tour) => (
            <div key={tour.id} className="relative group">
              {/* Tour Card Preview */}
              <div className="pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
                <TourCard tour={tour} destinationSlug={tour.slug || ''} region="en-in" />
              </div>

              {/* Admin Overlay Actions */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px] opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-3 rounded-2xl z-30">
                <Link
                  href={`/admin/tours/${tour.id}/edit`}
                  className="w-[200px] bg-white text-[#191974] px-6 py-3.5 rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-[#ee2229] hover:text-white transition-all shadow-xl"
                >
                  <Settings2 className="w-4 h-4" />
                  Package Details
                </Link>
                <Link
                  href={`/admin/tours/${tour.id}/itinerary`}
                  className="w-[200px] bg-[#ee2229] text-white px-6 py-3.5 rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-white hover:text-[#191974] transition-all shadow-xl"
                >
                  <Edit3 className="w-4 h-4" />
                  Manage Itinerary
                </Link>
                <div className="flex gap-3 mt-2">
                  <Link 
                    href={`/en-in/tours/${tour.slug || tour.id}`}
                    target="_blank"
                    className="w-11 h-11 bg-white/10 hover:bg-white text-white hover:text-[#191974] rounded-xl flex items-center justify-center transition-all backdrop-blur-md border border-white/20"
                  >
                    <Globe className="w-5 h-5" />
                  </Link>
                </div>
              </div>


              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-40">
                <span className="bg-green-500 text-white text-[9px]  px-2 py-1 rounded shadow-lg uppercase tracking-widest">Active</span>
              </div>
            </div>
          ))}

          {/* Add New Tour Card Placeholder */}
          <Link
            href="/admin/tours/new"
            className="flex flex-col items-center justify-center gap-4 bg-gray-50 border-4 border-dashed border-gray-200 rounded-xl hover:bg-white hover:border-[#ee2229]/30 transition-all group min-h-[400px]"
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-red-50 transition-colors">
              <Edit3 className="w-8 h-8 text-gray-300 group-hover:text-[#ee2229]" />
            </div>
            <p className="text-gray-400 font-bold uppercase tracking-widest group-hover:text-[#191974]">Create New Tour</p>
          </Link>
        </div>
      )}
    </div>
  );
}
