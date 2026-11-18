import { ICategory, IProduct } from "@/types/type";

const API = process.env.NEXT_PUBLIC_API_URL;

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status} (${url})`);
  return res.json();
}

// সব পণ্য (৩৩টি)
export const getProducts = () => fetchJson<IProduct[]>(`${API}/products`);

// ক্যাটাগরি অনুযায়ী পণ্য
export const getProductsByCategory = async (categorySlug: string) => {
  const products = await getProducts();
  return products.filter((p) => p.category === categorySlug);
};

// একটা পণ্য (ডিটেইল পেজের জন্য)
export const getProductBySlug = async (slug: string) => {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
};

// সব ক্যাটাগরি (৮টি)
export const getCategories = () =>
  fetchJson<ICategory[]>(`${API}/categories`);

// একটা ক্যাটাগরি
export const getCategory = (slug: string) =>
  fetchJson<ICategory>(`${API}/categories/${slug}`).catch(() => undefined);