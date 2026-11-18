import Link from "next/link";
import { IProduct } from "@/types/type";
import { bn, changeInfo, unitBn } from "@/lib/format";

export default function ProductSummary({ product: p }: { product: IProduct }) {
  const c = changeInfo(p.change);
  const diff = p.today - p.yesterday;

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-card p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.03] sm:flex-row sm:items-center sm:justify-between sm:p-5">
      {/* বাম: ইমোজি + নাম + বিবরণ */}
      <div className="flex items-center gap-4">
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-slate-100 text-3xl">
          {p.image}
        </span>
        <div className="min-w-0">
          <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">{p.nameBn}</h1>
          <p className="mt-0.5 text-xs text-slate-500">
            প্রতি {unitBn(p.unit)} ·{" "}
            <Link href={`/category/${p.category}`} className="hover:text-brand hover:underline">
              {p.categoryNameBn}
            </Link>
          </p>
          <p className="mt-1.5 text-xs text-slate-600">
            গতকালের তুলনায় আজ দাম{" "}
            {diff === 0 ? (
              "অপরিবর্তিত"
            ) : (
              <>
                <b className={diff > 0 ? "text-red-600" : "text-green-600"}>
                  {diff > 0 ? "বেড়েছে" : "কমেছে"}
                </b>{" "}
                · {bn(Math.abs(diff))} টাকা
              </>
            )}
          </p>
        </div>
      </div>

      {/* ডান: আজকের দাম */}
      <div className="rounded-xl bg-page px-6 py-3 text-center sm:min-w-32">
        <p className="text-[11px] text-slate-500">আজকের দাম</p>
        <p className="text-2xl font-extrabold text-slate-900">{bn(p.today)}</p>
        <p className="text-[11px] text-slate-500">টাকা / {unitBn(p.unit)}</p>
        <p className={`mt-1 text-xs font-semibold ${c.cls}`}>{c.text}</p>
      </div>
    </div>
  );
}