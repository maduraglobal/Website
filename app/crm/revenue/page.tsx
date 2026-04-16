"use client";

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight,
  DollarSign,
  Briefcase,
  PieChart,
  RefreshCw
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function RevenueDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 2845000,
    agentCommission: 312000,
    netProfit: 2533000,
    growth: 12.5
  });
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-[32px] font-bold text-[#0F172A] mb-2 tracking-tight">Financial Intelligence</h1>
          <p className="text-gray-500 font-medium">Real-time analysis of global revenue streams and operational margins.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white border border-gray-100 rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm">
            <Calendar className="w-4 h-4 text-[#191974]" />
            <span className="text-xs font-bold text-[#191974]">Fiscal Year 2024-25</span>
          </div>
          <button className="bg-[#191974] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-[#191974]/20 flex items-center gap-2 hover:bg-[#ee2229] transition-all">
            <Download className="w-4 h-4" />
            Accounting Export
          </button>
        </div>
      </div>

      {/* Main KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            label: 'Global Booking Revenue', 
            value: `â‚¹${stats.totalRevenue.toLocaleString()}`, 
            icon: DollarSign, 
            color: 'text-blue-600', 
            bg: 'bg-blue-50',
            trend: '+18.4%',
            isPositive: true
          },
          { 
            label: 'Managed Agent Commissions', 
            value: `â‚¹${stats.agentCommission.toLocaleString()}`, 
            icon: Briefcase, 
            color: 'text-purple-600', 
            bg: 'bg-purple-50',
            trend: '+5.2%',
            isPositive: true
          },
          { 
            label: 'Calculated Net Profit', 
            value: `â‚¹${stats.netProfit.toLocaleString()}`, 
            icon: TrendingUp, 
            color: 'text-emerald-600', 
            bg: 'bg-emerald-50',
            trend: '+12.5%',
            isPositive: true
          },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[38px] border border-gray-100 shadow-sm relative overflow-hidden group hover:border-[#191974]/20 transition-all">
            <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bg} opacity-20 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110`} />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-[11px] font-bold ${stat.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.trend}
                </div>
              </div>
              
              <p className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-1.5">{stat.label}</p>
              <h3 className={`text-4xl font-black italic tracking-tighter ${stat.color}`}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[42px] border border-gray-100 shadow-sm p-10 min-h-[500px] flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h4 className="text-xl font-bold text-[#191974]">Revenue Trajectory</h4>
              <p className="text-xs text-gray-400 font-medium">Comparison of monthly inflows across regions.</p>
            </div>
            <div className="flex gap-2">
               {['Weekly', 'Monthly', 'Quarterly'].map(t => (
                 <button key={t} className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${t === 'Monthly' ? 'bg-[#191974] text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>
                   {t}
                 </button>
               ))}
            </div>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center">
             <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-8 relative">
                <BarChart3 className="w-16 h-16 text-gray-200" />
                <div className="absolute inset-0 border-4 border-[#191974] border-t-transparent rounded-full animate-spin opacity-20" />
             </div>
             <h3 className="text-2xl font-bold text-[#191974] mb-3 italic">Synthesizing Data Streams</h3>
             <p className="text-gray-400 max-w-sm text-sm leading-relaxed">Our neural engine is aggregating transaction logs from global gateways to generate your performance visualization.</p>
          </div>
        </div>

        <div className="bg-[#191974] rounded-[42px] p-10 text-white shadow-2xl shadow-[#191974]/30 flex flex-col justify-between">
           <div>
             <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
               <PieChart className="w-7 h-7 text-[#ee2229]" />
             </div>
             <h4 className="text-2xl font-bold mb-4 tracking-tight">Channel Attribution</h4>
             <p className="text-white/40 text-sm leading-relaxed mb-10">
               Analysis of booking sources reveals that 64% of high-value conversions originate from organic editorial content.
             </p>
             
             <div className="space-y-5">
                {[
                  { label: 'Direct Website', value: '64%', color: 'bg-[#ee2229]' },
                  { label: 'Affiliate Agents', value: '22%', color: 'bg-blue-400' },
                  { label: 'Social Referral', value: '14%', color: 'bg-emerald-400' },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                      <span>{item.label}</span>
                      <span>{item.value}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: item.value }} />
                    </div>
                  </div>
                ))}
             </div>
           </div>
           
           <button className="w-full bg-white text-[#191974] py-4 rounded-2xl font-bold text-[13px] tracking-wider uppercase mt-12 hover:bg-[#ee2229] hover:text-white transition-all">
             Optimize Strategy
           </button>
        </div>
      </div>
    </div>
  );
}
