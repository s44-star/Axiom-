// components/enterprise/cognitive-funnel.tsx
"use client";

import {
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts";
import { GitBranch, ArrowDown } from "lucide-react";
import { cognitiveFunnel, fmt, type FunnelStage } from "@/lib/mock-data";

function FunnelTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const stage = payload[0].payload as FunnelStage;
  return (
    <div className="glass px-3 py-2 text-xs">
      <p className="font-medium text-zinc-100">{stage.name}</p>
      <p className="mt-0.5 font-[family-name:var(--font-mono)] text-zinc-300">
        {fmt.int(stage.value)} identities
      </p>
      {stage.conversionPct !== null && (
        <p className="mt-0.5 text-[#4f8fff]">
          {stage.conversionPct}% carried from previous stage
        </p>
      )}
    </div>
  );
}

export function CognitiveFunnel() {
  return (
    <section className="glass flex h-full flex-col p-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-[#8b5cf6]" />
            <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight">
              Cognitive journey
            </h2>
          </div>
          <p className="mt-1 text-sm text-zinc-500">
            Multi-touch attribution across the encoded funnel, privacy-preserving
            identities only.
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-[family-name:var(--font-mono)] text-[11px] text-zinc-400">
          last 30d
        </span>
      </header>

      <div className="mt-4 min-h-[280px] flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip content={<FunnelTooltip />} cursor={false} />
            <Funnel dataKey="value" data={cognitiveFunnel} isAnimationActive>
              <LabelList
                position="right"
                dataKey="name"
                fill="#e4e4e7"
                stroke="none"
                className="text-xs"
              />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>

      {/* Stage strip: counts + carry-through */}
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {cognitiveFunnel.map((stage) => (
          <div
            key={stage.name}
            className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3"
          >
            <div className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: stage.fill }}
              />
              <p className="truncate text-[11px] text-zinc-400">{stage.name}</p>
            </div>
            <p className="mt-1 font-[family-name:var(--font-mono)] text-sm text-zinc-100">
              {fmt.compact(stage.value)}
            </p>
            {stage.conversionPct !== null && (
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-zinc-500">
                <ArrowDown className="h-3 w-3 text-[#4f8fff]" />
                {stage.conversionPct}% carry-through
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
