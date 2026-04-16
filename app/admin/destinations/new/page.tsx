"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, Settings, Calendar, MapPin, Italic, Bold, List, Image as ImageIcon } from 'lucide-react';

export default function EditDestination() {
  const [title, setTitle] = useState('');

  return (
    <div className="max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/destinations" className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50 transition-colors tooltip" aria-label="Back">
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </Link>
          <h4 className="text-2xl font-normal text-[#1d2327]">Add New Destination Hub</h4>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          {/* Title Input */}
          <div className="bg-white border border-gray-200">
            <input
              type="text"
              placeholder="Enter destination name (e.g. Switzerland)"
              className="w-full px-4 py-3 text-2xl font-medium outline-none text-[#1d2327] placeholder:text-gray-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Permalink Preview */}
          {title && (
            <div className="text-[13px] text-gray-600 px-2 -mt-4">
              <strong>Permalink:</strong> https://maduratravel.com/destination/<span className="text-blue-600 bg-amber-50 px-1">{title.toLowerCase().replace(/ /g, '-')}</span>
              <button className="ml-2 text-blue-600 border border-blue-600 rounded-sm px-2 text-[11px] font-medium hover:bg-blue-50">Edit</button>
            </div>
          )}

          {/* Wysiwyg Editor Mock */}
          <div className="bg-white border border-gray-200 shadow-sm min-h-[400px] flex flex-col">
            <div className="border-b border-gray-200 bg-gray-50 flex flex-wrap items-center gap-1 p-1">
              <button className="p-2 hover:bg-white border border-transparent hover:border-gray-300 rounded text-gray-600"><Bold className="w-4 h-4" /></button>
              <button className="p-2 hover:bg-white border border-transparent hover:border-gray-300 rounded text-gray-600"><Italic className="w-4 h-4" /></button>
              <div className="w-px h-5 bg-gray-300 mx-1"></div>
              <button className="p-2 hover:bg-white border border-transparent hover:border-gray-300 rounded text-gray-600"><List className="w-4 h-4" /></button>
              <button className="p-2 hover:bg-white border border-transparent hover:border-gray-300 rounded text-gray-600 flex gap-2 items-center text-[12px] font-bold"><ImageIcon className="w-4 h-4" /> Add Media</button>
            </div>
            <textarea
              className="flex-1 w-full p-4 text-[14px] leading-relaxed outline-none resize-none focus:ring-1 focus:ring-blue-500/50"
              placeholder="Write the introduction or description for this destination hub page..."
            ></textarea>
          </div>

          <div className="bg-white border border-gray-200 shadow-sm">
            <div className="border-b border-gray-200 bg-[#f6f7f7] px-4 py-2.5 flex items-center justify-between">
              <h2 className="text-[14px] font-semibold text-[#1d2327]">Destination Info</h2>
            </div>
            <div className="p-4 grid grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-gray-700">Best Time to Visit</label>
                <input type="text" placeholder="e.g. Oct - Mar" className="w-full border border-gray-300 px-3 py-1.5 text-[13px] rounded-sm focus:border-blue-500 outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-gray-700">Currency</label>
                <input type="text" placeholder="e.g. Euro (€)" className="w-full border border-gray-300 px-3 py-1.5 text-[13px] rounded-sm focus:border-blue-500 outline-none" />
              </div>
            </div>
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-[320px] space-y-5">

          {/* Publish Box */}
          <div className="bg-white border border-gray-200 shadow-sm">
            <div className="border-b border-gray-200 bg-[#f6f7f7] px-4 py-2.5">
              <h2 className="text-[14px] font-semibold text-[#1d2327]">Publish</h2>
            </div>
            <div className="p-4 space-y-3 test-[13px]">
              <div className="flex items-center justify-between mt-2">
                <button className="border border-gray-300 text-gray-700 bg-[#f6f7f7] hover:bg-gray-100 px-3 py-1.5 rounded-sm text-[13px] font-medium transition-colors">Save Draft</button>
                <button className="border border-gray-300 text-gray-700 bg-[#f6f7f7] hover:bg-gray-100 px-3 py-1.5 rounded-sm text-[13px] font-medium transition-colors">Preview</button>
              </div>

              <div className="pt-3 pb-1 space-y-2 border-b border-gray-100">
                <div className="flex items-center gap-2 text-[13px]">
                  <Settings className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Status: <strong>Draft</strong></span>
                </div>
              </div>
              <div className="pt-2 flex justify-between items-center">
                <button className="text-red-600 hover:text-red-700 text-[13px] underline">Move to Bin</button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-[13px] font-semibold shadow-sm transition-colors">Publish</button>
              </div>
            </div>
          </div>

          {/* Region Parent */}
          <div className="bg-white border border-gray-200 shadow-sm">
            <div className="border-b border-gray-200 bg-[#f6f7f7] px-4 py-2.5">
              <h4 className="text-[14px] font-semibold text-[#1d2327]">Parent Region</h4>
            </div>
            <div className="p-4">
              <select className="w-full border border-gray-300 px-3 py-1.5 text-[13px] rounded-sm focus:border-blue-500 outline-none text-[#1d2327]">
                <option>None (Top Level)</option>
                <option>India</option>
                <option>Mainland Europe</option>
                <option>Australasia</option>
                <option>Middle East</option>
                <option>South East Asia</option>
                <option>Africa</option>
                <option>North America</option>
                <option>Central Asia</option>
              </select>
            </div>
          </div>

          {/* Grid Image */}
          <div className="bg-white border border-gray-200 shadow-sm">
            <div className="border-b border-gray-200 bg-[#f6f7f7] px-4 py-2.5">
              <h2 className="text-[14px] font-semibold text-[#1d2327]">Cover / Grid Image</h2>
            </div>
            <div className="p-4">
              <div className="border-2 border-dashed border-gray-300 bg-gray-50 h-32 flex flex-col items-center justify-center text-center rounded hover:bg-gray-100 transition-colors cursor-pointer group">
                <Upload className="w-6 h-6 text-gray-400 group-hover:text-blue-600 mb-2 transition-colors" />
                <p className="text-[13px] text-blue-600 underline">Set generic image</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
