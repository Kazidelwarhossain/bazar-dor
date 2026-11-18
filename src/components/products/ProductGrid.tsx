import { IProduct } from "@/types/type";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: IProduct[] }) {
  // পণ্য না থাকলে বার্তা (Category পেজেও কাজে লাগবে)
  if (products.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 py-10 text-center text-sm text-slate-500">
        কোনো পণ্য পাওয়া যায়নি
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}