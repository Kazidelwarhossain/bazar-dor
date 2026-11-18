"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { getNextPath } from "@/lib/next-path";

export function useRedirectIfAuthed() {
  const router = useRouter();
  const { data, isPending } = useSession();

  useEffect(() => {
    // লগইন থাকলে ?next= এর পেজে (না থাকলে হোমে) পাঠাও
    if (!isPending && data?.user) router.replace(getNextPath());
  }, [isPending, data, router]);

  return { checking: isPending || !!data?.user };
}