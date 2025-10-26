'use client';

export default function ShimmerButton({ type = 'submit', disabled, children, onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="relative w-full h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 disabled:cursor-not-allowed"
    >
      <span className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-neutral-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl gap-2 ${disabled ? 'opacity-50' : 'hover:bg-neutral-900 transition-colors'}`}>
        {children}
      </span>
    </button>
  );
}