"use client";

import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Search, 
  UserPlus, 
  CheckCircle2, 
  XCircle, 
  Wallet, 
  TrendingUp, 
  ArrowRight,
  Shield,
  Star,
  RefreshCw,
  MoreVertical
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function AgentsPanel() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'top'>('all');
  const supabase = createClient();

  useEffect(() => {
    fetchAgents();
  }, []);

  async function fetchAgents() {
    setLoading(true);
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setAgents(data);
    setLoading(false);
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'rejected': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-gray-50 text-gray-500 border-gray-100';
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#0F172A] mb-2 tracking-tight">Agent Network Management</h1>
          <p className="text-gray-500 font-medium italic">Track partner performance, approve onboarding, and manage global payouts.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 text-[#0F172A] px-6 py-3 rounded-2xl font-bold text-sm shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2">
            <Wallet className="w-4 h-4 text-emerald-500" /> Payout Queue
          </button>
          <button className="bg-[#ee2229] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl flex items-center gap-2 hover:bg-[#0F172A] transition-all">
            <UserPlus className="w-4 h-4" /> Add Enterprise Agent
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm w-fit">
         {['all', 'pending', 'top'].map((tab) => (
            <button 
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[#0F172A] text-white shadow-lg' : 'text-gray-400 hover:text-[#0F172A]'}`}
            >
               {tab} Partners
            </button>
         ))}
      </div>

      {/* Agents List */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between gap-6">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                 type="text" 
                 placeholder="Search by agency name or license ID..." 
                 className="w-full bg-gray-50 border-none pl-11 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-red-500 text-sm font-bold"
              />
           </div>
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 italic text-[11px] font-bold">
                 <Shield className="w-4 h-4" /> Verified Network Status
              </div>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Partner Identity</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Conversion Score</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Earnings</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Onboarding Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                 Array(5).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                       <td className="px-8 py-6"><div className="h-5 bg-gray-100 rounded w-48" /></td>
                       <td className="px-8 py-6"><div className="h-5 bg-gray-100 rounded w-16 mx-auto" /></td>
                       <td className="px-8 py-6"><div className="h-5 bg-gray-100 rounded w-24" /></td>
                       <td className="px-8 py-6"><div className="h-5 bg-gray-100 rounded w-20" /></td>
                       <td className="px-8 py-6"><div className="h-5 bg-gray-100 rounded w-10 ml-auto" /></td>
                    </tr>
                 ))
              ) : agents.length === 0 ? (
                 <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                       <div className="flex flex-col items-center gap-4">
                          <Briefcase className="w-16 h-16 text-gray-100" />
                          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No agent partners in this segment.</p>
                       </div>
                    </td>
                 </tr>
              ) : agents.map((agent) => (
                <tr key={agent.id} className="group hover:bg-gray-50/30 transition-all">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gray-100 rounded-2xl overflow-hidden shrink-0 border border-transparent group-hover:border-[#ee2229] transition-all">
                         <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${agent.agency_name}`} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-black text-[#0F172A] text-[15px]">{agent.agency_name || agent.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{agent.location || 'Global Hub'} · ID: {agent.id.slice(0, 6)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full border border-yellow-100 italic font-black text-[11px]">
                       <Star className="w-3 h-3 fill-current" />
                       {agent.score || '4.8'}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                       <span className="text-[15px] font-black text-[#0F172A]">â‚¹{(agent.earnings || 245000).toLocaleString()}</span>
                       <span className="text-[11px] text-green-500 font-bold flex items-center gap-1 italic">
                          <TrendingUp className="w-3 h-3" /> +12% growth
                       </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[11px] font-black uppercase tracking-widest italic ${getStatusBadge(agent.status)}`}>
                       <div className="w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
                       {agent.status || 'Active'}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-3">
                       {agent.status === 'pending' ? (
                          <>
                             <button className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center shadow-sm">
                                <CheckCircle2 className="w-5 h-5" />
                             </button>
                             <button className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center shadow-sm">
                                <XCircle className="w-5 h-5" />
                             </button>
                          </>
                       ) : (
                          <button className="w-10 h-10 bg-white border border-gray-100 text-gray-400 hover:text-[#0F172A] hover:bg-gray-50 rounded-xl transition-all flex items-center justify-center">
                             <ArrowRight className="w-5 h-5" />
                          </button>
                       )}
                       <button className="w-10 h-10 bg-white border border-gray-100 text-gray-400 rounded-xl flex items-center justify-center">
                          <MoreVertical className="w-5 h-5" />
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
