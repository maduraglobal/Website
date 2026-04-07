"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { formatRegionalPrice } from '../../../config/country';

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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">

        {/* STEPPER UI */}
        {step < 4 && (
          <div className="flex items-center justify-between mb-12 relative w-full lg:w-3/4 mx-auto">
            <div className="absolute left-0 top-1/2 -mt-px w-full h-[2px] bg-gray-200 -z-10"></div>
            <div className={`absolute left-0 top-1/2 -mt-px h-[2px] bg-[#191974] -z-10 transition-all duration-500`} style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>
            
            {[1, 2, 3].map((st) => (
              <div key={st} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] transition-colors border-[3px] ${
                  step >= st ? 'bg-[#191974] text-white border-[#191974]' : 'bg-white text-gray-400 border-gray-200'
                }`}>
                  {step > st ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : st}
                </div>
                <span className={`text-[12px] font-bold uppercase tracking-wider ${step >= st ? 'text-[#191974]' : 'text-gray-400'}`}>
                  {st === 1 ? 'Details' : st === 2 ? 'Review' : 'Payment'}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* CONTENT AREA */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden">
          
          {/* STEP 1: USER DETAILS */}
          {step === 1 && (
             <div className="p-8 md:p-12">
               <h2 className="text-[26px] font-inter font-bold text-[#171717] mb-6">Guest Details</h2>
               <form onSubmit={handleNextStep} className="flex flex-col gap-6">
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="flex flex-col gap-2">
                     <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wide">First Name *</label>
                     <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#191974] focus:ring-1 focus:ring-[#191974] transition-all font-inter-tight" placeholder="e.g. Rahul" />
                   </div>
                   <div className="flex flex-col gap-2">
                     <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wide">Last Name *</label>
                     <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#191974] focus:ring-1 focus:ring-[#191974] transition-all font-inter-tight" placeholder="e.g. Sharma" />
                   </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="flex flex-col gap-2">
                     <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wide">Email Address *</label>
                     <input required type="email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#191974] focus:ring-1 focus:ring-[#191974] transition-all font-inter-tight" placeholder="rahul@example.com" />
                   </div>
                   <div className="flex flex-col gap-2">
                     <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wide">Phone Number *</label>
                     <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#191974] focus:ring-1 focus:ring-[#191974] transition-all font-inter-tight" placeholder="+91 9876543210" />
                   </div>
                 </div>

                 <div className="border-t border-gray-100 my-4"></div>

                 <h3 className="text-[18px] font-inter font-bold text-[#171717]">Travel Information</h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="flex flex-col gap-2">
                     <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wide">Number of Pax *</label>
                     <select name="pax" value={formData.pax} onChange={handleChange} className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#191974] bg-white cursor-pointer font-inter-tight">
                       <option value="1">1 Person</option>
                       <option value="2">2 People</option>
                       <option value="3">3 People</option>
                       <option value="4">4 People</option>
                       <option value="5">5+ People</option>
                     </select>
                   </div>
                   <div className="flex flex-col gap-2">
                     <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wide">Preferred Start Date *</label>
                     <input required type="date" name="date" value={formData.date} onChange={handleChange} className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#191974] font-inter-tight" />
                   </div>
                 </div>

                 <div className="mt-8 flex justify-end">
                   <button type="submit" className="bg-[#191974] hover:bg-[#111155] text-white px-10 py-3.5 rounded-xl font-bold tracking-wide transition-all shadow-md btn">
                     Continue to Review
                   </button>
                 </div>
               </form>
             </div>
          )}

          {/* STEP 2: REVIEW BOOKING */}
          {step === 2 && (
             <div className="p-8 md:p-12">
               <h2 className="text-[26px] font-inter font-bold text-[#171717] mb-6">Review Booking</h2>
               
               <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                 <div>
                   <span className="text-[12px] font-bold text-[#ee2229] uppercase tracking-widest mb-1 block">Selected Package</span>
                   <h3 className="text-[20px] font-inter font-bold text-[#191974]">{tourSlug.replace(/-/g, ' ').toUpperCase()}</h3>
                   <div className="flex items-center gap-4 mt-3 text-[14px] text-gray-600 font-inter-tight">
                     <span className="flex items-center gap-1"><svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> {formData.date || 'Not Selected'}</span>
                     <span className="flex items-center gap-1"><svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> {formData.pax} Passengers</span>
                   </div>
                 </div>
                 <div className="text-right">
                    <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider block">Total Amount</span>
                    <span className="text-[28px] font-bold text-[#171717] leading-none">{formatRegionalPrice(totalBaseInrPrice, region)}</span>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                 <div>
                   <h4 className="text-[14px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2 mb-4">Guest Info</h4>
                   <p className="font-bold text-[#171717]">{formData.firstName} {formData.lastName}</p>
                   <p className="text-gray-600 text-[14px]">{formData.email}</p>
                   <p className="text-gray-600 text-[14px]">{formData.phone}</p>
                 </div>
                 <div>
                   <h4 className="text-[14px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2 mb-4">Inclusions Recap</h4>
                   <ul className="text-[14px] text-gray-600 flex flex-col gap-2">
                     <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#82c341] rounded-full"></div> All Flights</li>
                     <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#82c341] rounded-full"></div> 4-Star Hotels</li>
                     <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#82c341] rounded-full"></div> All Meals & Visa</li>
                   </ul>
                 </div>
               </div>

               <div className="flex justify-between items-center border-t border-gray-100 pt-8">
                 <button onClick={() => setStep(1)} className="text-gray-500 font-bold hover:text-[#171717] transition-colors">
                   ← Back to Edit
                 </button>
                 <button onClick={() => setStep(3)} className="bg-[#191974] hover:bg-[#111155] text-white px-10 py-3.5 rounded-xl font-bold tracking-wide transition-all shadow-md btn">
                   Confirm Booking
                 </button>
               </div>
             </div>
          )}

          {/* STEP 3: PAYMENT PLACEHOLDER */}
          {step === 3 && (
             <div className="p-8 md:p-12 text-center">
               <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <svg className="w-10 h-10 text-[#191974]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
               </div>
               <h2 className="text-[26px] font-inter font-bold text-[#171717] mb-2">Secure Payment</h2>
               <p className="text-gray-500 max-w-md mx-auto mb-8 font-inter-tight">You will be securely redirected to our payment gateway to complete your transaction of <strong className="text-[#171717]">{formatRegionalPrice(totalBaseInrPrice, region)}</strong>.</p>
               
               <div className="flex flex-col items-center gap-4">
                 <button 
                   onClick={initiatePayment} 
                   disabled={loading}
                   className="w-full max-w-sm bg-[#ee2229] hover:bg-[#d61e24] disabled:opacity-70 disabled:cursor-not-allowed text-white py-4 rounded-xl text-[16px] font-bold tracking-wide transition-all shadow-lg btn flex items-center justify-center"
                 >
                   {loading ? (
                     <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                   ) : (
                     <span className="flex items-center gap-2">
                       Pay Now <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                     </span>
                   )}
                 </button>
                 {!loading && (
                   <button onClick={() => setStep(2)} className="text-gray-500 font-bold hover:text-[#171717] text-[14px]">
                     Cancel & Return
                   </button>
                 )}
               </div>
             </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 4 && (
             <div className="p-8 md:p-16 text-center">
               <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
               </div>
               <h2 className="text-[32px] font-inter font-bold text-[#171717] mb-2">Booking Confirmed!</h2>
               <p className="text-gray-500 max-w-md mx-auto mb-8 font-inter-tight text-[16px]">
                 Thank you, {formData.firstName}. Your booking reference is <strong className="text-[#191974]">#MADURA-{Math.floor(Math.random() * 90000) + 10000}</strong>. We've sent a confirmation email to {formData.email}.
               </p>
               
               <button onClick={() => router.push(`/${region}/tours`)} className="bg-[#191974] hover:bg-[#111155] text-white px-10 py-4 rounded-xl font-bold tracking-wide transition-all shadow-md btn">
                 Explore More Tours
               </button>
             </div>
          )}

        </div>
      </div>
    </div>
  );
}
