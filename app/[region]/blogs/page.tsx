'use client';

import React, { use, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight, BookOpen, Search, Tag, Filter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { blogs } from '@/app/data/blogData';

export default function BlogsPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = use(params);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(blogs.map(b => b.category)))];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-16 bg-gray-50 border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 text-[#ee2229] font-bold tracking-[0.2em] mb-4 text-[12px] uppercase">
              <BookOpen className="w-4 h-4" />
              Madura Travel Journal
            </div>
            <h1 className="text-[42px] md:text-[64px] text-[#191974] tracking-tight leading-none mb-6">
              Insights, Stories & <span className="text-[#ee2229]">Adventure</span>
            </h1>
            <p className="text-[17px] text-gray-400 max-w-xl leading-relaxed">
              Explore our latest travel guides, industry insights, and stories from the most beautiful corners of the world.
            </p>
          </motion.div>
        </div>

        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      </section>

      {/* --- FILTERS & SEARCH --- */}
      <section className="sticky top-[158px] md:top-[74px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 w-full md:w-auto">
            <Filter className="w-4 h-4 text-gray-400 mr-2 shrink-0 hidden md:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-[12px] font-bold tracking-wider transition-all whitespace-nowrap ${activeCategory === cat
                  ? 'bg-[#191974] text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 focus:border-[#ee2229] rounded-full outline-none text-sm transition-all"
            />
          </div>
        </div>
      </section>

      {/* --- BLOG GRID --- */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, i) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden transition-all hover:border-[#ee2229]/20"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-16/10 overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-bold text-[#191974] tracking-widest flex items-center gap-1.5 shadow-sm uppercase">
                      <Tag className="w-3 h-3 text-[#ee2229]" />
                      {blog.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-gray-400 text-[11px] font-bold tracking-widest mb-4">
                      <span className="flex items-center gap-1.5 uppercase">
                        <Calendar className="w-3.5 h-3.5 text-[#ee2229]" />
                        {blog.date}
                      </span>
                      <span className="w-1 h-1 bg-gray-200 rounded-full" />
                      <span className="flex items-center gap-1.5 uppercase">
                        <Clock className="w-3.5 h-3.5 text-[#ee2229]" />
                        {blog.readTime}
                      </span>
                    </div>

                    <h3 className="text-[20px] font-bold text-[#191974] leading-tight mb-4 group-hover:text-[#ee2229] transition-colors line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-gray-500 text-[14px] leading-relaxed mb-6 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#ee2229] tracking-widest uppercase">
                        Travel Insight
                      </div>

                      <Link
                        href={`/${region}/blogs/${blog.slug}`}
                        className="flex items-center gap-2 text-[11px] font-bold text-[#191974] tracking-widest group/btn hover:text-[#ee2229] transition-all uppercase"
                      >
                        View More
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-gray-400">
                <Search className="w-10 h-10" />
              </div>
              <h3 className="text-[20px] text-[#191974] font-bold mb-2">No results found</h3>
              <p className="text-gray-400 text-sm max-w-xs mx-auto">Try adjusting your search or category filter to find what you&apos;re looking for.</p>
            </div>
          )}

          {/* --- PAGINATION (Minimal) --- */}
          <div className="mt-20 flex flex-col items-center">
            <div className="w-12 h-1 bg-gray-100 rounded-full mb-8" />
            <p className="text-[12px] text-gray-400 font-bold uppercase tracking-[0.3em] mb-6">End of the road for now</p>
            <Link
              href={`/${region}/contact`}
              className="bg-[#191974] text-white px-10 py-4 rounded-xl text-[12px] font-bold tracking-[0.2em] hover:bg-[#ee2229] transition-all uppercase shadow-xl shadow-blue-900/10"
            >
              Start Your Own Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
