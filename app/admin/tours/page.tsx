"use client";

import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Search,
  MapPin,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Globe,
  Settings2,
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { formatRegionalPrice } from '@/config/country';

export default function ToursAdmin() {
  const router = useRouter();
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const supabase = createClient();

  useEffect(() => {
    fetchTours();
  }, []);

  async function fetchTours() {
    setLoading(true);
    const { data, error } = await supabase
      .from('tours')
      .select('*, destinations(name)')
      .order('created_at', { ascending: false });

    if (data) setTours(data);
    setLoading(false);
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tour? This will also remove linked itineraries.')) return;
    const { error } = await supabase.from('tours').delete().eq('id', id);
    if (!error) {
      setTours(prev => prev.filter(t => t.id !== id));
    } else {
      alert('Error deleting tour: ' + error.message);
    }
  };

  const filteredTours = tours.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.destinations?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#191974] mb-2 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-[#ee2229]" />
            Tour Catalog Management
          </h1>
          <p className="text-gray-500 font-medium">Control pricing, duration, and global availability for all travel packages.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchTours}
            className="w-12 h-12 bg-white border border-gray-200 text-gray-400 hover:text-[#ee2229] rounded-xl flex items-center justify-center transition-all shadow-sm"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => router.push('/admin/tours/new')}
            className="bg-[#191974] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl flex items-center gap-2 hover:bg-[#ee2229] transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Package
          </button>
        </div>
      </div>

      <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-[#ee2229] pl-10 pr-4 py-2.5 rounded-xl outline-none transition-all text-sm font-medium"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live: {tours.filter(t => t.visibility !== false).length}</span>
            </div>
            <div className="flex items-center gap-2 border-l pl-4">
              <div className="w-3 h-3 rounded-full bg-gray-300" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Draft: {tours.filter(t => t.visibility === false).length}</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Basic Package Info</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Market Price</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Duration</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Visibility</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array(6).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-64" /></td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-20" /></td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-16" /></td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-16" /></td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-16 ml-auto" /></td>
                  </tr>
                ))
              ) : filteredTours.map((tour) => (
                <tr key={tour.id} className="group hover:bg-gray-50/50 transition-all">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 shrink-0">
                        <img
                          src={tour.image_url || 'https://images.unsplash.com/photo-1502759683299-cdcc69741a7f?auto=format&fit=crop&q=80&w=200'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-[#191974] text-[15px] group-hover:text-[#ee2229] transition-colors">{tour.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#ee2229]" />
                          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{tour.destinations?.name || 'Unassigned'}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-[#191974]">{formatRegionalPrice(tour.price || 0, 'en-in')}</span>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Base INR</p>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-gray-300" />
                      <span className="text-sm font-bold">{tour.duration_days || 0} Days</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      {tour.visibility !== false ? (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-600 rounded-lg border border-green-100 italic">
                          <CheckCircle2 className="w-3 h-3" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Public</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 text-gray-400 rounded-lg border border-gray-100 italic">
                          <AlertCircle className="w-3 h-3" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Draft</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => router.push(`/admin/tours/${tour.id}/edit`)}
                        className="p-2.5 text-gray-400 hover:text-[#191974] hover:bg-gray-100 rounded-xl transition-all"
                      >
                        <Settings2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => router.push(`/en-in/tours/${tour.slug || tour.id}`)}
                        className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                      >
                        <Globe className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(tour.id)}
                        className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
