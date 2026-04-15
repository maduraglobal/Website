"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { formatRegionalPrice } from '../../../config/country';
import TourInclusions from './TourInclusions';
import FallbackImage from '../FallbackImage';
import {
  X,
  Pencil,
  Heart,
  Star,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import TourMap from './TourMap';
import { getItineraryByTourId } from '@/utils/crm';
import { createClient } from '@/utils/supabase/client';

interface TourCardProps {
  tour: any;
  destinationSlug: string;
  region: string;
}

export default function TourCard({ tour, destinationSlug, region }: TourCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isHighlightsOpen, setIsHighlightsOpen] = useState(false);
  const [itinerary, setItinerary] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const supabase = createClient();

  React.useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsWishlisted(list.includes(tour.id));
    } catch(e){}
  }, [tour.id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      let list = JSON.parse(localStorage.getItem('wishlist') || '[]');
      if (list.includes(tour.id)) {
        list = list.filter((id: string) => id !== tour.id);
        setIsWishlisted(false);
      } else {
        list.push(tour.id);
        setIsWishlisted(true);
      }
      localStorage.setItem('wishlist', JSON.stringify(list));
    } catch(err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    async function checkAdmin() {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAdmin(session?.user?.email === 'admin@maduratravel.com');
    }
    checkAdmin();
  }, [supabase]);

  React.useEffect(() => {
    if (isMapOpen && itinerary.length === 0) {
      async function loadItinerary() {
        const data = await getItineraryByTourId(tour.id);
        setItinerary(data);
      }
      loadItinerary();
    }
  }, [isMapOpen, tour.id, itinerary.length]);

  // Format price based on region using central configuration
  const formatPrice = (price: number) => {
    return formatRegionalPrice(price, region);
  };

  const price = tour.base_price_inr || tour.price || 45000;
  const emi = Math.round(price / 12);
  const tags = tour.tags || ["Family", "Best Seller"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 flex flex-col md:flex-row group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Target Image Area */}
      <div className="relative w-full md:w-[320px] h-[280px] md:h-auto overflow-hidden shrink-0">
        <FallbackImage
          src={tour.images?.[0] || tour.image_url}
          fallbackSrc="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800"
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {tags.slice(0, 2).map((tag: string, i: number) => (
            <span key={i} className={`text-xs font-bold px-3 py-1.5 rounded-md  tracking-wider border border-white/20 ${i === 0 ? 'bg-[#ee2229] text-white' : 'bg-white text-[#191974]'}`}>
              {tag}
            </span>
          ))}
        </div>
        {/* Wishlist / Share */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button 
            onClick={toggleWishlist}
            className={`w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center transition-all border border-gray-100 ${isWishlisted ? 'text-[#ee2229] bg-white' : 'text-gray-500 hover:text-[#ee2229] hover:bg-white'}`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Dates filling fast badge */}
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4">
          <p className="text-white text-xs font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ee2229] animate-pulse" /> 2 Seats Left for Next Batch
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 md:p-6 flex flex-col">
        <div className="flex flex-col md:flex-row justify-between gap-4 flex-1">
          {/* Main Info */}
          <div className="flex-1 space-y-3">
            <Link href={`/${region}/tours/${tour.slug || tour.id}`} className="block group/link">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-[#191974] bg-[#191974]/5 px-2 py-0.5 rounded flex items-center gap-1 w-fit">
                  <Star className="w-3.5 h-3.5 fill-current text-yellow-500" /> 4.8 (124 Reviews)
                </span>
                {/* <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded">All Inclusive</span> */}
              </div>

              <h3 className="text-[20px] font-bold text-[#ee2229] leading-tight group-hover/link:underline transition-all mt-2">
                {tour.title}
              </h3>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-gray-600 mt-2">
                <span className="flex items-center gap-1.5 font-bold"><Clock className="w-4 h-4 text-gray-400" /> {tour.duration_days || 6} Days</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="flex items-center gap-1.5 font-bold"><MapPin className="w-4 h-4 text-gray-400" /> {tour.cities_count || 4} Cities</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="flex items-center gap-1.5 font-bold"><Calendar className="w-4 h-4 text-gray-400" /> Sep - Dec Dates</span>
              </div>
            </Link>

            <div className="pt-4 flex flex-wrap items-center gap-6 border-t border-gray-50 mt-auto">
              <div className="flex flex-col items-center gap-1 group/item">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#191974] group-hover/item:bg-[#ee2229] group-hover/item:text-white transition-colors">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-gray-400">Duration</span>
              </div>
              <button
                onClick={() => setIsMapOpen(true)}
                className="flex flex-col items-center gap-1 group/item cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#191974] group-hover/item:bg-[#ee2229] group-hover/item:text-white transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-gray-400">Map View</span>
              </button>
              <button
                onClick={() => setIsHighlightsOpen(true)}
                className="flex flex-col items-center gap-1 group/item cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#191974] group-hover/item:bg-[#ee2229] group-hover/item:text-white transition-colors">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-gray-400">Highlights</span>
              </button>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="md:w-56 shrink-0 flex flex-col justify-end md:items-end border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
            <div className="text-left md:text-right w-full mb-4 md:mb-6">
              <p className="text-[10px] text-gray-400   tracking-widest mb-1">Starting From</p>
              <div className="flex md:flex-col items-baseline md:items-end gap-2 md:gap-0">
                <span className="text-2xl  text-[#171717] ">{formatPrice(price)}</span>
                <span className="text-[11px] text-gray-500 ">per person on twin sharing</span>
              </div>
              <p className="text-[13px]  text-[#ee2229] mt-2 bg-red-50 inline-block px-2 py-0.5 rounded italic">EMI from {formatPrice(emi)}/mo</p>
            </div>

            <div className="space-y-2.5 w-full flex flex-col relative z-20 ">
              <Link
                href={`/${region}/booking?tour=${tour.slug || tour.id}&price=${price || 0}&savings=0`}
                className="w-full block text-center bg-[#191974] hover:bg-[#ee2229] text-white font-bold py-3.5 px-4 rounded-xl border border-[#191974] transition-all text-[15px]  tracking-wider"
              >
                Book Now
              </Link>
              <div className="grid grid-cols-2 gap-2 w-full">
                <Link
                  href={`/${region}/tours/${tour.slug || tour.id}`}
                  className="w-full block text-center border-2 border-gray-100 hover:border-[#191974] hover:text-[#191974] text-gray-700 font-bold py-2.5 px-2 rounded-xl transition-all text-[12px] bg-white  tracking-tighter"
                >
                  View Details
                </Link>
                <Link
                  href={`/${region}/tours/${tour.slug || tour.id}?enquire=true`}
                  className="w-full block text-center border-2 border-gray-100 hover:border-[#191974] hover:text-[#191974] text-gray-700 font-bold py-2.5 px-2 rounded-xl transition-all text-[12px] bg-white  tracking-tighter"
                >
                  Enquire
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Modal */}
      {isMapOpen && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4 md:p-12 cursor-default">
          <div
            className="absolute inset-0 bg-[#0a0a1a]/95 backdrop-blur-xl cursor-pointer"
            onClick={() => setIsMapOpen(false)}
          />
          <div className="relative w-full max-w-6xl aspect-square md:aspect-21/9 bg-white rounded-[40px] overflow-hidden border border-gray-800 z-50">
            <button
              onClick={() => setIsMapOpen(false)}
              className="absolute top-6 right-6 z-50 w-12 h-12 bg-gray-900/10 hover:bg-gray-900/20 rounded-full flex items-center justify-center cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <TourMap
              tourTitle={tour.title}
              itinerary={itinerary}
              fullsize
              cities={tour.cities ? tour.cities.split('▶').map((c: string) => c.trim()) : []}
            />
          </div>
        </div>
      )}

      {/* Highlights Modal */}
      {isHighlightsOpen && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4 cursor-default">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            onClick={() => setIsHighlightsOpen(false)}
          />
          <div className="relative bg-white w-full max-w-md rounded-2xl p-6 border border-gray-100 z-50">
            <button
              onClick={() => setIsHighlightsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-[18px] font-bold text-[#191974] mb-4">Tour Highlights</h3>
            <ul className="space-y-3">
              {tour.tags && tour.tags.length > 0 ? tour.tags.map((tag: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-[14px] text-gray-700">
                  <span className="w-1.5 h-1.5 bg-[#ee2229] rounded-full mt-2 shrink-0"></span>
                  {tag}
                </li>
              )) : (
                <li className="flex items-start gap-2 text-[14px] text-gray-700">
                  <span className="w-1.5 h-1.5 bg-[#ee2229] rounded-full mt-2 shrink-0"></span>
                  Premium Accommodations, Professional Guide, Guided Sightseeing
                </li>
              )}
              <li className="flex items-start gap-2 text-[14px] text-gray-700">
                <span className="w-1.5 h-1.5 bg-[#ee2229] rounded-full mt-2 shrink-0"></span>
                {tour.cities_count || 4} Premium Cities Covered
              </li>
              <li className="flex items-start gap-2 text-[14px] text-gray-700">
                <span className="w-1.5 h-1.5 bg-[#ee2229] rounded-full mt-2 shrink-0"></span>
                All-Inclusive Daily Breakfast & Dinners
              </li>
            </ul>
          </div>
        </div>
      )}
    </motion.div>
  );
}
