"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Info,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import type { AiInsight, InsightTone } from "@/types";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { useAsyncData } from "@/lib/use-async-data";
import { LoadingState, ErrorState, EmptyState } from "@/components/cards/states";

const toneConfig: Record<
  InsightTone,
  { icon: typeof TrendingUp; className: string; iconClass: string }
> = {
  positive: {
    icon: TrendingUp,
    className: "border-mint-500/20 bg-mint-500/[0.06]",
    iconClass: "bg-mint-500/15 text-mint-400",
  },
  negative: {
    icon: TrendingDown,
    className: "border-rose-500/20 bg-rose-500/[0.06]",
    iconClass: "bg-rose-500/15 text-rose-400",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-amber-500/20 bg-amber-500/[0.06]",
    iconClass: "bg-amber-500/15 text-amber-400",
  },
  info: {
    icon: Info,
    className: "border-electric-500/20 bg-electric-500/[0.06]",
    iconClass: "bg-electric-500/15 text-electric-400",
  },
};

export function InsightCard({ insight, index }: { insight: AiInsight; index: number }) {
  const config = toneConfig[insight.tone];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className={cn(
        "flex items-start gap-3 rounded-xl border p-3.5",
        config.className
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          config.iconClass
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-500">
            {insight.category}
          </span>
          {insight.metric && (
            <span className="shrink-0 text-xs font-semibold tabular-nums text-ink-200">
              {insight.metric}
            </span>
          )}
        </div>
        <p className="mt-1 text-[13px] leading-snug text-ink-200">
          {insight.text}
        </p>
      </div>
    </motion.div>
  );
}

export function InsightPanel({ limit }: { limit?: number }) {
  const { data, loading, error, refetch } = useAsyncData(() => api.getInsights());

  return (
    <div className="glass relative overflow-hidden rounded-2xl p-5">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/30 to-electric-500/30">
          <Sparkles className="h-4 w-4 text-violet-300" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-ink-100">AI Yönetici Özeti</h2>
          <p className="text-[11px] text-ink-500">Kural tabanlı otomatik analiz</p>
        </div>
      </div>

      {loading && <LoadingState rows={4} />}
      {error && <ErrorState message={error} onRetry={refetch} />}
      {!loading && !error && data?.length === 0 && (
        <EmptyState message="Bu dönem için içgörü üretilmedi." />
      )}
      {!loading && !error && data && data.length > 0 && (
        <div className="space-y-2.5">
          {(limit ? data.slice(0, limit) : data).map((insight, i) => (
            <InsightCard key={insight.id} insight={insight} index={i} />
          ))}
        </div>
      )}

      <div
        className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl"
        aria-hidden
      />
    </div>
  );
}
