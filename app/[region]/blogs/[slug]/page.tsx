'use client';

import React, { use } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, Share2, Link as LinkIcon, ChevronRight } from 'lucide-react';

const Facebook = (props: any) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

const Twitter = (props: any) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);
import Image from 'next/image';
import Link from 'next/link';
import { getBlogBySlug, blogs } from '@/app/data/blogData';
import { notFound } from 'next/navigation';

export default function BlogDetailPage({ params }: { params: Promise<{ region: string, slug: string }> }) {
  const { region, slug } = use(params);
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return notFound();
  }

  // Related posts (simple logic: same category or next 2 posts)
  const relatedPosts = blogs
    .filter(b => b.slug !== slug && (b.category === blog.category || true))
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      {/* --- TOP NAVIGATION BAR (SUBTLE) --- */}
      <nav className="fixed top-[64px] md:top-[74px] left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link
            href={`/${region}/blogs`}
            className="flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-[#ee2229] transition-all uppercase tracking-widest"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Journal
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">Share this story</span>
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-[#191974] transition-colors"><Facebook className="w-4 h-4" /></button>
              <button className="text-gray-400 hover:text-[#191974] transition-colors"><Twitter className="w-4 h-4" /></button>
              <button className="text-gray-400 hover:text-[#191974] transition-colors"><LinkIcon className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- HEADER / HERO --- */}
      <header className="pt-24 md:pt-40 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb (Mobile) */}
          <div className="md:hidden flex items-center gap-2 text-[10px] font-bold text-[#ee2229] uppercase tracking-widest mb-8">
            <Link href={`/${region}/blogs`}>JOURNAL</Link>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span>{blog.category}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-red-50 text-[#ee2229] rounded-full text-[10px] font-bold tracking-widest uppercase">
                {blog.category}
              </span>
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-1.5 text-gray-400 text-[11px] font-bold tracking-widest uppercase">
                <Clock className="w-3.5 h-3.5" />
                {blog.readTime} Read
              </div>
            </div>

            <h1 className="text-[32px] md:text-[56px] text-[#191974] font-bold leading-tight mb-8 tracking-tight">
              {blog.title}
            </h1>

            <div className="flex items-center gap-6 py-6 border-b border-gray-100">
               <div className="flex items-center gap-2">
                 <Calendar className="w-4 h-4 text-[#ee2229]" />
                 <span className="text-[13px] font-bold text-gray-500 uppercase tracking-widest">{blog.date}</span>
               </div>
               <div className="h-4 w-px bg-gray-200" />
               <div className="flex items-center gap-2 text-[#ee2229] font-bold text-[13px] uppercase tracking-widest">
                 {blog.category}
               </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* --- COVER IMAGE --- */}
      <section className="px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto aspect-video md:aspect-21/9 rounded-[3rem] overflow-hidden shadow-2xl relative"
        >
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </section>

      {/* --- CONTENT --- */}
      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto">
          <article
            className="prose prose-lg max-w-none 
              prose-headings:text-[#191974] prose-headings:font-bold prose-headings:tracking-tight 
              prose-h3:text-[24px] prose-h3:mt-12 prose-h3:mb-4
              prose-p:text-gray-600 prose-p:leading-[1.8] prose-p:text-[17px] prose-p:mb-8
              prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-12
              prose-strong:text-[#191974] prose-strong:font-bold
              prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-8
              prose-li:text-gray-600 prose-li:mb-2
              [&>p]:mb-8 [&>h3]:mt-12 [&>h3]:mb-4 [&>img]:my-10"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className="mt-16 pt-10 border-t border-gray-100">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mr-2">Tags:</span>
              {blog.tags.map(tag => (
                <span key={tag} className="px-4 py-1.5 bg-gray-50 text-gray-500 rounded-full text-[10px] font-bold tracking-widest hover:bg-[#191974] hover:text-white transition-all cursor-pointer">
                  #{tag.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- RELATED POSTS --- */}
      <section className="bg-gray-50 py-24 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-[#ee2229] font-bold text-[12px] tracking-[0.3em] uppercase mb-2">Continue Reading</p>
              <h2 className="text-[32px] text-[#191974] font-bold tracking-tight">You might also like</h2>
            </div>
            <Link
              href={`/${region}/blogs`}
              className="px-8 py-3 bg-white border border-gray-100 rounded-xl text-[12px] font-bold text-[#191974] tracking-widest hover:border-[#ee2229] transition-all hidden md:block"
            >
              VIEW ALL POSTS
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/${region}/blogs/${post.slug}`}
                className="group flex flex-col sm:flex-row bg-white rounded-4xl overflow-hidden border border-gray-100 hover:border-[#ee2229]/20 transition-all"
              >
                <div className="relative w-full sm:w-48 aspect-16/10 sm:aspect-square overflow-hidden shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="text-[#ee2229] text-[10px] font-bold tracking-widest uppercase mb-2">
                    {post.category}
                  </div>
                  <h4 className="text-[18px] font-bold text-[#191974] leading-snug group-hover:text-[#ee2229] transition-colors line-clamp-2 mb-4">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-4 text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-auto">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 bg-gray-200 rounded-full" />
                    <span>{post.readTime} Read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
