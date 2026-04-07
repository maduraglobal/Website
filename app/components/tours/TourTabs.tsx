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
    <div className="border-b border-gray-200 sticky top-16 bg-white z-30">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex space-x-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "py-4 px-1 border-b-2 font-bold text-[14px] uppercase tracking-wider transition-all whitespace-nowrap",
                activeTab === tab.id
                  ? "border-[#191974] text-[#191974]"
                  : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300"
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
