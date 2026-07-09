# Axiom Protocol — Frontend (mock-data iteration)

Drop-in files for a Next.js 16 App Router project. Two views: `/enterprise` (prescriptive CMO dashboard) and `/nodes` (node operator engine).

## File map

```
app/
  layout.tsx            root shell: fonts, ambient grid/glows, sidebar
  globals.css           Tailwind v4 entry + glass / pulse / grid utilities
  page.tsx              redirects / → /enterprise
  enterprise/page.tsx
  nodes/page.tsx
components/
  app-sidebar.tsx       nav + stake tier + wallet chip
  enterprise/
    tvl-hero.tsx        Total Token Value Locked hero + 7d sparkline
    cognitive-funnel.tsx  multi-touch cognitive journey (Recharts Funnel)
    attribution-oracle.tsx prescriptive directives + mock contract execution
    channel-table.tsx   channel cognitive scores with trend sparklines
  nodes/
    speed-metrics.tsx   live TPS / uptime / latency (interval-driven mock feed)
    reward-stream.tsx   live token reward ticker
    hardware-status.tsx pulsing mesh-connection indicator + agent details
lib/
  mock-data.ts          all mock data + formatters (swap for Supabase queries)
```

## Setup

```bash
npx create-next-app@latest axiom --typescript --tailwind --app
cd axiom
npm i recharts lucide-react
npx shadcn@latest init
npx shadcn@latest add button badge
```

Then copy these files over the generated `app/`, `components/`, `lib/` directories. `cn` comes from shadcn's generated `lib/utils.ts` — keep that file.

Notes:
- `globals.css` assumes Tailwind v4 (`@import "tailwindcss"`). On v3, swap in the three `@tailwind` directives; the custom classes work unchanged.
- Recharts renders client-side only, so every chart component is `"use client"`. Pages stay server components.
- Dark mode is forced via `className="dark"` on `<html>`.

## Wiring Supabase later

Each mock export in `lib/mock-data.ts` maps to one query:

- `tvl`, `channels`, `oracleDirectives` → server-side fetch in the page with `createServerClient` from `@supabase/ssr`, passed down as props.
- `speed-metrics.tsx` and `reward-stream.tsx` currently use `setInterval` mocks — replace the interval body with a `supabase.channel(...).on("postgres_changes", ...)` Realtime subscription; the state shape stays identical.
- The Oracle's `execute()` is a fake wallet round-trip (`signing → confirmed`) — replace with your wagmi/viem `writeContract` call.
