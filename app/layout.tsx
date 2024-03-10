import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog2Thread",
  description:
    "AI tool that will easily generate twitter threads for your blog post.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-full">
          <Navbar />
          <main className="pt-24 h-full max-w-6xl mx-auto">
            <Toaster />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
