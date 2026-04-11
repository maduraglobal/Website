"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Save,
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  Clock,
  Layout,
  History,
  AlertCircle
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface ItineraryDay {
  id?: string;
  day_number: number;
  title: string;
  description: string;
  meals: string;
  activities?: string[];
}

export default function ItineraryEditor() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClient();

  const [tour, setTour] = useState<any>(null);
  const [days, setDays] = useState<ItineraryDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [versionInfo, setVersionInfo] = useState({ version: 1, updated_by: 'Admin', updated_at: '' });

  useEffect(() => {
    async function fetchData() {
      // Fetch Tour name
      const { data: tourData } = await supabase.from('tours').select('*').eq('id', id).single();
      setTour(tourData);

      // Fetch Itinerary
      const { data: itinData } = await supabase
        .from('itineraries')
        .select('*')
        .eq('tour_id', id)
        .order('day_number', { ascending: true });

      if (itinData && itinData.length > 0) {
        setDays(itinData.map(d => ({
          ...d,
          activities: d.activities || []
        })));
        // Mock versioning data - in real app, these would come from the record
        setVersionInfo({
          version: itinData[0].version || 1,
          updated_by: itinData[0].updated_by || 'Admin',
          updated_at: itinData[0].updated_at || new Date().toISOString()
        });
      } else {
        // Default day 1 if empty
        setDays([{ day_number: 1, title: '', description: '', meals: 'Breakfast, Lunch, Dinner', activities: [] }]);
      }
      setLoading(false);
    }
    fetchData();
  }, [id]);

  const addDay = () => {
    const nextDay = days.length + 1;
    setDays([...days, { day_number: nextDay, title: '', description: '', meals: 'Breakfast, Lunch, Dinner', activities: [] }]);
  };

  const removeDay = (index: number) => {
    if (days.length === 1) return;
    const newDays = days.filter((_, i) => i !== index).map((day, i) => ({ ...day, day_number: i + 1 }));
    setDays(newDays);
  };

  const updateDay = (index: number, field: keyof ItineraryDay, value: any) => {
    const newDays = [...days];
    newDays[index] = { ...newDays[index], [field]: value };
    setDays(newDays);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus('idle');

    try {
      const response = await fetch('/api/tours/update-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, days }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to update itinerary');

      setSaveStatus('success');
      setVersionInfo(prev => ({ 
        ...prev, 
        version: result.version || prev.version + 1, 
        updated_at: result.updated_at || new Date().toISOString() 
      }));
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err) {
      console.error('Save Error:', err);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-[#191974]" />
      <p className="text-gray-400 font-bold uppercase tracking-widest text-[12px]">Loading Itinerary Editor...</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[12px] font-bold text-gray-400 hover:text-[#191974] mb-4 transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> BACK TO TOURS
          </button>
          <p className="text-[32px]  text-[#191974] ">
            Itinerary Editor: <span className="text-[#ee2229]">{tour?.title}</span>
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[11px] font-bold border border-blue-100 uppercase tracking-widest">
              <History className="w-3.5 h-3.5" /> Version {versionInfo.version}
            </div>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
              Last updated by <span className="text-[#191974]">{versionInfo.updated_by}</span> {versionInfo.updated_at ? `on ${new Date(versionInfo.updated_at).toLocaleDateString()}` : ''}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg ${saveStatus === 'success' ? 'bg-green-500 text-white shadow-green-500/20' :
              saveStatus === 'error' ? 'bg-red-500 text-white shadow-red-500/20' :
                'bg-[#191974] hover:bg-[#111155] text-white shadow-blue-500/20'
              }`}
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> :
              saveStatus === 'success' ? <CheckCircle2 className="w-5 h-5" /> :
                saveStatus === 'error' ? <AlertCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            {saving ? 'Saving...' : saveStatus === 'success' ? 'Saved Successfully' : saveStatus === 'error' ? 'Error Saving' : 'Save Itinerary'}
          </button>
        </div>
      </div>

      {/* Days Editor */}
      <div className="space-y-6">
        {days.map((day, idx) => (
          <div key={idx} className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden group">
            <div className="bg-[#f8faff] px-8 py-4 flex justify-between items-center border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#191974] text-white flex items-center justify-center font-bold text-sm">
                  {day.day_number}
                </div>
                <h3 className="text-[16px] font-bold text-[#191974] tracking-tight italic">Day {day.day_number} Content</h3>
              </div>
              <button
                onClick={() => removeDay(idx)}
                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 tracking-[0.2em] uppercase px-1">Day Title</label>
                  <input
                    type="text"
                    value={day.title}
                    onChange={(e) => updateDay(idx, 'title', e.target.value)}
                    placeholder="e.g. Arrival & Sunset cruise"
                    className="w-full bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-[#191974] focus:ring-4 focus:ring-[#191974]/5 p-4 rounded-xl text-[15px] outline-none transition-all placeholder:text-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 tracking-[0.2em] uppercase px-1">Meals Provided</label>
                  <input
                    type="text"
                    value={day.meals}
                    onChange={(e) => updateDay(idx, 'meals', e.target.value)}
                    placeholder="e.g. Breakfast, Lunch, Dinner"
                    className="w-full bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-[#191974] focus:ring-4 focus:ring-[#191974]/5 p-4 rounded-xl text-[15px] outline-none transition-all placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 tracking-[0.2em] uppercase px-1">Detailed Description</label>
                <textarea
                  rows={4}
                  value={day.description}
                  onChange={(e) => updateDay(idx, 'description', e.target.value)}
                  placeholder="Describe the activities for this day..."
                  className="w-full bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-[#191974] focus:ring-4 focus:ring-[#191974]/5 p-4 rounded-xl text-[15px] outline-none transition-all placeholder:text-gray-300 resize-none"
                />
              </div>

              {/* Activities Tag System (Simple comma separated for now) */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 tracking-[0.2em] uppercase px-1">Key Activities (Optional)</label>
                <div className="flex gap-2 flex-wrap mb-2">
                  {day.activities?.map((act, actIdx) => (
                    <span key={actIdx} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2 border border-blue-100">
                      {act}
                      <button onClick={() => {
                        const newActs = day.activities?.filter((_, i) => i !== actIdx);
                        updateDay(idx, 'activities', newActs);
                      }} className="hover:text-red-500">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Type activity and press Enter..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const val = e.currentTarget.value.trim();
                      if (val) {
                        updateDay(idx, 'activities', [...(day.activities || []), val]);
                        e.currentTarget.value = '';
                      }
                    }
                  }}
                  className="w-full bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-[#191974] focus:ring-4 focus:ring-[#191974]/5 p-4 rounded-xl text-[14px] outline-none transition-all placeholder:text-gray-400 h-12"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addDay}
          className="w-full py-10 border-2 border-dashed border-gray-200 rounded-[32px] text-gray-400 hover:border-[#191974] hover:text-[#191974] hover:bg-[#191974]/5 transition-all flex flex-col items-center justify-center gap-3 group"
        >
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-200 group-hover:border-[#191974] flex items-center justify-center">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-bold tracking-widest text-[12px] uppercase">Add New Day to Sequence</span>
        </button>
      </div>

      {/* Bottom Floating Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl border border-gray-100 px-8 py-4 rounded-3xl shadow-2xl z-50 flex items-center gap-12 ml-32">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active Editing</span>
          <span className="text-[14px] font-bold text-[#191974]">{days.length} Total Days</span>
        </div>
        <div className="w-px h-8 bg-gray-100"></div>
        <div className="flex items-center gap-4">
          <p className="text-[11px] text-gray-500 max-w-[200px] leading-snug">Changes will be visible immediately after saving.</p>
          <button
            onClick={handleSave}
            className="bg-[#ee2229] hover:bg-[#d61e24] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-red-500/20"
          >
            Deploy Updates
          </button>
        </div>
      </div>
    </div>
  );
}
