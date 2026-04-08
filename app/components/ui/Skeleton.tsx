"use client";

import { cn } from "@/utils/cn";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200/60", className)}
      {...props}
    />
  );
}

export function TourCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden bg-white shadow-sm">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-28 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="w-full bg-[#191974] py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-4">
        <Skeleton className="h-4 w-32 bg-white/10" />
        <Skeleton className="h-12 w-3/4 bg-white/10" />
        <Skeleton className="h-6 w-1/2 bg-white/10" />
      </div>
    </div>
  );
}

export function TourDetailSkeleton() {
  return (
    <div className="animate-in fade-in duration-500">
      <Skeleton className="h-[50vh] w-full" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-2/3 space-y-8">
            <div className="flex gap-4">
               <Skeleton className="h-10 w-10 rounded-full" />
               <Skeleton className="h-10 w-64" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Skeleton className="h-20 rounded-xl" />
              <Skeleton className="h-20 rounded-xl" />
              <Skeleton className="h-20 rounded-xl" />
              <Skeleton className="h-20 rounded-xl" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-40 rounded-2xl" />
              <Skeleton className="h-40 rounded-2xl" />
            </div>
          </div>
          <div className="lg:w-1/3">
            <Skeleton className="h-[500px] rounded-2xl sticky top-28" />
          </div>
        </div>
      </div>
    </div>
  );
}
