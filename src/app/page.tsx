import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import HomeProducts from "@/components/home/HomeProducts";
import ProductsSkeleton from "@/components/products/ProductsSkeleton";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ডাটা আসা পর্যন্ত স্কেলিটন, Hero সাথে সাথে দেখা যায় */}
      <Suspense fallback={<ProductsSkeleton />}>
        <HomeProducts />
      </Suspense>
    </>
  );
}