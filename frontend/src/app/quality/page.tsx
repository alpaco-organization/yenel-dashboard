"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ColumnDef } from "@tanstack/react-table";
import {
  AlertOctagon,
  BadgeCheck,
  Factory,
  Flame,
  Leaf,
  MessageSquareWarning,
  ShieldCheck,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { GlassCard } from "@/components/cards/glass-card";
import { StatBadge, toneForStatus } from "@/components/cards/stat-badge";
import { LoadingState, ErrorState } from "@/components/cards/states";
import { DataTable } from "@/components/tables/data-table";
import { DetailDrawer, DrawerField } from "@/components/drawers/detail-drawer";
import { ChartTooltip, axisProps, chartPalette } from "@/components/charts/chart-kit";
import { api } from "@/lib/api";
import { useAsyncData } from "@/lib/use-async-data";
import { cn, formatCurrency, formatDate, formatNumber } from "@/lib/utils";
import type { CustomerComplaint } from "@/types";
import { sustainabilityKpis } from "@/data/quality";
import { productionLines } from "@/data/production";

const complaintColumns: ColumnDef<CustomerComplaint, unknown>[] = [
  { accessorKey: "customer", header: "Müşteri" },
  { accessorKey: "group", header: "Ürün Grubu" },
  { accessorKey: "reason", header: "Neden" },
  {
    accessorKey: "date",
    header: "Tarih",
    cell: ({ row }) => formatDate(row.original.date),
  },
  {
    accessorKey: "severity",
    header: "Önem",
    cell: ({ row }) => (
      <StatBadge tone={toneForStatus(row.original.severity)}>
        {row.original.severity}
      </StatBadge>
    ),
  },
  {
    accessorKey: "status",
    header: "Durum",
    cell: ({ row }) => (
      <StatBadge tone={toneForStatus(row.original.status)}>
        {row.original.status}
      </StatBadge>
    ),
  },
];

export default function QualityPage() {
  const reasons = useAsyncData(() => api.getDefectReasons());
  const groupStats = useAsyncData(() => api.getQualityGroupStats());
  const complaints = useAsyncData(() => api.getCustomerComplaints());
  const certificates = useAsyncData(() => api.getCertificates());
  const [selectedComplaint, setSelectedComplaint] =
    useState<CustomerComplaint | null>(null);

  const totals = groupStats.data
    ? {
        defective: groupStats.data.reduce((s, g) => s + g.defective, 0),
        produced: groupStats.data.reduce((s, g) => s + g.produced, 0),
        fireCost: groupStats.data.reduce((s, g) => s + g.fireCost, 0),
        worst: [...groupStats.data].sort((a, b) => b.defectRate - a.defectRate)[0],
      }
    : null;

  const worstLine = [...productionLines].sort(
    (a, b) => b.defectRate - a.defectRate
  )[0];

  const trendData = totals?.worst
    ? totals.worst.trend.map((v, i) => ({ week: `${18 + i}. Hf`, oran: v }))
    : [];

  return (
    <AppShell title="Kalite / Hatalılar" subtitle="Hata oranları, fire maliyeti ve müşteri şikayetleri">
      <div className="space-y-5">
        {totals && (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
            {[
              { label: "Toplam Hatalı Üretim", value: formatNumber(totals.defective, true), icon: AlertOctagon, color: "bg-rose-500/10 text-rose-400" },
              { label: "Hata Oranı", value: `%${((totals.defective / totals.produced) * 100).toFixed(2)}`, icon: ShieldCheck, color: "bg-amber-500/10 text-amber-400" },
              { label: "Fire Maliyeti", value: formatCurrency(totals.fireCost, "TL", true), icon: Flame, color: "bg-rose-500/10 text-rose-400" },
              { label: "En Riskli Grup", value: totals.worst.group, icon: AlertOctagon, color: "bg-violet-500/10 text-violet-400" },
              { label: "En Sorunlu Hat", value: worstLine.name.split(" ").slice(0, 2).join(" "), icon: Factory, color: "bg-amber-500/10 text-amber-400" },
              { label: "Müşteri Şikayeti", value: `${complaints.data?.length ?? "—"} adet`, icon: MessageSquareWarning, color: "bg-electric-500/10 text-electric-400" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <GlassCard key={item.label} delay={i * 0.03} contentClassName="p-4">
                  <div className={cn("mb-2 flex h-9 w-9 items-center justify-center rounded-xl", item.color)}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <p className="text-[10px] uppercase tracking-wide text-ink-500">
                    {item.label}
                  </p>
                  <p className="mt-0.5 truncate text-sm font-semibold text-ink-100">
                    {item.value}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {/* Hata nedenleri */}
          <GlassCard
            title="Hata Nedenleri"
            subtitle="Adet ve fire maliyeti dağılımı"
            icon={AlertOctagon}
            iconClassName="bg-rose-500/10 text-rose-400"
            className="xl:col-span-2"
          >
            {reasons.loading && <LoadingState rows={6} />}
            {reasons.error && <ErrorState message={reasons.error} onRetry={reasons.refetch} />}
            {reasons.data && (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reasons.data} layout="vertical" margin={{ top: 0, right: 12, bottom: 0, left: 60 }}>
                      <CartesianGrid horizontal={false} />
                      <XAxis type="number" {...axisProps} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`} />
                      <YAxis type="category" dataKey="reason" {...axisProps} width={124} />
                      <Tooltip
                        cursor={{ fill: "rgba(255,255,255,0.04)" }}
                        content={<ChartTooltip formatter={(v) => formatNumber(v)} />}
                      />
                      <Bar dataKey="count" name="Hata Adedi" radius={[0, 5, 5, 0]} barSize={12}>
                        {reasons.data.map((_, i) => (
                          <Cell key={i} fill={chartPalette[i % chartPalette.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={reasons.data}
                        dataKey="cost"
                        nameKey="reason"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={3}
                        strokeWidth={0}
                      >
                        {reasons.data.map((_, i) => (
                          <Cell key={i} fill={chartPalette[i % chartPalette.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={<ChartTooltip formatter={(v) => formatCurrency(v, "TL", true)} />}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </GlassCard>

          {/* En riskli grup trendi */}
          <GlassCard
            title={`Hata Trendi — ${totals?.worst.group ?? ""}`}
            subtitle="Haftalık hata oranı (%)"
            icon={Flame}
            iconClassName="bg-amber-500/10 text-amber-400"
          >
            {totals && (
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="week" {...axisProps} />
                    <YAxis {...axisProps} domain={[0, 4]} />
                    <Tooltip content={<ChartTooltip formatter={(v) => `%${v}`} />} />
                    <Line
                      type="monotone"
                      dataKey="oran"
                      name="Hata Oranı"
                      stroke="#fb7185"
                      strokeWidth={2.5}
                      dot={{ fill: "#fb7185", r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
            <div className="mt-3 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-3 text-xs leading-relaxed text-amber-200">
              Dokuma çözgü problemleri artıyor. Tezgah Grubu A&apos;da bakım
              kontrolü ve iplik tedarik kalitesi incelemesi önerilir.
            </div>
          </GlassCard>
        </div>

        {/* Grup bazlı hata oranları */}
        <GlassCard
          title="Ürün Grubu Bazlı Hata Oranları"
          subtitle="Hata oranı ve fire maliyeti"
          icon={Factory}
        >
          {groupStats.loading && <LoadingState rows={6} />}
          {groupStats.data && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {[...groupStats.data]
                .sort((a, b) => b.defectRate - a.defectRate)
                .map((g) => (
                  <div key={g.group} className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-ink-100">{g.group}</p>
                      <StatBadge tone={g.defectRate >= 2.5 ? "red" : g.defectRate >= 1.8 ? "amber" : "green"}>
                        %{g.defectRate.toFixed(1)}
                      </StatBadge>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-ink-500">
                      <span>{formatNumber(g.defective)} hatalı</span>
                      <span>fire {formatCurrency(g.fireCost, "TL", true)}</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/8">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          g.defectRate >= 2.5 ? "bg-rose-500" : g.defectRate >= 1.8 ? "bg-amber-400" : "bg-mint-400"
                        )}
                        style={{ width: `${Math.min((g.defectRate / 4) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </GlassCard>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {/* Şikayetler */}
          <GlassCard
            title="Müşteri Şikayetleri"
            subtitle="Satıra tıklayınca detay açılır"
            icon={MessageSquareWarning}
            iconClassName="bg-amber-500/10 text-amber-400"
          >
            {complaints.loading && <LoadingState rows={6} />}
            {complaints.error && (
              <ErrorState message={complaints.error} onRetry={complaints.refetch} />
            )}
            {complaints.data && (
              <DataTable
                columns={complaintColumns}
                data={complaints.data}
                searchPlaceholder="Müşteri veya neden ara…"
                pageSize={6}
                exportName="musteri-sikayetleri"
                onRowClick={setSelectedComplaint}
              />
            )}
          </GlassCard>

          {/* Sertifikalar + sürdürülebilirlik */}
          <div className="space-y-5">
            <GlassCard
              title="Kalite Sertifikaları"
              subtitle="Geçerlilik durumu"
              icon={BadgeCheck}
              iconClassName="bg-mint-500/10 text-mint-400"
            >
              {certificates.loading && <LoadingState rows={4} />}
              {certificates.data && (
                <div className="space-y-2">
                  {certificates.data.map((c) => (
                    <div key={c.name} className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-2.5">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-ink-200">{c.name}</p>
                        <p className="text-[11px] text-ink-500">
                          {c.scope} — bitiş {formatDate(c.expiryDate)}
                        </p>
                      </div>
                      <StatBadge tone={toneForStatus(c.status)}>{c.status}</StatBadge>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>

            <GlassCard
              title="Sürdürülebilir Üretim KPI'ları"
              subtitle="Hedefe karşı gerçekleşme"
              icon={Leaf}
              iconClassName="bg-mint-500/10 text-mint-400"
            >
              <div className="space-y-3.5">
                {sustainabilityKpis.map((k) => {
                  const higherIsBetter = k.unit === "%";
                  const achieved = higherIsBetter
                    ? (k.value / k.target) * 100
                    : (k.target / k.value) * 100;
                  return (
                    <div key={k.label}>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-ink-300">{k.label}</span>
                        <span className="font-semibold tabular-nums text-ink-100">
                          {k.value} {k.unit !== "%" ? k.unit : ""}
                          {k.unit === "%" ? "%" : ""}{" "}
                          <span className="font-normal text-ink-500">/ hedef {k.target}</span>
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            achieved >= 95 ? "bg-mint-400" : achieved >= 80 ? "bg-amber-400" : "bg-rose-400"
                          )}
                          style={{ width: `${Math.min(achieved, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      <DetailDrawer
        open={!!selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        title={selectedComplaint?.customer ?? ""}
        subtitle="Şikayet detayı"
      >
        {selectedComplaint && (
          <div>
            <DrawerField label="Marka" value={selectedComplaint.brand} />
            <DrawerField label="Ürün Grubu" value={selectedComplaint.group} />
            <DrawerField label="Şikayet Nedeni" value={selectedComplaint.reason} />
            <DrawerField label="Tarih" value={formatDate(selectedComplaint.date)} />
            <DrawerField
              label="Önem"
              value={
                <StatBadge tone={toneForStatus(selectedComplaint.severity)}>
                  {selectedComplaint.severity}
                </StatBadge>
              }
            />
            <DrawerField
              label="Durum"
              value={
                <StatBadge tone={toneForStatus(selectedComplaint.status)}>
                  {selectedComplaint.status}
                </StatBadge>
              }
            />
          </div>
        )}
      </DetailDrawer>
    </AppShell>
  );
}
