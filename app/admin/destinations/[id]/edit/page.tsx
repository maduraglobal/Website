"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Settings, MapPin, Italic, Bold, List, Image as ImageIcon, Loader2, Save, Trash2 } from 'lucide-react';

export default function EditDestination() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    parent_id: '',
    best_time: '',
    currency: '',
    image_url: ''
  });
  const [parents, setParents] = useState<any[]>([]);

  useEffect(() => {
    fetchDestination();
    fetchParents();
  }, [id]);

  async function fetchParents() {
    const res = await fetch('/api/destinations');
    const data = await res.json();
    setParents(data.filter((d: any) => !d.parent_id && d.id !== id));
  }

  async function fetchDestination() {
    try {
      const res = await fetch(`/api/destinations/${id}`);
      if (!res.ok) throw new Error('Not found');
      const data = await res.json();
      setFormData({
        name: data.name || '',
        description: data.description || '',
        parent_id: data.parent_id || '',
        best_time: data.best_time || '',
        currency: data.currency || '',
        image_url: data.image_url || ''
      });
    } catch (err) {
      console.error(err);
      router.push('/admin/destinations');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`/api/destinations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Failed to save');
      router.push('/admin/destinations');
      router.refresh();
    } catch (err) {
      alert('Error saving destination');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this destination?')) return;
    try {
      const res = await fetch(`/api/destinations/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      router.push('/admin/destinations');
      router.refresh();
    } catch (err) {
      alert('Error deleting destination');
    }
  }

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center gap-4 text-gray-400">
        <Loader2 className="w-10 h-10 animate-spin text-[#191974]" />
        <p className="font-bold tracking-[0.2em] text-[12px] uppercase text-[#191974]">Loading Destination...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <Link href="/admin/destinations" className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-100 bg-white hover:bg-gray-50 transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5 text-[#191974]" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#191974] tracking-tight">Edit Destination</h1>
            <p className="text-gray-400 text-sm italic">Modifying {formData.name}</p>
          </div>
        </div>
        <div className="flex gap-3">
            <button onClick={handleDelete} className="px-6 py-3 text-red-500 font-bold text-sm flex items-center gap-2 hover:bg-red-50 rounded-xl transition-all">
                <Trash2 className="w-4 h-4" /> Delete
            </button>
            <button 
                onClick={handleSave}
                disabled={saving}
                className="bg-[#191974] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-xl flex items-center gap-2 hover:bg-[#ee2229] transition-all disabled:opacity-50"
            >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Changes
            </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content Area */}
        <div className="flex-1 space-y-8">
          {/* Title Input */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Destination Name</label>
                <input 
                    type="text" 
                    placeholder="e.g. Switzerland" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-xl font-bold text-[#191974] outline-none focus:border-[#ee2229] transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>
          </div>

          {/* Description Editor */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="border-b border-gray-50 bg-gray-50/50 flex flex-wrap items-center gap-2 p-3">
              <button className="p-2 hover:bg-white border border-transparent hover:border-gray-200 rounded-lg text-gray-600 transition-all"><Bold className="w-4 h-4" /></button>
              <button className="p-2 hover:bg-white border border-transparent hover:border-gray-200 rounded-lg text-gray-600 transition-all"><Italic className="w-4 h-4" /></button>
              <div className="w-px h-6 bg-gray-200 mx-2"></div>
              <button className="p-2 hover:bg-white border border-transparent hover:border-gray-200 rounded-lg text-gray-600 transition-all"><List className="w-4 h-4" /></button>
              <button className="ml-2 px-4 py-2 hover:bg-white border border-transparent hover:border-gray-200 rounded-lg text-gray-600 flex gap-2 items-center text-[12px] font-bold transition-all"><ImageIcon className="w-4 h-4" /> Add Media</button>
            </div>
            <textarea 
              className="w-full min-h-[400px] p-8 text-[15px] leading-relaxed outline-none resize-none text-gray-600 placeholder:text-gray-300"
              placeholder="Start writing destination description..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          {/* Quick Info */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
            <h3 className="font-bold text-[#191974] text-lg">Travel Essentials</h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Best Time to Visit</label>
                <input 
                    type="text" 
                    placeholder="e.g. October to March" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold text-[#191974] outline-none" 
                    value={formData.best_time}
                    onChange={(e) => setFormData({ ...formData, best_time: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Local Currency</label>
                <input 
                    type="text" 
                    placeholder="e.g. Euro (€)" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold text-[#191974] outline-none" 
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-[360px] space-y-8">
          {/* Parent Region Select */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
            <div>
                <h3 className="font-bold text-[#191974] text-lg">Regional Hierarchy</h3>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-widest mt-1">Assign to parent region</p>
            </div>
            <select 
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold text-[#191974] outline-none focus:border-[#ee2229] transition-all appearance-none"
                value={formData.parent_id || ''}
                onChange={(e) => setFormData({ ...formData, parent_id: e.target.value || '' })}
            >
              <option value="">None (Top Level Region)</option>
              {parents.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
            <div>
                <h3 className="font-bold text-[#191974] text-lg">Featured Image</h3>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-widest mt-1">Grid & Hero Visuals</p>
            </div>
            <div className="aspect-video border-2 border-dashed border-gray-200 bg-gray-50 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 hover:border-[#ee2229]/20 transition-all group overflow-hidden relative">
              {formData.image_url ? (
                  <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                    <Upload className="w-8 h-8 text-gray-300 group-hover:text-[#ee2229] mb-3 transition-colors" />
                    <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Select Visual</p>
                </>
              )}
            </div>
            <input 
                type="text" 
                placeholder="Or paste Image URL"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-xs font-bold text-[#191974] outline-none"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
