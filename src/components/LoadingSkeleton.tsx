interface LoadingSkeletonProps {
  count?: number;
  variant?: 'grid' | 'modal';
}

export function LoadingSkeleton({ count = 10, variant = 'grid' }: LoadingSkeletonProps) {
  if (variant === 'modal') {
    return (
      <div className="animate-pulse">
        <div className="bg-gradient-to-b from-slate-100 to-white px-6 pb-6 pt-8 text-center">
          <div className="mx-auto h-4 w-12 rounded bg-slate-200" />
          <div className="mx-auto mt-2 h-36 w-36 rounded-full bg-slate-200" />
          <div className="mx-auto mt-3 h-9 w-36 rounded-lg bg-slate-200" />
          <div className="mx-auto mt-3 flex justify-center gap-2">
            <div className="h-7 w-16 rounded-full bg-slate-200" />
            <div className="h-7 w-16 rounded-full bg-slate-200" />
          </div>
          <div className="mx-auto mt-4 h-9 w-40 rounded-full bg-slate-200" />
        </div>

        <div className="px-6 pb-6">
          <div className="mt-2">
            <div className="mb-2 h-3 w-16 rounded bg-slate-200" />
            <div className="flex flex-wrap gap-2">
              <div className="h-8 w-24 rounded-full bg-slate-200" />
              <div className="h-8 w-28 rounded-full bg-slate-200" />
              <div className="h-8 w-20 rounded-full bg-slate-200" />
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 h-3 w-24 rounded bg-slate-200" />
            <div className="flex flex-wrap items-center justify-center gap-1">
              <div className="h-19 w-22 rounded-xl bg-slate-200" />
              <div className="h-19 w-22 rounded-xl bg-slate-200" />
              <div className="h-19 w-22 rounded-xl bg-slate-200" />
            </div>
          </div>
        </div>
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
