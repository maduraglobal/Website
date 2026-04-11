"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { BookCheck, BadgePercent, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const params = useParams();
  const region = (params?.region as string) || 'in';
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if already logged in
  React.useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        let isAdmin = false;
        if (session.user.email) {
          const { data } = await supabase.from('admin_users').select('email').eq('email', session.user.email).single();
          if (data) isAdmin = true;
        }

        if (isAdmin) {
          router.push('/admin');
        } else {
          router.push(`/${region}`);
        }
      }
    };
    checkUser();
  }, [supabase, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (authError) {
      setError("Incorrect email or password. Please try again.");
      setLoading(false);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    let isAdmin = false;
    if (user?.email) {
      const { data } = await supabase.from('admin_users').select('email').eq('email', user.email).single();
      if (data) isAdmin = true;
    }

    if (isAdmin) {
      router.push('/admin');
    } else if (user) {
      // Create a lead in CRM for normal user login
      try {
        await supabase.from('leads').insert([{
          email: user.email,
          first_name: user.user_metadata?.first_name || '',
          last_name: user.user_metadata?.last_name || '',
          phone: user.user_metadata?.phone || '',
          source: 'Website Login',
          status: 'New'
        }]);
      } catch (err) {
        console.error("Failed to create login lead:", err);
      }
      router.push(`/${region}`);
    }
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background flex">

      {/* Left Panel â€” Branding */}
      <div className="hidden lg:flex w-1/2 bg-[#191974] relative overflow-hidden flex-col justify-between p-12">
        {/* Decorative blobs */}
        <div className="absolute top-[-150px] right-[-150px] w-[500px] h-[500px] bg-[#ee2229] opacity-15 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#00a1e5] opacity-10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#f4a021] opacity-5 rounded-full blur-[100px]"></div>

        {/* Content */}
        <div className="relative z-10">
          <Link href={`/${region}`} className="inline-block mb-16">
            <span className="text-[28px] font-bold text-white tracking-tight">Madura Travel</span>
          </Link>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-md">
          <h1 className="text-[42px] font-bold text-white leading-tight mb-6">
            Welcome Back,<br />Explorer.
          </h1>
          <p className="text-white/70 text-[16px] leading-relaxed mb-10">
            Sign in to manage your bookings, track itineraries, and access exclusive member-only deals on premium international tours.
          </p>

          {/* Feature pills */}
          <div className="flex flex-col gap-4">
            {[
              { icon: BookCheck, text: "Manage your bookings in one place" },
              { icon: BadgePercent, text: "Access member-exclusive pricing" },
              { icon: Sparkles, text: "Get personalized recommendations" }
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <f.icon className="w-5 h-5 text-[#ee2229] shrink-0" />
                <span className="text-white/90 text-[14px] font-medium">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-white/40 text-[12px]">© 2026 Madura Travel. All rights reserved.</p>
        </div>
      </div>

      {/* Right Panel â€” Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="lg:hidden mb-10 text-center">
            <Link href={`/${region}`} className="inline-block">
              <span className="text-[24px] font-bold text-[#191974] ">Madura Travel</span>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-[32px] font-bold text-[#171717] mb-2">Sign In</h2>
            <p className="text-[15px] text-gray-500 ">Enter your credentials to access your account.</p>
          </div>

          {/* Social Login */}
          <div className="flex gap-3 mb-8">
            <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 py-3 rounded-xl text-[14px] font-semibold text-[#171717] hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 py-3 rounded-xl text-[14px] font-semibold text-[#171717] hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              Facebook
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-[12px] text-gray-400 font-bold  tracking-widest">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600 tracking-wide  px-1">Email Address</label>
              <input
                required
                type="email"
                placeholder="you@example.com"
                className="border border-gray-200 p-3.5 rounded-xl text-[14px] outline-none focus:border-[#191974] focus:ring-2 focus:ring-[#191974]/10 transition-all bg-gray-50 focus:bg-white"
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[12px] font-bold text-gray-600 tracking-wide  px-1">Password</label>
                <Link href="#" className="text-[12px] text-[#ee2229] font-bold hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  className="w-full border border-gray-200 p-3.5 rounded-xl text-[14px] outline-none focus:border-[#191974] focus:ring-2 focus:ring-[#191974]/10 transition-all bg-gray-50 focus:bg-white pr-12"
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded text-[#191974] focus:ring-[#191974] w-4 h-4 cursor-pointer" />
              <label htmlFor="remember" className="text-[13px] text-gray-600 cursor-pointer">Remember me for 30 days</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ee2229] hover:bg-[#d61e24] disabled:bg-gray-300 text-white py-4 rounded-xl font-bold text-[16px] transition-all shadow-md hover:-translate-y-0.5 hover:shadow-lg mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-[14px] text-gray-500 mt-8">
            Don&apos;t have an account?{' '}
            <Link href={`/${region}/signup`} className="text-[#191974] font-bold hover:underline">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
