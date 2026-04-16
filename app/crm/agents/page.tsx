"use client";

import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Search, 
  Plus, 
  MoreVertical, 
  ShieldCheck, 
  Star, 
  TrendingUp,
  MapPin,
  RefreshCw,
  Award
} from 'lucide-react';

export default function AgentsPanel() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock data for initial display
  const mockAgents = [
    { id: '1', name: 'Global Travel Solutions', location: 'Dubai, UAE', type: 'Platinum', sales: 'â‚¹42,50,000', rating: 4.9, status: 'Active' },
    { id: '2', name: 'Nomad Expeditions', location: 'London, UK', type: 'Gold', sales: 'â‚¹18,20,000', rating: 4.7, status: 'Active' },
    { id: '3', name: 'Asian Escapes Ltd', location: 'Singapore', type: 'Silver', sales: 'â‚¹8,40,000', rating: 4.5, status: 'Probation' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-[32px] font-bold text-[#191974] mb-2 tracking-tight">Agent Network</h1>
          <p className="text-gray-500 font-medium italic">Manage and monitor your global network of B2B partners and travel agents.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-100 text-[#191974] px-6 py-3 rounded-xl font-bold text-sm shadow-sm flex items-center gap-2 hover:bg-gray-50 transition-all">
            <Award className="w-4 h-4 text-[#ee2229]" />
            Tier Config
          </button>
          <button className="bg-[#ee2229] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-[#ee2229]/20 flex items-center gap-2 hover:bg-[#191974] transition-all">
            <Plus className="w-4 h-4" />
            Onboard Agent
          </button>
        </div>
      </div>

      {/* Network Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Partners', value: '124', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Network', value: '98', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'B2B Revenue', value: 'â‚¹1.2 Cr', icon: TrendingUp, color: 'text-[#ee2229]', bg: 'bg-red-50' },
          { label: 'Avg Partnership', value: '4.2 Yrs', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
              <p className="text-xl font-bold text-[#191974]">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
        <div className="p-8 border-b border-gray-50 flex flex-wrap items-center justify-between gap-6">
          <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search agent network by name, location or Tier..." 
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-[20px] text-sm focus:outline-none focus:border-[#ee2229]/20 focus:bg-white transition-all shadow-inner"
            />
          </div>
          
          <div className="flex gap-2">
            {['All Tiers', 'Platinum', 'Gold', 'Silver'].map(t => (
              <button key={t} className={`px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${t === 'All Tiers' ? 'bg-[#191974] text-white shadow-lg' : 'bg-gray-50 text-gray-400 hover:text-[#191974]'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-widest px-8 h-14">
                <th className="px-8">Agent Information</th>
                <th className="px-8">Tier Level</th>
                <th className="px-8">Total Sales</th>
                <th className="px-8">Rating</th>
                <th className="px-8">Status</th>
                <th className="px-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockAgents.map((agent) => (
                <tr key={agent.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center font-bold text-[#191974] text-sm group-hover:bg-[#191974] group-hover:text-white transition-all">
                        {agent.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-[#191974] mb-0.5">{agent.name}</p>
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <MapPin className="w-3 h-3" />
                          <span className="text-[11px] font-medium">{agent.location}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      agent.type === 'Platinum' ? 'bg-indigo-50 text-indigo-600' :
                      agent.type === 'Gold' ? 'bg-amber-50 text-amber-600' :
                      'bg-slate-50 text-slate-600'
                    }`}>
                      {agent.type}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-[14px] font-bold text-[#191974]">{agent.sales}</p>
                    <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-tight">+12% growth</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-bold text-[#191974]">{agent.rating}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${agent.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]'}`} />
                       <span className="text-[11px] font-bold text-gray-600 uppercase tracking-widest">{agent.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2.5 bg-gray-50 text-gray-300 hover:bg-[#191974] hover:text-white rounded-xl transition-all shadow-sm">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dynamic Empty State if no agents */}
        {!loading && mockAgents.length === 0 && (
          <div className="py-24 flex flex-col items-center justify-center text-center px-10">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <Briefcase className="w-10 h-10 text-gray-200" />
            </div>
            <h3 className="text-xl font-bold text-[#191974] mb-2 tracking-tight">Expand Your Horizons</h3>
            <p className="text-gray-400 max-w-sm text-sm">Onboard your first affiliate travel agent to start scaling your global booking network.</p>
          </div>
        )}
      </div>
    </div>
  );
}
