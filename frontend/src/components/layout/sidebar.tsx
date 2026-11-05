"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  Factory,
  Boxes,
  Handshake,
  ShieldCheck,
  Truck,
  Users,
  FileBarChart,
  Settings,
  ChevronLeft,
  Tags,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui-store";

const navItems = [
  { href: "/dashboard", label: "Ana Dashboard", icon: LayoutDashboard },
  { href: "/finance", label: "Finans", icon: Wallet },
  { href: "/production", label: "Üretim", icon: Factory },
  { href: "/stocks", label: "Stok", icon: Boxes },
  { href: "/sales", label: "Satış & Cari", icon: Handshake },
  { href: "/quality", label: "Kalite / Hatalılar", icon: ShieldCheck },
  { href: "/operations", label: "Operasyon", icon: Truck },
  { href: "/representatives", label: "Temsilci & Prim", icon: Users },
  { href: "/reports", label: "Raporlar", icon: FileBarChart },
  { href: "/settings", label: "Ayarlar", icon: Settings },
];

function NavContent({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  const setMobileSidebar = useUiStore((s) => s.setMobileSidebar);

  return (
    <>
      <div
        className={cn(
          "flex h-16 items-center gap-3 border-b border-white/5 px-5",
          collapsed && "justify-center px-2"
        )}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500 to-violet-500 shadow-glow-blue">
          <Tags className="h-5 w-5 text-white" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight text-ink-100">
              Criamind
            </p>
            <p className="text-[10px] uppercase tracking-widest text-ink-500">
              Yönetim Paneli
            </p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileSidebar(false)}
              title={collapsed ? item.label : undefined}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
                collapsed && "justify-center px-2",
                active
                  ? "bg-electric-500/12 text-electric-300 shadow-[inset_0_0_0_1px_rgb(14_165_233_/_0.25)]"
                  : "text-ink-400 hover:bg-white/5 hover:text-ink-200"
              )}
            >
              <Icon
                className={cn(
                  "h-[18px] w-[18px] shrink-0 transition-colors",
                  active
                    ? "text-electric-400"
                    : "text-ink-500 group-hover:text-ink-300"
                )}
              />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-electric-400 shadow-glow-blue" />
              )}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="border-t border-white/5 p-4">
          <div className="glass rounded-xl p-3">
            <p className="text-[11px] font-medium text-ink-300">ERP Bağlantısı</p>
            <p className="mt-0.5 text-[10px] leading-relaxed text-ink-500">
              Demo veri modu aktif. Logo / Mikro / Netsis / Nebim entegrasyonuna
              hazır.
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-amber-400" />
              <span className="text-[10px] text-amber-400">Mock API</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function Sidebar() {
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const mobileOpen = useUiStore((s) => s.mobileSidebarOpen);
  const setMobileSidebar = useUiStore((s) => s.setMobileSidebar);

  return (
    <>
      {/* Desktop */}
      <aside
        className={cn(
          "glass-strong relative z-30 hidden h-screen shrink-0 flex-col transition-[width] duration-300 lg:flex",
          collapsed ? "w-[72px]" : "w-64"
        )}
      >
        <NavContent collapsed={collapsed} />
        <button
          onClick={toggleSidebar}
          aria-label="Menüyü daralt"
          className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-base-800 text-ink-400 transition hover:text-ink-100"
        >
          <ChevronLeft
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-300",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileSidebar(false)}
          />
          <aside className="glass-strong absolute left-0 top-0 flex h-full w-72 flex-col animate-fade-up">
            <button
              onClick={() => setMobileSidebar(false)}
              aria-label="Menüyü kapat"
              className="absolute right-3 top-4 z-10 rounded-lg p-1.5 text-ink-400 hover:bg-white/5"
            >
              <X className="h-5 w-5" />
            </button>
            <NavContent collapsed={false} />
          </aside>
        </div>
      )}
    </>
  );
}
