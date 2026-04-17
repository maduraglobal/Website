"use client";

import React, { useState, useEffect } from 'react';
import { 
  Map, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  RefreshCw,
  Clock,
  Calendar,
  Eye,
  FileText
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Itinerary {
  id: string;
  tour_id: string;
  tour_title: string;
  version: number;
  is_published: boolean;
  days_count: number;
  updated_at: string;
}

export default function ItinerariesPage() {
  const router = useRouter();
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchItineraries();
  }, []);

  async function fetchItineraries() {
    setLoading(true);
    try {
      // Assuming an API exists or I'll create one
      const res = await fetch('/api/itineraries');
      const data = await res.json();
      setItineraries(data);
    } catch (err) {
      console.error('Error fetching itineraries:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this itinerary?')) return;
    try {
      const res = await fetch(`/api/itineraries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItineraries(prev => prev.filter(i => i.id !== id));
      }
    } catch (err) {
      alert('Error deleting itinerary');
    }
  };

  const filteredItineraries = itineraries.filter(i => 
    i.tour_title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#191974] mb-2">Itinerary Management</h1>
          <p className="text-gray-500 font-medium">Control day-wise travel schedules and technical versions.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchItineraries}
            className="w-12 h-12 bg-white border border-gray-200 text-gray-400 hover:text-[#ee2229] rounded-xl flex items-center justify-center transition-all shadow-sm"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={() => router.push('/admin/itineraries/new')}
            className="bg-[#191974] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl flex items-center gap-2 hover:bg-[#ee2229] transition-all"
          >
            <Plus className="w-5 h-5" />
            New Itinerary
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by tour name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-[#ee2229] pl-10 pr-4 py-2.5 rounded-xl outline-none transition-all text-sm font-medium"
            />
          </div>
          <div className="flex items-center gap-4">
             <div className="px-4 py-2 bg-green-50 text-green-700 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-green-100 italic">
               All Content Synced Live
             </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Linked Tour Package</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Duration</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Version</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-64" /></td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-16" /></td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-12" /></td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-20" /></td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-16 ml-auto" /></td>
                  </tr>
                ))
              ) : filteredItineraries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <FileText className="w-12 h-12 text-gray-100" />
                      <p className="text-gray-400 font-medium">No itineraries found. Create one to link with a tour.</p>
                    </div>
                  </td>
                </tr>
              ) : filteredItineraries.map((itinerary) => (
                <tr key={itinerary.id} className="group hover:bg-gray-50/50 transition-all">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-[#ee2229] transition-colors">
                        <Map className="w-5 h-5 text-gray-400 group-hover:text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-[#191974] text-[15px]">{itinerary.tour_title || 'Unlinked Itinerary'}</p>
                        <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5 font-bold uppercase tracking-wider">
                          <Clock className="w-3 h-3" /> Last updated: {new Date(itinerary.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-300" />
                      <span className="text-sm font-bold text-gray-600">{itinerary.days_count} Days</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[11px] font-bold">v{itinerary.version}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${itinerary.is_published ? 'bg-green-500' : 'bg-gray-300'}`} />
                       <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                         {itinerary.is_published ? 'Published' : 'Draft'}
                       </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                         onClick={() => router.push(`/admin/itineraries/${itinerary.id}/edit`)}
                         className="p-2 text-gray-400 hover:text-[#191974] hover:bg-gray-100 rounded-lg transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(itinerary.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
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
