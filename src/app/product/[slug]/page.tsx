import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductDetails } from "@/lib/api";
import { requireSession } from "@/lib/session";
import ProductSummary from "@/components/product/ProductSummary";
import PriceSummary from "@/components/product/PriceSummary";
import MarketTable from "@/components/product/MarketTable";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 🔒 লগইন না থাকলে এখানেই থামবে, সাইন ইন পেজে চলে যাবে
  await requireSession(`/product/${slug}`);

  const details = await getProductDetails(slug);
  if (!details) notFound(); // /product/unknown → ৪০৪

  const { product, markets } = details;

  return (
    <div className="mx-auto max-w-4xl py-6">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-brand">হোম</Link>
        <span>›</span>
        <Link href={`/category/${product.category}`} className="hover:text-brand">
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="font-medium text-slate-700">{product.nameBn}</span>
      </nav>

      <ProductSummary product={product} />

      <section className="mt-5 rounded-2xl bg-card p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.03] sm:p-6">
        {markets.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">
            এই পণ্যের বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি
          </p>
        ) : (
          <>
            <h2 className="mb-3 text-sm font-bold text-slate-900 sm:text-base">দামের সারসংক্ষেপ</h2>
            <PriceSummary markets={markets} unit={product.unit} />

            <h2 className="mb-3 mt-7 text-sm font-bold text-slate-900 sm:text-base">
              বাজারভিত্তিক আজকের দাম
            </h2>
            <MarketTable markets={markets} />
          </>
        )}
      </section>
    </div>
  );
}