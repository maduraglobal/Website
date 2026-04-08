'use client';

import React, { use } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  CreditCard, 
  XCircle, 
  HeartPulse, 
  AlertTriangle, 
  Users, 
  Scale, 
  Copyright,
  Phone,
  Mail,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export default function TermsAndConditions({ params }: { params: Promise<{ region: string }> }) {
  const { region } = use(params);
  const effectiveDate = "April 8, 2026";

  const sections = [
    {
      id: "acceptance",
      icon: <CheckCircle2 className="w-6 h-6 text-[#ee2229]" />,
      title: "Acceptance of Terms",
      content: (
        <>
          <p className="mb-4">
            By accessing and using the services provided by <strong>Madura Travel Service (P) Ltd</strong>, you agree to be bound by these Terms and Conditions. Please read them carefully before making any bookings.
          </p>
          <p>
            If you do not agree with any part of these terms, you should not proceed with your booking or use our services. These terms apply to all visitors, users, and others who access our services.
          </p>
        </>
      )
    },
    {
      id: "booking-payment",
      icon: <CreditCard className="w-6 h-6 text-[#ee2229]" />,
      title: "Booking & Payments",
      content: (
        <>
          <p className="mb-4">To confirm your travel arrangements, a deposit or full payment may be required at the time of booking.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Deposit:</strong> A non-refundable deposit is required to secure your spot for specific tours and flight bookings.</li>
            <li><strong>Final Payment:</strong> The balance amount must be paid at least 30 days prior to the departure date, unless specified otherwise.</li>
            <li><strong>Price Changes:</strong> We reserve the right to adjust prices due to fluctuations in exchange rates, fuel surcharges, or taxes imposed by authorities.</li>
          </ul>
        </>
      )
    },
    {
      id: "cancellation",
      icon: <XCircle className="w-6 h-6 text-[#ee2229]" />,
      title: "Cancellation & Refunds",
      content: (
        <>
          <p className="mb-4">We understand that plans can change. However, cancellation charges apply to cover our pre-arranged obligations with vendors.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Client Cancellation:</strong> Cancellations must be notified in writing. Charges are calculated based on the date we receive your notice.</li>
            <li><strong>Refunds:</strong> Processed refunds may take 15-30 working days to reflect in your account, minus any bank charges or cancellation fees.</li>
            <li><strong>Company Cancellation:</strong> If we must cancel a tour due to unforeseen circumstances, we will offer a full refund or an alternative travel date.</li>
          </ul>
        </>
      )
    },
    {
      id: "insurance",
      icon: <HeartPulse className="w-6 h-6 text-[#ee2229]" />,
      title: "Travel Insurance",
      content: (
        <p>
          We strongly recommend that all travelers purchase comprehensive travel insurance. This should cover trip cancellation, medical expenses, personal accident, personal baggage, and personal liability. Madura Travel is not responsible for any costs incurred due to lack of adequate insurance coverage.
        </p>
      )
    },
    {
      id: "documentation",
      icon: <FileText className="w-6 h-6 text-[#ee2229]" />,
      title: "Passport, Visas & Health",
      content: (
        <>
          <p className="mb-4">It is the traveler's responsibility to ensure they have the correct documentation for their trip:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Passports:</strong> Must be valid for at least 6 months beyond your return date.</li>
            <li><strong>Visas:</strong> Travelers must obtain all necessary visas. While we provides assistance, we are not responsible for visa rejections.</li>
            <li><strong>Health:</strong> You must check health requirements and vaccinations for your destination.</li>
          </ul>
        </>
      )
    },
    {
      id: "liability",
      icon: <AlertTriangle className="w-6 h-6 text-[#ee2229]" />,
      title: "Limitation of Liability",
      content: (
        <p>
          Madura Travel Service (P) Ltd acts as an agent for airlines, hotels, and local tour operators. We are not liable for any injury, loss, damage, accident, or delay caused by the acts or defaults of these third-party providers or by "Acts of God," weather conditions, or political instability.
        </p>
      )
    },
    {
      id: "conduct",
      icon: <Users className="w-6 h-6 text-[#ee2229]" />,
      title: "Behavior & Conduct",
      content: (
        <p>
          We expect all our guests to behave respectfully toward other travelers and local communities. We reserve the right to terminate the tour of any individual whose behavior is disruptive, dangerous, or illegal, without any refund.
        </p>
      )
    },
    {
      id: "intellectual",
      icon: <Copyright className="w-6 h-6 text-[#ee2229]" />,
      title: "Intellectual Property",
      content: (
        <p>
          All content on our website, including text, logos, and images, is the property of Madura Travel Service (P) Ltd and is protected by copyright laws. You may not use or reproduce our content without prior written permission.
        </p>
      )
    },
    {
      id: "governing-law",
      icon: <Scale className="w-6 h-6 text-[#ee2229]" />,
      title: "Governing Law",
      content: (
        <p>
          These Terms and Conditions are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.
        </p>
      )
    },
    {
      id: "contact",
      icon: <Mail className="w-6 h-6 text-[#ee2229]" />,
      title: "Contact Information",
      content: (
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <p className="mb-4 font-bold text-[#191974]">For any queries regarding these terms, please contact us:</p>
          <div className="space-y-3 text-gray-600">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#ee2229] shrink-0 mt-1" />
              <span>Madura Travel Service (P) Ltd<br />Chennai, Tamil Nadu, India</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#ee2229] shrink-0" />
              <span>+91 44 2860 8111</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#ee2229] shrink-0" />
              <span>legal@maduratravel.com</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="bg-[#191974] py-16 md:py-24 text-white text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#ee2229] rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[42px] md:text-[56px] font-black uppercase tracking-tight mb-4 font-inter leading-none">
              Terms & Conditions
            </h1>
            <p className="text-[18px] md:text-[22px] font-light text-white/80 max-w-2xl mx-auto">
              Please read our travel guidelines and legal terms to ensure a smooth journey with us.
            </p>
            <div className="mt-8 inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-[14px] font-bold uppercase tracking-widest">
              Last Updated: {effectiveDate}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-32 space-y-1">
              <h3 className="text-[12px] font-black text-[#ee2229] uppercase tracking-widest mb-4 px-4">Sections</h3>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block px-4 py-3 rounded-xl text-[14px] font-bold text-gray-500 hover:bg-gray-50 hover:text-[#191974] transition-all"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 max-w-3xl">
            <div className="space-y-16">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-32">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center border border-red-100">
                      {section.icon}
                    </div>
                    <h2 className="text-[24px] md:text-[28px] font-black text-[#191974] uppercase tracking-tight leading-none">
                      {section.title}
                    </h2>
                  </div>
                  <div className="text-[16px] md:text-[17px] leading-relaxed text-gray-600 font-inter-tight font-light">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>

            {/* Footer Note */}
            <div className="mt-24 pt-12 border-t border-gray-100 text-center">
              <p className="text-gray-400 text-[14px]">
                © {new Date().getFullYear()} Madura Travel Service (P) Ltd. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
