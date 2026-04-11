"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Inbox, 
  TrendingUp, 
  Briefcase, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
  ChevronRight
} from 'lucide-react';

export default function CRMDashboard() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black text-[#0F172A] mb-2 tracking-tight">Control Center</h1>
          <p className="text-gray-500 text-lg">Real-time overview of business operations and transactional data.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Generate Report
          </button>
          <button className="bg-[#ee2229] hover:bg-[#d61e24] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            New Agent Onboarding
          </button>
        </div>
      </div>

      {/* High-Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Total Revenue', value: 'â‚¹42.8L', change: '+12.5%', trends: 'up', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Active Bookings', value: '156', change: '+8.2%', trends: 'up', icon: Inbox, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Monthly Leads', value: '1,284', change: '-2.4%', trends: 'down', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Agent Partners', value: '84', change: '+4.1%', trends: 'up', icon: Briefcase, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold ${stat.trends === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.change}
                {stat.trends === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              </div>
            </div>
            <p className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-[#0F172A]">{loading ? '...' : stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Bookings Queue */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-[#0F172A]">Recent Operations Queue</h2>
                <p className="text-xs text-gray-400 mt-1 font-medium">Pending actions from website enquiries</p>
              </div>
              <button className="text-[12px] font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">Process All Queue</button>
            </div>
            <div className="divide-y divide-gray-50">
              {[
                { type: 'Booking', customer: 'Anitha Sharma', tour: 'Europe Splendors', status: 'Pending Payment', time: '12m ago' },
                { type: 'Lead', customer: 'Rajesh Kumar', tour: 'Dubai Gateway', status: 'Follow-up Needed', time: '45m ago' },
                { type: 'Verification', customer: 'Global Travels', tour: 'Agent Onboarding', status: 'KYC Pending', time: '2h ago' },
                { type: 'Refund', customer: 'Suresh Raina', tour: 'Maldives Retreat', status: 'Processing', time: '5h ago' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-6 hover:bg-gray-50 transition-colors group">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:shadow-sm transition-all">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <h4 className="text-[15px] font-bold text-[#0F172A]">{item.customer}</h4>
                      <span className="text-[10px] font-black uppercase tracking-tighter text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">{item.type}</span>
                    </div>
                    <p className="text-sm text-gray-500">{item.tour}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#0F172A]">{item.status}</p>
                    <p className="text-[11px] text-gray-400">{item.time}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all cursor-pointer">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="space-y-8">
          <div className="bg-[#0F172A] text-white rounded-[32px] p-8 relative overflow-hidden shadow-2xl shadow-slate-900/20">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-xl shadow-blue-600/40">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Revenue Projection</h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">Estimated Q3 growth based on current lead conversion rates and seasonal trends.</p>
              <button className="w-full bg-white text-[#0F172A] py-4 rounded-xl text-sm font-black transition-all hover:scale-[1.02] active:scale-95 shadow-lg">
                View Full Analysis
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8">
            <h3 className="text-lg font-bold text-[#0F172A] mb-8 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              System Integrity
            </h3>
            <div className="space-y-6">
              {[
                { label: 'Database Sync', status: 'Healthy', color: 'bg-emerald-500' },
                { label: 'Payment Gateway', status: 'Online', color: 'bg-emerald-500' },
                { label: 'Lead API', status: 'Latency: 42ms', color: 'bg-amber-500' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-600">{item.label}</span>
                    <span className="font-bold text-[#0F172A]">{item.status}</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all`} style={{ width: i === 2 ? '65%' : '100%' }}></div>
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
