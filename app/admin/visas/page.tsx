"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Search, 
  RefreshCw, 
  Edit2, 
  Trash2, 
  Globe,
  MoreVertical,
  ArrowRight
} from 'lucide-react';
import { AdminHeader, AdminCard, Badge } from '../components/AdminUI';
import { createClient } from '@/utils/supabase/client';

export default function VisasPage() {
  const [visas, setVisas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const supabase = createClient();

  useEffect(() => {
    fetchVisas();
  }, []);

  async function fetchVisas() {
    setLoading(true);
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('type', 'visa')
      .order('name');
    
    if (data) setVisas(data);
    setLoading(false);
  }

  const filteredVisas = visas.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <AdminHeader 
        title="Visa Entry Matrix"
        description="Configure international entry requirements and visa category metadata."
        icon={ShieldCheck}
        breadcrumbs={[
          { label: 'Inventory', href: '/admin' },
          { label: 'Visa Categories' }
        ]}
        actions={
          <>
            <button 
              onClick={fetchVisas}
              className="w-12 h-12 bg-white border border-gray-100 text-gray-400 hover:text-[#ee2229] rounded-2xl flex items-center justify-center transition-all shadow-sm"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button className="flex-1 md:flex-none bg-[#191974] text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#191974]/10 flex items-center justify-center gap-3 hover:bg-[#ee2229] transition-all group">
              <Plus className="w-4 h-4" /> Add Category
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Visa Categories List */}
        <div className="lg:col-span-2 space-y-6">
           <AdminCard 
             title="Active Visa Protocols" 
             headerAction={
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                 <input 
                   type="text" 
                   placeholder="Search regulations..." 
                   className="pl-8 pr-4 py-2 bg-gray-50 border-none rounded-xl text-[11px] font-bold outline-none focus:ring-2 focus:ring-[#ee2229]/20 w-48 transition-all"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
               </div>
             }
             noPadding
           >
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="bg-gray-50/50">
                         <th className="px-8 py-4 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Regional Category</th>
                         <th className="px-8 py-4 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Slug Alias</th>
                         <th className="px-8 py-4 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                         <th className="px-8 py-4 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                      {loading ? (
                        Array(5).fill(0).map((_, i) => (
                          <tr key={i} className="animate-pulse">
                            <td colSpan={4} className="px-8 py-6"><div className="h-4 bg-gray-100 rounded-full w-full" /></td>
                          </tr>
                        ))
                      ) : filteredVisas.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-8 py-20 text-center text-gray-300 font-bold uppercase tracking-widest text-xs">No entries found</td>
                        </tr>
                      ) : filteredVisas.map((visa) => (
                        <tr key={visa.id} className="group hover:bg-gray-50/50 transition-colors">
                           <td className="px-8 py-5">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#191974] group-hover:bg-[#ee2229] group-hover:text-white transition-all">
                                    <Globe className="w-5 h-5" />
                                 </div>
                                 <span className="font-black text-[#191974] text-sm">{visa.name}</span>
                              </div>
                           </td>
                           <td className="px-8 py-5">
                             <code className="bg-gray-100 text-[10px] px-2 py-1 rounded text-gray-500 font-bold tracking-tight">/visa/{visa.slug}</code>
                           </td>
                           <td className="px-8 py-5">
                              <Badge variant="success">Active Live</Badge>
                           </td>
                           <td className="px-8 py-5">
                              <div className="flex items-center justify-end gap-2">
                                 <button className="w-8 h-8 rounded-lg text-gray-300 hover:text-[#191974] hover:bg-gray-100 flex items-center justify-center transition-all"><Edit2 className="w-4 h-4" /></button>
                                 <button className="w-8 h-8 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-all"><Trash2 className="w-4 h-4" /></button>
                              </div>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
           </AdminCard>
        </div>

        {/* Info Column */}
        <div className="space-y-6">
           <AdminCard title="Quick Overview">
              <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <div>
                       <p className="text-2xl font-black text-[#191974]">{visas.length}</p>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Total Categories</p>
                    </div>
                    <ShieldCheck className="w-8 h-8 text-[#ee2229]/20" />
                 </div>
                 
                 <div className="pt-6 border-t border-gray-50">
                    <p className="text-[11px] font-bold text-gray-500 leading-relaxed italic">
                       Visa categories define the primary landing pages for regional visa information. Ensure slugs match existing SEO targets.
                    </p>
                    <button className="mt-4 w-full py-4 rounded-2xl bg-gray-50 text-[10px] font-black text-[#191974] uppercase tracking-widest hover:bg-[#191974] hover:text-white transition-all flex items-center justify-center gap-2 group">
                       View Frontend Pages <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </button>
                 </div>
              </div>
           </AdminCard>

           <div className="bg-[#ee2229] p-8 rounded-[2.5rem] text-white shadow-xl shadow-[#ee2229]/10">
              <h4 className="font-black uppercase tracking-widest text-[11px] mb-2 opacity-60">System Notification</h4>
              <p className="text-sm font-bold leading-relaxed mb-6">Editing a category slug may break existing inbound links. Proceed with caution.</p>
              <div className="w-full h-1 bg-white/20 rounded-full" />
           </div>
        </div>
      </div>
    </div>
  );
}
