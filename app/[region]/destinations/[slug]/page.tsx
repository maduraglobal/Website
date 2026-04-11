import React from 'react';
import { notFound } from 'next/navigation';
import { getToursFromDB, getDestinationBySlugFromDB } from '@/utils/crm-server';
import DestinationHeader from '@/app/components/tours/DestinationHeader';
import TourCard from '@/app/components/tours/TourCard';
import Link from 'next/link';

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="text-[14px] text-gray-500 font-medium lowercase tracking-wide">
            <Link href={`/${region}`} className="hover:text-[#ee2229]">Home</Link> / 
            <span className="mx-2">Destinations</span> / 
            <span className="text-[#191974] capitalize font-bold ml-2">{destination.name}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Tours Grid (Rendering Logic 4.2) */}
          <div className="w-full flex flex-col space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <span className="text-[12px] text-[#191974] font-bold tracking-widest uppercase">
                {tours.length} {tours.length === 1 ? 'Tour' : 'Tours'} available in {destination.name}
              </span>
            </div>

            <div className="space-y-6">
              {tours.length > 0 ? (
                tours.map((tour) => (
                  <TourCard 
                    key={tour.id} 
                    tour={tour} 
                    destinationSlug={slug} 
                    region={region} 
                  />
                ))
              ) : (
                <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-gray-200">
                  <h3 className="text-xl font-bold text-[#191974] mb-2">No active tours found for this destination</h3>
                  <Link 
                    href={`/${region}/tours`}
                    className="inline-block bg-[#191974] text-white px-8 py-3 rounded-xl font-bold mt-4"
                  >
                    Browse All Tours
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
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
