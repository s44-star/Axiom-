// components/enterprise/attribution-oracle.tsx
"use client";

import { useState } from "react";
import { Sparkles, Zap, ChevronLeft, ChevronRight, Check, Loader2, Fuel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { oracleDirectives } from "@/lib/mock-data";

type TxState = "idle" | "signing" | "confirmed";

export function AttributionOracle() {
  const [index, setIndex] = useState(0);
  const [tx, setTx] = useState<TxState>("idle");

  const directive = oracleDirectives[index];

  // Mock the wallet-sign + confirm round-trip. Replace with your
  // wagmi/viem writeContract call when wiring the chain.
  const execute = () => {
    if (tx !== "idle") return;
    setTx("signing");
    setTimeout(() => setTx("confirmed"), 1800);
    setTimeout(() => setTx("idle"), 4200);
  };

  const step = (dir: 1 | -1) => {
    setTx("idle");
    setIndex((i) => (i + dir + oracleDirectives.length) % oracleDirectives.length);
  };

  return (
    <section className="glass glow-violet relative flex h-full flex-col overflow-hidden p-6">
      {/* Violet halo behind the header */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 right-0 h-48 w-48 rounded-full bg-[#8b5cf6]/20 blur-3xl"
      />

      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#8b5cf6]/40 bg-[#8b5cf6]/15">
            <Sparkles className="h-4 w-4 text-[#c4b5fd]" />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight">
              Attribution Oracle
            </h2>
            <p className="text-[11px] text-zinc-500">Prescriptive engine · Tier 1</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Previous directive"
            onClick={() => step(-1)}
            className="h-7 w-7 text-zinc-500 hover:text-zinc-200"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-[family-name:var(--font-mono)] text-[11px] text-zinc-500">
            {index + 1}/{oracleDirectives.length}
          </span>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Next directive"
            onClick={() => step(1)}
            className="h-7 w-7 text-zinc-500 hover:text-zinc-200"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Directive */}
      <div className="mt-5 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="border-[#8b5cf6]/40 bg-[#8b5cf6]/10 text-[#c4b5fd] hover:bg-[#8b5cf6]/10">
            +{directive.projectedLiftPct}% projected lift
          </Badge>
          <Badge
            variant="outline"
            className="border-white/10 bg-white/[0.04] text-zinc-400"
          >
            {directive.confidencePct}% confidence
          </Badge>
        </div>

        <p className="mt-3 text-[15px] font-medium leading-snug text-zinc-100">
          {directive.headline}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          {directive.detail}
        </p>

        <div className="mt-4 rounded-xl border border-white/[0.06] bg-zinc-950/60 p-3">
          <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-600">
            Contract call
          </p>
          <p className="mt-1 break-all font-[family-name:var(--font-mono)] text-xs text-[#4f8fff]">
            {directive.contractMethod}
          </p>
          <p className="mt-1.5 flex items-center gap-1 font-[family-name:var(--font-mono)] text-[11px] text-zinc-500">
            <Fuel className="h-3 w-3" /> {directive.gasEstimate}
          </p>
        </div>
      </div>

      {/* Execute */}
      <Button
        onClick={execute}
        disabled={tx === "signing"}
        className={cn(
          "mt-5 w-full gap-2 border-0 font-medium text-white transition-all",
          tx === "confirmed"
            ? "bg-emerald-500 hover:bg-emerald-500"
            : "bg-gradient-to-r from-[#4f8fff] to-[#8b5cf6] hover:opacity-90",
        )}
      >
        {tx === "idle" && (
          <>
            <Zap className="h-4 w-4" /> Execute smart contract
          </>
        )}
        {tx === "signing" && (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Awaiting wallet signature…
          </>
        )}
        {tx === "confirmed" && (
          <>
            <Check className="h-4 w-4" /> Executed · reallocation live
          </>
        )}
      </Button>
    </section>
  );
}
