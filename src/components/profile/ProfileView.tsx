"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfileView({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image: string | null;
}) {
  const router = useRouter();
  const [newName, setNewName] = useState(name);
  const [saving, setSaving] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = newName.trim();

    if (trimmed.length < 2) return toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
    if (trimmed === name) return toast("নাম আগের মতোই আছে");

    setSaving(true);
    const { error } = await authClient.updateUser({ name: trimmed });
    setSaving(false);

    if (error) return toast.error(error.message || "আপডেট করা যায়নি");

    toast.success("প্রোফাইল আপডেট হয়েছে");
    router.refresh(); // সার্ভারের নতুন নাম টেনে আনে
  };

  return (
    <div className="mx-auto max-w-2xl py-8">
      <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">আমার প্রোফাইল</h1>
      <p className="mt-1 text-xs text-slate-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      {/* পরিচয় কার্ড */}
      <div className="mt-5 flex flex-col gap-4 rounded-2xl bg-card p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.03] sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex items-center gap-4">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={name} className="h-14 w-14 rounded-xl object-cover" />
          ) : (
            <span className="grid h-14 w-14 place-items-center rounded-xl bg-brand/10 text-xl font-bold text-brand">
              {name.charAt(0).toUpperCase()}
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-slate-900">{name}</p>
            <p className="truncate text-xs text-slate-500">{email}</p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="rounded-md border border-red-400 px-3.5 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          ↩ সাইন আউট
        </button>
      </div>

      {/* তথ্য আপডেট কার্ড */}
      <div className="mt-4 rounded-2xl bg-card p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.03] sm:p-6">
        <h2 className="text-sm font-bold text-slate-900">তথ্য</h2>

        <form onSubmit={handleUpdate} className="mt-4 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-xs font-medium text-slate-700">
            নাম
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-normal text-slate-900 outline-none focus:border-brand focus:bg-white"
            />
          </label>

          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-brand py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/30 transition-colors hover:bg-brand-dark disabled:opacity-60"
          >
            {saving ? "অপেক্ষা করুন..." : "আপডেট"}
          </button>
        </form>
      </div>
    </div>
  );
}