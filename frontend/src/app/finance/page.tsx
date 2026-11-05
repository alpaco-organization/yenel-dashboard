"use client";

import { useState } from "react";
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
import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowLeftRight,
  CalendarClock,
  Coins,
  HandCoins,
  PiggyBank,
  Receipt,
  Scale,
  Wallet,
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
import { cn, formatCurrency, formatDate, formatPercent } from "@/lib/utils";
import type { InstallmentPayment } from "@/types";
import { customers } from "@/data/customers";

const installmentColumns: ColumnDef<InstallmentPayment, unknown>[] = [
  { accessorKey: "customer", header: "Cari" },
  {
    accessorKey: "dueDate",
    header: "Vade",
    cell: ({ row }) => formatDate(row.original.dueDate),
  },
  {
    accessorKey: "amount",
    header: "Tutar",
    cell: ({ row }) =>
      formatCurrency(row.original.amount, row.original.currency, true),
  },
  {
    id: "installment",
    header: "Taksit",
    cell: ({ row }) =>
      `${row.original.installmentNo} / ${row.original.totalInstallments}`,
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

export default function FinancePage() {
  const financials = useAsyncData(() => api.getMonthlyFinancials());
  const expenses = useAsyncData(() => api.getExpenseCategories());
  const aging = useAsyncData(() => api.getAgingBuckets());
  const installments = useAsyncData(() => api.getInstallmentPayments());
  const fx = useAsyncData(() => api.getFxPositions());
  const zakat = useAsyncData(() => api.getZakatInfo());
  const [selectedPayment, setSelectedPayment] =
    useState<InstallmentPayment | null>(null);

  const riskiestCustomers = [...customers]
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 10);

  const last = financials.data?.[financials.data.length - 1];

  return (
    <AppShell title="Finans" subtitle="Gelir, gider, bakiye ve döviz pozisyonu">
      <div className="space-y-5">
        {/* Özet şerit */}
        {last && (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { label: "Aylık Gelir", value: last.revenue, icon: Wallet, color: "text-electric-400 bg-electric-500/10" },
              { label: "Aylık Gider", value: last.expenses, icon: Receipt, color: "text-rose-400 bg-rose-500/10" },
              { label: "Brüt Kâr", value: last.grossProfit, icon: PiggyBank, color: "text-mint-400 bg-mint-500/10" },
              { label: "Net Kâr", value: last.netProfit, icon: Coins, color: "text-violet-400 bg-violet-500/10" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <GlassCard key={item.label} delay={i * 0.04} contentClassName="p-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", item.color)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-wide text-ink-500">
                        {item.label}
                      </p>
                      <p className="truncate text-lg font-semibold tabular-nums text-ink-100">
                        {formatCurrency(item.value, "TL", true)}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {/* Gelir-Gider */}
          <GlassCard
            title="Aylık Gelir — Gider"
            subtitle="Son 12 ay karşılaştırması"
            icon={ArrowLeftRight}
          >
            {financials.loading && <LoadingState rows={5} />}
            {financials.error && (
              <ErrorState message={financials.error} onRetry={financials.refetch} />
            )}
            {financials.data && (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={financials.data} margin={{ top: 8, right: 8, bottom: 0, left: -8 }} barGap={2}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" {...axisProps} />
                    <YAxis {...axisProps} tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(0)}M`} />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                      content={<ChartTooltip formatter={(v) => formatCurrency(v, "TL", true)} />}
                    />
                    <Bar dataKey="revenue" name="Gelir" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" name="Gider" fill="#fb7185" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </GlassCard>

          {/* Kâr trendi */}
          <GlassCard
            title="Brüt / Net Kâr Trendi"
            subtitle="Son 12 ay"
            icon={PiggyBank}
            iconClassName="bg-mint-500/10 text-mint-400"
          >
            {financials.loading && <LoadingState rows={5} />}
            {financials.data && (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={financials.data} margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
                    <defs>
                      <linearGradient id="g-gross" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="g-net2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34d399" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" {...axisProps} />
                    <YAxis {...axisProps} tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(0)}M`} />
                    <Tooltip content={<ChartTooltip formatter={(v) => formatCurrency(v, "TL", true)} />} />
                    <Area type="monotone" dataKey="grossProfit" name="Brüt Kâr" stroke="#a78bfa" strokeWidth={2} fill="url(#g-gross)" />
                    <Area type="monotone" dataKey="netProfit" name="Net Kâr" stroke="#34d399" strokeWidth={2} fill="url(#g-net2)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {/* Ciro para birimi dağılımı */}
          <GlassCard title="TL / USD / EUR Ciro Dağılımı" subtitle="Bu ay, TL karşılığı" icon={Coins}>
            {financials.data && last && (
              <>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "TL", value: last.revenueTL },
                          { name: "USD", value: last.revenueUSD },
                          { name: "EUR", value: last.revenueEUR },
                        ]}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={48}
                        outerRadius={75}
                        paddingAngle={4}
                        strokeWidth={0}
                      >
                        {chartPalette.slice(0, 3).map((c, i) => (
                          <Cell key={i} fill={c} />
                        ))}
                      </Pie>
                      <Tooltip content={<ChartTooltip formatter={(v) => formatCurrency(v, "TL", true)} />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 space-y-2">
                  {[
                    { name: "TL Ciro", value: last.revenueTL },
                    { name: "USD Ciro", value: last.revenueUSD },
                    { name: "EUR Ciro", value: last.revenueEUR },
                  ].map((r, i) => (
                    <div key={r.name} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-ink-400">
                        <span className="h-2 w-2 rounded-full" style={{ background: chartPalette[i] }} />
                        {r.name}
                      </span>
                      <span className="font-semibold tabular-nums text-ink-100">
                        {formatCurrency(r.value, "TL", true)}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </GlassCard>

          {/* Yaşlandırma */}
          <GlassCard
            title="Cari Bakiye Yaşlandırma"
            subtitle="Vade aşım dilimleri"
            icon={CalendarClock}
            iconClassName="bg-amber-500/10 text-amber-400"
          >
            {aging.loading && <LoadingState rows={5} />}
            {aging.error && <ErrorState message={aging.error} onRetry={aging.refetch} />}
            {aging.data && (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={aging.data} layout="vertical" margin={{ top: 0, right: 12, bottom: 0, left: 30 }}>
                    <CartesianGrid horizontal={false} />
                    <XAxis type="number" {...axisProps} tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(0)}M`} />
                    <YAxis type="category" dataKey="bucket" {...axisProps} width={92} />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                      content={<ChartTooltip formatter={(v) => formatCurrency(v, "TL", true)} />}
                    />
                    <Bar dataKey="amount" name="Bakiye" radius={[0, 6, 6, 0]}>
                      {aging.data.map((_, i) => (
                        <Cell
                          key={i}
                          fill={["#34d399", "#38bdf8", "#fbbf24", "#fb923c", "#fb7185"][i]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </GlassCard>

          {/* Döviz pozisyonu + Zekat */}
          <div className="space-y-5">
            <GlassCard
              title="Döviz Pozisyonu"
              subtitle="Net uzun/kısa pozisyon"
              icon={Scale}
              iconClassName="bg-violet-500/10 text-violet-400"
            >
              {fx.loading && <LoadingState rows={2} />}
              {fx.data && (
                <div className="space-y-3">
                  {fx.data.map((p) => (
                    <div key={p.currency} className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-ink-100">{p.currency}</span>
                        <StatBadge tone={p.netPosition >= 0 ? "green" : "red"}>
                          Net {formatCurrency(p.netPosition, p.currency, true)}
                        </StatBadge>
                      </div>
                      <div className="mt-2 grid grid-cols-3 gap-2 text-[11px] text-ink-500">
                        <div>
                          <p>Alacak</p>
                          <p className="font-medium tabular-nums text-ink-200">
                            {formatCurrency(p.receivables, p.currency, true)}
                          </p>
                        </div>
                        <div>
                          <p>Borç</p>
                          <p className="font-medium tabular-nums text-ink-200">
                            {formatCurrency(p.payables, p.currency, true)}
                          </p>
                        </div>
                        <div>
                          <p>Kasa/Banka</p>
                          <p className="font-medium tabular-nums text-ink-200">
                            {formatCurrency(p.cashBalance, p.currency, true)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>

            <GlassCard
              title="Zekat Hesabı"
              subtitle="Cari dönem — %2.5"
              icon={HandCoins}
              iconClassName="bg-mint-500/10 text-mint-400"
            >
              {zakat.loading && <LoadingState rows={3} />}
              {zakat.data && (
                <div className="space-y-1.5 text-sm">
                  <DrawerField label="Nakit + Banka" value={formatCurrency(zakat.data.cashAndBank, "TL", true)} />
                  <DrawerField label="Alacaklar" value={formatCurrency(zakat.data.receivables, "TL", true)} />
                  <DrawerField label="Stok Değeri" value={formatCurrency(zakat.data.inventory, "TL", true)} />
                  <DrawerField
                    label="Kısa Vadeli Borçlar"
                    value={`- ${formatCurrency(zakat.data.shortTermDebts, "TL", true)}`}
                    valueClassName="text-rose-400"
                  />
                  <DrawerField label="Zekat Matrahı" value={formatCurrency(zakat.data.zakatBase, "TL", true)} />
                  <div className="mt-3 rounded-xl bg-mint-500/10 p-3 text-center">
                    <p className="text-[11px] uppercase tracking-wide text-mint-400">
                      Hesaplanan Zekat
                    </p>
                    <p className="text-xl font-semibold tabular-nums text-mint-300">
                      {formatCurrency(zakat.data.zakatAmount, "TL")}
                    </p>
                  </div>
                </div>
              )}
            </GlassCard>
          </div>
        </div>

        {/* Gider kategorileri */}
        <GlassCard
          title="Gider Kategori Dağılımı"
          subtitle="Hammadde, personel, enerji, kira, yakıt ve diğer kalemler — bütçe karşılaştırmalı"
          icon={Receipt}
          iconClassName="bg-rose-500/10 text-rose-400"
        >
          {expenses.loading && <LoadingState rows={5} />}
          {expenses.error && <ErrorState message={expenses.error} onRetry={expenses.refetch} />}
          {expenses.data && (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={expenses.data} layout="vertical" margin={{ top: 0, right: 12, bottom: 0, left: 40 }}>
                    <CartesianGrid horizontal={false} />
                    <XAxis type="number" {...axisProps} tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(0)}M`} />
                    <YAxis type="category" dataKey="category" {...axisProps} width={104} />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                      content={<ChartTooltip formatter={(v) => formatCurrency(v, "TL", true)} />}
                    />
                    <Bar dataKey="amount" name="Gerçekleşen" fill="#fb7185" radius={[0, 5, 5, 0]} barSize={12} />
                    <Bar dataKey="budget" name="Bütçe" fill="#3d4d73" radius={[0, 5, 5, 0]} barSize={12} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2.5">
                {expenses.data.map((e) => {
                  const overBudget = e.amount > e.budget;
                  return (
                    <div key={e.category} className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-2.5">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ink-200">{e.category}</p>
                        <p className="text-[11px] text-ink-500">
                          Bütçe: {formatCurrency(e.budget, "TL", true)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold tabular-nums text-ink-100">
                          {formatCurrency(e.amount, "TL", true)}
                        </p>
                        <p className={cn("text-[11px] font-medium tabular-nums", overBudget ? "text-rose-400" : "text-mint-400")}>
                          {formatPercent(e.changePercent, true)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </GlassCard>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {/* En riskli 10 cari */}
          <GlassCard
            title="En Riskli 10 Cari"
            subtitle="Risk skoru ve vadesi geçmiş bakiye"
            icon={Scale}
            iconClassName="bg-rose-500/10 text-rose-400"
          >
            <div className="space-y-2">
              {riskiestCustomers.map((c, i) => (
                <div key={c.id} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-2.5">
                  <span className="w-5 text-center text-xs font-semibold tabular-nums text-ink-500">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink-200">{c.name}</p>
                    <p className="text-[11px] text-ink-500">{c.representative}</p>
                  </div>
                  {c.overdueBalance > 0 && (
                    <StatBadge tone="red">
                      {formatCurrency(c.overdueBalance, "TL", true)} gecikmiş
                    </StatBadge>
                  )}
                  <div className="flex w-24 items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          c.riskScore > 60 ? "bg-rose-500" : c.riskScore > 40 ? "bg-amber-400" : "bg-mint-400"
                        )}
                        style={{ width: `${c.riskScore}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold tabular-nums text-ink-300">
                      {c.riskScore}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Taksitli ödemeler */}
          <GlassCard
            title="Taksitli Ödeme Vade Takvimi"
            subtitle="Yaklaşan ve geciken taksitler"
            icon={CalendarClock}
          >
            {installments.loading && <LoadingState rows={6} />}
            {installments.error && (
              <ErrorState message={installments.error} onRetry={installments.refetch} />
            )}
            {installments.data && (
              <DataTable
                columns={installmentColumns}
                data={installments.data}
                searchPlaceholder="Cari ara…"
                pageSize={6}
                exportName="taksitli-odemeler"
                onRowClick={setSelectedPayment}
              />
            )}
          </GlassCard>
        </div>
      </div>

      <DetailDrawer
        open={!!selectedPayment}
        onClose={() => setSelectedPayment(null)}
        title={selectedPayment?.customer ?? ""}
        subtitle="Taksitli ödeme detayı"
      >
        {selectedPayment && (
          <div>
            <DrawerField
              label="Tutar"
              value={formatCurrency(selectedPayment.amount, selectedPayment.currency)}
            />
            <DrawerField label="Vade Tarihi" value={formatDate(selectedPayment.dueDate)} />
            <DrawerField
              label="Taksit"
              value={`${selectedPayment.installmentNo} / ${selectedPayment.totalInstallments}`}
            />
            <DrawerField
              label="Durum"
              value={
                <StatBadge tone={toneForStatus(selectedPayment.status)}>
                  {selectedPayment.status}
                </StatBadge>
              }
            />
            <DrawerField label="Para Birimi" value={selectedPayment.currency} />
          </div>
        )}
      </DetailDrawer>
    </AppShell>
  );
}
