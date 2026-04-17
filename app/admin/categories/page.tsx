"use client";

import React, { useState, useEffect } from 'react';
import { 
  FolderTree, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  RefreshCw,
  LayoutGrid,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  image_url?: string;
  destinations_count?: number;
}

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCategories(prev => prev.filter(c => c.id !== id));
      }
    } catch (err) {
      alert('Error deleting category');
    }
  };

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#191974] mb-2">Tour Categories</h1>
          <p className="text-gray-500 font-medium">Manage how tours are grouped and displayed on the website.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchCategories}
            className="w-12 h-12 bg-white border border-gray-200 text-gray-400 hover:text-[#ee2229] rounded-xl flex items-center justify-center transition-all shadow-sm"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={() => router.push('/admin/categories/new')}
            className="bg-[#ee2229] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl flex items-center gap-2 hover:bg-[#191974] transition-all"
          >
            <Plus className="w-5 h-5" />
            New Category
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search categories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-[#ee2229] pl-10 pr-4 py-2.5 rounded-xl outline-none transition-all text-sm font-medium"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Categories:</span>
            <span className="text-sm font-bold text-[#191974]">{categories.length}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category Name</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Slug / URL</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Tours</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-32" /></td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-24" /></td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-12 mx-auto" /></td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-16 ml-auto" /></td>
                  </tr>
                ))
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <FolderTree className="w-12 h-12 text-gray-100" />
                      <p className="text-gray-400 font-medium">No categories found matching your search.</p>
                    </div>
                  </td>
                </tr>
              ) : filteredCategories.map((category) => (
                <tr key={category.id} className="group hover:bg-gray-50/50 transition-all">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-[#191974] transition-colors">
                        <LayoutGrid className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-[#191974] text-[15px]">{category.name}</p>
                        <p className="text-[11px] text-gray-400 truncate max-w-[200px]">{category.description || 'No description provided'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <code className="text-[12px] bg-red-50 text-[#ee2229] px-2 py-1 rounded font-bold">/{category.slug}</code>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-[12px] font-bold text-[#191974]">
                      {category.destinations_count || 0}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => router.push(`/admin/categories/${category.id}`)}
                        className="p-2 text-gray-400 hover:text-[#ee2229] hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Edit2 className="w-4.5 h-4.5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(category.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
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
