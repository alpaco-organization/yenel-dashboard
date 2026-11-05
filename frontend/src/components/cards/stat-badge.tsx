"use client";

import { cn } from "@/lib/utils";

type BadgeTone =
  | "green"
  | "red"
  | "amber"
  | "blue"
  | "violet"
  | "neutral";

const tones: Record<BadgeTone, string> = {
  green: "bg-mint-500/10 text-mint-400 border-mint-500/25",
  red: "bg-rose-500/10 text-rose-400 border-rose-500/25",
  amber: "bg-amber-500/10 text-amber-400 border-amber-500/25",
  blue: "bg-electric-500/10 text-electric-300 border-electric-500/25",
  violet: "bg-violet-500/10 text-violet-300 border-violet-500/25",
  neutral: "bg-white/5 text-ink-300 border-white/10",
};

export function StatBadge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: BadgeTone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/** Yaygın durum metinlerini badge tonuna çevirir. */
export function toneForStatus(status: string): BadgeTone {
  const s = status.toLowerCase();
  if (["iyi", "ödendi", "geçerli", "çözüldü", "teslim alındı", "onaylandı", "normal", "hızlı", "çalışıyor", "teslim edildi", "düşük"].includes(s)) return "green";
  if (["kritik", "gecikti", "süresi doldu", "açık", "yüksek", "hareketsiz"].includes(s)) return "red";
  if (["riskli", "bekliyor", "yenileme yaklaşıyor", "inceleniyor", "yolda", "orta", "bakımda", "revize istendi", "müşteri onayında"].includes(s)) return "amber";
  if (["üretimde", "kalite kontrol", "sipariş verildi"].includes(s)) return "blue";
  if (["boşta", "numune bekliyor", "numune hazırlanıyor", "üretim sırası", "tasarım onayı", "sevkiyata hazır"].includes(s)) return "violet";
  return "neutral";
}
