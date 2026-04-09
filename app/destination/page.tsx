import React from 'react';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function AllDestinationsPage() {
  const supabase = await createClient();

  // Fetch all destinations
  const { data: destinationsData } = await supabase
    .from('destinations')
    .select('*')
    .order('name', { ascending: true });

  // Use mock data if database is empty or not fully configured
  const destinations = destinationsData && destinationsData.length > 0
    ? destinationsData
    : [
      { id: '1', name: 'Delhi', slug: 'delhi', image_url: 'https://images.unsplash.com/photo-1587474260580-5a3d0d80c356?auto=format&fit=crop&q=80&w=800' },
      { id: '2', name: 'Kerala', slug: 'kerala', image_url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800' },
      { id: '3', name: 'Goa', slug: 'goa', image_url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800' },
      { id: '4', name: 'Himachal', slug: 'himachal', image_url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800' },
      { id: '5', name: 'Rajasthan', slug: 'rajasthan', image_url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=800' },
      { id: '6', name: 'Kashmir', slug: 'kashmir', image_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800' }
    ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-[#171717] ">


      {/* Header */}
      <div className="bg-[#191974] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,100 L100,0 Z" fill="white" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-[65px]  mb-4 text-white  tracking-tight ">
            Explore All Destinations
          </h1>
          <p className="text-[#e2e2e2] text-lg max-w-2xl mx-auto">
            Find your next perfect getaway. Browse by region, state, or city and uncover the incredible premium tour packages waiting for you.
          </p>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {destinations.map((dest: { id: string; slug: string; image_url: string; name: string }) => (
            <Link key={dest.id} href={`/destination/${dest.slug}`} className="group relative block overflow-hidden rounded-2xl aspect-4/3 shadow-md hover:shadow-xl transition-all duration-300">
              <img
                src={dest.image_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800'}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl  text-white font-poppins mb-1">{dest.name}</h3>
                <span className="text-sm font-bold text-[#ee2229] bg-white/10 backdrop-blur-md px-3 py-1 rounded-full  tracking-wider inline-block opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  View Packages &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>


    </div>
  );
}
