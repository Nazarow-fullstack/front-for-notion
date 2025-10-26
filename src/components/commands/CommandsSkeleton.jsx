'use client';

const SkeletonCard = () => (
  <div className="bg-neutral-950/50 border border-neutral-800 rounded-lg p-6 animate-pulse">
    <div className="h-6 w-3/4 bg-neutral-800 rounded mb-6"></div>
    <div className="h-4 w-1/3 bg-neutral-800 rounded mb-3"></div>
    <div className="flex space-x-2">
      <div className="h-8 w-8 bg-neutral-700 rounded-full"></div>
      <div className="h-8 w-8 bg-neutral-700 rounded-full"></div>
      <div className="h-8 w-8 bg-neutral-700 rounded-full"></div>
    </div>
  </div>
);

export default function CommandsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SkeletonCard /><SkeletonCard /><SkeletonCard />
      <SkeletonCard /><SkeletonCard /><SkeletonCard />
    </div>
  );
}