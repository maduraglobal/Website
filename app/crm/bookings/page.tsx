"use client";

import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  Filter, 
  Download, 
  Search, 
  RefreshCw, 
  ChevronRight,
  CreditCard,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

export default function BookingsPanel() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchBookings();
  }, [filterStatus]);

  async function fetchBookings() {
    setLoading(true);
    const url = filterStatus === "all" ? "/api/bookings" : `/api/bookings?status=${filterStatus}`;
    const res = await fetch(url);
    const data = await res.json();
    setBookings(data);
    setLoading(false);
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed': return <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" /> Confirmed</span>;
      case 'pending': return <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5"><Clock className="w-3 h-3" /> Pending</span>;
      case 'payment_initiated': return <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5"><CreditCard className="w-3 h-3" /> Initiated</span>;
      case 'failed': return <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5"><XCircle className="w-3 h-3" /> Failed</span>;
      default: return <span className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">{status}</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-[32px] font-bold text-[#0F172A] mb-2 tracking-tight">Financial Bookings Matrix</h1>
          <p className="text-gray-500 font-medium">Monitoring global transaction lifecycles and revenue generation.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchBookings}
            className="w-10 h-10 bg-white border border-gray-100 text-gray-400 hover:text-blue-600 rounded-xl flex items-center justify-center transition-all shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-blue-500/20 flex items-center gap-2 hover:bg-blue-700 transition-all">
            <Download className="w-4 h-4" />
            Financial Export
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Confirmed Revenue', value: 'A$ 124,500', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Pending Volume', value: '42 Orders', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Initiated Flux', value: 'A$ 12,200', icon: CreditCard, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Conversion Rate', value: '24.5%', icon: AlertCircle, color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
              <p className="text-xl font-bold text-[#0F172A]">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
        <div className="p-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
           {/* Tab Filters */}
           <div className="flex bg-gray-50 p-1 rounded-xl gap-1">
             {["all", "confirmed", "pending", "failed"].map(s => (
               <button 
                 key={s}
                 onClick={() => setFilterStatus(s)}
                 className={`px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${filterStatus === s ? 'bg-white text-[#0F172A] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
               >
                 {s}
               </button>
             ))}
           </div>

          <div className="relative w-full md:w-[350px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Filter by customer or tour ID..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>
        
        {loading ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center gap-4 text-gray-300">
             <div className="w-10 h-10 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin" />
             <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Syncing Ledger...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-10">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <Inbox className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">No Transaction Records</h3>
            <p className="text-gray-500 max-w-xs mx-auto text-sm">No bookings currently match your matrix filters. Sync the ledger to check for new entries.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Customer</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Package</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Date</th>
                  <th className="px-6 py-4 text-right border-b border-gray-100"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-[#0F172A]">{booking.leads?.name || 'Guest User'}</span>
                        <span className="text-[11px] text-gray-400">{booking.leads?.email || 'no-email@maduratravel.com'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#191974] flex items-center justify-center text-white text-[10px] font-bold">M</div>
                        <span className="text-[13px] font-medium text-gray-600">{booking.tours?.title || 'Custom Tour'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[14px] font-bold text-[#0F172A]">A$ {booking.amount?.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-5">
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[12px] text-gray-400 font-medium">
                        {new Date(booking.created_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
