"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Plus, Edit2, Trash2, Map, Calendar, Settings, FileText, CheckCircle2, Navigation, Layers } from 'lucide-react';

const supabase = createClient();

interface TDestination { id: string; name: string; slug: string; parent_id: string | null; }
interface TVisaCategory { id: string; name: string; slug: string; }
interface TBlog { id: string; title: string; slug: string; published_date: string; }
interface TTour { id: string; title: string; price: number; destination_id: string; category_id: string; visibility: boolean; }
interface TTourCategory { id: string; name: string; slug: string; }
interface TDestinationCategory { id: string; name: string; slug: string; }
interface TItinerary { id: string; tour_id: string; days: any[]; version: number; is_published: boolean; }

export default function AdminTabs() {
  const [activeTab, setActiveTab] = useState('tours');
  
  const tabs = [
    { id: 'tours', label: 'Tours', icon: Map },
    { id: 'tour_categories', label: 'Tour Categories', icon: Layers },
    { id: 'itineraries', label: 'Itineraries', icon: Calendar },
    { id: 'destinations', label: 'Destinations', icon: Navigation },
    { id: 'destination_categories', label: 'Destination Categories', icon: Layers },
    { id: 'visa_categories', label: 'Visa Categories', icon: CheckCircle2 },
    { id: 'blogs', label: 'Blogs', icon: FileText }
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      {/* Sidebar Tabs */}
      <div className="w-full md:w-64 bg-gray-50 border-r border-gray-100 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-[#191974]">Admin Modules</h2>
          <p className="text-xs text-gray-400 mt-1">Manage all platform data</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab.id 
                  ? 'bg-[#191974] text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 bg-white p-6 md:p-8 overflow-y-auto">
        {activeTab === 'tours' && <CrudTours />}
        {activeTab === 'tour_categories' && <CrudGenericTable table="tour_categories" label="Tour Category" fields={[{ key: 'name', label: 'Name', required: true }]} />}
        {activeTab === 'destinations' && <CrudDestinations />}
        {activeTab === 'destination_categories' && <CrudGenericTable table="destination_categories" label="Destination Category" fields={[{ key: 'name', label: 'Name', required: true }]} />}
        {activeTab === 'visa_categories' && <CrudGenericTable table="visa_categories" label="Visa Category" fields={[{ key: 'name', label: 'Name', required: true }]} />}
        {activeTab === 'blogs' && <CrudGenericTable table="blogs" label="Blog" fields={[{ key: 'title', label: 'Title', required: true }, { key: 'published_date', label: 'Publish Date', type: 'date', required: true }]} />}
        {activeTab === 'itineraries' && <CrudItineraries />}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------------------------------------ //
// GENERIC CRUD COMPONENT (For simple category tables, blogs)
// ------------------------------------------------------------------------------------------------ //
function CrudGenericTable({ table, label, fields }: { table: string, label: string, fields: any[] }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, [table]);

  const fetchData = async () => {
    setLoading(true);
    const { data: res } = await supabase.from(table).select('*').order('created_at', { ascending: false }).limit(100);
    setData(res || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    await supabase.from(table).delete().eq('id', id);
    fetchData();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Auto-generate slug if title/name exists and slug doesn't
    const payload = { ...form };
    const nameField = payload.name || payload.title;
    if (nameField && !payload.slug) {
      payload.slug = nameField.toLowerCase().replace(/\\s+/g, '-').replace(/[^\\w-]+/g, '');
    }

    if (editingId) {
      await supabase.from(table).update(payload).eq('id', editingId);
    } else {
      await supabase.from(table).insert([payload]);
    }
    
    setForm({});
    setEditingId(null);
    setIsSubmitting(false);
    fetchData();
  };

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setForm({ ...item });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-100">
        <h3 className="text-2xl font-bold text-[#191974]">{label}s Management</h3>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <h4 className="font-bold text-[#191974] mb-4">{editingId ? 'Edit' : 'Create New'} {label}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map(f => (
            <div key={f.key}>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{f.label}</label>
              <input 
                type={f.type || 'text'}
                required={f.required}
                value={form[f.key] || ''}
                onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#ee2229] outline-none text-sm font-semibold"
                placeholder={`Enter ${f.label.toLowerCase()}`}
              />
            </div>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <button type="submit" disabled={isSubmitting} className="bg-[#191974] text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-[#101050] transition-colors disabled:opacity-50">
            {isSubmitting ? 'Saving...' : (editingId ? 'Update' : 'Create')}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-300 transition-colors">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Table */}
      {loading ? (
        <div className="p-10 text-center text-gray-400 font-medium">Loading {label}s...</div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                {fields.map(f => <th key={f.key} className="px-6 py-4 font-bold">{f.label}</th>)}
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  {fields.map(f => (
                    <td key={f.key} className="px-6 py-4 text-sm font-semibold text-[#191974]">
                      {item[f.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right space-x-3">
                    <button onClick={() => startEdit(item)} className="text-blue-500 hover:text-blue-700 p-1"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr><td colSpan={fields.length + 1} className="px-6 py-8 text-center text-gray-400 italic">No records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------------------------------------------ //
// CUSTOM CRUD: DESTINATIONS
// ------------------------------------------------------------------------------------------------ //
function CrudDestinations() {
  const [data, setData] = useState<TDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<TDestination>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: res } = await supabase.from('destinations').select('*, parent:parent_id(name)').order('name');
    setData(res || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this destination?')) return;
    await supabase.from('destinations').delete().eq('id', id);
    fetchData();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload: any = { name: form.name, parent_id: form.parent_id || null };
    if (!payload.slug && form.name) payload.slug = form.name.toLowerCase().replace(/\\s+/g, '-').replace(/[^\\w-]+/g, '');
    
    if (editingId) {
      await supabase.from('destinations').update(payload).eq('id', editingId);
    } else {
      await supabase.from('destinations').insert([payload]);
    }
    
    setForm({});
    setEditingId(null);
    setIsSubmitting(false);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-100">
        <h3 className="text-2xl font-bold text-[#191974]">Destinations</h3>
      </div>
      <form onSubmit={handleSave} className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <h4 className="font-bold text-[#191974] mb-4">{editingId ? 'Edit' : 'Create New'} Destination</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Name</label>
            <input required value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none text-sm font-semibold" placeholder="e.g. Dubai" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Parent Region (Optional)</label>
            <select value={form.parent_id || ''} onChange={e => setForm({ ...form, parent_id: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none text-sm font-semibold bg-white">
              <option value="">None (Top-level Region)</option>
              {data.filter(d => !d.parent_id && d.id !== editingId).map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button type="submit" disabled={isSubmitting} className="bg-[#191974] text-white px-6 py-2 rounded-lg font-bold text-sm">
            {isSubmitting ? 'Saving...' : (editingId ? 'Update' : 'Create')}
          </button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({}); }} className="bg-gray-200 px-6 py-2 rounded-lg font-bold text-sm">Cancel</button>}
        </div>
      </form>
      {loading ? <div className="p-10 text-center">Loading...</div> : (
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-400 uppercase">
                <th className="px-6 py-4">Name</th><th className="px-6 py-4">Parent Region</th><th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map(item => (
                <tr key={item.id}>
                  <td className="px-6 py-4 font-semibold text-[#191974]">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{(item as any).parent?.name || '-'}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button onClick={() => { setEditingId(item.id); setForm(item); }} className="text-blue-500"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------------------------------------------ //
// CUSTOM CRUD: TOURS
// ------------------------------------------------------------------------------------------------ //
function CrudTours() {
  const [data, setData] = useState<any[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<TTour>>({ visibility: true });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const [toursRes, destsRes] = await Promise.all([
      supabase.from('tours').select('*, destinations(name)').order('created_at', { ascending: false }),
      supabase.from('destinations').select('id, name').order('name')
    ]);
    setData(toursRes.data || []);
    setDestinations(destsRes.data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tour?')) return;
    await supabase.from('tours').delete().eq('id', id);
    fetchData();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload: any = { 
      title: form.title, 
      price: form.price, 
      destination_id: form.destination_id || null, 
      visibility: form.visibility 
    };
    if (editingId) await supabase.from('tours').update(payload).eq('id', editingId);
    else await supabase.from('tours').insert([payload]);
    setForm({ visibility: true });
    setEditingId(null);
    setIsSubmitting(false);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-100">
        <h3 className="text-2xl font-bold text-[#191974]">Tours</h3>
      </div>
      <form onSubmit={handleSave} className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Title</label><input required value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm" /></div>
          <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Price</label><input type="number" required value={form.price || ''} onChange={e => setForm({ ...form, price: Number(e.target.value) })} className="w-full px-4 py-2 border rounded-lg text-sm" /></div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Destination</label>
            <select value={form.destination_id || ''} onChange={e => setForm({ ...form, destination_id: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm bg-white">
              <option value="">Select Destination</option>
              {destinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3 pt-6">
            <input type="checkbox" id="visibility" checked={!!form.visibility} onChange={e => setForm({ ...form, visibility: e.target.checked })} className="w-5 h-5 rounded text-[#ee2229]" />
            <label htmlFor="visibility" className="text-sm font-bold text-gray-700">Published / Visible</label>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button type="submit" disabled={isSubmitting} className="bg-[#191974] text-white px-6 py-2 rounded-lg font-bold text-sm">Save Tour</button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ visibility: true }); }} className="bg-gray-200 px-6 py-2 rounded-lg font-bold text-sm">Cancel</button>}
        </div>
      </form>
      {loading ? <div className="p-10 text-center">Loading...</div> : (
        <div className="bg-white border rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-400 uppercase">
                <th className="px-6 py-4">Title</th><th className="px-6 py-4">Destination</th><th className="px-6 py-4">Price</th><th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map(item => (
                <tr key={item.id}>
                  <td className="px-6 py-4 font-semibold text-[#191974]">{item.title}</td>
                  <td className="px-6 py-4">{item.destinations?.name || '-'}</td>
                  <td className="px-6 py-4">₹{item.price}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button onClick={() => { setEditingId(item.id); setForm(item); }} className="text-blue-500"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------------------------------------------ //
// CUSTOM CRUD: ITINERARIES
// ------------------------------------------------------------------------------------------------ //
function CrudItineraries() {
  const [data, setData] = useState<any[]>([]);
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<TItinerary>>({ is_published: true });
  const [dayInput, setDayInput] = useState<string>(''); // Simplified JSON array input
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const [itinRes, toursRes] = await Promise.all([
      supabase.from('tour_itineraries').select('*, tours(title)').order('created_at', { ascending: false }),
      supabase.from('tours').select('id, title').order('title')
    ]);
    setData(itinRes.data || []);
    setTours(toursRes.data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this itinerary?')) return;
    await supabase.from('tour_itineraries').delete().eq('id', id);
    fetchData();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    let daysArray = [];
    if (dayInput) {
      try {
        daysArray = JSON.parse(dayInput);
        if (!Array.isArray(daysArray)) throw new Error("Must be array");
      } catch (err) {
        alert("Days data must be a valid JSON Array. Example: [ { \"title\": \"Day 1...\" } ]");
        setIsSubmitting(false);
        return;
      }
    }

    const payload: any = { 
      tour_id: form.tour_id, 
      days: daysArray,
      is_published: form.is_published,
      version: 1
    };

    if (editingId) await supabase.from('tour_itineraries').update(payload).eq('id', editingId);
    else await supabase.from('tour_itineraries').insert([payload]);
    
    setForm({ is_published: true });
    setDayInput('');
    setEditingId(null);
    setIsSubmitting(false);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-100">
        <h3 className="text-2xl font-bold text-[#191974]">Tour Itineraries</h3>
      </div>
      <form onSubmit={handleSave} className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Select Tour</label>
            <select required value={form.tour_id || ''} onChange={e => setForm({ ...form, tour_id: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm bg-white">
              <option value="">-- Choose Tour --</option>
              {tours.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Itinerary Days (JSON Array Format)</label>
            <textarea 
              rows={4} 
              value={dayInput} 
              onChange={e => setDayInput(e.target.value)} 
              placeholder='[ { "title": "Day 1", "description": "Arrival" } ]' 
              className="w-full px-4 py-2 border rounded-lg text-sm font-mono placeholder:font-sans bg-white" 
            />
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="itin-visibility" checked={!!form.is_published} onChange={e => setForm({ ...form, is_published: e.target.checked })} className="w-5 h-5 rounded text-[#ee2229]" />
            <label htmlFor="itin-visibility" className="text-sm font-bold text-gray-700">Published</label>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button type="submit" disabled={isSubmitting} className="bg-[#191974] text-white px-6 py-2 rounded-lg font-bold text-sm">Save Itinerary</button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ is_published: true }); setDayInput(''); }} className="bg-gray-200 px-6 py-2 rounded-lg font-bold text-sm">Cancel</button>}
        </div>
      </form>

      {loading ? <div className="p-10 text-center">Loading...</div> : (
        <div className="bg-white border rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-400 uppercase">
                <th className="px-6 py-4">Tour Name</th><th className="px-6 py-4">Total Days</th><th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map(item => (
                <tr key={item.id}>
                  <td className="px-6 py-4 font-semibold text-[#191974]">{item.tours?.title || '-'}</td>
                  <td className="px-6 py-4">{Array.isArray(item.days) ? item.days.length : 0} Days</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button onClick={() => { setEditingId(item.id); setForm(item); setDayInput(JSON.stringify(item.days, null, 2)); }} className="text-blue-500"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
