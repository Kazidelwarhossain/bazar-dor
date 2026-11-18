import Link from "next/link";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-md py-10 sm:py-14">
      <h1 className="text-center text-xl font-bold text-slate-900 sm:text-2xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1.5 text-center text-xs text-slate-500 sm:text-sm">
          {subtitle}
        </p>
      )}

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        {children}
      </div>

      <p className="mt-5 text-center text-xs text-slate-500">
        <Link href="/" className="hover:text-brand">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}