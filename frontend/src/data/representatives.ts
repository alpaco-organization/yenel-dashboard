import type { Representative } from "@/types";

export const representatives: Representative[] = [
  {
    id: "rep-01", name: "Ahmet Kaya", region: "İstanbul Avrupa",
    revenue: 16_680_000, target: 15_000_000, collections: 14_850_000, collectionRate: 89,
    newCustomers: 3, overdueBalance: 695_000, returnImpact: 124_000,
    monthlyRevenue: [2.4, 2.6, 2.8, 2.7, 2.9, 3.3],
  },
  {
    id: "rep-02", name: "Ayşe Yılmaz", region: "İhracat — Avrupa",
    revenue: 14_160_000, target: 12_000_000, collections: 13_020_000, collectionRate: 92,
    newCustomers: 4, overdueBalance: 385_000, returnImpact: 86_000,
    monthlyRevenue: [1.9, 2.1, 2.3, 2.5, 2.6, 2.8],
  },
  {
    id: "rep-03", name: "Mehmet Demir", region: "İstanbul Anadolu",
    revenue: 10_840_000, target: 12_500_000, collections: 7_960_000, collectionRate: 73,
    newCustomers: 2, overdueBalance: 1_640_000, returnImpact: 215_000,
    monthlyRevenue: [1.8, 1.7, 1.9, 1.8, 1.8, 1.84],
  },
  {
    id: "rep-04", name: "Elif Arslan", region: "Ege & Akdeniz",
    revenue: 11_520_000, target: 11_000_000, collections: 9_330_000, collectionRate: 81,
    newCustomers: 3, overdueBalance: 1_820_000, returnImpact: 158_000,
    monthlyRevenue: [1.7, 1.8, 2.0, 1.9, 2.0, 2.12],
  },
  {
    id: "rep-05", name: "Burak Şahin", region: "İç Anadolu",
    revenue: 8_460_000, target: 11_000_000, collections: 5_580_000, collectionRate: 66,
    newCustomers: 2, overdueBalance: 1_090_000, returnImpact: 196_000,
    monthlyRevenue: [1.5, 1.4, 1.4, 1.4, 1.35, 1.41],
  },
  {
    id: "rep-06", name: "Zeynep Koç", region: "ABD Ofisi",
    revenue: 12_270_000, target: 9_500_000, collections: 11_290_000, collectionRate: 92,
    newCustomers: 4, overdueBalance: 215_000, returnImpact: 64_000,
    monthlyRevenue: [1.6, 1.8, 2.0, 2.2, 2.3, 2.37],
  },
];
