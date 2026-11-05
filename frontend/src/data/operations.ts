import type {
  PurchaseOrder,
  SupplierPerformance,
  FuelRecord,
  WeeklyOpex,
} from "@/types";

export const purchaseOrders: PurchaseOrder[] = [
  { id: "pu-01", supplier: "Kartonsan A.Ş.", category: "Karton & Kağıt", amount: 2_840_000, currency: "TL", date: "2026-06-08", status: "teslim alındı", onTime: true },
  { id: "pu-02", supplier: "Korteks İplik", category: "İplik", amount: 1_960_000, currency: "TL", date: "2026-06-06", status: "teslim alındı", onTime: true },
  { id: "pu-03", supplier: "Dow Chemical TR", category: "Silikon & Kimyasal", amount: 84_000, currency: "USD", date: "2026-06-10", status: "yolda", onTime: true },
  { id: "pu-04", supplier: "Mondi Tire Kutsan", category: "Karton & Kağıt", amount: 1_420_000, currency: "TL", date: "2026-06-04", status: "teslim alındı", onTime: false },
  { id: "pu-05", supplier: "Huber Group", category: "Boya & Mürekkep", amount: 96_000, currency: "EUR", date: "2026-06-09", status: "yolda", onTime: true },
  { id: "pu-06", supplier: "Petkim", category: "Plastik Granül", amount: 740_000, currency: "TL", date: "2026-06-02", status: "teslim alındı", onTime: true },
  { id: "pu-07", supplier: "Anadolu Deri", category: "Deri & Vegan Deri", amount: 580_000, currency: "TL", date: "2026-05-29", status: "teslim alındı", onTime: false },
  { id: "pu-08", supplier: "Shell Filo", category: "Yakıt", amount: 486_000, currency: "TL", date: "2026-06-11", status: "teslim alındı", onTime: true },
  { id: "pu-09", supplier: "Bobst Servis", category: "Makine Yedek Parça", amount: 38_000, currency: "EUR", date: "2026-06-07", status: "sipariş verildi", onTime: true },
  { id: "pu-10", supplier: "Aras Kargo Kurumsal", category: "Lojistik", amount: 312_000, currency: "TL", date: "2026-06-05", status: "teslim alındı", onTime: true },
];

export const supplierPerformance: SupplierPerformance[] = [
  { supplier: "Kartonsan A.Ş.", category: "Karton & Kağıt", totalPurchases: 14_680_000, onTimeRate: 96, qualityScore: 94, orderCount: 38 },
  { supplier: "Korteks İplik", category: "İplik", totalPurchases: 9_840_000, onTimeRate: 92, qualityScore: 91, orderCount: 42 },
  { supplier: "Mondi Tire Kutsan", category: "Karton & Kağıt", totalPurchases: 7_220_000, onTimeRate: 81, qualityScore: 88, orderCount: 24 },
  { supplier: "Dow Chemical TR", category: "Silikon & Kimyasal", totalPurchases: 4_360_000, onTimeRate: 95, qualityScore: 97, orderCount: 16 },
  { supplier: "Huber Group", category: "Boya & Mürekkep", totalPurchases: 3_980_000, onTimeRate: 89, qualityScore: 93, orderCount: 19 },
  { supplier: "Petkim", category: "Plastik Granül", totalPurchases: 3_540_000, onTimeRate: 94, qualityScore: 90, orderCount: 14 },
  { supplier: "Anadolu Deri", category: "Deri & Vegan Deri", totalPurchases: 2_870_000, onTimeRate: 76, qualityScore: 85, orderCount: 21 },
  { supplier: "Aras Kargo Kurumsal", category: "Lojistik", totalPurchases: 1_960_000, onTimeRate: 91, qualityScore: 89, orderCount: 56 },
];

export const fuelRecords: FuelRecord[] = [
  { id: "fu-01", vehicle: "Mercedes Sprinter", plate: "34 YE 1001", driver: "Hasan Çelik", liters: 1_840, cost: 92_900, km: 14_200, date: "2026-06-10" },
  { id: "fu-02", vehicle: "Ford Transit", plate: "34 YE 1002", driver: "Murat Aydın", liters: 1_620, cost: 81_800, km: 12_800, date: "2026-06-09" },
  { id: "fu-03", vehicle: "Iveco Daily", plate: "34 YE 1003", driver: "Kemal Öztürk", liters: 1_480, cost: 74_700, km: 11_400, date: "2026-06-11" },
  { id: "fu-04", vehicle: "Mercedes Atego (Kamyon)", plate: "34 YE 2001", driver: "Selim Doğan", liters: 2_640, cost: 133_300, km: 9_600, date: "2026-06-08" },
  { id: "fu-05", vehicle: "Fiat Doblo (Satış)", plate: "34 YE 3001", driver: "Ahmet Kaya", liters: 680, cost: 34_300, km: 8_200, date: "2026-06-07" },
  { id: "fu-06", vehicle: "VW Caddy (Satış)", plate: "34 YE 3002", driver: "Mehmet Demir", liters: 720, cost: 36_400, km: 8_900, date: "2026-06-10" },
  { id: "fu-07", vehicle: "Renault Clio (Satış)", plate: "34 YE 3003", driver: "Elif Arslan", liters: 460, cost: 23_200, km: 6_400, date: "2026-06-06" },
  { id: "fu-08", vehicle: "Toyota Corolla (Yönetim)", plate: "34 YE 4001", driver: "Genel Müdür", liters: 400, cost: 20_200, km: 5_100, date: "2026-06-05" },
];

export const weeklyOpex: WeeklyOpex[] = [
  { week: "18. Hf", fuel: 198_000, maintenance: 64_000, logistics: 142_000, other: 88_000 },
  { week: "19. Hf", fuel: 204_000, maintenance: 48_000, logistics: 156_000, other: 92_000 },
  { week: "20. Hf", fuel: 212_000, maintenance: 86_000, logistics: 148_000, other: 84_000 },
  { week: "21. Hf", fuel: 218_000, maintenance: 52_000, logistics: 161_000, other: 96_000 },
  { week: "22. Hf", fuel: 226_000, maintenance: 71_000, logistics: 154_000, other: 90_000 },
  { week: "23. Hf", fuel: 246_000, maintenance: 58_000, logistics: 168_000, other: 94_000 },
];

export const purchaseCategories = [
  { category: "Karton & Kağıt", amount: 21_900_000, share: 38.2 },
  { category: "İplik", amount: 9_840_000, share: 17.2 },
  { category: "Boya & Mürekkep", amount: 5_420_000, share: 9.5 },
  { category: "Silikon & Kimyasal", amount: 4_360_000, share: 7.6 },
  { category: "Plastik Granül", amount: 3_540_000, share: 6.2 },
  { category: "Deri & Vegan Deri", amount: 2_870_000, share: 5.0 },
  { category: "Yakıt", amount: 2_640_000, share: 4.6 },
  { category: "Makine Yedek Parça", amount: 2_480_000, share: 4.3 },
  { category: "Lojistik", amount: 1_960_000, share: 3.4 },
  { category: "Diğer", amount: 2_290_000, share: 4.0 },
];
