import Link from "next/link";
import { IProduct } from "@/types/type";
import { bn, changeInfo, unitBn } from "@/lib/format";

export default function ProductCard({ product: p }: { product: IProduct }) {
  const c = changeInfo(p.change);

  return (
    <Link
      href={`/product/${p.slug}`}
      className="group flex flex-col gap-3 rounded-xl bg-card p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.03] transition hover:-translate-y-0.5 hover:shadow-md sm:p-4"
    >
      {/* ইমোজি বক্স + নাম + একক */}
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-lg sm:h-10 sm:w-10 sm:text-xl">
          {p.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-slate-900 group-hover:text-brand">
            {p.nameBn}
          </h3>
          <p className="text-[11px] text-slate-500">প্রতি {unitBn(p.unit)}</p>
        </div>
      </div>

      {/* আজকের দাম + ব্যাজ */}
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-[10px] text-slate-500">আজকের দাম</p>
          <p className="text-sm font-bold text-slate-900 sm:text-base">
            {bn(p.today)}{" "}
            <span className="text-[11px] font-medium text-slate-600">টাকা</span>
          </p>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold sm:text-[11px] ${c.badge}`}
        >
          {c.text}
        </span>
      </div>
    </Link>
  );
}