"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Plus, FileText, CheckCircle2, CircleDashed, MoreVertical, Pencil, Trash2, ExternalLink } from 'lucide-react';

export default function CMSPagesList() {
  const [activeTab, setActiveTab] = useState('All');
  
  const mockPages = [
    { id: 1, title: 'Account - Elementor, My Account Page', author: 'tech1', status: 'Published', date: '2022/06/23 at 07:13', checked: false },
    { id: 2, title: 'Account #2 - Draft, Elementor', author: 'tech1', status: 'Draft', date: 'Last Modified 2026/03/31 at 18:53', checked: false },
    { id: 3, title: 'Affiliate Account', author: 'tech1', status: 'Published', date: '2025/05/16 at 17:35', checked: false },
    { id: 4, title: 'Affiliate Registration', author: 'tech1', status: 'Published', date: '2025/05/16 at 17:35', checked: false },
    { id: 5, title: 'Terms and Conditions', author: 'admin', status: 'Published', date: '2024/11/12 at 10:20', checked: false },
  ];

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-normal text-[#1d2327]">Pages</h1>
        <button className="px-3 py-1 border border-blue-600/30 text-blue-600 text-sm font-medium rounded hover:bg-blue-50 transition-colors">
          Add New
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 text-[13px]">
        <button onClick={() => setActiveTab('All')} className={`transition-colors ${activeTab === 'All' ? 'font-semibold text-[#1d2327]' : 'text-blue-600 hover:text-blue-800'}`}>All <span className="text-gray-500 font-normal">({mockPages.length})</span></button>
        <span className="text-gray-300">|</span>
        <button onClick={() => setActiveTab('Published')} className={`transition-colors ${activeTab === 'Published' ? 'font-semibold text-[#1d2327]' : 'text-blue-600 hover:text-blue-800'}`}>Published <span className="text-gray-500 font-normal">({mockPages.filter(p => p.status === 'Published').length})</span></button>
        <span className="text-gray-300">|</span>
        <button onClick={() => setActiveTab('Draft')} className={`transition-colors ${activeTab === 'Draft' ? 'font-semibold text-[#1d2327]' : 'text-blue-600 hover:text-blue-800'}`}>Draft <span className="text-gray-500 font-normal">({mockPages.filter(p => p.status === 'Draft').length})</span></button>
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
              <option>All dates</option>
            </select>
            <button className="px-3 py-1 border border-gray-300 text-gray-700 text-[13px] rounded hover:bg-gray-100 bg-gray-50 transition-colors hidden sm:block whitespace-nowrap">
              Filter
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Search Pages" 
              className="border border-gray-300 rounded px-3 py-1.5 text-[13px] bg-white w-48 outline-none focus:border-blue-500 text-gray-700 hidden md:block"
            />
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
                <th className="px-4 py-3 font-semibold hover:text-blue-600 cursor-pointer group">Title {'>'}</th>
                <th className="px-4 py-3 font-semibold hover:text-blue-600 cursor-pointer group w-32">Author {'>'}</th>
                <th className="px-4 py-3 font-semibold hover:text-blue-600 cursor-pointer group w-48">Date {'>'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {mockPages.filter(p => activeTab === 'All' || p.status === activeTab).map((page) => (
                <tr key={page.id} className="hover:bg-gray-50 group transition-colors">
                  <td className="px-4 py-3 align-top"><input type="checkbox" className="mt-1 rounded-sm border-gray-300 cursor-pointer" /></td>
                  <td className="px-4 py-3 align-top">
                    <Link href="#" className={`font-semibold text-blue-700 hover:text-blue-600 transition-colors ${page.status === 'Draft' ? '' : ''}`}>
                      {page.title}
                    </Link>
                    {page.status === 'Draft' && <span className="ml-2 font-bold text-gray-500">— Draft</span>}
                    {/* Hover Actions */}
                    <div className="h-5 flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-[12px] pt-1">
                      <button className="text-blue-600 hover:text-blue-800 hover:underline">Edit</button>
                      <span className="text-gray-300">|</span>
                      <button className="text-blue-600 hover:text-blue-800 hover:underline">Quick Edit</button>
                      <span className="text-gray-300">|</span>
                      <button className="text-red-600 hover:text-red-800 hover:underline">Bin</button>
                      <span className="text-gray-300">|</span>
                      <button className="text-blue-600 hover:text-blue-800 hover:underline">View</button>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top text-blue-600 hover:text-blue-800 hover:underline cursor-pointer">{page.author}</td>
                  <td className="px-4 py-3 align-top text-gray-600">
                    <p className="font-semibold text-[#1d2327] mb-0.5">{page.status === 'Draft' ? 'Last Modified' : 'Published'}</p>
                    <p>{page.date}</p>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-gray-200 bg-white text-[#1d2327]">
                <th className="w-10 px-4 py-3 align-middle"><input type="checkbox" className="rounded-sm border-gray-300 cursor-pointer" /></th>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Author</th>
                <th className="px-4 py-3 font-semibold">Date</th>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Table Controls Bottom */}
        <div className="p-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <select className="border border-gray-300 rounded px-2 py-1 text-[13px] bg-white w-36 outline-none focus:border-blue-500 hover:border-gray-400 text-gray-700">
              <option>Bulk actions</option>
            </select>
            <button className="px-3 py-1 border border-gray-300 text-gray-700 text-[13px] rounded hover:bg-gray-100 bg-gray-50 transition-colors">
              Apply
            </button>
          </div>
          <div className="text-[13px] text-gray-500 flex items-center gap-4">
            <span>{mockPages.length} items</span>
            <div className="flex items-center gap-1">
              <button className="px-2 py-1 border border-gray-300 rounded text-gray-400 cursor-not-allowed">«</button>
              <button className="px-2 py-1 border border-gray-300 rounded text-gray-400 cursor-not-allowed">‹</button>
              <span className="px-2 text-[#1d2327]">1 of 1</span>
              <button className="px-2 py-1 border border-gray-300 rounded text-gray-400 cursor-not-allowed">›</button>
              <button className="px-2 py-1 border border-gray-300 rounded text-gray-400 cursor-not-allowed">»</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
