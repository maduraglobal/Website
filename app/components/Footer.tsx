"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// ─── Data ───────────────────────────────────────────────────────────────────

const destinations = {
  India: ["Andaman", "Kashmir", "Kerala", "Rajasthan"],
  Europe: ["France", "Italy", "Switzerland", "Spain"],
  "South East Asia": ["Thailand", "Bali", "Singapore", "Vietnam"],
  "Middle East": ["Dubai", "Jordan", "Turkey", "Qatar"],
};

const discoverLinks = [
  { label: "Our Story", href: "/our-story" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Careers", href: "/careers" },
  { label: "Media", href: "/media" },
  { label: "Contact Us", href: "/contact" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const bottomLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Footer() {
  const pathname = usePathname();
  const region = (pathname?.split("/")[1] || "en-in").toLowerCase();

  const prefixed = (href: string) => `/${region}${href}`;

  return (
    <footer className="bg-[#191974] text-white">
      {/* Top accent line */}
      <div className="h-1 w-full bg-linear-to-r from-[#ee2229] via-white/20 to-[#ee2229]" />

      {/* ── MAIN BODY ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* ── COL 1: Company Info ── */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <Link href={`/${region}`} className="inline-block">
              <Image
                src="/Footer-logo.png"
                alt="Madura Travel Service Pvt Ltd"
                width={160}
                height={52}
                priority
              />
            </Link>

            <p className="text-[13px] text-white leading-relaxed">
              Founded in 1986, Madura Travel Service Pvt Ltd is a trusted name
              in the travel industry, delivering personalized and reliable travel
              experiences worldwide.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 mt-1">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-white hover:bg-[#ee2229] hover:text-white hover:border-[#ee2229] transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-3 pt-1">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/IATA_logo.svg/1024px-IATA_logo.svg.png"
                className="h-5 opacity-30 hover:opacity-60 transition-opacity"
                alt="IATA Member"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/ISO_logo_%282006%29.svg/1200px-ISO_logo_%282006%29.svg.png"
                className="h-6 opacity-30 hover:opacity-60 transition-opacity"
                alt="ISO Certified"
              />
              <span className="text-[10px]  border border-white/20 hover:border-white/50 px-2 py-1 rounded tracking-widest text-white/30 hover:text-white/60 transition-all ">
                TAFI
              </span>
            </div>
          </div>

          {/* ── COL 2: Top Destinations ── */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[11px]   tracking-[0.2em] text-[#ee2229]">
              Top Destinations
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {Object.entries(destinations).map(([continent, places]) => (
                <div key={continent} className="flex flex-col gap-1.5">
                  <p className="text-[10px]  tracking-widest text-white/70 font-bold mb-0.5">
                    {continent}
                  </p>
                  {places.map((place) => (
                    <Link
                      key={place}
                      href={prefixed(
                        `/destination/${place.toLowerCase().replace(/ /g, "-")}`
                      )}
                      className="text-[12.5px] text-white hover:text-[#ee2229] transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-1.5 h-1.5 rounded-full bg-[#ee2229] shrink-0 transition-all duration-200" />
                      {place}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ── COL 3: Discover Us ── */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[11px]   tracking-[0.2em] text-[#ee2229]">
              Discover Us
            </h4>
            <ul className="flex flex-col gap-3">
              {discoverLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={prefixed(link.href)}
                    className="text-[13px] text-white hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-[#ee2229] transition-all duration-300 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COL 4: Contact Info ── */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[11px]   tracking-[0.2em] text-[#ee2229]">
              Get In Touch
            </h4>

            <div className="flex flex-col gap-4">
              <a
                href="tel:+919092949494"
                className="flex items-start gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#ee2229] group-hover:text-white group-hover:border-[#ee2229] transition-all shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px]  tracking-widest text-white font-bold">Call Us</p>
                  <p className="text-[13px] font-semibold text-white group-hover:text-white transition-colors">+91 90 92 94 94 94</p>
                  <p className="text-[11px] text-white">Mon–Sat, 9:30AM–6PM</p>
                </div>
              </a>

              <a
                href="mailto:mail@maduratravel.com"
                className="flex items-start gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/8 border border-white flex items-center justify-center text-white group-hover:bg-[#ee2229] group-hover:text-white group-hover:border-[#ee2229] transition-all shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px]  tracking-widest text-white font-bold">Email Us</p>
                  <p className="text-[13px] font-semibold text-white group-hover:text-white transition-colors">mail@maduratravel.com</p>
                  <p className="text-[11px] text-white">We reply within 24 hours</p>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/8 border border-white flex items-center justify-center text-white shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px]  tracking-widest text-white font-bold">Headquarters</p>
                  <p className="text-[13px] font-semibold text-white">Egmore, Chennai</p>
                  <p className="text-[11px] text-white">Tamil Nadu – 600 008</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CAUTION BAR ── */}
      {/* <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4">
          <p className="text-[11px] text-white/30 leading-relaxed italic text-center">
            <span className="text-[#ee2229] font-bold not-italic">⚠ Caution:</span>{" "}
            Beware of fake promotions. All authorized Madura Travel communications come from{" "}
            <span className="text-white/45">mail@maduratravel.com</span>. Do not engage with
            emails, SMS, or links from unverified sources.
          </p>
        </div>
      </div> */}

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-white/35">
          <p>© 2026 Madura Travel Service Pvt Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-5">
            {bottomLinks.map((link) => (
              <Link
                key={link.label}
                href={prefixed(link.href)}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-white/25">
            <svg className="w-3.5 h-3.5 text-[#ee2229]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className=" tracking-widest text-[9px] font-bold">Secure Payments</span>
          </div>
        </div>
      </div>

      {/* ── FLOATING QUICK ENQUIRY ── */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <button
          onClick={() => window.dispatchEvent(new Event("openPopup"))}
          suppressHydrationWarning
          className="bg-[#ee2229] hover:bg-[#d11e24] active:scale-95 text-white px-5 py-3 md:px-6 md:py-3.5 rounded-full  text-[13px] md:text-[14px] shadow-2xl shadow-[#ee2229]/30 flex items-center gap-2 transition-all hover:-translate-y-0.5 group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Quick Enquiry
        </button>
      </div>
    </footer>
  );
}