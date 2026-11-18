import { IProduct } from "@/types/type";

// ইংরেজি সংখ্যা → বাংলা (১,৮৫০)
export const bn = (n: number) => n.toLocaleString("bn-BD");

// আজকের তারিখ বাংলায়
export const bnDate = () =>
  new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

// "kg" → "কেজি"। অচেনা unit এলে যা এসেছে তাই দেখায়
const UNITS: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  l: "লিটার",
  dozen: "ডজন",
  dz: "ডজন",
  piece: "পিস",
  pcs: "পিস",
  pc: "পিস",
};
export const unitBn = (unit: string) => UNITS[unit.toLowerCase()] ?? unit;
export const bnPrice = (n: number) =>
  Number.isInteger(n)
    ? bn(n)
    : n.toLocaleString("bn-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
// দাম বাড়া/কমার লেখা ও রং
// text = লেখা, cls = শুধু লেখার রং (ticker), badge = ব্যাকগ্রাউন্ডসহ (কার্ড)
export const changeInfo = (change?: IProduct["change"]) => {
  if (!change)
    return { text: "—", cls: "text-slate-400", badge: "bg-slate-100 text-slate-500" };

  const pct = bn(Math.abs(change.pct ?? 0));

  if (change.dir === "up")
    return { text: `▲ ${pct}%`, cls: "text-red-600", badge: "bg-red-50 text-red-600" };
  if (change.dir === "down")
    return { text: `▼ ${pct}%`, cls: "text-green-600", badge: "bg-green-50 text-green-600" };

  return { text: `— ${bn(0)}%`, cls: "text-slate-500", badge: "bg-slate-100 text-slate-500" };
};