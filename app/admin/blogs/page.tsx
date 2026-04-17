"use client";

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  RefreshCw,
  Clock,
  ExternalLink,
  ChevronRight,
  Eye,
  Calendar,
  Tag,
  Share2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { AdminHeader, AdminCard, Badge } from '../components/AdminUI';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  status: 'draft' | 'published';
  published_at: string;
  category?: string;
  image_url?: string;
}

export default function BlogsAdmin() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const supabase = createClient();

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    setLoading(true);
    try {
      // Trying dedicated table from supabase
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) {
         setBlogs(data);
      } else {
         // Fallback to internal API if exists or just empty
         const res = await fetch('/api/blogs');
         const fallbackData = await res.json();
         setBlogs(fallbackData);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (!error) {
        setBlogs(prev => prev.filter(b => b.id !== id));
      }
    } catch (err) {
      alert('Error deleting blog');
    }
  };

  const filteredBlogs = blogs.filter(b => 
    b.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <AdminHeader 
        title="Journal & News"
        description="Crafting travel stories, regional guides, and company announcements."
        icon={FileText}
        breadcrumbs={[{ label: 'Editorial', href: '/admin' }, { label: 'Blog Posts' }]}
        actions={
          <>
            <button 
              onClick={fetchBlogs}
              className="w-12 h-12 bg-white border border-gray-100 text-gray-400 hover:text-[#ee2229] rounded-2xl flex items-center justify-center transition-all shadow-sm"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button 
              onClick={() => router.push('/admin/blogs/new')}
              className="flex-1 md:flex-none bg-[#191974] text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#191974]/10 flex items-center justify-center gap-3 hover:bg-[#ee2229] transition-all"
            >
              <Plus className="w-5 h-5" />
              Write Story
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main List */}
        <div className="xl:col-span-3">
          <AdminCard 
            title="Publication Feed"
            headerAction={
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                 <input 
                   type="text" 
                   placeholder="Filter articles..." 
                   className="pl-8 pr-4 py-2 bg-gray-50 border-none rounded-xl text-[11px] font-bold outline-none focus:ring-2 focus:ring-[#ee2229]/20 w-48 transition-all"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
               </div>
            }
            noPadding
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Article Headline</th>
                    <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Meta Context</th>
                    <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Deployment</th>
                    <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    Array(5).fill(0).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={4} className="px-8 py-6"><div className="h-6 bg-gray-50 rounded-full w-full" /></td>
                      </tr>
                    ))
                  ) : filteredBlogs.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-8 py-20 text-center text-gray-300 font-bold uppercase tracking-widest text-xs italic">No articles found in archive</td>
                    </tr>
                  ) : filteredBlogs.map((blog) => (
                    <tr key={blog.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gray-50 rounded-2xl overflow-hidden shadow-sm shrink-0 border border-gray-100 flex items-center justify-center text-gray-300">
                             {blog.image_url ? (
                               <img src={blog.image_url} className="w-full h-full object-cover" alt={blog.title} />
                             ) : (
                               <FileText className="w-5 h-5" />
                             )}
                          </div>
                          <div>
                            <p className="font-black text-[#191974] text-sm group-hover:text-[#ee2229] transition-colors line-clamp-1">{blog.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                               <div className="flex items-center gap-1.5 text-[9px] font-black text-gray-300 uppercase tracking-widest italic">
                                  <Tag className="w-2.5 h-2.5 text-blue-500" /> {blog.category || 'General'}
                               </div>
                               <div className="w-1 h-1 rounded-full bg-gray-200" />
                               <span className="text-[9px] font-bold text-gray-300">ID: {blog.id.slice(0, 8)}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                         <div className="flex items-center gap-2 text-gray-500">
                            <Clock className="w-4 h-4 text-gray-300" />
                            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                               {new Date(blog.published_at || Date.now()).toLocaleDateString()}
                            </span>
                         </div>
                      </td>
                      <td className="px-8 py-5 text-center">
                         <Badge variant={blog.status === 'published' ? "success" : "neutral"}>
                            {blog.status === 'published' ? "Live Public" : "Draft Mode"}
                         </Badge>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button 
                            onClick={() => router.push(`/admin/blogs/${blog.id}/edit`)}
                            className="p-2.5 text-gray-300 hover:text-[#191974] hover:bg-gray-100 rounded-xl transition-all"
                            title="Edit content"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-2.5 text-gray-300 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                            title="View online"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(blog.id)}
                            className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            title="Dismantle post"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AdminCard>
        </div>

        {/* Categories / Stats Sidebar */}
        <div className="space-y-6">
           <AdminCard title="Editorial Insights">
              <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <div>
                        <p className="text-3xl font-black text-[#191974] tracking-tight">{blogs.length}</p>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Total Articles</p>
                    </div>
                    <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-[#ee2229]">
                       <Eye className="w-6 h-6" />
                    </div>
                 </div>
                 
                 <div className="pt-6 border-t border-gray-50">
                    <p className="text-[11px] font-bold text-gray-400 leading-relaxed italic mb-4">
                       Content creation strategy drives 40% of inbound lead growth. Keep your regional guides updated.
                    </p>
                    <button className="w-full py-4 rounded-2xl bg-[#191974] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#ee2229] transition-all flex items-center justify-center gap-2 group">
                       Audit Archive <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                 </div>
              </div>
           </AdminCard>

           <div className="p-8 rounded-[2.5rem] bg-linear-to-br from-[#191974] to-[#2525a1] text-white shadow-xl shadow-[#191974]/10">
              <h4 className="font-black uppercase tracking-widest text-[9px] opacity-60 mb-2">Editorial Tip</h4>
              <p className="text-xs font-bold leading-relaxed lowercase first-letter:uppercase">
                 Use high-resolution 16:9 images for featured blog covers to ensure better social media sharing preview.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
