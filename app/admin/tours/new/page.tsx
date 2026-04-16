import React from 'react';
import { createClient } from '@/utils/supabase/server';
import TourForm from '@/app/components/admin/TourForm';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default async function NewTourPage() {
  const supabase = await createClient();

  // Fetch data for dropdowns
  const { data: destinations } = await supabase.from('destinations').select('*').order('name');
  const { data: categories } = await supabase.from('tour_categories').select('*').order('name');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/tours" 
          className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#ee2229] hover:border-[#ee2229] transition-all shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-[32px] font-bold text-[#191974] tracking-tight">Create New Tour Package</h1>
          <p className="text-gray-500 font-medium italic">Design a high-conversion travel experience for your global customers.</p>
        </div>
      </div>

      <TourForm 
        destinations={destinations || []} 
        categories={categories || []} 
      />
    </div>
  );
}
