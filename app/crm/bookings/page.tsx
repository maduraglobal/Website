"use client";

import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  Search, 
  Filter, 
  ChevronDown, 
  Calendar, 
  Download, 
  RefreshCw,
  MoreVertical,
  ArrowUpRight,
  Globe
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { formatRegionalPrice } from '@/config/country';

export default function BookingsPanel() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    country: 'all',
    search: ''
  });
  const supabase = createClient();

  useEffect(() => {
    fetchBookings();
  }, [filters.status, filters.country]);

  async function fetchBookings() {
    setLoading(true);
    let query = supabase
      .from('bookings')
      .select('*, leads(name, email, phone)')
      .order('created_at', { ascending: false });

    if (filters.status !== 'all') query = query.eq('status', filters.status);
    if (filters.country !== 'all') query = query.eq('region', filters.country);

    const { data, error } = await query;
    if (data) setBookings(data);
    setLoading(false);
  }

  const filteredBookings = bookings.filter(b => 
    b.leads?.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
    b.tour_name?.toLowerCase().includes(filters.search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'payment_initiated': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'failed': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-gray-50 text-gray-500 border-gray-100';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#0F172A] mb-2 tracking-tight">Transactional Ledger</h1>
          <p className="text-gray-500 font-medium italic">Operational oversight for all travel bookings and cross-border payments.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 text-gray-600 px-6 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button 
             onClick={fetchBookings}
             className="w-12 h-12 bg-[#0F172A] text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg shadow-slate-900/10"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-wrap items-center gap-6">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search by customer name, email or tour..." 
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
            className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 pl-11 pr-4 py-3 rounded-xl outline-none transition-all text-sm font-medium"
          />
        </div>
        
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Filters:</span>
           </div>
           
           <select 
             value={filters.status}
             onChange={(e) => setFilters({...filters, status: e.target.value})}
             className="bg-gray-50 border-none text-sm font-bold text-[#0F172A] px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
           >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="payment_initiated">Initiated</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
           </select>

           <select 
             value={filters.country}
             onChange={(e) => setFilters({...filters, country: e.target.value})}
             className="bg-gray-50 border-none text-sm font-bold text-[#0F172A] px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
           >
              <option value="all">All Countries</option>
              <option value="en-in">India (INR)</option>
              <option value="en-au">Australia (AUD)</option>
              <option value="en-us">United States (USD)</option>
           </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">Customer & Tour</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">Transaction Group</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">Lifecycle Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">Date & Region</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array(6).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-6"><div className="h-5 bg-gray-100 rounded w-48" /></td>
                    <td className="px-8 py-6"><div className="h-5 bg-gray-100 rounded w-24" /></td>
                    <td className="px-8 py-6"><div className="h-5 bg-gray-100 rounded w-32" /></td>
                    <td className="px-8 py-6"><div className="h-5 bg-gray-100 rounded w-24 ml-auto" /></td>
                    <td className="px-8 py-6"><div className="h-5 bg-gray-100 rounded w-10 ml-auto" /></td>
                  </tr>
                ))
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                        <Inbox className="w-10 h-10" />
                      </div>
                      <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No bookings match your ledger filters.</p>
                    </div>
                  </td>
                </tr>
              ) : filteredBookings.map((booking) => (
                <tr key={booking.id} className="group hover:bg-gray-50/30 transition-all">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 text-[#0F172A] rounded-2xl flex items-center justify-center shadow-sm font-black text-sm group-hover:bg-[#0F172A] group-hover:text-white transition-all">
                        {booking.leads?.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-black text-[#0F172A] text-[15px] leading-tight">{booking.leads?.name || 'Unknown User'}</p>
                        <p className="text-[12px] text-gray-400 font-medium group-hover:text-blue-600 transition-colors uppercase tracking-wider mt-0.5">{booking.tour_name || 'Service Package'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-[15px] font-black text-[#0F172A]">{formatRegionalPrice(booking.total_price || 0, booking.region || 'en-in')}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Reference ID: {booking.id.split('-')[0]}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[11px] font-black uppercase tracking-widest italic ${getStatusColor(booking.status)}`}>
                       <div className="w-1.5 h-1.5 rounded-full bg-current" />
                       {booking.status.replace('_', ' ')}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                     <div className="flex flex-col">
                        <div className="flex items-center gap-2 text-gray-600">
                           <Calendar className="w-3.5 h-3.5" />
                           <span className="text-sm font-bold">{new Date(booking.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                           <Globe className="w-3.5 h-3.5 text-blue-500" />
                           <span className="text-[10px] font-black uppercase text-gray-400">{booking.region || 'IND'}</span>
                        </div>
                     </div>
                  </td>
                  <td className="px-8 py-5">
                     <div className="flex items-center justify-end gap-3">
                        <button className="w-10 h-10 bg-white border border-gray-100 text-gray-400 hover:text-blue-600 hover:border-blue-100 rounded-xl transition-all flex items-center justify-center">
                           <ArrowUpRight className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 bg-white border border-gray-100 text-gray-400 hover:text-[#0F172A] hover:bg-gray-50 rounded-xl transition-all flex items-center justify-center">
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
