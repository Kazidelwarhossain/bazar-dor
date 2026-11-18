export function CardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-card p-4 ring-1 ring-black/[0.03]">
      <div className="flex items-center gap-2.5">
        <div className="h-10 w-10 animate-pulse rounded-lg bg-slate-200" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-3.5 w-2/3 animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-1/3 animate-pulse rounded bg-slate-100" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="h-8 w-24 animate-pulse rounded bg-slate-200" />
        <div className="h-5 w-12 animate-pulse rounded-full bg-slate-100" />
      </div>
    </div>
  );
}

export default function ProductsSkeleton() {
  return (
    <div>
      {[6, 6, 9].map((count, s) => (
        <div key={s} className="py-6">
          <div className="mb-4 h-6 w-48 animate-pulse rounded bg-slate-200" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}