"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Separator } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";
import { getCategories } from "@/lib/api";
import { bnDate } from "@/lib/format";
import { ICategory } from "@/types/type";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data, isPending } = useSession();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((e) => {
        console.error("Categories error:", e);
        setFailed(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSignOut = async () => {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
  };

  const initial = data?.user?.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Row 1: লোগো + তারিখ | অথ বাটন */}
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex w-fit items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-lg">
              🛒
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-base font-extrabold text-slate-900">
                বাজার দর
              </span>
              <span className="text-[10px] font-medium text-slate-500">
                {bnDate()}
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {isPending ? (
              <div className="h-9 w-24 animate-pulse rounded-md bg-slate-200" />
            ) : data?.user ? (
              <Dropdown>
                <Button isIconOnly aria-label="মেনু" variant="secondary">
                  <Avatar>
                    {data.user.image && (
                      <Avatar.Image alt={data.user.name} src={data.user.image} />
                    )}
                    <Avatar.Fallback>{initial}</Avatar.Fallback>
                  </Avatar>
                </Button>
                <Dropdown.Popover>
                  <Dropdown.Menu
                    onAction={(key) => {
                      if (key === "profile") router.push("/profile");
                      if (key === "signout") handleSignOut();
                    }}
                  >
                    <Dropdown.Item id="profile" textValue="প্রোফাইল">
                      প্রোফাইল
                    </Dropdown.Item>
                    <Dropdown.Item id="signout" textValue="সাইন আউট">
                      সাইন আউট
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            ) : (
              <>
                <Link href="/sign-in"
                  className="rounded-md px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-brand sm:text-sm"
                >
                  সাইন ইন
                </Link>
                <Link href="/sign-up"
                  className="rounded-md bg-brand px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-brand-dark sm:text-sm"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        <Separator className="w-full bg-slate-100" />

        {/* Row 2: ক্যাটাগরি লিংক */}
        <nav
          aria-label="ক্যাটাগরি"
          className="no-scrollbar flex items-center gap-5 overflow-x-auto py-2.5 sm:gap-8"
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-5 w-16 shrink-0 animate-pulse rounded bg-slate-200"
              />
            ))
          ) : failed ? (
            <p className="text-xs text-red-500">ক্যাটাগরি লোড করা যায়নি</p>
          ) : (
            categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={`flex shrink-0 items-center gap-1 whitespace-nowrap border-b-2 py-1 text-xs transition-colors ${
                    isActive
                      ? "border-brand font-semibold text-brand"
                      : "border-transparent text-slate-600 hover:text-brand"
                  }`}
                >
                  <span className="text-base leading-none">{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })
          )}
        </nav>
      </div>
    </header>
  );
}