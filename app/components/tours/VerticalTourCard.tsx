"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Utensils, Camera, Bus, Plane, Bed, Wallet } from 'lucide-react';
import { formatRegionalPrice } from '../../../config/country';
import FallbackImage from '@/app/components/FallbackImage';

import { createClient } from '@/utils/supabase/client';
import { Pencil } from 'lucide-react';

interface VerticalTourCardProps {
  tour: any;
  region: string;
}

const ADMIN_EMAIL = 'admin@maduratravel.com';

export default function VerticalTourCard({ tour, region }: VerticalTourCardProps) {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const supabase = createClient();

  React.useEffect(() => {
    async function checkAdmin() {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAdmin(session?.user?.email === ADMIN_EMAIL);
    }
    checkAdmin();
  }, [supabase]);

  const price = tour.base_price_inr || tour.price || 345000;
  const emi = Math.round(price / 27); // Example EMI calculation if not provided
  const duration = tour.duration || "12N/13D";
  const initials = tour.initials || "GZ";
  const slug = tour.slug || tour.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100"
    >

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <FallbackImage
          src={tour.image_url || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800'}
          fallbackSrc="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800"
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Top Left Initials Badge */}
        <div className="absolute top-3 left-3 w-8 h-8 bg-[#ee2229] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
          <span className="text-white text-[10px] font-bold">{initials}</span>
        </div>

        {/* Bottom Left Duration Badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md shadow-sm">
          <span className="text-[11px] font-bold text-gray-800">{duration}</span>
        </div>

        {/* Bottom Right Map Button */}
        <button className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white px-3 py-1 rounded-md flex items-center gap-1 transition-colors">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium">Map</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[11px] text-gray-400 font-medium mb-1">Explorer</p>
        <h3 className="text-[16px] font-bold text-gray-900 leading-tight mb-3 line-clamp-2 h-10">
          {tour.title}
        </h3>

        <div className="flex items-center justify-between mb-4">
          <p className="text-[12px] text-gray-500">{tour.dates_count || 1} Dates</p>
          <button className="text-[12px] text-gray-500 hover:text-[#ee2229] font-medium">Highlights</button>
        </div>

        <div className="mb-6">
          <p className="text-[12px] font-semibold text-gray-400 mb-3">Tour Includes</p>
          <div className="flex items-center gap-4">
            <Bed className="w-4 h-4 text-[#ee2229]" />
            <Utensils className="w-4 h-4 text-[#ee2229]" />
            <Camera className="w-4 h-4 text-[#ee2229]" />
            <Bus className="w-4 h-4 text-[#ee2229]" />
            <Plane className="w-4 h-4 text-[#ee2229]" />
          </div>
        </div>

        {/* Pricing Area */}
        <div className="mt-auto pt-4 border-t border-gray-100 bg-gray-50/30 -mx-5 px-5 py-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] text-gray-500 mb-0.5">All inclusive price starts</p>
              <p className="text-[22px] font-bold text-gray-900 leading-none">
                {formatRegionalPrice(price, region)}<span className="text-[14px] align-top">*</span>
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-[#191974] mb-0.5">
                <Wallet className="w-3.5 h-3.5" />
                <p className="text-[14px] ">EMI from</p>
              </div>
              <p className="text-[14px] text-[#191974] font-bold leading-none">
                {formatRegionalPrice(emi, region)}/month
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Link
            href={`/${region}/tours/${slug}`}
            className="flex items-center justify-center border border-[#ee2229] text-[#ee2229] hover:bg-red-50 py-2.5 rounded-md text-[13px] font-bold transition-all"
          >
            View Tour
          </Link>
          <button
            className="flex items-center justify-center bg-[#ee2229] text-white hover:bg-[#d91d24] py-2.5 rounded-md text-[13px] font-bold transition-all shadow-sm"
          >
            Book Online
          </button>
        </div>

        {/* Admin Edit Option */}
        {isAdmin && (
          <div className="mt-3 pt-3 border-t border-dashed border-gray-200">
             <Link 
               href={`/admin/tours`}
               className="w-full flex items-center justify-center gap-2 py-2 bg-gray-900 text-white rounded-md text-[12px] font-bold hover:bg-black transition-all"
             >
               <Pencil className="w-3.5 h-3.5" />
               Edit as Admin
             </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}
