import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

// লগইন না থাকলে সাইন ইন পেজে পাঠায়, লগইনের পর nextPath এ ফিরবে
export async function requireSession(nextPath: string) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect(`/sign-in?next=${encodeURIComponent(nextPath)}`);
  }
  return session;
}