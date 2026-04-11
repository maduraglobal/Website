"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatRegionalPrice } from '@/config/country';
import FallbackImage from '../FallbackImage';

interface VisaCardProps {
  dest: {
    name: string;
    slug: string;
    image: string;
    flag: string;
    type?: string;
    valid?: string;
    price?: string | number;
  };
  region: string;
  index: number;
}

/**
 * Optimized Visa Card UI (Compact Version)
 * Reduces bulky height while maintaining premium information density.
 */
const VisaCard: React.FC<VisaCardProps> = ({ dest, region, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="h-full"
    >
      <Link
        href={`/${region}/visa/${dest.slug}`}
        className="group relative rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 cursor-pointer block h-[380px] bg-white"
      >
        {/* Optimized Image Container (Aspect Ratio ~4:5 focused) */}
        <div className="absolute inset-x-0 top-0 h-[220px] overflow-hidden">
          <FallbackImage
            src={dest.image}
            fallbackSrc="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800"
            alt={dest.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Subtle Dynamic Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
          
          {/* Smaller Visa Type Badge */}
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[8px] font-bold tracking-[0.15em] px-2.5 py-1 rounded-full uppercase">
              {dest.type || 'E-VISA'}
            </div>
          </div>
        </div>

        {/* Flag Icon - Reduced Size and Tighter Position */}
        <div className="absolute top-[195px] left-1/2 -translate-x-1/2 z-20">
          <div className="w-12 h-12 rounded-full overflow-hidden border-[3px] border-white shadow-xl bg-white p-0.5">
            <FallbackImage
              src={`https://flagcdn.com/w160/${dest.flag}.png`}
              fallbackSrc="https://flagcdn.com/w160/un.png"
              alt={dest.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Compact Content Area */}
        <div className="absolute inset-x-0 bottom-0 p-4 pt-8 flex flex-col items-center text-center bg-white h-[160px]">
          <h3 className="text-[18px] font-bold tracking-tight text-[#191974] mb-4 group-hover:text-[#ee2229] transition-colors line-clamp-1">
            {dest.name}
          </h3>

          <div className="w-full grid grid-cols-2 gap-2 border-t border-gray-50 pt-3 mb-4">
            <div>
              <p className="text-[8px] tracking-widest text-gray-400 uppercase font-bold mb-0.5">Validity</p>
              <p className="text-[12px] font-bold text-[#191974] uppercase">{dest.valid || '30 DAYS'}</p>
            </div>
            <div className="border-l border-gray-100">
              <p className="text-[8px] tracking-widest text-gray-400 uppercase font-bold mb-0.5">Starts From</p>
              <p className="text-[12px] font-bold text-[#ee2229]">
                {dest.price ? formatRegionalPrice(dest.price, region) : 'On Req.'}
              </p>
            </div>
          </div>

          <div className="w-full bg-[#191974] group-hover:bg-[#ee2229] text-white py-2.5 rounded-lg text-center text-[10px] font-bold tracking-[0.15em] transition-all shadow-md active:scale-95 uppercase">
            Get Started
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default VisaCard;
