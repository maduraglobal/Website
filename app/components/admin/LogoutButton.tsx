"use client";

import React from 'react';
import { LogOut } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function LogoutButton() {
  const supabase = React.useMemo(() => createClient(), []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut({ scope: 'global' });
      // Clear cookies for extra safety
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      window.location.replace('/en-in');
    } catch (error) {
      console.error('Logout failed:', error);
      window.location.replace('/en-in');
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-3 px-4 py-3 w-full text-white/50 hover:text-red-400 transition-colors font-medium"
    >
      <LogOut className="w-5 h-5" />
      Logout
    </button>
  );
}
