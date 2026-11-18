import { IMarketPrice } from "@/types/type";
import { bn, unitBn } from "@/lib/format";

function Box({
  label,
  value,
  note,
  color,
}: {
  label: string;
  value: number;
  note: string;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-card p-4">
      <p className="text-[11px] text-slate-500">{label}</p>
      <p className={`mt-1 text-xl font-extrabold ${color}`}>
        {bn(value)} <span className="text-xs font-medium">টাকা</span>
      </p>
      <p className="mt-1 text-[11px] text-slate-500">{note}</p>
    </div>
  );
}

export default function PriceSummary({
  markets,
  unit,
}: {
  markets: IMarketPrice[];
  unit: string;
}) {
  const min = Math.min(...markets.map((m) => m.min));
  const max = Math.max(...markets.map((m) => m.max));
  // প্রতি বাজারের গড় = (সর্বনিম্ন + সর্বাধিক) ÷ ২, তারপর সব বাজারের গড়
  const avg = Math.round(
    markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length
  );

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <Box label="সর্বনিম্ন দাম" value={min} note="সবচেয়ে কম দামের বাজারে" color="text-green-600" />
      <Box label="সর্বোচ্চ দাম" value={max} note="সবচেয়ে বেশি দামের বাজারে" color="text-red-600" />
      <Box label="গড় দাম" value={avg} note={`প্রতি ${unitBn(unit)}-এর হিসাবে`} color="text-green-600" />
    </div>
  );
}