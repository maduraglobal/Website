"use client";

import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  ChevronRight, 
  Plus, 
  MapPin, 
  Search, 
  RefreshCw,
  FolderTree,
  ChevronDown,
  Edit2,
  Trash2,
  Layout
} from 'lucide-react';
import { Destination } from '@/utils/crm-types';

export default function DestinationsPanel() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedParents, setExpandedParents] = useState<string[]>([]);

  useEffect(() => {
    fetchDestinations();
  }, []);

  async function fetchDestinations() {
    setLoading(true);
    const res = await fetch('/api/destinations');
    const data = await res.json();
    setDestinations(data);
    setLoading(false);
  }

  const toggleParent = (id: string) => {
    setExpandedParents(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const parents = destinations.filter(d => !d.parent_id);
  const getChildren = (parentId: string) => destinations.filter(d => d.parent_id === parentId);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-[32px] font-bold text-[#191974] mb-2 tracking-tight">Geographic Hierarchy</h1>
          <p className="text-gray-500 font-medium italic">Mapping global regions and child destinations for optimized content routing.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchDestinations}
            className="w-10 h-10 bg-white border border-gray-100 text-gray-400 hover:text-[#ee2229] rounded-xl flex items-center justify-center transition-all shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button className="bg-[#191974] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl flex items-center gap-2 hover:bg-[#ee2229] transition-all">
            <Plus className="w-4 h-4" />
            Add Region/City
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Tree View */}
        <div className="md:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
            <FolderTree className="w-5 h-5 text-[#ee2229]" />
            <h3 className="font-bold text-[#191974] uppercase text-[12px] tracking-widest">Global Destination Tree</h3>
          </div>

          {loading ? (
             <div className="py-20 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-4 border-gray-100 border-t-[#ee2229] rounded-full animate-spin" />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mapping World...</p>
             </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {parents.map(parent => (
                <div key={parent.id} className="group">
                  <div className="flex items-center justify-between p-6 hover:bg-gray-50/50 transition-all cursor-pointer" onClick={() => toggleParent(parent.id)}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-[#191974]">{parent.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{getChildren(parent.id).length} Child Destinations</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Edit2 className="w-4 h-4" /></button>
                         <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                       </div>
                       {expandedParents.includes(parent.id) ? <ChevronDown className="w-5 h-5 text-gray-300" /> : <ChevronRight className="w-5 h-5 text-gray-300" />}
                    </div>
                  </div>

                  {/* Children Sub-tree */}
                  {expandedParents.includes(parent.id) && (
                    <div className="bg-gray-50/50 border-t border-gray-50 py-2">
                       {getChildren(parent.id).map(child => (
                         <div key={child.id} className="flex items-center justify-between px-10 py-4 hover:bg-white transition-all ml-4 border-l-2 border-gray-100">
                            <div className="flex items-center gap-3">
                              <MapPin className="w-4 h-4 text-gray-300" />
                              <span className="text-[14px] font-medium text-gray-600">{child.name}</span>
                              <span className="text-[10px] bg-white border border-gray-200 text-gray-400 px-1.5 py-0.5 rounded font-bold uppercase">/{child.slug}</span>
                            </div>
                            <div className="flex gap-2">
                               <button className="p-1.5 text-gray-300 hover:text-blue-600"><Edit2 className="w-3.5 h-3.5" /></button>
                            </div>
                         </div>
                       ))}
                       <button className="flex items-center gap-2 px-10 py-4 text-[11px] font-bold text-[#ee2229] hover:text-[#191974] transition-colors group/add">
                         <Plus className="w-3 h-3 transition-transform group-hover/add:rotate-90" />
                         Add Child Destination to {parent.name}
                       </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Info Panel */}
        <div className="space-y-6">
          <div className="bg-[#191974] p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12 transition-transform group-hover:scale-110">
              <Globe className="w-48 h-48" />
            </div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Layout className="w-5 h-5 text-[#ee2229]" />
              SEO Routing
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Hierarchy management ensures that your tours are automatically routed to the correct regional pages, maintaining perfect SEO integrity across India, Europe, and beyond.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[11px] font-bold tracking-widest uppercase">/destinations/[region]</div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[11px] font-bold tracking-widest uppercase">/destinations/[region]/[city]</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
             <div className="w-12 h-12 bg-red-50 text-[#ee2229] rounded-2xl flex items-center justify-center">
               <MapPin className="w-6 h-6" />
             </div>
             <p className="text-sm font-bold text-[#191974]">Quick Stats</p>
             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl">
                   <p className="text-2xl font-bold text-[#191974]">{parents.length}</p>
                   <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Regions</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl">
                   <p className="text-2xl font-bold text-[#191974]">{destinations.filter(d => d.parent_id).length}</p>
                   <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Cities</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
