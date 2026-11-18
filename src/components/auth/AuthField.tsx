export default function AuthField({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium text-slate-700">
      {label}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-normal text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-brand focus:bg-white"
      />
    </label>
  );
}