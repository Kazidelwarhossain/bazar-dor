import { ICategory, IMarketPrice, IProduct } from "@/types/type";

const API = process.env.NEXT_PUBLIC_API_URL;

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Request failed: ${res.status} (${url})`);
  return res.json();
}

export const getProducts = () => fetchJson<IProduct[]>(`${API}/products`);

export const getProductsByCategory = async (categorySlug: string) => {
  const products = await getProducts();
  return products.filter((p) => p.category === categorySlug);
};

export const getCategories = () => fetchJson<ICategory[]>(`${API}/categories`);

export const getCategory = (slug: string) =>
  fetchJson<ICategory>(`${API}/categories/${slug}`).catch(() => undefined);

/* ---------- বাজারভিত্তিক দামের জন্য ---------- */

const isMarket = (x: unknown) =>
  !!x && typeof x === "object" && "market" in x && "min" in x && "max" in x;

// পণ্যের ভেতরে যে নামেই array থাকুক, বাজারের তালিকাটা খুঁজে বের করে
export function getMarkets(data: unknown, depth = 0): IMarketPrice[] {
  if (!data || typeof data !== "object" || depth > 2) return [];

  for (const value of Object.values(data)) {
    if (Array.isArray(value) && value.length > 0 && isMarket(value[0])) {
      return value as IMarketPrice[];
    }
  }
  for (const value of Object.values(data)) {
    const found = getMarkets(value, depth + 1);
    if (found.length > 0) return found;
  }
  return [];
}

// একটা পণ্য + তার বাজারের তালিকা
export const getProductDetails = async (slug: string) => {
  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);
  if (!product) return undefined;

  let markets = getMarkets(product);

  // তালিকায় বাজারের তথ্য না থাকলে একক পণ্যের লিংক চেষ্টা করো
  if (markets.length === 0) {
    try {
      markets = getMarkets(await fetchJson<unknown>(`${API}/products/${slug}`));
    } catch {
      /* পাওয়া না গেলে ফাঁকাই থাকবে */
    }
  }
  return { product, markets };
};