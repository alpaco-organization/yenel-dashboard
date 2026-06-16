"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  Award,
  BadgePercent,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { GlassCard } from "@/components/cards/glass-card";
import { StatBadge } from "@/components/cards/stat-badge";
import { ErrorState } from "@/components/cards/states";
import { DetailDrawer, DrawerField } from "@/components/drawers/detail-drawer";
import { ChartTooltip, axisProps } from "@/components/charts/chart-kit";
import { api } from "@/lib/api";
import { useAsyncData } from "@/lib/use-async-data";
import { calculateCommission } from "@/lib/commission";
import { cn, formatCurrency, formatPercent } from "@/lib/utils";
import type { CommissionResult } from "@/types";

const months = ["Oca", "Şub", "Mar", "Nis", "May", "Haz"];

function tierTone(achievementRate: number): "green" | "amber" | "red" | "blue" {
  if (achievementRate >= 120) return "green";
  if (achievementRate >= 100) return "blue";
  if (achievementRate >= 80) return "amber";
  return "red";
}

export default function RepresentativesPage() {
  const reps = useAsyncData(() => api.getRepresentatives());
  const [selected, setSelected] = useState<CommissionResult | null>(null);

  const commissions = reps.data
    ? reps.data
        .map(calculateCommission)
        .sort((a, b) => b.achievementRate - a.achievementRate)
    : [];

  const totals = commissions.length
    ? {
        revenue: commissions.reduce((s, c) => s + c.representative.revenue, 0),
        collections: commissions.reduce((s, c) => s + c.representative.collections, 0),
        netCommission: commissions.reduce((s, c) => s + c.netCommission, 0),
        newCustomers: commissions.reduce((s, c) => s + c.representative.newCustomers, 0),
      }
    : null;

  return (
    <AppShell title="Temsilci & Prim" subtitle="Hedef gerçekleşme, tahsilat başarısı ve prim hakedişleri">
      <div className="space-y-5">
        {totals && (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { label: "Toplam Ciro", value: formatCurrency(totals.revenue, "TL", true), icon: TrendingUp, color: "bg-electric-500/10 text-electric-400" },
              { label: "Toplam Tahsilat", value: formatCurrency(totals.collections, "TL", true), icon: Target, color: "bg-mint-500/10 text-mint-400" },
              { label: "Toplam Net Prim", value: formatCurrency(totals.netCommission, "TL", true), icon: BadgePercent, color: "bg-violet-500/10 text-violet-400" },
              { label: "Yeni Cari", value: `${totals.newCustomers} adet`, icon: Users, color: "bg-amber-500/10 text-amber-400" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <GlassCard key={item.label} delay={i * 0.04} contentClassName="p-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", item.color)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[11px] uppercase tracking-wide text-ink-500">
                        {item.label}
                      </p>
                      <p className="text-lg font-semibold tabular-nums text-ink-100">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        )}

        {/* Prim kuralı bilgi şeridi */}
        <GlassCard contentClassName="p-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink-400">
            <span className="font-semibold uppercase tracking-wide text-ink-300">
              Prim Kuralı:
            </span>
            <span>Hedef &lt; %80 → <span className="text-rose-400">prim yok</span></span>
            <span>%80-100 → <span className="text-amber-400">%0.5</span></span>
            <span>%100-120 → <span className="text-electric-300">%1.0</span></span>
            <span>%120+ → <span className="text-mint-400">%1.5</span></span>
            <span>Tahsilat &lt; %70 → <span className="text-rose-400">%30 kesinti</span></span>
          </div>
        </GlassCard>

        {reps.loading && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass h-72 animate-pulse rounded-2xl" />
            ))}
          </div>
        )}
        {reps.error && <ErrorState message={reps.error} onRetry={reps.refetch} />}

        {/* Temsilci kartları */}
        {commissions.length > 0 && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {commissions.map((c, i) => {
              const rep = c.representative;
              const chartData = rep.monthlyRevenue.map((v, mi) => ({
                month: months[mi],
                ciro: v,
              }));
              return (
                <GlassCard key={rep.id} delay={i * 0.05} contentClassName="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-electric-500/70 to-violet-500/70 text-sm font-semibold text-white">
                        {rep.name.split(" ").map((p) => p[0]).join("")}
                      </div>
                      <div>
                        <p className="flex items-center gap-1.5 text-sm font-semibold text-ink-100">
                          {rep.name}
                          {i === 0 && <Award className="h-4 w-4 text-amber-400" />}
                        </p>
                        <p className="text-[11px] text-ink-500">{rep.region}</p>
                      </div>
                    </div>
                    <StatBadge tone={tierTone(c.achievementRate)}>
                      Hedef %{c.achievementRate.toFixed(0)}
                    </StatBadge>
                  </div>

                  {/* Hedef bar */}
                  <div className="mt-4">
                    <div className="mb-1 flex justify-between text-[11px] text-ink-500">
                      <span>
                        Ciro {formatCurrency(rep.revenue, "TL", true)}
                      </span>
                      <span>Hedef {formatCurrency(rep.target, "TL", true)}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/8">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          c.achievementRate >= 100
                            ? "bg-gradient-to-r from-mint-500 to-mint-400"
                            : c.achievementRate >= 80
                              ? "bg-gradient-to-r from-amber-500 to-amber-400"
                              : "bg-gradient-to-r from-rose-500 to-rose-400"
                        )}
                        style={{ width: `${Math.min(c.achievementRate, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Mini trend */}
                  <div className="mt-3 h-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
                        <Line
                          type="monotone"
                          dataKey="ciro"
                          stroke="#38bdf8"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Tooltip content={<ChartTooltip formatter={(v) => `${v}M TL`} />} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-white/[0.03] p-2">
                      <p className="text-[10px] uppercase text-ink-500">Tahsilat</p>
                      <p className={cn("text-sm font-semibold tabular-nums", rep.collectionRate < 70 ? "text-rose-400" : "text-ink-100")}>
                        %{rep.collectionRate}
                      </p>
                    </div>
                    <div className="rounded-lg bg-white/[0.03] p-2">
                      <p className="text-[10px] uppercase text-ink-500">Yeni Cari</p>
                      <p className="text-sm font-semibold tabular-nums text-ink-100">
                        {rep.newCustomers}
                      </p>
                    </div>
                    <div className="rounded-lg bg-white/[0.03] p-2">
                      <p className="text-[10px] uppercase text-ink-500">Net Prim</p>
                      <p className="text-sm font-semibold tabular-nums text-mint-400">
                        {c.netCommission > 0
                          ? formatCurrency(c.netCommission, "TL", true)
                          : "—"}
                      </p>
                    </div>
                  </div>

                  {c.hasOverdueWarning && (
                    <div className="mt-3 flex items-center gap-2 rounded-lg border border-amber-500/25 bg-amber-500/[0.07] px-3 py-2 text-[11px] text-amber-300">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                      Gecikmiş bakiye yüksek: {formatCurrency(rep.overdueBalance, "TL", true)}
                    </div>
                  )}

                  <button
                    onClick={() => setSelected(c)}
                    className="mt-4 w-full rounded-xl border border-white/10 py-2 text-xs font-medium text-ink-300 transition hover:border-electric-500/40 hover:bg-electric-500/10 hover:text-electric-300"
                  >
                    Prim Detayını Gör
                  </button>
                </GlassCard>
              );
            })}
          </div>
        )}

        {/* Karşılaştırma grafiği */}
        {commissions.length > 0 && (
          <GlassCard
            title="Temsilci Performans Karşılaştırması"
            subtitle="Ciro, tahsilat ve hedef"
            icon={Users}
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={commissions.map((c) => ({
                    name: c.representative.name.split(" ")[0],
                    ciro: c.representative.revenue,
                    tahsilat: c.representative.collections,
                    hedef: c.representative.target,
                  }))}
                  margin={{ top: 8, right: 8, bottom: 0, left: -8 }}
                  barGap={3}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="name" {...axisProps} />
                  <YAxis {...axisProps} tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(0)}M`} />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.04)" }}
                    content={<ChartTooltip formatter={(v) => formatCurrency(v, "TL", true)} />}
                  />
                  <Bar dataKey="ciro" name="Ciro" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="tahsilat" name="Tahsilat" fill="#34d399" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="hedef" name="Hedef" fill="#3d4d73" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Tahsilat oranı temsilci bazında */}
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/8 pt-4 sm:grid-cols-3 xl:grid-cols-6">
              {commissions.map((c) => (
                <div key={c.representative.id} className="text-center">
                  <p className="truncate text-[11px] text-ink-500">
                    {c.representative.name}
                  </p>
                  <p
                    className={cn(
                      "text-base font-semibold tabular-nums",
                      c.representative.collectionRate >= 85
                        ? "text-mint-400"
                        : c.representative.collectionRate >= 70
                          ? "text-amber-400"
                          : "text-rose-400"
                    )}
                  >
                    %{c.representative.collectionRate}
                  </p>
                  <p className="text-[10px] text-ink-500">tahsilat oranı</p>
                </div>
              ))}
            </div>
          </GlassCard>
        )}
      </div>

      {/* Prim detay drawer */}
      <DetailDrawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.representative.name ?? ""}
        subtitle="Prim hakediş detayı"
      >
        {selected && (
          <div>
            <DrawerField label="Bölge" value={selected.representative.region} />
            <DrawerField
              label="Ciro"
              value={formatCurrency(selected.representative.revenue, "TL")}
            />
            <DrawerField
              label="Hedef"
              value={formatCurrency(selected.representative.target, "TL")}
            />
            <DrawerField
              label="Hedef Gerçekleşme"
              value={formatPercent(selected.achievementRate)}
              valueClassName={
                selected.achievementRate >= 100 ? "text-mint-400" : "text-amber-400"
              }
            />
            <DrawerField label="Prim Dilimi" value={selected.tier} />
            <DrawerField
              label="Brüt Prim"
              value={formatCurrency(selected.grossCommission, "TL")}
            />
            <DrawerField
              label="Tahsilat Oranı"
              value={`%${selected.representative.collectionRate}`}
              valueClassName={
                selected.representative.collectionRate < 70 ? "text-rose-400" : ""
              }
            />
            <DrawerField
              label="Tahsilat Kesintisi"
              value={
                selected.collectionPenalty > 0
                  ? `- ${formatCurrency(selected.collectionPenalty, "TL")}`
                  : "Yok"
              }
              valueClassName={selected.collectionPenalty > 0 ? "text-rose-400" : "text-mint-400"}
            />
            <DrawerField
              label="İade / Hata Etkisi"
              value={formatCurrency(selected.representative.returnImpact, "TL")}
              valueClassName="text-amber-400"
            />
            <DrawerField
              label="Gecikmiş Bakiye"
              value={formatCurrency(selected.representative.overdueBalance, "TL")}
              valueClassName={selected.hasOverdueWarning ? "text-rose-400" : ""}
            />
            <DrawerField label="Yeni Cari" value={`${selected.representative.newCustomers} adet`} />

            <div className="mt-4 rounded-xl bg-gradient-to-r from-mint-500/15 to-electric-500/15 p-4 text-center">
              <p className="text-[11px] uppercase tracking-wide text-mint-400">
                Net Prim Hakedişi
              </p>
              <p className="mt-1 text-2xl font-semibold tabular-nums text-mint-300">
                {selected.netCommission > 0
                  ? formatCurrency(selected.netCommission, "TL")
                  : "Prim yok"}
              </p>
            </div>

            {selected.hasOverdueWarning && (
              <div className="mt-3 flex items-start gap-2 rounded-xl border border-amber-500/25 bg-amber-500/[0.07] p-3 text-xs leading-relaxed text-amber-200">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                Gecikmiş bakiye cironun %15&apos;ini aşıyor. Tahsilat planı
                oluşturulması önerilir.
              </div>
            )}
          </div>
        )}
      </DetailDrawer>
    </AppShell>
  );
}
