import { PageHeaderSkeleton, TourCardSkeleton } from "../components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeaderSkeleton />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <TourCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
