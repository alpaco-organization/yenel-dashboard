"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, Globe2, TrendingUp } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { FilterBar } from "@/components/filters/filter-bar";
import { KpiCard } from "@/components/cards/kpi-card";
import { GlassCard } from "@/components/cards/glass-card";
import { InsightPanel } from "@/components/ai-insights/insight-panel";
import { LoadingState, ErrorState } from "@/components/cards/states";
import { ChartTooltip, axisProps, chartPalette } from "@/components/charts/chart-kit";
import { api } from "@/lib/api";
import { useAsyncData } from "@/lib/use-async-data";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const kpis = useAsyncData(() => api.getDashboardKpis());
  const financials = useAsyncData(() => api.getMonthlyFinancials());
  const channels = useAsyncData(() => api.getChannelSales());
  const weekly = useAsyncData(() => api.getWeeklyProduction());

  return (
    <AppShell
      title="Ana Dashboard"
      subtitle="Şirket geneli anlık görünüm — Haziran 2026"
    >
      <div className="space-y-5">
        <FilterBar />

        {/* KPI Bento Grid */}
        {kpis.loading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="glass h-32 animate-pulse rounded-2xl" />
            ))}
          </div>
        )}
        {kpis.error && <ErrorState message={kpis.error} onRetry={kpis.refetch} />}
        {kpis.data && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.data.map((kpi, i) => (
              <KpiCard key={kpi.id} kpi={kpi} index={i} />
            ))}
          </div>
        )}

        {/* Bento: trend + AI + kanal */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <GlassCard
            title="Ciro & Net Kâr Trendi"
            subtitle="Son 12 ay, milyon TL"
            icon={TrendingUp}
            className="xl:col-span-2"
            delay={0.05}
          >
            {financials.loading && <LoadingState rows={5} />}
            {financials.error && (
              <ErrorState message={financials.error} onRetry={financials.refetch} />
            )}
            {financials.data && (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={financials.data} margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
                    <defs>
                      <linearGradient id="g-rev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="g-net" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34d399" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" {...axisProps} />
                    <YAxis
                      {...axisProps}
                      tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(0)}M`}
                    />
                    <Tooltip
                      content={
                        <ChartTooltip
                          formatter={(v) => formatCurrency(v, "TL", true)}
                        />
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      name="Ciro"
                      stroke="#38bdf8"
                      strokeWidth={2}
                      fill="url(#g-rev)"
                    />
                    <Area
                      type="monotone"
                      dataKey="netProfit"
                      name="Net Kâr"
                      stroke="#34d399"
                      strokeWidth={2}
                      fill="url(#g-net)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </GlassCard>

          <InsightPanel limit={5} />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <GlassCard
            title="Satış Kanalı Dağılımı"
            subtitle="Yurt içi / İhracat / ABD ofisi"
            icon={Globe2}
            iconClassName="bg-violet-500/10 text-violet-400"
            delay={0.1}
          >
            {channels.loading && <LoadingState rows={4} />}
            {channels.error && (
              <ErrorState message={channels.error} onRetry={channels.refetch} />
            )}
            {channels.data && (
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <div className="h-56 w-full sm:w-1/2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={channels.data}
                        dataKey="revenue"
                        nameKey="channel"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={4}
                        strokeWidth={0}
                      >
                        {channels.data.map((_, i) => (
                          <Cell key={i} fill={chartPalette[i]} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={
                          <ChartTooltip
                            formatter={(v) => formatCurrency(v, "TL", true)}
                          />
                        }
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full space-y-3 sm:w-1/2">
                  {channels.data.map((c, i) => (
                    <div key={c.channel} className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-sm text-ink-300">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: chartPalette[i] }}
                        />
                        {c.channel}
                      </span>
                      <div className="text-right">
                        <p className="text-sm font-semibold tabular-nums text-ink-100">
                          {formatCurrency(c.revenue, "TL", true)}
                        </p>
                        <p className="text-[11px] tabular-nums text-ink-500">
                          %{c.share} — {c.orderCount} sipariş
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </GlassCard>

          <GlassCard
            title="Haftalık Üretim"
            subtitle="Üretim tipi bazında, adet"
            icon={Activity}
            iconClassName="bg-mint-500/10 text-mint-400"
            delay={0.15}
          >
            {weekly.loading && <LoadingState rows={4} />}
            {weekly.error && (
              <ErrorState message={weekly.error} onRetry={weekly.refetch} />
            )}
            {weekly.data && (
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weekly.data} margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="week" {...axisProps} />
                    <YAxis
                      {...axisProps}
                      tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                      content={<ChartTooltip />}
                    />
                    <Bar dataKey="baski" name="Baskı" stackId="a" fill={chartPalette[0]} radius={[0, 0, 0, 0]} />
                    <Bar dataKey="dokuma" name="Dokuma" stackId="a" fill={chartPalette[1]} />
                    <Bar dataKey="matbaa" name="Matbaa" stackId="a" fill={chartPalette[2]} />
                    <Bar dataKey="kutu" name="Kutu" stackId="a" fill={chartPalette[3]} />
                    <Bar dataKey="aksesuar" name="Aksesuar" stackId="a" fill={chartPalette[4]} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </AppShell>
  );
}
