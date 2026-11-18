// লগইনের পর কোথায় ফিরবে: URL এর ?next=/product/xyz থেকে
export function getNextPath(): string {
  if (typeof window === "undefined") return "/";
  const next = new URLSearchParams(window.location.search).get("next");
  // শুধু নিজের সাইটের পথ মানবে, অন্য সাইটে পাঠানো আটকায়
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
}