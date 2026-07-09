// lib/mock-data.ts
// Mock data layer. Swap each export for a Supabase query (via @supabase/ssr)
// when wiring the backend — the shapes are designed to map 1:1 to table rows.

export type StakingTier = "Tier 1 — Oracle Access" | "Tier 2 — Standard" | "Unstaked";

export interface TvlSnapshot {
  totalStakedTokens: number;
  totalStakedUsd: number;
  change24hPct: number;
  stakerCount: number;
  tier: StakingTier;
  history: { day: string; usd: number }[];
}

export const tvl: TvlSnapshot = {
  totalStakedTokens: 84_250_000,
  totalStakedUsd: 128_640_000,
  change24hPct: 3.42,
  stakerCount: 1_284,
  tier: "Tier 1 — Oracle Access",
  history: [
    { day: "Jul 02", usd: 109.2 },
    { day: "Jul 03", usd: 112.8 },
    { day: "Jul 04", usd: 111.4 },
    { day: "Jul 05", usd: 117.9 },
    { day: "Jul 06", usd: 121.3 },
    { day: "Jul 07", usd: 124.1 },
    { day: "Jul 08", usd: 126.7 },
    { day: "Jul 09", usd: 128.6 },
  ],
};

export interface FunnelStage {
  name: string;
  value: number;
  fill: string;
  conversionPct: number | null; // vs previous stage
}

export const cognitiveFunnel: FunnelStage[] = [
  { name: "Impression",         value: 2_400_000, fill: "#4f8fff", conversionPct: null },
  { name: "Cognitive Encoding", value: 1_120_000, fill: "#6d7cff", conversionPct: 46.7 },
  { name: "Behavioral Trigger", value: 386_000,   fill: "#8b5cf6", conversionPct: 34.5 },
  { name: "Conversion",         value: 92_400,    fill: "#a855f7", conversionPct: 23.9 },
];

export interface ChannelRow {
  channel: string;
  spendUsd: number;
  cognitiveScore: number; // 0–100, proprietary friction-adjusted score
  cpaUsd: number;
  trend: number[]; // sparkline
}

export const channels: ChannelRow[] = [
  { channel: "CTV / Streaming",   spendUsd: 412_000, cognitiveScore: 87, cpaUsd: 18.4, trend: [61, 64, 70, 74, 79, 83, 87] },
  { channel: "Paid Social",       spendUsd: 638_000, cognitiveScore: 54, cpaUsd: 41.2, trend: [71, 68, 66, 61, 58, 55, 54] },
  { channel: "Programmatic Disp", spendUsd: 290_000, cognitiveScore: 43, cpaUsd: 55.8, trend: [50, 49, 47, 46, 44, 44, 43] },
  { channel: "Retail Media",      spendUsd: 184_000, cognitiveScore: 78, cpaUsd: 22.1, trend: [60, 63, 66, 71, 73, 76, 78] },
  { channel: "Search",            spendUsd: 505_000, cognitiveScore: 69, cpaUsd: 29.6, trend: [66, 66, 67, 68, 68, 69, 69] },
];

export interface OracleDirective {
  id: string;
  headline: string;
  detail: string;
  projectedLiftPct: number;
  confidencePct: number;
  contractMethod: string;
  gasEstimate: string;
}

export const oracleDirectives: OracleDirective[] = [
  {
    id: "dir-0x9f2a",
    headline: "Siphon 14% of budget from Paid Social to CTV / Streaming",
    detail:
      "Multi-touch decomposition shows Paid Social over-indexed on impressions that never reach Behavioral Trigger. CTV cohorts clear cognitive friction 2.3× faster at equivalent CPM.",
    projectedLiftPct: 11.8,
    confidencePct: 94,
    contractMethod: "reallocateBudget(0x5oc1al, 0xC7V, 1400)",
    gasEstimate: "~0.0041 ETH",
  },
  {
    id: "dir-0x77c1",
    headline: "Raise Retail Media frequency cap from 3 to 5 for encoded cohorts",
    detail:
      "Users past the Cognitive Encoding stage show no friction penalty up to 5 exposures. Current cap truncates the highest-converting sequence in the journey graph.",
    projectedLiftPct: 4.2,
    confidencePct: 88,
    contractMethod: "setFrequencyCap(0xR3ta1l, 5)",
    gasEstimate: "~0.0018 ETH",
  },
  {
    id: "dir-0x31be",
    headline: "Pause Programmatic Display creative set #C-114 for 72h",
    detail:
      "Creative #C-114 generates negative cognitive-score drift (−7 in 7 days) and is suppressing downstream Behavioral Triggers across shared audiences.",
    projectedLiftPct: 2.9,
    confidencePct: 81,
    contractMethod: "pauseCreative(0xC114, 259200)",
    gasEstimate: "~0.0012 ETH",
  },
];

// ---------------- Node operator ----------------

export interface NodeMetrics {
  tps: number;
  uptimePct: number;
  latencyMs: number;
  peers: number;
  epoch: number;
  region: string;
  agentVersion: string;
  syncPct: number;
}

export const nodeMetrics: NodeMetrics = {
  tps: 14_382,
  uptimePct: 99.987,
  latencyMs: 11.4,
  peers: 47,
  epoch: 20_481,
  region: "eu-central / Frankfurt",
  agentVersion: "v2.7.1",
  syncPct: 100,
};

export interface RewardEvent {
  id: string;
  batchId: string;
  records: number;
  tokens: number;
  latencyMs: number;
  ts: string; // HH:MM:SS
}

// Seed events; the live ticker component generates new ones on an interval.
export const seedRewards: RewardEvent[] = [
  { id: "r1", batchId: "0x8a3f…c21e", records: 48_112, tokens: 12.4402, latencyMs: 9.8,  ts: "14:02:11" },
  { id: "r2", batchId: "0x1bd9…774a", records: 51_006, tokens: 13.1811, latencyMs: 10.2, ts: "14:02:07" },
  { id: "r3", batchId: "0xe401…09bc", records: 44_871, tokens: 11.6023, latencyMs: 12.1, ts: "14:02:03" },
  { id: "r4", batchId: "0x66c2…f8d0", records: 49_930, tokens: 12.9110, latencyMs: 9.1,  ts: "14:01:59" },
];

export const fmt = {
  compact: (n: number) =>
    Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n),
  usd: (n: number) =>
    Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n),
  int: (n: number) => Intl.NumberFormat("en-US").format(Math.round(n)),
};
