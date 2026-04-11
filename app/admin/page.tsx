"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Map, 
  Calendar, 
  ArrowUpRight, 
  Plus, 
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function AdminDashboard() {
  const [toursCount, setToursCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchStats() {
      const { count } = await supabase.from('tours').select('*', { count: 'exact', head: true });
      setToursCount(count || 0);
      setLoading(false);
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#191974] mb-2 tracking-tight">Website Content Manager</h1>
          <p className="text-gray-500">Manage your tours, itineraries, and visa information content.</p>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/admin/tours/new"
            className="bg-[#ee2229] hover:bg-[#d61e24] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            Create New Tour
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: 'Published Tours', value: toursCount, icon: Map, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Itineraries', value: toursCount, icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Visa Destinations', value: '42', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold text-[#191974]">{loading ? '...' : stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Grid: Management Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Core Management Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-[18px] font-bold text-[#191974]">Quick Access Management</h2>
              <button className="text-[12px] font-bold text-[#ee2229] hover:underline">View All Activities</button>
            </div>
            <div className="divide-y divide-gray-50">
              {[
                { title: 'Itinerary Editor', desc: 'Modify day-by-day plans for existing tours.', link: '/admin/tours', icon: Map, color: 'bg-blue-500' },
                { title: 'Visa Center', desc: 'Update visa requirements and pricing for countries.', link: '/admin/visa', icon: CheckCircle2, color: 'bg-green-500' },
              ].map((item, i) => (
                <Link key={i} href={item.link} className="flex items-center gap-6 p-6 hover:bg-gray-50 transition-colors group">
                  <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[16px] font-bold text-[#191974] mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-[#ee2229] transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* System Health / Recent Activity */}
        <div className="space-y-6">
          <div className="bg-[#191974] text-white rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4">Admin Resources</h3>
              <p className="text-white/60 text-sm mb-8">Access training materials and documentation for the itinerary system.</p>
              <button className="w-full bg-white/10 hover:bg-white/20 border border-white/10 py-3 rounded-xl text-sm font-bold transition-all">
                Download PDF Guide
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-[16px] font-bold text-[#191974] mb-6 border-b border-gray-50 pb-4">Version History</h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0"></div>
                  <div>
                    <p className="text-sm font-bold text-[#191974]">V2.4.1 Itinerary Sync</p>
                    <p className="text-[11px] text-gray-400">Published by Admin â€¢ 2h ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
