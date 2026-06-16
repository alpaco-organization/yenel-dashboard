"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  CalendarRange,
  FileBarChart,
  FileSpreadsheet,
  FileText,
  Lightbulb,
  Mail,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { GlassCard } from "@/components/cards/glass-card";
import { KpiCard } from "@/components/cards/kpi-card";
import { StatBadge } from "@/components/cards/stat-badge";
import { LoadingState, ErrorState, EmptyState } from "@/components/cards/states";
import { ChartTooltip, axisProps } from "@/components/charts/chart-kit";
import { api } from "@/lib/api";
import { useAsyncData } from "@/lib/use-async-data";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import type { ReportDefinition, ReportType } from "@/types";

const reportTypes: ReportType[] = [
  "Haftalık Yönetim Raporu",
  "Aylık Yönetim Raporu",
  "Finans Raporu",
  "Üretim Raporu",
  "Stok Raporu",
  "Satış & Cari Raporu",
  "Kalite Raporu",
  "Operasyon Raporu",
];

function ExportButton({
  icon: Icon,
  label,
  message,
}: {
  icon: typeof FileText;
  label: string;
  message: string;
}) {
  return (
    <button
      onClick={() => alert(message)}
      className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-3.5 py-2 text-xs font-medium text-ink-200 transition hover:border-electric-500/40 hover:bg-electric-500/10 hover:text-electric-300"
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

export default function ReportsPage() {
  const reportsQuery = useAsyncData(() => api.getReports());
  const kpis = useAsyncData(() => api.getDashboardKpis());
  const financials = useAsyncData(() => api.getMonthlyFinancials());
  const weekly = useAsyncData(() => api.getWeeklyProduction());
  const [activeType, setActiveType] = useState<ReportType>("Haftalık Yönetim Raporu");

  const activeReport: ReportDefinition | undefined = reportsQuery.data?.find(
    (r) => r.type === activeType
  );

  return (
    <AppShell title="Raporlar" subtitle="Haftalık ve aylık yönetim raporları — dışa aktarım hazır">
      <div className="space-y-5">
        {/* Rapor tipi seçimi */}
        <GlassCard contentClassName="p-3">
          <div className="flex flex-wrap gap-1.5">
            {reportTypes.map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={cn(
                  "rounded-xl px-3.5 py-2 text-xs font-medium transition",
                  activeType === t
                    ? "bg-electric-500/15 text-electric-300 shadow-[inset_0_0_0_1px_rgb(14_165_233_/_0.3)]"
                    : "text-ink-400 hover:bg-white/5 hover:text-ink-200"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </GlassCard>

        {reportsQuery.loading && <LoadingState rows={6} />}
        {reportsQuery.error && (
          <ErrorState message={reportsQuery.error} onRetry={reportsQuery.refetch} />
        )}
        {reportsQuery.data && !activeReport && (
          <EmptyState message="Bu rapor tipi için henüz rapor üretilmedi." />
        )}

        {activeReport && (
          <motion.div
            key={activeReport.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
          >
            {/* Rapor başlığı + export */}
            <GlassCard contentClassName="p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500/30 to-violet-500/30">
                    <FileBarChart className="h-5 w-5 text-electric-300" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight text-ink-100">
                      {activeReport.type}
                    </h2>
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-500">
                      <CalendarRange className="h-3.5 w-3.5" />
                      {activeReport.period}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <ExportButton
                    icon={FileText}
                    label="PDF İndir"
                    message="PDF raporu hazırlanıyor (demo)."
                  />
                  <ExportButton
                    icon={FileSpreadsheet}
                    label="Excel İndir"
                    message="Excel raporu hazırlanıyor (demo)."
                  />
                  <ExportButton
                    icon={Mail}
                    label="Mail Gönder"
                    message="Rapor yönetim listesine e-posta ile gönderildi (demo)."
                  />
                </div>
              </div>
            </GlassCard>

            {/* Yönetici özeti */}
            <GlassCard
              title="Yönetici Özeti"
              subtitle="Rule-based otomatik özet"
              icon={Sparkles}
              iconClassName="bg-violet-500/10 text-violet-400"
            >
              <p className="text-sm leading-relaxed text-ink-200">
                {activeReport.summary}
              </p>
            </GlassCard>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
              {/* Gelişmeler */}
              <GlassCard
                title="En Önemli Gelişmeler"
                icon={TrendingUp}
                iconClassName="bg-mint-500/10 text-mint-400"
              >
                <ul className="space-y-2.5">
                  {activeReport.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] leading-snug text-ink-200">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-mint-400" />
                      {h}
                    </li>
                  ))}
                </ul>
              </GlassCard>

              {/* Riskler */}
              <GlassCard
                title="Riskler"
                icon={AlertTriangle}
                iconClassName="bg-rose-500/10 text-rose-400"
              >
                <ul className="space-y-2.5">
                  {activeReport.risks.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] leading-snug text-ink-200">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                      {r}
                    </li>
                  ))}
                </ul>
              </GlassCard>

              {/* Fırsatlar */}
              <GlassCard
                title="Fırsatlar"
                icon={Lightbulb}
                iconClassName="bg-amber-500/10 text-amber-400"
              >
                <ul className="space-y-2.5">
                  {activeReport.opportunities.map((o, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] leading-snug text-ink-200">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                      {o}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>

            {/* KPI kartları */}
            {kpis.data && (
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-500">
                  Dönem KPI&apos;ları
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {kpis.data.slice(0, 8).map((kpi, i) => (
                    <KpiCard key={kpi.id} kpi={kpi} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* Grafikler */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              <GlassCard title="Ciro Trendi" subtitle="Son 12 ay" icon={TrendingUp}>
                {financials.data && (
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={financials.data} margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
                        <defs>
                          <linearGradient id="g-rep-rev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.35} />
                            <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" {...axisProps} />
                        <YAxis {...axisProps} tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(0)}M`} />
                        <Tooltip content={<ChartTooltip formatter={(v) => formatCurrency(v, "TL", true)} />} />
                        <Area type="monotone" dataKey="revenue" name="Ciro" stroke="#38bdf8" strokeWidth={2} fill="url(#g-rep-rev)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </GlassCard>

              <GlassCard
                title="Haftalık Üretim & Fire"
                subtitle="Son 6 hafta"
                icon={FileBarChart}
                iconClassName="bg-mint-500/10 text-mint-400"
              >
                {weekly.data && (
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weekly.data} margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="week" {...axisProps} />
                        <YAxis {...axisProps} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`} />
                        <Tooltip
                          cursor={{ fill: "rgba(255,255,255,0.04)" }}
                          content={<ChartTooltip formatter={(v) => formatNumber(v)} />}
                        />
                        <Bar dataKey="dokuma" name="Dokuma" stackId="a" fill="#34d399" />
                        <Bar dataKey="baski" name="Baskı" stackId="a" fill="#38bdf8" />
                        <Bar dataKey="matbaa" name="Matbaa" stackId="a" fill="#a78bfa" />
                        <Bar dataKey="defects" name="Fire" fill="#fb7185" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </GlassCard>
            </div>

            {/* Detay tablo */}
            <GlassCard
              title="Detay Tablo — Aylık Finansal Özet"
              subtitle="Rapor ekinde yer alan veri seti"
              icon={FileSpreadsheet}
            >
              {financials.data && (
                <div className="overflow-x-auto rounded-xl border border-white/8">
                  <table className="w-full min-w-[720px] text-sm">
                    <thead>
                      <tr className="border-b border-white/8 bg-white/[0.03] text-left text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                        <th className="px-4 py-3">Ay</th>
                        <th className="px-4 py-3">Gelir</th>
                        <th className="px-4 py-3">Gider</th>
                        <th className="px-4 py-3">Brüt Kâr</th>
                        <th className="px-4 py-3">Net Kâr</th>
                        <th className="px-4 py-3">Tahsilat</th>
                        <th className="px-4 py-3">Marj</th>
                      </tr>
                    </thead>
                    <tbody>
                      {financials.data.slice(-6).map((m) => {
                        const margin = (m.netProfit / m.revenue) * 100;
                        return (
                          <tr key={m.month} className="border-b border-white/5 last:border-0">
                            <td className="px-4 py-3 font-medium text-ink-100">{m.month}</td>
                            <td className="px-4 py-3 tabular-nums text-ink-200">
                              {formatCurrency(m.revenue, "TL", true)}
                            </td>
                            <td className="px-4 py-3 tabular-nums text-rose-300">
                              {formatCurrency(m.expenses, "TL", true)}
                            </td>
                            <td className="px-4 py-3 tabular-nums text-ink-200">
                              {formatCurrency(m.grossProfit, "TL", true)}
                            </td>
                            <td className="px-4 py-3 tabular-nums text-mint-300">
                              {formatCurrency(m.netProfit, "TL", true)}
                            </td>
                            <td className="px-4 py-3 tabular-nums text-ink-200">
                              {formatCurrency(m.collections, "TL", true)}
                            </td>
                            <td className="px-4 py-3">
                              <StatBadge tone={margin >= 28 ? "green" : margin >= 22 ? "amber" : "red"}>
                                %{margin.toFixed(1)}
                              </StatBadge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </GlassCard>
          </motion.div>
        )}
      </div>
    </AppShell>
  );
}
