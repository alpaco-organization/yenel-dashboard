"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { useAuthStore } from "@/store/auth-store";

interface AppShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

/** Tüm dashboard sayfalarını saran, auth-korumalı uygulama iskeleti. */
export function AppShell({ title, subtitle, children }: AppShellProps) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !user) router.replace("/login");
  }, [hydrated, user, router]);

  if (!hydrated || !user) {
    return (
      <div className="app-backdrop flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-3 text-ink-400">
          <span className="h-2 w-2 animate-pulse-soft rounded-full bg-electric-400" />
          <span className="text-sm">Oturum doğrulanıyor…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="app-backdrop flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={title} subtitle={subtitle} />
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 p-4 sm:p-6"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
