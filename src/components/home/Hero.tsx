import Image from "next/image";
import { bnDate } from "@/lib/format";

export default function Hero() {
  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-card px-6 py-8 sm:px-10 sm:py-10">
      <div className="grid items-center gap-6 md:grid-cols-[1fr_auto] md:gap-10">
        {/* বাম পাশ: লেখা */}
        <div className="flex flex-col items-start gap-4">
          <span className="rounded-full bg-[#e1f1e7] px-3 py-1 text-[11px] font-semibold text-brand sm:text-xs">
            {bnDate()}
          </span>

          <h1 className="text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="max-w-xl text-xs leading-relaxed text-slate-600 sm:text-sm">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
            গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* একই পেজের #সব-পণ্য এ স্ক্রল, রুট বদলায় না */}
          <a
            href="#সব-পণ্য"
            className="mt-1 inline-flex items-center rounded-md bg-brand px-4 py-2 text-xs font-semibold text-white shadow-md shadow-brand/30 transition-colors hover:bg-brand-dark sm:text-sm"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        {/* ডান পাশ: ব্যানার ছবি */}
        <div className="hidden justify-self-end md:block">
          <Image
            src="/bazar-hero.png"
            alt="ঝুড়িভর্তি তাজা ফল ও সবজি"
            width={315}
            height={263}
            priority
            className="h-auto w-56 lg:w-72"
          />
        </div>
      </div>
    </section>
  );
}