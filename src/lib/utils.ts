import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Currency, HealthStatus } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const currencySymbols: Record<Currency, string> = {
  TL: "₺",
  USD: "$",
  EUR: "€",
};

export function formatCurrency(
  value: number,
  currency: Currency = "TL",
  compact = false
): string {
  const symbol = currencySymbols[currency];
  if (compact) {
    if (Math.abs(value) >= 1_000_000)
      return `${symbol}${(value / 1_000_000).toLocaleString("tr-TR", { maximumFractionDigits: 2 })}M`;
    if (Math.abs(value) >= 1_000)
      return `${symbol}${(value / 1_000).toLocaleString("tr-TR", { maximumFractionDigits: 1 })}K`;
  }
  return `${symbol}${value.toLocaleString("tr-TR", { maximumFractionDigits: 0 })}`;
}

export function formatNumber(value: number, compact = false): string {
  if (compact) {
    if (Math.abs(value) >= 1_000_000)
      return `${(value / 1_000_000).toLocaleString("tr-TR", { maximumFractionDigits: 2 })}M`;
    if (Math.abs(value) >= 1_000)
      return `${(value / 1_000).toLocaleString("tr-TR", { maximumFractionDigits: 1 })}K`;
  }
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 0 });
}

export function formatPercent(value: number, signed = false): string {
  const sign = signed && value > 0 ? "+" : "";
  return `${sign}${value.toLocaleString("tr-TR", { maximumFractionDigits: 1 })}%`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export const statusColors: Record<
  HealthStatus,
  { text: string; bg: string; dot: string }
> = {
  iyi: {
    text: "text-mint-400",
    bg: "bg-mint-500/10 border-mint-500/25",
    dot: "bg-mint-400",
  },
  riskli: {
    text: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/25",
    dot: "bg-amber-400",
  },
  kritik: {
    text: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/25",
    dot: "bg-rose-400",
  },
};

/** Deterministik pseudo-random — dummy data tutarlılığı için */
export function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
