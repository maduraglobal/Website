import React from 'react';
import { notFound } from 'next/navigation';
import { getToursFromDB, getDestinationBySlugFromDB } from '@/utils/crm-server';
import DestinationHeader from '@/app/components/tours/DestinationHeader';
import Link from 'next/link';
import ToursListingContent from '../../tours/components/ToursListingContent';

interface Props {
  params: Promise<{ region: string; slug: string }>;
}

/**
 * Destination SEO Page (4.3)
 * Fetches data exclusively from the CRM and renders associated tours.
 */
export default async function DestinationToursPage({ params }: Props) {
  const { region, slug } = await params;
  
  // 1. Fetch Destination Info from CRM
  const destination = await getDestinationBySlugFromDB(slug);
  
  if (!destination) {
    return notFound();
  }

  // 2. Fetch Tours for this Destination (Relationship logic 4.3)
  const tours = await getToursFromDB({ destination: slug });

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-[#171717]">
      <DestinationHeader
        destinationName={destination.name}
        totalTours={tours.length}
      />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="text-[12px] text-gray-400 font-medium tracking-tight">
            <Link href={`/${region}`} className="hover:text-[#ee2229]">Home</Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="opacity-50">Destinations</span>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-[#191974]">{destination.name}</span>
          </div>
        </div>

        <ToursListingContent 
          initialTours={tours} 
          region={region} 
          layout="list"
          defaultDestination={destination.name}
          title={`${tours.length} Tours Available in ${destination.name}`}
        />
      </div>

      {/* SEO Section (4.3) */}
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-[26px] font-bold text-[#191974] mb-6">Explore {destination.name} with Madura Travel</h3>
          <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Our curated {destination.name} packages are designed to provide an immersive experience. 
            From luxury stays to local cultural insights, we ensure every aspect of your journey 
            satisfies the highest standards of premium travel.
          </p>
        </div>
      </section>
    </div>
  );
}
