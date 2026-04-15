"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import TourCard from "../../components/tours/TourCard";
import { Skeleton } from "../../components/ui/Skeleton";
import { HeartCrack } from "lucide-react";
import Link from "next/link";

export default function WishlistPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = React.use(params);
  const [loading, setLoading] = useState(true);
  const [wishlistTours, setWishlistTours] = useState<any[]>([]);

  useEffect(() => {
    async function loadWishlist() {
      try {
        const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
        if (stored.length === 0) {
          setWishlistTours([]);
          setLoading(false);
          return;
        }

        const supabase = createClient();
        const { data, error } = await supabase
          .from("tours")
          .select("*")
          .in("id", stored);

        if (error) {
          console.error("Error loading wishlist:", error);
        } else {
          setWishlistTours(data || []);
        }
      } catch (err) {
        console.error("Failed to parse wishlist", err);
      } finally {
        setLoading(false);
      }
    }

    // Since localStorage can be updated in other tabs, or when we just mounted
    loadWishlist();

    const handleStorageChange = () => {
      loadWishlist();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-6 pb-20">
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#191974] mb-2 tracking-tight">My Wishlist</h1>
        <p className="text-gray-500 mb-8 border-b border-gray-200 pb-4">
          Saved tours you want to keep an eye on for your future trips.
        </p>

        {loading ? (
          <div className="grid grid-cols-1 gap-6">
            <Skeleton className="w-full h-[250px] rounded-2xl bg-gray-200" />
            <Skeleton className="w-full h-[250px] rounded-2xl bg-gray-200" />
            <Skeleton className="w-full h-[250px] rounded-2xl bg-gray-200" />
          </div>
        ) : wishlistTours.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {wishlistTours.map((tour, idx) => (
              <TourCard key={idx} tour={tour} destinationSlug={tour.destination_id} region={region} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 mt-6 shadow-sm">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <HeartCrack className="w-10 h-10 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8 text-center max-w-md">
              You haven't saved any tours yet. Explore our destinations and tap the heart icon to save your favorites here.
            </p>
            <Link
              href={`/${region}/tours`}
              className="bg-[#ee2229] text-white px-8 py-3.5 rounded-full font-bold shadow-xl shadow-red-500/20 hover:scale-105 transition-transform"
            >
              Explore Tours
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
