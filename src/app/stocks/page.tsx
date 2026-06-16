"use client";

import { useMemo, useState } from "react";
import {
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
import type { ColumnDef } from "@tanstack/react-table";
import { AlertTriangle, Boxes, Layers, Snowflake, Zap } from "lucide-react";
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
import type { StockItem, StockStatus } from "@/types";

const stockColumns: ColumnDef<StockItem, unknown>[] = [
  { accessorKey: "code", header: "Ürün Kodu" },
  { accessorKey: "name", header: "Ürün Adı" },
  { accessorKey: "group", header: "Grup" },
  { accessorKey: "brand", header: "Marka" },
  {
    accessorKey: "quantity",
    header: "Stok",
    cell: ({ row }) => formatNumber(row.original.quantity),
  },
  {
    accessorKey: "reserved",
    header: "Rezerve",
    cell: ({ row }) => formatNumber(row.original.reserved),
  },
  {
    accessorKey: "available",
    header: "Kullanılabilir",
    cell: ({ row }) => (
      <span
        className={cn(
          "font-medium tabular-nums",
          row.original.available < row.original.criticalLevel
            ? "text-rose-400"
            : "text-ink-200"
        )}
      >
        {formatNumber(row.original.available)}
      </span>
    ),
  },
  {
    accessorKey: "totalValue",
    header: "Toplam Değer",
    cell: ({ row }) => formatCurrency(row.original.totalValue, "TL", true),
  },
  {
    accessorKey: "lastMovement",
    header: "Son Hareket",
    cell: ({ row }) => formatDate(row.original.lastMovement),
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

const statusFilters: { key: StockStatus | "all"; label: string }[] = [
  { key: "all", label: "Tümü" },
  { key: "kritik", label: "Kritik" },
  { key: "hareketsiz", label: "Hareketsiz" },
  { key: "hızlı", label: "Hızlı Dönen" },
  { key: "normal", label: "Normal" },
];

export default function StocksPage() {
  const stocks = useAsyncData(() => api.getStockItems());
  const [selected, setSelected] = useState<StockItem | null>(null);
  const [statusFilter, setStatusFilter] = useState<StockStatus | "all">("all");

  const filtered = useMemo(
    () =>
      stocks.data?.filter(
        (s) => statusFilter === "all" || s.status === statusFilter
      ) ?? [],
    [stocks.data, statusFilter]
  );

  const summary = useMemo(() => {
    if (!stocks.data) return null;
    const totalValue = stocks.data.reduce((s, i) => s + i.totalValue, 0);
    const critical = stocks.data.filter((i) => i.status === "kritik");
    const idle = stocks.data.filter((i) => i.status === "hareketsiz");
    const fast = stocks.data.filter((i) => i.status === "hızlı");

    const byType = (["Hammadde", "Yarı Mamul", "Mamul"] as const).map((t) => ({
      name: t,
      value: stocks.data!
        .filter((i) => i.type === t)
        .reduce((s, i) => s + i.totalValue, 0),
    }));

    const byGroup = Object.entries(
      stocks.data.reduce<Record<string, number>>((acc, i) => {
        acc[i.group] = (acc[i.group] ?? 0) + i.totalValue;
        return acc;
      }, {})
    )
      .map(([group, value]) => ({ group, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);

    return { totalValue, critical, idle, fast, byType, byGroup };
  }, [stocks.data]);

  return (
    <AppShell title="Stok" subtitle="Hammadde, yarı mamul ve mamul stok yönetimi">
      <div className="space-y-5">
        {summary && (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { label: "Toplam Stok Değeri", value: formatCurrency(summary.totalValue, "TL", true), icon: Boxes, color: "bg-electric-500/10 text-electric-400" },
              { label: "Kritik Stok", value: `${summary.critical.length} kalem`, icon: AlertTriangle, color: "bg-rose-500/10 text-rose-400" },
              { label: "Hareketsiz Stok", value: `${summary.idle.length} kalem`, icon: Snowflake, color: "bg-amber-500/10 text-amber-400" },
              { label: "Hızlı Dönen", value: `${summary.fast.length} kalem`, icon: Zap, color: "bg-mint-500/10 text-mint-400" },
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

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <GlassCard
            title="Ürün Grubu Bazlı Stok Değeri"
            subtitle="En yüksek 8 grup"
            icon={Layers}
            className="xl:col-span-2"
          >
            {stocks.loading && <LoadingState rows={6} />}
            {stocks.error && <ErrorState message={stocks.error} onRetry={stocks.refetch} />}
            {summary && (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={summary.byGroup} layout="vertical" margin={{ top: 0, right: 12, bottom: 0, left: 40 }}>
                    <CartesianGrid horizontal={false} />
                    <XAxis type="number" {...axisProps} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`} />
                    <YAxis type="category" dataKey="group" {...axisProps} width={104} />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                      content={<ChartTooltip formatter={(v) => formatCurrency(v, "TL", true)} />}
                    />
                    <Bar dataKey="value" name="Stok Değeri" radius={[0, 6, 6, 0]} barSize={16}>
                      {summary.byGroup.map((_, i) => (
                        <Cell key={i} fill={chartPalette[i % chartPalette.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </GlassCard>

          <GlassCard
            title="Hammadde / Yarı Mamul / Mamul"
            subtitle="Stok değeri dağılımı"
            icon={Boxes}
            iconClassName="bg-violet-500/10 text-violet-400"
          >
            {summary && (
              <>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={summary.byType}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={50}
                        outerRadius={78}
                        paddingAngle={4}
                        strokeWidth={0}
                      >
                        {summary.byType.map((_, i) => (
                          <Cell key={i} fill={chartPalette[i]} />
                        ))}
                      </Pie>
                      <Tooltip content={<ChartTooltip formatter={(v) => formatCurrency(v, "TL", true)} />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 space-y-2">
                  {summary.byType.map((t, i) => (
                    <div key={t.name} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-ink-400">
                        <span className="h-2 w-2 rounded-full" style={{ background: chartPalette[i] }} />
                        {t.name}
                      </span>
                      <span className="font-semibold tabular-nums text-ink-100">
                        {formatCurrency(t.value, "TL", true)}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </GlassCard>
        </div>

        {/* Kritik stok uyarıları */}
        {summary && summary.critical.length > 0 && (
          <GlassCard
            title="Kritik Stok Uyarıları"
            subtitle="Kullanılabilir stok kritik seviyenin altında"
            icon={AlertTriangle}
            iconClassName="bg-rose-500/10 text-rose-400"
          >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {summary.critical.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className="rounded-xl border border-rose-500/20 bg-rose-500/[0.05] p-3.5 text-left transition hover:bg-rose-500/10"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-ink-100">{item.name}</p>
                    <StatBadge tone="red">kritik</StatBadge>
                  </div>
                  <p className="mt-1 text-[11px] text-ink-500">{item.code}</p>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-ink-400">
                      Kullanılabilir:{" "}
                      <span className="font-semibold text-rose-400">
                        {formatNumber(item.available)}
                      </span>
                    </span>
                    <span className="text-ink-500">
                      Kritik: {formatNumber(item.criticalLevel)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </GlassCard>
        )}

        {/* Ana stok tablosu */}
        <GlassCard
          title="Stok Listesi"
          subtitle="Tüm stok kalemleri — satıra tıklayınca detay açılır"
          icon={Boxes}
        >
          {stocks.loading && <LoadingState rows={8} />}
          {stocks.error && <ErrorState message={stocks.error} onRetry={stocks.refetch} />}
          {stocks.data && (
            <DataTable
              columns={stockColumns}
              data={filtered}
              searchPlaceholder="Kod, ürün adı veya marka ara…"
              pageSize={10}
              exportName="stok-listesi"
              onRowClick={setSelected}
              toolbar={
                <div className="flex gap-1 rounded-xl border border-white/8 bg-white/[0.02] p-1">
                  {statusFilters.map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setStatusFilter(f.key)}
                      className={
                        statusFilter === f.key
                          ? "rounded-lg bg-electric-500/15 px-2.5 py-1.5 text-xs font-medium text-electric-300"
                          : "rounded-lg px-2.5 py-1.5 text-xs text-ink-400 transition hover:text-ink-200"
                      }
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              }
            />
          )}
        </GlassCard>
      </div>

      <DetailDrawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ""}
        subtitle={selected?.code}
      >
        {selected && (
          <div>
            <DrawerField label="Ürün Grubu" value={selected.group} />
            <DrawerField label="Tip" value={selected.type} />
            <DrawerField label="Marka" value={selected.brand} />
            <DrawerField label="Stok Adedi" value={formatNumber(selected.quantity)} />
            <DrawerField label="Rezerve" value={formatNumber(selected.reserved)} />
            <DrawerField
              label="Kullanılabilir"
              value={formatNumber(selected.available)}
              valueClassName={
                selected.available < selected.criticalLevel ? "text-rose-400" : ""
              }
            />
            <DrawerField label="Kritik Seviye" value={formatNumber(selected.criticalLevel)} />
            <DrawerField label="Birim Maliyet" value={formatCurrency(selected.unitCost, "TL")} />
            <DrawerField label="Toplam Değer" value={formatCurrency(selected.totalValue, "TL")} />
            <DrawerField label="Aylık Devir Hızı" value={`${selected.monthlyTurnover}x`} />
            <DrawerField label="Son Hareket" value={formatDate(selected.lastMovement)} />
            <DrawerField
              label="Durum"
              value={
                <StatBadge tone={toneForStatus(selected.status)}>
                  {selected.status}
                </StatBadge>
              }
            />
          </div>
        )}
      </DetailDrawer>
    </AppShell>
  );
}
