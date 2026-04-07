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
          description: `[#ee2229] the magic of ${titleFormatted}. From breathtaking landscapes to rich cultural heritage, exploring ${titleFormatted} offers an unforgettable experience for every traveler. Book your next adventure with our curated packages.`,
          heroImage: "from-[#191974] to-[#00a1e5]",
          relatedTours: [
            {
              id: "tour_01",
              slug: "swiss-paris-austria-germany",
              title: "Swiss Paris Austria & Germany",
              duration: "14 Days | 13 Nights",
              baseInrPrice: 245000,
              tags: ["Best Seller"],
              imgColor: "from-[#191974] to-[#00a1e5]"
            },
            {
              id: "tour_02",
              slug: "european-highlights",
              title: "Highlights of Europe",
              duration: "10 Days | 9 Nights",
              baseInrPrice: 195000,
              tags: ["Trending"],
              imgColor: "from-[#ee2229] to-[#f4a021]"
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
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#ee2229] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!destination) {
    return <div className="p-20 text-center">Destination not found.</div>;
  }

  return (
    <div className="bg-[var(--background)] min-h-screen">
      {/* DESTINATION HERO */}
      <section className={`relative w-full h-[50vh] min-h-[400px] flex items-center justify-center bg-gradient-to-tr ${destination.heroImage} overflow-hidden`}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
          <h1 className="text-[48px] md:text-[64px] font-bold font-inter mb-4 drop-shadow-lg">
            {destination.title}
          </h1>
          <p className="text-[16px] md:text-[20px] font-inter-tight font-medium drop-shadow-md opacity-90 max-w-2xl mx-auto leading-relaxed">
            {destination.description}
          </p>
        </div>
      </section>

      {/* RELATED TOURS */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[32px] font-bold font-inter text-[#171717] mb-3">Popular {destination.title} Tour Packages</h2>
          <p className="text-gray-500 font-inter-tight max-w-2xl mx-auto">Explore carefully curated itineraries designed for the ultimate {destination.title} experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destination.relatedTours.map((tour) => (
            <div key={tour.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all cursor-pointer transform hover:-translate-y-1">
              <div className={`h-56 w-full relative overflow-hidden flex items-center justify-center bg-gradient-to-tr ${tour.imgColor}`}>
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-md text-[11px] font-bold text-[#171717] tracking-wider uppercase shadow-sm">
                  {tour.tags[0]}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-[12px] font-bold text-[#ee2229] mb-3 uppercase tracking-wide flex items-center">
                  <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {tour.duration}
                </span>

                <h3 className="text-[20px] font-bold font-inter text-[#171717] mb-6 leading-snug group-hover:text-[#191974] transition-colors">
                  {tour.title}
                </h3>

                <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-end">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] text-gray-500 font-medium tracking-wide uppercase">All Inclusive</span>
                    <span className="font-bold text-[22px] text-[#191974]">
                      {formatRegionalPrice(tour.baseInrPrice, region)}
                    </span>
                  </div>
                  <button className="bg-[#191974] text-white p-3 rounded-full hover:bg-[#111155] transition-colors shadow-md">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </div>
              </div>
              <Link href={`/${region}/tours/${tour.slug}`} className="absolute inset-0 z-20"><span className="sr-only">View Details</span></Link>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Section (Mock) */}
      <section className="bg-gray-50 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-[20px] font-bold text-[#171717] mb-4">Why Book {destination.title} With Us?</h3>
          <p className="text-[14px] text-gray-600 font-inter-tight leading-loose">
            Booking a trip to {destination.title} with our specialized platform ensures a hassle-free and fully immersive experience. We partner with local experts to provide hidden gems alongside popular attractions. Our all-inclusive packages guarantee that everything from flights and visa to accommodation and sightseeing are taken care of. Enjoy your {destination.title} holiday with the peace of mind you deserve.
          </p>
        </div>
      </section>
    </div>
  );
}
