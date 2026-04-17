import React from 'react';
import { getToursFromDB } from '@/utils/crm-server';
import ToursListingContent from './components/ToursListingContent';

export default async function ToursListingPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  
  let tours: any[] = [];
  try {
    // Note: In real app, we might filter by country based on region
    const countryCode = region.split('-')[1]?.toUpperCase() || 'IN';
    tours = await getToursFromDB({ country: countryCode });
  } catch (error) {
    console.error('Error fetching tours from CRM:', error);
  }

  // Fallback to hardcoded mock data if empty
  if (!tours || tours.length === 0) {
    tours = [
      {
        id: 'feat-japan',
        title: 'Best Of Japan',
        slug: 'best-of-japan',
        duration: '7 Days | 6 Nights',
        price: 279000,
        images: ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200'],
        destination: region.toUpperCase(),
        tags: ["Featured", "Best Seller"],
      },
      {
        id: 'feat-europe',
        title: 'European Glories',
        slug: 'european-glories',
        duration: '12 Days | 11 Nights',
        price: 455000,
        images: ['https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=1200'],
        destination: region.toUpperCase(),
        tags: ["Featured", "Best Seller"],
      },
      {
        id: 'feat-dubai',
        title: 'Dubai Grandeur',
        slug: 'dubai-grandeur',
        duration: '6 Days | 5 Nights',
        price: 112000,
        images: ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200'],
        destination: region.toUpperCase(),
        tags: ["Featured", "Best Seller"],
      }
    ];
  }

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Impactful Header Section */}
      <div className="bg-[#191974] pt-12 md:pt-16 pb-12 md:pb-16 px-4 relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ee2229] animate-pulse" />
              <span className="text-white text-[10px]   tracking-widest ">Discover the World</span>
            </div>

            <h1 className="text-[40px] md:text-[64px]  text-white leading-[1.1] mb-6 tracking-tight">
              Curated <span className="text-[#ee2229]">Holiday</span> Packages
            </h1>
            <p className="text-[16px] md:text-[19px] text-white/70 max-w-2xl leading-relaxed">
              Handpicked destinations and expertly crafted itineraries for an unforgettable travel experience.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Listing and Filtering Content Area */}
      <ToursListingContent initialTours={tours} region={region} />
    </div>
  );
}
