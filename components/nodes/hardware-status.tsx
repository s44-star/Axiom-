// components/nodes/hardware-status.tsx
"use client";

import { Cpu, Wifi, Globe, GitCommitHorizontal } from "lucide-react";
import { nodeMetrics } from "@/lib/mock-data";

const rows = [
  { icon: Globe, label: "Region", value: nodeMetrics.region },
  { icon: Cpu, label: "Agent", value: nodeMetrics.agentVersion },
  { icon: Wifi, label: "Peers", value: `${nodeMetrics.peers} connected` },
  { icon: GitCommitHorizontal, label: "Epoch", value: `#${nodeMetrics.epoch.toLocaleString()}` },
] as const;

export function HardwareStatus() {
  return (
    <section className="glass glow-violet flex h-full flex-col items-center p-6 text-center">
      <h2 className="self-start font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight">
        Local agent
      </h2>
      <p className="mt-1 self-start text-sm text-zinc-500">
        Connection to the validation mesh.
      </p>

      {/* Pulsing connection core */}
      <div className="relative my-8 flex h-36 w-36 items-center justify-center">
        <span className="pulse-ring absolute inset-0 rounded-full border border-emerald-400/40" />
        <span
          className="pulse-ring absolute inset-4 rounded-full border border-[#4f8fff]/40"
          style={{ animationDelay: "0.6s" }}
        />
        <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 shadow-[0_0_40px_-8px_rgba(52,211,153,0.6)]">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <p className="mt-1 text-[11px] font-medium text-emerald-300">SYNCED</p>
        </div>
      </div>

      <p className="font-[family-name:var(--font-mono)] text-xs text-zinc-500">
        chain head · {nodeMetrics.syncPct}% synced
      </p>

      <dl className="mt-6 w-full space-y-2.5 text-left">
        {rows.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5"
          >
            <dt className="flex items-center gap-2 text-xs text-zinc-500">
              <Icon className="h-3.5 w-3.5 text-[#8b5cf6]" />
              {label}
            </dt>
            <dd className="font-[family-name:var(--font-mono)] text-xs text-zinc-200">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
