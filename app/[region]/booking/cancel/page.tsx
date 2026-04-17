"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { XCircle, ArrowLeft } from 'lucide-react';

export default function BookingCancelPage() {
  const params = useParams();
  const router = useRouter();
  const region = (params?.region as string) || 'in';

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 bg-red-100 rounded-full scale-150 opacity-20"></div>
          <div className="relative w-24 h-24 bg-red-500 rounded-full flex items-center justify-center text-white ">
            <XCircle className="w-12 h-12" strokeWidth={3} />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-[#191974]">Payment Cancelled</h2>
          <p className="text-gray-500">Your payment process was cancelled. No charges were made.</p>
        </div>
        <button onClick={() => router.back()} className="w-full bg-[#191974] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#ee2229] transition-all ">
          <ArrowLeft className="w-5 h-5" /> Try Again
        </button>
      </div>
    </div>
  );
}
