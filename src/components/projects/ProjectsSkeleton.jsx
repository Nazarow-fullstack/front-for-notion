'use client';

const SkeletonCard = () => (
  <div className="bg-neutral-950/50 border border-neutral-800 rounded-lg p-6 animate-pulse">
    <div className="h-6 w-3/4 bg-neutral-800 rounded"></div>
    <div className="h-4 w-1/2 bg-neutral-800 rounded mt-2"></div>
    <div className="h-3 w-1/4 bg-neutral-800 rounded mt-8"></div>
  </div>
);

export default function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}