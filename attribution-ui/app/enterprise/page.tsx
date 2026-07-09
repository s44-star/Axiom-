// app/enterprise/page.tsx
import type { Metadata } from "next";
import { TvlHero } from "@/components/enterprise/tvl-hero";
import { CognitiveFunnel } from "@/components/enterprise/cognitive-funnel";
import { AttributionOracle } from "@/components/enterprise/attribution-oracle";
import { ChannelTable } from "@/components/enterprise/channel-table";

export const metadata: Metadata = {
  title: "Enterprise — Axiom Protocol",
};

export default function EnterprisePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#4f8fff]">
            Prescriptive dashboard
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight md:text-3xl">
            Cognitive attribution overview
          </h1>
        </div>
        <p className="font-[family-name:var(--font-mono)] text-xs text-zinc-500">
          Epoch 20,481 · settled 42s ago
        </p>
      </header>

      <TvlHero />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <CognitiveFunnel />
        </div>
        <AttributionOracle />
      </div>

      <ChannelTable />
    </div>
  );
}
