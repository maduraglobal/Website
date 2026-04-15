import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck,
  User,
  Bell,
  Inbox,
  CreditCard
} from 'lucide-react';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let isAdmin = false;
  if (user?.email) {
    const { data } = await supabase.from('admin_users').select('email').eq('email', user.email).single();
    if (data) isAdmin = true;
  }

  if (!user || !isAdmin) {
    redirect('/en-in');
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0F172A] text-white flex flex-col fixed h-full z-50">
        <div className="p-8 border-b border-white/5">
          <Link href="/crm" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#ee2229] rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-red-500/20">C</div>
            <div>
              <span className="text-xl font-bold tracking-tight block leading-none">Madura CRM</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 block">Control System</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-6 space-y-1 mt-4">
          <Link href="/crm" className="flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-xl text-white font-semibold shadow-lg shadow-blue-500/20">
            <LayoutDashboard className="w-5 h-5" />
            Control Center
          </Link>

          <div className="pt-4 pb-2 px-4">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Operations</span>
          </div>

          <Link href="/crm/bookings" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-all font-medium group">
            <Inbox className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
            Bookings Panel
          </Link>
          <Link href="/crm/leads" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-all font-medium group">
            <Users className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
            Leads Management
          </Link>
          <Link href="/crm/agents" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-all font-medium group">
            <Briefcase className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
            Agents Portal
          </Link>

          <div className="pt-4 pb-2 px-4">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Financials</span>
          </div>

          <Link href="/crm/revenue" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-all font-medium group">
            <BarChart3 className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
            Revenue Dashboard
          </Link>
          <Link href="/crm/payments" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-all font-medium group">
            <CreditCard className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
            Transactions
          </Link>
        </nav>

        <div className="p-6 border-t border-white/5">
          <Link href="/crm/settings" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors font-medium mb-2">
            <Settings className="w-5 h-5" />
            System Settings
          </Link>
          <button className="flex items-center gap-3 px-4 py-3 w-full text-red-400/70 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all font-medium">
            <LogOut className="w-5 h-5" />
            Logout System
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-40">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-gray-600">Enterprise CRM</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#0F172A] font-bold">Main Dashboard</span>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Server Status: Optimal</span>
            </div>

            <button className="relative w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#0F172A] transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#ee2229] rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-4 pl-8 border-l border-gray-100">
              <div className="text-right">
                <span className="text-sm font-bold text-[#0F172A] block leading-none">System Admin</span>
                <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Superuser</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <User className="w-6 h-6" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
