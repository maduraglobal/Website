"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { formatRegionalPrice } from '@/config/country';
import {
  Check, MapPin, Calendar, Users, ShieldCheck, CreditCard,
  ArrowLeft, ChevronLeft, ArrowRight, Baby, User, UserCheck, Plus, Minus
} from 'lucide-react';

type BookingStep = 1 | 2 | 3;
type TravelerType = 'adult' | 'child' | 'infant';

interface Traveler {
  id: string;
  type: TravelerType;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  passportNo: string;
}

function createTraveler(type: TravelerType, index: number): Traveler {
  return { id: `${type}-${index}`, type, firstName: '', lastName: '', dob: '', gender: '', passportNo: '' };
}

const typeLabel: Record<TravelerType, string> = {
  adult: 'Adult',
  child: 'Child',
  infant: 'Infant',
};

const typeIcon: Record<TravelerType, React.ReactNode> = {
  adult: <UserCheck className="w-5 h-5" />,
  child: <User className="w-4 h-4" />,
  infant: <Baby className="w-4 h-4" />,
};

const typeColor: Record<TravelerType, string> = {
  adult: 'bg-[#191974] text-white',
  child: 'bg-orange-500 text-white',
  infant: 'bg-pink-500 text-white',
};

export default function BookingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const region = (params?.region as string) || 'in';
  const tourName = searchParams?.get('tour')?.replace(/-/g, ' ') || 'Select Tour Package';
  const selectedCity = searchParams?.get('city') || 'Mumbai';
  const selectedDate = searchParams?.get('date') || 'Select Date';
  const price = parseInt(searchParams?.get('price') || '0');
  const savings = parseInt(searchParams?.get('savings') || '0');

  const [step, setStep] = useState<BookingStep>(1);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Traveler counts
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  // Lead booker details
  const [lead, setLead] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '' });

  // Co-traveler details (auto-generated based on counts)
  const [travelers, setTravelers] = useState<Traveler[]>([]);

  // Rebuild traveler list whenever counts change
  useEffect(() => {
    const newList: Traveler[] = [];
    for (let i = 0; i < adults; i++) newList.push(createTraveler('adult', i + 1));
    for (let i = 0; i < children; i++) newList.push(createTraveler('child', i + 1));
    for (let i = 0; i < infants; i++) newList.push(createTraveler('infant', i + 1));
    setTravelers(newList);
  }, [adults, children, infants]);

  const totalTravelers = adults + children + infants;
  const totalPrice = price * (adults + children);

  const handleLeadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLead(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTravelerChange = (id: string, field: keyof Traveler, value: string) => {
    setTravelers(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const Counter = ({ label, value, onChange, min = 0, max = 9, hint }: {
    label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; hint?: string;
  }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
      <div>
        <p className="font-bold text-[#191974] text-sm">{label}</p>
        {hint && <p className="text-[11px] text-gray-400">{hint}</p>}
      </div>
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))}
          className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#ee2229] hover:text-[#ee2229] transition-all disabled:opacity-30"
          disabled={value <= min}>
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-6 text-center font-bold text-[#191974] text-lg">{value}</span>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))}
          className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#191974] hover:text-[#191974] transition-all disabled:opacity-30"
          disabled={value >= max}>
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) { window.scrollTo({ top: 0, behavior: 'smooth' }); setStep(s => (s + 1) as BookingStep); }
  };

  const initiatePayment = async () => {
    setLoading(true);
    try { await new Promise(r => setTimeout(r, 2000)); setIsSuccess(true); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  if (isSuccess) {
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
            <h2 className="text-3xl font-bold text-[#191974]">Booking Confirmed!</h2>
            <p className="text-gray-500">Your trip to <span className="capitalize text-[#ee2229] font-bold">{tourName}</span> is now reserved. Confirmation sent to <strong>{lead.email}</strong>.</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Order ID</span>
              <span className="font-bold text-[#191974]">#MAD{Math.floor(Math.random() * 89999) + 10000}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Travelers</span>
              <span className="font-bold text-[#191974]">{totalTravelers} Person(s)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total Paid</span>
              <span className="font-bold text-[#ee2229]">{formatRegionalPrice(totalPrice, region)}</span>
            </div>
          </div>
          <button onClick={() => router.push(`/${region}/tours`)} className="w-full bg-[#191974] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#ee2229] transition-all ">
            Explore More Tours <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc] font-inter">
      {/* Header Banner */}
      <div className="bg-[#191974] text-white pt-24 pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#ee2229]/5 skew-x-12 translate-x-1/2"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-white/50 hover:text-white mb-6 text-xs font-bold tracking-widest uppercase transition-colors">
            <ChevronLeft className="w-4 h-4" /> Go Back
          </button>
          <h4 className="text-3xl md:text-4xl font-bold tracking-tight">Complete Your Booking</h4>
          <p className="text-white/50 text-sm mt-2 max-w-xl">Secure your spot for <span className="text-white capitalize font-semibold">{tourName}</span> departing from {selectedCity}.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 pb-24">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* LEFT: Form */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* Stepper */}
            <div className="bg-white rounded-2xl  border border-gray-100 px-8 py-6">
              <div className="flex items-center">
                {[1, 2, 3].map((s) => (
                  <React.Fragment key={s}>
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= s ? 'bg-[#ee2229] text-white  ' : 'bg-gray-100 text-gray-400'}`}>
                        {step > s ? <Check className="w-5 h-5" strokeWidth={3} /> : s}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest whitespace-nowrap ${step >= s ? 'text-[#191974]' : 'text-gray-300'}`}>
                        {s === 1 ? 'Traveler Info' : s === 2 ? 'Review' : 'Payment'}
                      </span>
                    </div>
                    {s < 3 && <div className={`flex-1 h-[2px] mx-4 mb-5 transition-all ${step > s ? 'bg-[#ee2229]' : 'bg-gray-200'}`}></div>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-6">
                {/* Lead Booker */}
                <div className="bg-white rounded-3xl border border-gray-100  p-8 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#191974]">Lead Passenger Details</h2>
                    <p className="text-sm text-gray-400 mt-1">Primary contact for this booking (as per passport).</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[['firstName', 'First Name', 'E.g. Rahul'], ['lastName', 'Last Name', 'E.g. Sharma'], ['email', 'Email Address', 'rahul@email.com'], ['phone', 'Mobile Number', '+91 90000 00000']].map(([name, label, ph]) => (
                      <div key={name} className="space-y-2">
                        <label className="text-[10px] font-bold text-[#191974]/50 uppercase tracking-widest">{label}</label>
                        <input
                          required type={name === 'email' ? 'email' : name === 'phone' ? 'tel' : 'text'}
                          name={name} value={(lead as any)[name]} onChange={handleLeadChange}
                          placeholder={ph}
                          className="w-full bg-gray-50 border-b-2 border-transparent focus:border-[#ee2229] focus:bg-white px-4 py-3.5 rounded-xl outline-none transition-all font-semibold text-[#191974] text-sm"
                        />
                      </div>
                    ))}
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-bold text-[#191974]/50 uppercase tracking-widest">Full Address</label>
                      <input required type="text" name="address" value={lead.address} onChange={handleLeadChange} placeholder="Street, City, State, Country"
                        className="w-full bg-gray-50 border-b-2 border-transparent focus:border-[#ee2229] focus:bg-white px-4 py-3.5 rounded-xl outline-none transition-all font-semibold text-[#191974] text-sm" />
                    </div>
                  </div>
                </div>

                {/* Traveler Count Selection */}
                <div className="bg-white rounded-3xl border border-gray-100  p-8 space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-[#191974]">Select Travelers</h2>
                    <p className="text-sm text-gray-400 mt-1">How many people are travelling?</p>
                  </div>
                  <Counter label="Adults" hint="Age 12+" value={adults} onChange={setAdults} min={1} />
                  <Counter label="Children" hint="Age 2–11" value={children} onChange={setChildren} />
                  <Counter label="Infants" hint="Under 2 years" value={infants} onChange={setInfants} />

                  {totalTravelers > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {[...Array(adults)].map((_, i) => (
                        <span key={`a${i}`} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#191974]/10 text-[#191974] text-xs font-bold">
                          <UserCheck className="w-3.5 h-3.5" /> Adult {i + 1}
                        </span>
                      ))}
                      {[...Array(children)].map((_, i) => (
                        <span key={`c${i}`} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold">
                          <User className="w-3.5 h-3.5" /> Child {i + 1}
                        </span>
                      ))}
                      {[...Array(infants)].map((_, i) => (
                        <span key={`inf${i}`} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-bold">
                          <Baby className="w-3.5 h-3.5" /> Infant {i + 1}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Co-Traveler Details */}
                {travelers.length > 0 && (
                  <div className="bg-white rounded-3xl border border-gray-100  p-8 space-y-8">
                    <div>
                      <h2 className="text-xl font-bold text-[#191974]">Co-Traveler Details</h2>
                      <p className="text-sm text-gray-400 mt-1">Please fill in details for all travelers (as per passport/birth certificate).</p>
                    </div>

                    {travelers.map((t, idx) => (
                      <div key={t.id} className="border border-gray-100 rounded-2xl overflow-hidden">
                        <div className={`flex items-center gap-3 px-6 py-4 ${typeColor[t.type]}`}>
                          {typeIcon[t.type]}
                          <span className="font-bold tracking-wide text-sm">{typeLabel[t.type]} {travelers.filter(x => x.type === t.type).indexOf(t) + 1}</span>
                          <span className="ml-auto text-[11px] opacity-60 uppercase tracking-widest">
                            {t.type === 'adult' ? '12+ yrs' : t.type === 'child' ? '2–11 yrs' : 'Under 2 yrs'}
                          </span>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                          {[['firstName', 'First Name', 'text'], ['lastName', 'Last Name', 'text']].map(([field, label, type]) => (
                            <div key={field} className="space-y-1.5">
                              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
                              <input
                                required type={type} value={(t as any)[field]}
                                onChange={e => handleTravelerChange(t.id, field as keyof Traveler, e.target.value)}
                                placeholder={label}
                                className="w-full bg-gray-50 border-b-2 border-transparent focus:border-[#ee2229] focus:bg-white px-3 py-3 rounded-lg outline-none transition-all font-semibold text-[#191974] text-sm"
                              />
                            </div>
                          ))}
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date of Birth</label>
                            <input required type="date" value={t.dob}
                              onChange={e => handleTravelerChange(t.id, 'dob', e.target.value)}
                              className="w-full bg-gray-50 border-b-2 border-transparent focus:border-[#ee2229] focus:bg-white px-3 py-3 rounded-lg outline-none transition-all font-semibold text-[#191974] text-sm"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gender</label>
                            <select required value={t.gender} onChange={e => handleTravelerChange(t.id, 'gender', e.target.value)}
                              className="w-full bg-gray-50 border-b-2 border-transparent focus:border-[#ee2229] focus:bg-white px-3 py-3 rounded-lg outline-none transition-all font-semibold text-[#191974] text-sm appearance-none">
                              <option value="">Select Gender</option>
                              <option>Male</option>
                              <option>Female</option>
                              <option>Other</option>
                            </select>
                          </div>
                          {t.type !== 'infant' && (
                            <div className="space-y-1.5 md:col-span-2">
                              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Passport Number (Optional)</label>
                              <input type="text" value={t.passportNo}
                                onChange={e => handleTravelerChange(t.id, 'passportNo', e.target.value)}
                                placeholder="e.g. A1234567"
                                className="w-full bg-gray-50 border-b-2 border-transparent focus:border-[#ee2229] focus:bg-white px-3 py-3 rounded-lg outline-none transition-all font-semibold text-[#191974] text-sm"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-end">
                  <button type="submit" className="bg-[#ee2229] text-white px-12 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-[#191974] transition-all   active:scale-95 group">
                    Continue to Review <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Review */}
            {step === 2 && (
              <div className="bg-white rounded-3xl border border-gray-100  p-8 space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-[#191974]">Review Your Booking</h2>
                  <p className="text-sm text-gray-400 mt-1">Please confirm all details before payment.</p>
                </div>

                {/* Lead details */}
                <div className="grid md:grid-cols-2 gap-8 pb-6 border-b border-gray-100">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lead Passenger</span>
                    <p className="font-bold text-[#191974] text-lg">{lead.firstName} {lead.lastName}</p>
                    <p className="text-gray-500 text-sm">{lead.email}</p>
                    <p className="text-gray-500 text-sm">{lead.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Departure Info</span>
                    <p className="font-bold text-[#191974] text-lg">{selectedCity}</p>
                    <p className="text-[#ee2229] font-bold">{selectedDate}</p>
                  </div>
                </div>

                {/* Traveler summary */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">All Travelers ({totalTravelers})</span>
                  {travelers.map(t => (
                    <div key={t.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${typeColor[t.type]}`}>{typeIcon[t.type]}</span>
                      <div className="flex-1">
                        <p className="font-bold text-[#191974] text-sm">{t.firstName || '—'} {t.lastName || ''}</p>
                        <p className="text-[11px] text-gray-400">{typeLabel[t.type]} · {t.dob || 'DOB not provided'} · {t.gender || '—'}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-4">
                  <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-[#191974]">Madura Secure Booking</p>
                    <p className="text-xs text-blue-700 leading-relaxed mt-1">Your personal data is protected with 256-bit SSL encryption. We never share your information without consent.</p>
                  </div>
                </div> */}

                <div className="flex justify-between items-center">
                  <button type="button" onClick={() => setStep(1)} className="text-[#191974] font-bold flex items-center gap-2 hover:text-[#ee2229] transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Edit Details
                  </button>
                  <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setStep(3); }} className="bg-[#ee2229] text-white px-12 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-[#191974] transition-all  active:scale-95 group">
                    Proceed to Payment <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment */}
            {step === 3 && (
              <div className="bg-white rounded-3xl border border-gray-100  p-8 space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-[#191974]">Secure Payment</h2>
                  <p className="text-sm text-gray-400 mt-1">Your payment is encrypted and fully secure.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 border-2 border-[#191974] bg-blue-50/30 rounded-2xl relative cursor-pointer">
                    <div className="absolute top-4 right-4 text-[#191974]"><Check className="w-5 h-5" strokeWidth={3} /></div>
                    <CreditCard className="w-8 h-8 text-[#191974] mb-3" />
                    <h4 className="font-bold text-[#191974] text-sm">Credit / Debit Card</h4>
                    <p className="text-xs text-gray-400 mt-1">Visa, MasterCard, Amex</p>
                  </div>
                  <div className="p-5 border-2 border-gray-100 rounded-2xl cursor-pointer hover:border-gray-200 transition-all">
                    <div className="w-8 h-8 bg-gray-100 rounded-full mb-3 flex items-center justify-center font-bold text-gray-400">₹</div>
                    <h4 className="font-bold text-gray-400 text-sm">Net Banking / UPI</h4>
                    <p className="text-xs text-gray-400 mt-1">GPay, PhonePe, NEFT</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <input type="text" placeholder="Card Number" className="w-full bg-gray-50 border-b-2 border-transparent focus:border-[#ee2229] px-4 py-4 rounded-xl outline-none font-semibold text-[#191974] transition-all" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM / YY" className="w-full bg-gray-50 border-b-2 border-transparent focus:border-[#ee2229] px-4 py-4 rounded-xl outline-none font-semibold text-[#191974] transition-all" />
                    <input type="password" placeholder="CVV" className="w-full bg-gray-50 border-b-2 border-transparent focus:border-[#ee2229] px-4 py-4 rounded-xl outline-none font-semibold text-[#191974] transition-all" />
                  </div>
                </div>

                <div className="space-y-4">
                  <button onClick={initiatePayment} disabled={loading}
                    className="w-full bg-[#ee2229] text-white py-5 rounded-2xl font-bold text-base hover:bg-[#191974] transition-all   active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3">
                    {loading ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                      : <><ShieldCheck className="w-5 h-5" /> Pay {formatRegionalPrice(totalPrice, region)} Securely</>}
                  </button>
                  <button onClick={() => setStep(2)} className="w-full text-sm text-gray-400 font-bold hover:text-[#191974] transition-colors">
                    ← Go Back
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Sticky Summary */}
          <div className="lg:w-[380px] shrink-0 sticky top-28">
            <div className="bg-white rounded-[28px]   border border-gray-100 overflow-hidden">
              <div className="relative h-44">
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-black/20 z-10"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200')] bg-cover bg-center"></div>
                <div className="absolute bottom-5 left-5 right-5 z-20 text-white">
                  <span className="text-[9px] font-bold bg-[#ee2229] px-2 py-0.5 rounded-sm uppercase tracking-widest">Booking For</span>
                  <h3 className="text-lg font-bold capitalize mt-1 truncate">{tourName}</h3>
                </div>
              </div>

              <div className="p-7 space-y-6">
                <div className="space-y-4">
                  {[
                    { icon: <MapPin className="w-5 h-5" />, label: 'Departure City', value: selectedCity },
                    { icon: <Calendar className="w-5 h-5" />, label: 'Departure Date', value: selectedDate },
                    { icon: <Users className="w-5 h-5" />, label: 'Travelers', value: `${adults} Adult${adults !== 1 ? 's' : ''}${children > 0 ? `, ${children} Child${children !== 1 ? 'ren' : ''}` : ''}${infants > 0 ? `, ${infants} Infant${infants !== 1 ? 's' : ''}` : ''}` },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-center gap-4">
                      <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-[#191974]">{icon}</div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
                        <p className="font-bold text-[#191974] text-sm">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t-2 border-dashed border-gray-100 space-y-3">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Base fare ({adults + children} paying)</span>
                    <span className="font-bold text-[#191974]">{formatRegionalPrice(totalPrice, region)}</span>
                  </div>
                  {infants > 0 && (
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Infants ({infants})</span>
                      <span className="font-bold text-green-500">Complimentary</span>
                    </div>
                  )}
                  {savings > 0 && (
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Savings</span>
                      <span className="font-bold text-green-500">-{formatRegionalPrice(savings * (adults + children), region)}</span>
                    </div>
                  )}
                  <div className="p-5 bg-[#191974] rounded-2xl text-white flex justify-between items-center mt-2">
                    <div>
                      <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Total Amount</p>
                      <p className="text-2xl font-bold tracking-tight">{formatRegionalPrice(totalPrice, region)}</p>
                    </div>
                    <ShieldCheck className="w-8 h-8 opacity-20" />
                  </div>
                  <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">*Incl. all taxes & fees</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
