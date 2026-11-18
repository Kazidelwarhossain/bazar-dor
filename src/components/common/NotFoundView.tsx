import Link from "next/link";

export default function NotFoundView({
  title = "পেজটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে পেজটি খুঁজছেন তা নেই, অথবা সরিয়ে ফেলা হয়েছে।",
  compact = false,
}: {
  title?: string;
  message?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`mx-auto flex max-w-md flex-col items-center text-center ${
        compact ? "py-10" : "py-20"
      }`}
    >
      <span className="text-5xl">🔍</span>
      {!compact && <p className="mt-3 text-sm font-bold text-brand">৪০৪</p>}
      <h1 className="mt-2 text-lg font-bold text-slate-900 sm:text-xl">{title}</h1>
      <p className="mt-2 text-xs text-slate-500 sm:text-sm">{message}</p>

      <Link
        href="/"
        className="mt-6 rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/30 transition-colors hover:bg-brand-dark"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}