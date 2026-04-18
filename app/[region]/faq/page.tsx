"use client";

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, HelpCircle, MessageCircle, Phone, Mail, ArrowRight, Heading4 } from 'lucide-react';
import { faqData, faqCategories } from '@/app/data/faqData';

export default function FAQPage() {
  const params = useParams();
  const region = params?.region as string || 'en-in';

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const filteredFAQs = useMemo(() => {
    return faqData.filter(item => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* 🔹 HERO SECTION */}
      <section className="bg-[#191974] pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 C30,80 70,80 100,100" fill="none" stroke="white" strokeWidth="0.5" />
            <path d="M0,90 C30,70 70,70 100,90" fill="none" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-[32px] md:text-[48px] font-bold text-white mb-6 tracking-tight">
              Frequently Asked <span className="text-white ">Questions</span>
            </h4>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              Have a question? We're here to help. Explore our comprehensive FAQ or contact our support team for personalized assistance.
            </p>

            {/* Premium Search Bar */}
            <div className="relative max-w-2xl mx-auto group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#191974] transition-colors" />
              <input
                type="text"
                placeholder="Search for answers (e.g. visa, booking, refund)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 pl-14 pr-6 rounded-full bg-white border-none shadow-2xl text-[16px] font-medium text-[#191974] outline-none focus:ring-4 focus:ring-[#f8d448]/30 transition-all"
              />
            </div>
          </motion.div>
        </div>

        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#f8d448]/10 rounded-full blur-3xl" />
      </section>

      {/* 🔹 CATEGORIES & CONTENT */}
      <section className="max-w-5xl mx-auto py-16 px-4">
        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-[13px] font-bold tracking-widest transition-all duration-300 border ${activeCategory === cat
                ? 'bg-[#191974] text-white border-[#191974] shadow-lg shadow-blue-900/20'
                : 'bg-white text-gray-500 border-gray-100 hover:border-[#191974] hover:text-[#191974]'
                }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => {
                const globalIndex = faqData.indexOf(faq);
                const isOpen = expandedIndex === globalIndex;

                return (
                  <motion.div
                    key={globalIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 ${isOpen ? 'border-[#191974]/20 shadow-xl' : 'border-gray-100 hover:border-gray-200 shadow-sm'
                      }`}
                  >
                    <button
                      onClick={() => setExpandedIndex(isOpen ? null : globalIndex)}
                      className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-[#191974] text-white' : 'bg-gray-50 text-gray-400'
                          }`}>
                          <HelpCircle className="w-5 h-5" />
                        </div>
                        <span className={`text-[17px] md:text-[19px] font-bold transition-colors ${isOpen ? 'text-[#191974]' : 'text-#191974 text-gray-600'
                          }`}>
                          {faq.question}
                        </span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-500 ${isOpen ? 'rotate-180 text-[#191974]' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                          <div className="px-6 md:px-8 pb-8 pt-0">
                            <div className="h-px bg-gray-100 mb-6" />
                            <p className="text-gray-500 leading-relaxed text-[16px] md:text-[17px] font-medium pl-14">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center bg-gray-50 rounded-[40px] border border-dashed border-gray-200"
              >
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Search className="w-10 h-10 text-gray-200" />
                </div>
                <h3 className="text-[20px] font-bold text-[#191974] mb-2">No results found</h3>
                <p className="text-gray-400 font-medium">Try searching for different keywords or clear your search.</p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                  className="mt-6 text-[#ee2229] font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 🔹 CTA SECTION */}
      <section className="bg-white border-t border-gray-100 py-24 px-4 mt-10">
        <div className="max-w-5xl mx-auto rounded-[48px] bg-[#191974] p-10 md:p-16 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
          <div className="relative z-10">
            <h4 className="text-[28px] md:text-[36px] font-bold text-white leading-tight mb-4">
              Still have questions? <br />
              <span className="text-white">We're here to help.</span>
            </h4>
            <p className="text-white/60 text-lg max-w-md">
              Our travel specialists are available 24/7 to assist you with any inquiries or bookings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 w-full md:w-auto">
            <a href="tel:+919092949494" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-5 rounded-3xl transition-all group">
              <div className="w-12 h-12 bg-white  rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-[#191974]" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-white/40 font-bold tracking-widest">Call Us</p>
                <p className="text-white font-bold text-sm">+91 90929 49494</p>
              </div>
            </a>
            <a href="mailto:mail@maduratravel.com" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-5 rounded-3xl transition-all group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-10 h-10 text-[#191974]" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-white/40 font-bold tracking-widest">Email Us</p>
                <p className="text-white font-bold text-sm">mail@maduratravel.com</p>
              </div>
            </a>
          </div>

          {/* Background Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        </div>
      </section>

      {/* 🔹 FOOTER SPACER */}
      <div className="h-20 bg-white" />
    </div>
  );
}
