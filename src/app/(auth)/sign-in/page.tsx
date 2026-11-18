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

export default function SignInPage() {
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
    e.preventDefault();
    setFormError("");

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));

    if (!email || !password) return fail("ইমেইল ও পাসওয়ার্ড দিন");

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) return fail(error.message ?? "ইমেইল বা পাসওয়ার্ড ভুল");

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <AuthShell title="সাইন ইন করুন" subtitle="আপনার অ্যাকাউন্টে প্রবেশ করুন">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <AuthField label="ইমেইল" name="email" type="email" placeholder="you@example.com" autoComplete="email" />
        <AuthField label="পাসওয়ার্ড" name="password" type="password" placeholder="আপনার পাসওয়ার্ড" autoComplete="current-password" />

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
          {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
        </button>
      </form>

      <SocialButtons />

      <p className="mt-5 text-center text-xs text-slate-600">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/sign-up" className="font-semibold text-brand hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </AuthShell>
  );
}