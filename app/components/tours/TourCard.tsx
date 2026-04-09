"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Star, Clock, CheckCircle2, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';
import { formatRegionalPrice } from '../../../config/country';

interface TourCardProps {
  tour: any;
  destinationSlug: string;
  region: string;
}

export default function TourCard({ tour, destinationSlug, region }: TourCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Target Image Area */}
      <div className="relative w-full md:w-[420px] h-[250px] md:h-auto overflow-hidden shrink-0">
        <motion.img
          initial={false}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6 }}
          src={tour.image_url || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800'}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {tags.slice(0, 2).map((tag: string, i: number) => (
            <span key={i} className={`text-xs font-bold px-3 py-1.5 rounded-md  tracking-wider shadow-sm ${i === 0 ? 'bg-[#ee2229] text-white' : 'bg-white text-[#191974]'}`}>
              {tag}
            </span>
          ))}
        </div>
        {/* Wishlist / Share */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-gray-500 hover:text-[#ee2229] hover:bg-white transition-all shadow-sm">
            <Heart className="w-4 h-4" />
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
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-[#191974] bg-[#191974]/5 px-2 py-0.5 rounded flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-current text-yellow-500" /> 4.8 (124 Reviews)
              </span>
              <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded">All Inclusive</span>
            </div>

            <h3 className="text-base md:text-[19px] font-black text-[#171717] font-inter leading-tight group-hover:text-[#191974] transition-colors">
              {tour.title}
            </h3>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-gray-600 font-arial">
              <span className="flex items-center gap-1.5 font-bold"><Clock className="w-4 h-4 text-gray-400" /> {tour.duration_days || 6} Days</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="flex items-center gap-1.5 font-bold"><MapPin className="w-4 h-4 text-gray-400" /> {tour.cities_count || 4} Cities</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="flex items-center gap-1.5 font-bold"><Calendar className="w-4 h-4 text-gray-400" /> Sep - Dec Dates</span>
            </div>

            <div className="pt-2">
              <p className="text-[14px] font-black text-[#191974] mb-2  tracking-tight">Tour Highlights:</p>
              <ul className="text-[14px] text-gray-600 space-y-1 font-arial">
                {(tour.highlights || ['Premium Accommodation', 'Sightseeing Transfers', 'All Meals Included']).slice(0, 3).map((hl: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="md:w-56 shrink-0 flex flex-col justify-end md:items-end border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
            <div className="text-left md:text-right w-full mb-4 md:mb-6">
              <p className="text-[10px] text-gray-400  font-black tracking-widest mb-1">Starting From</p>
              <div className="flex md:flex-col items-baseline md:items-end gap-2 md:gap-0">
                <span className="text-2xl font-black text-[#171717] font-inter">{formatPrice(price)}</span>
                <span className="text-[11px] text-gray-500 font-arial">per person on twin sharing</span>
              </div>
              <p className="text-[13px] font-black text-[#ee2229] mt-2 bg-red-50 inline-block px-2 py-0.5 rounded italic">EMI from {formatPrice(emi)}/mo</p>
            </div>

            <div className="space-y-2.5 w-full flex flex-col relative z-20 font-inter-tight">
              <Link
                href={`/${region}/tours/${tour.slug || tour.id}`}
                className="w-full block text-center bg-[#ee2229] hover:bg-[#d41c23] text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-red-500/20 transition-all text-[15px]  tracking-wider"
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
    </motion.div>
  );
}
