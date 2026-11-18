import { CardSkeleton } from "@/components/products/ProductsSkeleton";

export default function Loading() {
  return (
    <div className="py-6">
      <div className="h-20 animate-pulse rounded-2xl bg-slate-200/70" />
      <div className="mt-4 h-14 animate-pulse rounded-xl bg-slate-200/70" />
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}