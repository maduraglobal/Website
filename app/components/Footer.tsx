"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

// Custom brand icons as Lucide v1.x removed them
const Facebook = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

const Instagram = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const Linkedin = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

export default function Footer() {
  const pathname = usePathname();
  // Support for dynamic region routing
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const region = (pathname?.split("/")[1] || "en-in").toLowerCase();
  const currentRegion = mounted ? region : "en-in";

  const destinations = [
    { name: "Japan Tour Packages", slug: "japan" },
    { name: "France Tour Packages", slug: "france" },
    { name: "Germany Tour Packages", slug: "germany" },
    { name: "Portugal Tour Packages", slug: "portugal" },
    { name: "Hong Kong Tour Packages", slug: "hong-kong" },
    { name: "United States of America", slug: "usa" },
    { name: "Azerbaijan Tour Packages", slug: "azerbaijan" },
    { name: "Malaysia Tour Packages", slug: "malaysia" },
    { name: "Norway Tour Packages", slug: "norway" },
    { name: "Saudi Arabia Tour Packages", slug: "saudi-arabia" },
    { name: "Sri Lanka Tour Packages", slug: "sri-lanka" },
    { name: "Andaman Tour Packages", slug: "andaman" }
  ];

  const prefixed = (path: string) => `/${currentRegion}${path}`;

  return (
    <footer className="bg-[#191974] text-white pt-16 pb-8 font-inter">
      <div className="max-w-7xl mx-auto px-4">

        {/* === TOP SECTION: BRAND STORY === */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
          <div className="lg:w-2/3 space-y-8">
            <Link
              href={`/${currentRegion}`}
              className="inline-block"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Image
                src="/Footer-logo.png"
                alt="Madura Travel logo"
                width={180}
                height={60}
                className="brightness-0 invert"
              />
            </Link>
            <p className="text-[14px] text-white leading-relaxed max-w-3xl">
              Founded on January 17th, 1986, In Egmore, Chennai, Madura Travel Service (P) Ltd.
              has been a trusted name in the Indian travel industry for nearly four decades.
              What began as a visionary dream has evolved into a legacy of delivering authentic,
              personalized, and reliable travel experiences across the globe. Our commitment to
              integrity, service excellence, and customer satisfaction continues to drive every journey we plan.
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-6">
            <h4 className="text-[18px] font-bold">Follow to stay updated</h4>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "https://www.instagram.com/madura_travel_service/" },
                { icon: Facebook, href: "https://www.facebook.com/maduratravel/" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/madura-travel-service-p-ltd/" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ee2229] transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* === POPULAR DESTINATIONS === */}
        <div className="py-8 border-y border-white/10 mb-12">
          <h4 className="text-[18px] font-bold text-[#ee2229] mb-6 uppercase tracking-wider">Popular Destinations for 2026</h4>
          <div className="flex flex-wrap gap-x-4 gap-y-3 text-[13px] text-white">
            {destinations.map((dest, i) => (
              <React.Fragment key={i}>
                <Link
                  href={prefixed(`/destination/${dest.slug}`)}
                  className="hover:text-white transition-colors"
                >
                  {dest.name}
                </Link>
                {i < destinations.length - 1 && <span className="opacity-20 text-[10px] mt-1">|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* === MAIN LINKS GRID === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Company */}
          <div className="space-y-6">
            <h4 className="text-[18px] font-bold text-white relative inline-block">
              Company
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#ee2229] rounded-full"></span>
            </h4>
            <ul className="space-y-4 pt-2">
              {[
                { label: "Our Story", path: "/our-story" },
                { label: "Careers", path: "/careers" },
                { label: "Become a Sub Agent", path: "/contact" },
                { label: "Testimonial", path: "/testimonials" },
                { label: "Media", path: "/media" }
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={prefixed(link.path)}
                    className="text-[14px] text-white hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-[18px] font-bold text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#ee2229] rounded-full"></span>
            </h4>
            <ul className="space-y-4 pt-2">
              {[
                { label: "Tour Packages", path: "/tours" },
                { label: "Tourism Blog & Tips", path: "/media" },
                { label: "FAQ", path: "/faq" },
                { label: "Visa", path: "/visa" },
                { label: "MICE", path: "/mice" }
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={prefixed(link.path)}
                    className="text-[14px] text-white hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h4 className="text-[18px] font-bold text-white relative inline-block">
              Legal
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#ee2229] rounded-full"></span>
            </h4>
            <ul className="space-y-4 pt-2">
              {[
                { label: "Terms And Conditions", path: "/terms-and-conditions" },
                { label: "Privacy Policy", path: "/privacy-policy" },
                { label: "Disclaimer", path: "/terms-and-conditions" },
                { label: "Complaints Policy", path: "/contact" },
                { label: "Contact Us", path: "/contact" }
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={prefixed(link.path)}
                    className="text-[14px] text-white hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-[18px] font-bold text-white relative inline-block">
              Contact
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#ee2229] rounded-full"></span>
            </h4>
            <div className="space-y-5 pt-2">
              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-[#ee2229] shrink-0" />
                <p className="text-[14px] text-white leading-relaxed">
                  25-3, Gandhi Irwin Rd, Egmore, Chennai, Tamil Nadu 600008
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <Phone className="w-5 h-5 text-[#ee2229] shrink-0" />
                <div className="space-y-1">
                  <p className="text-[15px] font-bold">+91 9092949494</p>

                </div>
              </div>
              <div className="flex gap-4 items-center">
                <Mail className="w-5 h-5 text-[#ee2229] shrink-0" />
                <p className="text-[15px] font-bold">mail@maduratravel.com</p>
              </div>
            </div>
          </div>

        </div>

        {/* === BOTTOM BAR === */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="text-[12px] text-white text-center">
            © 2026 Madura Travel Service (P) Ltd. All Rights Reserved.
          </div>

        </div>

      </div>

    </footer>
  );
}