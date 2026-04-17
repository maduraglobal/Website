import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import AdminLayoutClient from './components/AdminLayoutClient';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // DEBUG: Log the attempting email to server terminal
  console.log('Admin Access Attempt:', user?.email);

  if (!user) {
    redirect('/en-in');
  }

  // Development Bypass: If on localhost, allow access if logged in
  const isLocal = process.env.NODE_ENV === 'development';
  
  // Check if user is an admin (Case-Insensitive)
  const { data: adminRecord } = await supabase
    .from('admin_users')
    .select('email')
    .ilike('email', user.email || '')
    .single();

  if (!adminRecord && !isLocal) {
    console.log('Access Denied for:', user.email);
    redirect('/en-in');
  }

  return (
    <AdminLayoutClient userEmail={user.email || ''}>
      {children}
    </AdminLayoutClient>
  );
}
