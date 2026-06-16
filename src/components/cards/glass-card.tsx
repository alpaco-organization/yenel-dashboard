"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  className?: string;
  contentClassName?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}

/** Bento grid'in temel yapı taşı — glassmorphism panel. */
export function GlassCard({
  title,
  subtitle,
  icon: Icon,
  iconClassName,
  className,
  contentClassName,
  action,
  children,
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "glass rounded-2xl transition-shadow duration-300 hover:shadow-[0_8px_40px_-12px_rgb(14_165_233_/_0.15)]",
        className
      )}
    >
      {(title || action) && (
        <header className="flex items-start justify-between gap-3 px-5 pt-4">
          <div className="flex items-center gap-2.5">
            {Icon && (
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg bg-electric-500/10 text-electric-400",
                  iconClassName
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
            )}
            <div>
              <h2 className="text-sm font-semibold tracking-tight text-ink-100">
                {title}
              </h2>
              {subtitle && <p className="text-xs text-ink-500">{subtitle}</p>}
            </div>
          </div>
          {action}
        </header>
      )}
      <div className={cn("p-5", (title || action) && "pt-4", contentClassName)}>
        {children}
      </div>
    </motion.section>
  );
}
