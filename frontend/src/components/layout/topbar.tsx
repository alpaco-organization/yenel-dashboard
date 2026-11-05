"use client";

import { useRouter } from "next/navigation";
import { Bell, LogOut, Menu, Search, Sparkles } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useUiStore } from "@/store/ui-store";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const setMobileSidebar = useUiStore((s) => s.setMobileSidebar);

  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-base-950/70 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        <button
          onClick={() => setMobileSidebar(true)}
          aria-label="Menüyü aç"
          className="rounded-lg p-2 text-ink-400 hover:bg-white/5 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-semibold tracking-tight text-ink-100 sm:text-lg">
            {title}
          </h1>
          {subtitle && (
            <p className="hidden truncate text-xs text-ink-500 sm:block">
              {subtitle}
            </p>
          )}
        </div>

        <div className="hidden items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 md:flex">
          <Search className="h-4 w-4 text-ink-500" />
          <input
            placeholder="Ara: cari, sipariş, ürün…"
            className="w-44 bg-transparent text-sm text-ink-200 outline-none placeholder:text-ink-500"
          />
        </div>

        <div className="hidden items-center gap-1.5 rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1.5 sm:flex">
          <Sparkles className="h-3.5 w-3.5 text-violet-400" />
          <span className="text-xs text-violet-300">AI Özet Aktif</span>
        </div>

        <button
          aria-label="Bildirimler"
          className="relative rounded-lg p-2 text-ink-400 transition hover:bg-white/5 hover:text-ink-200"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 shadow-glow-rose" />
        </button>

        <div className="flex items-center gap-3 border-l border-white/8 pl-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-ink-200">{user?.name ?? "Yönetici"}</p>
            <p className="text-[11px] text-ink-500">{user?.role ?? ""}</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-electric-500/80 to-violet-500/80 text-sm font-semibold text-white">
            {(user?.name ?? "Y").charAt(0)}
          </div>
          <button
            onClick={() => {
              logout();
              router.push("/login");
            }}
            aria-label="Çıkış yap"
            className="rounded-lg p-2 text-ink-500 transition hover:bg-rose-500/10 hover:text-rose-400"
          >
            <LogOut className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
