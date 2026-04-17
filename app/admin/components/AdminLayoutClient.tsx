'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Map,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck,
  User,
  Bell,
  Menu,
  X,
  Globe,
  FolderTree,
  FileText,
  Image as ImageIcon,
  Compass,
  ArrowUpRight
} from 'lucide-react';

import LogoutButton from '@/app/components/admin/LogoutButton';

interface AdminLayoutClientProps {
  children: React.ReactNode;
  userEmail: string;
}

export default function AdminLayoutClient({
  children,
  userEmail
}: AdminLayoutClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" />, type: 'main' },
    { type: 'header', label: 'Inventory' },
    { label: 'Tours', href: '/admin/tours', icon: <Compass className="w-4 h-4" />, type: 'main' },
    { label: 'Itineraries', href: '/admin/itineraries', icon: <Map className="w-4 h-4" />, type: 'main' },
    { type: 'header', label: 'Geography' },
    { label: 'Destinations', href: '/admin/destinations', icon: <Globe className="w-4 h-4" />, type: 'main' },
    { label: 'Categories', href: '/admin/categories', icon: <FolderTree className="w-4 h-4" />, type: 'main' },
    { type: 'header', label: 'Media & Content' },
    { label: 'Blogs', href: '/admin/blogs', icon: <FileText className="w-4 h-4" />, type: 'main' },
    { label: 'Visas', href: '/admin/visas', icon: <ShieldCheck className="w-4 h-4" />, type: 'main' },
    { label: 'Media Management', href: '/admin/media', icon: <ImageIcon className="w-4 h-4" />, type: 'main' },
    { type: 'header', label: 'System' },
    { label: 'General Settings', href: '/admin/settings', icon: <Settings className="w-4 h-4" />, type: 'main' },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#191974] text-white">
      <div className="p-6 border-b border-white/10">
        <Link href="/en-in" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-linear-to-br from-[#ee2229] to-[#ff4d4d] rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-[#ee2229]/20 transition-transform group-hover:scale-110">M</div>
          <div>
            <span className="text-lg font-black tracking-tight block leading-tight">Madura <span className="text-[#ee2229]">Ops</span></span>
            <span className="text-[10px] text-white/40 group-hover:text-white/60 transition-colors uppercase tracking-widest font-bold">Admin Portal</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {navItems.map((item, idx) => {
          if (item.type === 'header') {
            return (
              <div key={idx} className="pt-6 pb-2 px-3 text-[10px] uppercase tracking-[0.2em] text-white/30 font-black">
                {item.label}
              </div>
            );
          }

          const isActive = pathname === item.href;

          return (
            <Link
              key={idx}
              href={item.href || '#'}
              className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 group ${isActive
                ? 'bg-white text-[#191974] shadow-xl shadow-#000/20'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
            >
              <div className="flex items-center gap-3">
                <span className={`${isActive ? 'text-[#ee2229]' : 'text-white/30 group-hover:text-white/60'}`}>
                  {item.icon}
                </span>
                {item.label}
              </div>
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#ee2229]" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="bg-white/5 rounded-2xl p-4 mb-4 hidden lg:block">
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Live Support</p>
          <p className="text-xs text-white/70 leading-relaxed text-balance">Need help managing your tours? Check our documentation.</p>
          <button className="mt-3 text-[11px] font-bold text-[#ee2229] flex items-center gap-1 hover:gap-2 transition-all uppercase tracking-widest">
            Open Guides <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
        <LogoutButton />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 fixed h-full z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-10040 lg:hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
        <div
          className={`absolute inset-0 bg-#000/60 backdrop-blur-sm transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className={`absolute top-0 left-0 bottom-0 w-72 bg-[#191974] transform transition-transform duration-500 ease-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <SidebarContent />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 -right-12 w-10 h-10 bg-[#ee2229] text-white flex items-center justify-center rounded-xl font-bold"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen relative overflow-y-auto">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-40 transition-all duration-300">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[#191974] bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-gray-400">
              <span className="hover:text-[#191974] cursor-pointer transition-colors">Admin</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#ee2229]">Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-8">
            <div className="hidden md:flex items-center bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl focus-within:ring-2 focus-within:ring-[#191974]/10 transition-all group">
              <svg className="w-4 h-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" placeholder="Global search..." className="bg-transparent text-sm font-medium outline-none text-[#191974] placeholder:text-gray-400 w-48" />
            </div>

            <div className="flex items-center gap-3 lg:gap-6 pl-4 lg:pl-8 border-l border-gray-100">
              <button className="relative w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#ee2229] hover:bg-red-50 rounded-xl transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#ee2229] rounded-full border-2 border-white animate-pulse shadow-sm"></span>
              </button>

              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="text-right hidden sm:flex flex-col">
                  <span className="text-[13px] font-black text-[#191974] group-hover:text-[#ee2229] transition-colors leading-none mb-1">{userEmail.split('@')[0]}</span>
                  <span className="text-[9px] text-green-500 font-black uppercase tracking-widest">Master Admin</span>
                </div>
                <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-linear-to-tr from-gray-100 to-gray-50 border border-gray-100 flex items-center justify-center shadow-sm group-hover:border-[#ee2229] group-hover:shadow-lg group-hover:bg-white transition-all overflow-hidden bg-white">
                  <User className="w-5 h-5 text-gray-400 group-hover:text-[#ee2229] transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-6 lg:p-10 container mx-auto flex-1">
          {children}
        </div>

        {/* Footer */}
        <footer className="px-10 py-6 text-center border-t border-gray-50/50 bg-white/50">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
            © 2026 Madura Travel Service (P) Ltd. · Internal Infrastructure
          </p>
        </footer>
      </div>
    </div>
  );
}
