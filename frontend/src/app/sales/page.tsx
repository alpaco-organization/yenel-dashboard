"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  Flag,
  Globe2,
  Handshake,
  ShieldAlert,
  UserPlus,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { GlassCard } from "@/components/cards/glass-card";
import { StatBadge } from "@/components/cards/stat-badge";
import { LoadingState, ErrorState } from "@/components/cards/states";
import { DataTable } from "@/components/tables/data-table";
import { DetailDrawer, DrawerField } from "@/components/drawers/detail-drawer";
import { ChartTooltip, axisProps, chartPalette } from "@/components/charts/chart-kit";
import { api } from "@/lib/api";
import { useAsyncData } from "@/lib/use-async-data";
import { cn, formatCurrency, formatDate, formatPercent } from "@/lib/utils";
import type { Customer, RankedRevenue } from "@/types";
import { usOfficeSales, newCustomerTrend } from "@/data/sales";

function rankedColumns(currencyLabel: string): ColumnDef<RankedRevenue, unknown>[] {
  return [
    {
      accessorKey: "rank",
      header: "#",
      cell: ({ row }) => (
        <span
          className={cn(
            "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
            row.original.rank <= 3
              ? "bg-amber-500/15 text-amber-300"
              : "bg-white/5 text-ink-400"
          )}
        >
          {row.original.rank}
        </span>
      ),
    },
    { accessorKey: "customer", header: "Cari" },
    { accessorKey: "representative", header: "Temsilci" },
    {
      accessorKey: "amount",
      header: currencyLabel,
      cell: ({ row }) =>
        formatCurrency(row.original.amount, row.original.currency, true),
    },
    {
      accessorKey: "changePercent",
      header: "Değişim",
      cell: ({ row }) => {
        const v = row.original.changePercent;
        const Icon = v >= 0 ? ArrowUpRight : ArrowDownRight;
        return (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
              v >= 0 ? "text-mint-400" : "text-rose-400"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {formatPercent(Math.abs(v))}
          </span>
        );
      },
    },
  ];
}

const customerColumns: ColumnDef<Customer, unknown>[] = [
  { accessorKey: "name", header: "Cari Adı" },
  { accessorKey: "representative", header: "Temsilci" },
  { accessorKey: "channel", header: "Kanal" },
  {
    accessorKey: "totalRevenue",
    header: "Ciro",
    cell: ({ row }) =>
      formatCurrency(row.original.totalRevenue, row.original.revenueCurrency, true),
  },
  {
    accessorKey: "openBalance",
    header: "Açık Bakiye",
    cell: ({ row }) =>
      formatCurrency(row.original.openBalance, row.original.revenueCurrency, true),
  },
  {
    accessorKey: "riskScore",
    header: "Risk",
    cell: ({ row }) => {
      const score = row.original.riskScore;
      return (
        <StatBadge tone={score > 60 ? "red" : score > 40 ? "amber" : "green"}>
          {score}/100
        </StatBadge>
      );
    },
  },
  {
    accessorKey: "isNew",
    header: "Durum",
    cell: ({ row }) =>
      row.original.isNew ? (
        <StatBadge tone="violet">yeni cari</StatBadge>
      ) : (
        <StatBadge tone="neutral">aktif</StatBadge>
      ),
  },
];

export default function SalesPage() {
  const brands = useAsyncData(() => api.getBrands());
  const customers = useAsyncData(() => api.getCustomers());
  const rankedTL = useAsyncData(() => api.getRankedRevenueTL());
  const rankedFX = useAsyncData(() => api.getRankedRevenueFX());
  const channels = useAsyncData(() => api.getChannelSales());
  const [selected, setSelected] = useState<Customer | null>(null);

  const newCustomers = customers.data?.filter((c) => c.isNew) ?? [];
  const riskyCustomers = customers.data
    ? [...customers.data].sort((a, b) => b.overdueBalance - a.overdueBalance).slice(0, 20)
    : [];

  return (
    <AppShell title="Satış & Cari" subtitle="Marka, cari ve kanal bazlı satış performansı">
      <div className="space-y-5">
        {/* Kanal özet */}
        {channels.data && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {channels.data.map((c, i) => (
              <GlassCard key={c.channel} delay={i * 0.05} contentClassName="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-ink-500">
                      {c.channel}
                    </p>
                    <p className="mt-1 text-xl font-semibold tabular-nums text-ink-100">
                      {formatCurrency(c.revenue, "TL", true)}
                    </p>
                    <p className="text-[11px] text-ink-500">
                      {c.orderCount} sipariş — pay %{c.share}
                    </p>
                  </div>
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: `${chartPalette[i]}1a`, color: chartPalette[i] }}
                  >
                    {c.channel === "ABD Ofisi" ? (
                      <Flag className="h-5 w-5" />
                    ) : c.channel === "İhracat" ? (
                      <Globe2 className="h-5 w-5" />
                    ) : (
                      <Handshake className="h-5 w-5" />
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {/* Marka bazlı ciro */}
          <GlassCard
            title="Marka Bazlı Ciro"
            subtitle="Bu dönem, TL"
            icon={Award}
            className="xl:col-span-2"
          >
            {brands.loading && <LoadingState rows={6} />}
            {brands.error && <ErrorState message={brands.error} onRetry={brands.refetch} />}
            {brands.data && (
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={brands.data} layout="vertical" margin={{ top: 0, right: 12, bottom: 0, left: 40 }}>
                    <CartesianGrid horizontal={false} />
                    <XAxis type="number" {...axisProps} tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(0)}M`} />
                    <YAxis type="category" dataKey="name" {...axisProps} width={96} />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                      content={<ChartTooltip formatter={(v) => formatCurrency(v, "TL", true)} />}
                    />
                    <Bar dataKey="revenue" name="Ciro" radius={[0, 6, 6, 0]} barSize={14}>
                      {brands.data.map((_, i) => (
                        <Cell key={i} fill={chartPalette[i % chartPalette.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </GlassCard>

          <div className="space-y-5">
            {/* Yeni cari trendi */}
            <GlassCard
              title="Yeni Cari Trendi"
              subtitle="Aylık açılan cari sayısı"
              icon={UserPlus}
              iconClassName="bg-mint-500/10 text-mint-400"
            >
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={newCustomerTrend} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                    <defs>
                      <linearGradient id="g-newc" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34d399" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" {...axisProps} />
                    <YAxis {...axisProps} />
                    <Tooltip content={<ChartTooltip />} />
                    <Area type="monotone" dataKey="count" name="Yeni Cari" stroke="#34d399" strokeWidth={2} fill="url(#g-newc)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 space-y-2">
                {newCustomers.slice(0, 4).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left transition hover:bg-white/5"
                  >
                    <span className="truncate text-sm text-ink-200">{c.name}</span>
                    <span className="shrink-0 text-[11px] text-ink-500">
                      {formatDate(c.openedDate)}
                    </span>
                  </button>
                ))}
              </div>
            </GlassCard>

            {/* ABD ofisi */}
            <GlassCard
              title="ABD Ofisi Satışları"
              subtitle="Aylık, USD"
              icon={Flag}
              iconClassName="bg-violet-500/10 text-violet-400"
            >
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usOfficeSales} margin={{ top: 8, right: 8, bottom: 0, left: -14 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" {...axisProps} />
                    <YAxis {...axisProps} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`} />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                      content={<ChartTooltip formatter={(v) => formatCurrency(v, "USD", true)} />}
                    />
                    <Bar dataKey="amount" name="Satış" fill="#a78bfa" radius={[5, 5, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <GlassCard title="Sıralı Ciro — TL" subtitle="En yüksek ciro yapan cariler" icon={Award}>
            {rankedTL.loading && <LoadingState rows={6} />}
            {rankedTL.error && <ErrorState message={rankedTL.error} onRetry={rankedTL.refetch} />}
            {rankedTL.data && (
              <DataTable
                columns={rankedColumns("Ciro (TL)")}
                data={rankedTL.data}
                searchPlaceholder="Cari ara…"
                pageSize={6}
                exportName="sirali-ciro-tl"
              />
            )}
          </GlassCard>

          <GlassCard
            title="Sıralı Ciro — Döviz"
            subtitle="USD / EUR bazlı ihracat ciroları"
            icon={Globe2}
            iconClassName="bg-violet-500/10 text-violet-400"
          >
            {rankedFX.loading && <LoadingState rows={6} />}
            {rankedFX.error && <ErrorState message={rankedFX.error} onRetry={rankedFX.refetch} />}
            {rankedFX.data && (
              <DataTable
                columns={rankedColumns("Ciro (Döviz)")}
                data={rankedFX.data}
                searchPlaceholder="Cari ara…"
                pageSize={6}
                exportName="sirali-ciro-doviz"
              />
            )}
          </GlassCard>
        </div>

        {/* Cari risk analizi */}
        <GlassCard
          title="Cari Risk Analizi"
          subtitle="Risk limiti kullanımı ve vadesi geçmiş bakiyeler — en riskli 20 cari"
          icon={ShieldAlert}
          iconClassName="bg-rose-500/10 text-rose-400"
        >
          {customers.loading && <LoadingState rows={6} />}
          {customers.error && (
            <ErrorState message={customers.error} onRetry={customers.refetch} />
          )}
          {customers.data && (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {riskyCustomers.slice(0, 8).map((c) => {
                const limitUsage = Math.min(
                  Math.round((c.openBalance / c.riskLimit) * 100),
                  100
                );
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5 text-left transition hover:border-electric-500/30 hover:bg-electric-500/5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-ink-100">{c.name}</p>
                      {c.overdueBalance > 0 ? (
                        <StatBadge tone="red">
                          {formatCurrency(c.overdueBalance, c.revenueCurrency, true)} vadesi geçmiş
                        </StatBadge>
                      ) : (
                        <StatBadge tone="green">vade aşımı yok</StatBadge>
                      )}
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            limitUsage > 85 ? "bg-rose-500" : limitUsage > 60 ? "bg-amber-400" : "bg-mint-400"
                          )}
                          style={{ width: `${limitUsage}%` }}
                        />
                      </div>
                      <span className="text-xs tabular-nums text-ink-400">
                        limit %{limitUsage}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </GlassCard>

        {/* Tüm cariler tablosu */}
        <GlassCard
          title="Cari Listesi"
          subtitle="Satıra tıklayınca cari detayı açılır"
          icon={Handshake}
        >
          {customers.loading && <LoadingState rows={8} />}
          {customers.data && (
            <DataTable
              columns={customerColumns}
              data={customers.data}
              searchPlaceholder="Cari, temsilci veya kanal ara…"
              pageSize={10}
              exportName="cari-listesi"
              onRowClick={setSelected}
            />
          )}
        </GlassCard>
      </div>

      {/* Cari detay drawer */}
      <DetailDrawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ""}
        subtitle={selected ? `${selected.brand} — ${selected.channel}` : undefined}
      >
        {selected && (
          <div>
            <DrawerField label="Temsilci" value={selected.representative} />
            <DrawerField
              label="Toplam Ciro"
              value={formatCurrency(selected.totalRevenue, selected.revenueCurrency)}
            />
            <DrawerField
              label="Açık Bakiye"
              value={formatCurrency(selected.openBalance, selected.revenueCurrency)}
            />
            <DrawerField
              label="Vadesi Geçmiş"
              value={formatCurrency(selected.overdueBalance, selected.revenueCurrency)}
              valueClassName={selected.overdueBalance > 0 ? "text-rose-400" : "text-mint-400"}
            />
            <DrawerField
              label="Risk Limiti"
              value={formatCurrency(selected.riskLimit, selected.revenueCurrency)}
            />
            <DrawerField
              label="Risk Skoru"
              value={
                <StatBadge
                  tone={
                    selected.riskScore > 60 ? "red" : selected.riskScore > 40 ? "amber" : "green"
                  }
                >
                  {selected.riskScore} / 100
                </StatBadge>
              }
            />
            <DrawerField label="Son Sipariş" value={formatDate(selected.lastOrderDate)} />
            <DrawerField label="Son Tahsilat" value={formatDate(selected.lastCollectionDate)} />
            <DrawerField label="Cari Açılış" value={formatDate(selected.openedDate)} />

            <div className="mt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-500">
                Ürün Grubu Kırılımı
              </p>
              <div className="space-y-2.5">
                {selected.groupBreakdown.map((g, i) => (
                  <div key={g.group}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-ink-300">{g.group}</span>
                      <span className="font-semibold tabular-nums text-ink-100">%{g.share}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${g.share}%`,
                          background: chartPalette[i % chartPalette.length],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>
    </AppShell>
  );
}
