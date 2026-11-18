"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import AuthShell from "@/components/auth/AuthShell";
import AuthField from "@/components/auth/AuthField";
import SocialButtons from "@/components/auth/SocialButtons";
import AuthSkeleton from "@/components/auth/AuthSkeleton";
import { useRedirectIfAuthed } from "@/components/auth/useRedirectIfAuthed";

export default function SignUpPage() {
  const router = useRouter();
  const { checking } = useRedirectIfAuthed();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  if (checking) return <AuthSkeleton />;

  const fail = (msg: string) => {
    setFormError(msg);
    toast.error(msg);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // পেজ রিলোড বন্ধ
    setFormError("");

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));
    const confirm = String(form.get("confirm"));

    if (!name || !email || !password || !confirm)
      return fail("সবগুলো ঘর পূরণ করুন");
    if (password.length < 8)
      return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm) return fail("পাসওয়ার্ড দুটি মিলছে না");

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) return fail(error.message ?? "অ্যাকাউন্ট তৈরি করা যায়নি");

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
    router.push("sign-in");
  };

  return (
    <AuthShell
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="ফ্রি অ্যাকাউন্ট খুলে পণ্যের বিস্তারিত দাম দেখুন"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <AuthField label="নাম" name="name" placeholder="যেমন: রহিম উদ্দিন" autoComplete="name" />
        <AuthField label="ইমেইল" name="email" type="email" placeholder="you@example.com" autoComplete="email" />
        <AuthField label="পাসওয়ার্ড" name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" autoComplete="new-password" />
        <AuthField label="পাসওয়ার্ড নিশ্চিত করুন" name="confirm" type="password" placeholder="আবার লিখুন" autoComplete="new-password" />

        {formError && (
          <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">
            {formError}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-brand py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
        >
          {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>

      <SocialButtons />

      <p className="mt-5 text-center text-xs text-slate-600">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="sign-in" className="font-semibold text-brand hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </AuthShell>
  );
}