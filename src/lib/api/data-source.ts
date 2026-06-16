import type {
  KpiMetric,
  MonthlyFinancial,
  ExpenseCategory,
  AgingBucket,
  InstallmentPayment,
  FxPosition,
  ZakatInfo,
  ProductionLine,
  ProductionGroupStat,
  ProductionOrder,
  WeeklyProduction,
  SampleApproval,
  StockItem,
  Brand,
  Customer,
  RankedRevenue,
  ChannelSales,
  Representative,
  DefectReason,
  QualityGroupStat,
  CustomerComplaint,
  Certificate,
  PurchaseOrder,
  SupplierPerformance,
  FuelRecord,
  WeeklyOpex,
  ReportDefinition,
  AiInsight,
} from "@/types";

/**
 * ERP veri kaynağı sözleşmesi.
 *
 * Gerçek entegrasyonda bu interface'i implemente eden bir adapter yazılır:
 *   - LogoDataSource     (Logo REST servisi)
 *   - MikroDataSource    (Mikro API)
 *   - NetsisDataSource   (Netsis API)
 *   - NebimDataSource    (Nebim V3 API)
 *   - ParasutDataSource  (Paraşüt API)
 *
 * UI katmanı yalnızca bu sözleşmeye bağımlıdır; veri kaynağı değiştiğinde
 * component tarafında hiçbir değişiklik gerekmez.
 */
export interface ErpDataSource {
  // Dashboard
  getDashboardKpis(): Promise<KpiMetric[]>;
  getInsights(): Promise<AiInsight[]>;

  // Finans
  getMonthlyFinancials(): Promise<MonthlyFinancial[]>;
  getExpenseCategories(): Promise<ExpenseCategory[]>;
  getAgingBuckets(): Promise<AgingBucket[]>;
  getInstallmentPayments(): Promise<InstallmentPayment[]>;
  getFxPositions(): Promise<FxPosition[]>;
  getZakatInfo(): Promise<ZakatInfo>;

  // Üretim
  getProductionLines(): Promise<ProductionLine[]>;
  getProductionGroupStats(): Promise<ProductionGroupStat[]>;
  getProductionOrders(): Promise<ProductionOrder[]>;
  getWeeklyProduction(): Promise<WeeklyProduction[]>;
  getSampleApprovals(): Promise<SampleApproval[]>;

  // Stok
  getStockItems(): Promise<StockItem[]>;

  // Satış & Cari
  getBrands(): Promise<Brand[]>;
  getCustomers(): Promise<Customer[]>;
  getRankedRevenueTL(): Promise<RankedRevenue[]>;
  getRankedRevenueFX(): Promise<RankedRevenue[]>;
  getChannelSales(): Promise<ChannelSales[]>;

  // Temsilci
  getRepresentatives(): Promise<Representative[]>;

  // Kalite
  getDefectReasons(): Promise<DefectReason[]>;
  getQualityGroupStats(): Promise<QualityGroupStat[]>;
  getCustomerComplaints(): Promise<CustomerComplaint[]>;
  getCertificates(): Promise<Certificate[]>;

  // Operasyon
  getPurchaseOrders(): Promise<PurchaseOrder[]>;
  getSupplierPerformance(): Promise<SupplierPerformance[]>;
  getFuelRecords(): Promise<FuelRecord[]>;
  getWeeklyOpex(): Promise<WeeklyOpex[]>;

  // Raporlar
  getReports(): Promise<ReportDefinition[]>;
}
