"use client";

import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { useFilterStore } from "@/store/filter-store";
import type {
  Currency,
  DashboardFilters,
  DateRangeKey,
  ProductGroup,
  ProductionType,
  SalesChannel,
} from "@/types";

const dateRanges: { key: DateRangeKey; label: string }[] = [
  { key: "today", label: "Bugün" },
  { key: "week", label: "Bu Hafta" },
  { key: "month", label: "Bu Ay" },
  { key: "quarter", label: "Son 3 Ay" },
  { key: "halfYear", label: "Son 6 Ay" },
  { key: "year", label: "Yıl" },
];

const productGroups: ProductGroup[] = [
  "Karton Kutu", "Parfüm Kutusu", "Kozmetik Kutusu", "Karton Çanta",
  "Karton Etiket", "Dokuma Etiket", "Dokuma Şerit", "Baskı Etiket",
  "Deri Etiket", "Silikon Etiket", "Plastik Aksesuar", "Kordon İp",
];

const brandOptions = [
  "LC Waikiki", "Boyner", "İpekyol", "Pierre Cardin", "LTB", "Superdry",
  "Mavi", "Koton", "DeFacto", "Network", "Vakko", "Damat Tween",
  "Kiğılı", "English Home",
];

const repOptions = [
  "Ahmet Kaya", "Ayşe Yılmaz", "Mehmet Demir",
  "Elif Arslan", "Burak Şahin", "Zeynep Koç",
];

const currencies: Currency[] = ["TL", "USD", "EUR"];
const channels: SalesChannel[] = ["Yurt İçi", "İhracat", "ABD Ofisi"];
const productionTypes: ProductionType[] = ["Baskı", "Dokuma", "Matbaa", "Kutu", "Aksesuar"];

function Select({
  label,
  value,
  options,
  onChange,
  allLabel,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  allLabel?: string;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1">
      <span className="text-[10px] font-medium uppercase tracking-wide text-ink-500">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-white/10 bg-base-850 px-2.5 py-1.5 text-xs text-ink-200 outline-none transition focus:border-electric-500/50"
      >
        {allLabel && <option value="all">{allLabel}</option>}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

export function FilterBar() {
  const filters = useFilterStore();

  return (
    <div className="glass rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-ink-300">
          <SlidersHorizontal className="h-4 w-4 text-electric-400" />
          <span className="text-xs font-semibold uppercase tracking-wide">
            Filtreler
          </span>
        </div>
        <button
          onClick={filters.resetFilters}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] text-ink-500 transition hover:bg-white/5 hover:text-ink-200"
        >
          <RotateCcw className="h-3 w-3" />
          Sıfırla
        </button>
      </div>

      {/* Tarih segmented control */}
      <div className="mb-3 flex flex-wrap gap-1 rounded-xl border border-white/8 bg-white/[0.02] p-1">
        {dateRanges.map((r) => (
          <button
            key={r.key}
            onClick={() => filters.setFilter("dateRange", r.key)}
            className={
              filters.dateRange === r.key
                ? "rounded-lg bg-electric-500/15 px-3 py-1.5 text-xs font-medium text-electric-300 shadow-[inset_0_0_0_1px_rgb(14_165_233_/_0.3)]"
                : "rounded-lg px-3 py-1.5 text-xs text-ink-400 transition hover:bg-white/5 hover:text-ink-200"
            }
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Select
          label="Ürün Grubu"
          value={filters.productGroup}
          options={productGroups}
          allLabel="Tüm Gruplar"
          onChange={(v) =>
            filters.setFilter(
              "productGroup",
              v as DashboardFilters["productGroup"]
            )
          }
        />
        <Select
          label="Marka"
          value={filters.brand}
          options={brandOptions}
          allLabel="Tüm Markalar"
          onChange={(v) => filters.setFilter("brand", v)}
        />
        <Select
          label="Temsilci"
          value={filters.representative}
          options={repOptions}
          allLabel="Tüm Temsilciler"
          onChange={(v) => filters.setFilter("representative", v)}
        />
        <Select
          label="Para Birimi"
          value={filters.currency}
          options={currencies}
          onChange={(v) => filters.setFilter("currency", v as Currency)}
        />
        <Select
          label="Satış Tipi"
          value={filters.salesChannel}
          options={channels}
          allLabel="Tümü"
          onChange={(v) =>
            filters.setFilter(
              "salesChannel",
              v as DashboardFilters["salesChannel"]
            )
          }
        />
        <Select
          label="Üretim Tipi"
          value={filters.productionType}
          options={productionTypes}
          allLabel="Tümü"
          onChange={(v) =>
            filters.setFilter(
              "productionType",
              v as DashboardFilters["productionType"]
            )
          }
        />
      </div>
    </div>
  );
}
