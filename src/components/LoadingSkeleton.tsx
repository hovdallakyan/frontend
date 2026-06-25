export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border border-slate-200 bg-white p-4"
        >
          <div className="mx-auto h-24 w-24 rounded-full bg-slate-200" />
          <div className="mx-auto mt-3 h-4 w-20 rounded bg-slate-200" />
          <div className="mx-auto mt-2 h-3 w-16 rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
}
