"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { formatRegionalPrice } from '@/config/country';

type BookingStep = 1 | 2 | 3 | 4;

export default function BookingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const region = (params?.region as string) || 'in';
  // Attempt to grab tour parameter
  const tourSlug = searchParams?.get('tour') || 'premium-package';

  const [step, setStep] = useState<BookingStep>(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pax: '2',
    date: ''
  });

  // Mock Package Price Data
  const baseInrPrice = 245000;
  const paxNumber = parseInt(formData.pax) || 1;
  const totalBaseInrPrice = baseInrPrice * paxNumber;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep((s) => (s + 1) as BookingStep);
  };

  const initiatePayment = async () => {
    setLoading(true);
    // Mock API call for payment Init
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // POST /api/payments/init placeholder
      setStep(4); // Success step
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-16 font-arial text-[14px]">
      <div className="max-w-4xl mx-auto px-4">

        {/* STEPPER UI */}
        {step < 4 && (
          <div className="flex items-center justify-between mb-16 relative w-full lg:w-3/4 mx-auto">
            <div className="absolute left-0 top-1/2 -mt-px w-full h-[2px] bg-gray-100 -z-10"></div>
            <div className={`absolute left-0 top-1/2 -mt-px h-[2px] bg-[#ee2229] -z-10 transition-all duration-700 ease-in-out`} style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>

            {[1, 2, 3].map((st) => (
              <div key={st} className="flex flex-col items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-[15px] transition-all duration-500 border-2 ${step >= st ? 'bg-[#ee2229] text-white border-[#ee2229] shadow-lg shadow-red-500/20' : 'bg-white text-gray-300 border-gray-100'
                  }`}>
                  {step > st ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> : st}
                </div>
                <span className={`text-[11px] font-black  tracking-[0.2em] font-inter-tight ${step >= st ? 'text-[#191974]' : 'text-gray-300'}`}>
                  {st === 1 ? 'Details' : st === 2 ? 'Review' : 'Payment'}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* CONTENT AREA */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-50 overflow-hidden min-h-[600px] flex flex-col">

          {/* STEP 1: USER DETAILS */}
          {step === 1 && (
            <div className="p-10 md:p-16 flex-1 flex flex-col">
              <h2 className="text-[32px] font-black font-inter text-[#191974] mb-8  tracking-tight text-center">Guest Information</h2>
              <form onSubmit={handleNextStep} className="flex flex-col gap-8 flex-1">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[11px] font-black text-[#191974]  tracking-widest opacity-60">First Name</label>
                    <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="border-b-2 border-gray-100 px-0 py-3 outline-none focus:border-[#ee2229] transition-all font-bold text-[#191974] placeholder:text-gray-200" placeholder="e.g. Rahul" />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[11px] font-black text-[#191974]  tracking-widest opacity-60">Last Name</label>
                    <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="border-b-2 border-gray-100 px-0 py-3 outline-none focus:border-[#ee2229] transition-all font-bold text-[#191974] placeholder:text-gray-200" placeholder="e.g. Sharma" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[11px] font-black text-[#191974]  tracking-widest opacity-60">Email Address</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="border-b-2 border-gray-100 px-0 py-3 outline-none focus:border-[#ee2229] transition-all font-bold text-[#191974] placeholder:text-gray-200" placeholder="rahul@example.com" />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[11px] font-black text-[#191974]  tracking-widest opacity-60">Mobile Number</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="border-b-2 border-gray-100 px-0 py-3 outline-none focus:border-[#ee2229] transition-all font-bold text-[#191974] placeholder:text-gray-200" placeholder="+91 90000 00000" />
                  </div>
                </div>

                <div className="pt-10 mt-auto flex flex-col md:flex-row items-center justify-between border-t border-gray-50 gap-6">
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-gray-400  tracking-widest">Travelers</label>
                      <select name="pax" value={formData.pax} onChange={handleChange} className="bg-transparent font-black text-[#ee2229] outline-none cursor-pointer text-[16px]">
                        {[1, 2, 3, 4, 5, 6].map(v => <option key={v} value={v}>{v} {v === 1 ? 'Person' : 'People'}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1 border-l border-gray-100 pl-6">
                      <label className="text-[10px] font-bold text-gray-400  tracking-widest">Date</label>
                      <input required type="date" name="date" value={formData.date} onChange={handleChange} className="bg-transparent font-black text-[#ee2229] outline-none cursor-pointer text-[16px]" />
                    </div>
                  </div>
                  <button type="submit" className="w-full md:w-auto bg-[#ee2229] hover:bg-[#191974] text-white px-14 py-4 rounded-xl font-black text-[14px] font-inter-tight  tracking-widest transition-all shadow-xl shadow-red-500/20 active:scale-95">
                    Verify Details &rsaquo;
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2: REVIEW BOOKING */}
          {step === 2 && (
            <div className="p-10 md:p-16 flex-1 flex flex-col">
              <h2 className="text-[32px] font-black font-inter text-[#191974] mb-10  tracking-tight text-center">Review Confirmation</h2>

              <div className="bg-[#191974] rounded-2xl p-8 mb-10 flex flex-col md:flex-row gap-8 items-center justify-between text-white shadow-2xl">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-[#ee2229]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  </div>
                  <div>
                    <span className="text-[11px] font-black text-[#ee2229]  tracking-widest mb-1 block">Selected Package</span>
                    <h3 className="text-[26px] font-inter font-light tracking-tight">{tourSlug.replace(/-/g, ' ').toUpperCase()}</h3>
                  </div>
                </div>
                <div className="text-right border-l border-white/10 pl-8 hidden md:block">
                  <span className="text-[11px] font-bold text-white/40  tracking-wider block mb-1">Total Amount Due</span>
                  <span className="text-[32px] font-black text-[#ee2229] leading-none tracking-tighter">{formatRegionalPrice(totalBaseInrPrice, region)}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div className="space-y-4">
                  <h4 className="text-[12px] font-black text-[#191974]  tracking-widest border-b-2 border-[#191974]/5 pb-3">Primary Guest</h4>
                  <div className="space-y-1">
                    <p className="font-black text-[#191974] text-[18px] mb-1">{formData.firstName} {formData.lastName}</p>
                    <p className="text-gray-400 font-bold  text-[11px] tracking-wide">{formData.email}</p>
                    <p className="text-gray-400 font-bold  text-[11px] tracking-wide">{formData.phone}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[12px] font-black text-[#191974]  tracking-widest border-b-2 border-[#191974]/5 pb-3">Booking Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold  mb-1">Travelers</p>
                      <p className="font-black text-[#ee2229]">{formData.pax} Person(s)</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold  mb-1">Date</p>
                      <p className="font-black text-[#ee2229]">{formData.date}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto flex flex-col md:flex-row justify-between items-center pt-10 border-t border-gray-50 gap-6">
                <button onClick={() => setStep(1)} className="text-[#191974] font-black text-[12px]  tracking-widest hover:text-[#ee2229] transition-colors font-inter-tight">
                  &larr; Modify Details
                </button>
                <button onClick={() => setStep(3)} className="w-full md:w-auto bg-[#ee2229] hover:bg-[#191974] text-white px-16 py-4 rounded-xl font-black text-[14px] font-inter-tight  tracking-[0.2em] transition-all shadow-2xl active:scale-95">
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT PLACEHOLDER */}
          {step === 3 && (
            <div className="p-10 md:p-16 flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
                <svg className="w-12 h-12 text-[#191974]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              </div>
              <h2 className="text-[32px] font-black font-inter text-[#191974] mb-4  tracking-tight text-center">Final Step</h2>
              <p className="text-[26px] font-inter font-light text-gray-400 mb-10 max-w-2xl leading-tight">Authorize a total payment of <strong className="text-[#ee2229] font-black">{formatRegionalPrice(totalBaseInrPrice, region)}</strong></p>

              <button
                onClick={initiatePayment}
                disabled={loading}
                className="w-full max-w-md bg-[#ee2229] hover:bg-[#191974] disabled:opacity-50 text-white py-5 rounded-2xl text-[14px] font-black font-inter-tight  tracking-[0.3em] transition-all shadow-2xl flex items-center justify-center mb-6 active:scale-95"
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "Complete Secure Payment"
                )}
              </button>
              <button onClick={() => setStep(2)} className="text-gray-300 font-bold  text-[11px] tracking-widest hover:text-[#191974] transition-colors">
                Cancel Transaction
              </button>
            </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 4 && (
            <div className="p-10 md:p-16 flex-1 flex flex-col items-center justify-center text-center">
              <div className="mb-10 relative">
                <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center relative border-4 border-white">
                  <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
              </div>
              <h2 className="text-[32px] font-black font-inter text-[#191974] mb-4  tracking-tighter">Your Journey Begins!</h2>
              <p className="text-[26px] text-gray-400 font-inter font-light mb-12 max-w-2xl leading-tight">
                Booking reference <span className="text-[#ee2229] font-black">#MAD{Math.floor(Math.random() * 8999) + 1000}</span> is now active.
              </p>
              <button onClick={() => router.push(`/${region}/tours`)} className="bg-[#191974] text-white px-16 py-5 rounded-xl font-black text-[14px] font-inter-tight  tracking-widest hover:bg-[#ee2229] transition-all shadow-xl active:scale-95">
                Return to Gallery
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
