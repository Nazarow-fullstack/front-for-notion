'use client';

const SkeletonCard = () => (
  <div className="bg-neutral-950/50 border border-neutral-800 rounded-lg p-4 animate-pulse">
    <div className="h-5 w-3/4 bg-neutral-800 rounded mb-3"></div>
    <div className="h-4 w-full bg-neutral-800 rounded"></div>
    <div className="h-4 w-5/6 bg-neutral-800 rounded mt-1"></div>
    <div className="h-3 w-1/2 bg-neutral-800 rounded mt-5"></div>
    <div className="h-3 w-1/3 bg-neutral-800 rounded mt-2"></div>
  </div>
);

export default function TasksSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-4">
          <div className="h-6 w-1/2 bg-neutral-800 rounded animate-pulse"></div>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
}