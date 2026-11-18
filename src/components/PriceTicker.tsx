"use client";

import { useEffect, useState } from "react";
import { IProduct } from "@/types/type";
import { bn, changeInfo, unitBn } from "@/lib/format";
import { getProducts } from "@/lib/api";

export default function PriceTicker() {
  const [items, setItems] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setItems)
      .catch((e) => console.error("Ticker error:", e))
      .finally(() => setLoading(false));
  }, []);

  // লোড হওয়ার সময় ধূসর স্কেলিটন স্ট্রিপ
  if (loading) {
    return <div className="h-9 w-full animate-pulse border-b border-slate-200 bg-slate-100" />;
  }

  // ডাটা না এলে ticker লুকিয়ে ফেলো (পেজ ভাঙবে না)
  if (items.length === 0) return null;

  // দুইবার রাখা হয়েছে, যাতে লুপ জোড়া লাগার সময় ফাঁক না দেখা যায়
  const loop = [...items, ...items];

  return (
    <div className="group overflow-hidden border-b border-slate-200 bg-white text-slate-800">
      <div className="ticker-track flex w-max gap-8 py-2 group-hover:[animation-play-state:paused]">
        {loop.map((p, i) => {
          const c = changeInfo(p.change);
          return (
            <span
              key={`${p.id}-${i}`}
              className="flex items-center gap-1.5 whitespace-nowrap text-xs sm:text-sm"
            >
              <span>{p.image}</span>
              <span className="font-medium">{p.nameBn}</span>
              <span className="text-slate-500">
                {bn(p.today)} টাকা/{unitBn(p.unit)}
              </span>
              <span className={`font-semibold ${c.cls}`}>{c.text}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}