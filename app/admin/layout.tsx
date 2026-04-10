import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Map, 
  Settings, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  User,
  Bell
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#191974] text-white flex flex-col fixed h-full z-50">
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#ee2229] rounded-lg flex items-center justify-center font-bold">M</div>
            <span className="text-xl font-bold tracking-tight">Admin CMS</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl text-white font-medium">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/admin/tours" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 hover:text-white rounded-xl transition-all font-medium group">
            <Map className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Tours & Itinerary
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 hover:text-white rounded-xl transition-all font-medium">
            <Settings className="w-5 h-5" />
            Platform Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-white/50 hover:text-red-400 transition-colors font-medium">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Admin</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#191974] font-bold">Dashboard Overview</span>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#191974] transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#ee2229] rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-100 italic">
              <div className="text-right flex flex-col">
                <span className="text-sm font-bold text-[#191974]">Website Admin</span>
                <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Active Session</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                <User className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
