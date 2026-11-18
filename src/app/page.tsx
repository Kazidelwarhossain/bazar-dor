import Image from "next/image";

import Hero from "@/components/home/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section id="সব-পণ্য" className="scroll-mt-40 py-10">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">সব পণ্য</h2>
      </section>
    </>
  );
}