'use client';

import React, { use } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  UserCheck,
  Database,
  Share2,
  Eye,
  Clock,
  ExternalLink,
  RefreshCcw,
  Mail,
  MapPin,
  Phone,
  FileText
} from 'lucide-react';

export default function PrivacyPolicy({ params }: { params: Promise<{ region: string }> }) {
  const { region } = use(params);
  const effectiveDate = "April 8, 2026";

  const sections = [
    {
      id: "introduction",
      icon: <ShieldCheck className="w-6 h-6 text-[#ee2229]" />,
      title: "Introduction",
      content: (
        <>
          <p className="mb-4">
            Welcome to <strong>Madura Travel Service (P) Ltd</strong>. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
          </p>
          <p>
            When you visit our website and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy notice, we describe our privacy policy. We seek to explain to you in the clearest way possible what information we collect, how we use it and what rights you have in relation to it.
          </p>
        </>
      )
    },
    {
      id: "info-collect",
      icon: <Database className="w-6 h-6 text-[#ee2229]" />,
      title: "Information We Collect",
      content: (
        <>
          <p className="mb-4">We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services, when participating in activities on the services or otherwise contacting us.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Details:</strong> Name, address, email, telephone number, and date of birth.</li>
            <li><strong>Travel Documents:</strong> Passport details, visa information, and frequent flyer numbers.</li>
            <li><strong>Booking Info:</strong> Flight details, hotel preferences, dietary requirements, and medical conditions (if relevant to your travel).</li>
            <li><strong>Payment Details:</strong> We collect data necessary to process your payment if you make purchases, such as your payment instrument number and the security code associated with your payment instrument.</li>
          </ul>
        </>
      )
    },
    {
      id: "how-use",
      icon: <Eye className="w-6 h-6 text-[#ee2229]" />,
      title: "How We Use Your Information",
      content: (
        <>
          <p className="mb-4">We use personal information collected via our services for a variety of business purposes described below:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Booking & Fulfillment:</strong> To facilitate account creation and logon process, and to manage your bookings and inquiries.</li>
            <li><strong>Customer Support:</strong> To respond to user inquiries and offer support to users.</li>
            <li><strong>Communication:</strong> To send administrative information to you, such as product, service and new feature information and/or information about changes to our terms, conditions, and policies.</li>
            <li><strong>Marketing:</strong> To send you marketing and promotional communications (with your consent).</li>
            <li><strong>Safety:</strong> To keep our services safe and secure (for example, for fraud monitoring and prevention).</li>
          </ul>
        </>
      )
    },
    {
      id: "sharing",
      icon: <Share2 className="w-6 h-6 text-[#ee2229]" />,
      title: "Sharing of Information",
      content: (
        <>
          <p className="mb-4">We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Vendors & Partners:</strong> We may share your data with third-party vendors, service providers, contractors or agents who perform services for us or on our behalf and require access to such information to do that work (e.g., Airlines, Hotels, Insurance companies).</li>
            <li><strong>Legal Requirements:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
          </ul>
        </>
      )
    },
    {
      id: "security",
      icon: <Lock className="w-6 h-6 text-[#ee2229]" />,
      title: "Data Security",
      content: (
        <p>
          We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our services is at your own risk. You should only access the services within a secure environment.
        </p>
      )
    },
    {
      id: "cookies",
      icon: <RefreshCcw className="w-6 h-6 text-[#ee2229]" />,
      title: "Cookies and Tracking Technologies",
      content: (
        <p>
          We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
        </p>
      )
    },
    {
      id: "rights",
      icon: <UserCheck className="w-6 h-6 text-[#ee2229]" />,
      title: "User Rights",
      content: (
        <>
          <p className="mb-4">Depending on where you reside, you may have certain rights regarding your personal information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Access:</strong> The right to request copies of your personal information.</li>
            <li><strong>Update:</strong> The right to request that we correct any information you believe is inaccurate.</li>
            <li><strong>Delete:</strong> The right to request that we erase your personal information, under certain conditions.</li>
            <li><strong>Object:</strong> The right to object to our processing of your personal information.</li>
          </ul>
        </>
      )
    },
    {
      id: "retention",
      icon: <Clock className="w-6 h-6 text-[#ee2229]" />,
      title: "Retention of Data",
      content: (
        <p>
          We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).
        </p>
      )
    },
    {
      id: "links",
      icon: <ExternalLink className="w-6 h-6 text-[#ee2229]" />,
      title: "Third-Party Links",
      content: (
        <p>
          Our services may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
        </p>
      )
    },
    {
      id: "updates",
      icon: <FileText className="w-6 h-6 text-[#ee2229]" />,
      title: "Updates to This Policy",
      content: (
        <p>
          We may update this privacy policy from time to time. The updated version will be indicated by an updated "Effective Date" and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.
        </p>
      )
    },
    {
      id: "contact",
      icon: <Mail className="w-6 h-6 text-[#ee2229]" />,
      title: "Contact Information",
      content: (
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <p className="mb-4 font-bold text-[#191974]">If you have questions or comments about this policy, you may contact us at:</p>
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
              <span>privacy@maduratravel.com</span>
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
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#ee2229] rounded-full blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[42px] md:text-[56px] font-black  tracking-tight mb-4 font-inter leading-none">
              Privacy Policy
            </h1>
            <p className="text-[18px] md:text-[22px] font-light text-white/80 max-w-2xl mx-auto">
              Your privacy is our priority. Learn how Madura Travel Service (P) Ltd protects and manages your information.
            </p>
            <div className="mt-8 inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-[14px] font-bold  tracking-widest">
              Effective Date: {effectiveDate}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Sidebar Navigation (Desktop) */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-32 space-y-1">
              <h3 className="text-[12px] font-black text-[#ee2229]  tracking-widest mb-4 px-4">Navigation</h3>
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
                    <h2 className="text-[24px] md:text-[28px] font-black text-[#191974]  tracking-tight leading-none">
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
