"use client";

import React, { useState, use, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronLeft, Info, HelpCircle, User, Plane, Building2, Briefcase, Plus,
  CheckCircle2, Globe, Calendar, Clock, Upload, X, ShieldCheck, ArrowRight,
  CreditCard, Fingerprint, FileText, Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { getDynamicDestinationDetails } from '@/app/data/visaData';
import { getCountryConfig, formatRegionalPrice } from '@/config/country';
import PhonePrefixSelector from '@/app/components/ui/PhonePrefixSelector';

// --- TYPES ---
type VisStep = 'details' | 'documents' | 'review' | 'payment';

// --- MAIN COMPONENT ---
export default function VisaApplyPage({ params }: { params: Promise<{ region: string, slug: string }> }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#191974]/20 border-t-[#191974] rounded-full animate-spin" />
      </div>
    }>
      <VisaApplyContent params={params} />
    </Suspense>
  );
}

function VisaApplyContent({ params }: { params: Promise<{ region: string, slug: string }> }) {
  const resolvedParams = use(params);
  const { region, slug } = resolvedParams;
  const router = useRouter();
  const searchParams = useSearchParams();
  const countryConfig = getCountryConfig(region);
  const citizen = searchParams.get('citizen') || countryConfig.name;

  const destination = getDynamicDestinationDetails(slug, citizen);
  const destName = destination ? destination.name : (slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') : "Thailand");

  // --- STATE ---
  const [step, setStep] = useState<VisStep>('details');
  const [travelers, setTravelers] = useState([
    {
      id: 1,
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      passportNo: '',
      passportExpiry: '',
      email: '',
      phone: '',
      countryCode: 'in',
      documents: {} as Record<string, File | null>
    }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // --- LOGIC ---
  const handleTravelerChange = (id: number, field: string, value: any) => {
    setTravelers(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleDocUpload = (travelerId: number, docType: string, file: File | null) => {
    setTravelers(prev => prev.map(t =>
      t.id === travelerId
        ? { ...t, documents: { ...t.documents, [docType]: file } }
        : t
    ));
  };

  const validateDetails = () => {
    const newErrors: Record<string, string> = {};
    travelers.forEach(t => {
      if (!t.firstName) newErrors[`t-${t.id}-firstName`] = "First name required";
      if (!t.lastName) newErrors[`t-${t.id}-lastName`] = "Last name required";
      if (!t.passportNo) newErrors[`t-${t.id}-passportNo`] = "Passport number required";
      if (!t.email) newErrors[`t-${t.id}-email`] = "Email required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDocuments = () => {
    const newErrors: Record<string, string> = {};
    const requiredDocs = destination?.docs || ['Passport', 'Photo'];

    travelers.forEach(t => {
      requiredDocs.forEach(doc => {
        if (!t.documents[doc]) {
          newErrors[`t-${t.id}-${doc}`] = `${doc} is required`;
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 'details') {
      if (validateDetails()) setStep('documents');
    } else if (step === 'documents') {
      if (validateDocuments()) setStep('review');
    } else if (step === 'review') {
      setStep('payment');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    if (step === 'documents') setStep('details');
    else if (step === 'review') setStep('documents');
    else if (step === 'payment') setStep('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const visaFee = parseInt(destination?.price.replace(/,/g, '') || '0');
  const totalAmount = visaFee * travelers.length;

  if (isSuccess) return <SuccessScreen tourName={destName} travelersCount={travelers.length} total={totalAmount} region={region} />;

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-[#191974] font-inter">
      {/* HEADER BAR */}
      <div className="bg-white border-b border-gray-200 sticky top-[158px] md:top-[74px] z-10010">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="truncate">
              <h1 className="text-[16px] md:text-[20px] font-extrabold text-[#191974] leading-tight truncate">Apply: {destName} Visa</h1>
              <p className="text-[10px] md:text-[12px] text-gray-500 font-bold uppercase tracking-wider">{citizen} Citizen • {travelers.length} Traveler(s)</p>
            </div>
          </div>

          {/* STEPPER COMPACT */}
          <div className="flex items-center gap-1.5 md:gap-4 shrink-0">
            {[1, 2, 3, 4].map((s, idx) => {
              const stepMap: Record<number, VisStep> = { 1: 'details', 2: 'documents', 3: 'review', 4: 'payment' };
              const stepName = stepMap[s];
              const stepsOrder: VisStep[] = ['details', 'documents', 'review', 'payment'];
              const currentIndex = stepsOrder.indexOf(step);
              const isPast = currentIndex > idx;
              const isActive = currentIndex === idx;

              return (
                <React.Fragment key={s}>
                  <div className={`flex items-center gap-1.5 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                    <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-[10px] md:text-[11px] font-bold ${isPast ? 'bg-green-500 text-white' : isActive ? 'bg-[#ee2229] text-white' : 'bg-gray-100 text-gray-400'}`}>
                      {isPast ? <CheckCircle2 className="w-3.5 h-3.5" /> : s}
                    </div>
                  </div>
                  {idx < 3 && <div className={`w-2 md:w-4 h-1px ${currentIndex > idx ? 'bg-green-500' : 'bg-gray-200'}`} />}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

        {/* LEFT: FORM AREA */}
        <div className="md:col-span-2 space-y-8">
          <AnimatePresence mode="wait">
            {step === 'details' && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                <SectionHeader title="Traveler Information" subtitle="Enter details exactly as they appear on your passport." icon={<User className="w-5 h-5" />} />
                {travelers.map((t, index) => (
                  <div key={t.id} className="bg-white border border-gray-100 rounded-[24px] p-8 space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                      <h4 className="font-bold flex items-center gap-2">
                        <span className="w-7 h-7 bg-blue-50 text-[#191974] rounded-full flex items-center justify-center text-[12px]">{index + 1}</span>
                        Traveler {index + 1}
                      </h4>
                      {travelers.length > 1 && (
                        <button onClick={() => setTravelers(prev => prev.filter(x => x.id !== t.id))} className="text-red-500 text-[10px] font-bold uppercase tracking-widest hover:underline">Remove</button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputBox label="First Name*" placeholder="John" value={t.firstName} onChange={(v) => handleTravelerChange(t.id, 'firstName', v)} error={errors[`t-${t.id}-firstName`]} />
                      <InputBox label="Last Name*" placeholder="Doe" value={t.lastName} onChange={(v) => handleTravelerChange(t.id, 'lastName', v)} error={errors[`t-${t.id}-lastName`]} />
                      <InputBox label="Passport No.*" placeholder="A1234567" value={t.passportNo} onChange={(v) => handleTravelerChange(t.id, 'passportNo', v)} error={errors[`t-${t.id}-passportNo`]} />
                      <div className="flex flex-col gap-2">
                        <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wider ml-1">Date of Birth*</label>
                        <input
                          type="date"
                          value={t.dob}
                          onChange={(e) => handleTravelerChange(t.id, 'dob', e.target.value)}
                          className="w-full bg-white border border-gray-200 focus:border-2 focus:border-[#191974] px-5 py-4 rounded-xl outline-none transition-all font-semibold text-[14px]"
                        />
                      </div>
                      <InputBox label="Email ID*" type="email" placeholder="john@email.com" value={t.email} onChange={(v) => handleTravelerChange(t.id, 'email', v)} error={errors[`t-${t.id}-email`]} />

                      <div className="flex flex-col gap-2">
                        <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wider ml-1">Phone Number*</label>
                        <div className="flex gap-2">
                          <PhonePrefixSelector
                            value={t.countryCode}
                            onChange={(v: string) => handleTravelerChange(t.id, 'countryCode', v)}
                          />
                          <input
                            type="tel"
                            value={t.phone}
                            onChange={(e) => handleTravelerChange(t.id, 'phone', e.target.value)}
                            placeholder="90000 00000"
                            className={`flex-1 bg-white border ${errors[`t-${t.id}-phone`] ? 'border-red-500' : 'border-gray-200'} focus:border-2 focus:border-[#191974] px-5 py-4 rounded-xl outline-none transition-all font-semibold text-[14px] placeholder:text-gray-300`}
                          />
                        </div>
                        {errors[`t-${t.id}-phone`] && <p className="text-[11px] text-red-500 font-bold px-1 mt-0.5">{errors[`t-${t.id}-phone`]}</p>}
                      </div>
                    </div>
                  </div>
                ))}

                <button onClick={() => setTravelers([...travelers, { id: Date.now(), firstName: '', lastName: '', dob: '', gender: '', passportNo: '', passportExpiry: '', email: '', phone: '', countryCode: 'in', documents: {} }])} className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold flex items-center justify-center gap-2 hover:border-[#191974] hover:text-[#191974] transition-all">
                  <Plus className="w-4 h-4" /> Add Another Traveler
                </button>
              </motion.div>
            )}

            {step === 'documents' && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                <SectionHeader title="Upload Documents" subtitle="Clear scans are mandatory for approval. Max size 2MB." icon={<ShieldCheck className="w-5 h-5" />} />
                {travelers.map((t, index) => (
                  <div key={t.id} className="bg-white border border-gray-100 rounded-[24px] p-8 space-y-6">
                    <h4 className="font-bold flex items-center gap-2 text-sm">
                      <span className="w-6 h-6 bg-blue-50 text-[#191974] rounded-full flex items-center justify-center text-[10px]">{index + 1}</span>
                      {t.firstName || 'Traveler'} {t.lastName} • Documents
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(destination?.docs || ['Passport Front', 'Passport Back', 'Photo']).map(doc => (
                        <FileUploader
                          key={doc}
                          label={doc}
                          file={t.documents[doc]}
                          onFileSelect={(f) => handleDocUpload(t.id, doc, f)}
                          error={errors[`t-${t.id}-${doc}`]}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {step === 'review' && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                <SectionHeader title="Review Application" subtitle="Please check all details before proceeding to payment." icon={<FileText className="w-5 h-5" />} />
                {travelers.map((t, idx) => (
                  <div key={t.id} className="bg-white border border-gray-100 rounded-[24px] p-8 space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-[#191974]">Traveler {idx + 1}</h4>
                      <button onClick={() => setStep('details')} className="text-[#ee2229] font-bold text-[10px] uppercase tracking-widest hover:underline">Edit</button>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                      <ReviewItem label="FULL NAME" value={`${t.firstName} ${t.lastName}`} />
                      <ReviewItem label="PASSPORT NO" value={t.passportNo} />
                      <ReviewItem label="DATE OF BIRTH" value={t.dob} />
                      <ReviewItem label="DOCUMENTS" value={Object.keys(t.documents).filter(k => t.documents[k]).length + ' Uploaded'} />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                <SectionHeader title="Finalize & Pay" subtitle="Secure transaction powered by Stripe & Razorpay." icon={<CreditCard className="w-5 h-5" />} />
                <div className="bg-white border-2 border-[#191974] rounded-[24px] p-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#191974]">
                      <Fingerprint className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold">Instant E-Visa Processing</h4>
                      <p className="text-xs text-gray-400">Your application will be verified within 6 hours.</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total to pay</p>
                    <h3 className="text-2xl font-bold text-[#ee2229] tracking-tight">{formatRegionalPrice(totalAmount, region)}</h3>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-[24px] p-8 space-y-6">
                  <h4 className="font-bold">Select Payment Method</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PaymentOption icon={<Globe className="w-5 h-5" />} title="International Cards" desc="Visa, Mastercard, Amex" active />
                    <PaymentOption icon={<Building2 className="w-5 h-5" />} title="Regional Methods" desc="UPI, NetBanking, Mobile Wallets" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* NAV BUTTONS */}
          <div className="flex items-center justify-between pt-6">
            {step !== 'details' ? (
              <button onClick={prevStep} className="flex items-center gap-2 font-bold text-gray-400 hover:text-[#191974] transition-colors">
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
            ) : <div />}

            <button
              suppressHydrationWarning
              onClick={step === 'payment' ? handleFinalSubmit : nextStep}
              disabled={isSubmitting}
              className="bg-[#ee2229] text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-[#191974] transition-all   active:scale-95 group"
            >
              {isSubmitting ? 'Processing...' : step === 'payment' ? `Pay ${formatRegionalPrice(totalAmount, region)}` : 'Continue'}
              {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>
        </div>

        {/* RIGHT: SIDEBAR SUMMARY */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-[24px] border border-gray-100 p-6 md:p-8 sticky top-[234px] md:top-[174px]">
            <div className="p-6 bg-gray-50/50 border-b border-gray-100">
              <h4 className="font-bold text-sm">Visa Details</h4>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#191974]/10 flex items-center justify-center text-[#191974]">
                  <Plane className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Destination</p>
                  <p className="text-sm font-bold">{destName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#191974]/10 flex items-center justify-center text-[#191974]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Type</p>
                  <p className="text-sm font-bold">{destination?.type || 'E-Tourist Visa'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#191974]/10 flex items-center justify-center text-[#191974]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Validity</p>
                  <p className="text-sm font-bold">{destination?.valid || '30 Days'}</p>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 space-y-4 border-t border-gray-100 mt-2">
              <div className="flex justify-between items-center text-[13px] pt-6">
                <span className="text-gray-400 font-medium">Visa Fee (x{travelers.length})</span>
                <span className="font-bold text-[#191974]">{formatRegionalPrice(totalAmount, region)}</span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-gray-400 font-medium">Service Charge</span>
                <span className="font-bold text-green-500 uppercase tracking-widest text-[10px]">Free</span>
              </div>
              <div className="pt-6 flex justify-between items-center border-t border-dashed border-gray-100">
                <p className="font-bold text-[#191974] uppercase tracking-wider text-[11px]">TOTAL Amount</p>
                <p className="text-2xl font-bold text-[#ee2229] tracking-tight">{formatRegionalPrice(totalAmount, region)}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function SectionHeader({ title, subtitle, icon }: { title: string, subtitle: string, icon: any }) {
  const Icon = icon;
  return (
    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#191974]/5 flex items-center justify-center text-[#191974] shrink-0">
        {React.isValidElement(icon) ? (
          React.cloneElement(icon as React.ReactElement<any>, { className: "w-5 h-5 md:w-6 md:h-6" })
        ) : (
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        )}
      </div>
      <div>
        <h2 className="text-[18px] md:text-[20px] font-bold tracking-normal text-[#191974] leading-tight mb-0.5">{title}</h2>
        <p className="text-[11px] md:text-[12px] text-gray-500 font-bold uppercase tracking-widest">{subtitle}</p>
      </div>
    </div>
  );
}

function InputBox({ label, placeholder, value, onChange, type = "text", error }: {
  label: string, placeholder: string, value: string, onChange: (v: string) => void, type?: string, error?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wider ml-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-white border ${error ? 'border-red-500' : 'border-gray-200'} focus:border-2 focus:border-[#191974] px-5 py-4 rounded-xl outline-none transition-all font-semibold text-[14px] placeholder:text-gray-300`}
      />
      {error && <p className="text-[11px] text-red-500 font-bold px-1 mt-0.5">{error}</p>}
    </div>
  );
}

function FileUploader({ label, file, onFileSelect, error }: { label: string, file: File | null, onFileSelect: (f: File | null) => void, error?: string }) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onFileSelect(f);
  };

  return (
    <div className="space-y-2">
      <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wider px-1">{label}*</label>
      <div
        onClick={() => !file && inputRef.current?.click()}
        className={`relative group h-[120px] rounded-2xl border-2 border-dashed ${file ? 'border-green-500 bg-green-50/30' : error ? 'border-red-500 bg-red-50/10' : 'border-gray-100 bg-gray-50/50 hover:border-[#191974]'} transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden`}
      >
        <input ref={inputRef} type="file" className="hidden" accept="image/*,.pdf" onChange={handleFileChange} />

        {file ? (
          <div className="flex flex-col items-center gap-1 p-4 animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
            <p className="text-[10px] font-bold text-green-600 truncate max-w-[140px] tracking-normal leading-normal">{file.name}</p>
            <button onClick={(e) => { e.stopPropagation(); onFileSelect(null); }} className="absolute top-2 right-2 p-1 bg-white/50 rounded-full hover:bg-white transition-colors">
              <X className="w-3 h-3 text-gray-500" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <Camera className="w-8 h-8 text-gray-300 group-hover:text-[#191974] transition-colors" />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider leading-normal">Click to Upload</p>
          </div>
        )}
      </div>
      {error && <p className="text-[10px] text-red-500 font-bold px-1">{error}</p>}
    </div>
  );
}

function ReviewItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-bold text-[#191974] leading-normal">{value || '—'}</p>
    </div>
  );
}

function PaymentOption({ icon, title, desc, active = false }: { icon: React.ReactNode, title: string, desc: string, active?: boolean }) {
  return (
    <div className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${active ? 'border-[#191974] bg-blue-50/30' : 'border-gray-50 bg-white hover:border-gray-200'}`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${active ? 'bg-[#191974] text-white' : 'bg-gray-100 text-gray-400'}`}>
        {icon}
      </div>
      <h5 className="font-bold text-sm">{title}</h5>
      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{desc}</p>
    </div>
  );
}

function SuccessScreen({ tourName, travelersCount, total, region }: { tourName: string, travelersCount: number, total: number, region: string }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 text-[#191974]">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full text-center">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8   ">
          <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={3} />
        </div>
        <h2 className="text-3xl font-bold mb-4">Application Sent!</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">Your visa application for <span className="text-[#ee2229] font-bold">{tourName}</span> has been received. Our experts will review your documents and get back to you within 6 hours.</p>

        <div className="bg-gray-50 rounded-3xl p-8 mb-8 text-left space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400 font-bold uppercase tracking-widest">Order ID</span>
            <span className="font-bold tracking-tight">#VIS-{Math.floor(Math.random() * 89999) + 10000}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400 font-bold uppercase tracking-widest">Travelers</span>
            <span className="font-bold">{travelersCount} Person(s)</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400 font-bold uppercase tracking-widest">Amount Paid</span>
            <span className="font-bold text-[#ee2229] text-lg">{formatRegionalPrice(total, region)}</span>
          </div>
        </div>

        <Link href={`/${region}/visa`} className="inline-flex items-center gap-2 bg-[#191974] text-white px-8 py-4 rounded-xl font-bold   hover:bg-[#ee2229] transition-all">
          Go to Dashboard <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </div>
  );
}
