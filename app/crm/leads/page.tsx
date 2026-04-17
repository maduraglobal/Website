"use client";

import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Search, Mail, Loader2, UserCheck, Clock, MoreVertical } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function LeadsPanel() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const supabase = createClient();

  useEffect(() => {
    async function fetchLeads() {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) setLeads(data);
      setLoading(false);
    }
    fetchLeads();
  }, [supabase]);

  const filteredLeads = leads.filter(lead =>
    (lead.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (lead.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2 tracking-tight">Leads & Enquiries</h1>
          <p className="text-gray-500">Track and respond to potential customer enquiries from the website.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg shadow-blue-500/20 flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Add Manual Lead
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search leads by name or email..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-sm focus:outline-none focus:border-blue-500/20 focus:bg-white transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Loading Leads...</p>
          </div>
        ) : filteredLeads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest px-6 h-12">
                  <th className="px-6">Customer Name</th>
                  <th className="px-6">Contact Info</th>
                  <th className="px-6">Source</th>
                  <th className="px-6">Assigned To</th>
                  <th className="px-6">Status</th>
                  <th className="px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                          {lead.name?.[0] || 'L'}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#0F172A]">{lead.name || 'No Name'}</p>
                          <p className="text-[11px] text-gray-400">Leads ID: #{lead.id.slice(0, 5)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{lead.email}</p>
                      <p className="text-[11px] text-gray-400">{lead.phone || 'No Phone'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded uppercase tracking-tighter">
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {lead.assigned_to ? (
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-3.5 h-3.5 text-green-500" />
                          <span className="text-sm font-medium text-gray-700">{lead.assigned_to}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-rose-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-sm font-bold animate-pulse">NOT ASSIGNED</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                        lead.status === 'New' ? 'bg-blue-50 text-blue-600' :
                        lead.status === 'Contacted' ? 'bg-amber-50 text-amber-600' :
                        'bg-emerald-50 text-emerald-600'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-white rounded-lg transition-all group">
                        <MoreVertical className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-10">
            <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-6">
              <Mail className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">Queue is Clear</h3>
            <p className="text-gray-500 max-w-xs mx-auto">There are no new leads to process at the moment. Great job!</p>
          </div>
        )}
      </div>
    </div>
  );
}
