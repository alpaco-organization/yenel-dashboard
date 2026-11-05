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
import { Car, Fuel, ShoppingCart, Star, Truck, Wallet } from "lucide-react";
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
import type { FuelRecord, PurchaseOrder } from "@/types";
import { purchaseCategories } from "@/data/operations";

const purchaseColumns: ColumnDef<PurchaseOrder, unknown>[] = [
  { accessorKey: "supplier", header: "Tedarikçi" },
  { accessorKey: "category", header: "Kategori" },
  {
    accessorKey: "amount",
    header: "Tutar",
    cell: ({ row }) =>
      formatCurrency(row.original.amount, row.original.currency, true),
  },
  {
    accessorKey: "date",
    header: "Tarih",
    cell: ({ row }) => formatDate(row.original.date),
  },
  {
    accessorKey: "onTime",
    header: "Termin",
    cell: ({ row }) =>
      row.original.onTime ? (
        <StatBadge tone="green">zamanında</StatBadge>
      ) : (
        <StatBadge tone="red">gecikti</StatBadge>
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

const fuelColumns: ColumnDef<FuelRecord, unknown>[] = [
  { accessorKey: "vehicle", header: "Araç" },
  { accessorKey: "plate", header: "Plaka" },
  { accessorKey: "driver", header: "Sürücü" },
  {
    accessorKey: "liters",
    header: "Litre",
    cell: ({ row }) => `${formatNumber(row.original.liters)} lt`,
  },
  {
    accessorKey: "cost",
    header: "Maliyet",
    cell: ({ row }) => formatCurrency(row.original.cost, "TL", true),
  },
  {
    accessorKey: "km",
    header: "KM",
    cell: ({ row }) => formatNumber(row.original.km),
  },
  {
    id: "efficiency",
    header: "lt/100km",
    cell: ({ row }) => {
      const eff = (row.original.liters / row.original.km) * 100;
      return (
        <span
          className={cn(
            "font-medium tabular-nums",
            eff > 20 ? "text-rose-400" : eff > 10 ? "text-amber-400" : "text-mint-400"
          )}
        >
          {eff.toFixed(1)}
        </span>
      );
    },
  },
];

export default function OperationsPage() {
  const purchases = useAsyncData(() => api.getPurchaseOrders());
  const suppliers = useAsyncData(() => api.getSupplierPerformance());
  const fuel = useAsyncData(() => api.getFuelRecords());
  const opex = useAsyncData(() => api.getWeeklyOpex());
  const [selectedPurchase, setSelectedPurchase] = useState<PurchaseOrder | null>(null);
  const [selectedFuel, setSelectedFuel] = useState<FuelRecord | null>(null);

  const fuelTotals = fuel.data
    ? {
        liters: fuel.data.reduce((s, f) => s + f.liters, 0),
        cost: fuel.data.reduce((s, f) => s + f.cost, 0),
      }
    : null;

  const purchaseTotal = purchases.data
    ? purchases.data.reduce(
        (s, p) => s + (p.currency === "TL" ? p.amount : p.amount * 42),
        0
      )
    : null;

  return (
    <AppShell title="Operasyon" subtitle="Satın alma, tedarikçi performansı ve filo yönetimi">
      <div className="space-y-5">
        {/* Özet */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Aylık Satın Alma", value: purchaseTotal ? formatCurrency(purchaseTotal, "TL", true) : "—", icon: ShoppingCart, color: "bg-electric-500/10 text-electric-400" },
            { label: "Yakıt Tüketimi", value: fuelTotals ? `${formatNumber(fuelTotals.liters, true)} lt` : "—", icon: Fuel, color: "bg-amber-500/10 text-amber-400" },
            { label: "Yakıt Maliyeti", value: fuelTotals ? formatCurrency(fuelTotals.cost, "TL", true) : "—", icon: Wallet, color: "bg-rose-500/10 text-rose-400" },
            { label: "Aktif Tedarikçi", value: suppliers.data ? `${suppliers.data.length}` : "—", icon: Truck, color: "bg-mint-500/10 text-mint-400" },
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
                    <p className="text-lg font-semibold tabular-nums text-ink-100">{item.value}</p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {/* Satın alma kategorileri */}
          <GlassCard
            title="Satın Alma Kategorileri"
            subtitle="Yıllık kümülatif dağılım"
            icon={ShoppingCart}
            className="xl:col-span-2"
          >
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={purchaseCategories}
                      dataKey="amount"
                      nameKey="category"
                      innerRadius={58}
                      outerRadius={95}
                      paddingAngle={3}
                      strokeWidth={0}
                    >
                      {purchaseCategories.map((_, i) => (
                        <Cell key={i} fill={chartPalette[i % chartPalette.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip formatter={(v) => formatCurrency(v, "TL", true)} />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {purchaseCategories.slice(0, 8).map((c, i) => (
                  <div key={c.category} className="flex items-center justify-between gap-2 text-sm">
                    <span className="flex min-w-0 items-center gap-2 text-ink-400">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ background: chartPalette[i % chartPalette.length] }}
                      />
                      <span className="truncate">{c.category}</span>
                    </span>
                    <span className="shrink-0 font-semibold tabular-nums text-ink-100">
                      {formatCurrency(c.amount, "TL", true)}
                      <span className="ml-1.5 text-[11px] font-normal text-ink-500">
                        %{c.share}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Haftalık operasyon giderleri */}
          <GlassCard
            title="Haftalık Operasyon Giderleri"
            subtitle="Yakıt, bakım, lojistik, diğer"
            icon={Wallet}
            iconClassName="bg-amber-500/10 text-amber-400"
          >
            {opex.loading && <LoadingState rows={5} />}
            {opex.error && <ErrorState message={opex.error} onRetry={opex.refetch} />}
            {opex.data && (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={opex.data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
                    <defs>
                      {["fuel", "logistics"].map((key, i) => (
                        <linearGradient key={key} id={`g-opx-${key}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={chartPalette[i === 0 ? 3 : 0]} stopOpacity={0.3} />
                          <stop offset="100%" stopColor={chartPalette[i === 0 ? 3 : 0]} stopOpacity={0} />
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="week" {...axisProps} />
                    <YAxis {...axisProps} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`} />
                    <Tooltip content={<ChartTooltip formatter={(v) => formatCurrency(v, "TL", true)} />} />
                    <Area type="monotone" dataKey="fuel" name="Yakıt" stroke={chartPalette[3]} strokeWidth={2} fill="url(#g-opx-fuel)" />
                    <Area type="monotone" dataKey="logistics" name="Lojistik" stroke={chartPalette[0]} strokeWidth={2} fill="url(#g-opx-logistics)" />
                    <Area type="monotone" dataKey="maintenance" name="Bakım" stroke={chartPalette[2]} strokeWidth={2} fill="transparent" />
                    <Area type="monotone" dataKey="other" name="Diğer" stroke={chartPalette[1]} strokeWidth={2} fill="transparent" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </GlassCard>
        </div>

        {/* Tedarikçi performansı */}
        <GlassCard
          title="Tedarikçi Performansı"
          subtitle="Zamanında teslim ve kalite skorları"
          icon={Star}
          iconClassName="bg-mint-500/10 text-mint-400"
        >
          {suppliers.loading && <LoadingState rows={5} />}
          {suppliers.error && <ErrorState message={suppliers.error} onRetry={suppliers.refetch} />}
          {suppliers.data && (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {suppliers.data.map((s) => (
                <div key={s.supplier} className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-ink-100">{s.supplier}</p>
                      <p className="text-[11px] text-ink-500">
                        {s.category} — {s.orderCount} sipariş —{" "}
                        {formatCurrency(s.totalPurchases, "TL", true)}
                      </p>
                    </div>
                    <StatBadge tone={s.onTimeRate >= 90 ? "green" : s.onTimeRate >= 80 ? "amber" : "red"}>
                      %{s.onTimeRate} zamanında
                    </StatBadge>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {[
                      { label: "Termin", value: s.onTimeRate },
                      { label: "Kalite", value: s.qualityScore },
                    ].map((m) => (
                      <div key={m.label}>
                        <div className="mb-1 flex justify-between text-[11px]">
                          <span className="text-ink-500">{m.label}</span>
                          <span className="font-semibold tabular-nums text-ink-200">%{m.value}</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              m.value >= 90 ? "bg-mint-400" : m.value >= 80 ? "bg-amber-400" : "bg-rose-400"
                            )}
                            style={{ width: `${m.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {/* Alımlar */}
          <GlassCard title="Son Alımlar" subtitle="Satıra tıklayınca detay açılır" icon={ShoppingCart}>
            {purchases.loading && <LoadingState rows={6} />}
            {purchases.error && (
              <ErrorState message={purchases.error} onRetry={purchases.refetch} />
            )}
            {purchases.data && (
              <DataTable
                columns={purchaseColumns}
                data={purchases.data}
                searchPlaceholder="Tedarikçi veya kategori ara…"
                pageSize={6}
                exportName="satin-almalar"
                onRowClick={setSelectedPurchase}
              />
            )}
          </GlassCard>

          {/* Araç bazlı yakıt */}
          <GlassCard
            title="Araç Bazlı Yakıt Tüketimi"
            subtitle="Sürücü ve verimlilik ile birlikte"
            icon={Car}
            iconClassName="bg-amber-500/10 text-amber-400"
          >
            {fuel.loading && <LoadingState rows={6} />}
            {fuel.error && <ErrorState message={fuel.error} onRetry={fuel.refetch} />}
            {fuel.data && (
              <DataTable
                columns={fuelColumns}
                data={fuel.data}
                searchPlaceholder="Araç, plaka veya sürücü ara…"
                pageSize={6}
                exportName="yakit-tuketimi"
                onRowClick={setSelectedFuel}
              />
            )}
          </GlassCard>
        </div>

        {/* Şoför bazlı tüketim grafiği */}
        <GlassCard
          title="Sürücü / Personel Bazlı Tüketim"
          subtitle="Aylık litre bazında"
          icon={Fuel}
          iconClassName="bg-rose-500/10 text-rose-400"
        >
          {fuel.data && (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fuel.data} margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="driver" {...axisProps} interval={0} angle={-18} textAnchor="end" height={56} />
                  <YAxis {...axisProps} />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.04)" }}
                    content={<ChartTooltip formatter={(v) => `${formatNumber(v)} lt`} />}
                  />
                  <Bar dataKey="liters" name="Litre" radius={[6, 6, 0, 0]}>
                    {fuel.data.map((f, i) => (
                      <Cell key={i} fill={f.liters > 2000 ? "#fb7185" : chartPalette[i % chartPalette.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </GlassCard>
      </div>

      {/* Drawers */}
      <DetailDrawer
        open={!!selectedPurchase}
        onClose={() => setSelectedPurchase(null)}
        title={selectedPurchase?.supplier ?? ""}
        subtitle="Satın alma detayı"
      >
        {selectedPurchase && (
          <div>
            <DrawerField label="Kategori" value={selectedPurchase.category} />
            <DrawerField
              label="Tutar"
              value={formatCurrency(selectedPurchase.amount, selectedPurchase.currency)}
            />
            <DrawerField label="Tarih" value={formatDate(selectedPurchase.date)} />
            <DrawerField
              label="Durum"
              value={
                <StatBadge tone={toneForStatus(selectedPurchase.status)}>
                  {selectedPurchase.status}
                </StatBadge>
              }
            />
            <DrawerField
              label="Termin"
              value={
                selectedPurchase.onTime ? (
                  <StatBadge tone="green">zamanında</StatBadge>
                ) : (
                  <StatBadge tone="red">gecikti</StatBadge>
                )
              }
            />
          </div>
        )}
      </DetailDrawer>

      <DetailDrawer
        open={!!selectedFuel}
        onClose={() => setSelectedFuel(null)}
        title={selectedFuel?.vehicle ?? ""}
        subtitle={selectedFuel?.plate}
      >
        {selectedFuel && (
          <div>
            <DrawerField label="Sürücü" value={selectedFuel.driver} />
            <DrawerField label="Tüketim" value={`${formatNumber(selectedFuel.liters)} lt`} />
            <DrawerField label="Maliyet" value={formatCurrency(selectedFuel.cost, "TL")} />
            <DrawerField label="Kilometre" value={formatNumber(selectedFuel.km)} />
            <DrawerField
              label="Verimlilik"
              value={`${((selectedFuel.liters / selectedFuel.km) * 100).toFixed(1)} lt/100km`}
            />
            <DrawerField label="Son Kayıt" value={formatDate(selectedFuel.date)} />
          </div>
        )}
      </DetailDrawer>
    </AppShell>
  );
}
