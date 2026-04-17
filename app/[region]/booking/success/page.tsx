"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Check, ArrowRight } from 'lucide-react';

export default function BookingSuccessPage() {
  const params = useParams();
  const router = useRouter();
  const region = (params?.region as string) || 'in';

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 bg-green-100 rounded-full scale-150 opacity-20 animate-pulse"></div>
          <div className="relative w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white ">
            <Check className="w-12 h-12" strokeWidth={3} />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-[#191974]">Payment Successful!</h2>
          <p className="text-gray-500">Your booking has been confirmed. A confirmation email has been sent to your registered email address.</p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Order Status</span>
            <span className="font-bold text-green-600 uppercase">Confirmed</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Transaction ID</span>
            <span className="font-bold text-[#191974]">#{Math.random().toString(36).substring(7).toUpperCase()}</span>
          </div>
        </div>
        <button onClick={() => router.push(`/${region}/tours`)} className="w-full bg-[#191974] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#ee2229] transition-all ">
          Explore More Tours <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
