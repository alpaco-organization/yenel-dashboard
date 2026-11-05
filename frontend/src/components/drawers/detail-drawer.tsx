"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface DetailDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

/** Tablolardan satır tıklamasıyla sağdan açılan detay paneli. */
export function DetailDrawer({
  open,
  onClose,
  title,
  subtitle,
  children,
}: DetailDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="glass-strong absolute right-0 top-0 flex h-full w-full max-w-md flex-col"
          >
            <header className="flex items-start justify-between gap-3 border-b border-white/8 p-5">
              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold text-ink-100">
                  {title}
                </h2>
                {subtitle && (
                  <p className="mt-0.5 text-xs text-ink-500">{subtitle}</p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Paneli kapat"
                className="rounded-lg p-1.5 text-ink-400 transition hover:bg-white/5 hover:text-ink-100"
              >
                <X className="h-5 w-5" />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto p-5">{children}</div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

export function DrawerField({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/5 py-2.5 last:border-0">
      <span className="text-xs text-ink-500">{label}</span>
      <span className={`text-sm font-medium text-ink-100 ${valueClassName ?? ""}`}>
        {value}
      </span>
    </div>
  );
}
