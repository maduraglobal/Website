"use client";

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  RefreshCw,
  Eye,
  Calendar,
  Tag,
  Share2
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  status: 'draft' | 'published';
  published_at: string;
  category?: string;
}

export default function BlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    setLoading(true);
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBlogs(prev => prev.filter(b => b.id !== id));
      }
    } catch (err) {
      alert('Error deleting blog');
    }
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#191974] mb-2">Editorial Hub</h1>
          <p className="text-gray-500 font-medium">Manage travel stories, news, and SEO-rich blog content.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchBlogs}
            className="w-12 h-12 bg-white border border-gray-200 text-gray-400 hover:text-[#ee2229] rounded-xl flex items-center justify-center transition-all shadow-sm"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={() => router.push('/admin/blogs/new')}
            className="bg-[#ee2229] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl flex items-center gap-2 hover:bg-[#191974] transition-all"
          >
            <Plus className="w-5 h-5" />
            Write Post
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by title..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-[#ee2229] pl-10 pr-4 py-2.5 rounded-xl outline-none transition-all text-sm font-medium"
            />
          </div>
          <div className="flex items-center gap-4">
             <div className="px-4 py-2 bg-blue-50 text-[#191974] rounded-xl text-[10px] font-bold uppercase tracking-widest border border-blue-100 italic">
               Search Optimized Content
             </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Article Title</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Published On</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-80" /></td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-24" /></td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-20" /></td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-16" /></td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-16 ml-auto" /></td>
                  </tr>
                ))
              ) : filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <FileText className="w-12 h-12 text-gray-100" />
                      <p className="text-gray-400 font-medium">Your editorial calendar is empty. Start writing today!</p>
                    </div>
                  </td>
                </tr>
              ) : filteredBlogs.map((blog) => (
                <tr key={blog.id} className="group hover:bg-gray-50/50 transition-all">
                  <td className="px-8 py-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                         {/* Image placeholder or actual */}
                         <div className="w-full h-full bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-400">
                           <FileText className="w-5 h-5" />
                         </div>
                      </div>
                      <div>
                        <p className="font-bold text-[#191974] text-[15px] group-hover:text-[#ee2229] transition-colors">{blog.title}</p>
                        <p className="text-[11px] text-gray-400 truncate max-w-[300px] mt-0.5">{blog.excerpt || 'Click to view post excerpt...'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span className="text-[12px] font-medium">{new Date(blog.published_at).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       <Tag className="w-3.5 h-3.5 text-blue-500" />
                       <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">{blog.category || 'General'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${blog.status === 'published' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-gray-100 text-gray-500'}`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-2 text-gray-400">
                      <button className="p-2 hover:text-[#191974] hover:bg-gray-100 rounded-lg transition-all"><Eye className="w-4 h-4" /></button>
                      <button 
                         onClick={() => router.push(`/admin/blogs/${blog.id}/edit`)}
                         className="p-2 hover:text-[#191974] hover:bg-gray-100 rounded-lg transition-all"
                      ><Edit2 className="w-4 h-4" /></button>
                      <button className="p-2 hover:text-[#191974] hover:bg-gray-100 rounded-lg transition-all"><Share2 className="w-4 h-4" /></button>
                      <button 
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      ><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
