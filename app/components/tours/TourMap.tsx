"use client";

import React from 'react';

interface TourMapProps {
  tourTitle?: string;
  onPreview?: () => void;
  fullsize?: boolean;
  itinerary?: any[];
}

export default function TourMap({ fullsize }: TourMapProps) {
  return (
    <div className={`relative w-full overflow-hidden bg-gray-100 border border-gray-200 ${fullsize ? 'h-full' : 'rounded-[32px] h-full'}`}>
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(#191974 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
    </div>
  );
}
