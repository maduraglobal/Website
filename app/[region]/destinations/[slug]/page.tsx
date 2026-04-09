"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatRegionalPrice } from '../../../../config/country';

// Full typings for our mock Destination Detail
type TourShort = {
  id: string;
  slug: string;
  title: string;
  duration: string;
  baseInrPrice: number;
  tags: string[];
  imgColor: string;
};

type DestinationDetail = {
  id: string;
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  relatedTours: TourShort[];
};

export default function DestinationPage() {
  const params = useParams();
  const router = useRouter();
  const region = (params?.region as string) || 'in';
  const slug = params?.slug as string;

  const [destination, setDestination] = useState<DestinationDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // SKELETON MOCK API FETCH
  useEffect(() => {
    const fetchDestination = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 600));

        // Mock Destination Data
        const titleFormatted = slug ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Europe';

        const mockResponse: DestinationDetail = {
          id: `dest_${slug}`,
          slug: slug,
          title: titleFormatted,
          description: `Experience the magic of ${titleFormatted}. From breathtaking landscapes to rich cultural heritage, exploring ${titleFormatted} offers an unforgettable experience for every traveler.`,
          heroImage: "from-[#191974] to-[#00a1e5]",
          relatedTours: [
            {
              id: "tour_01",
              slug: "swiss-paris-austria-germany",
              title: "Swiss Paris Austria & Germany",
              duration: "14 Days | 13 Nights",
              baseInrPrice: 245000,
              tags: ["Best Seller"],
              imgColor: "from-[#191974] to-[#01529b]"
            },
            {
              id: "tour_02",
              slug: "european-highlights",
              title: "Highlights of Europe",
              duration: "10 Days | 9 Nights",
              baseInrPrice: 195000,
              tags: ["Trending"],
              imgColor: "from-[#ee2229] to-[#d11920]"
            }
          ]
        };

        setDestination(mockResponse);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchDestination();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-100 border-t-[#ee2229] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!destination) {
    return <div className="p-20 text-center text-[14px]">Destination not found.</div>;
  }

  return (
    <div className="bg-white min-h-screen text-[14px]">
      {/* DESTINATION HERO */}
      <section className={`relative w-full h-[45vh] min-h-[350px] flex items-center justify-center bg-linear-to-tr ${destination.heroImage} overflow-hidden`}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
          <h1 className="text-[32px] md:text-[48px]  mb-4 leading-tight drop-shadow-md">
            {destination.title} Visa Online for Indians
          </h1>
          <p className="text-[18px] md:text-[22px]  drop-shadow-lg opacity-90 max-w-2xl mx-auto leading-tight">
            {destination.description}
          </p>
        </div>
      </section>

      {/* RELATED TOURS */}
      <section className="py-12 max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-[28px] md:text-[32px]  text-[#191974] mb-2 tracking-tight">Popular {destination.title} Packages</h2>
          <p className="text-[16px] md:text-[20px] text-gray-400  max-w-2xl mx-auto leading-tight">Explore our most sought-after itineraries.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {destination.relatedTours.map((tour) => (
            <div key={tour.id} className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all">
              <Link href={`/${region}/tours/${tour.slug}`} className="absolute inset-0 z-20"></Link>
              <div className={`h-64 w-full relative overflow-hidden flex items-center justify-center bg-linear-to-tr ${tour.imgColor}`}>
                <div className="absolute top-5 left-5 bg-[#ee2229] text-white px-3 py-1 rounded-sm text-[11px]  tracking-widest  shadow-xl z-20">
                  {tour.tags[0]}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <span className="text-[12px]  text-[#ee2229] mb-4  tracking-widest flex items-center ">
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {tour.duration}
                </span>

                <h3 className="text-[20px] font-bold text-[#191974] mb-8 leading-snug group-hover:text-[#ee2229] transition-colors">
                  {tour.title}
                </h3>

                <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold  tracking-widest mb-1">Total Price</span>
                    <span className=" text-[24px] text-[#191974] tracking-tighter">
                      {formatRegionalPrice(tour.baseInrPrice, region)}
                    </span>
                  </div>
                  <div className="bg-[#ee2229] text-white p-3.5 rounded-full hover:bg-[#191974] transition-all shadow-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Section (Mock) */}
      <section className="bg-gray-50 py-24 border-t border-gray-100 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h3 className="text-[26px]  text-[#191974] mb-6  tracking-wider">Why Choose This Destination?</h3>
          <p className="text-[14px] text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Booking a trip to {destination.title} with our specialized platform ensures a hassle-free and fully immersive experience. We partner with local experts to provide hidden gems alongside popular attractions.
          </p>
        </div>
      </section>
    </div>
  );
}
