import React from 'react';
import Link from 'next/link';

export default async function OurStoryPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;

  return (
    <div className="bg-[var(--background)] min-h-screen">

      {/* Hero Section */}
      <div className="w-full bg-[#191974] py-24 text-center text-white relative overflow-hidden">
        <div className="absolute top-[-120px] right-[-120px] w-[500px] h-[500px] bg-[#ee2229] opacity-15 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-80px] left-[-80px] w-[400px] h-[400px] bg-[#00a1e5] opacity-10 rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">
          <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-widest mb-6">Since 2005</span>
          <h1 className="text-[40px] md:text-[56px] font-bold font-inter mb-4 leading-tight">Our Story</h1>
          <p className="font-inter-tight opacity-90 max-w-2xl text-[16px] md:text-[18px]">
            From a small dream to a global travel powerhouse — [#ee2229] how Madura Travel became one of India's most trusted travel companies.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-[#191974]/5 to-[#191974]/10 border border-[#191974]/10 p-10 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#191974] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#191974]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </div>
            <h2 className="text-[28px] font-bold font-inter text-[#171717] mb-4">Our Vision</h2>
            <p className="text-[15px] text-gray-600 font-inter-tight leading-relaxed">
              To become the world&apos;s most trusted travel company, making premium international travel accessible to every Indian family. We envision a future where every traveler experiences the world with confidence, comfort, and joy.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#ee2229]/5 to-[#ee2229]/10 border border-[#ee2229]/10 p-10 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#ee2229] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#ee2229]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </div>
            <h2 className="text-[28px] font-bold font-inter text-[#171717] mb-4">Our Mission</h2>
            <p className="text-[15px] text-gray-600 font-inter-tight leading-relaxed">
              To deliver flawlessly executed, all-inclusive travel experiences that create lifelong memories. We are committed to innovation, safety, and personalized service at every touchpoint of the journey.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-bold font-inter text-[#191974] mb-4">Our Journey</h2>
            <p className="text-[16px] text-gray-500 font-inter-tight max-w-2xl mx-auto">Two decades of crafting world-class travel experiences.</p>
          </div>

          <div className="flex flex-col gap-0 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#191974]/10 -translate-x-1/2 hidden md:block"></div>

            {[
              { year: "2005", title: "The Beginning", desc: "Founded in Mumbai with a vision to make premium international travel accessible to Indian families.", side: "left" },
              { year: "2010", title: "Rapid Growth", desc: "Expanded to 10+ cities across India. Launched exclusive European holiday packages with in-house tour managers.", side: "right" },
              { year: "2015", title: "Global Reach", desc: "Crossed 100,000+ happy travelers. Launched operations in Australia and began serving the diaspora market.", side: "left" },
              { year: "2019", title: "Digital Transformation", desc: "Launched a fully digital booking platform, mobile app, and AI-powered itinerary recommendations.", side: "right" },
              { year: "2024", title: "Industry Leader", desc: "Recognized as India's most trusted travel company. Now serving 500,000+ travelers annually across 60+ destinations.", side: "left" }
            ].map((item, idx) => (
              <div key={idx} className={`flex items-center gap-8 mb-12 ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}>
                <div className={`flex-1 ${item.side === 'right' ? 'md:text-left' : 'md:text-right'}`}>
                  <div className={`bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow`}>
                    <span className="text-[#ee2229] font-bold text-[14px] uppercase tracking-widest">{item.year}</span>
                    <h3 className="text-[20px] font-bold text-[#171717] mt-2 mb-3 font-inter">{item.title}</h3>
                    <p className="text-[14px] text-gray-600 font-inter-tight leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                <div className="w-5 h-5 bg-[#191974] rounded-full border-4 border-white shadow-md shrink-0 hidden md:block relative z-10"></div>
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { count: "500K+", label: "Happy Travelers", icon: "👥" },
              { count: "60+", label: "Destinations", icon: "🌍" },
              { count: "20+", label: "Years of Trust", icon: "🏆" },
              { count: "98%", label: "Satisfaction Rate", icon: "⭐" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-100 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow group">
                <span className="text-[36px] mb-3 block">{stat.icon}</span>
                <h3 className="text-[32px] font-bold text-[#191974] font-inter">{stat.count}</h3>
                <span className="text-[14px] text-gray-500 font-inter-tight font-semibold">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership / Values */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-bold font-inter text-[#191974] mb-4">Our Core Values</h2>
            <p className="text-[16px] text-gray-500 font-inter-tight">The principles that guide every decision we make.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Trust & Transparency", desc: "No hidden costs, no surprises. Every itinerary and price is fully transparent.", icon: "🤝" },
              { title: "Excellence in Service", desc: "From booking to return, our trained tour managers ensure a seamless experience.", icon: "✨" },
              { title: "Innovation First", desc: "We constantly evolve our technology and packages to deliver cutting-edge travel solutions.", icon: "🚀" }
            ].map((val, idx) => (
              <div key={idx} className="bg-white border border-gray-200 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow group">
                <span className="text-[40px] mb-4 block">{val.icon}</span>
                <h3 className="text-[20px] font-bold text-[#171717] mb-3 font-inter">{val.title}</h3>
                <p className="text-[14px] text-gray-600 font-inter-tight leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#191974] relative overflow-hidden">
        <div className="absolute inset-0 bg-[#ee2229] opacity-10 rounded-[100%] blur-[120px] translate-y-1/2 scale-150"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-[36px] md:text-[48px] font-bold font-inter text-white mb-6">Ready to Explore the World?</h2>
          <p className="text-[16px] text-white/80 font-inter-tight mb-10 max-w-2xl mx-auto">Join 500,000+ happy travelers who trust Madura Travel for their dream vacations.</p>
          <Link href={`/${region}/tours`} className="inline-block bg-[#ee2229] text-white px-12 py-4 rounded-full text-[16px] font-bold tracking-wide hover:bg-white hover:text-[#ee2229] transition-all duration-300 shadow-2xl hover:-translate-y-1">
            Browse All Tours
          </Link>
        </div>
      </section>
    </div>
  );
}
