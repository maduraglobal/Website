"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  BarChart2, 
  Mail, 
  Phone, 
  Calendar, 
  MoreVertical,
  ArrowRight,
  Target,
  Zap,
  Filter
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function LeadsPanel() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [funnelStats, setFunnelStats] = useState({
    total: 0,
    web: 0,
    direct: 0,
    converted: 0
  });
  const supabase = createClient();

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setLeads(data);
      // Calculate funnel
      const funnel = {
        total: data.length,
        web: data.filter(l => l.source === 'Website').length,
        direct: data.filter(l => l.source === 'Direct').length,
        converted: data.filter(l => l.converted === true).length
      };
      setFunnelStats(funnel);
    }
    setLoading(false);
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#0F172A] mb-2 tracking-tight">Lead Conversion Pipeline</h1>
          <p className="text-gray-500 font-medium italic">Track potential travelers and manage international enquiry funnels.</p>
        </div>
        <div className="flex gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
           <div className="px-6 py-2 border-r border-gray-100 last:border-0 text-center">
              <p className="text-2xl font-black text-[#0F172A]">{funnelStats.total}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Total Hub</p>
           </div>
           <div className="px-6 py-2 border-r border-gray-100 last:border-0 text-center">
              <p className="text-2xl font-black text-blue-600">{Math.round((funnelStats.web / (funnelStats.total || 1)) * 100)}%</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Web Share</p>
           </div>
           <div className="px-6 py-2 text-center">
              <p className="text-2xl font-black text-emerald-500">{funnelStats.converted}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Conversions</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Pipeline visualization or summary */}
        <div className="lg:col-span-2 space-y-8">
           {/* Search & Filter */}
           <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="relative flex-1">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                 <input 
                    type="text" 
                    placeholder="Quick search by name or contact..." 
                    className="w-full bg-gray-50 border-none pl-11 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-bold"
                 />
              </div>
              <button className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-blue-600 transition-colors">
                 <Filter className="w-5 h-5" />
              </button>
           </div>

           {/* Leads List */}
           <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                 <h3 className="text-xl font-bold text-[#0F172A]">Real-time Flow</h3>
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Response Priority</span>
                 </div>
              </div>
              <div className="divide-y divide-gray-50">
                 {loading ? (
                    Array(5).fill(0).map((_, i) => (
                       <div key={i} className="p-8 animate-pulse flex items-center gap-6">
                          <div className="w-14 h-14 bg-gray-100 rounded-2xl" />
                          <div className="flex-1 space-y-3">
                             <div className="h-4 bg-gray-100 rounded w-48" />
                             <div className="h-3 bg-gray-100 rounded w-32" />
                          </div>
                       </div>
                    ))
                 ) : leads.map((lead) => (
                    <div key={lead.id} className="p-8 flex items-center justify-between hover:bg-gray-50/50 transition-all group">
                       <div className="flex items-center gap-6">
                          <div className="w-14 h-14 bg-linear-to-br from-gray-50 to-gray-200 text-[#0F172A] rounded-2xl flex items-center justify-center font-black group-hover:from-blue-600 group-hover:to-blue-800 group-hover:text-white transition-all shadow-sm">
                             {lead.name?.charAt(0) || 'L'}
                          </div>
                          <div>
                             <h4 className="font-black text-[#0F172A] text-lg">{lead.name || 'Anonymous User'}</h4>
                             <div className="flex flex-wrap items-center gap-4 mt-2">
                                <span className="flex items-center gap-1 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                   <Mail className="w-3.5 h-3.5 text-blue-500" /> {lead.email}
                                </span>
                                {lead.phone && (
                                   <span className="flex items-center gap-1 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                      <Phone className="w-3.5 h-3.5 text-emerald-500" /> {lead.phone}
                                   </span>
                                )}
                                <span className="flex items-center gap-1 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                   <Calendar className="w-3.5 h-3.5" /> {new Date(lead.created_at).toLocaleDateString()}
                                </span>
                             </div>
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          <div className="hidden md:flex flex-col items-end mr-4">
                             <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest italic mb-1 ${lead.source === 'Booking Flow' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-gray-100 text-gray-500'}`}>
                                {lead.source || 'Enquiry'}
                             </span>
                          </div>
                          <button className="w-11 h-11 bg-white border border-gray-100 text-gray-300 hover:text-blue-600 hover:border-blue-200 rounded-xl flex items-center justify-center transition-all group-hover:shadow-lg">
                             <ArrowRight className="w-5 h-5" />
                          </button>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right: Conversion Funnel Stats */}
        <div className="space-y-8">
           <div className="bg-[#0F172A] p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                 <Target className="w-5 h-5 text-rose-500" />
                 Funnel Performance
              </h3>
              
              <div className="space-y-10 relative z-10">
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Visitor Intent</span>
                       <span className="text-xl font-black">100%</span>
                    </div>
                    <div className="h-4 w-full bg-slate-800 rounded-2xl overflow-hidden p-1">
                       <div className="h-full bg-linear-to-r from-blue-600 to-indigo-500 rounded-xl" style={{ width: '100%' }}></div>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Qualified Enquiry</span>
                       <span className="text-xl font-black">68%</span>
                    </div>
                    <div className="h-4 w-full bg-slate-800 rounded-2xl overflow-hidden p-1">
                       <div className="h-full bg-linear-to-r from-blue-500 to-blue-400 rounded-xl" style={{ width: '68%' }}></div>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Booking Intent</span>
                       <span className="text-xl font-black">42%</span>
                    </div>
                    <div className="h-4 w-full bg-slate-800 rounded-2xl overflow-hidden p-1">
                       <div className="h-full bg-linear-to-r from-emerald-500 to-teal-400 rounded-xl" style={{ width: '42%' }}></div>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Transaction</span>
                       <span className="text-xl font-black">21%</span>
                    </div>
                    <div className="h-4 w-full bg-slate-800 rounded-2xl overflow-hidden p-1">
                       <div className="h-full bg-linear-to-r from-emerald-400 to-green-300 rounded-xl" style={{ width: '21%' }}></div>
                    </div>
                 </div>
              </div>

              <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                 <div className="flex items-center gap-3 text-emerald-400 mb-2">
                    <Zap className="w-5 h-5 fill-current" />
                    <span className="text-sm font-bold">Optimization Active</span>
                 </div>
                 <p className="text-[11px] text-slate-400 leading-relaxed font-medium italic">Retargeting algorithms are currently synced with website landing pages to maximize conversion.</p>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                 <BarChart2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-black text-[#0F172A]">Cross-Border Analytics</h4>
              <p className="text-sm text-gray-500 leading-relaxed font-medium italic">Lead volume is balancing between IN, AU, and US markets effectively this quarter.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
