import React from 'react';
import Link from 'next/link';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh & Priya Sharma",
    tour: "Swiss Paris Austria & Germany",
    rating: 5,
    review: "An absolutely flawless experience from start to finish. The tour manager was incredibly organized, the hotels were top-notch, and every day was planned to perfection. Our family of 6 had the trip of a lifetime. We've already booked our next tour with Madura!",
    avatar: "RS",
    location: "Mumbai"
  },
  {
    id: 2,
    name: "Amit & Neha Kulkarni",
    tour: "Japan, Korea & Taiwan Explorer",
    rating: 5,
    review: "The cherry blossom season in Japan was magical! Madura Travel arranged everything — from visa processing to the bullet train tickets. The local guide in Tokyo was exceptionally knowledgeable. Cannot recommend this tour enough.",
    avatar: "AK",
    location: "Pune"
  },
  {
    id: 3,
    name: "Dr. Sunita Venkatesh",
    tour: "Best of Kashmir Valley",
    rating: 5,
    review: "As a solo female traveler, safety was my top priority. Madura Travel ensured I felt safe and cared for throughout the trip. The houseboat experience in Srinagar was breathtaking, and the Gulmarg gondola ride was unforgettable.",
    avatar: "SV",
    location: "Bangalore"
  },
  {
    id: 4,
    name: "The Desai Family",
    tour: "Australia & New Zealand Grandeur",
    rating: 5,
    review: "18 days of pure bliss! From the Sydney Opera House to the Milford Sound cruise in New Zealand — every moment was picture-perfect. The all-inclusive pricing meant zero stress about budgeting. Worth every rupee.",
    avatar: "DF",
    location: "Ahmedabad"
  },
  {
    id: 5,
    name: "Vikram Malhotra",
    tour: "Assam & Meghalaya Experience",
    rating: 4,
    review: "The living root bridges of Cherrapunji were surreal! Our tour manager was a local who knew every hidden gem. The food was incredible, and the homestay experience in Shillong was something I'll never forget. A truly offbeat adventure.",
    avatar: "VM",
    location: "Delhi"
  },
  {
    id: 6,
    name: "Anita & Rajan Nair",
    tour: "Swiss Paris Austria & Germany",
    rating: 5,
    review: "We've traveled with 3 different travel companies before, and Madura Travel is in a completely different league. The attention to detail, the quality of hotels, and the professionalism of the tour managers sets them apart. Absolutely premium.",
    avatar: "AN",
    location: "Kochi"
  },
  {
    id: 7,
    name: "Pooja Bhatia",
    tour: "Japan, Korea & Taiwan Explorer",
    rating: 5,
    review: "My parents (65+) were initially hesitant about an international trip, but Madura Travel made it so comfortable for them. Wheelchair assistance at every airport, senior-friendly hotels, and a pace that suited everyone. Thank you, team!",
    avatar: "PB",
    location: "Jaipur"
  },
  {
    id: 8,
    name: "Karthik Iyer",
    tour: "Australia & New Zealand Grandeur",
    rating: 5,
    review: "The Great Barrier Reef snorkeling was a dream come true. Madura organized a private charter for our group, and the underwater experience was unparalleled. The tour exceeded every expectation I had.",
    avatar: "KI",
    location: "Chennai"
  }
];

export default async function TestimonialsPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className={`w-4 h-4 ${i < count ? 'text-[#f4a021]' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="bg-[var(--background)] min-h-screen">

      {/* Hero */}
      <div className="w-full bg-[#191974] py-24 text-center text-white relative overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-[#f4a021] opacity-15 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-80px] right-[-80px] w-96 h-96 bg-[#ee2229] opacity-10 rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">
          <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-widest mb-6">Real Reviews</span>
          <h1 className="text-[40px] md:text-[56px] font-bold font-inter mb-4 leading-tight">What Our Travelers Say</h1>
          <p className="font-inter-tight opacity-90 max-w-2xl text-[16px] md:text-[18px]">
            Don&apos;t just take our word for it — hear from the 500,000+ travelers who&apos;ve explored the world with Madura Travel.
          </p>
        </div>
      </div>

      {/* Stats Strip */}
      <section className="max-w-5xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 grid grid-cols-3 divide-x divide-gray-100">
          {[
            { value: "4.9/5", label: "Average Rating" },
            { value: "15,000+", label: "Verified Reviews" },
            { value: "98%", label: "Would Recommend" }
          ].map((stat, idx) => (
            <div key={idx} className="p-6 text-center">
              <h3 className="text-[24px] md:text-[28px] font-bold text-[#191974] font-inter">{stat.value}</h3>
              <span className="text-[13px] text-gray-500 font-inter-tight font-semibold">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all flex flex-col">
              {/* Header */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#191974] to-[#00a1e5] flex items-center justify-center text-white font-bold text-[16px] shrink-0 shadow-md">
                  {t.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-[16px] font-bold text-[#171717] font-inter">{t.name}</h3>
                  <p className="text-[13px] text-gray-500 font-inter-tight">{t.location}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {renderStars(t.rating)}
                  </div>
                </div>
              </div>

              {/* Tour Badge */}
              <div className="mb-4">
                <span className="bg-[#191974]/5 text-[#191974] text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {t.tour}
                </span>
              </div>

              {/* Quote */}
              <p className="text-[14px] text-gray-600 font-inter-tight leading-relaxed flex-1 italic">
                &ldquo;{t.review}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-[28px] font-bold font-inter text-[#171717] mb-4">Ready to Create Your Own Story?</h2>
          <p className="text-[15px] text-gray-600 font-inter-tight mb-8 max-w-2xl mx-auto">Book your dream vacation today and join thousands of happy Madura travelers.</p>
          <Link href={`/${region}/tours`} className="inline-block bg-[#ee2229] hover:bg-[#d61e24] text-white px-10 py-4 rounded-full text-[15px] font-bold tracking-wide transition-all shadow-lg hover:-translate-y-0.5">
            Explore Tours
          </Link>
        </div>
      </section>
    </div>
  );
}
