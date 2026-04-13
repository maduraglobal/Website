"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  MapPin,
  Calendar,
  Clock,
  ChevronRight,
  Plane,
  Hotel,
  Utensils,
  Camera,
  Bus,
  UserCheck,
  CheckCircle2,
  Share2,
  Heart,
  Download,
  Bot,
  Sparkles,
  Info,
  X,
  ChevronDown
} from "lucide-react";

export default function AntigravityTourDetail() {
  const [activeTab, setActiveTab] = useState("inclusions");
  const [scrolled, setScrolled] = useState(false);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  // Scroll effect for sticky elements or floating bars
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#05050A] text-gray-200 min-h-screen selection:bg-purple-500/30">
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px]"></div>
      </div>

      {/* Floating Header Summary (Shows on Scroll) */}
      <div
        className={`fixed top-28 left-0 right-0 z-50 transition-all duration-500 transform ${scrolled ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          } bg-[#0a0a12]/80 backdrop-blur-xl border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center`}
      >
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Shimla Manali Escape
          </h2>
          <span className="hidden md:inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-sm">
            <Star className="w-4 h-4 text-yellow-400 fill-current" /> 4.9
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:block text-right">
            <p className="text-sm text-gray-400">Starting from</p>
            <p className="text-lg font-bold text-white">â‚¹44,000</p>
          </div>
          <button className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            Book Now
          </button>
        </div>
      </div>

      <main className="relative z-10">
        {/* 1. Hero Section */}
        <section className="relative w-full h-[85vh] min-h-150 overflow-hidden">
          {/* Main Hero Background */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=2000"
              alt="Himalayas"
              className="w-full h-full object-cover scale-105 animate-[zoom-in_20s_ease-out_forwards]"
            />
            {/* Gradient Overlay for dark theme transition */}
            <div className="absolute inset-0 bg-linear-to-t from-[#05050A] via-[#05050A]/60 to-transparent"></div>
            <div className="absolute inset-0 bg-linear-to-r from-[#05050A]/80 via-transparent to-transparent"></div>
          </div>

          <div className="absolute inset-0 flex flex-col justify-end pb-12">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row justify-between items-end gap-8">
              {/* Left Content Card (Glassmorphism) */}
              <div className="relative group md:w-2/3 max-w-2xl bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl overflow-hidden shadow-2xl transition-all hover:bg-white/10">
                {/* Glow effect on hover */}
                <div className="absolute -inset-1 bg-linear-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold  tracking-wider">
                      Premium Edition
                    </span>
                    <span className="flex items-center gap-1 text-yellow-400 text-sm font-semibold">
                      <Star className="w-4 h-4 fill-current" /> 4.9 (128 Reviews)
                    </span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                    Shimla Manali <br />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500">
                      Escape
                    </span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-300  mb-8 max-w-lg">
                    Experience the Himalayas like never before. Journey through snow-capped peaks, lush valleys, and mystical ancient trails.
                  </p>

                  {/* Testimonial Snippet */}
                  <div className="flex items-center gap-4 bg-black/40 rounded-2xl p-4 border border-white/5">
                    <img src="https://i.pravatar.cc/100?img=33" alt="Traveler" className="w-12 h-12 rounded-full border-2 border-purple-500/50" />
                    <div>
                      <p className="text-sm italic text-gray-300">"The most surreal & effortlessly planned trip I've ever taken. A true premium experience."</p>
                      <p className="text-xs font-semibold text-purple-400 mt-1">â€” Ananya R.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side Image Carousel Preview */}
              <div className="hidden md:flex flex-col gap-4">
                <div className="flex gap-4">
                  {[
                    "https://images.unsplash.com/photo-1593181629936-11c699b803f0?auto=format&fit=crop&q=80&w=300",
                    "https://images.unsplash.com/photo-1590593162201-f67611a18b87?auto=format&fit=crop&q=80&w=300",
                    "https://images.unsplash.com/photo-1581404118312-3298c4847e92?auto=format&fit=crop&q=80&w=300"
                  ].map((img, i) => (
                    <div key={i} className="relative w-24 h-32 rounded-2xl overflow-hidden border border-white/20 cursor-pointer hover:border-blue-400 transition-all hover:scale-105 shadow-xl">
                      <img src={img} className="w-full h-full object-cover" alt="Gallery" />
                      {i === 2 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                          <span className="text-white font-bold">+12</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col lg:flex-row gap-12">
          {/* Left Column (Details) */}
          <div className="w-full lg:w-2/3 space-y-16">
            {/* 2. Tour Overview */}
            <div className="flex flex-wrap items-center gap-8 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400  tracking-widest">Duration</p>
                  <p className="text-xl font-bold text-white">6 Days / 5 Nights</p>
                </div>
              </div>
              <div className="w-px h-12 bg-white/10 hidden md:block"></div>
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400  tracking-widest">Route</p>
                  <div className="flex items-center gap-2 text-white font-medium mt-1 text-sm md:text-base flex-wrap">
                    Delhi <ChevronRight className="w-4 h-4 text-gray-500" />
                    Shimla <ChevronRight className="w-4 h-4 text-gray-500" />
                    Manali <ChevronRight className="w-4 h-4 text-gray-500" />
                    Chandigarh
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insight Box (Bonus) */}
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500/30 blur-2xl rounded-full"></div>
              <div className="w-14 h-14 rounded-full bg-black/50 border border-white/10 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Sparkles className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  Smart AI Insight
                </h3>
                <p className="text-gray-300 text-sm mt-1">
                  Booking for December? Prices are likely to increase by 15% next week due to high demand for snowfall season. We recommend securing your dates now.
                </p>
              </div>
            </div>

            {/* 4. Tour Includes (Icon-Based) */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-purple-500 rounded-full inline-block"></span>
                Premium Inclusions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { icon: Hotel, label: "4/5 Star Hotels" },
                  { icon: Utensils, label: "All Meals" },
                  { icon: Plane, label: "Return Flights" },
                  { icon: Camera, label: "Sightseeing" },
                  { icon: Bus, label: "AC Transport" },
                  { icon: UserCheck, label: "Tour Manager" }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center gap-3 bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                    <item.icon className="w-8 h-8 text-cyan-400" />
                    <span className="text-sm font-medium text-gray-200">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Tour Highlights */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-cyan-400 rounded-full inline-block"></span>
                Tour Highlights
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Stroll along the vibrant Mall Road in Shimla",
                  "Experience thrill at Solang Valley",
                  "Cross the engineering marvel, Atal Tunnel",
                  "Witness snow-clad peaks at Rohtang Pass",
                  "Visit the ancient Hadimba Temple",
                  "Relaxing hot springs in Vashisht"
                ].map((hl, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 8. Itinerary */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-blue-500 rounded-full inline-block"></span>
                Intelligent Itinerary
              </h2>
              <div className="space-y-4">
                {[
                  { d: 1, title: "Arrival in Delhi & Transfer to Shimla", desc: "Welcome to Delhi airport. Our premium transport will take you on a scenic drive to the Queen of Hills, Shimla. Check into your luxury resort and enjoy a welcome dinner." },
                  { d: 2, title: "Shimla Local & Kufri Sightseeing", desc: "After breakfast, visit Kufri for snow activities. Later, explore Mall Road, The Ridge, and Christ Church at your own pace." },
                  { d: 3, title: "Scenic Drive to Manali", desc: "Drive through the breathtaking Kullu Valley. Stop for river rafting (optional) and visit the Kullu Shawl factories. Evening arrival in Manali." },
                  { d: 4, title: "Solang Valley & Atal Tunnel", desc: "Full day excursion to Solang Valley for adventure sports. Drive through the stunning Atal Tunnel to witness the contrast of LAhaul Valley." },
                  { d: 5, title: "Manali Local Exploration", desc: "Visit Hadimba Temple, Vashisht Hot Springs, and Club House. Free evening for cafe hopping in Old Manali." },
                  { d: 6, title: "Departure via Chandigarh", desc: "Depart for Chandigarh after breakfast. Drop at Airport/Railway station for your onward journey with Antigravity memories." },
                ].map((day) => (
                  <div key={day.d} className="border border-white/10 bg-white/5 rounded-2xl overflow-hidden backdrop-blur-md">
                    <button
                      onClick={() => setExpandedDay(expandedDay === day.d ? null : day.d)}
                      className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="shrink-0 w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center font-bold text-purple-400">
                          Day {day.d}
                        </span>
                        <h4 className="text-lg font-bold text-left text-gray-100">{day.title}</h4>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedDay === day.d ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${expandedDay === day.d ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="pt-4 border-t border-white/10 text-gray-300 leading-relaxed text-sm md:text-base">
                        {day.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 9. Tour Information Tabs */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-2 backdrop-blur-md">
              <div className="flex space-x-2 p-2 bg-black/40 rounded-2xl overflow-x-auto no-scrollbar">
                {["inclusions", "exclusions", "preparation"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold capitalize transition-all whitespace-nowrap ${activeTab === tab
                      ? 'bg-linear-to-r from-blue-600/80 to-purple-600/80 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-6 md:p-8 min-h-50">
                {activeTab === 'inclusions' && (
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#191974] shrink-0" /> Premium accommodation in 4-star properties</li>
                    <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#191974] shrink-0" /> Fast-track airport transfers in luxury SUVs</li>
                    <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#191974] shrink-0" /> Daily breakfast and choice of 3 dinner cuisines</li>
                  </ul>
                )}
                {activeTab === 'exclusions' && (
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex gap-3"><X className="w-5 h-5 text-[#ee2229] shrink-0" /> Any personal expenses or room service items</li>
                    <li className="flex gap-3"><X className="w-5 h-5 text-[#ee2229] shrink-0" /> Optional adventure sports at Solang Valley</li>
                    <li className="flex gap-3"><X className="w-5 h-5 text-[#ee2229] shrink-0" /> Medical/Travel Insurance (can be added separately)</li>
                  </ul>
                )}
                {activeTab === 'preparation' && (
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex gap-3"><Info className="w-5 h-5 text-[#191974] shrink-0" /> Pack heavy woolens for Rohtang/Atal Tunnel visits.</li>
                    <li className="flex gap-3"><Info className="w-5 h-5 text-[#191974] shrink-0" /> Carry Govt approved ID cards (original).</li>
                    <li className="flex gap-3"><Info className="w-5 h-5 text-[#191974] shrink-0" /> Moisturizers and sunscreens are essential for high altitude.</li>
                  </ul>
                )}
              </div>
            </div>

            {/* 10. Contact / Callback Form */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 p-8 md:p-10">
              <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 to-black z-0"></div>
              <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4">Want a Custom Experience?</h3>
                  <p className="text-gray-400 mb-6">Drop your details below and our concierge travel experts will curate the perfect modification to this itinerary for you.</p>
                </div>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors" />
                  <input type="tel" placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors" />
                  <button className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors">
                    Request Callback
                  </button>
                </form>
              </div>
            </div>

          </div>

          {/* Right Column (Sticky Sidebar) */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-28 space-y-6">
              {/* 3. Pricing Card */}
              <div className="bg-[#0A0B14]/80 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                  <div className="flex gap-3">
                    <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors border border-white/5">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors border border-white/5">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors border border-white/5">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                  {/* Price info */}
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-gray-400 text-sm tracking-widest ">Total Price</p>
                      <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded font-bold border border-green-500/20">20% OFF</span>
                    </div>
                    <div className="flex items-end gap-3">
                      <h2 className="text-4xl md:text-5xl  text-white tracking-tight">â‚¹44,000</h2>
                      <span className="text-gray-500 line-through text-lg pb-1">â‚¹55,000</span>
                    </div>
                    <p className="text-sm text-purple-400 mt-2 font-medium flex items-center gap-1">
                      <Sparkles className="w-4 h-4" /> No Cost EMI starts at â‚¹4,284/month
                    </p>
                  </div>

                  {/* Flight Toggle */}
                  <div className="bg-black/50 p-1 rounded-xl flex border border-white/5">
                    <button className="flex-1 py-2 text-sm font-semibold rounded-lg bg-white/10 text-white shadow-sm border border-white/5">With Flights</button>
                    <button className="flex-1 py-2 text-sm font-medium rounded-lg text-gray-400 hover:text-white transition-colors">Without Flights</button>
                  </div>

                  {/* 6. Date Selection Section (Mini) */}
                  <div>
                    <h4 className="text-sm text-gray-300 font-semibold mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Select Departure
                    </h4>
                    <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                      {/* Active Date */}
                      <button className="shrink-0 w-24 p-3 rounded-xl bg-purple-600/20 border-2 border-purple-500 relative flex flex-col items-center justify-center overflow-hidden">
                        <div className="absolute top-0 right-0 left-0 bg-purple-500 text-[9px] font-bold text-white text-center py-0.5 ">Lowest</div>
                        <span className="text-gray-300 text-xs mt-3">Dec</span>
                        <span className="text-xl font-bold text-white">12</span>
                        <span className="text-[10px] text-green-400 mt-1">â‚¹44k</span>
                      </button>
                      {/* Other Dates */}
                      {[15, 22, 28].map(day => (
                        <button key={day} className="shrink-0 w-24 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center justify-center">
                          <span className="text-gray-400 text-xs">Dec</span>
                          <span className="text-xl font-bold text-gray-200">{day}</span>
                          <span className="text-[10px] text-gray-400 mt-1">â‚¹46k</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 font-bold py-4 rounded-xl transition-all shadow-sm">
                      Check Dates & Prices
                    </button>
                    <button className="relative w-full overflow-hidden group bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]">
                      <span className="relative z-10">Proceed to Book</span>
                      <div className="absolute inset-0 h-full w-full bg-linear-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                  {/* Summary / Mini Info */}
                  <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-green-500" /> Free cancellation up to 45 days
                  </p>
                </div>
              </div>

              {/* People also viewed (AI Recommendation Widget) */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <h4 className="text-sm font-bold text-gray-300  tracking-wider mb-4">You might also love</h4>
                <div className="space-y-4">
                  <div className="flex gap-4 items-center group cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=150" alt="Kashmir" className="w-16 h-16 rounded-xl object-cover transition-transform group-hover:scale-105" />
                    <div>
                      <h5 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">Kashmir Paradise</h5>
                      <p className="text-xs text-gray-400">5 Days â€¢ â‚¹42,000</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center group cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1614531341773-3bff8b7cb3fc?auto=format&fit=crop&q=80&w=150" alt="Leh" className="w-16 h-16 rounded-xl object-cover transition-transform group-hover:scale-105" />
                    <div>
                      <h5 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">Leh Ladakh Adventure</h5>
                      <p className="text-xs text-gray-400">8 Days â€¢ â‚¹58,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* AI Trip Assistant Chatbot Floating FAB */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-linear-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:scale-110 transition-transform z-50 group border-2 border-purple-400/30">
        <Bot className="w-6 h-6 text-white" />
        <span className="absolute right-full mr-4 bg-black/80 backdrop-blur-md text-white text-sm px-4 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 pointer-events-none">
          Ask AI Assistant
        </span>
      </button>

      {/* Extra styles for hiding scrollbars nicely */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
