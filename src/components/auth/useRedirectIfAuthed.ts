"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export function useRedirectIfAuthed() {
  const router = useRouter();
  const { data, isPending } = useSession();

  useEffect(() => {
    if (!isPending && data?.user) router.replace("/");
  }, [isPending, data, router]);

  // true থাকলে ফর্মের বদলে স্কেলিটন দেখাও
  return { checking: isPending || !!data?.user };
}