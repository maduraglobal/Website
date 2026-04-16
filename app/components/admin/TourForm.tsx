"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Save, 
  X, 
  Plus, 
  Trash2, 
  Calendar, 
  Plane, 
  Hotel, 
  Users, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Tour, ItineraryDay, Destination } from "@/utils/crm-types";

interface TourFormProps {
  initialData?: any;
  destinations: Destination[];
  categories: any[];
}

export default function TourForm({ initialData, destinations, categories }: TourFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState<any>(initialData || {
    title: "",
    slug: "",
    price: 0,
    currency: "INR",
    duration_days: 0,
    duration_nights: 0,
    destination_id: "",
    category_id: "",
    image_url: "",
    images: [],
    travelers: { adults: 0, children: 0, infants: 0 },
    flight_details: "",
    accommodation_details: "",
    inclusions: [],
    exclusions: [],
    visibility: true,
  });

  const [itineraryDays, setItineraryDays] = useState<any[]>(
    initialData?.days || initialData?.itineraries?.days || []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = initialData?.id ? `/api/tours/${initialData.id}` : "/api/tours";
      const method = initialData?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          itinerary: itineraryDays
        }),
      });

      if (!res.ok) throw new Error("Failed to save tour");
      
      setSuccess(true);
      setTimeout(() => router.push("/admin/tours"), 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addDay = () => {
    setItineraryDays([...itineraryDays, { 
      day: itineraryDays.length + 1, 
      title: "", 
      description: "", 
      activities: [] 
    }]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <p className="font-bold text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-green-600 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5" />
          <p className="font-bold text-sm">Package saved successfully!</p>
        </div>
      )}

      {/* Basic Info Section */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-[#191974] flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-[#ee2229]" />
          Basic Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Tour Title</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#ee2229] transition-all"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Destination</label>
            <select 
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#ee2229] transition-all"
              value={formData.destination_id}
              onChange={(e) => setFormData({...formData, destination_id: e.target.value})}
            >
              <option value="">Select Destination</option>
              {destinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Cover Image URL</label>
            <input 
              type="url" 
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#ee2229] transition-all"
              value={formData.image_url}
              onChange={(e) => setFormData({...formData, image_url: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Currency</label>
              <select 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#ee2229] transition-all font-bold"
                value={formData.currency}
                onChange={(e) => setFormData({...formData, currency: e.target.value})}
              >
                <option value="INR">INR (â‚¹)</option>
                <option value="AUD">AUD (A$)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Base Price</label>
              <input 
                required
                type="number" 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#ee2229] transition-all font-bold text-[#ee2229]"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Days</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#ee2229] transition-all"
                value={formData.duration_days}
                onChange={(e) => setFormData({...formData, duration_days: Number(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Nights</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#ee2229] transition-all"
                value={formData.duration_nights}
                onChange={(e) => setFormData({...formData, duration_nights: Number(e.target.value)})}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Itinerary Section */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-[#191974] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#ee2229]" />
            Day-wise Itinerary
          </h3>
          <button 
            type="button" 
            onClick={addDay}
            className="px-4 py-2 bg-[#191974] text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#ee2229] transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Day
          </button>
        </div>

        <div className="space-y-4">
          {itineraryDays.map((day, idx) => (
            <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 relative group">
              <button 
                type="button"
                onClick={() => setItineraryDays(itineraryDays.filter((_, i) => i !== idx))}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 gap-4">
                <input 
                  placeholder={`Day ${day.day} Title (e.g., Arrival in Kerala)`}
                  className="w-full bg-transparent font-bold text-[#191974] border-b border-gray-200 focus:border-[#ee2229] outline-none pb-2"
                  value={day.title}
                  onChange={(e) => {
                    const newDays = [...itineraryDays];
                    newDays[idx].title = e.target.value;
                    setItineraryDays(newDays);
                  }}
                />
                <textarea 
                  placeholder="Day description..."
                  className="w-full bg-transparent text-sm text-gray-600 outline-none resize-none min-h-[80px]"
                  value={day.description}
                  onChange={(e) => {
                    const newDays = [...itineraryDays];
                    newDays[idx].description = e.target.value;
                    setItineraryDays(newDays);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-[#191974] flex items-center gap-2">
            <Plane className="w-5 h-5 text-[#ee2229]" />
            Travel & Logistics
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Flight Details</label>
              <textarea 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#ee2229] transition-all text-sm min-h-[100px]"
                value={formData.flight_details}
                onChange={(e) => setFormData({...formData, flight_details: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Accommodation Summary</label>
              <textarea 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#ee2229] transition-all text-sm min-h-[100px]"
                value={formData.accommodation_details}
                onChange={(e) => setFormData({...formData, accommodation_details: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-[#191974] flex items-center gap-2">
            <Users className="w-5 h-5 text-[#ee2229]" />
            Pricing Strategy
          </h3>
          <div className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Adult Fee</label>
                  <input type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#ee2229]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Child Fee</label>
                  <input type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#ee2229]" />
                </div>
             </div>
             <div className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                 <AlertCircle className="w-5 h-5" />
               </div>
               <p className="text-xs text-blue-700 font-medium">Dynamic traveler pricing ensures accurate booking calculation on the public storefront.</p>
             </div>
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          disabled={loading}
          className="bg-[#ee2229] hover:bg-[#191974] text-white px-10 py-5 rounded-full font-bold shadow-2xl flex items-center gap-3 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {initialData?.id ? "UPDATE PACKAGE" : "PUBLISH TOUR"}
        </button>
      </div>
    </form>
  );
}
