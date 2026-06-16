import type { AiInsight } from "@/types";
import { monthlyFinancials } from "@/data/financials";
import { qualityGroupStats } from "@/data/quality";
import { stockItems } from "@/data/stocks";
import { representatives } from "@/data/representatives";
import { weeklyOpex } from "@/data/operations";
import { agingBuckets } from "@/data/financials";

/**
 * Rule-based yönetici özeti motoru.
 * Gerçek AI yerine veri üzerinden deterministik kurallarla insight üretir;
 * ERP entegrasyonunda aynı kurallar canlı veriyle çalışır.
 */
export function generateInsights(): AiInsight[] {
  const insights: AiInsight[] = [];

  // 1) Ciro değişimi
  const last = monthlyFinancials[monthlyFinancials.length - 1];
  const prev = monthlyFinancials[monthlyFinancials.length - 2];
  const revChange = ((last.revenue - prev.revenue) / prev.revenue) * 100;
  insights.push({
    id: "ins-revenue",
    tone: revChange >= 0 ? "positive" : "negative",
    category: "Ciro",
    text: `Bu ay toplam ciro geçen aya göre %${Math.abs(revChange).toFixed(1)} ${revChange >= 0 ? "arttı" : "azaldı"}.`,
    metric: `${(last.revenue / 1_000_000).toFixed(1)}M TL`,
  });

  // 2) Hata oranı son 4 hafta üzerinde mi?
  const worstQuality = [...qualityGroupStats].sort(
    (a, b) => b.defectRate - a.defectRate
  )[0];
  const trendAvg =
    worstQuality.trend.slice(0, 4).reduce((s, v) => s + v, 0) / 4;
  if (worstQuality.defectRate > trendAvg) {
    insights.push({
      id: "ins-quality",
      tone: "negative",
      category: "Kalite",
      text: `${worstQuality.group} üretiminde hata oranı (%${worstQuality.defectRate.toFixed(1)}) son 4 haftanın ortalamasının üzerine çıktı.`,
      metric: `%${worstQuality.defectRate.toFixed(1)}`,
    });
  }

  // 3) Kritik stok
  const criticalStocks = stockItems.filter((s) => s.status === "kritik");
  if (criticalStocks.length > 0) {
    const groups = [...new Set(criticalStocks.map((s) => s.name.split(" ")[0]))];
    insights.push({
      id: "ins-stock",
      tone: "warning",
      category: "Stok",
      text: `${criticalStocks.length} stok kalemi kritik seviyeye yaklaştı. Öncelikli: ${criticalStocks
        .slice(0, 2)
        .map((s) => s.name)
        .join(", ")}.`,
      metric: `${criticalStocks.length} kalem`,
    });
    void groups;
  }

  // 4) En iyi temsilci
  const bestRep = [...representatives].sort(
    (a, b) => b.revenue / b.target - a.revenue / a.target
  )[0];
  const bestRate = Math.round((bestRep.revenue / bestRep.target) * 100);
  insights.push({
    id: "ins-rep",
    tone: "positive",
    category: "Temsilci",
    text: `Temsilci ${bestRep.name} hedefinin %${bestRate}'ine ulaştı.`,
    metric: `%${bestRate}`,
  });

  // 5) USD ciro vs TL tahsilat
  const usdGrowth = ((last.revenueUSD - prev.revenueUSD) / prev.revenueUSD) * 100;
  const collRateNow = (last.collections / last.revenue) * 100;
  const collRatePrev = (prev.collections / prev.revenue) * 100;
  if (usdGrowth > 0 && collRateNow < collRatePrev) {
    insights.push({
      id: "ins-fx",
      tone: "warning",
      category: "Finans",
      text: `USD ciro %${usdGrowth.toFixed(1)} artarken TL tahsilat oranı %${collRatePrev.toFixed(1)}'den %${collRateNow.toFixed(1)}'e düştü.`,
    });
  }

  // 6) Yakıt tüketimi haftalık değişim
  const lastWeek = weeklyOpex[weeklyOpex.length - 1];
  const prevWeek = weeklyOpex[weeklyOpex.length - 2];
  const fuelChange = ((lastWeek.fuel - prevWeek.fuel) / prevWeek.fuel) * 100;
  if (Math.abs(fuelChange) > 5) {
    insights.push({
      id: "ins-fuel",
      tone: fuelChange > 0 ? "negative" : "positive",
      category: "Operasyon",
      text: `Yakıt tüketimi haftalık bazda %${Math.abs(fuelChange).toFixed(0)} ${fuelChange > 0 ? "yükseldi" : "düştü"}.`,
      metric: `${(lastWeek.fuel / 1000).toFixed(0)}K TL`,
    });
  }

  // 7) Vadesi geçmiş bakiye konsantrasyonu
  const overdue90 = agingBuckets.find((b) => b.bucket === "90+ gün");
  if (overdue90 && overdue90.amount > 3_000_000) {
    insights.push({
      id: "ins-overdue",
      tone: "warning",
      category: "Cari Risk",
      text: `Vadesi 90 günü aşan ${(overdue90.amount / 1_000_000).toFixed(1)}M TL bakiye ${overdue90.accountCount} caride yoğunlaşıyor.`,
      metric: `${(overdue90.amount / 1_000_000).toFixed(1)}M TL`,
    });
  }

  // 8) Düşük tahsilatlı temsilci
  const weakRep = representatives.find((r) => r.collectionRate < 70);
  if (weakRep) {
    insights.push({
      id: "ins-collection",
      tone: "negative",
      category: "Tahsilat",
      text: `${weakRep.name} bölgesinde tahsilat oranı %${weakRep.collectionRate} ile prim kesinti eşiğinin altında.`,
      metric: `%${weakRep.collectionRate}`,
    });
  }

  return insights;
}
