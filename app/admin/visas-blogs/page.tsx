"use client";

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  BookOpen, 
  Plus, 
  Search, 
  RefreshCw,
  Globe,
  Settings,
  Edit,
  Trash2,
  Calendar,
  Eye
} from 'lucide-react';

export default function VisasBlogsPanel() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [visas, setVisas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const [blogRes, visaRes] = await Promise.all([
      fetch('/api/blogs'),
      fetch('/api/categories/visa')
    ]);
    const blogData = await blogRes.json();
    const visaData = await visaRes.json();
    setBlogs(blogData);
    setVisas(visaData);
    setLoading(false);
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-[32px] font-bold text-[#191974] mb-2 tracking-tight">Editorial & Visa Matrix</h1>
          <p className="text-gray-500 font-medium italic">Managing long-form narratives and official entry requirements.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchData}
            className="w-10 h-10 bg-white border border-gray-100 text-gray-400 hover:text-[#ee2229] rounded-xl flex items-center justify-center transition-all shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Blogs Management */}
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-[#191974] p-6 rounded-t-3xl text-white">
            <div className="flex items-center gap-3">
               <FileText className="w-5 h-5 text-[#ee2229]" />
               <h3 className="font-bold text-sm uppercase tracking-widest">Editorial CMS</h3>
            </div>
            <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all">Write Post</button>
          </div>
          
          <div className="bg-white border-x border-b border-gray-100 rounded-b-3xl shadow-sm overflow-hidden min-h-[400px]">
             {loading ? (
                <div className="py-20 flex justify-center"><RefreshCw className="w-6 h-6 animate-spin text-gray-200" /></div>
             ) : (
                <div className="divide-y divide-gray-50">
                   {blogs.length === 0 ? (
                      <div className="p-20 text-center text-gray-300">
                         <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
                         <p className="text-sm font-medium uppercase tracking-widest">No articles found</p>
                      </div>
                   ) : (
                      blogs.map(blog => (
                        <div key={blog.id} className="p-6 hover:bg-gray-50/50 transition-all group">
                           <div className="flex justify-between items-start mb-2">
                             <h4 className="text-[15px] font-bold text-[#191974] line-clamp-1 group-hover:text-[#ee2229] transition-colors">{blog.title}</h4>
                             <div className="flex gap-2">
                               <button className="p-1.5 text-gray-300 hover:text-blue-600 transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                             </div>
                           </div>
                           <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(blog.published_date).toLocaleDateString()}</span>
                              <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> 0 Reads</span>
                              <span className="text-blue-500">/{blog.slug}</span>
                           </div>
                        </div>
                      ))
                   )}
                </div>
             )}
          </div>
        </div>

        {/* Visa Categories */}
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-gray-100 shadow-sm border-l-4 border-l-[#ee2229]">
            <div className="flex items-center gap-3">
               <Globe className="w-5 h-5 text-[#ee2229]" />
               <h3 className="font-bold text-[#191974] text-sm uppercase tracking-widest">Visa Categories</h3>
            </div>
            <button className="bg-[#191974] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-[#ee2229] transition-all">Add Category</button>
          </div>

          <div className="grid grid-cols-1 gap-4">
             {loading ? (
                <div className="py-20 flex justify-center"><RefreshCw className="w-6 h-6 animate-spin text-gray-200" /></div>
             ) : (
                visas.map(v => (
                   <div key={v.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center group hover:border-[#ee2229]/20 transition-all">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-[#ee2229]/5 rounded-xl flex items-center justify-center text-[#ee2229]">
                            <Settings className="w-5 h-5" />
                         </div>
                         <div>
                            <p className="text-[14px] font-bold text-[#191974]">{v.name}</p>
                            <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Slug: {v.slug}</p>
                         </div>
                      </div>
                      <button className="w-8 h-8 rounded-lg bg-gray-50 text-gray-300 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-all">
                         <Trash2 className="w-4 h-4" />
                      </button>
                   </div>
                ))
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
