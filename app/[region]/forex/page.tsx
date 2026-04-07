"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';

const CURRENCY_RATES = [
  { code: "USD", name: "US Dollar", symbol: "$", buy: "83.25", sell: "84.10", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", buy: "90.50", sell: "91.40", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", buy: "105.20", sell: "106.30", flag: "🇬🇧" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", buy: "54.80", sell: "55.60", flag: "🇦🇺" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", buy: "62.10", sell: "62.90", flag: "🇸🇬" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", buy: "22.65", sell: "23.10", flag: "🇦🇪" },
  { code: "JPY", name: "Japanese Yen (100)", symbol: "¥", buy: "55.30", sell: "56.10", flag: "🇯🇵" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", buy: "93.40", sell: "94.50", flag: "🇨🇭" },
];

export default function ForexPage() {
  const params = useParams();
  const region = (params?.region as string) || 'in';
  const [formData, setFormData] = useState({ name: '', phone: '', currency: '', amount: '', deliveryType: 'pickup' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="bg-[var(--background)] min-h-screen">
      {/* Hero */}
      <div className="w-full bg-[#191974] py-24 text-center text-white relative overflow-hidden">
        <div className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] bg-[#82c341] opacity-15 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">
          <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-widest mb-6">RBI Authorized Dealer</span>
          <h1 className="text-[40px] md:text-[56px] font-bold font-inter mb-4 leading-tight">Foreign Exchange</h1>
          <p className="font-inter-tight opacity-90 max-w-2xl text-[16px] md:text-[18px]">Best exchange rates on currency notes, travel cards, and wire transfers. Zero hidden charges.</p>
        </div>
      </div>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 py-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "💵", title: "Currency Notes", desc: "Buy/sell foreign currency notes in 30+ currencies at competitive rates.", color: "from-[#191974] to-[#00a1e5]" },
            { icon: "💳", title: "Forex Travel Card", desc: "Multi-currency prepaid travel cards accepted at 30M+ merchants worldwide.", color: "from-[#ee2229] to-[#f4a021]" },
            { icon: "🏦", title: "Wire Transfer", desc: "Secure international wire transfers for education, business, and personal needs.", color: "from-[#82c341] to-[#00a1e5]" }
          ].map((s, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col">
              <div className={`h-2 bg-gradient-to-r ${s.color}`}></div>
              <div className="p-6 flex flex-col flex-1 items-center text-center">
                <span className="text-[40px] mb-4 block">{s.icon}</span>
                <h3 className="text-[20px] font-bold text-[#171717] mb-3 font-inter">{s.title}</h3>
                <p className="text-[14px] text-gray-600 font-inter-tight leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Rates Table */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-[36px] font-bold font-inter text-[#191974] mb-4 text-center">Today&apos;s Exchange Rates</h2>
          <p className="text-[16px] text-gray-500 font-inter-tight text-center mb-2">Indicative rates. Final rates confirmed at time of transaction.</p>
          <p className="text-[12px] text-gray-400 font-inter-tight text-center mb-10">Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-4 bg-[#191974] text-white text-[12px] font-bold uppercase tracking-wider">
              <div className="p-4">Currency</div>
              <div className="p-4 text-center">Code</div>
              <div className="p-4 text-center">We Buy (₹)</div>
              <div className="p-4 text-center">We Sell (₹)</div>
            </div>
            {CURRENCY_RATES.map((rate, idx) => (
              <div key={idx} className={`grid grid-cols-4 items-center text-[14px] font-inter-tight ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-[#191974]/5 transition-colors`}>
                <div className="p-4 flex items-center gap-2 font-semibold text-[#171717]">
                  <span className="text-[20px]">{rate.flag}</span> {rate.name}
                </div>
                <div className="p-4 text-center font-bold text-[#191974]">{rate.code}</div>
                <div className="p-4 text-center font-bold text-green-600">{rate.buy}</div>
                <div className="p-4 text-center font-bold text-[#ee2229]">{rate.sell}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          {!submitted ? (
            <>
              <div className="text-center mb-10">
                <h2 className="text-[28px] font-bold font-inter text-[#171717] mb-2">Order Forex</h2>
                <p className="text-[14px] text-gray-500 font-inter-tight">Get forex delivered to your doorstep or pick up from our nearest branch.</p>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-bold text-gray-600 tracking-wide uppercase px-1">Name</label>
                    <input required type="text" className="border border-gray-200 p-3.5 rounded-xl text-[14px] outline-none focus:border-[#191974] focus:ring-1 focus:ring-[#191974] bg-gray-50 focus:bg-white" onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-bold text-gray-600 tracking-wide uppercase px-1">Phone</label>
                    <input required type="tel" className="border border-gray-200 p-3.5 rounded-xl text-[14px] outline-none focus:border-[#191974] focus:ring-1 focus:ring-[#191974] bg-gray-50 focus:bg-white" onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-bold text-gray-600 tracking-wide uppercase px-1">Currency</label>
                    <select required className="border border-gray-200 p-3.5 rounded-xl text-[14px] outline-none focus:border-[#191974] bg-gray-50 focus:bg-white cursor-pointer" onChange={e => setFormData({...formData, currency: e.target.value})}>
                      <option value="">Select currency...</option>
                      {CURRENCY_RATES.map(r => <option key={r.code} value={r.code}>{r.flag} {r.code} — {r.name}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-bold text-gray-600 tracking-wide uppercase px-1">Amount</label>
                    <input required type="number" placeholder="e.g. 1000" className="border border-gray-200 p-3.5 rounded-xl text-[14px] outline-none focus:border-[#191974] bg-gray-50 focus:bg-white" onChange={e => setFormData({...formData, amount: e.target.value})} />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-gray-600 tracking-wide uppercase px-1">Delivery</label>
                  <div className="flex gap-4">
                    {["pickup", "delivery"].map(type => (
                      <button key={type} type="button" onClick={() => setFormData({...formData, deliveryType: type})} className={`flex-1 py-3 rounded-xl text-[14px] font-bold transition-all border ${formData.deliveryType === type ? 'bg-[#191974] text-white border-[#191974]' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}>
                        {type === 'pickup' ? '🏢 Branch Pickup' : '🚚 Home Delivery'}
                      </button>
                    ))}
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#ee2229] hover:bg-[#d61e24] text-white py-4 rounded-xl font-bold text-[16px] transition-all shadow-md mt-2">Place Forex Order</button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center text-center py-10">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="font-bold text-[24px] text-[#171717] mb-2 font-inter">Order Placed!</h3>
              <p className="text-[15px] text-gray-600 mb-8 font-inter-tight">We&apos;ll confirm the final rate and process your {formData.currency} order shortly.</p>
              <button onClick={() => setSubmitted(false)} className="text-[#191974] font-bold text-[14px] hover:underline">Place another order</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
