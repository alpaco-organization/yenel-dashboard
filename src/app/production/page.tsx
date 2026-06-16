"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ClipboardCheck,
  Factory,
  FlaskConical,
  Gauge,
  PackageCheck,
  Timer,
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
import type { ProductionOrder } from "@/types";

const orderColumns: ColumnDef<ProductionOrder, unknown>[] = [
  { accessorKey: "orderNo", header: "Sipariş No" },
  { accessorKey: "customer", header: "Müşteri" },
  { accessorKey: "group", header: "Ürün Grubu" },
  {
    accessorKey: "quantity",
    header: "Adet",
    cell: ({ row }) => formatNumber(row.original.quantity),
  },
  {
    accessorKey: "stage",
    header: "Aşama",
    cell: ({ row }) => (
      <StatBadge tone={toneForStatus(row.original.stage)}>
        {row.original.stage}
      </StatBadge>
    ),
  },
  {
    accessorKey: "progress",
    header: "İlerleme",
    cell: ({ row }) => (
      <div className="flex w-28 items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
          <div
            className="h-full rounded-full bg-electric-500"
            style={{ width: `${row.original.progress}%` }}
          />
        </div>
        <span className="text-xs tabular-nums text-ink-400">
          %{row.original.progress}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "dueDate",
    header: "Termin",
    cell: ({ row }) => formatDate(row.original.dueDate),
  },
];

export default function ProductionPage() {
  const groups = useAsyncData(() => api.getProductionGroupStats());
  const lines = useAsyncData(() => api.getProductionLines());
  const weekly = useAsyncData(() => api.getWeeklyProduction());
  const orders = useAsyncData(() => api.getProductionOrders());
  const samples = useAsyncData(() => api.getSampleApprovals());
  const [selectedOrder, setSelectedOrder] = useState<ProductionOrder | null>(null);

  const totals = groups.data
    ? {
        produced: groups.data.reduce((s, g) => s + g.produced, 0),
        defective: groups.data.reduce((s, g) => s + g.defective, 0),
        pending: groups.data.reduce((s, g) => s + g.pendingOrders, 0),
        inProduction: groups.data.reduce((s, g) => s + g.inProductionOrders, 0),
        completed: groups.data.reduce((s, g) => s + g.completedOrders, 0),
        onTime:
          groups.data.reduce((s, g) => s + g.onTimeRate, 0) / groups.data.length,
        leadTime:
          groups.data.reduce((s, g) => s + g.avgLeadTimeDays, 0) /
          groups.data.length,
      }
    : null;

  const avgUtilization = lines.data
    ? lines.data.reduce((s, l) => s + l.utilization, 0) / lines.data.length
    : null;

  const funnelData = totals
    ? [
        { name: "Bekleyen", value: totals.pending, fill: chartPalette[2] },
        { name: "Üretimde", value: totals.inProduction, fill: chartPalette[0] },
        { name: "Tamamlanan", value: totals.completed, fill: chartPalette[1] },
      ]
    : [];

  const kpiItems = totals
    ? [
        { label: "Toplam Üretim", value: formatNumber(totals.produced, true), icon: Factory, color: "bg-electric-500/10 text-electric-400" },
        { label: "Zamanında Tamamlama", value: `%${totals.onTime.toFixed(0)}`, icon: ClipboardCheck, color: "bg-mint-500/10 text-mint-400" },
        { label: "Bekleyen Sipariş", value: formatNumber(totals.pending), icon: Timer, color: "bg-amber-500/10 text-amber-400" },
        { label: "Üretimdeki Sipariş", value: formatNumber(totals.inProduction), icon: Gauge, color: "bg-violet-500/10 text-violet-400" },
        { label: "Tamamlanan Sipariş", value: formatNumber(totals.completed), icon: PackageCheck, color: "bg-mint-500/10 text-mint-400" },
        { label: "Hata Oranı", value: `%${((totals.defective / totals.produced) * 100).toFixed(2)}`, icon: FlaskConical, color: "bg-rose-500/10 text-rose-400" },
        { label: "Ort. Teslim Süresi", value: `${totals.leadTime.toFixed(1)} gün`, icon: Timer, color: "bg-electric-500/10 text-electric-400" },
        { label: "Kapasite Kullanımı", value: avgUtilization ? `%${avgUtilization.toFixed(0)}` : "—", icon: Gauge, color: "bg-amber-500/10 text-amber-400" },
      ]
    : [];

  return (
    <AppShell title="Üretim" subtitle="Hat doluluk, sipariş akışı ve ürün grubu performansı">
      <div className="space-y-5">
        {/* KPI şerit */}
        {groups.loading && (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="glass h-20 animate-pulse rounded-2xl" />
            ))}
          </div>
        )}
        {totals && (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {kpiItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <GlassCard key={item.label} delay={i * 0.03} contentClassName="p-4">
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

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {/* Ürün grubu üretim */}
          <GlassCard
            title="Ürün Grubu Bazlı Üretim"
            subtitle="Gerçekleşen / hedef, adet"
            icon={Factory}
            className="xl:col-span-2"
          >
            {groups.loading && <LoadingState rows={6} />}
            {groups.error && <ErrorState message={groups.error} onRetry={groups.refetch} />}
            {groups.data && (
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={groups.data} layout="vertical" margin={{ top: 0, right: 12, bottom: 0, left: 40 }}>
                    <CartesianGrid horizontal={false} />
                    <XAxis type="number" {...axisProps} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`} />
                    <YAxis type="category" dataKey="group" {...axisProps} width={104} />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                      content={<ChartTooltip formatter={(v) => formatNumber(v)} />}
                    />
                    <Bar dataKey="produced" name="Üretilen" fill="#38bdf8" radius={[0, 5, 5, 0]} barSize={10} />
                    <Bar dataKey="target" name="Hedef" fill="#3d4d73" radius={[0, 5, 5, 0]} barSize={10} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </GlassCard>

          {/* Sipariş hunisi */}
          <GlassCard
            title="Sipariş Durum Hunisi"
            subtitle="Bekleyen → Üretimde → Tamamlanan"
            icon={PackageCheck}
            iconClassName="bg-violet-500/10 text-violet-400"
          >
            {totals && (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <FunnelChart>
                    <Tooltip content={<ChartTooltip />} />
                    <Funnel dataKey="value" data={funnelData} isAnimationActive>
                      <LabelList
                        position="right"
                        dataKey="name"
                        fill="#aab6d3"
                        stroke="none"
                        fontSize={12}
                      />
                    </Funnel>
                  </FunnelChart>
                </ResponsiveContainer>
              </div>
            )}
            {samples.data && (
              <div className="mt-4 border-t border-white/8 pt-4">
                <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-ink-500">
                  Numune / Tasarım Onayı
                </p>
                <div className="space-y-2">
                  {samples.data.slice(0, 4).map((s) => (
                    <div key={s.id} className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm text-ink-200">{s.customer}</p>
                        <p className="text-[11px] text-ink-500">
                          {s.group} — {s.daysWaiting} gündür bekliyor
                        </p>
                      </div>
                      <StatBadge tone={toneForStatus(s.stage)}>{s.stage}</StatBadge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {/* Haftalık üretim trendi */}
          <GlassCard title="Haftalık Üretim Trendi" subtitle="Üretim tipi bazında" icon={Gauge}>
            {weekly.loading && <LoadingState rows={5} />}
            {weekly.data && (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weekly.data} margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="week" {...axisProps} />
                    <YAxis {...axisProps} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`} />
                    <Tooltip content={<ChartTooltip formatter={(v) => formatNumber(v)} />} />
                    <Line type="monotone" dataKey="baski" name="Baskı" stroke={chartPalette[0]} strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="dokuma" name="Dokuma" stroke={chartPalette[1]} strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="matbaa" name="Matbaa" stroke={chartPalette[2]} strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="kutu" name="Kutu" stroke={chartPalette[3]} strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="aksesuar" name="Aksesuar" stroke={chartPalette[4]} strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </GlassCard>

          {/* Hata/fire trendi */}
          <GlassCard
            title="Hata / Fire Trendi"
            subtitle="Haftalık hatalı üretim adedi"
            icon={FlaskConical}
            iconClassName="bg-rose-500/10 text-rose-400"
          >
            {weekly.data && (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weekly.data} margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="week" {...axisProps} />
                    <YAxis {...axisProps} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`} />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                      content={<ChartTooltip formatter={(v) => formatNumber(v)} />}
                    />
                    <Bar dataKey="defects" name="Hatalı Üretim" radius={[6, 6, 0, 0]}>
                      {weekly.data.map((w, i) => (
                        <Cell key={i} fill={w.defects > 25_000 ? "#fb7185" : "#fbbf24"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </GlassCard>
        </div>

        {/* Hat doluluk */}
        <GlassCard
          title="Üretim Hattı Doluluk Oranı"
          subtitle="Hat bazında kapasite kullanımı ve durum"
          icon={Gauge}
          iconClassName="bg-amber-500/10 text-amber-400"
        >
          {lines.loading && <LoadingState rows={5} />}
          {lines.error && <ErrorState message={lines.error} onRetry={lines.refetch} />}
          {lines.data && (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {lines.data.map((line) => (
                <div key={line.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-ink-100">{line.name}</p>
                      <p className="text-[11px] text-ink-500">
                        {line.type} — {formatNumber(line.dailyCapacity)} adet/gün —{" "}
                        {line.activeOrders} aktif iş
                      </p>
                    </div>
                    <StatBadge tone={toneForStatus(line.status)}>{line.status}</StatBadge>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/8">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          line.utilization >= 90
                            ? "bg-rose-500"
                            : line.utilization >= 75
                              ? "bg-amber-400"
                              : "bg-mint-400"
                        )}
                        style={{ width: `${line.utilization}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-sm font-semibold tabular-nums text-ink-100">
                      %{line.utilization}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>

        {/* Sipariş tablosu */}
        <GlassCard
          title="Siparişten Teslimata Süreç Takibi"
          subtitle="Aktif üretim siparişleri — satıra tıklayınca detay açılır"
          icon={PackageCheck}
        >
          {orders.loading && <LoadingState rows={6} />}
          {orders.error && <ErrorState message={orders.error} onRetry={orders.refetch} />}
          {orders.data && (
            <DataTable
              columns={orderColumns}
              data={orders.data}
              searchPlaceholder="Sipariş, müşteri veya ürün grubu ara…"
              exportName="uretim-siparisleri"
              onRowClick={setSelectedOrder}
            />
          )}
        </GlassCard>
      </div>

      <DetailDrawer
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder?.orderNo ?? ""}
        subtitle={selectedOrder?.customer}
      >
        {selectedOrder && (
          <div>
            <DrawerField label="Müşteri" value={selectedOrder.customer} />
            <DrawerField label="Marka" value={selectedOrder.brand} />
            <DrawerField label="Ürün Grubu" value={selectedOrder.group} />
            <DrawerField label="Adet" value={formatNumber(selectedOrder.quantity)} />
            <DrawerField
              label="Tutar"
              value={formatCurrency(selectedOrder.amount, selectedOrder.currency)}
            />
            <DrawerField
              label="Aşama"
              value={
                <StatBadge tone={toneForStatus(selectedOrder.stage)}>
                  {selectedOrder.stage}
                </StatBadge>
              }
            />
            <DrawerField label="Sipariş Tarihi" value={formatDate(selectedOrder.orderDate)} />
            <DrawerField label="Termin" value={formatDate(selectedOrder.dueDate)} />
            <DrawerField label="Temsilci" value={selectedOrder.representative} />
            <DrawerField label="Kanal" value={selectedOrder.channel} />
            <div className="mt-4">
              <p className="mb-2 text-xs text-ink-500">Üretim ilerlemesi</p>
              <div className="flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-electric-500 to-mint-400"
                    style={{ width: `${selectedOrder.progress}%` }}
                  />
                </div>
                <span className="text-sm font-semibold tabular-nums text-ink-100">
                  %{selectedOrder.progress}
                </span>
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>
    </AppShell>
  );
}
