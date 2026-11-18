export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl py-6">
      <div className="mb-4 h-4 w-48 animate-pulse rounded bg-slate-200" />
      <div className="h-28 animate-pulse rounded-2xl bg-slate-200/70" />
      <div className="mt-5 space-y-3 rounded-2xl bg-card p-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl bg-slate-200/70" />
          ))}
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-9 animate-pulse rounded bg-slate-100" />
        ))}
      </div>
    </div>
  );
}