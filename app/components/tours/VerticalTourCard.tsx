"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, Utensils, Camera, Bus, Plane, Bed, Wallet, X, Pencil, Heart } from 'lucide-react';
import { formatRegionalPrice } from '../../../config/country';
import FallbackImage from '@/app/components/FallbackImage';
import TourMap from '@/app/components/tours/TourMap';

import { createClient } from '@/utils/supabase/client';

interface VerticalTourCardProps {
  tour: any;
  region: string;
}

const ADMIN_EMAIL = 'admin@maduratravel.com';

export default function VerticalTourCard({ tour, region }: VerticalTourCardProps) {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isMapOpen, setIsMapOpen] = React.useState(false);
  const [isHighlightsOpen, setIsHighlightsOpen] = React.useState(false);
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const router = useRouter();
  const supabase = createClient();

  React.useEffect(() => {
    async function checkAdmin() {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAdmin(session?.user?.email === ADMIN_EMAIL);
    }
    checkAdmin();
  }, [supabase]);

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

  const price = tour.base_price_inr || tour.price || 345000;
  const emi = Math.round(price / 27); // Example EMI calculation if not provided
  const duration = tour.duration || "12N/13D";
  const slug = tour.slug || tour.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl overflow-hidden transition-all duration-300 flex flex-col h-full border border-gray-100"
    >

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <FallbackImage
          src={tour.image_url || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800'}
          fallbackSrc="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800"
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Top Left Initials Badge - REMOVED GZ */}

        {/* Wishlist Button */}
        <div className="absolute top-3 right-3 z-10">
          <button 
            onClick={toggleWishlist}
            className={`w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center transition-all border border-gray-100 ${isWishlisted ? 'text-[#ee2229] bg-white' : 'text-gray-500 hover:text-[#ee2229] hover:bg-white'}`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Left Duration Badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md border border-gray-100">
          <span className="text-[11px] font-bold text-gray-800">{duration}</span>
        </div>

        {/* Bottom Right Map Button */}
        <button
          onClick={(e) => { e.preventDefault(); setIsMapOpen(true); }}
          className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white px-3 py-1 rounded-md flex items-center gap-1 transition-colors z-10 cursor-pointer"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium">Map</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="px-4 py-3 flex flex-col flex-1">
        <p className="text-[11px] text-gray-400 font-medium mb-0.5">Explorer</p>
        <Link href={`/${region}/tours/${slug}`}>
          <h3 className="text-[16px] font-bold text-gray-900 leading-tight mb-1 line-clamp-2 h-10 hover:text-[#ee2229] transition-colors cursor-pointer">
            {tour.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between mb-2">
          <p className="text-[12px] text-gray-500">{tour.dates_count || 1} Dates</p>
          <button onClick={() => setIsHighlightsOpen(true)} className="text-[12px] text-gray-500 hover:text-[#ee2229] font-medium cursor-pointer">Highlights</button>
        </div>

        <div className="mb-3">
          <p className="text-[12px] font-semibold text-gray-400 mb-1">Tour Includes</p>
          <div className="flex items-center gap-4">
            <Bed className="w-4 h-4 text-[#191974]" />
            <Utensils className="w-4 h-4 text-[#191974]" />
            <Camera className="w-4 h-4 text-[#191974]" />
            <Bus className="w-4 h-4 text-[#191974]" />
            <Plane className="w-4 h-4 text-[#191974]" />
          </div>
        </div>

        {/* Pricing Area */}
        <div className="mt-auto pt-3 border-t border-gray-100 bg-gray-50/30 -mx-5 px-5 py-2">
          <div className="flex justify-between items-end">
            <div>
              {/* <p className="text-[10px] text-gray-500 mb-0.5">All inclusive price starts</p> */}
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
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Link
            href={`/${region}/tours/${slug}`}
            className="flex items-center justify-center border-2 border-[#191974] text-[#191974] hover:bg-[#191974] hover:text-white py-2.5 rounded-xl text-[12px] font-bold transition-all uppercase tracking-wider"
          >
            View Tour
          </Link>
          <button
            onClick={() => router.push(`/${region}/booking?tour=${tour.slug || tour.id}&price=${tour.price || 0}&savings=0`)}
            className="flex items-center justify-center bg-[#ee2229] border-2 border-[#ee2229] text-white hover:bg-transparent hover:text-[#ee2229] py-2.5 rounded-xl text-[12px] font-bold transition-all active:scale-95 uppercase tracking-wider"
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

      {/* Map Modal */}
      {isMapOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-12 cursor-default">
          <div
            className="absolute inset-0 bg-[#0a0a1a]/95 backdrop-blur-xl cursor-pointer"
            onClick={() => setIsMapOpen(false)}
          />
          <div className="relative w-full max-w-6xl aspect-square md:aspect-21/9 bg-white rounded-[40px] overflow-hidden shadow-2xl z-50">
            <button
              onClick={() => setIsMapOpen(false)}
              className="absolute top-6 right-6 z-50 w-12 h-12 bg-gray-900/10 hover:bg-gray-900/20 rounded-full flex items-center justify-center cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <TourMap
              tourTitle={tour.title}
              itinerary={tour.itinerary_data || []}
              fullsize
              cities={tour.cities ? tour.cities.split('▶').map((c: string) => c.trim()) : []}
            />
          </div>
        </div>
      )}

      {/* Highlights Modal */}
      {isHighlightsOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 cursor-default">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            onClick={() => setIsHighlightsOpen(false)}
          />
          <div className="relative bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl z-50">
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
              {tour.duration && (
                <li className="flex items-start gap-2 text-[14px] text-gray-700">
                  <span className="w-1.5 h-1.5 bg-[#ee2229] rounded-full mt-2 shrink-0"></span>
                  {tour.duration} of unforgettable experiences
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </motion.div>
  );
}
