"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  X,
  Plus,
  Trash2,
  ChevronLeft,
  Camera,
  Globe,
  MapPin,
  Calendar,
  DollarSign,
  Loader2,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function EditTourPage() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Form State
  const [tourData, setTourData] = useState<any>({
    title: '',
    slug: '',
    image_url: '',
    gallery_images: [],
    starting_place: '',
    country: 'India',
    cities: '',
    min_age: 0,
    max_travelers: 20,
    rating: 4.8,
    days: 4,
    nights: 3,
    price: 538,
    currency: 'AUD',
    description: '',
    categories: ['Family', 'Group'],
    highlights: [],
    included: [],
    excluded: []
  });

  const [itinerary, setItinerary] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch Tour
      const { data: tour } = await supabase.from('tours').select('*').eq('id', id).single();
      if (tour) {
        setTourData({
          ...tour,
          gallery_images: tour.gallery_images || [],
          categories: tour.categories || ['Family', 'Group'],
          highlights: tour.highlights || [],
          included: tour.included || [],
          excluded: tour.excluded || []
        });
      }

      // Fetch Itinerary
      const { data: itin } = await supabase
        .from('itineraries')
        .select('*')
        .eq('tour_id', id)
        .order('day_number', { ascending: true });

      if (itin && itin.length > 0) {
        setItinerary(itin);
      } else {
        setItinerary([{ day_number: 1, title: '', description: '' }]);
      }
      setLoading(false);
    }
    fetchData();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus('idle');

    try {
      // 1. Sanitize Tour Data - only send fields likely to exist or handles them safely
      // We wrap it in a try-catch to log exactly what field might be failing
      const updatePayload = {
        title: tourData.title,
        slug: tourData.slug,
        image_url: tourData.image_url,
        price: tourData.price,
        description: tourData.description,
        updated_at: new Date().toISOString()
      };

      const { error: tourError } = await supabase
        .from('tours')
        .update(updatePayload)
        .eq('id', id);

      if (tourError) {
        console.error('Supabase Tour Update Error:', JSON.stringify(tourError, null, 2));
        throw tourError;
      }

      // 2. Update Itinerary via our specialized API
      const res = await fetch('/api/tours/update-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, days: itinerary })
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('API Itinerary Update Error:', errorText);
        throw new Error(`Failed to update itinerary: ${errorText}`);
      }

      setSaveStatus('success');
      setTimeout(() => {
        setSaveStatus('idle');
        router.push('/admin/tours');
      }, 2000);
    } catch (err: any) {
      // Log the full error object for debugging
      console.error('Full Save Error Object:', JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const addItineraryDay = () => {
    setItinerary([...itinerary, { day_number: itinerary.length + 1, title: '', description: '' }]);
  };

  const removeItem = (field: 'included' | 'excluded' | 'highlights', index: number) => {
    const newList = [...tourData[field]];
    newList.splice(index, 1);
    setTourData({ ...tourData, [field]: newList });
  };

  const addItem = (field: 'included' | 'excluded' | 'highlights', value: string) => {
    if (!value.trim()) return;
    setTourData({ ...tourData, [field]: [...tourData[field], value] });
  };

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-[#191974]" />
      <p className="text-gray-400 font-bold uppercase tracking-widest text-[12px]">Loading Editor...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-[24px] shadow-2xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="px-10 py-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-50">
        <h1 className="text-[24px] font-bold text-[#191974]">Edit Tour</h1>
        <button onClick={() => router.back()} className="text-gray-400 hover:text-red-500 transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-10 space-y-12">
        {/* Basic Information */}
        <section className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1.5">
              <label className="text-[14px] font-medium text-gray-500">Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={tourData.title}
                onChange={(e) => setTourData({ ...tourData, title: e.target.value })}
                className="w-full px-5 py-4 border border-gray-300 rounded-[20px] focus:border-[#191974] outline-none transition-all text-[16px]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[14px] font-medium text-gray-400">Slug (auto)</label>
              <input
                type="text"
                value={tourData.slug}
                readOnly
                className="w-full px-5 py-4 border border-gray-200 rounded-[20px] bg-gray-50/50 text-gray-400 outline-none text-[16px]"
              />
              <p className="text-[11px] text-[#191974]/40 font-medium px-2">URL: /tours/{tourData.slug}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1.5">
              <label className="text-[14px] font-medium text-gray-500">Main Image URL</label>
              <input
                type="text"
                value={tourData.image_url}
                onChange={(e) => setTourData({ ...tourData, image_url: e.target.value })}
                className="w-full px-5 py-4 border border-gray-300 rounded-[20px] focus:border-[#191974] outline-none transition-all text-[16px]"
              />
              <div className="mt-4 rounded-[20px] overflow-hidden border border-gray-200 aspect-video bg-gray-50 relative group">
                {tourData.image_url ? (
                  <img src={tourData.image_url} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                    <ImageIcon className="w-12 h-12 mb-2" />
                    <span className="text-[12px] font-bold uppercase tracking-widest">Image Preview</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[14px] font-medium text-gray-500">Gallery Images</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Paste image URL"
                  className="flex-1 px-5 py-4 border border-gray-300 rounded-[20px] focus:border-[#191974] outline-none transition-all text-[16px]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const val = e.currentTarget.value.trim();
                      if (val) {
                        setTourData({ ...tourData, gallery_images: [...(tourData.gallery_images || []), val] });
                        e.currentTarget.value = '';
                      }
                    }
                  }}
                />
              </div>
              <div className="grid grid-cols-4 gap-3 mt-4">
                {tourData.gallery_images?.map((img: string, i: number) => (
                  <div key={i} className="relative aspect-square rounded-[15px] overflow-hidden border border-gray-200 group">
                    <img src={img} className="w-full h-full object-cover" />
                    <button
                      onClick={() => {
                        const next = [...tourData.gallery_images];
                        next.splice(i, 1);
                        setTourData({ ...tourData, gallery_images: next });
                      }}
                      className="absolute top-1 right-1 w-6 h-6 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Stats */}
        <section className="space-y-8 bg-gray-50/50 p-8 rounded-[32px] border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-[14px] font-medium text-gray-500">Starting Place</label>
              <input type="text" value={tourData.starting_place} onChange={e => setTourData({ ...tourData, starting_place: e.target.value })} className="w-full px-5 py-3 border border-gray-300 rounded-xl outline-none focus:border-[#191974]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[14px] font-medium text-gray-500">Country <span className="text-red-500">*</span></label>
              <select value={tourData.country} onChange={e => setTourData({ ...tourData, country: e.target.value })} className="w-full px-5 py-3 border border-gray-300 rounded-xl outline-none focus:border-[#191974] bg-white">
                <option value="India">India</option>
                <option value="Australia">Australia</option>
                <option value="United Arab Emirates">UAE</option>
                <option value="Vietnam">Vietnam</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[14px] font-medium text-gray-500">Cities (comma separated)</label>
              <input type="text" value={tourData.cities} onChange={e => setTourData({ ...tourData, cities: e.target.value })} className="w-full px-5 py-3 border border-gray-300 rounded-xl outline-none focus:border-[#191974]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[14px] font-medium text-gray-500">Minimum Age</label>
              <input type="number" value={tourData.min_age} onChange={e => setTourData({ ...tourData, min_age: parseInt(e.target.value) })} className="w-full px-5 py-3 border border-gray-300 rounded-xl outline-none focus:border-[#191974]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[14px] font-medium text-gray-500">Travelers</label>
              <input type="number" value={tourData.max_travelers} onChange={e => setTourData({ ...tourData, max_travelers: parseInt(e.target.value) })} className="w-full px-5 py-3 border border-gray-300 rounded-xl outline-none focus:border-[#191974]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[14px] font-medium text-gray-500">Rating</label>
              <input type="number" step="0.1" value={tourData.rating} onChange={e => setTourData({ ...tourData, rating: parseFloat(e.target.value) })} className="w-full px-5 py-3 border border-gray-300 rounded-xl outline-none focus:border-[#191974]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[14px] font-medium text-gray-500">Days</label>
              <input type="number" value={tourData.days} onChange={e => setTourData({ ...tourData, days: parseInt(e.target.value) })} className="w-full px-5 py-3 border border-gray-300 rounded-xl outline-none focus:border-[#191974]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[14px] font-medium text-gray-500">Nights</label>
              <input type="number" value={tourData.nights} onChange={e => setTourData({ ...tourData, nights: parseInt(e.target.value) })} className="w-full px-5 py-3 border border-gray-300 rounded-xl outline-none focus:border-[#191974]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[14px] font-medium text-gray-500">Price ({tourData.currency})</label>
              <input type="number" value={tourData.price} onChange={e => setTourData({ ...tourData, price: parseInt(e.target.value) })} className="w-full px-5 py-3 border border-gray-300 rounded-xl outline-none focus:border-[#191974]" />
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="space-y-8">
          <div className="space-y-2">
            <label className="text-[14px] font-medium text-gray-500">Description</label>
            <textarea
              rows={5}
              value={tourData.description}
              onChange={e => setTourData({ ...tourData, description: e.target.value })}
              className="w-full px-6 py-5 border border-gray-300 rounded-[20px] outline-none focus:border-[#191974] text-[15px] resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[14px] font-medium text-gray-500">Categories <span className="text-[12px] text-gray-400 font-normal">(select all that apply)</span></label>
            <div className="flex flex-wrap gap-3 mt-2">
              {['Family', 'Honeymoon', 'Group', 'Spiritual', 'Luxury'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    const next = tourData.categories.includes(cat)
                      ? tourData.categories.filter((c: string) => c !== cat)
                      : [...tourData.categories, cat];
                    setTourData({ ...tourData, categories: next });
                  }}
                  className={`px-8 py-2.5 rounded-[12px] text-[14px] font-bold transition-all border ${tourData.categories.includes(cat)
                      ? 'bg-[#191974] text-white border-[#191974]'
                      : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Lists (Included / Excluded) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-gray-50">
          <div className="space-y-6">
            <h3 className="text-[18px] font-bold text-[#191974]">Included</h3>
            <div className="space-y-3">
              {tourData.included?.map((item: string, i: number) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <div className="flex-1 px-5 py-3.5 border border-gray-200 rounded-[15px] text-[14px] text-gray-600 bg-white shadow-sm">{item}</div>
                  <button onClick={() => removeItem('included', i)} className="text-red-500 font-bold text-[12px] uppercase tracking-wider hover:underline">Remove</button>
                </div>
              ))}
              <div className="pt-2">
                <input
                  type="text"
                  placeholder="+ Add new inclusion item"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addItem('included', e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                  className="w-full px-5 py-4 border-2 border-dashed border-gray-200 rounded-[20px] text-[14px] text-gray-400 focus:text-gray-600 focus:border-[#191974] outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[18px] font-bold text-[#191974]">Excluded</h3>
            <div className="space-y-3">
              {tourData.excluded?.map((item: string, i: number) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <div className="flex-1 px-5 py-3.5 border border-gray-200 rounded-[15px] text-[14px] text-gray-600 bg-white shadow-sm">{item}</div>
                  <button onClick={() => removeItem('excluded', i)} className="text-red-500 font-bold text-[12px] uppercase tracking-wider hover:underline">Remove</button>
                </div>
              ))}
              <div className="pt-2">
                <input
                  type="text"
                  placeholder="+ Add new exclusion item"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addItem('excluded', e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                  className="w-full px-5 py-4 border-2 border-dashed border-gray-200 rounded-[20px] text-[14px] text-gray-400 focus:text-gray-600 focus:border-[#191974] outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Itinerary Section (Day by Day) */}
        <section className="space-y-8 pt-12 border-t border-gray-50">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-[24px] font-bold text-[#191974]">Tour Plan (Itinerary)</h2>
              <p className="text-gray-400 text-sm italic">Day-by-day details of the experience.</p>
            </div>
            <button
              onClick={addItineraryDay}
              className="flex items-center gap-2 text-[#ee2229] font-bold hover:underline"
            >
              <Plus className="w-5 h-5" /> Add Day
            </button>
          </div>

          <div className="space-y-8">
            {itinerary.map((day, idx) => (
              <div key={idx} className="bg-[#fcfdff] border border-gray-100 rounded-[32px] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#191974] text-white flex items-center justify-center font-bold">
                      {day.day_number}
                    </div>
                    <h4 className="text-[16px] font-bold text-[#191974]">Day {day.day_number} Plan</h4>
                  </div>
                  <button
                    onClick={() => setItinerary(itinerary.filter((_, i) => i !== idx))}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest px-1">Day {day.day_number} Title</label>
                    <input
                      type="text"
                      value={day.title}
                      onChange={e => {
                        const next = [...itinerary];
                        next[idx].title = e.target.value;
                        setItinerary(next);
                      }}
                      placeholder="e.g. Arrival & Beach Exploration"
                      className="w-full px-5 py-3.5 border border-gray-200 rounded-[15px] focus:border-[#191974] outline-none transition-all bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest px-1">Description</label>
                    <textarea
                      rows={3}
                      value={day.description}
                      onChange={e => {
                        const next = [...itinerary];
                        next[idx].description = e.target.value;
                        setItinerary(next);
                      }}
                      className="w-full px-5 py-4 border border-gray-200 rounded-[15px] focus:border-[#191974] outline-none transition-all bg-white resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Actions */}
        <div className="pt-10 flex gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 bg-[#ee2229] hover:bg-[#d61e24] text-white py-5 rounded-[20px] font-bold text-[18px] transition-all shadow-xl shadow-red-500/10 flex items-center justify-center gap-3 disabled:bg-gray-300"
          >
            {saving ? <Loader2 className="w-6 h-6 animate-spin" /> : <CheckCircle2 className="w-6 h-6" />}
            {saving ? 'Saving Tour...' : 'Save Tour Highlights & Plan'}
          </button>
          <button
            onClick={() => router.back()}
            className="px-10 py-5 border border-gray-300 rounded-[20px] font-bold text-[18px] text-gray-400 hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
