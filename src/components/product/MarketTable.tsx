import { IMarketPrice } from "@/types/type";
import { bnPrice } from "@/lib/format";

export default function MarketTable({ markets }: { markets: IMarketPrice[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-[560px] text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-xs text-slate-500">
            <th className="px-4 py-3 text-left font-medium">বাজার</th>
            <th className="px-4 py-3 text-left font-medium">বিভাগ</th>
            <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
            <th className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
            <th className="px-4 py-3 text-right font-medium">গড়</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {markets.map((m, i) => (
            <tr key={`${m.market}-${i}`} className="even:bg-slate-50/70">
              <td className="px-4 py-3 text-xs font-semibold text-slate-900">{m.market}</td>
              <td className="px-4 py-3 text-xs text-slate-600">{m.division}</td>
              <td className="px-4 py-3 text-right text-xs text-slate-600">{bnPrice(m.min)} টাকা</td>
              <td className="px-4 py-3 text-right text-xs text-slate-600">{bnPrice(m.max)} টাকা</td>
              <td className="px-4 py-3 text-right text-xs font-bold text-slate-900">
                {bnPrice((m.min + m.max) / 2)} টাকা
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}