"use client";

import React, { useState, useEffect } from 'react';
import { Star, ChevronRight, ShieldCheck, ExternalLink, Loader2 } from 'lucide-react';

interface Review {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

// ─── Real Madura Travel Google Reviews ──────────────────────────────────────
const REAL_REVIEWS: Review[] = [
  {
    author_name: "S Vijay",
    profile_photo_url: "https://ui-avatars.com/api/?name=S+Vijay&background=4285F4&color=fff&rounded=true&bold=true",
    rating: 5,
    relative_time_description: "2 months ago",
    text: "We had a wonderful experience with Madura Travel Service for our Sri Lanka trip. All the arrangements were well taken care of, and everything went smoothly. A special thanks to Mr. Sudharsan, who was very polite and ensuring we were comfortable throughout.",
  },
  {
    author_name: "Shiv Sash",
    profile_photo_url: "https://ui-avatars.com/api/?name=Shiv+Sash&background=EA4335&color=fff&rounded=true&bold=true",
    rating: 5,
    relative_time_description: "1 month ago",
    text: "We had an amazing trip organized by Madura Travels! It was well planned Bali trip. The local guides were very friendly, kind and patient. We had a car with a separate tour guide. They were responsive and connected through the journey.",
  },
  {
    author_name: "Vasu digital",
    profile_photo_url: "https://ui-avatars.com/api/?name=Vasu+Digital&background=34A853&color=fff&rounded=true&bold=true",
    rating: 5,
    relative_time_description: "3 weeks ago",
    text: "Madura Travels arranged Singapore packages for my vacation, excellently designed travel plan within the budget. Team support us in all ways and easily reachable wherever required. Good hospitality and more supportive. My next vacation also will be Madura Travels.",
  },
  {
    author_name: "Hariharan Balasubramanian",
    profile_photo_url: "https://ui-avatars.com/api/?name=Hariharan+B&background=FBBC05&color=fff&rounded=true&bold=true",
    rating: 5,
    relative_time_description: "4 months ago",
    text: "Systematic and cautious approach to each and every step of the VISA processing. My sincere thanks to the whole team mates for your courteous and warm welcome. Timely updates were provided and my family is delighted.",
  },
  {
    author_name: "Sushmitha Sudhakar",
    profile_photo_url: "https://ui-avatars.com/api/?name=Sushmitha+S&background=9C27B0&color=fff&rounded=true&bold=true",
    rating: 5,
    relative_time_description: "2 months ago",
    text: "I had travelled to Sri Lanka from Madura Travels. It was good experience there we had nice service especially Mathulani mam who guided and the driver they given was so professional and very good service. Thank you.",
  },
  {
    author_name: "Jagadeesh Jayaraman",
    profile_photo_url: "https://ui-avatars.com/api/?name=Jagadeesh+J&background=FF5722&color=fff&rounded=true&bold=true",
    rating: 5,
    relative_time_description: "2 months ago",
    text: "Recently we took their tour services! By understanding our requirements, Ms. Fathima gave a right tour plan! Good planning, co-ordination, gave us a wonderful experience! Thank you!",
  },
];

const GOOGLE_LOGO = (
  <svg viewBox="0 0 74 24" className="w-10 h-3.5" aria-label="Google">
    <path d="M9.24 8.19v2.46h5.88c-.18 1.38-.64 2.39-1.34 3.1-.86.86-2.2 1.8-4.54 1.8-3.62 0-6.45-2.92-6.45-6.54s2.83-6.54 6.45-6.54c1.95 0 3.38.77 4.43 1.76L15.4 2.5C13.94 1.08 11.98 0 9.24 0 4.28 0 .11 4.04.11 9s4.17 9 9.13 9c2.68 0 4.7-.88 6.28-2.52 1.62-1.62 2.13-3.91 2.13-5.75 0-.57-.04-1.1-.13-1.54H9.24z" fill="#4285F4" />
    <path d="M25 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52s1.52-3.52 3.28-3.52 3.28 1.45 3.28 3.52-1.52 3.52-3.28 3.52z" fill="#EA4335" />
    <path d="M53.58 7.49h-.09c-.57-.68-1.67-1.3-3.06-1.3C47.53 6.19 45 8.72 45 12c0 3.26 2.53 5.81 5.43 5.81 1.39 0 2.49-.62 3.06-1.32h.09v.81c0 2.22-1.19 3.41-3.1 3.41-1.56 0-2.53-1.12-2.93-2.07l-2.22.92c.64 1.54 2.33 3.43 5.15 3.43 2.99 0 5.52-1.76 5.52-6.05V6.49h-2.42v1zm-2.93 8.03c-1.76 0-3.1-1.5-3.1-3.52s1.34-3.52 3.1-3.52c1.74 0 3.1 1.52 3.1 3.54-.01 2.01-1.36 3.5-3.1 3.5z" fill="#4285F4" />
    <path d="M38 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52s1.52-3.52 3.28-3.52 3.28 1.45 3.28 3.52-1.52 3.52-3.28 3.52z" fill="#FBBC05" />
    <path d="M58 .24h2.51v17.57H58z" fill="#34A853" />
    <path d="M68.26 15.52c-1.3 0-2.22-.59-2.82-1.76l7.77-3.21-.26-.66c-.48-1.3-1.96-3.7-4.97-3.7-2.99 0-5.48 2.35-5.48 5.81 0 3.26 2.46 5.81 5.76 5.81 2.66 0 4.2-1.63 4.84-2.57l-1.98-1.32c-.66.96-1.56 1.6-2.86 1.6zm-.18-7.15c1.03 0 1.91.53 2.2 1.28l-5.25 2.17c0-2.44 1.73-3.45 3.05-3.45z" fill="#EA4335" />
  </svg>
);

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReviews(REAL_REVIEWS);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#4285F4]" />
        <p className="text-gray-400 font-medium text-[12px] uppercase tracking-widest">Loading Reviews...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* ── Average Rating Summary Bar ──────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-5">
          {/* Google logo */}
          <div className="flex flex-col items-center gap-1">
            {GOOGLE_LOGO}
            <span className="text-[10px] text-gray-400 font-medium">Reviews</span>
          </div>
          <div className="w-px h-10 bg-gray-100 hidden sm:block" />
          {/* Stars & rating */}
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[32px] font-black text-gray-900 leading-none">4.1</span>
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`w-5 h-5 ${i <= 4 ? 'fill-[#FBBC05] text-[#FBBC05]' : 'fill-gray-200 text-gray-200'}`} />
                ))}
              </div>
            </div>
            <p className="text-[12px] text-gray-500">Based on <strong className="text-gray-800">800+ reviews</strong> on Google</p>
          </div>
        </div>

        <a
          href="https://www.google.com/search?q=Madura+Travel+Service+(P)+Ltd+Reviews"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white border border-[#4285F4] text-[#4285F4] px-6 py-2.5 rounded-full text-[13px] font-bold hover:bg-[#4285F4] hover:text-white transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Write a Review
        </a>
      </div>

      {/* ── Review Cards Grid ────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((review, idx) => {
          const isExpanded = expandedIndex === idx;
          const TRUNCATE_LEN = 145;
          const isTruncatable = review.text.length > TRUNCATE_LEN;
          const displayText = isExpanded || !isTruncatable
            ? review.text
            : review.text.slice(0, TRUNCATE_LEN) + '...';

          return (
            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 flex flex-col gap-4"
            >
              {/* ── Card Header: Avatar + Name + Time + Google Logo ── */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={review.profile_photo_url}
                    alt={review.author_name}
                    className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <p className="font-bold text-[#191974] text-[14px] leading-tight">{review.author_name}</p>
                    <p className="text-gray-400 text-[12px] mt-0.5">{review.relative_time_description}</p>
                  </div>
                </div>
                {/* Google logo top-right */}
                <div className="flex-shrink-0 mt-0.5">
                  {GOOGLE_LOGO}
                </div>
              </div>

              {/* ── Star Rating ── */}
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i <= review.rating ? 'fill-[#FBBC05] text-[#FBBC05]' : 'fill-gray-200 text-gray-200'}`}
                  />
                ))}
              </div>

              {/* ── Review Text ── */}
              <p className="text-gray-700 text-[13.5px] leading-relaxed flex-1">
                {displayText}
                {isTruncatable && (
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                    className="ml-1 text-[#1a73e8] font-bold hover:underline text-[13px]"
                  >
                    {isExpanded ? 'Read less' : 'Read more'}
                  </button>
                )}
              </p>

              {/* ── Verified Footer ── */}
              <div className="flex items-center gap-1.5 pt-3 border-t border-gray-50">
                <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verified Review</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── CTA Button ──────────────────────────────────────────── */}
      <div className="text-center pt-4">
        <a
          href="https://www.google.com/search?q=Madura+Travel+Service+(P)+Ltd+Reviews"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#191974] text-white px-10 py-4 rounded-full font-bold text-[14px] hover:bg-[#ee2229] transition-all shadow-lg hover:-translate-y-1 group"
        >
          VIEW ALL GOOGLE REVIEWS
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}
