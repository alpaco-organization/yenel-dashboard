"use client";

import { useState } from "react";
import {
  Bell,
  Building2,
  Database,
  Globe,
  Palette,
  Plug,
  ShieldCheck,
  User,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { GlassCard } from "@/components/cards/glass-card";
import { StatBadge } from "@/components/cards/stat-badge";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

const erpOptions = [
  { name: "Mock API (Demo)", status: "bağlı", description: "Yerel dummy veri katmanı" },
  { name: "Logo Tiger / GO", status: "hazır", description: "REST servis adaptörü tanımlı" },
  { name: "Mikro", status: "hazır", description: "API adaptörü tanımlı" },
  { name: "Netsis", status: "hazır", description: "API adaptörü tanımlı" },
  { name: "Nebim V3", status: "hazır", description: "API adaptörü tanımlı" },
  { name: "Paraşüt", status: "hazır", description: "API adaptörü tanımlı" },
  { name: "Özel ERP", status: "hazır", description: "ErpDataSource interface implementasyonu" },
];

function Toggle({
  label,
  description,
  defaultOn = true,
}: {
  label: string;
  description: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-left transition hover:bg-white/[0.04]"
    >
      <div>
        <p className="text-sm font-medium text-ink-100">{label}</p>
        <p className="text-[11px] text-ink-500">{description}</p>
      </div>
      <span
        className={cn(
          "relative h-5.5 w-10 shrink-0 rounded-full transition-colors",
          on ? "bg-electric-500" : "bg-white/10"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-4.5 w-4.5 rounded-full bg-white transition-all",
            on ? "left-5" : "left-0.5"
          )}
        />
      </span>
    </button>
  );
}

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <AppShell title="Ayarlar" subtitle="Hesap, bildirim ve ERP entegrasyon ayarları">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Profil */}
        <GlassCard title="Hesap Bilgileri" icon={User}>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-500 to-violet-500 text-lg font-semibold text-white shadow-glow-blue">
              {(user?.name ?? "Y").charAt(0)}
            </div>
            <div>
              <p className="text-base font-semibold text-ink-100">{user?.name}</p>
              <p className="text-sm text-ink-400">{user?.email}</p>
              <StatBadge tone="violet" className="mt-1.5">
                {user?.role}
              </StatBadge>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
              <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-ink-500">
                <Building2 className="h-3.5 w-3.5" /> Firma
              </p>
              <p className="mt-1 text-sm font-medium text-ink-100">
                Yenel Etiket San. ve Tic. A.Ş.
              </p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
              <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-ink-500">
                <Globe className="h-3.5 w-3.5" /> Bölge / Dil
              </p>
              <p className="mt-1 text-sm font-medium text-ink-100">Türkiye — Türkçe (TR)</p>
            </div>
          </div>
        </GlassCard>

        {/* Bildirimler */}
        <GlassCard title="Bildirim Tercihleri" icon={Bell} iconClassName="bg-amber-500/10 text-amber-400">
          <div className="space-y-2.5">
            <Toggle
              label="Haftalık yönetim raporu"
              description="Her Pazartesi 06:00'da e-posta ile gönderilir"
            />
            <Toggle
              label="Aylık yönetim raporu"
              description="Her ayın 1'inde e-posta ile gönderilir"
            />
            <Toggle
              label="Kritik stok uyarıları"
              description="Stok kritik seviyeye düştüğünde anlık bildirim"
            />
            <Toggle
              label="Vadesi geçen bakiye uyarıları"
              description="90+ gün gecikmelerde günlük özet"
            />
            <Toggle
              label="Hata oranı eşik uyarısı"
              description="Ürün grubu hata oranı %2.5'i aşarsa bildir"
              defaultOn={false}
            />
          </div>
        </GlassCard>

        {/* ERP entegrasyonu */}
        <GlassCard
          title="ERP Veri Kaynağı"
          subtitle="Aktif kaynak ve hazır adaptörler"
          icon={Plug}
          iconClassName="bg-mint-500/10 text-mint-400"
        >
          <div className="space-y-2.5">
            {erpOptions.map((erp) => (
              <div
                key={erp.name}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-xl border px-4 py-3",
                  erp.status === "bağlı"
                    ? "border-mint-500/25 bg-mint-500/[0.05]"
                    : "border-white/5 bg-white/[0.02]"
                )}
              >
                <div className="flex items-center gap-3">
                  <Database
                    className={cn(
                      "h-4.5 w-4.5",
                      erp.status === "bağlı" ? "text-mint-400" : "text-ink-500"
                    )}
                  />
                  <div>
                    <p className="text-sm font-medium text-ink-100">{erp.name}</p>
                    <p className="text-[11px] text-ink-500">{erp.description}</p>
                  </div>
                </div>
                <StatBadge tone={erp.status === "bağlı" ? "green" : "neutral"}>
                  {erp.status}
                </StatBadge>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-xl border border-electric-500/20 bg-electric-500/[0.05] p-3.5 text-xs leading-relaxed text-ink-300">
            Geçiş için <code className="text-electric-300">src/lib/api/index.ts</code>{" "}
            içindeki veri kaynağı tek satırla değiştirilir. Tüm sayfalar{" "}
            <code className="text-electric-300">ErpDataSource</code> sözleşmesine
            bağımlıdır; UI tarafında değişiklik gerekmez.
          </p>
        </GlassCard>

        {/* Görünüm & güvenlik */}
        <div className="space-y-5">
          <GlassCard title="Görünüm" icon={Palette} iconClassName="bg-violet-500/10 text-violet-400">
            <div className="space-y-2.5">
              <Toggle label="Koyu tema" description="Dark-mode-first tasarım (varsayılan)" />
              <Toggle label="Mikro animasyonlar" description="Kart geçişleri ve hover efektleri" />
              <Toggle
                label="Kompakt görünüm"
                description="Daha yoğun veri yerleşimi"
                defaultOn={false}
              />
            </div>
          </GlassCard>

          <GlassCard title="Güvenlik" icon={ShieldCheck} iconClassName="bg-mint-500/10 text-mint-400">
            <div className="space-y-2.5">
              <Toggle
                label="İki faktörlü doğrulama"
                description="Girişlerde SMS/TOTP doğrulaması"
                defaultOn={false}
              />
              <Toggle label="Oturum süresi sınırı" description="8 saat hareketsizlikte çıkış" />
            </div>
          </GlassCard>
        </div>
      </div>
    </AppShell>
  );
}
