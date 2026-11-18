import { IProduct } from "@/types/type";

export const bn = (n: number) => n.toLocaleString("bn-BD");

export const bnDate = () =>
  new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const UNITS: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
};
export const unitBn = (unit: string) => UNITS[unit] ?? unit;

// change না থাকলেও ভাঙবে না
export const changeInfo = (change?: IProduct["change"]) => {
  if (!change) return { text: "—", cls: "text-slate-400" };

  const pct = bn(Math.abs(change.pct ?? 0));
  if (change.dir === "up") return { text: `▲ ${pct}%`, cls: "text-red-600" };
  if (change.dir === "down") return { text: `▼ ${pct}%`, cls: "text-green-600" };
  return { text: `— ${bn(0)}%`, cls: "text-slate-500" };
};