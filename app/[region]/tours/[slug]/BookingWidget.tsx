"use client";

import React, { useState } from 'react';
import { formatRegionalPrice } from '../../../../config/country';

export default function BookingWidget({
  tourId,
  baseInrPrice,
  region
}: {
  tourId: string,
  baseInrPrice: number,
  region: string
}) {
  const [step, setStep] = useState<"initial" | "form" | "processing" | "success">("initial");

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    travelDate: '',
    travelers: 1
  });

  const [bookingObj, setBookingObj] = useState<any>(null);

  const handleBookNow = () => setStep("form");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");

    try {
      // Step 3: Lead Creation
      /* await fetch('/api/leads/create', { method: 'POST', body: JSON.stringify(formData) }) */
      console.log(`[POST /api/leads/create] -> Dispatched for ${formData.email}`);

      const mockLeadId = `lead_${Math.floor(Math.random() * 1000)}`;

      // Step 4: Booking Creation
      const mockBookingPayload = {
        id: `bkg_${Math.floor(Math.random() * 10000)}`,
        lead_id: mockLeadId,
        tour_id: tourId,
        status: "pending",
        amount: baseInrPrice * formData.travelers
      };

      /* await fetch('/api/bookings/create', { method: 'POST', body: JSON.stringify(...) }) */
      console.log(`[POST /api/bookings/create] -> Generated Booking`, mockBookingPayload);

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setBookingObj(mockBookingPayload);

      // Move to success / payment redirect logic here
      setStep("success");

    } catch (err) {
      console.error(err);
      setStep("form");
      alert("Failed to create booking.");
    }
  };

  const formattedBase = formatRegionalPrice(baseInrPrice, region);
  const formattedTotal = formatRegionalPrice(baseInrPrice * formData.travelers, region);

  return (
    <div data-no-modal className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl sticky top-8">

      {step === "initial" && (
        <>
          <div className="mb-6">
            <span className="text-[12px] font-bold tracking-wider text-gray-500 ">Per Person</span>
            <div className="text-[32px] font-bold text-[#191974] leading-tight">
              {formattedBase}
            </div>
            <p className="text-[#ee2229] font-bold text-[12px] mt-1 tracking-wide">Prices are all inclusive</p>
          </div>

          <ul className="flex flex-col gap-3 mb-6 text-[14px] font-semibold text-gray-700">
            <li className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-[#191974]/10 text-[#191974] flex items-center justify-center">âœ“</div> Free Cancellation (48hrs)</li>
            <li className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-[#191974]/10 text-[#191974] flex items-center justify-center">âœ“</div> Zero Hidden Charges</li>
          </ul>

          <button onClick={handleBookNow} className="w-full bg-[#191974] hover:bg-[#d61e24] text-white py-3.5 rounded-xl font-bold text-[16px] transition-colors shadow-sm">
            Book Now
          </button>
        </>
      )}

      {step === "form" && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h3 className="font-bold text-[18px] text-[#171717] border-b border-gray-100 pb-2">Traveler Details</h3>

          <input required type="text" placeholder="Full Name" className="border border-gray-200 p-3 rounded-xl text-[14px] outline-none focus:border-[#191974]" onChange={e => setFormData({ ...formData, name: e.target.value })} />
          <input required type="email" placeholder="Email Address" className="border border-gray-200 p-3 rounded-xl text-[14px] outline-none focus:border-[#191974]" onChange={e => setFormData({ ...formData, email: e.target.value })} />
          <input required type="tel" placeholder="Phone Number" className="border border-gray-200 p-3 rounded-xl text-[14px] outline-none focus:border-[#191974]" onChange={e => setFormData({ ...formData, phone: e.target.value })} />

          <div className="flex gap-3">
            <div className="flex flex-col w-1/2 gap-1">
              <span className="text-[11px] font-bold  text-gray-500 ml-1">Travel Date</span>
              <input required type="date" className="border border-gray-200 p-3 rounded-xl text-[14px] outline-none focus:border-[#191974]" onChange={e => setFormData({ ...formData, travelDate: e.target.value })} />
            </div>
            <div className="flex flex-col w-1/2 gap-1">
              <span className="text-[11px] font-bold  text-gray-500 ml-1">Travelers</span>
              <input required type="number" min="1" value={formData.travelers} className="border border-gray-200 p-3 rounded-xl text-[14px] outline-none focus:border-[#191974]" onChange={e => setFormData({ ...formData, travelers: parseInt(e.target.value) })} />
            </div>
          </div>

          <div className="border-t border-gray-100 mt-2 pt-4 flex justify-between items-center">
            <span className="text-[14px] font-bold text-gray-600">Total</span>
            <span className="text-[20px] font-bold text-[#191974]">{formattedTotal}</span>
          </div>

          <button type="submit" className="w-full bg-[#191974] hover:bg-[#111155] text-white py-3.5 rounded-xl font-bold text-[16px] transition-colors mt-2">
            Confirm Booking
          </button>
        </form>
      )}

      {step === "processing" && (
        <div className="py-10 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#ee2229] rounded-full animate-spin mb-4"></div>
          <p className="text-[14px] font-bold text-[#191974]">Creating Booking Object...</p>
          <span className="text-[12px] text-gray-500 mt-1">Generating lead data securely</span>
        </div>
      )}

      {step === "success" && bookingObj && (
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-16 h-16 bg-[#82c341]/10 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-[#82c341]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h3 className="font-bold text-[20px] text-[#171717] mb-1">Booking Initialized!</h3>
          <p className="text-[13px] text-gray-500 mb-6 ">ID: {bookingObj.id} <br /> Status: <span className="font-bold text-orange-500 ">{bookingObj.status}</span></p>

          <button className="w-full bg-[#171717] hover:bg-black text-white py-3.5 rounded-xl font-bold text-[14px] transition-colors">
            Proceed to Payment Gateway
          </button>
        </div>
      )}

    </div>
  );
}
