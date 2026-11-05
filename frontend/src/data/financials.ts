import type {
  MonthlyFinancial,
  ExpenseCategory,
  AgingBucket,
  FxPosition,
  ZakatInfo,
  KpiMetric,
} from "@/types";

/** Son 12 ay finansal özet (TL) */
export const monthlyFinancials: MonthlyFinancial[] = [
  { month: "Tem", revenue: 38_450_000, expenses: 29_120_000, grossProfit: 13_780_000, netProfit: 9_330_000, revenueTL: 21_900_000, revenueUSD: 11_200_000, revenueEUR: 5_350_000, collections: 34_100_000 },
  { month: "Ağu", revenue: 41_200_000, expenses: 30_540_000, grossProfit: 15_010_000, netProfit: 10_660_000, revenueTL: 23_500_000, revenueUSD: 12_100_000, revenueEUR: 5_600_000, collections: 36_800_000 },
  { month: "Eyl", revenue: 44_780_000, expenses: 32_310_000, grossProfit: 16_420_000, netProfit: 12_470_000, revenueTL: 25_200_000, revenueUSD: 13_400_000, revenueEUR: 6_180_000, collections: 39_500_000 },
  { month: "Eki", revenue: 47_350_000, expenses: 34_080_000, grossProfit: 17_510_000, netProfit: 13_270_000, revenueTL: 26_400_000, revenueUSD: 14_300_000, revenueEUR: 6_650_000, collections: 42_300_000 },
  { month: "Kas", revenue: 45_120_000, expenses: 33_640_000, grossProfit: 16_350_000, netProfit: 11_480_000, revenueTL: 25_100_000, revenueUSD: 13_600_000, revenueEUR: 6_420_000, collections: 40_900_000 },
  { month: "Ara", revenue: 52_840_000, expenses: 37_210_000, grossProfit: 19_980_000, netProfit: 15_630_000, revenueTL: 29_300_000, revenueUSD: 16_200_000, revenueEUR: 7_340_000, collections: 47_600_000 },
  { month: "Oca", revenue: 39_680_000, expenses: 31_450_000, grossProfit: 13_910_000, netProfit: 8_230_000, revenueTL: 22_400_000, revenueUSD: 11_800_000, revenueEUR: 5_480_000, collections: 35_200_000 },
  { month: "Şub", revenue: 42_310_000, expenses: 32_180_000, grossProfit: 15_240_000, netProfit: 10_130_000, revenueTL: 23_800_000, revenueUSD: 12_700_000, revenueEUR: 5_810_000, collections: 37_900_000 },
  { month: "Mar", revenue: 46_920_000, expenses: 33_870_000, grossProfit: 17_350_000, netProfit: 13_050_000, revenueTL: 26_100_000, revenueUSD: 14_200_000, revenueEUR: 6_620_000, collections: 41_700_000 },
  { month: "Nis", revenue: 49_540_000, expenses: 35_420_000, grossProfit: 18_640_000, netProfit: 14_120_000, revenueTL: 27_500_000, revenueUSD: 15_100_000, revenueEUR: 6_940_000, collections: 44_100_000 },
  { month: "May", revenue: 51_270_000, expenses: 36_190_000, grossProfit: 19_510_000, netProfit: 15_080_000, revenueTL: 28_300_000, revenueUSD: 15_800_000, revenueEUR: 7_170_000, collections: 45_800_000 },
  { month: "Haz", revenue: 54_630_000, expenses: 37_840_000, grossProfit: 21_240_000, netProfit: 16_790_000, revenueTL: 30_100_000, revenueUSD: 17_100_000, revenueEUR: 7_430_000, collections: 48_900_000 },
];

export const expenseCategories: ExpenseCategory[] = [
  { category: "Hammadde", amount: 16_840_000, budget: 16_000_000, changePercent: 8.4 },
  { category: "Personel", amount: 9_320_000, budget: 9_500_000, changePercent: 3.1 },
  { category: "Enerji", amount: 3_780_000, budget: 3_500_000, changePercent: 12.6 },
  { category: "Kira", amount: 1_850_000, budget: 1_850_000, changePercent: 0 },
  { category: "Yakıt", amount: 1_420_000, budget: 1_300_000, changePercent: 9.2 },
  { category: "Lojistik", amount: 1_980_000, budget: 2_100_000, changePercent: -4.8 },
  { category: "Bakım & Onarım", amount: 940_000, budget: 1_000_000, changePercent: -2.3 },
  { category: "Pazarlama", amount: 760_000, budget: 900_000, changePercent: -11.5 },
  { category: "Genel Yönetim", amount: 950_000, budget: 1_000_000, changePercent: 1.8 },
];

export const agingBuckets: AgingBucket[] = [
  { bucket: "Vadesi Gelmemiş", amount: 18_640_000, accountCount: 86 },
  { bucket: "0-30 gün", amount: 7_420_000, accountCount: 41 },
  { bucket: "31-60 gün", amount: 4_180_000, accountCount: 23 },
  { bucket: "61-90 gün", amount: 2_350_000, accountCount: 12 },
  { bucket: "90+ gün", amount: 3_870_000, accountCount: 9 },
];

export const fxPositions: FxPosition[] = [
  { currency: "USD", receivables: 2_840_000, payables: 1_120_000, cashBalance: 685_000, netPosition: 2_405_000, rate: 41.8 },
  { currency: "EUR", receivables: 1_390_000, payables: 740_000, cashBalance: 310_000, netPosition: 960_000, rate: 45.2 },
];

export const zakatInfo: ZakatInfo = {
  cashAndBank: 28_450_000,
  receivables: 36_460_000,
  inventory: 31_280_000,
  shortTermDebts: 24_870_000,
  nisabThreshold: 1_240_000,
  zakatBase: 71_320_000,
  zakatAmount: 1_783_000,
};

/** Ana dashboard KPI kartları */
export const dashboardKpis: KpiMetric[] = [
  { id: "total-revenue", label: "Toplam Ciro", value: 54_630_000, unit: "TL", changePercent: 6.6, sparkline: [39.7, 42.3, 46.9, 49.5, 51.3, 54.6], status: "iyi" },
  { id: "tl-revenue", label: "TL Ciro", value: 30_100_000, unit: "TL", changePercent: 6.4, sparkline: [22.4, 23.8, 26.1, 27.5, 28.3, 30.1], status: "iyi" },
  { id: "fx-revenue", label: "Döviz Ciro (TL karşılığı)", value: 24_530_000, unit: "TL", changePercent: 6.8, sparkline: [17.3, 18.5, 20.8, 22.0, 23.0, 24.5], status: "iyi" },
  { id: "gross-profit", label: "Brüt Kâr", value: 21_240_000, unit: "TL", changePercent: 8.9, sparkline: [13.9, 15.2, 17.4, 18.6, 19.5, 21.2], status: "iyi" },
  { id: "net-profit", label: "Net Kâr", value: 16_790_000, unit: "TL", changePercent: 11.3, sparkline: [8.2, 10.1, 13.1, 14.1, 15.1, 16.8], status: "iyi" },
  { id: "total-expense", label: "Toplam Gider", value: 37_840_000, unit: "TL", changePercent: 4.6, sparkline: [31.5, 32.2, 33.9, 35.4, 36.2, 37.8], status: "riskli", invertedTrend: true },
  { id: "open-balance", label: "Açık Bakiye", value: 36_460_000, unit: "TL", changePercent: 3.2, sparkline: [32.1, 33.4, 34.2, 35.1, 35.8, 36.5], status: "riskli", invertedTrend: true },
  { id: "collection-rate", label: "Tahsilat Oranı", value: 89.5, unit: "%", changePercent: 0.3, sparkline: [88.7, 89.6, 88.9, 89.0, 89.3, 89.5], status: "iyi" },
  { id: "order-count", label: "Sipariş Sayısı", value: 1_284, unit: "adet", changePercent: 7.4, sparkline: [1015, 1078, 1142, 1190, 1196, 1284], status: "iyi" },
  { id: "production-count", label: "Üretim Adedi", value: 4_862_000, unit: "adet", changePercent: 5.8, sparkline: [3.9, 4.1, 4.3, 4.5, 4.6, 4.86], status: "iyi" },
  { id: "defect-rate", label: "Hatalı Üretim Oranı", value: 2.18, unit: "%", changePercent: 14.7, sparkline: [1.7, 1.8, 1.9, 1.9, 2.0, 2.18], status: "kritik", invertedTrend: true },
  { id: "stock-value", label: "Stok Değeri", value: 31_280_000, unit: "TL", changePercent: 2.1, sparkline: [29.4, 29.9, 30.2, 30.6, 30.9, 31.3], status: "iyi" },
  { id: "critical-stock", label: "Kritik Stok Sayısı", value: 14, unit: "adet", changePercent: 27.3, sparkline: [8, 9, 10, 11, 12, 14], status: "kritik", invertedTrend: true },
  { id: "new-customers", label: "Yeni Cari Sayısı", value: 18, unit: "adet", changePercent: 20.0, sparkline: [11, 12, 14, 13, 15, 18], status: "iyi" },
  { id: "fuel", label: "Yakıt Tüketimi", value: 9_840, unit: "lt", changePercent: 9.1, sparkline: [8.2, 8.4, 8.7, 8.9, 9.0, 9.84], status: "riskli", invertedTrend: true },
  { id: "installments", label: "Taksitli Ödeme Toplamı", value: 8_640_000, unit: "TL", changePercent: -2.4, sparkline: [9.4, 9.2, 9.0, 8.9, 8.8, 8.6], status: "iyi", invertedTrend: true },
];
