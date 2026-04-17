"use client";

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Globe, 
  Map, 
  DollarSign, 
  Download, 
  Calendar,
  ArrowUpRight,
  PieChart,
  Target
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { formatRegionalPrice } from '@/config/country';

export default function RevenueDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    in: 0,
    au: 0,
    us: 0,
    topTours: [] as any[]
  });
  const supabase = createClient();

  useEffect(() => {
    fetchRevenueData();
  }, []);

  async function fetchRevenueData() {
    setLoading(true);
    // Fetch all confirmed bookings to calculate revenue
    const { data, error } = await supabase
      .from('bookings')
      .select('total_price, region, tour_name')
      .eq('status', 'confirmed');

    if (data) {
      const total = data.reduce((acc, b) => acc + (b.total_price || 0), 0);
      const in_rev = data.filter(b => b.region === 'en-in').reduce((acc, b) => acc + (b.total_price || 0), 0);
      const au_rev = data.filter(b => b.region === 'en-au').reduce((acc, b) => acc + (b.total_price || 0), 0);
      const us_rev = data.filter(b => b.region === 'en-us').reduce((acc, b) => acc + (b.total_price || 0), 0);

      // Top tours calculation
      const tourRevenue: Record<string, number> = {};
      data.forEach(b => {
        const name = b.tour_name || 'Generic Service';
        tourRevenue[name] = (tourRevenue[name] || 0) + (b.total_price || 0);
      });

      const sortedTours = Object.entries(tourRevenue)
        .map(([name, revenue]) => ({ name, revenue }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

      setStats({
        total,
        in: in_rev,
        au: au_rev,
        us: us_rev,
        topTours: sortedTours
      });
    }
    setLoading(false);
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#0F172A] mb-2 tracking-tight">Enterprise Revenue Intel</h1>
          <p className="text-gray-500 font-medium italic">Consolidated financial overview of global bookings and cross-border currency flows.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white border border-gray-100 p-2 rounded-2xl shadow-sm flex items-center gap-2">
             <Calendar className="w-4 h-4 text-gray-400" />
             <span className="text-sm font-bold text-[#0F172A]">Last 30 Days</span>
          </div>
          <button className="bg-[#0F172A] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl flex items-center gap-2 hover:bg-blue-600 transition-all">
            <Download className="w-4 h-4" /> Download PDF Report
          </button>
        </div>
      </div>

      {/* Primary Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-[#0F172A] p-10 rounded-[40px] text-white relative overflow-hidden shadow-2xl">
            <div className="absolute right-0 top-0 w-32 h-32 bg-blue-600/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <DollarSign className="w-12 h-12 text-blue-500 mb-6" />
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-2">Consolidated Revenue (INR)</p>
            <h2 className="text-5xl font-black text-white leading-tight">
               {loading ? '...' : `â‚¹${(stats.total / 100000).toFixed(2)}L`}
            </h2>
            <div className="flex items-center gap-2 mt-6 text-emerald-400 text-sm font-bold italic">
               <TrendingUp className="w-4 h-4" />
               +18.4% vs Previous Month
            </div>
         </div>

         <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm items-center">
            {[
               { label: 'India Market', value: stats.in, country: 'IN', color: 'text-orange-500', bg: 'bg-orange-50' },
               { label: 'Australia Market', value: stats.au, country: 'AU', color: 'text-blue-500', bg: 'bg-blue-50' },
               { label: 'USA Market', value: stats.us, country: 'US', color: 'text-emerald-500', bg: 'bg-emerald-50' }
            ].map((market, i) => (
               <div key={i} className={`p-8 rounded-[32px] ${market.bg} border border-transparent hover:border-white transition-all group`}>
                  <div className="flex items-center justify-between mb-4">
                     <span className={`text-[10px] font-black uppercase tracking-widest ${market.color}`}>{market.label}</span>
                     <Globe className={`w-4 h-4 ${market.color}`} />
                  </div>
                  <h3 className="text-2xl font-black text-[#0F172A]">
                    {loading ? '...' : `â‚¹${(market.value / 100000).toFixed(1)}L`}
                  </h3>
                  <div className="h-1 w-full bg-white/50 rounded-full mt-4 overflow-hidden">
                     <div className={`h-full ${market.color.replace('text-', 'bg-')} opacity-60`} style={{ width: `${Math.round((market.value / (stats.total || 1)) * 100)}%` }}></div>
                  </div>
               </div>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
         {/* Top Tours Revenue */}
         <div className="lg:col-span-3 bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
               <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-3">
                  <Map className="w-6 h-6 text-[#ee2229]" />
                  Tour-wise Revenue Breakdown
               </h3>
               <BarChart3 className="w-5 h-5 text-gray-300" />
            </div>
            <div className="p-8 flex-1 space-y-8">
               {loading ? (
                  Array(4).fill(0).map((_, i) => <div key={i} className="h-12 bg-gray-50 rounded-2xl animate-pulse" />)
               ) : stats.topTours.length === 0 ? (
                  <p className="text-center text-gray-400 py-10 font-bold uppercase tracking-widest italic">No confirmed bookings data available.</p>
               ) : stats.topTours.map((tour, i) => (
                  <div key={i} className="space-y-2 group">
                     <div className="flex justify-between items-end">
                        <span className="text-[14px] font-bold text-[#0F172A] group-hover:text-[#ee2229] transition-colors">{tour.name}</span>
                        <span className="text-sm font-black text-[#0F172A]">{formatRegionalPrice(tour.revenue, 'en-in')}</span>
                     </div>
                     <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden p-0.5 border border-gray-100">
                        <div className="h-full bg-linear-to-r from-[#191974] to-[#ee2229] rounded-full transition-all duration-1000" style={{ width: `${(tour.revenue / (stats.topTours[0].revenue || 1)) * 100}%` }}></div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Market Distribution */}
         <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm flex-1 relative overflow-hidden group">
               <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <PieChart className="w-48 h-48" />
               </div>
               <h3 className="text-xl font-bold text-[#0F172A] mb-8 flex items-center gap-3">
                  <Target className="w-6 h-6 text-blue-600" />
                  Target Allocation
               </h3>
               <div className="space-y-8">
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 rounded-3xl bg-blue-50 flex items-center justify-center font-black text-blue-600 text-xl">
                        {loading ? '..' : Math.round((stats.in / (stats.total || 1)) * 100)}%
                     </div>
                     <div>
                        <p className="text-sm font-bold text-[#0F172A]">Domestic (India)</p>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest italic mt-0.5 font-medium">B2C High Volume</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 rounded-3xl bg-emerald-50 flex items-center justify-center font-black text-emerald-600 text-xl">
                        {loading ? '..' : Math.round(((stats.au + stats.us) / (stats.total || 1)) * 100)}%
                     </div>
                     <div>
                        <p className="text-sm font-bold text-[#0F172A]">International (AU/US)</p>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest italic mt-0.5 font-medium">High Margin Segments</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-[#ee2229] p-8 rounded-[40px] text-white shadow-xl flex items-center justify-between group">
               <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Daily Run Rate</p>
                  <h4 className="text-2xl font-black">â‚¹{loading ? '...' : (stats.total / 30).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
               </div>
               <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#ee2229] transition-all">
                  <ArrowUpRight className="w-6 h-6" />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
