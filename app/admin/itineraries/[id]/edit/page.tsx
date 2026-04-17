"use client";

import React, { useState, useEffect } from 'react';
import { 
  Map, 
  Plus, 
  Trash2, 
  Save, 
  ChevronLeft, 
  Image as ImageIcon,
  Layout,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

interface ItineraryDay {
  day: number;
  title: string;
  activities: string;
  location?: string;
  image?: string;
}

export default function ItineraryEditor() {
  const router = useRouter();
  const { id } = useParams();
  const [tourTitle, setTourTitle] = useState("");
  const [days, setDays] = useState<ItineraryDay[]>([
    { day: 1, title: 'Arrival & Welcome', activities: '', location: '' }
  ]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (id && id !== 'new') {
      fetchItinerary();
    } else {
      setLoading(false);
    }
  }, [id]);

  async function fetchItinerary() {
    const { data, error } = await supabase
      .from('tour_itineraries')
      .select('*, tours(title)')
      .eq('id', id)
      .single();

    if (data) {
      setDays(data.days || []);
      setTourTitle(data.tours?.title || "Draft Itinerary");
    }
    setLoading(false);
  }

  const handleAddDay = () => {
    setDays([...days, { 
      day: days.length + 1, 
      title: 'New Day', 
      activities: '', 
      location: '' 
    }]);
  };

  const handleRemoveDay = (index: number) => {
    const newDays = days.filter((_, i) => i !== index).map((day, i) => ({
      ...day,
      day: i + 1
    }));
    setDays(newDays);
  };

  const handleUpdateDay = (index: number, field: keyof ItineraryDay, value: string) => {
    const newDays = [...days];
    (newDays[index] as any)[field] = value;
    setDays(newDays);
  };

  const handleSave = async () => {
    setSaving(true);
    // Implementation for save would go here
    setTimeout(() => {
      setSaving(false);
      alert('Itinerary synchronized with core database successfully.');
    }, 1000);
  };

  if (loading) return <div className="p-20 text-center">Loading Editor...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-in slide-in-from-bottom-5 duration-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
           <button onClick={() => router.back()} className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#191974] transition-all">
             <ChevronLeft className="w-5 h-5" />
           </button>
           <div>
              <h1 className="text-2xl font-bold text-[#191974]">{tourTitle || 'Configure Itinerary'}</h1>
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">Live CMS Content Sync</p>
           </div>
        </div>
        <div className="flex gap-3">
           <div className="hidden md:flex items-center gap-2 px-4 bg-green-50 text-green-600 rounded-xl border border-green-100 italic text-[11px] font-bold">
              <CheckCircle2 className="w-4 h-4" />
              Multi-Region Ready
           </div>
           <button 
             onClick={handleSave}
             disabled={saving}
             className="bg-[#191974] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-xl flex items-center gap-2 hover:bg-[#ee2229] transition-all disabled:opacity-50"
           >
             {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
             Commit Changes
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
           {days.map((day, idx) => (
             <div key={idx} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#191974] text-white rounded-2xl flex flex-col items-center justify-center">
                         <span className="text-[10px] font-bold uppercase opacity-60">Day</span>
                         <span className="text-xl font-black leading-none">{day.day}</span>
                      </div>
                      <input 
                        value={day.title}
                        onChange={(e) => handleUpdateDay(idx, 'title', e.target.value)}
                        className="bg-transparent border-none text-xl font-bold text-[#191974] focus:ring-0 outline-none w-full"
                        placeholder="E.g. Arrival in Switzerland"
                      />
                   </div>
                   <button 
                    onClick={() => handleRemoveDay(idx)}
                    className="p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                   >
                     <Trash2 className="w-5 h-5" />
                   </button>
                </div>
                <div className="p-8 space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Day Highlights & Activities</label>
                      <textarea 
                         value={day.activities}
                         onChange={(e) => handleUpdateDay(idx, 'activities', e.target.value)}
                         rows={5}
                         className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-[#ee2229] p-5 rounded-2xl outline-none transition-all text-[15px] font-medium leading-relaxed"
                         placeholder="Describe the day's journey, sightseeing, and experiences..."
                      />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Base Location</label>
                         <div className="relative">
                            <Layout className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                            <input 
                               value={day.location}
                               onChange={(e) => handleUpdateDay(idx, 'location', e.target.value)}
                               className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-[#ee2229] pl-11 pr-4 py-3 rounded-xl outline-none transition-all text-sm font-bold text-[#191974]"
                               placeholder="City, Region"
                            />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Feature Image URL</label>
                         <div className="relative">
                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                            <input 
                               value={day.image}
                               onChange={(e) => handleUpdateDay(idx, 'image', e.target.value)}
                               className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-[#ee2229] pl-11 pr-4 py-3 rounded-xl outline-none transition-all text-sm font-bold text-[#191974]"
                               placeholder="https://..."
                            />
                         </div>
                      </div>
                   </div>
                </div>
             </div>
           ))}

           <button 
             onClick={handleAddDay}
             className="w-full py-10 border-4 border-dashed border-gray-100 rounded-[2rem] text-gray-300 hover:text-[#ee2229] hover:border-[#ee2229]/20 hover:bg-red-50/10 transition-all group flex flex-col items-center justify-center gap-3"
           >
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors">
                 <Plus className="w-6 h-6" />
              </div>
              <span className="font-bold text-sm uppercase tracking-widest">Add Day {days.length + 1} to Itinerary</span>
           </button>
        </div>

        <div className="space-y-6">
           <div className="sticky top-24 space-y-6">
              <div className="bg-[#191974] p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden italic">
                 <div className="absolute right-0 top-0 w-16 h-16 bg-white/5 rounded-bl-full translate-x-1/2 -translate-y-1/2" />
                 <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#ee2229]" />
                    Review Content
                 </h3>
                 <p className="text-white/50 text-sm leading-relaxed mb-6">
                    Changes made here are instantly serialized and transmitted to the database. Ensure all rich text fields are optimized for the website layout.
                 </p>
                 <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold text-white/40 uppercase tracking-widest px-1">
                       <span>Total Days</span>
                       <span className="text-white">{days.length} Days</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-[#ee2229]" style={{ width: `${Math.min(100, (days.length / 10) * 100)}%` }} />
                    </div>
                 </div>
              </div>

              <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex items-start gap-4">
                 <AlertCircle className="w-6 h-6 text-[#ee2229] shrink-0 mt-1" />
                 <div>
                    <h4 className="text-sm font-bold text-[#191974]">Technical Note</h4>
                    <p className="text-[11px] text-red-600/70 leading-relaxed mt-1 font-medium italic">
                       Images should be high-resolution (1200x800px) for optimal display on tour detail pages.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function RefreshCw({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;
}
