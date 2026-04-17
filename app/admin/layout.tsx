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

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

import LogoutButton from '@/app/components/admin/LogoutButton';

export default async function AdminLayout({
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
    redirect('/en-in'); // Fallback to home where they can open the Login modal
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#191974] text-white flex flex-col fixed h-full z-50">
        <div className="p-6 border-b border-white/10">
          <Link href="/en-in" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-[#ee2229] group-hover:bg-white rounded-lg flex items-center justify-center font-bold group-hover:text-[#ee2229] transition-all">M</div>
            <div>
              <span className="text-xl font-bold tracking-tight block">Madura Admin</span>
              <span className="text-[10px] text-white/40 group-hover:text-white/60 transition-colors">← Back to Website</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1 mt-2 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 bg-white/5 text-white rounded-lg font-medium text-sm transition-colors">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          
          <div className="pt-4 pb-1 px-3 text-[10px] uppercase tracking-widest text-white/40 font-bold">Inventory</div>
          
          <Link href="/admin/tours" className="flex items-center gap-3 px-3 py-2.5 text-white/70 hover:bg-white/5 hover:text-white rounded-lg transition-colors font-medium text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            Tours
          </Link>
          
          <Link href="/admin/itineraries" className="flex items-center gap-3 px-3 py-2.5 text-white/70 hover:bg-white/5 hover:text-white rounded-lg transition-colors font-medium text-sm">
            <Map className="w-4 h-4" />
            Itineraries
          </Link>

          <div className="pt-4 pb-1 px-3 text-[10px] uppercase tracking-widest text-white/40 font-bold">Geography</div>
          
          <Link href="/admin/destinations" className="flex items-center gap-3 px-3 py-2.5 text-white/70 hover:bg-white/5 hover:text-white rounded-lg transition-colors font-medium text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Destinations
          </Link>
          
          <Link href="/admin/categories" className="flex items-center gap-3 px-3 py-2.5 text-white/70 hover:bg-white/5 hover:text-white rounded-lg transition-colors font-medium text-sm">
            <FolderTree className="w-4 h-4" />
            Categories
          </Link>

          <div className="pt-4 pb-1 px-3 text-[10px] uppercase tracking-widest text-white/40 font-bold">Media & Content</div>
          
          <Link href="/admin/blogs" className="flex items-center gap-3 px-3 py-2.5 text-white/70 hover:bg-white/5 hover:text-white rounded-lg transition-colors font-medium text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
            Blogs
          </Link>

          <Link href="/admin/media" className="flex items-center gap-3 px-3 py-2.5 text-white/70 hover:bg-white/5 hover:text-white rounded-lg transition-colors font-medium text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Media Management
          </Link>
          
          <div className="pt-4 pb-1 px-3 text-[10px] uppercase tracking-widest text-white/40 font-bold">System</div>
          
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 text-white/70 hover:bg-white/5 hover:text-white rounded-lg transition-colors font-medium text-sm">
            <Settings className="w-4 h-4" />
            General Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <LogoutButton />
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
