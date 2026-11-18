export default function AuthSkeleton() {
  return (
    <div className="mx-auto w-full max-w-md py-10 sm:py-14">
      <div className="mx-auto h-7 w-48 animate-pulse rounded bg-slate-200" />
      <div className="mx-auto mt-3 h-4 w-64 animate-pulse rounded bg-slate-200" />
      <div className="mt-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-10 w-full animate-pulse rounded bg-slate-100" />
        ))}
        <div className="h-10 w-full animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  );
}