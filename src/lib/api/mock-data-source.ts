import type { ErpDataSource } from "./data-source";
import {
  dashboardKpis,
  monthlyFinancials,
  expenseCategories,
  agingBuckets,
  fxPositions,
  zakatInfo,
} from "@/data/financials";
import { installmentPayments } from "@/data/payments";
import {
  productionLines,
  productionGroupStats,
  productionOrders,
  weeklyProduction,
  sampleApprovals,
} from "@/data/production";
import { stockItems } from "@/data/stocks";
import {
  brands,
  rankedRevenueTL,
  rankedRevenueFX,
  channelSales,
} from "@/data/sales";
import { customers } from "@/data/customers";
import { representatives } from "@/data/representatives";
import {
  defectReasons,
  qualityGroupStats,
  customerComplaints,
  certificates,
} from "@/data/quality";
import {
  purchaseOrders,
  supplierPerformance,
  fuelRecords,
  weeklyOpex,
} from "@/data/operations";
import { reports } from "@/data/reports";
import { generateInsights } from "@/lib/insights";

/** Gerçek API gecikmesini simüle eder; loading state'lerin test edilmesini sağlar. */
function simulate<T>(data: T, delayMs = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delayMs));
}

export class MockDataSource implements ErpDataSource {
  getDashboardKpis() {
    return simulate(dashboardKpis);
  }
  getInsights() {
    return simulate(generateInsights(), 500);
  }
  getMonthlyFinancials() {
    return simulate(monthlyFinancials);
  }
  getExpenseCategories() {
    return simulate(expenseCategories);
  }
  getAgingBuckets() {
    return simulate(agingBuckets);
  }
  getInstallmentPayments() {
    return simulate(installmentPayments);
  }
  getFxPositions() {
    return simulate(fxPositions);
  }
  getZakatInfo() {
    return simulate(zakatInfo);
  }
  getProductionLines() {
    return simulate(productionLines);
  }
  getProductionGroupStats() {
    return simulate(productionGroupStats);
  }
  getProductionOrders() {
    return simulate(productionOrders);
  }
  getWeeklyProduction() {
    return simulate(weeklyProduction);
  }
  getSampleApprovals() {
    return simulate(sampleApprovals);
  }
  getStockItems() {
    return simulate(stockItems);
  }
  getBrands() {
    return simulate(brands);
  }
  getCustomers() {
    return simulate(customers);
  }
  getRankedRevenueTL() {
    return simulate(rankedRevenueTL);
  }
  getRankedRevenueFX() {
    return simulate(rankedRevenueFX);
  }
  getChannelSales() {
    return simulate(channelSales);
  }
  getRepresentatives() {
    return simulate(representatives);
  }
  getDefectReasons() {
    return simulate(defectReasons);
  }
  getQualityGroupStats() {
    return simulate(qualityGroupStats);
  }
  getCustomerComplaints() {
    return simulate(customerComplaints);
  }
  getCertificates() {
    return simulate(certificates);
  }
  getPurchaseOrders() {
    return simulate(purchaseOrders);
  }
  getSupplierPerformance() {
    return simulate(supplierPerformance);
  }
  getFuelRecords() {
    return simulate(fuelRecords);
  }
  getWeeklyOpex() {
    return simulate(weeklyOpex);
  }
  getReports() {
    return simulate(reports);
  }
}
