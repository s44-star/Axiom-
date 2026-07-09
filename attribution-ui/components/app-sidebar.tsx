// components/app-sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Hexagon,
  LayoutDashboard,
  Server,
  Wallet,
  ShieldCheck,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const nav = [
  {
    href: "/enterprise",
    label: "Enterprise",
    sub: "Prescriptive dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/nodes",
    label: "Node Operator",
    sub: "Validation engine",
    icon: Server,
  },
] as const;

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl md:flex">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="relative">
          <Hexagon className="h-8 w-8 text-[#4f8fff]" strokeWidth={1.5} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-gradient-to-br from-[#4f8fff] to-[#8b5cf6]" />
          </div>
        </div>
        <div>
          <p className="font-[family-name:var(--font-display)] text-base font-semibold tracking-tight">
            Axiom Protocol
          </p>
          <p className="text-[11px] text-zinc-500">Attribution, verified.</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3">
        {nav.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
                active
                  ? "border border-white/10 bg-white/[0.06] text-zinc-50"
                  : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200",
              )}
            >
              <Icon
                className={cn(
                  "h-4.5 w-4.5 shrink-0",
                  active ? "text-[#4f8fff]" : "text-zinc-500 group-hover:text-zinc-300",
                )}
              />
              <span className="min-w-0">
                <span className="block text-sm font-medium leading-tight">
                  {item.label}
                </span>
                <span className="block truncate text-[11px] text-zinc-500">
                  {item.sub}
                </span>
              </span>
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#4f8fff] shadow-[0_0_8px_#4f8fff]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer: stake tier + wallet */}
      <div className="space-y-3 border-t border-white/[0.06] p-4">
        <div className="glass flex items-center gap-2.5 px-3 py-2.5">
          <ShieldCheck className="h-4 w-4 shrink-0 text-[#8b5cf6]" />
          <div className="min-w-0">
            <p className="text-xs font-medium text-zinc-200">Tier 1 access</p>
            <p className="truncate text-[11px] text-zinc-500">
              84.25M AXM staked
            </p>
          </div>
          <Badge
            variant="outline"
            className="ml-auto border-[#8b5cf6]/40 bg-[#8b5cf6]/10 text-[10px] text-[#c4b5fd]"
          >
            Oracle
          </Badge>
        </div>

        <Button
          variant="outline"
          className="w-full justify-start gap-2 border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] hover:text-zinc-100"
        >
          <Wallet className="h-4 w-4 text-[#4f8fff]" />
          <span className="font-[family-name:var(--font-mono)] text-xs">
            0x7A3f…9C1e
          </span>
          <Settings className="ml-auto h-3.5 w-3.5 text-zinc-500" />
        </Button>
      </div>
    </aside>
  );
}
