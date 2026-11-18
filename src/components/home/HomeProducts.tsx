import { IProduct } from "@/types/type";
import { bn } from "@/lib/format";
import { getProducts } from "@/lib/api";
import ProductGrid from "@/components/products/ProductGrid";
import ProductSection from "@/components/products/ProductSection";

export default async function HomeProducts() {
  let products: IProduct[];

  try {
    products = await getProducts();
  } catch (e) {
    console.error("পণ্য আনা যায়নি:", e);
    return (
      <p className="my-10 rounded-xl bg-red-50 py-10 text-center text-sm text-red-600">
        পণ্যের তথ্য লোড করা যায়নি। কিছুক্ষণ পরে আবার চেষ্টা করুন।
      </p>
    );
  }

  // পরিবর্তনের পরিমাণ (ঋণাত্মক এলেও ঠিক থাকে)
  const size = (p: IProduct) => Math.abs(p.change?.pct ?? 0);

  // Top 6: দাম সবচেয়ে বেশি বেড়েছে
  const risers = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => size(b) - size(a))
    .slice(0, 6);

  // Top 6: দাম সবচেয়ে বেশি কমেছে
  const fallers = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => size(b) - size(a))
    .slice(0, 6);

  return (
    <>
      <ProductSection
        title="আজ দাম বেড়েছে"
        marker={<span className="text-xs text-red-600">▲</span>}
      >
        <ProductGrid products={risers} />
      </ProductSection>

      <ProductSection
        title="আজ দাম কমেছে"
        marker={<span className="text-xs text-green-600">▼</span>}
      >
        <ProductGrid products={fallers} />
      </ProductSection>

      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`${bn(products.length)}টি পণ্যের আজকের দাম`}
      >
        <ProductGrid products={products} />
      </ProductSection>
    </>
  );
} 