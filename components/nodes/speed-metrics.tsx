// components/nodes/speed-metrics.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { AreaChart, Area, ResponsiveContainer, YAxis } from "recharts";
import { Gauge, Timer, Activity } from "lucide-react";
import { nodeMetrics, fmt } from "@/lib/mock-data";

const WINDOW = 40; // sparkline points kept in memory

function jitter(base: number, spread: number, min = 0) {
  return Math.max(min, base + (Math.random() - 0.5) * spread);
}

interface LiveState {
  tps: number;
  latency: number;
  tpsSeries: { v: number }[];
  latencySeries: { v: number }[];
}

export function SpeedMetrics() {
  const [live, setLive] = useState<LiveState>({
    tps: nodeMetrics.tps,
    latency: nodeMetrics.latencyMs,
    tpsSeries: Array.from({ length: WINDOW }, () => ({
      v: jitter(nodeMetrics.tps, 1600),
    })),
    latencySeries: Array.from({ length: WINDOW }, () => ({
      v: jitter(nodeMetrics.latencyMs, 4, 4),
    })),
  });
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Mock feed. Replace with a Supabase Realtime channel subscription
    // (or your node agent's WebSocket) when wiring the backend.
    timer.current = setInterval(() => {
      setLive((prev) => {
        const tps = jitter(nodeMetrics.tps, 2200, 8000);
        const latency = jitter(nodeMetrics.latencyMs, 5, 4);
        return {
          tps,
          latency,
          tpsSeries: [...prev.tpsSeries.slice(1), { v: tps }],
          latencySeries: [...prev.latencySeries.slice(1), { v: latency }],
        };
      });
    }, 1200);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* TPS — the hero */}
      <div className="glass glow-blue relative overflow-hidden p-5 md:col-span-1">
        <div className="flex items-center gap-2 text-zinc-400">
          <Activity className="h-4 w-4 text-[#4f8fff]" />
          <p className="text-[11px] font-medium uppercase tracking-[0.14em]">
            Live processing volume
          </p>
        </div>
        <p className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tabular-nums tracking-tight md:text-5xl">
          {fmt.int(live.tps)}
          <span className="ml-2 text-base font-normal text-zinc-500">TPS</span>
        </p>
        <div className="mt-3 h-16">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={live.tpsSeries} margin={{ top: 2, bottom: 0, left: 0, right: 0 }}>
              <defs>
                <linearGradient id="tpsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f8fff" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#4f8fff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis domain={["dataMin - 500", "dataMax + 500"]} hide />
              <Area
                type="monotone"
                dataKey="v"
                stroke="#4f8fff"
                strokeWidth={1.5}
                fill="url(#tpsFill)"
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Uptime */}
      <div className="glass p-5">
        <div className="flex items-center gap-2 text-zinc-400">
          <Gauge className="h-4 w-4 text-emerald-400" />
          <p className="text-[11px] font-medium uppercase tracking-[0.14em]">
            Node uptime · 90d
          </p>
        </div>
        <p className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tabular-nums tracking-tight md:text-5xl">
          {nodeMetrics.uptimePct}
          <span className="ml-1 text-base font-normal text-zinc-500">%</span>
        </p>
        <div className="mt-4">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-[#4f8fff]"
              style={{ width: `${nodeMetrics.uptimePct}%` }}
            />
          </div>
          <p className="mt-2 font-[family-name:var(--font-mono)] text-[11px] text-zinc-500">
            0 slashing events · 90d window
          </p>
        </div>
      </div>

      {/* Latency */}
      <div className="glass p-5">
        <div className="flex items-center gap-2 text-zinc-400">
          <Timer className="h-4 w-4 text-[#8b5cf6]" />
          <p className="text-[11px] font-medium uppercase tracking-[0.14em]">
            Validation latency
          </p>
        </div>
        <p className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tabular-nums tracking-tight md:text-5xl">
          {live.latency.toFixed(1)}
          <span className="ml-1 text-base font-normal text-zinc-500">ms</span>
        </p>
        <div className="mt-3 h-16">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={live.latencySeries}
              margin={{ top: 2, bottom: 0, left: 0, right: 0 }}
            >
              <defs>
                <linearGradient id="latFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis domain={[0, "dataMax + 4"]} hide />
              <Area
                type="monotone"
                dataKey="v"
                stroke="#8b5cf6"
                strokeWidth={1.5}
                fill="url(#latFill)"
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
