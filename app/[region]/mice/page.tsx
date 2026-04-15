"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FallbackImage from '@/app/components/FallbackImage';
import { 
  Users, 
  Award, 
  Globe, 
  CheckCircle2, 
  Calendar, 
  Briefcase, 
  Music, 
  Camera, 
  Heart, 
  MapPin, 
  ArrowRight,
  ChevronDown,
  Plane,
  Building2,
  BadgeCheck,
  Mail
} from 'lucide-react';

export default function MICEPage() {
  const params = useParams();
  const region = (params?.region as string) || 'en-in';

  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    eventType: '',
    groupSize: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = "Valid phone number required";
    }

    if (!formData.company) newErrors.company = "Company name is required";
    if (!formData.name) newErrors.name = "Contact person is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    }
  };

  const coreServices = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Meetings",
      desc: "Professional support for executive meetings, annual reviews, and team workshops. We handle everything from venues and tech setup to travel logistics.",
      color: "from-[#191974] to-[#191974]/80"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Incentives",
      desc: "Motivate teams and reward top performers with tailor-made incentive travel packages in stunning domestic or international destinations.",
      color: "from-[#ee2229] to-[#ee2229]/80"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Conferences",
      desc: "Plan and execute successful large-scale conferences, including delegate management, venue bookings, visa support, branding, and catering.",
      color: "from-[#191974] to-[#ee2229]"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Exhibitions & Events",
      desc: "Complete exhibition solutions—from booth design and coordination to vendor sourcing, local transport, and on-site support.",
      color: "from-[#ee2229] to-[#191974]"
    }
  ];

  const nicheExpertise = [
    {
      title: "Weddings",
      icon: <Heart className="w-6 h-6" />,
      desc: "Bespoke weddings at dreamy destinations. From guest logistics to themed décor, we managed actor Nepolean's grand wedding in Tokyo.",
      bg: "bg-pink-50"
    },
    {
      title: "Music & Festivals",
      icon: <Music className="w-6 h-6" />,
      desc: "Limca Record holders for international cultural outreach. Over 550+ global concerts coordinated since 1986.",
      bg: "bg-purple-50"
    },
    {
      title: "Film Shootings",
      icon: <Camera className="w-6 h-6" />,
      desc: "End-to-end travel logistics for film productions, from flights and visas to equipment freight for crews and artists.",
      bg: "bg-blue-50"
    },
    {
      title: "Social Events",
      icon: <Users className="w-6 h-6" />,
      desc: "Refined private gatherings, milestone birthdays, and family retreats planned across the globe with stress-free precision.",
      bg: "bg-orange-50"
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-20">

      {/* --- HERO SECTION --- */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/mice-hero.png"
            alt="Corporate MICE Travel"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-[#ee2229]"></span>
              <span className="text-[14px] font-bold uppercase tracking-[0.3em] text-[#ee2229]">Empowering Business Travel</span>
            </div>
            <h1 className="text-[48px] md:text-[72px] font-extrabold leading-[1.1] mb-8">
              Corporate MICE <br />
              <span className="text-white/80">Tailored to Perfection</span>
            </h1>
            <p className="text-[18px] md:text-[20px] mb-10 text-gray-200 leading-relaxed font-medium">
              Meetings, Incentives, Conferences & Exhibitions. Madura Travel Service brings 40+ years of expertise to your corporate journeys.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#ee2229] hover:bg-white hover:text-[#191974] px-10 py-5 rounded-full font-bold text-[16px] transition-all duration-300 shadow-xl flex items-center gap-2 group"
              >
                Inquire Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-6 px-4">
                <div className="text-center">
                  <p className="text-[24px] font-bold">350+</p>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Corporates Served</p>
                </div>
                <div className="w-px h-10 bg-white/20"></div>
                <div className="text-center">
                  <p className="text-[24px] font-bold">550+</p>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Events Hosted</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating elements for "Premium" feel */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent"></div>
      </section>

      {/* --- CORE SERVICES SECTION --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-[14px] font-bold text-[#ee2229] uppercase tracking-[0.3em] mb-4">Our Core Offerings</h2>
            <h3 className="text-[36px] md:text-[44px] font-black text-[#191974] leading-tight">Comprehensive MICE Solutions</h3>
            <div className="w-20 h-1.5 bg-[#ee2229] mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreServices.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-[40px] bg-white border border-gray-100 shadow-[0_15px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col items-center text-center hover:-translate-y-2"
              >
                <div className={`w-20 h-20 rounded-[28px] bg-linear-to-br ${s.color} text-white flex items-center justify-center mb-8 shadow-lg transform group-hover:rotate-10deg transition-transform duration-500`}>
                  {s.icon}
                </div>
                <h4 className="text-[22px] font-bold text-[#191974] mb-4">{s.title}</h4>
                <p className="text-gray-500 text-[15px] leading-relaxed mb-6">{s.desc}</p>
                <div className="mt-auto">
                  <div className="w-10 h-1 bg-gray-100 group-hover:w-20 group-hover:bg-[#ee2229] transition-all duration-500 rounded-full"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NICHE EXPERTISE (FEATURED STORY) --- */}
      <section className="py-24 bg-gray-50/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-[14px] font-bold text-[#ee2229] uppercase tracking-[0.3em] mb-4">Beyond Conventional</h2>
              <h3 className="text-[36px] md:text-[44px] font-black text-[#191974] leading-tight mb-8">Niche MICE Expertise</h3>
              <p className="text-gray-600 text-[16px] leading-[1.8] mb-10">
                At Madura Travel, we transform conventional gatherings into extraordinary, immersive experiences. We don&apos;t just plan travel; we create legacies.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {nicheExpertise.map((item, i) => (
                  <div key={i} className={`${item.bg} p-6 rounded-3xl border border-white hover:shadow-md transition-all group`}>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="text-[#191974]">{item.icon}</div>
                      <h5 className="font-bold text-[#191974]">{item.title}</h5>
                    </div>
                    <p className="text-[13px] text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-square rounded-[60px] overflow-hidden shadow-2xl">
                <FallbackImage src="/mice-expertise.png" alt="MICE Expertise" className="object-cover w-full h-full" fallbackSrc="/logo.webp" />
                <div className="absolute inset-0 bg-linear-to-t from-[#191974]/80 to-transparent"></div>
                <div className="absolute bottom-10 left-10 text-white">
                  <div className="flex items-center gap-2 text-[#ee2229] mb-2">
                    <Award className="w-6 h-6" />
                    <span className="font-bold text-[14px] uppercase tracking-wider">Limca Record Holder</span>
                  </div>
                  <h4 className="text-[28px] font-bold leading-tight">Limca Record for International <br />Cultural Outreach</h4>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#ee2229] rounded-full flex flex-col items-center justify-center text-white p-6 shadow-xl border-4 border-white rotate-12">
                <p className="text-[28px] font-black">40+</p>
                <p className="text-[10px] font-bold text-center uppercase tracking-tighter">Years of <br />Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- DESTINATIONS SECTION --- */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-[14px] font-bold text-[#ee2229] uppercase tracking-[0.3em] mb-4">Strategic Locations</h2>
              <h3 className="text-[36px] md:text-[44px] font-black text-[#191974]">Premier MICE Destinations</h3>
            </div>
            <p className="text-gray-500 max-w-md font-medium">Every destination is handpicked for its world-class infrastructure, global connectivity, and professional event-readiness.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="group relative h-[400px] rounded-[40px] overflow-hidden cursor-pointer shadow-xl">
              <FallbackImage src="https://images.unsplash.com/photo-1542151408-aff34a97321c?q=80&w=1200&auto=format&fit=crop" alt="Domestic Destinations" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" fallbackSrc="/logo.webp" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <h4 className="text-[28px] font-extrabold mb-4">Domestic Hubs</h4>
                <div className="flex flex-wrap gap-2">
                  {["Goa", "Jaipur", "Coorg", "Udaipur", "Ooty", "Mahabalipuram"].map(d => (
                    <span key={d} className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-[12px] font-bold border border-white/30">{d}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="group relative h-[400px] rounded-[40px] overflow-hidden cursor-pointer shadow-xl">
              <FallbackImage src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop" alt="International Destinations" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" fallbackSrc="/logo.webp" />
              <div className="absolute inset-0 bg-linear-to-t from-[#191974]/90 via-[#191974]/20 to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <h4 className="text-[28px] font-extrabold mb-4">International Circuits</h4>
                <div className="flex flex-wrap gap-2">
                  {["Dubai", "Singapore", "Thailand", "Malaysia", "Sri Lanka", "Maldives", "Europe"].map(d => (
                    <span key={d} className="px-4 py-2 bg-[#ee2229]/80 backdrop-blur-md rounded-full text-[12px] font-bold border border-[#ee2229]/30">{d}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (TRUST INDICATORS) --- */}
      <section className="py-24 bg-[#191974] text-white relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ee2229] opacity-10 rounded-full blur-[150px] -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400 opacity-5 rounded-full blur-[120px] -ml-20 -mb-20"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-[14px] font-bold text-[#ee2229] uppercase tracking-[0.3em] mb-4">Why Madura Travel?</h2>
                <h3 className="text-[36px] md:text-[44px] font-black leading-tight">Experience That Drives <br />Business Impact</h3>
              </div>
              <div className="space-y-6">
                {[
                  { title: "Financial Transparency", desc: "Adaptable solutions with complete ROI visibility and cost-efficiency." },
                  { title: "Large-Scale Group Handling", desc: "Decades of experience managing massive delegations and global crews." },
                  { title: "Strong Global Network", desc: "Trusted partnerships with premium hotels, vendors, and leading airlines." },
                  { title: "Cultural Understanding", desc: "Deep cultural insight for meaningful experiences, especially for NRI groups." }
                ].map((f, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#ee2229] group-hover:rotate-12 transition-all duration-300">
                      <CheckCircle2 className="w-6 h-6 text-[#ee2229] group-hover:text-white" />
                    </div>
                    <div>
                      <h5 className="text-[18px] font-bold mb-1">{f.title}</h5>
                      <p className="text-gray-400 text-[14px] leading-relaxed font-medium">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[60px] border border-white/10 shadow-3xl">
              <div className="text-center mb-10">
                <BadgeCheck className="w-16 h-16 text-[#ee2229] mx-auto mb-4" />
                <h4 className="text-[24px] font-bold mb-2">Ready to Innovate?</h4>
                <p className="text-gray-400 font-medium">Leading the way in hybrid meetings and sustainable events.</p>
              </div>
              <div className="space-y-4">
                <div className="p-5 rounded-3xl bg-white/5 flex items-center justify-between border border-white/5">
                  <span className="font-bold flex items-center gap-3">
                    <Globe className="w-5 h-5 text-[#ee2229]" />
                    Hybrid Meetings
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#ee2229] px-2 py-1 bg-[#ee2229]/10 rounded-md">Live</span>
                </div>
                <div className="p-5 rounded-3xl bg-white/5 flex items-center justify-between border border-white/5">
                  <span className="font-bold flex items-center gap-3">
                    <Plane className="w-5 h-5 text-[#ee2229]" />
                    Intl. Logistics
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <div className="p-5 rounded-3xl bg-white/5 flex items-center justify-between border border-white/5">
                  <span className="font-bold flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-[#ee2229]" />
                    Premium Venues
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ENQUIRY FORM SECTION --- */}
      <section id="enquiry-form" className="py-24 bg-gray-50 overflow-hidden relative">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#191974] opacity-[0.02] rounded-full blur-[80px] -ml-40"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-[50px] p-10 md:p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-100"
          >
            {!submitted ? (
              <>
                <div className="text-center mb-16">
                  <div className="w-16 h-16 bg-[#ee2229]/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8 text-[#ee2229]" />
                  </div>
                  <h2 className="text-[32px] md:text-[40px] font-black text-[#191974] mb-4">Request a Proposal</h2>
                  <p className="text-gray-500 font-medium">Our dedicated corporate team will respond with custom ideas within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[12px] font-black text-[#191974] uppercase tracking-widest ml-4">Company Name</label>
                      <input
                        required
                        type="text"
                        className="w-full h-16 px-8 rounded-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#191974] outline-none transition-all font-bold text-[#191974] placeholder:text-gray-300"
                        placeholder="Enter company name..."
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                      />
                      {errors.company && <p className="text-[10px] text-red-500 font-bold ml-6">{errors.company}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[12px] font-black text-[#191974] uppercase tracking-widest ml-4">Contact Person</label>
                      <input
                        required
                        type="text"
                        className="w-full h-16 px-8 rounded-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#191974] outline-none transition-all font-bold text-[#191974] placeholder:text-gray-300"
                        placeholder="Full name..."
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                      />
                      {errors.name && <p className="text-[10px] text-red-500 font-bold ml-6">{errors.name}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[12px] font-black text-[#191974] uppercase tracking-widest ml-4">Work Email</label>
                      <input
                        required
                        type="email"
                        className={`w-full h-16 px-8 rounded-full bg-gray-50 border outline-none transition-all font-bold text-[#191974] placeholder:text-gray-300 ${errors.email ? 'border-red-400' : 'border-gray-100 focus:bg-white focus:border-[#191974]'}`}
                        placeholder="john@company.com"
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                      {errors.email && <p className="text-[10px] text-red-500 font-bold ml-6">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[12px] font-black text-[#191974] uppercase tracking-widest ml-4">Phone Number</label>
                      <input
                        required
                        type="tel"
                        className={`w-full h-16 px-8 rounded-full bg-gray-50 border outline-none transition-all font-bold text-[#191974] placeholder:text-gray-300 ${errors.phone ? 'border-red-400' : 'border-gray-100 focus:bg-white focus:border-[#191974]'}`}
                        placeholder="+91..."
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      />
                      {errors.phone && <p className="text-[10px] text-red-500 font-bold ml-6">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 relative">
                      <label className="text-[12px] font-black text-[#191974] uppercase tracking-widest ml-4">Event Type</label>
                      <select required className="w-full h-16 px-8 rounded-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#191974] outline-none transition-all font-bold text-[#191974] appearance-none cursor-pointer" onChange={e => setFormData({ ...formData, eventType: e.target.value })}>
                        <option value="">Select event type...</option>
                        <option>Board Meeting / Retreat</option>
                        <option>Incentive Reward Trip</option>
                        <option>Annual Conference / Seminar</option>
                        <option>Trade Show / Exhibition</option>
                        <option>Film Production / Shooting</option>
                        <option>Wedding / Social Event</option>
                      </select>
                      <ChevronDown className="absolute right-6 bottom-5 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                    <div className="space-y-2 relative">
                      <label className="text-[12px] font-black text-[#191974] uppercase tracking-widest ml-4">Expected Attendees</label>
                      <select required className="w-full h-16 px-8 rounded-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#191974] outline-none transition-all font-bold text-[#191974] appearance-none cursor-pointer" onChange={e => setFormData({ ...formData, groupSize: e.target.value })}>
                        <option value="">Select group size...</option>
                        <option>Below 25 people</option>
                        <option>25-100 people</option>
                        <option>100-500 people</option>
                        <option>500-1000 people</option>
                        <option>1000+ people</option>
                      </select>
                      <ChevronDown className="absolute right-6 bottom-5 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[12px] font-black text-[#191974] uppercase tracking-widest ml-4">Tell us about your requirements</label>
                    <textarea
                      rows={4}
                      className="w-full p-8 rounded-[32px] bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#191974] outline-none transition-all font-bold text-[#191974] placeholder:text-gray-300 resize-none"
                      placeholder="Share destination preferences, dates, or specific event goals..."
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" className="w-full h-18 bg-[#ee2229] hover:bg-[#191974] text-white rounded-full font-black text-[18px] transition-all duration-300 shadow-2xl shadow-[#ee2229]/20 flex items-center justify-center gap-3">
                    Submit Proposal Request
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10 border border-green-100">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10 }}
                  >
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </motion.div>
                </div>
                <h3 className="text-[40px] font-black text-[#191974] mb-4">Request Received!</h3>
                <p className="text-gray-500 text-[18px] max-w-sm mx-auto font-medium mb-12">Our corporate specialists are already reviewing your request. We&apos;ll be in touch with {formData.email} shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-10 py-4 rounded-full border-2 border-gray-100 text-[14px] font-bold text-[#191974] hover:bg-[#191974] hover:text-white transition-all transition-duration-300"
                >
                  Submit Another Inquery
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-[14px] font-bold text-[#ee2229] uppercase tracking-[0.3em] mb-4">MICE Wisdom</h2>
            <h3 className="text-[36px] font-black text-[#191974]">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-4">
            {[
              { q: "What is MICE Tourism?", a: "MICE stands for Meetings, Incentives, Conferences, and Exhibitions. It caters to corporate groups and organizations looking to host professional events or reward teams." },
              { q: "Can you handle international groups?", a: "Yes, we handle end-to-end logistics for international MICE travel, including venue selection across 60+ countries, visa processing, and global freight for event gear." },
              { q: "Do you offer on-site event support?", a: "Absolutely. We provide a dedicated team of on-ground tour managers and event coordinators to ensure 24/7 support throughout your journey." },
              { q: "What is your experience with large-scale events?", a: "We have coordinated over 550 international concerts and handled massive corporate delegations of up to 20,000 travelers with seamless precision." }
            ].map((faq, i) => (
              <div key={i} className="group border border-gray-100 rounded-[32px] overflow-hidden hover:border-[#191974] transition-all">
                <div className="px-8 py-6 flex items-center justify-between cursor-pointer">
                  <h5 className="font-bold text-[#191974] group-hover:text-[#ee2229] transition-colors">{faq.q}</h5>
                  <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#ee2229]" />
                </div>
                <div className="px-8 pb-8 pt-0">
                  <p className="text-gray-500 font-medium leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center p-12 rounded-[50px] bg-[#ee2229] text-white">
            <h4 className="text-[28px] font-black mb-6">Want to create business impact?</h4>
            <p className="mb-8 opacity-90 font-medium text-[16px]">Join 350+ corporates who trust Madura Travel for their strategic events.</p>
            <button className="bg-white text-[#ee2229] px-12 py-4 rounded-full font-black text-[16px] hover:shadow-2xl transition-all">
              Contact Corporate Desk
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
