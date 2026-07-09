// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Axiom Protocol — Decentralized Attribution",
  description:
    "Privacy-preserving, cryptographic marketing measurement and prescriptive attribution.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${grotesk.variable} ${mono.variable} min-h-screen bg-zinc-950 font-[family-name:var(--font-body)] text-zinc-100 antialiased`}
      >
        {/* Ambient background: radial glows + faint grid */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute -top-40 left-1/4 h-[480px] w-[720px] rounded-full bg-[#4f8fff]/10 blur-[140px]" />
          <div className="absolute bottom-0 right-0 h-[420px] w-[640px] rounded-full bg-[#8b5cf6]/10 blur-[140px]" />
        </div>

        <div className="flex min-h-screen">
          <AppSidebar />
          <main className="min-w-0 flex-1 px-6 py-8 md:px-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
