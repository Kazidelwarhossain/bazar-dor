export default function ProductSection({
  id,
  title,
  marker,
  subtitle,
  children,
}: {
  id?: string;
  title: string;
  marker?: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-40 py-6">
      <div className="mb-4">
        <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 sm:text-lg">
          {marker}
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}