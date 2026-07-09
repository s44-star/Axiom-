// components/enterprise/channel-table.tsx
"use client";

import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { BarChart3 } from "lucide-react";
import { channels, fmt } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function scoreColor(score: number) {
  if (score >= 75) return "text-emerald-300";
  if (score >= 55) return "text-[#4f8fff]";
  return "text-amber-300";
}

export function ChannelTable() {
  return (
    <section className="glass p-6">
      <header className="flex items-center gap-2">
        <BarChart3 className="h-4 w-4 text-[#4f8fff]" />
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight">
          Channel cognitive scores
        </h2>
      </header>
      <p className="mt-1 text-sm text-zinc-500">
        Friction-adjusted contribution per channel. The Oracle&apos;s directives
        are derived from drift in these scores.
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] text-left text-[11px] uppercase tracking-[0.12em] text-zinc-500">
              <th className="pb-3 pr-4 font-medium">Channel</th>
              <th className="pb-3 pr-4 font-medium">30d spend</th>
              <th className="pb-3 pr-4 font-medium">Cognitive score</th>
              <th className="pb-3 pr-4 font-medium">CPA</th>
              <th className="pb-3 font-medium">7d trend</th>
            </tr>
          </thead>
          <tbody>
            {channels.map((row) => {
              const rising = row.trend[row.trend.length - 1] >= row.trend[0];
              return (
                <tr
                  key={row.channel}
                  className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]"
                >
                  <td className="py-3 pr-4 font-medium text-zinc-200">
                    {row.channel}
                  </td>
                  <td className="py-3 pr-4 font-[family-name:var(--font-mono)] text-zinc-300">
                    {fmt.usd(row.spendUsd)}
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={cn(
                        "font-[family-name:var(--font-mono)] font-semibold",
                        scoreColor(row.cognitiveScore),
                      )}
                    >
                      {row.cognitiveScore}
                    </span>
                    <span className="text-zinc-600"> /100</span>
                  </td>
                  <td className="py-3 pr-4 font-[family-name:var(--font-mono)] text-zinc-300">
                    ${row.cpaUsd.toFixed(2)}
                  </td>
                  <td className="py-3">
                    <div className="h-8 w-28">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={row.trend.map((v) => ({ v }))}
                          margin={{ top: 4, bottom: 4, left: 0, right: 0 }}
                        >
                          <YAxis domain={["dataMin - 2", "dataMax + 2"]} hide />
                          <Line
                            type="monotone"
                            dataKey="v"
                            stroke={rising ? "#34d399" : "#f59e0b"}
                            strokeWidth={1.5}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
