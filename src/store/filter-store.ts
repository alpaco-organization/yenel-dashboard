"use client";

import { create } from "zustand";
import type { DashboardFilters } from "@/types";

interface FilterState extends DashboardFilters {
  setFilter: <K extends keyof DashboardFilters>(
    key: K,
    value: DashboardFilters[K]
  ) => void;
  resetFilters: () => void;
}

const defaultFilters: DashboardFilters = {
  dateRange: "month",
  productGroup: "all",
  brand: "all",
  representative: "all",
  currency: "TL",
  salesChannel: "all",
  productionType: "all",
};

export const useFilterStore = create<FilterState>((set) => ({
  ...defaultFilters,
  setFilter: (key, value) => set({ [key]: value }),
  resetFilters: () => set(defaultFilters),
}));
