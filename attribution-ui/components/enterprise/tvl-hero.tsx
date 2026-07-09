// components/enterprise/tvl-hero.tsx
"use client";

import { AreaChart, Area, ResponsiveContainer, YAxis } from "recharts";
import { TrendingUp, Lock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { tvl, fmt } from "@/lib/mock-data";

export function TvlHero() {
  return (
    <section className="glass-hero glow-blue relative overflow-hidden p-6 md:p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        {/* Left: the number */}
        <div>
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-[#4f8fff]" />
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">
              Total token value locked · premium data access
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <p className="font-[family-name:var(--font-display)] text-5xl font-semibold tracking-tight md:text-6xl">
              {fmt.usd(tvl.totalStakedUsd)}
            </p>
            <Badge className="gap-1 border-emerald-400/30 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/10">
              <TrendingUp className="h-3 w-3" />
              +{tvl.change24hPct}% 24h
            </Badge>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div>
              <p className="text-zinc-500">Staked</p>
              <p className="mt-0.5 font-[family-name:var(--font-mono)] text-zinc-200">
                {fmt.compact(tvl.totalStakedTokens)} AXM
              </p>
            </div>
            <div>
              <p className="text-zinc-500">Your tier</p>
              <p className="mt-0.5 text-[#c4b5fd]">{tvl.tier}</p>
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-zinc-500">
                <Users className="h-3.5 w-3.5" /> Stakers
              </p>
              <p className="mt-0.5 font-[family-name:var(--font-mono)] text-zinc-200">
                {fmt.int(tvl.stakerCount)}
              </p>
            </div>
          </div>
        </div>

        {/* Right: 7-day TVL sparkline */}
        <div className="h-36 lg:h-auto">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={tvl.history} margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="tvlFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f8fff" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <YAxis domain={["dataMin - 4", "dataMax + 2"]} hide />
              <Area
                type="monotone"
                dataKey="usd"
                stroke="#4f8fff"
                strokeWidth={2}
                fill="url(#tvlFill)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
