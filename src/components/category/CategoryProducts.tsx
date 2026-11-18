"use client";

import { useMemo, useState } from "react";
import { IProduct } from "@/types/type";
import { bn } from "@/lib/format";
import ProductGrid from "@/components/products/ProductGrid";

type Sort = "default" | "asc" | "desc";

export default function CategoryProducts({ products }: { products: IProduct[] }) {
  const [sort, setSort] = useState<Sort>("default");

  const sorted = useMemo(() => {
    // [...products] কপি নেওয়া জরুরি: sort() মূল array বদলে ফেলে
    if (sort === "asc") return [...products].sort((a, b) => a.today - b.today);
    if (sort === "desc") return [...products].sort((a, b) => b.today - a.today);
    return products;
  }, [products, sort]);

  return (
    <>
      {/* সর্ট কন্ট্রোল */}
      <div className="mt-4 flex items-center justify-end gap-2 rounded-xl bg-card p-3 shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.03] sm:p-4">
        <label htmlFor="sort" className="text-xs text-slate-500">
          সাজান
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 outline-none focus:border-brand"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="mb-3 mt-4 text-xs text-slate-500">
        মোট {bn(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <ProductGrid products={sorted} />
    </>
  );
}