"use client";

import { AlertTriangle, Inbox, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export function LoadingState({
  className,
  rows = 3,
}: {
  className?: string;
  rows?: number;
}) {
  return (
    <div className={cn("space-y-3", className)} aria-busy>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-10 animate-pulse rounded-xl bg-white/[0.04]"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
  );
}

export function ErrorState({
  message = "Veri yüklenirken bir sorun oluştu.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-500/10">
        <AlertTriangle className="h-5 w-5 text-rose-400" />
      </div>
      <p className="text-sm text-ink-300">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-ink-200 transition hover:bg-white/5"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Tekrar dene
        </button>
      )}
    </div>
  );
}

export function EmptyState({
  message = "Gösterilecek kayıt bulunamadı.",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5">
        <Inbox className="h-5 w-5 text-ink-500" />
      </div>
      <p className="text-sm text-ink-400">{message}</p>
    </div>
  );
}
