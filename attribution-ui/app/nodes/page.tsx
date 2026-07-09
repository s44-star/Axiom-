// app/nodes/page.tsx
import type { Metadata } from "next";
import { SpeedMetrics } from "@/components/nodes/speed-metrics";
import { RewardStream } from "@/components/nodes/reward-stream";
import { HardwareStatus } from "@/components/nodes/hardware-status";

export const metadata: Metadata = {
  title: "Node Operator — Axiom Protocol",
};

export default function NodesPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#8b5cf6]">
            Node operator
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight md:text-3xl">
            Validation engine
          </h1>
        </div>
        <p className="font-[family-name:var(--font-mono)] text-xs text-zinc-500">
          node-eu-fra-047 · epoch 20,481
        </p>
      </header>

      <SpeedMetrics />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RewardStream />
        </div>
        <HardwareStatus />
      </div>
    </div>
  );
}
