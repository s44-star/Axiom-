// components/nodes/reward-stream.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Coins, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { seedRewards, fmt, type RewardEvent } from "@/lib/mock-data";

const MAX_ROWS = 14;
const REWARD_PER_RECORD = 0.000259; // AXM — mock protocol constant

function randomHex(len: number) {
  return Array.from({ length: len }, () =>
    "0123456789abcdef"[Math.floor(Math.random() * 16)],
  ).join("");
}

function makeEvent(): RewardEvent {
  const records = 38_000 + Math.floor(Math.random() * 18_000);
  const now = new Date();
  return {
    id: crypto.randomUUID(),
    batchId: `0x${randomHex(4)}…${randomHex(4)}`,
    records,
    tokens: records * REWARD_PER_RECORD,
    latencyMs: +(6 + Math.random() * 8).toFixed(1),
    ts: now.toTimeString().slice(0, 8),
  };
}

export function RewardStream() {
  const [events, setEvents] = useState<RewardEvent[]>(seedRewards);
  const [sessionTotal, setSessionTotal] = useState(2_841.77);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Mock stream. Replace with supabase.channel("rewards").on("postgres_changes", …)
    timer.current = setInterval(() => {
      const evt = makeEvent();
      setEvents((prev) => [evt, ...prev].slice(0, MAX_ROWS));
      setSessionTotal((t) => t + evt.tokens);
    }, 2400);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  return (
    <section className="glass flex h-full flex-col p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Coins className="h-4 w-4 text-[#4f8fff]" />
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight">
            Reward stream
          </h2>
          <Badge className="gap-1.5 border-emerald-400/30 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/10">
            <span className="relative flex h-1.5 w-1.5">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            live
          </Badge>
        </div>
        <p className="font-[family-name:var(--font-mono)] text-sm text-zinc-300">
          <span className="text-zinc-500">session:</span>{" "}
          <span className="text-[#4f8fff]">
            {sessionTotal.toFixed(4)} AXM
          </span>
        </p>
      </header>
      <p className="mt-1 text-sm text-zinc-500">
        Tokens settle per validated batch. Payout scales with records processed —
        volume and speed only.
      </p>

      {/* Column header */}
      <div className="mt-4 grid grid-cols-[1fr_auto_auto_auto] gap-x-4 border-b border-white/[0.06] pb-2 text-[10px] uppercase tracking-[0.14em] text-zinc-600 md:grid-cols-[auto_1fr_auto_auto_auto]">
        <span className="hidden md:block">Time</span>
        <span>Batch</span>
        <span className="text-right">Records</span>
        <span className="text-right">Latency</span>
        <span className="text-right">Reward</span>
      </div>

      <ul className="stream-scroll mt-1 max-h-[380px] flex-1 divide-y divide-white/[0.04] overflow-y-auto">
        {events.map((evt, i) => (
          <li
            key={evt.id}
            className={
              "grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-4 py-2.5 font-[family-name:var(--font-mono)] text-xs md:grid-cols-[auto_1fr_auto_auto_auto] " +
              (i === 0 ? "reward-enter" : "")
            }
          >
            <span className="hidden text-zinc-600 md:block">{evt.ts}</span>
            <span className="truncate text-zinc-400">{evt.batchId}</span>
            <span className="text-right tabular-nums text-zinc-300">
              {fmt.int(evt.records)}
            </span>
            <span className="text-right tabular-nums text-zinc-500">
              {evt.latencyMs}ms
            </span>
            <span className="flex items-center justify-end gap-1 text-right tabular-nums text-emerald-300">
              <ArrowUpRight className="h-3 w-3" />+{evt.tokens.toFixed(4)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
