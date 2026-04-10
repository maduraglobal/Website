"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function SignupPage() {
  const params = useParams();
  const region = (params?.region as string) || 'in';

  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordStrength = (p: string) => {
    if (p.length === 0) return { level: 0, text: '', color: '' };
    if (p.length < 6) return { level: 1, text: 'Weak', color: 'bg-red-500' };
    if (p.length < 10 || !/[A-Z]/.test(p) || !/[0-9]/.test(p)) return { level: 2, text: 'Medium', color: 'bg-yellow-500' };
    return { level: 3, text: 'Strong', color: 'bg-green-500' };
  };

  const strength = passwordStrength(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
        },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Redirect to home or show a verification message
    router.push(`/${region}`);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background flex">

      {/* Left Panel — Branding */}
      <div className="hidden lg:flex w-1/2 bg-[#191974] relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-[#00a1e5] opacity-15 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#ee2229] opacity-10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] bg-[#82c341] opacity-5 rounded-full blur-[100px]"></div>

        <div className="relative z-10">
          <Link href={`/${region}`} className="inline-block mb-16">
            <span className="text-[28px] font-bold text-white tracking-tight">Madura Travel</span>
          </Link>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-md">
          <h1 className="text-[42px] font-bold text-white leading-tight mb-6">
            Start Your<br />Journey Today.
          </h1>
          <p className="text-white/70 text-[16px] leading-relaxed mb-10">
            Create your Madura Travel account and unlock exclusive deals, personalized itineraries, and seamless booking management.
          </p>

          <div className="flex flex-col gap-4">
            {[
              { icon: "✈️", text: "Exclusive member-only tour pricing" },
              { icon: "🔔", text: "Early access to new destinations" },
              { icon: "👨‍👩‍👧‍👦", text: "Save traveler profiles for quick booking" },
              { icon: "🎁", text: "Earn loyalty points on every trip" }
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <span className="text-[20px]">{f.icon}</span>
                <span className="text-white/90 text-[14px] font-medium">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-white/40 text-[12px] ">© 2026 Madura Travel. All rights reserved.</p>
        </div>
      </div>

      {/* Right Panel — Signup Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-lg">

          <div className="lg:hidden mb-10 text-center">
            <Link href={`/${region}`} className="inline-block">
              <span className="text-[24px] font-bold text-[#191974] ">Madura Travel Service</span>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-[32px] font-bold text-[#171717] mb-2">Create Account</h2>
            <p className="text-[15px] text-gray-500 ">Join 500,000+ travelers exploring the world with us.</p>
          </div>

          {/* Social Signup */}
          <div className="flex gap-3 mb-8">
            <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 py-3 rounded-xl text-[14px] font-semibold text-[#171717] hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
              Sign up with Google
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-[12px] text-gray-400 font-bold  tracking-widest">or sign up with email</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-gray-600 tracking-wide  px-1">First Name</label>
                <input required type="text" placeholder="John" className="border border-gray-200 p-3.5 rounded-xl text-[14px] outline-none focus:border-[#191974] focus:ring-2 focus:ring-[#191974]/10 bg-gray-50 focus:bg-white transition-all" onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-gray-600 tracking-wide  px-1">Last Name</label>
                <input required type="text" placeholder="Doe" className="border border-gray-200 p-3.5 rounded-xl text-[14px] outline-none focus:border-[#191974] focus:ring-2 focus:ring-[#191974]/10 bg-gray-50 focus:bg-white transition-all" onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600 tracking-wide  px-1">Email Address</label>
              <input required type="email" placeholder="you@example.com" className="border border-gray-200 p-3.5 rounded-xl text-[14px] outline-none focus:border-[#191974] focus:ring-2 focus:ring-[#191974]/10 bg-gray-50 focus:bg-white transition-all" onChange={e => setFormData({ ...formData, email: e.target.value })} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600 tracking-wide  px-1">Phone Number</label>
              <div className="flex gap-2">
                <select className="border border-gray-200 p-3.5 rounded-xl text-[14px] bg-gray-50 text-gray-700 font-semibold shrink-0 w-[95px] outline-none focus:border-[#191974] focus:ring-2 focus:ring-[#191974]/10 focus:bg-white cursor-pointer transition-all appearance-none text-center">
                  <option value="+91">IN +91</option>
                  <option value="+1">US +1</option>
                  <option value="+44">UK +44</option>
                  <option value="+61">AU +61</option>
                  <option value="+65">SG +65</option>
                  <option value="+971">AE +971</option>
                  <option value="+81">JP +81</option>
                  <option value="+49">DE +49</option>
                  <option value="+33">FR +33</option>
                  <option value="+41">CH +41</option>
                  <option value="+86">CN +86</option>
                  <option value="+60">MY +60</option>
                  <option value="+66">TH +66</option>
                  <option value="+977">NP +977</option>
                  <option value="+94">LK +94</option>
                </select>
                <input required type="tel" placeholder="98765 43210" className="flex-1 border border-gray-200 p-3.5 rounded-xl text-[14px] outline-none focus:border-[#191974] focus:ring-2 focus:ring-[#191974]/10 bg-gray-50 focus:bg-white transition-all" onChange={e => setFormData({ ...formData, phone: e.target.value })} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600 tracking-wide  px-1">Password</label>
              <div className="relative">
                <input required type={showPassword ? "text" : "password"} placeholder="Min. 8 characters" className="w-full border border-gray-200 p-3.5 rounded-xl text-[14px] outline-none focus:border-[#191974] focus:ring-2 focus:ring-[#191974]/10 bg-gray-50 focus:bg-white transition-all pr-12" onChange={e => setFormData({ ...formData, password: e.target.value })} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </button>
              </div>
              {/* Password Strength */}
              {formData.password.length > 0 && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 flex gap-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength.level ? strength.color : 'bg-gray-200'}`}></div>
                    ))}
                  </div>
                  <span className={`text-[11px] font-bold ${strength.level === 3 ? 'text-green-600' : strength.level === 2 ? 'text-yellow-600' : 'text-red-500'}`}>{strength.text}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600 tracking-wide  px-1">Confirm Password</label>
              <input required type="password" placeholder="Re-enter password" className="border border-gray-200 p-3.5 rounded-xl text-[14px] outline-none focus:border-[#191974] focus:ring-2 focus:ring-[#191974]/10 bg-gray-50 focus:bg-white transition-all" onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} />
              {formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword && (
                <span className="text-[11px] text-red-500 font-bold mt-0.5 px-1">Passwords do not match</span>
              )}
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="rounded text-[#191974] focus:ring-[#191974] w-4 h-4 cursor-pointer mt-0.5" />
              <label htmlFor="terms" className="text-[13px] text-gray-600 cursor-pointer leading-snug">
                I agree to the <Link href="#" className="text-[#191974] font-bold hover:underline">Terms of Service</Link> and <Link href="#" className="text-[#191974] font-bold hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !agreed}
              className="w-full bg-[#ee2229] hover:bg-[#d61e24] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-[16px] transition-all shadow-md hover:-translate-y-0.5 hover:shadow-lg mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="text-center text-[14px] text-gray-500 mt-8">
            Already have an account?{' '}
            <Link href={`/${region}/login`} className="text-[#191974] font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
