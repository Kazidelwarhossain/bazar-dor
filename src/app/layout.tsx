import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <PriceTicker />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">
          {children}
        </main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}