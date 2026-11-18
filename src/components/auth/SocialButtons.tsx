"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type Provider = "google" | "github";

export default function SocialButtons() {
  const [busy, setBusy] = useState<Provider | null>(null);

  const handleClick = async (provider: Provider) => {
    setBusy(provider);
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
    // সফল হলে ব্রাউজার নিজেই Google/GitHub এ চলে যায়
    if (error) {
      toast.error(error.message ?? "লগইন করা যায়নি, আবার চেষ্টা করুন");
      setBusy(null);
    }
  };

  const btn =
    "flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-60";

  return (
    <>
      <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        অথবা
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          disabled={busy !== null}
          onClick={() => handleClick("google")}
          className={btn}
        >
          <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 7l7.2 5.6c4.3-3.9 6.8-9.7 6.8-17.1z" />
            <path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-2.9-.8-4.7s.3-3.3.8-4.7l-7.9-6.1C.9 16.5 0 20.1 0 24s.9 7.5 2.6 10.8l7.9-6.1z" />
            <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.2-5.6c-2 1.4-4.6 2.3-8.7 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
          </svg>
          {busy === "google" ? "অপেক্ষা করুন..." : "Google দিয়ে চালিয়ে যান"}
        </button>

        <button
          type="button"
          disabled={busy !== null}
          onClick={() => handleClick("github")}
          className={btn}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" />
          </svg>
          {busy === "github" ? "অপেক্ষা করুন..." : "GitHub দিয়ে চালিয়ে যান"}
        </button>
      </div>
    </>
  );
}