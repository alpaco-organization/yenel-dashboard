"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Tags,
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("admin@yeneletiket.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const ok = await login(email, password);
    setSubmitting(false);
    if (ok) {
      router.push("/dashboard");
    } else {
      setError("E-posta veya şifre hatalı. Demo: admin@yeneletiket.com / 123456");
    }
  };

  return (
    <div className="app-backdrop flex min-h-screen items-center justify-center p-4">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-white/8 lg:grid-cols-2">
        {/* Sol panel — marka */}
        <div className="relative hidden flex-col justify-between bg-gradient-to-br from-base-850 via-base-900 to-base-950 p-10 lg:flex">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-500 to-violet-500 shadow-glow-blue">
              <Tags className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-semibold tracking-tight text-ink-100">
                Yenel Etiket
              </p>
              <p className="text-[11px] uppercase tracking-widest text-ink-500">
                Yönetim Paneli
              </p>
            </div>
          </div>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl font-semibold leading-tight tracking-tight text-ink-100"
            >
              Üretimden finansa,
              <br />
              <span className="bg-gradient-to-r from-electric-400 to-violet-400 bg-clip-text text-transparent">
                tüm şirket tek ekranda.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 max-w-sm text-sm leading-relaxed text-ink-400"
            >
              Ciro, üretim, stok, cari risk, kalite ve temsilci performansı —
              haftalık ve aylık yönetim raporlarıyla birlikte.
            </motion.p>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-ink-500">
            <ShieldCheck className="h-4 w-4 text-mint-400" />
            ERP entegrasyonuna hazır altyapı — Logo · Mikro · Netsis · Nebim · Paraşüt
          </div>

          <div
            className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-electric-500/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -top-16 right-10 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl"
            aria-hidden
          />
        </div>

        {/* Sağ panel — form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-strong flex flex-col justify-center p-8 sm:p-12"
        >
          <div className="mb-8 lg:hidden">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-500 to-violet-500 shadow-glow-blue">
              <Tags className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-ink-100">Yenel Etiket</h1>
          </div>

          <h2 className="text-xl font-semibold tracking-tight text-ink-100">
            Yönetim girişi
          </h2>
          <p className="mt-1 text-sm text-ink-500">
            Devam etmek için hesabınızla oturum açın.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-ink-400">
                E-posta
              </span>
              <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 transition focus-within:border-electric-500/50 focus-within:shadow-glow-blue">
                <Mail className="h-4 w-4 shrink-0 text-ink-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@yeneletiket.com"
                  autoComplete="email"
                  required
                  className="w-full bg-transparent text-sm text-ink-100 outline-none placeholder:text-ink-500"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-ink-400">
                Şifre
              </span>
              <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 transition focus-within:border-electric-500/50 focus-within:shadow-glow-blue">
                <Lock className="h-4 w-4 shrink-0 text-ink-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  autoComplete="current-password"
                  required
                  className="w-full bg-transparent text-sm text-ink-100 outline-none placeholder:text-ink-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                  className="text-ink-500 transition hover:text-ink-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </label>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-rose-500/25 bg-rose-500/10 px-3.5 py-2.5 text-xs text-rose-300"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-electric-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-glow-blue transition hover:brightness-110 disabled:opacity-60"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Giriş Yap
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-white/8 bg-white/[0.02] p-3.5 text-center">
            <p className="text-[11px] text-ink-500">
              Demo hesap —{" "}
              <span className="font-medium text-ink-300">
                admin@yeneletiket.com
              </span>{" "}
              / <span className="font-medium text-ink-300">123456</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
