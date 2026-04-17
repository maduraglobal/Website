"use client";

import React, { useState, useEffect } from 'react';
import {
  Users,
  Map,
  MapPin,
  TrendingUp,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  Globe,
  Star,
  Plus,
  Zap,
  FileText
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { AdminHeader, AdminCard, Badge } from './components/AdminUI';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    tours: 0,
    destinations: 0,
    leads: 0,
    bookings: 0
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchStats() {
      const [tours, dests, leads, bookings] = await Promise.all([
        supabase.from('tours').select('*', { count: 'exact', head: true }),
        supabase.from('destinations').select('*', { count: 'exact', head: true }),
        supabase.from('leads').select('*', { count: 'exact', head: true }),
        supabase.from('bookings').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        tours: tours.count || 0,
        destinations: dests.count || 0,
        leads: leads.count || 0,
        bookings: bookings.count || 0
      });
      setLoading(false);
    }
    fetchStats();
  }, [supabase]);

  const statCards = [
    { label: 'Active Tours', value: stats.tours, icon: <Map className="w-5 h-5" />, color: 'bg-blue-600', trend: '+12% growth' },
    { label: 'Market Dests', value: stats.destinations, icon: <Globe className="w-5 h-5" />, color: 'bg-[#ee2229]', trend: 'Global Matrix' },
    { label: 'Lead Velocity', value: stats.leads, icon: <Users className="w-5 h-5" />, color: 'bg-[#191974]', trend: 'Organic flow' },
    { label: 'Conversions', value: stats.bookings, icon: <CheckCircle2 className="w-5 h-5" />, color: 'bg-emerald-600', trend: 'Live Ledger' }
  ];

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Admin Command Center"
        description="Real-time operational overview and technical infrastructure health."
        icon={ShieldCheck}
        breadcrumbs={[{ label: 'System Control' }]}
        actions={
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 shadow-sm animate-pulse">
            <Zap className="w-4 h-4 fill-emerald-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Network Live</span>
          </div>
        }
      />

      {/* Main Stats Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-full translate-x-1/2 -translate-y-1/2 opacity-50 group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-2xl ${stat.color} text-white flex items-center justify-center shadow-lg group-hover:rotate-12 transition-all`}>
                {stat.icon}
              </div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-3xl font-black text-[#191974] tracking-tight">{loading ? '--' : stat.value}</p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1 italic">{stat.label}</p>
                </div>
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-lg italic">{stat.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <AdminCard
            title="Live Event Stream"
            noPadding
            headerAction={<button className="text-[10px] font-black text-[#ee2229] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">Full Audit Log</button>}
          >
            <div className="divide-y divide-gray-50">
              {[
                { type: 'Booking', title: 'Confirmed Swiss Alps Package #492', time: '2 mins ago', icon: <MapPin className="w-4 h-4 text-[#ee2229]" /> },
                { type: 'Update', title: 'Itinerary v2.4 synced for "Classic Paris"', time: '1 hour ago', icon: <Clock className="w-4 h-4 text-blue-500" /> },
                { type: 'Lead', title: 'Luxury enquiry received from Rahul Sharma', time: '3 hours ago', icon: <Users className="w-4 h-4 text-[#191974]" /> },
                { type: 'Content', title: 'Blog "Top Tokyo Spots" staged to Draft', time: '5 hours ago', icon: <Star className="w-4 h-4 text-amber-500" /> }
              ].map((activity, i) => (
                <div key={i} className="px-8 py-6 flex items-center justify-between hover:bg-gray-50/50 transition-all group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-white border border-transparent group-hover:border-gray-100 transition-all shadow-sm">
                      {activity.icon}
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#191974] group-hover:text-[#ee2229] transition-colors">{activity.title}</p>
                      <p className="text-[9px] text-gray-300 uppercase font-black tracking-widest mt-1 italic">{activity.type} · {activity.time}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-100 group-hover:text-[#ee2229] transition-all" />
                </div>
              ))}
            </div>
          </AdminCard>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
          <AdminCard title="Quick Fire Actions">
            <div className="space-y-4">
              <Link href="/admin/tours/new" className="w-full flex items-center justify-between p-5 rounded-2xl bg-[#191974] text-white hover:bg-[#ee2229] transition-all group shadow-xl shadow-[#191974]/10">
                <div className="flex items-center gap-3">
                  <Plus className="w-5 h-5" />
                  <span className="text-[11px] font-black uppercase tracking-widest">Launch Package</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/admin/blogs/new" className="w-full flex items-center justify-between p-5 rounded-2xl bg-white border border-gray-100 text-[#191974] hover:border-[#ee2229] hover:text-[#ee2229] transition-all group">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5" />
                  <span className="text-[11px] font-black uppercase tracking-widest">New Story</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-20 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-50">
              <div className="p-6 rounded-4xl bg-gray-50 border border-gray-100 text-center">
                <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 italic">System Health</h5>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[13px] font-black text-[#191974]">Encrypted DB Sync</span>
                </div>
                <p className="text-[10px] font-bold text-gray-400 italic">Connected to maduratravel_ops_v1</p>
              </div>
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
