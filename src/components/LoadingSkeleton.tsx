interface LoadingSkeletonProps {
  count?: number;
  variant?: 'grid' | 'modal';
}

export function LoadingSkeleton({ count = 10, variant = 'grid' }: LoadingSkeletonProps) {
  if (variant === 'modal') {
    return (
      <div className="animate-pulse">
        <div className="mx-auto h-36 w-36 rounded-full bg-slate-200" />
        <div className="mx-auto mt-4 h-8 w-32 rounded-lg bg-slate-200" />
        <div className="mx-auto mt-3 h-6 w-24 rounded-full bg-slate-200" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <div className="h-3 w-10 rounded bg-slate-200" />
          <div className="mx-auto mt-4 h-24 w-24 rounded-full bg-slate-200" />
          <div className="mx-auto mt-3 h-4 w-20 rounded-lg bg-slate-200" />
          <div className="mx-auto mt-2 flex justify-center gap-1">
            <div className="h-5 w-12 rounded-full bg-slate-200" />
            <div className="h-5 w-12 rounded-full bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
