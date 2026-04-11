"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function VisasBlogsList() {
  const [activeTab, setActiveTab] = useState('All');
  
  const mockItems = [
    { id: 1, title: 'Schengen Visa Requirements 2026', type: 'Visa Info', author: 'tech1', status: 'Published', date: '2026/01/15', checked: false },
    { id: 2, title: 'Top 10 Hidden Gems in Vietnam', type: 'Travel Blog', author: 'marketing_team', status: 'Published', date: '2026/02/20', checked: false },
    { id: 3, title: 'US Tourist Visa (B2) Guide - Updates', type: 'Visa Info', author: 'tech1', status: 'Draft', date: 'Last Modified', checked: false },
    { id: 4, title: 'Best time to visit Dubai', type: 'Travel Blog', author: 'marketing_team', status: 'Published', date: '2025/11/10', checked: false },
  ];

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-normal text-[#1d2327]">Visas & Blogs</h1>
        <button className="px-3 py-1 border border-blue-600/30 text-blue-600 text-sm font-medium rounded hover:bg-blue-50 transition-colors">
          Add New Post
        </button>
      </div>

      <div className="flex items-center gap-4 text-[13px]">
        <button onClick={() => setActiveTab('All')} className={`transition-colors ${activeTab === 'All' ? 'font-semibold text-[#1d2327]' : 'text-blue-600 hover:text-blue-800'}`}>All <span className="text-gray-500 font-normal">({mockItems.length})</span></button>
        <span className="text-gray-300">|</span>
        <button onClick={() => setActiveTab('Published')} className={`transition-colors ${activeTab === 'Published' ? 'font-semibold text-[#1d2327]' : 'text-blue-600 hover:text-blue-800'}`}>Published <span className="text-gray-500 font-normal">({mockItems.filter(p => p.status === 'Published').length})</span></button>
        <span className="text-gray-300">|</span>
        <button onClick={() => setActiveTab('Draft')} className={`transition-colors ${activeTab === 'Draft' ? 'font-semibold text-[#1d2327]' : 'text-blue-600 hover:text-blue-800'}`}>Draft <span className="text-gray-500 font-normal">({mockItems.filter(p => p.status === 'Draft').length})</span></button>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
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
              <option>All Types</option>
              <option>Visa Info</option>
              <option>Travel Blog</option>
            </select>
            <button className="px-3 py-1 border border-gray-300 text-gray-700 text-[13px] rounded hover:bg-gray-100 bg-gray-50 transition-colors hidden sm:block whitespace-nowrap">
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-gray-200 bg-white text-[#1d2327]">
                <th className="w-10 px-4 py-3 align-middle"><input type="checkbox" className="rounded-sm border-gray-300 cursor-pointer" /></th>
                <th className="px-4 py-3 font-semibold hover:text-blue-600 cursor-pointer">Title</th>
                <th className="px-4 py-3 font-semibold hover:text-blue-600 cursor-pointer">Type</th>
                <th className="px-4 py-3 font-semibold hover:text-blue-600 cursor-pointer">Author</th>
                <th className="px-4 py-3 font-semibold hover:text-blue-600 cursor-pointer">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {mockItems.filter(p => activeTab === 'All' || p.status === activeTab).map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 group transition-colors">
                  <td className="px-4 py-3 align-top"><input type="checkbox" className="mt-1 rounded-sm border-gray-300 cursor-pointer" /></td>
                  <td className="px-4 py-3 align-top">
                    <Link href={`#`} className={`font-semibold text-blue-700 hover:text-blue-600 transition-colors`}>
                      {item.title}
                    </Link>
                    {item.status === 'Draft' && <span className="ml-2 font-bold text-gray-500">— Draft</span>}
                    <div className="h-5 flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-[12px] pt-1">
                      <button className="text-blue-600 hover:text-blue-800 hover:underline">Edit</button>
                      <span className="text-gray-300">|</span>
                      <button className="text-red-600 hover:text-red-800 hover:underline">Bin</button>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${item.type === 'Visa Info' ? 'bg-amber-100 text-amber-700' : 'bg-cyan-100 text-cyan-700'}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top text-blue-600 hover:text-blue-800 hover:underline cursor-pointer">{item.author}</td>
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
