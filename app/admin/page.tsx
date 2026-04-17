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
  Star
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

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
      // Fetching counts from Supabase
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
    { label: 'Active Tours', value: stats.tours, icon: <Map className="w-6 h-6" />, color: 'bg-blue-500', trend: '+12% this month' },
    { label: 'Destinations', value: stats.destinations, icon: <Globe className="w-6 h-6" />, color: 'bg-[#ee2229]', trend: 'Global coverage' },
    { label: 'Total Enquiries', value: stats.leads, icon: <Users className="w-6 h-6" />, color: 'bg-[#191974]', trend: '85% response rate' },
    { label: 'Confirmed Bookings', value: stats.bookings, icon: <CheckCircle2 className="w-6 h-6" />, color: 'bg-green-500', trend: 'Live transactional sync' }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Welcome Banner */}
      <div className="bg-[#191974] rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-[#ee2229]/5 skew-x-12 translate-x-1/4" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="space-y-4">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10 backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-[#ee2229]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Verified System Administrator</span>
             </div>
             <h1 className="text-4xl md:text-5xl font-black tracking-tight">System Master Dashboard</h1>
             <p className="text-white/50 text-lg max-w-xl font-medium italic">Your unified command center for content delivery, database integrity, and real-time website synchronization.</p>
          </div>
          <div className="h-32 w-32 rounded-full border-[10px] border-white/5 flex items-center justify-center bg-linear-to-br from-[#ee2229] to-[#191974] shadow-2xl">
             <TrendingUp className="w-12 h-12 text-white" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
            <div className="flex items-start justify-between mb-6">
               <div className={`w-14 h-14 rounded-2xl ${stat.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                 {stat.icon}
               </div>
               <div className="text-right">
                 <p className="text-3xl font-black text-[#191974]">{loading ? '...' : stat.value}</p>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{stat.label}</p>
               </div>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
               <span className="text-[10px] font-bold text-green-500">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between px-4">
              <h3 className="text-xl font-bold text-[#191974]">Live Activity Feed</h3>
              <button className="text-[11px] font-bold text-[#ee2229] uppercase tracking-widest hover:underline">View System Logs</button>
           </div>
           <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
              {[
                { type: 'Booking', title: 'New confirmed booking for Switzerland', time: '2 mins ago', icon: <MapPin className="text-[#ee2229]" /> },
                { type: 'Update', title: 'Itinerary v2.4 published for "Classic Paris"', time: '1 hour ago', icon: <Clock className="text-blue-500" /> },
                { type: 'Lead', title: 'Travel enquiry received from Rahul S.', time: '3 hours ago', icon: <Users className="text-[#191974]" /> },
                { type: 'Content', title: 'New blog post "Top 10 Tokyo Spots" drafted', time: '5 hours ago', icon: <Star className="text-yellow-500" /> }
              ].map((activity, i) => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors group">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-white transition-colors">
                        {activity.icon}
                      </div>
                      <div>
                         <p className="text-sm font-bold text-[#191974]">{activity.title}</p>
                         <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">{activity.type} · {activity.time}</p>
                      </div>
                   </div>
                   <ChevronRight className="w-4 h-4 text-gray-300" />
                </div>
              ))}
           </div>
        </div>

        {/* Quick Links / Status */}
        <div className="space-y-6">
           <div className="px-4">
              <h3 className="text-xl font-bold text-[#191974]">Quick Management</h3>
           </div>
           <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-4 italic">
              <Link href="/admin/tours/new" className="w-full bg-[#191974] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#ee2229] transition-all  shadow-lg shadow-[#191974]/10">
                <Plus className="w-5 h-5" /> Launch New Tour
              </Link>
              <Link href="/admin/blogs/new" className="w-full bg-white border-2 border-gray-100 text-[#191974] py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:border-[#191974] transition-all ">
                 New Editorial Post
              </Link>
              <div className="pt-6 border-t border-gray-50">
                 <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                       <span className="text-[11px] font-black text-green-700 uppercase tracking-widest">Real-Time Sync Active</span>
                    </div>
                    <p className="text-[10px] text-green-600/70 text-center font-medium leading-relaxed">System is communicating with Supabase DB. Frontend changes will reflect instantly.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>;
}
