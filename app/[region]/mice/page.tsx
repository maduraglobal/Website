"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';

export default function MICEPage() {
  const params = useParams();
  const region = (params?.region as string) || 'in';
  const [formData, setFormData] = useState({ company: '', name: '', email: '', phone: '', eventType: '', groupSize: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="bg-(--background) min-h-screen">
      <div className="w-full bg-[#191974] py-24 text-center text-white relative overflow-hidden">
        <div className="absolute top-[-120px] right-[-120px] w-[500px] h-[500px] bg-[#ee2229] opacity-15 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">
          <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[12px] font-bold  tracking-widest mb-6">Corporate Travel</span>
          <h1 className="text-[40px] md:text-[56px] font-bold mb-4 leading-tight">MICE Travel</h1>
          <p className="opacity-90 max-w-3xl text-[16px] md:text-[18px]">Meetings, Incentives, Conferences & Exhibitions â€” expertly managed corporate travel for businesses of all sizes.</p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "ðŸ“Š", title: "Meetings", desc: "Board meetings, team offsites, and retreats at world-class venues.", color: "from-[#191974] to-[#00a1e5]" },
            { icon: "ðŸ†", title: "Incentives", desc: "Reward top performers with unforgettable international incentive trips.", color: "from-[#ee2229] to-[#f4a021]" },
            { icon: "ðŸŽ¤", title: "Conferences", desc: "End-to-end conference management â€” venue, logistics, AV, hospitality.", color: "from-[#82c341] to-[#00a1e5]" },
            { icon: "ðŸŽª", title: "Exhibitions", desc: "Trade show and international expo representation services.", color: "from-[#f4a021] to-[#ee2229]" }
          ].map((s, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col">
              <div className={`h-2 bg-linear-to-r ${s.color}`}></div>
              <div className="p-6 flex flex-col flex-1 items-center text-center">
                <span className="text-[40px] mb-4 block">{s.icon}</span>
                <h3 className="text-[20px] font-bold text-[#171717] mb-3 ">{s.title}</h3>
                <p className="text-[14px] text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-[36px] font-bold text-[#191974] mb-4 text-center">Why Madura for Corporate Travel?</h2>
          <p className="text-[16px] text-gray-500 text-center mb-12">Trusted by 500+ corporates across India.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Dedicated Account Manager", desc: "A single point of contact for planning and on-ground support.", icon: "ðŸ‘¤" },
              { title: "Global Venue Network", desc: "1000+ pre-vetted venues and resorts across 60+ countries.", icon: "ðŸŒ" },
              { title: "End-to-End Management", desc: "Travel logistics, accommodation, event production â€” we handle it all.", icon: "âœ…" }
            ].map((f, i) => (
              <div key={i} className="bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-lg transition-shadow text-center">
                <span className="text-[36px] mb-4 block">{f.icon}</span>
                <h3 className="text-[18px] font-bold text-[#171717] mb-3 ">{f.title}</h3>
                <p className="text-[14px] text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          {!submitted ? (
            <>
              <div className="text-center mb-10">
                <h2 className="text-[28px] font-bold text-[#171717] mb-2">Request a MICE Proposal</h2>
                <p className="text-[14px] text-gray-500 ">Our team will respond within 24 hours.</p>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-bold text-gray-600 tracking-wide  px-1">Company</label>
                    <input required type="text" className="border border-gray-200 p-3.5 rounded-xl text-[14px] outline-none focus:border-[#191974] focus:ring-1 focus:ring-[#191974] bg-gray-50 focus:bg-white" onChange={e => setFormData({ ...formData, company: e.target.value })} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-bold text-gray-600 tracking-wide  px-1">Contact Person</label>
                    <input required type="text" className="border border-gray-200 p-3.5 rounded-xl text-[14px] outline-none focus:border-[#191974] focus:ring-1 focus:ring-[#191974] bg-gray-50 focus:bg-white" onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-bold text-gray-600 tracking-wide  px-1">Email</label>
                    <input required type="email" className="border border-gray-200 p-3.5 rounded-xl text-[14px] outline-none focus:border-[#191974] focus:ring-1 focus:ring-[#191974] bg-gray-50 focus:bg-white" onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-bold text-gray-600 tracking-wide  px-1">Phone</label>
                    <input required type="tel" className="border border-gray-200 p-3.5 rounded-xl text-[14px] outline-none focus:border-[#191974] focus:ring-1 focus:ring-[#191974] bg-gray-50 focus:bg-white" onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-bold text-gray-600 tracking-wide  px-1">Event Type</label>
                    <select required className="border border-gray-200 p-3.5 rounded-xl text-[14px] outline-none focus:border-[#191974] bg-gray-50 focus:bg-white cursor-pointer" onChange={e => setFormData({ ...formData, eventType: e.target.value })}>
                      <option value="">Select...</option>
                      <option>Meeting / Offsite</option>
                      <option>Incentive Trip</option>
                      <option>Conference</option>
                      <option>Exhibition</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-bold text-gray-600 tracking-wide  px-1">Group Size</label>
                    <select required className="border border-gray-200 p-3.5 rounded-xl text-[14px] outline-none focus:border-[#191974] bg-gray-50 focus:bg-white cursor-pointer" onChange={e => setFormData({ ...formData, groupSize: e.target.value })}>
                      <option value="">Select...</option>
                      <option>10-25</option>
                      <option>25-50</option>
                      <option>50-100</option>
                      <option>100-250</option>
                      <option>250+</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-gray-600 tracking-wide  px-1">Details</label>
                  <textarea rows={3} className="border border-gray-200 p-3.5 rounded-xl text-[14px] outline-none focus:border-[#191974] bg-gray-50 focus:bg-white resize-none" onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
                </div>
                <button type="submit" className="w-full bg-[#ee2229] hover:bg-[#d61e24] text-white py-4 rounded-xl font-bold text-[16px] transition-all shadow-md mt-2">Submit MICE Enquiry</button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center text-center py-10">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-[#191974]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="font-bold text-[24px] text-[#171717] mb-2 ">Enquiry Submitted!</h3>
              <p className="text-[15px] text-gray-600 mb-8 ">We&apos;ll send a proposal to {formData.email} within 24 hours.</p>
              <button onClick={() => setSubmitted(false)} className="text-[#191974] font-bold text-[14px] hover:underline">Submit another</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
