"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface DestinationHeaderProps {
  destinationName: string;
  totalTours: number;
}

export default function DestinationHeader({ destinationName, totalTours }: DestinationHeaderProps) {
  return (
    <div className="bg-[#191974] text-white py-12 md:py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 L100,100 L100,0 Z" fill="white" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <h4 className="text-4xl md:text-5xl  mb-3 text-white capitalize tracking-tighter ">
              {destinationName} Tour Packages
            </h4>
            <p className="text-white/80 text-[14px]  tracking-widest">
              Showing 1-{Math.min(10, totalTours)} of {totalTours} packages
            </p>
          </div>

          <div className="bg-[#ee2229] py-2 px-4 rounded-full flex items-center gap-2 shadow-lg self-start md:self-center">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span className="text-sm font-bold tracking-wider  text-white">
              {totalTours} Tours Ongoing Now
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
