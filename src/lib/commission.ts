import type { CommissionResult, Representative } from "@/types";

/**
 * Dummy prim kuralı:
 * - Hedefin %80 altı: prim yok
 * - %80-100: ciro üzerinden %0.5
 * - %100-120: %1
 * - %120+: %1.5
 * - Tahsilat oranı %70 altındaysa primden %30 kesinti
 * - Gecikmiş bakiye, cironun %15'inden fazlaysa uyarı
 */
export function calculateCommission(rep: Representative): CommissionResult {
  const achievementRate = (rep.revenue / rep.target) * 100;

  let baseRate = 0;
  let tier = "Prim yok";
  if (achievementRate >= 120) {
    baseRate = 1.5;
    tier = "%120 üzeri — %1.5";
  } else if (achievementRate >= 100) {
    baseRate = 1.0;
    tier = "%100-120 — %1.0";
  } else if (achievementRate >= 80) {
    baseRate = 0.5;
    tier = "%80-100 — %0.5";
  }

  const grossCommission = rep.revenue * (baseRate / 100);
  const collectionPenalty =
    rep.collectionRate < 70 ? grossCommission * 0.3 : 0;
  const netCommission = grossCommission - collectionPenalty;
  const hasOverdueWarning = rep.overdueBalance > rep.revenue * 0.15;

  return {
    representative: rep,
    achievementRate,
    baseRate,
    grossCommission,
    collectionPenalty,
    netCommission,
    hasOverdueWarning,
    tier,
  };
}
