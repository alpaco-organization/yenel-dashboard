"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import type { KpiMetric } from "@/types";
import { cn, formatCurrency, formatNumber, statusColors } from "@/lib/utils";

function formatKpiValue(kpi: KpiMetric): string {
  switch (kpi.unit) {
    case "TL":
      return formatCurrency(kpi.value, "TL", true);
    case "USD":
      return formatCurrency(kpi.value, "USD", true);
    case "EUR":
      return formatCurrency(kpi.value, "EUR", true);
    case "%":
      return `%${kpi.value.toLocaleString("tr-TR", { maximumFractionDigits: 2 })}`;
    case "lt":
      return `${formatNumber(kpi.value, true)} lt`;
    default:
      return formatNumber(kpi.value, true);
  }
}

export function KpiCard({ kpi, index = 0 }: { kpi: KpiMetric; index?: number }) {
  // invertedTrend: artış kötü (gider, hata oranı). Renk buna göre seçilir.
  const isPositiveChange = kpi.invertedTrend
    ? kpi.changePercent <= 0
    : kpi.changePercent >= 0;
  const colors = statusColors[kpi.status];
  const sparkData = kpi.sparkline.map((v, i) => ({ i, v }));
  const sparkColor = isPositiveChange ? "#34d399" : "#fb7185";
  const TrendIcon =
    kpi.changePercent === 0
      ? Minus
      : kpi.changePercent > 0
        ? ArrowUpRight
        : ArrowDownRight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="glass group relative overflow-hidden rounded-2xl p-4"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-medium uppercase tracking-wide text-ink-500">
          {kpi.label}
        </p>
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize",
            colors.bg,
            colors.text
          )}
        >
          <span className={cn("h-1 w-1 rounded-full", colors.dot)} />
          {kpi.status}
        </span>
      </div>

      <div className="mt-2 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-xl font-semibold tabular-nums tracking-tight text-ink-100 sm:text-2xl">
            {formatKpiValue(kpi)}
          </p>
          <p
            className={cn(
              "mt-1 inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
              isPositiveChange ? "text-mint-400" : "text-rose-400"
            )}
          >
            <TrendIcon className="h-3.5 w-3.5" />
            {kpi.changePercent > 0 ? "+" : ""}
            {kpi.changePercent.toLocaleString("tr-TR", { maximumFractionDigits: 1 })}%
            <span className="ml-1 font-normal text-ink-500">önceki dönem</span>
          </p>
        </div>

        <div className="h-12 w-20 shrink-0 opacity-80 transition-opacity group-hover:opacity-100">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={`spark-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={sparkColor} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={sparkColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={sparkColor}
                strokeWidth={1.5}
                fill={`url(#spark-${kpi.id})`}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* hover glow */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-electric-500/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
    </motion.div>
  );
}
