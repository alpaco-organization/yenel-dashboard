import type {
  DefectReason,
  QualityGroupStat,
  CustomerComplaint,
  Certificate,
} from "@/types";

export const defectReasons: DefectReason[] = [
  { reason: "Renk farkı", count: 28_400, cost: 486_000, share: 25.6 },
  { reason: "Ölçü hatası", count: 19_200, cost: 342_000, share: 17.3 },
  { reason: "Baskı kayması", count: 16_800, cost: 298_000, share: 15.1 },
  { reason: "Dokuma çözgü problemi", count: 14_300, cost: 384_000, share: 12.9 },
  { reason: "Kesim hatası", count: 11_600, cost: 226_000, share: 10.4 },
  { reason: "Yapıştırma problemi", count: 8_900, cost: 184_000, share: 8.0 },
  { reason: "Ambalaj hasarı", count: 5_400, cost: 96_000, share: 4.9 },
  { reason: "Yanlış ürün", count: 3_800, cost: 142_000, share: 3.4 },
  { reason: "Termin gecikmesi", count: 2_700, cost: 168_000, share: 2.4 },
];

export const qualityGroupStats: QualityGroupStat[] = [
  { group: "Dokuma Etiket", produced: 1_240_000, defective: 39_680, defectRate: 3.2, fireCost: 612_000, trend: [2.4, 2.6, 2.8, 2.9, 3.0, 3.2] },
  { group: "Dokuma Şerit", produced: 620_000, defective: 14_880, defectRate: 2.4, fireCost: 248_000, trend: [2.6, 2.5, 2.4, 2.5, 2.4, 2.4] },
  { group: "Karton Kutu", produced: 412_000, defective: 9_480, defectRate: 2.3, fireCost: 286_000, trend: [2.0, 2.1, 2.2, 2.1, 2.2, 2.3] },
  { group: "Parfüm Kutusu", produced: 186_000, defective: 4_650, defectRate: 2.5, fireCost: 198_000, trend: [2.8, 2.7, 2.6, 2.6, 2.5, 2.5] },
  { group: "Kozmetik Kutusu", produced: 224_000, defective: 4_930, defectRate: 2.2, fireCost: 164_000, trend: [2.4, 2.3, 2.3, 2.2, 2.2, 2.2] },
  { group: "Karton Çanta", produced: 158_000, defective: 3_320, defectRate: 2.1, fireCost: 112_000, trend: [2.2, 2.3, 2.2, 2.1, 2.1, 2.1] },
  { group: "Karton Etiket", produced: 980_000, defective: 13_720, defectRate: 1.4, fireCost: 134_000, trend: [1.6, 1.5, 1.5, 1.4, 1.4, 1.4] },
  { group: "Baskı Etiket", produced: 760_000, defective: 12_920, defectRate: 1.7, fireCost: 156_000, trend: [1.5, 1.5, 1.6, 1.6, 1.7, 1.7] },
  { group: "Deri Etiket", produced: 96_000, defective: 2_590, defectRate: 2.7, fireCost: 142_000, trend: [2.4, 2.5, 2.5, 2.6, 2.6, 2.7] },
  { group: "Silikon Etiket", produced: 84_000, defective: 1_680, defectRate: 2.0, fireCost: 88_000, trend: [2.2, 2.1, 2.1, 2.0, 2.0, 2.0] },
  { group: "Plastik Aksesuar", produced: 142_000, defective: 2_270, defectRate: 1.6, fireCost: 64_000, trend: [1.8, 1.7, 1.7, 1.6, 1.6, 1.6] },
  { group: "Kordon İp", produced: 60_000, defective: 720, defectRate: 1.2, fireCost: 28_000, trend: [1.4, 1.3, 1.3, 1.2, 1.2, 1.2] },
];

export const customerComplaints: CustomerComplaint[] = [
  { id: "cc-01", customer: "LC Waikiki", brand: "LC Waikiki", group: "Dokuma Etiket", reason: "Renk farkı", date: "2026-06-09", status: "inceleniyor", severity: "yüksek" },
  { id: "cc-02", customer: "Koton", brand: "Koton", group: "Baskı Etiket", reason: "Baskı kayması", date: "2026-06-07", status: "açık", severity: "orta" },
  { id: "cc-03", customer: "Vakko", brand: "Vakko", group: "Parfüm Kutusu", reason: "Yapıştırma problemi", date: "2026-06-05", status: "inceleniyor", severity: "yüksek" },
  { id: "cc-04", customer: "Mavi", brand: "Mavi", group: "Deri Etiket", reason: "Ölçü hatası", date: "2026-06-02", status: "çözüldü", severity: "düşük" },
  { id: "cc-05", customer: "Superdry UK", brand: "Superdry", group: "Dokuma Etiket", reason: "Dokuma çözgü problemi", date: "2026-05-30", status: "çözüldü", severity: "orta" },
  { id: "cc-06", customer: "Boyner", brand: "Boyner", group: "Kozmetik Kutusu", reason: "Ambalaj hasarı", date: "2026-05-27", status: "çözüldü", severity: "düşük" },
  { id: "cc-07", customer: "DeFacto", brand: "DeFacto", group: "Dokuma Şerit", reason: "Termin gecikmesi", date: "2026-06-10", status: "açık", severity: "orta" },
  { id: "cc-08", customer: "Kiğılı", brand: "Kiğılı", group: "Karton Etiket", reason: "Kesim hatası", date: "2026-06-08", status: "inceleniyor", severity: "düşük" },
];

export const certificates: Certificate[] = [
  { name: "OEKO-TEX Standard 100", status: "geçerli", expiryDate: "2027-03-15", scope: "Dokuma ve baskı etiket" },
  { name: "GRS (Global Recycled Standard)", status: "geçerli", expiryDate: "2027-01-20", scope: "Geri dönüştürülmüş iplik ve karton" },
  { name: "FSC Sertifikası", status: "yenileme yaklaşıyor", expiryDate: "2026-08-30", scope: "Karton kutu ve etiket" },
  { name: "ISO 9001:2015", status: "geçerli", expiryDate: "2027-06-12", scope: "Kalite yönetim sistemi" },
  { name: "ISO 14001:2015", status: "geçerli", expiryDate: "2027-05-08", scope: "Çevre yönetim sistemi" },
  { name: "Sedex / SMETA", status: "yenileme yaklaşıyor", expiryDate: "2026-09-18", scope: "Etik ticaret denetimi" },
  { name: "BSCI", status: "geçerli", expiryDate: "2026-12-22", scope: "Sosyal uygunluk" },
];

/** Sürdürülebilirlik KPI'ları */
export const sustainabilityKpis = [
  { label: "Geri dönüştürülmüş hammadde oranı", value: 34, unit: "%", target: 40 },
  { label: "Su tüketimi (m³/ton üretim)", value: 12.4, unit: "m³", target: 11 },
  { label: "Enerji yoğunluğu (kWh/1000 adet)", value: 86, unit: "kWh", target: 80 },
  { label: "Atık geri kazanım oranı", value: 78, unit: "%", target: 85 },
];
