/* ── Ortak ──────────────────────────────────────────────────── */

export type Currency = "TL" | "USD" | "EUR";
export type SalesChannel = "Yurt İçi" | "İhracat" | "ABD Ofisi";
export type ProductionType = "Baskı" | "Dokuma" | "Matbaa" | "Kutu" | "Aksesuar";
export type HealthStatus = "iyi" | "riskli" | "kritik";

export type DateRangeKey =
  | "today"
  | "week"
  | "month"
  | "quarter"
  | "halfYear"
  | "year";

export type ProductGroup =
  | "Karton Kutu"
  | "Parfüm Kutusu"
  | "Kozmetik Kutusu"
  | "Karton Çanta"
  | "Karton Etiket"
  | "Dokuma Etiket"
  | "Dokuma Şerit"
  | "Baskı Etiket"
  | "Deri Etiket"
  | "Silikon Etiket"
  | "Plastik Aksesuar"
  | "Kordon İp";

export interface DashboardFilters {
  dateRange: DateRangeKey;
  productGroup: ProductGroup | "all";
  brand: string | "all";
  representative: string | "all";
  currency: Currency;
  salesChannel: SalesChannel | "all";
  productionType: ProductionType | "all";
}

/* ── KPI ────────────────────────────────────────────────────── */

export interface KpiMetric {
  id: string;
  label: string;
  value: number;
  unit: "TL" | "USD" | "EUR" | "%" | "adet" | "lt";
  changePercent: number; // önceki döneme göre
  sparkline: number[];
  status: HealthStatus;
  invertedTrend?: boolean; // artış kötü ise (gider, hata oranı vb.)
}

/* ── Finans ─────────────────────────────────────────────────── */

export interface MonthlyFinancial {
  month: string; // "Oca", "Şub" ...
  revenue: number;
  expenses: number;
  grossProfit: number;
  netProfit: number;
  revenueTL: number;
  revenueUSD: number;
  revenueEUR: number;
  collections: number;
}

export interface ExpenseCategory {
  category: string;
  amount: number;
  budget: number;
  changePercent: number;
}

export interface AgingBucket {
  bucket: string; // "0-30", "31-60" ...
  amount: number;
  accountCount: number;
}

export interface InstallmentPayment {
  id: string;
  customer: string;
  dueDate: string;
  amount: number;
  currency: Currency;
  installmentNo: number;
  totalInstallments: number;
  status: "ödendi" | "bekliyor" | "gecikti";
}

export interface FxPosition {
  currency: Currency;
  receivables: number;
  payables: number;
  cashBalance: number;
  netPosition: number;
  rate: number; // TL karşılığı kur
}

export interface ZakatInfo {
  cashAndBank: number;
  receivables: number;
  inventory: number;
  shortTermDebts: number;
  nisabThreshold: number;
  zakatBase: number;
  zakatAmount: number; // %2.5
}

/* ── Üretim ─────────────────────────────────────────────────── */

export type OrderStage =
  | "Numune Bekliyor"
  | "Tasarım Onayı"
  | "Üretim Sırası"
  | "Üretimde"
  | "Kalite Kontrol"
  | "Sevkiyata Hazır"
  | "Teslim Edildi";

export interface ProductionLine {
  id: string;
  name: string;
  type: ProductionType;
  utilization: number; // %
  dailyCapacity: number;
  activeOrders: number;
  defectRate: number; // %
  status: "çalışıyor" | "bakımda" | "boşta";
}

export interface ProductionGroupStat {
  group: ProductGroup;
  type: ProductionType;
  produced: number;
  target: number;
  defective: number;
  pendingOrders: number;
  inProductionOrders: number;
  completedOrders: number;
  avgLeadTimeDays: number;
  onTimeRate: number; // %
}

export interface ProductionOrder {
  id: string;
  orderNo: string;
  customer: string;
  brand: string;
  group: ProductGroup;
  quantity: number;
  stage: OrderStage;
  orderDate: string;
  dueDate: string;
  progress: number; // %
  representative: string;
  channel: SalesChannel;
  amount: number;
  currency: Currency;
}

export interface WeeklyProduction {
  week: string;
  baski: number;
  dokuma: number;
  matbaa: number;
  kutu: number;
  aksesuar: number;
  defects: number;
}

export interface SampleApproval {
  id: string;
  customer: string;
  brand: string;
  group: ProductGroup;
  stage: "Numune Hazırlanıyor" | "Müşteri Onayında" | "Revize İstendi" | "Onaylandı";
  requestDate: string;
  daysWaiting: number;
  representative: string;
}

/* ── Stok ───────────────────────────────────────────────────── */

export type StockType = "Hammadde" | "Yarı Mamul" | "Mamul";
export type StockStatus = "normal" | "kritik" | "hareketsiz" | "hızlı";

export interface StockItem {
  id: string;
  code: string;
  name: string;
  group: ProductGroup | "Genel";
  type: StockType;
  brand: string;
  quantity: number;
  reserved: number;
  available: number;
  criticalLevel: number;
  unitCost: number;
  totalValue: number;
  lastMovement: string;
  status: StockStatus;
  monthlyTurnover: number;
}

/* ── Satış & Cari ───────────────────────────────────────────── */

export interface Brand {
  id: string;
  name: string;
  revenue: number;
  revenueLastPeriod: number;
  profitMargin: number; // %
  orderCount: number;
  topGroup: ProductGroup;
  channel: SalesChannel;
}

export interface Customer {
  id: string;
  name: string;
  brand: string;
  representative: string;
  totalRevenue: number;
  revenueCurrency: Currency;
  openBalance: number;
  overdueBalance: number;
  riskLimit: number;
  riskScore: number; // 0-100, yüksek = riskli
  lastOrderDate: string;
  lastCollectionDate: string;
  openedDate: string;
  isNew: boolean;
  channel: SalesChannel;
  groupBreakdown: { group: ProductGroup; share: number }[];
}

export interface RankedRevenue {
  rank: number;
  customer: string;
  brand: string;
  amount: number;
  currency: Currency;
  changePercent: number;
  representative: string;
}

export interface ChannelSales {
  channel: SalesChannel;
  revenue: number;
  orderCount: number;
  share: number;
}

/* ── Temsilci & Prim ────────────────────────────────────────── */

export interface Representative {
  id: string;
  name: string;
  region: string;
  revenue: number;
  target: number;
  collections: number;
  collectionRate: number; // %
  newCustomers: number;
  overdueBalance: number;
  returnImpact: number; // iade/hata tutarı
  monthlyRevenue: number[];
}

export interface CommissionResult {
  representative: Representative;
  achievementRate: number;
  baseRate: number; // %
  grossCommission: number;
  collectionPenalty: number;
  netCommission: number;
  hasOverdueWarning: boolean;
  tier: string;
}

/* ── Kalite ─────────────────────────────────────────────────── */

export interface DefectReason {
  reason: string;
  count: number;
  cost: number;
  share: number;
}

export interface QualityGroupStat {
  group: ProductGroup;
  produced: number;
  defective: number;
  defectRate: number;
  fireCost: number;
  trend: number[];
}

export interface CustomerComplaint {
  id: string;
  customer: string;
  brand: string;
  group: ProductGroup;
  reason: string;
  date: string;
  status: "açık" | "inceleniyor" | "çözüldü";
  severity: "düşük" | "orta" | "yüksek";
}

export interface Certificate {
  name: string;
  status: "geçerli" | "yenileme yaklaşıyor" | "süresi doldu";
  expiryDate: string;
  scope: string;
}

/* ── Operasyon ──────────────────────────────────────────────── */

export interface PurchaseOrder {
  id: string;
  supplier: string;
  category: string;
  amount: number;
  currency: Currency;
  date: string;
  status: "teslim alındı" | "yolda" | "sipariş verildi";
  onTime: boolean;
}

export interface SupplierPerformance {
  supplier: string;
  category: string;
  totalPurchases: number;
  onTimeRate: number;
  qualityScore: number;
  orderCount: number;
}

export interface FuelRecord {
  id: string;
  vehicle: string;
  plate: string;
  driver: string;
  liters: number;
  cost: number;
  km: number;
  date: string;
}

export interface WeeklyOpex {
  week: string;
  fuel: number;
  maintenance: number;
  logistics: number;
  other: number;
}

/* ── Raporlar & AI ──────────────────────────────────────────── */

export type ReportType =
  | "Haftalık Yönetim Raporu"
  | "Aylık Yönetim Raporu"
  | "Finans Raporu"
  | "Üretim Raporu"
  | "Stok Raporu"
  | "Satış & Cari Raporu"
  | "Kalite Raporu"
  | "Operasyon Raporu";

export interface ReportDefinition {
  id: string;
  type: ReportType;
  period: string;
  generatedAt: string;
  summary: string;
  highlights: string[];
  risks: string[];
  opportunities: string[];
}

export type InsightTone = "positive" | "negative" | "warning" | "info";

export interface AiInsight {
  id: string;
  tone: InsightTone;
  category: string;
  text: string;
  metric?: string;
}
