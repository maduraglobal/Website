"use client";

import React from 'react';
import { BarChart3, TrendingUp, Calendar, Download } from 'lucide-react';

export default function RevenueDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2 tracking-tight">Revenue Analytics</h1>
          <p className="text-gray-500">Comprehensive overview of financial performance and growth trends.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg shadow-blue-500/20 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Booking Revenue', value: 'â‚¹28,45,000', icon: TrendingUp, color: 'text-blue-600' },
          { label: 'Agent Commission', value: 'â‚¹3,12,000', icon: BarChart3, color: 'text-purple-600' },
          { label: 'Net Profit', value: 'â‚¹25,33,000', icon: TrendingUp, color: 'text-emerald-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
            <p className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-2">{stat.label}</p>
            <h3 className={`text-3xl font-black ${stat.color}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-10 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-8">
          <BarChart3 className="w-12 h-12 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Analytics Engine Initializing</h3>
        <p className="text-gray-500 max-w-md text-center">We are aggregating data from multiple channels to provide you with the most accurate financial insights.</p>
      </div>
    </div>
  );
}
