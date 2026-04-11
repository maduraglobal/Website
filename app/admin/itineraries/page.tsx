"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ItinerariesList() {
  const [activeTab, setActiveTab] = useState('All');
  
  const mockItems = [
    { id: 1, title: 'Europe Splendors 14 Days', destination: 'Mainland Europe', duration: '14 Days / 13 Nights', status: 'Published', date: '2026/01/15', checked: false },
    { id: 2, title: 'Dubai Gateway', destination: 'Middle East', duration: '5 Days / 4 Nights', status: 'Published', date: '2026/02/20', checked: false },
    { id: 3, title: 'Swiss Escapade - Draft', destination: 'Mainland Europe', duration: '7 Days / 6 Nights', status: 'Draft', date: 'Last Modified', checked: false },
    { id: 4, title: 'Australia Grandeur', destination: 'Australasia', duration: '12 Days / 11 Nights', status: 'Published', date: '2025/11/10', checked: false },
  ];

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-normal text-[#1d2327]">Itineraries</h1>
        <Link href="/admin/tours/new" className="px-3 py-1 border border-blue-600/30 text-blue-600 text-sm font-medium rounded hover:bg-blue-50 transition-colors">
          Add New
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 text-[13px]">
        <button onClick={() => setActiveTab('All')} className={`transition-colors ${activeTab === 'All' ? 'font-semibold text-[#1d2327]' : 'text-blue-600 hover:text-blue-800'}`}>All <span className="text-gray-500 font-normal">({mockItems.length})</span></button>
        <span className="text-gray-300">|</span>
        <button onClick={() => setActiveTab('Published')} className={`transition-colors ${activeTab === 'Published' ? 'font-semibold text-[#1d2327]' : 'text-blue-600 hover:text-blue-800'}`}>Published <span className="text-gray-500 font-normal">({mockItems.filter(p => p.status === 'Published').length})</span></button>
        <span className="text-gray-300">|</span>
        <button onClick={() => setActiveTab('Draft')} className={`transition-colors ${activeTab === 'Draft' ? 'font-semibold text-[#1d2327]' : 'text-blue-600 hover:text-blue-800'}`}>Draft <span className="text-gray-500 font-normal">({mockItems.filter(p => p.status === 'Draft').length})</span></button>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        {/* Table Controls Top */}
        <div className="p-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <select className="border border-gray-300 rounded px-2 py-1 text-[13px] bg-white w-36 outline-none focus:border-blue-500 hover:border-gray-400 text-gray-700">
              <option>Bulk actions</option>
              <option>Edit</option>
              <option>Move to Bin</option>
            </select>
            <button className="px-3 py-1 border border-gray-300 text-gray-700 text-[13px] rounded hover:bg-gray-100 bg-gray-50 transition-colors whitespace-nowrap">
              Apply
            </button>
            <select className="border border-gray-300 rounded px-2 py-1 text-[13px] bg-white w-32 outline-none focus:border-blue-500 hover:border-gray-400 text-gray-700 hidden sm:block">
              <option>All destinations</option>
            </select>
            <button className="px-3 py-1 border border-gray-300 text-gray-700 text-[13px] rounded hover:bg-gray-100 bg-gray-50 transition-colors hidden sm:block whitespace-nowrap">
              Filter
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input type="text" placeholder="Search Itineraries" className="border border-gray-300 rounded px-3 py-1.5 text-[13px] bg-white w-48 outline-none focus:border-blue-500 text-gray-700 hidden md:block" />
            <button className="px-3 py-1 bg-blue-600 border border-blue-600 text-white text-[13px] rounded hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-gray-200 bg-white text-[#1d2327]">
                <th className="w-10 px-4 py-3 align-middle"><input type="checkbox" className="rounded-sm border-gray-300 cursor-pointer" /></th>
                <th className="px-4 py-3 font-semibold hover:text-blue-600 cursor-pointer">Title</th>
                <th className="px-4 py-3 font-semibold hover:text-blue-600 cursor-pointer">Destination</th>
                <th className="px-4 py-3 font-semibold hover:text-blue-600 cursor-pointer">Duration</th>
                <th className="px-4 py-3 font-semibold hover:text-blue-600 cursor-pointer">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {mockItems.filter(p => activeTab === 'All' || p.status === activeTab).map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 group transition-colors">
                  <td className="px-4 py-3 align-top"><input type="checkbox" className="mt-1 rounded-sm border-gray-300 cursor-pointer" /></td>
                  <td className="px-4 py-3 align-top">
                    <Link href={`/admin/tours`} className={`font-semibold text-blue-700 hover:text-blue-600 transition-colors`}>
                      {item.title}
                    </Link>
                    {item.status === 'Draft' && <span className="ml-2 font-bold text-gray-500">— Draft</span>}
                    <div className="h-5 flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-[12px] pt-1">
                      <button className="text-blue-600 hover:text-blue-800 hover:underline">Edit</button>
                      <span className="text-gray-300">|</span>
                      <button className="text-red-600 hover:text-red-800 hover:underline">Bin</button>
                      <span className="text-gray-300">|</span>
                      <button className="text-blue-600 hover:text-blue-800 hover:underline">View</button>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top text-gray-600">{item.destination}</td>
                  <td className="px-4 py-3 align-top text-gray-600">{item.duration}</td>
                  <td className="px-4 py-3 align-top text-gray-600">
                    <p className="font-semibold text-[#1d2327] mb-0.5">{item.status === 'Draft' ? 'Last Modified' : 'Published'}</p>
                    <p>{item.date}</p>
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
