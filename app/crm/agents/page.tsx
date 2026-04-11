"use client";

import React from 'react';
import { Briefcase, Plus, Search, MapPin } from 'lucide-react';

export default function AgentsPanel() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2 tracking-tight">Agent Network</h1>
          <p className="text-gray-500">Manage B2B partners and travel agents connected to the system.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg shadow-blue-500/20 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Register New Agent
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search agents by agency name or location..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
        
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-10">
          <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-6">
            <Briefcase className="w-10 h-10 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-[#0F172A] mb-2">No Active Agents</h3>
          <p className="text-gray-500 max-w-xs mx-auto">Start building your network by registering your first travel agent partner.</p>
        </div>
      </div>
    </div>
  );
}
