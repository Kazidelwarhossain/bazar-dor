// const response = await fetch(
//   `https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`
// );
import { notFound } from "next/navigation";
import { getCategory, getProductsByCategory } from "@/lib/api";
import { bn } from "@/lib/format";
import CategoryProducts from "@/components/category/CategoryProducts";
import NotFoundView from "@/components/common/NotFoundView";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // দুটো অনুরোধ একসাথে, একটার জন্য আরেকটা অপেক্ষা করে না
  const [category, products] = await Promise.all([
    getCategory(slug),
    getProductsByCategory(slug),
  ]);

  // ভুল slug (যেমন /category/invalid) → ৪০৪ পেজ
  if (!category) notFound();

  return (
    <div className="py-6">
      {/* শিরোনাম কার্ড */}
      <header className="flex items-center gap-4 rounded-2xl bg-card p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.03]">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-2xl">
          {category.icon}
        </span>
        <div>
          <h1 className="text-lg font-extrabold text-slate-900 sm:text-xl">
            {category.nameBn}
          </h1>
          <p className="text-xs text-slate-500">
            {bn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </header>

      {products.length === 0 ? (
        <NotFoundView
          compact
          title="এই ক্যাটাগরিতে কোনো পণ্য নেই"
          message="অন্য ক্যাটাগরি দেখুন, অথবা হোম পেজে ফিরে যান।"
        />
      ) : (
        <CategoryProducts products={products} />
      )}
    </div>
  );
}