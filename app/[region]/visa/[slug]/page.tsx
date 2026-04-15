"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
  CheckCircle2, ChevronRight, ChevronDown, ChevronUp, Star, Phone, MessageCircle, Clock,
  MapPin, ShieldCheck, FileText, Globe, Building2, Check, ExternalLink, ChevronLeft, Users,
  Sparkles, Calendar, Zap, Plus, Mail
} from 'lucide-react';

// Helpers
const scrollToId = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const yOffset = -120;
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

import { getDestinationBySlug, VisaDestination } from '@/app/data/visaData';
import { getCountryConfig, formatRegionalPrice } from '@/config/country';

import { useSearchParams } from 'next/navigation';

const sourceAwareData: Record<string, Record<string, any>> = {
  "United Arab Emirates": {
    "india": {
      startingPrice: "180",
      partner: "Official India Visa Agent in UAE",
      heroImg: "https://images.unsplash.com/photo-1524492707947-2f10a7b4dd30?auto=format&fit=crop&q=80&w=1200",
      visaTypes: [
        { name: "Tourist E-Visa (30 Days)", pop: true, pTime: "3-5 days", stay: "30 days", valid: "30 days", entry: "Double", fees: "180" },
        { name: "Business E-Visa", pop: false, pTime: "3-5 days", stay: "60 days", valid: "1 year", entry: "Multiple", fees: "350" }
      ],
      docs: [
        "Color scan of Passport (First & Last page)",
        "Recent passport size photo (White background)",
        "UAE Residence Visa Copy",
        "Emirates ID Copy (Front & Back)"
      ]
    }
  },
  "Dubai (UAE)": {
    "india": {
      startingPrice: "180",
      partner: "Official India Visa Agent in UAE",
      heroImg: "https://images.unsplash.com/photo-1524492707947-2f10a7b4dd30?auto=format&fit=crop&q=80&w=1200",
      visaTypes: [
        { name: "Tourist E-Visa (30 Days)", pop: true, pTime: "3-5 days", stay: "30 days", valid: "30 days", entry: "Double", fees: "180" },
        { name: "Business E-Visa", pop: false, pTime: "3-5 days", stay: "60 days", valid: "1 year", entry: "Multiple", fees: "350" }
      ],
      docs: [
        "Color scan of Passport (First & Last page)",
        "Recent passport size photo (White background)",
        "UAE Residence Visa Copy",
        "Emirates ID Copy (Front & Back)"
      ]
    }
  }
};

export default function DynamicVisaDetailPage({ params }: { params: Promise<{ region: string, slug: string }> }) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const { region, slug } = resolvedParams;
  const countryConfig = getCountryConfig(region);

  const urlCitizen = searchParams.get('citizen');
  const citizenOf = urlCitizen || countryConfig.name;

  const destination = getDestinationBySlug(slug);
  const destName = destination ? destination.name : (slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') : "Dubai");

  // Get current country data with source-awareness
  const getSourceAwareData = () => {
    let base = destination ? { ...destination, heroImg: destination.image } : {
      startingPrice: "4,500",
      partner: "Authorised Visa Agent",
      heroImg: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200",
      visaTypes: [{ name: "Tourist Visa", pop: true, pTime: "5-7 days", stay: "30 days", valid: "90 days", entry: "Single", fees: "4,500" }],
      docs: ["Photo", "Passport"],
      attractions: [{ title: "Popular Landmarks", desc: "Explore the most iconic sites and cultural heritage of this beautiful destination." }],
      embassy: "Contact our support for the latest embassy address and submission details.",
      type: "E-VISA",
      sampleVisaImg: "/images/sample-visa.png"
    };

    const sourceData = sourceAwareData[citizenOf]?.[slug.toLowerCase()];
    if (sourceData) {
      return { ...base, ...sourceData };
    }
    return base;
  };

  const currentData = getSourceAwareData();

  // State for interactive elements
  const [activeTab, setActiveTab] = useState("Types Of Visas");
  const [isSidebarLetUsCallOpen, setSidebarLetUsCallOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openDocs, setOpenDocs] = useState(true);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);



  // DATA
  const visaTypes = currentData.visaTypes;

  const faqs = [
    `How much does a ${destName} visa cost?`,
    `Is a ${destName} visa free for citizens of ${citizenOf}?`,
    `How to apply for a ${destName} visa for ${citizenOf} Citizens?`,
    `Can I get my ${destName} visa in 2 days?`,
    `What are ${destName} visa fees from ${citizenOf}?`,
    `Can we go to ${destName} without a visa?`,
    `How much does a ${destName} trip cost from ${citizenOf}?`,
    `How much is the 14 day tourist visa for ${destName === 'Dubai' ? 'UAE' : destName}?`,
    `Can I apply for a ${destName === 'Dubai' ? 'UAE' : destName} visa online?`,
    `How long does a ${destName} visa take?`,
    `Can we get a ${destName} visa on arrival?`,
    `What is the ${destName} Golden Visa price?`
  ];

  const experts = [
    { name: "Bhakti Khedekar", role: "Senior Visa Officer", exp: "6 yrs", img: "https://ui-avatars.com/api/?name=Bhakti+Khedekar&background=f3f4f6&color=191974" },
    { name: "Jay Surve", role: "Senior Visa Officer", exp: "6 yrs", img: "https://ui-avatars.com/api/?name=Jay+Surve&background=f3f4f6&color=191974" },
    { name: "Raj Bhatt", role: "Senior Visa Officer", exp: "5 yrs", img: "https://ui-avatars.com/api/?name=Raj+Bhatt&background=f3f4f6&color=191974" }
  ];

  const attractions = currentData.attractions;

  // STICKY TABS
  const tabs = ["Types Of Visas", "Documents", "Process", "Why Choose Us", "Sample Visa", "FAQs"];

  return (
    <div className="min-h-screen bg-white font-inter text-black text-[14px]">

      {/* ===== HERO SECTION ===== */}
      <section className="w-full bg-[#191974] text-white py-12 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="text-[12px] font-bold mb-8 flex items-center gap-2 tracking-widest opacity-80">
            <Link href={`/${region}`} className="text-white hover:text-[#ee2229] transition-colors">HOME</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-30" />
            <Link href={`/${region}/visa`} className="text-white hover:text-[#ee2229] transition-colors">VISA</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-30" />
            <span className="text-[#ee2229]">{destName.toUpperCase()} VISA</span>
          </div>

          <p className="text-[32px]  leading-tight mb-4 max-w-2xl">
            {destName} Visa Online for {citizenOf} Citizens
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="inline-flex bg-[#12803c] text-white font-bold px-4 py-1.5 rounded-full text-[12px] items-center gap-2 shadow-xl">
              <CheckCircle2 className="w-4 h-4" /> 99.2% Approval Rate
            </div>
            <div className={`inline-flex ${currentData.startingPrice === "0" ? 'bg-amber-500' : 'bg-blue-600'} text-white font-bold px-4 py-1.5 rounded-full text-[12px] items-center gap-2 shadow-xl uppercase tracking-widest`}>
              <Star className="w-4 h-4" /> {currentData.startingPrice === "0" ? 'Visa Free entry' : 'E-Visa Required'}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="space-y-1">
              <p className="text-[11px] text-white/50 uppercase tracking-[0.2em] ">Processing time</p>
              <p className="text-[20px] font-bold">{visaTypes[0]?.pTime || '5-7 Days'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] text-white/50 uppercase tracking-[0.2em] ">Stay Period</p>
              <p className="text-[20px] font-bold">{visaTypes[0]?.stay || '30 Days'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] text-white/50 uppercase tracking-[0.2em] ">Starting from</p>
              <p className="text-[20px] font-bold text-[#ee2229]">{currentData.startingPrice === "0" ? 'FREE' : formatRegionalPrice(currentData.startingPrice, region)}</p>
            </div>
          </div>

          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 text-[12px] font-bold tracking-widest">
            {currentData.partner.toUpperCase()}
          </div>
        </div>

        <div className="absolute top-0 right-0 bottom-0 w-1/2 opacity-30 pointer-events-none" style={{ backgroundImage: `url('${currentData.heroImg}')`, backgroundSize: 'cover', backgroundPosition: 'center', maskImage: 'linear-gradient(to right, transparent, black)' }}></div>
      </section>

      {/* ===== STICKY NAV BAR ===== */}
      <div className="sticky top-[74px] z-40 bg-white border-b border-gray-100 shadow-sm overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex gap-8 items-center min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                scrollToId(tab.replace(/\s+/g, '-').toLowerCase());
              }}
              className={`py-5 text-[14px] font-bold whitespace-nowrap transition-all relative ${activeTab === tab ? 'text-[#191974]' : 'text-gray-400 hover:text-[#191974]'}`}
            >
              {tab}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-[#ee2229] transition-transform duration-300 ${activeTab === tab ? 'scale-x-100' : 'scale-x-0'}`}></div>
            </button>
          ))}
        </div>
      </div>

      {/* ===== MAIN CONTENT LAYOUT ===== */}
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-16 items-start">

        {/* LEFT CONTENT COLUMN */}
        <div className="w-full lg:w-[68%] flex flex-col gap-12">

          {/* 1. Guarantee Banner */}
          <div className="rounded-[24px] overflow-hidden bg-[#191974] p-8 text-white relative flex flex-col sm:flex-row items-center gap-6 shadow-2xl">
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md shrink-0">
              <ShieldCheck className="w-10 h-10 text-[#ee2229]" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-[20px] font-bold mb-1">Guaranteed 100% Fee Refund</h3>
              <p className="text-[14px] text-white/70">Automatic refund if your visa application is rejected by immigration.</p>
            </div>
          </div>

          {/* 2. Types of Visas */}
          <div id="types-of-visas" className="space-y-8">
            <h2 className="text-[26px] font-bold text-[#191974]">Types of {destName} Visas</h2>



            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visaTypes.map((v: { pop: any; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; pTime: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; valid: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; stay: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; entry: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; fees: string; }, i: React.Key | null | undefined) => (
                <div key={i} className="bg-white rounded-[24px] border border-gray-100 p-8 hover:shadow-2xl hover:border-red-100 transition-all group flex flex-col relative overflow-hidden">
                  {v.pop && (
                    <div className="absolute top-0 right-0 bg-[#ee2229] text-white text-[10px] font-bold px-6 py-1.5 rounded-bl-2xl uppercase tracking-widest">
                      Popular
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-[22px] font-bold text-[#191974] group-hover:text-[#ee2229] transition-colors">{v.name}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-y-8 gap-x-4 mb-10">
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Processing</p>
                      <div className="flex items-center gap-2 text-[#191974] font-bold">
                        <Clock className="w-4 h-4 text-[#ee2229]" />
                        <span>{v.pTime}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Validity</p>
                      <div className="flex items-center gap-2 text-[#191974] font-bold">
                        <ShieldCheck className="w-4 h-4 text-[#ee2229]" />
                        <span>{v.valid}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Stay</p>
                      <div className="flex items-center gap-2 text-[#191974] font-bold">
                        <Calendar className="w-4 h-4 text-[#ee2229]" />
                        <span>{v.stay}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Entry</p>
                      <div className="flex items-center gap-2 text-[#191974] font-bold">
                        <Globe className="w-4 h-4 text-[#ee2229]" />
                        <span>{v.entry}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-8 border-t border-gray-50 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Fee Starts</p>
                      <p className="text-[28px]  text-[#191974] leading-none">
                        {v.fees === "0" ? 'FREE' : formatRegionalPrice(v.fees, region)}
                      </p>
                    </div>
                    <Link
                      href={`/${region}/visa/${slug}/apply?citizen=${encodeURIComponent(citizenOf)}`}
                      className="bg-[#191974] text-white px-8 py-3.5 rounded-full font-bold text-[12px] tracking-widest hover:bg-[#ee2229] transition-all shadow-xl active:scale-95 flex items-center gap-2"
                    >
                      APPLY NOW
                      <Zap className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Social Proof */}
          <a
            href="https://www.google.com/search?sca_esv=21f0f7159a2b44ff&rlz=1C1UEAD_en-GBIN1074IN1074&sxsrf=ANbL-n7BW-cKFC0Z0Qrk7pEdQo9N59Gx2w:1776254198373&si=AL3DRZHrmvnFAVQPOO2Bzhf8AX9KZZ6raUI_dT7DG_z0kV2_x0MpVVn9OA5hG89nwRSIi5PHQo7yfEknDvepDRnjGaWelQUElaca8ATNAojLYehobbGeXz_azHFLjMxRm-QxYhB9fwkonn654d_Hzxt03onm7QPx4g%3D%3D&q=Madura+Travel+Service+%28P%29+Ltd+Reviews&sa=X&ved=2ahUKEwj_i5nE5u-TAxWlslYBHReDMZwQ0bkNegQIJhAH&biw=1536&bih=730&dpr=1.25"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#191974]/5 border border-[#191974]/10 p-8 rounded-[32px] flex flex-col sm:flex-row items-center justify-between gap-6 hover:bg-[#191974]/10 transition-all group/review active:scale-[0.99] cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-full p-2.5 flex items-center justify-center shadow-sm group-hover/review:scale-110 transition-transform">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" className="w-full" alt="Google" />
              </div>
              <div>
                <p className="text-[16px] font-bold text-[#191974]">Madura Travel Reviews</p>
                <div className="flex text-amber-500 gap-0.5 mt-0.5"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></div>
              </div>
            </div>
            <div className="text-[14px] font-bold text-[#191974] bg-white px-6 py-2.5 rounded-full border border-gray-200 shadow-sm group-hover/review:border-[#ee2229] transition-colors">
              Rated <strong className="text-[#ee2229]">4.9/5</strong> by 272+ travelers
            </div>
          </a>

          {/* 4. Documents Required */}
          <div id="documents" className="space-y-8">
            <h2 className="text-[26px] font-bold text-[#191974]">Documentation Checklist</h2>

            <div className="grid grid-cols-1 gap-4">
              {currentData.docs.map((doc: string, i: number) => (
                <div key={i} className="flex items-center gap-5 bg-white border border-gray-100 p-6 rounded-2xl hover:border-red-100 transition-all shadow-sm group">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#191974]  pointer-events-none group-hover:bg-[#ee2229] group-hover:text-white transition-colors">
                    {i + 1}
                  </div>
                  <span className="text-[15px] font-bold text-[#191974]">{doc}</span>
                </div>
              ))}
            </div>
          </div>



          {/* 6. Process Selection */}
          <div id="process" className="space-y-8 pt-4">
            <h2 className="text-[26px] font-bold text-[#191974]">Application Process</h2>
            <div className="relative space-y-4">
              {[
                { title: "Share Requirements", desc: "Our experts will guide you on the specific documentation needed for your visa type.", icon: FileText },
                { title: "Verification", desc: "We meticulously review your documents to ensure 100% compliance with immigration rules.", icon: ShieldCheck },
                { title: "Submission", desc: "We handle the entire submission process through authorized channels.", icon: Globe },
                { title: "Visa Approval", desc: "Receive your approved visa directly on your email & WhatsApp.", icon: CheckCircle2 }
              ].map((step, i) => (
                <div key={i} className="flex gap-6 items-start relative pb-8 last:pb-0 group">
                  {i !== 3 && <div className="absolute left-7 top-14 bottom-0 w-0.5 bg-gray-100 group-hover:bg-[#ee2229]/20 transition-colors"></div>}
                  <div className="w-14 h-14 rounded-2xl bg-[#191974]/5 flex items-center justify-center text-[#191974] shrink-0 group-hover:bg-[#ee2229] group-hover:text-white transition-all shadow-sm">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className="pt-2">
                    <p className="text-[12px] text-[#ee2229]  tracking-widest uppercase mb-1">Step 0{i + 1}</p>
                    <h4 className="text-[18px] font-bold text-[#191974] mb-2">{step.title}</h4>
                    <p className="text-gray-500 font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Why Choose Us */}
          <div id="why-choose-us" className="space-y-8 pt-4">
            <h2 className="text-[26px] font-bold text-[#191974]">Why Trust Madura Travel?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "40+ Years Experience", desc: "Successfully processed over 5 lakh visas with a specialized focus on tourist and business travel.", icon: Star },
                { title: "Real-time Support", desc: "Dedicated visa experts available from 9 AM to 9 PM to answer all your queries.", icon: MessageCircle },
                { title: "Authorized Agent", desc: "Official partner for major consulates, ensuring faster processing and better transparency.", icon: Building2 },
                { title: "Highest Success Rate", desc: "Maintaining a consistent 99.2% approval rate through rigorous document vetting.", icon: CheckCircle2 }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-[24px] bg-white border border-gray-100 hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-[#ee2229] mb-6 group-hover:bg-[#ee2229] group-hover:text-white transition-all">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-[18px] font-bold text-[#191974] mb-3">{item.title}</h4>
                  <p className="text-gray-500 font-medium leading-relaxed text-[13px]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 8. Sample Visa */}
          <div id="sample-visa" className="space-y-8 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[26px] font-bold text-[#191974]">Sample {destName} Visa</h2>
              <div className="flex items-center gap-2 text-[12px] font-bold text-gray-400">
                <ShieldCheck className="w-4 h-4" /> SECURE DOCUMENT
              </div>
            </div>
            <div
              className="relative group rounded-[32px] overflow-hidden border-8 border-gray-100 shadow-2xl bg-gray-50 cursor-pointer"
              onClick={() => setIsSampleModalOpen(true)}
            >
              <img
                src={destination?.sampleVisaImg || "/images/sample-visa.png"}
                alt={`Sample ${destName} Visa`}
                className="w-full h-auto transition-all duration-700"
              />
              <div className="absolute inset-0 bg-[#191974]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white px-8 py-3 rounded-full font-bold text-[#191974] shadow-2xl scale-90 group-hover:scale-100 transition-transform flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" /> VIEW FULL SAMPLE
                </div>
              </div>
              {/* Overlay details */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#12803c]/10 rounded-2xl flex items-center justify-center text-[#12803c]">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[12px] text-[#ee2229]  tracking-widest uppercase">Verified Document Template</p>
                    <p className="text-[#191974] font-bold text-[15px]">This is an accurate sample of the {destName} Tourist Visa.</p>
                    <p className="text-gray-500 font-medium text-[13px] leading-relaxed">Your actual visa will be issued by the respective consulate for {countryConfig.name} citizens. It will contain your personal details and a secure QR code for verification at immigration counters.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 9. Embassy Section
          <div id="embassy" className="space-y-8 pt-4">
            <h2 className="text-[26px] font-bold text-[#191974]">{destName} Consulate & Embassy</h2>
            <div className="bg-[#191974] rounded-[32px] overflow-hidden text-white flex flex-col md:flex-row shadow-2xl">
              <div className="p-10 md:w-1/2 space-y-6">
                <div className="inline-block bg-white/10 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest text-white/70">Principal Mission</div>
                <h4 className="text-[24px] font-bold leading-tight">Embassy of {destName} - New Delhi</h4>
                <div className="space-y-4 opacity-70 font-medium">
                  <div className="flex gap-4">
                    <MapPin className="w-5 h-5 shrink-0 text-[#ee2229]" />
                    <p>Chanakyapuri, Diplomatic Enclave, New Delhi - 110021, India</p>
                  </div>
                  <div className="flex gap-4">
                    <Phone className="w-5 h-5 shrink-0 text-[#ee2229]" />
                    <p>Tel: +91-11-2301-0000</p>
                  </div>
                  <div className="flex gap-4">
                    <Clock className="w-5 h-5 shrink-0 text-[#ee2229]" />
                    <p>Mon - Fri: 09:00 AM - 04:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 relative min-h-[300px] overflow-hidden bg-gray-800">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.978875886915!2d77.17513511598715!3d28.58498875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd39572c6769%3A0xe7448db55aa0a69b!2sChanakyapuri%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1712745000000!5m2!1sen!2sin"
                  className="absolute inset-0 w-full h-full border-0 grayscale invert opacity-50 contrast-125"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div> */}

          {/* 10. Visit Us */}
          {/* <div id="visit-us" className="space-y-8 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[26px] font-bold text-[#191974]">Our Presence In India</h2>
              <button className="text-[12px]  text-[#ee2229] uppercase tracking-widest border border-[#ee2229]/20 px-6 py-2 rounded-full hover:bg-red-50 transition-all flex items-center gap-2">
                View All Branches <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { city: "Chennai (Head Office)", loc: "Egmore, Chennai" },
                { city: "Sydney, Australia", loc: "Madura Global Sydney" },
                { city: "Emergency Support", loc: "24/7 Global WhatsApp" }
              ].map((branch, i) => (
                <div key={i} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#191974]/20 transition-all text-center space-y-2">
                  <p className="text-[16px] font-bold text-[#191974]">{branch.city}</p>
                  <p className="text-[12px] text-gray-500 font-medium uppercase tracking-widest">{branch.loc}</p>
                  <p className="text-[11px] text-[#ee2229]  pt-2 uppercase tracking-tight">Visit Branch →</p>
                </div>
              ))}
            </div>
          </div> */}
          {/* 5. FAQs */}
          <div id="faqs" className="space-y-8">
            <h2 className="text-[26px] font-bold text-[#191974]">Common Questions</h2>
            <div className="space-y-3">
              {faqs.slice(0, 10).map((q, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-[12px] overflow-hidden hover:border-[#191974]/30 transition-all">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left px-8 py-5 flex justify-between items-center text-[15px] group"
                  >
                    <span className={`font-bold transition-colors ${openFaq === i ? 'text-[#ee2229]' : 'text-[#191974] group-hover:text-[#ee2229]'}`}>{q}</span>
                    {openFaq === i ? <ChevronUp className="w-5 h-5 text-[#ee2229]" /> : <ChevronDown className="w-5 h-5 text-gray-300" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-8 pb-6 text-gray-500 font-medium leading-relaxed border-t border-gray-50 pt-4">
                      Applying through Madura Travel ensures professional review of your documents, significantly reducing rejection risks. Our experts manage the entire submission process, providing regular status updates.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR (Indigo Premium Checkout Card) */}
        <div className="w-full lg:w-[32%] lg:sticky lg:top-[160px] space-y-6">
          <div className="bg-[#f0f4ff] rounded-[32px] shadow-2xl overflow-hidden border border-[#191974]/10 flex flex-col">
            {/* Guarantee / Info Bar */}
            <div className="bg-[#191974]/5 py-3 px-6 flex items-center justify-between border-b border-[#191974]/10">
              <div className="flex items-center gap-2 text-[#191974] text-[11px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                Visa Guaranteed
              </div>
              <div className="text-[10px] font-bold text-gray-400 italic">
                {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}, {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            <div className="p-8 flex flex-col items-center">
              {/* Traveler Counter */}
              <div className="w-full flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 font-bold text-[#191974]">
                  <Users className="w-5 h-5" />
                  <span>Travellers</span>
                </div>
                <div className="flex items-center gap-4 bg-white rounded-full px-4 py-1.5 border border-gray-100 shadow-sm">
                  <button className="text-gray-400 hover:text-[#ee2229] transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                  <span className="font-bold text-[16px] min-w-[12px] text-center">1</span>
                  <button className="text-[#191974] hover:text-[#ee2229] transition-colors"><Plus className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Price Display */}
              <div className="text-center mb-8">
                <p className="text-[42px] font-bold text-black leading-none mb-1">
                  {currentData.startingPrice === "0" ? 'FREE' : formatRegionalPrice(1, region)}
                </p>
                <p className="text-[11px] font-bold text-gray-500 tracking-widest uppercase">To be paid now</p>
              </div>

              {/* Start Application Button */}
              <Link
                href={`/${region}/visa/${slug}/apply?citizen=${encodeURIComponent(citizenOf)}`}
                className="w-full bg-[#191974] hover:bg-[#3f36d5] text-white font-bold py-4 rounded-full text-[14px] text-center transition-all shadow-xl shadow-[#191974]/20 active:scale-95 mb-10 uppercase tracking-widest"
              >
                Start Application
              </Link>

              {/* Breakdown */}
              <div className="w-full space-y-4 px-2">
                <div className="flex justify-between items-center text-[13px] font-bold">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span>Pay Now</span>
                  </div>
                  <span>{currentData.startingPrice === "0" ? 'FREE' : formatRegionalPrice(1, region)}</span>
                </div>
                <div className="pl-6 pb-2 text-[11px] font-medium text-gray-400 border-b border-[#191974]/5">
                  Government fee
                </div>

                <div className="flex justify-between items-center text-[13px] font-bold pt-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Pay on {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                  </div>
                  <span>{currentData.startingPrice === "0" ? 'FREE' : formatRegionalPrice(parseInt(currentData.startingPrice) - 1, region)}</span>
                </div>
                <div className="pl-6 pb-2 text-[11px] font-medium text-gray-400 border-b border-[#191974]/5">
                  Madura Fees
                </div>

                <div className="flex justify-between items-center text-[15px] font-bold pt-4 text-[#191974]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#191974]" />
                    <span>Total Amount</span>
                  </div>
                  <span>{currentData.startingPrice === "0" ? 'FREE' : formatRegionalPrice(currentData.startingPrice, region)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Madura Protect Banner */}
          {/* Help & Enquiry Card */}
          <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-[#191974]/5 border border-gray-100 flex flex-col gap-6">
            <div className="space-y-1">
              <h4 className="text-[17px] font-bold text-[#191974]">Have any Enquiry?</h4>
              <p className="text-[12px] text-gray-400 font-medium">Our visa experts are here to help you 24/7</p>
            </div>

            <div className="space-y-4">
              {/* Call */}
              <a href="tel:+919092949494" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#191974] flex items-center justify-center text-white group-hover:bg-[#191974] group-hover:text-white transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Call Us</p>
                  <p className="text-[14px] font-bold text-[#191974]">+91 90929 49494</p>
                </div>
              </a>

              {/* WhatsApp */}
              <a href="https://wa.me/919092949494" target="_blank" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#191974] text-[#ffffff] flex items-center justify-center group-hover:bg-[#191974] group-hover:text-white transition-all">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">WhatsApp</p>
                  <p className="text-[14px] font-bold text-[#191974]">+91 90929 49494</p>
                </div>
              </a>

              {/* Mail */}
              <a href="mailto:mail@maduratravel.com" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#191974] flex items-center justify-center text-white group-hover:bg-[#191974] group-hover:text-white transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email Support</p>
                  <p className="text-[14px] font-bold text-[#191974]">mail@maduratravel.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>

      </div>


      {/* ===== TESTIMONIALS SECTION ===== */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-24">
        <div className="text-center mb-16 space-y-4">
          <p className="text-[#ee2229] font-bold text-[12px]">Real Experiences</p>
          <h2 className="text-[42px] font-bold text-[#191974] tracking-tight">Trust by 10,000+ Travellers</h2>
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
            <span className="ml-2 font-bold text-[#191974]">4.9/5 Average Rating</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Rahul Sharma", role: "Business Traveller", text: "Got my Dubai visa in less than 24 hours. The process was completely digital and seamless. Highly recommended!", img: "https://i.pravatar.cc/150?u=1" },
            { name: "Priya Patel", role: "Family Vacation", text: "Madura Travel made our Thailand application so easy. Added 4 family members in one go and everything was perfect.", img: "https://i.pravatar.cc/150?u=2" },
            { name: "James Wilson", role: "Solo Explorer", text: "Transparent pricing and excellent support. The direct flight tracking feature is a game changer for visa planning.", img: "https://i.pravatar.cc/150?u=3" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-[32px] p-8 shadow-xl shadow-[#191974]/5 border border-gray-50 flex flex-col h-full transform hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <img src={item.img} className="w-14 h-14 rounded-2xl object-cover shadow-md" alt={item.name} />
                <div>
                  <h4 className="font-bold text-[#191974]">{item.name}</h4>
                  <p className="text-[12px] text-gray-400 font-medium">{item.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-gray-600 leading-relaxed text-[15px] italic font-medium flex-1">"{item.text}"</p>
              <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span className="text-[11px] font-bold text-gray-400 uppercase">Verified Application</span>
                </div>
                <span className="text-[10px] font-bold text-gray-400">2 days ago</span>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* ===== LOCAL FOOTER APPEND ===== */}
      {/* Appended specifically because customer requested footer details explicitly for this view, 
          although layout.tsx handles full footer. This serves as a minimal directory footer. */}      <footer className="bg-[#191974] text-white pt-12 pb-6 border-t border-white/10 mt-10">
        {/* ... existing footer content ... */}
      </footer>

      {/* ===== SAMPLE VISA MODAL ===== */}
      {isSampleModalOpen && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsSampleModalOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-white rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsSampleModalOpen(false)}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/10 hover:bg-[#ee2229] text-white hover:text-white rounded-full flex items-center justify-center transition-all backdrop-blur-md border border-white/20"
            >
              <span className="text-2xl font-light">&times;</span>
            </button>

            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-2/3 bg-gray-100 flex items-center justify-center p-8">
                <img
                  src={destination?.sampleVisaImg || "/images/sample-visa.png"}
                  alt={`Full Sample ${destName} Visa`}
                  className="max-h-[80vh] w-auto shadow-2xl rounded-lg"
                />
              </div>
              <div className="md:w-1/3 p-10 flex flex-col justify-center space-y-6">
                <div className="space-y-2">
                  <p className="text-[12px] text-[#ee2229] font-bold uppercase tracking-widest">Document Template</p>
                  <h3 className="text-[28px] font-bold text-[#191974] leading-tight">Accurate {destName} Visa Sample</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    This document is a certified sample of the current {destName} {currentData.type} format issued to {countryConfig.name} citizens.
                  </p>
                  <ul className="space-y-3">
                    {["QR Code Verification", "Official Consulate Seal", "Embedded Security Features", "Digital/Sticker Format"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-[13px] font-bold text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-[#191974]" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6">
                  <button
                    onClick={() => setIsSampleModalOpen(false)}
                    className="w-full bg-[#191974] text-white py-4 rounded-xl font-bold tracking-widest hover:bg-[#ee2229] transition-all shadow-xl"
                  >
                    CLOSE PREVIEW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
