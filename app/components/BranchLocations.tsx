'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Share2,
  ExternalLink,
  Clock,
  Globe2,
  Building2
} from 'lucide-react';

interface BranchProps {
  tag: string;
  location: string;
  name: string;
  status: 'OPEN' | 'CLOSED';
  address: string;
  phone: string;
  email: string;
  isInternational?: boolean;
}

const BranchCard = ({ tag, location, name, status, address, phone, email, isInternational }: BranchProps) => (
  <motion.div
    whileHover={{ y: -8 }}
    className="bg-white rounded-[2rem] p-8 shadow-xl shadow-blue-900/5 border border-gray-100 flex flex-col h-full group transition-all hover:shadow-2xl hover:shadow-blue-900/10"
  >
    <div className="flex justify-between items-start mb-6">
      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isInternational ? 'bg-[#ee2229] text-white' : 'bg-[#191974]/10 text-[#191974]'}`}>
        {tag}
      </span>
      <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-green-600 text-[10px] font-bold uppercase tracking-widest">{status}</span>
      </div>
    </div>

    <div className="mb-6">
      <div className="flex items-center gap-2 text-[#ee2229] mb-1">
        <MapPin className="w-4 h-4" />
        <span className="text-[12px] font-bold uppercase tracking-wider">{location}</span>
      </div>
      <h3 className="text-[22px] font-black text-[#191974] leading-tight group-hover:text-[#ee2229] transition-colors">{name}</h3>
    </div>

    <div className="space-y-4 mb-8 flex-1">
      <p className="text-gray-500 text-[14px] leading-relaxed font-light">
        {address}
      </p>

      <div className="space-y-2">
        <a href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-gray-600 hover:text-[#191974] transition-colors group/link">
          <Phone className="w-4 h-4 text-[#ee2229]" />
          <span className="text-[14px] font-medium">{phone}</span>
        </a>
        <a href={`mailto:${email}`} className="flex items-center gap-3 text-gray-600 hover:text-[#191974] transition-colors group/link">
          <Mail className="w-4 h-4 text-[#ee2229]" />
          <span className="text-[14px] font-medium grow truncate">{email}</span>
        </a>
      </div>
    </div>

    <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
      <button className="flex items-center gap-2 text-[#191974] font-black uppercase tracking-widest text-[12px] hover:text-[#ee2229] transition-colors group/btn">
        Office Details
        <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
      </button>
      <div className="flex gap-2">
        <button className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#191974] hover:text-white transition-all shadow-sm">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  </motion.div>
);

export default function BranchLocations() {
  const indiaBranches: BranchProps[] = [
    {
      tag: "Branch Office",
      location: "Chennai",
      name: "Madura Travel service – Chennai HQ",
      status: "OPEN",
      address: "25-3, Gandhi Irwin Road, Egmore, Chennai, Tamil Nadu – 600008",
      phone: "+91 44 28192002",
      email: "mail@maduratravel.com"
    },
  ];

  const internationalBranches: BranchProps[] = [
    {
      tag: "International Office",
      location: "Sydney, Australia",
      name: "Madura Travel Service – Sydney",
      status: "OPEN",
      address: "Sydney,Australia",
      phone: "+61 434 500 743",
      email: "mail@maduraglobal.com",
      isInternational: true
    },
  ];

  return (
    <section className="py-24 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[42px] md:text-[52px] font-black text-[#191974] uppercase tracking-tighter leading-none mb-6 font-inter">
              Our Branches <span className="text-[#ee2229]">Worldwide</span>
            </h2>
            <p className="text-gray-400 text-[18px] md:text-[22px] font-light max-w-2xl mx-auto">
              Connect with our offices across India and internationally for personalized travel assistance.
            </p>
          </motion.div>
        </div>

        {/* India Sections */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center gap-3 bg-white px-6 py-2.5 rounded-2xl shadow-sm border border-gray-100">
              <img src="https://flagcdn.com/w40/in.png" alt="India" className="w-6 h-4 object-cover rounded-xs" />
              <h3 className="text-[14px] font-black text-[#191974] uppercase tracking-widest">India Branches</h3>
            </div>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {indiaBranches.map((branch, i) => (
              <BranchCard key={i} {...branch} />
            ))}
          </div>
        </div>

        {/* International Sections */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center gap-3 bg-white px-6 py-2.5 rounded-2xl shadow-sm border border-gray-100">
              <Globe2 className="w-5 h-5 text-[#ee2229]" />
              <h3 className="text-[14px] font-black text-[#191974] uppercase tracking-widest">International Branches</h3>
            </div>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {internationalBranches.map((branch, i) => (
              <BranchCard key={i} {...branch} />
            ))}
          </div>
        </div>

        {/* Support Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 p-8 md:p-12 rounded-[2.5rem] bg-[#191974] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ee2229]/20 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-[28px] font-black uppercase mb-2">Need immediate assistance?</h3>
            <p className="text-white/60 font-light text-[17px]">Our global support team is available 24/7 to help you.</p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4">
            <a href="tel:+919092949494" className="bg-[#ee2229] hover:bg-white hover:text-[#191974] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest transition-all text-center">
              Call Support
            </a>
            <a href={`/contact`} className="bg-transparent border-2 border-white/20 hover:border-white text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest transition-all text-center">
              Global Directory
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
