"use client";

import React from 'react';
import { cn } from '@/utils/cn';

type Tab = {
  id: string;
  label: string;
};

interface TourTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export default function TourTabs({ tabs, activeTab, onTabChange }: TourTabsProps) {
  return (
    <div className="border-b border-gray-100 sticky top-[74px] bg-white/90 backdrop-blur-xl z-30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex space-x-6 overflow-x-auto no-scrollbar scroll-smooth">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "py-3 px-1 border-b-2 font-black text-[13px] tracking-widest transition-all duration-500 whitespace-nowrap font-inter active:scale-95",
                activeTab === tab.id
                  ? "border-[#ee2229] text-[#ee2229] opacity-100"
                  : "border-transparent text-[#191974] hover:text-[#ee2229] hover:opacity-100 opacity-60"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
