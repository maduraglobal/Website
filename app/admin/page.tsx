"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Settings, Shield } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import AdminTabs from './components/AdminTabs';

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = '/';
        return;
      }
      const { data } = await supabase.from('admin_users').select('*').eq('email', session.user.email).single();
      setIsAdmin(!!data);
    }
    checkAuth();
  }, []);

  if (isAdmin === null) {
    return <div className="h-[60vh] flex items-center justify-center text-gray-500 font-bold">Verifying Admin Access...</div>;
  }

  if (isAdmin === false) {
    return <div className="h-[60vh] flex items-center justify-center text-red-500 font-bold">Unauthorized. Administrator privileges required.</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            <h1 className="text-3xl font-black text-[#191974] tracking-tight">System Master dashboard</h1>
          </div>
          <p className="text-gray-500 font-medium pl-11">Unified Content Delivery & Database Management</p>
        </div>
      </div>

      {/* Tabs Layout */}
      <AdminTabs />
    </div>
  );
}
