import type {
  ProductionLine,
  ProductionGroupStat,
  ProductionOrder,
  WeeklyProduction,
  SampleApproval,
} from "@/types";

export const productionLines: ProductionLine[] = [
  { id: "line-01", name: "Ofset Baskı Hattı 1", type: "Matbaa", utilization: 92, dailyCapacity: 48_000, activeOrders: 14, defectRate: 1.4, status: "çalışıyor" },
  { id: "line-02", name: "Ofset Baskı Hattı 2", type: "Matbaa", utilization: 78, dailyCapacity: 42_000, activeOrders: 9, defectRate: 1.1, status: "çalışıyor" },
  { id: "line-03", name: "Kutu Kesim & Sıvama", type: "Kutu", utilization: 86, dailyCapacity: 26_000, activeOrders: 11, defectRate: 2.3, status: "çalışıyor" },
  { id: "line-04", name: "Dokuma Tezgah Grubu A", type: "Dokuma", utilization: 95, dailyCapacity: 120_000, activeOrders: 18, defectRate: 3.1, status: "çalışıyor" },
  { id: "line-05", name: "Dokuma Tezgah Grubu B", type: "Dokuma", utilization: 71, dailyCapacity: 95_000, activeOrders: 8, defectRate: 2.6, status: "çalışıyor" },
  { id: "line-06", name: "Flekso Baskı Etiket", type: "Baskı", utilization: 88, dailyCapacity: 210_000, activeOrders: 16, defectRate: 1.8, status: "çalışıyor" },
  { id: "line-07", name: "Dijital Baskı Etiket", type: "Baskı", utilization: 64, dailyCapacity: 85_000, activeOrders: 6, defectRate: 0.9, status: "çalışıyor" },
  { id: "line-08", name: "Silikon Enjeksiyon", type: "Aksesuar", utilization: 58, dailyCapacity: 35_000, activeOrders: 4, defectRate: 2.0, status: "bakımda" },
  { id: "line-09", name: "Plastik Enjeksiyon", type: "Aksesuar", utilization: 74, dailyCapacity: 60_000, activeOrders: 7, defectRate: 1.6, status: "çalışıyor" },
  { id: "line-10", name: "Kordon & İp Büküm", type: "Aksesuar", utilization: 52, dailyCapacity: 40_000, activeOrders: 3, defectRate: 1.2, status: "boşta" },
];

export const productionGroupStats: ProductionGroupStat[] = [
  { group: "Karton Kutu", type: "Kutu", produced: 412_000, target: 450_000, defective: 9_480, pendingOrders: 12, inProductionOrders: 8, completedOrders: 34, avgLeadTimeDays: 12.4, onTimeRate: 87 },
  { group: "Parfüm Kutusu", type: "Kutu", produced: 186_000, target: 200_000, defective: 4_650, pendingOrders: 7, inProductionOrders: 5, completedOrders: 19, avgLeadTimeDays: 14.8, onTimeRate: 82 },
  { group: "Kozmetik Kutusu", type: "Kutu", produced: 224_000, target: 230_000, defective: 4_930, pendingOrders: 5, inProductionOrders: 6, completedOrders: 22, avgLeadTimeDays: 13.2, onTimeRate: 90 },
  { group: "Karton Çanta", type: "Matbaa", produced: 158_000, target: 175_000, defective: 3_320, pendingOrders: 6, inProductionOrders: 4, completedOrders: 16, avgLeadTimeDays: 10.6, onTimeRate: 88 },
  { group: "Karton Etiket", type: "Matbaa", produced: 980_000, target: 1_000_000, defective: 13_720, pendingOrders: 9, inProductionOrders: 7, completedOrders: 41, avgLeadTimeDays: 7.2, onTimeRate: 93 },
  { group: "Dokuma Etiket", type: "Dokuma", produced: 1_240_000, target: 1_300_000, defective: 39_680, pendingOrders: 15, inProductionOrders: 12, completedOrders: 56, avgLeadTimeDays: 9.4, onTimeRate: 84 },
  { group: "Dokuma Şerit", type: "Dokuma", produced: 620_000, target: 650_000, defective: 14_880, pendingOrders: 8, inProductionOrders: 6, completedOrders: 28, avgLeadTimeDays: 8.8, onTimeRate: 89 },
  { group: "Baskı Etiket", type: "Baskı", produced: 760_000, target: 800_000, defective: 12_920, pendingOrders: 11, inProductionOrders: 9, completedOrders: 38, avgLeadTimeDays: 6.4, onTimeRate: 94 },
  { group: "Deri Etiket", type: "Aksesuar", produced: 96_000, target: 110_000, defective: 2_590, pendingOrders: 4, inProductionOrders: 3, completedOrders: 12, avgLeadTimeDays: 11.2, onTimeRate: 86 },
  { group: "Silikon Etiket", type: "Aksesuar", produced: 84_000, target: 95_000, defective: 1_680, pendingOrders: 3, inProductionOrders: 2, completedOrders: 10, avgLeadTimeDays: 12.8, onTimeRate: 81 },
  { group: "Plastik Aksesuar", type: "Aksesuar", produced: 142_000, target: 150_000, defective: 2_270, pendingOrders: 5, inProductionOrders: 4, completedOrders: 15, avgLeadTimeDays: 9.6, onTimeRate: 91 },
  { group: "Kordon İp", type: "Aksesuar", produced: 60_000, target: 80_000, defective: 720, pendingOrders: 2, inProductionOrders: 1, completedOrders: 8, avgLeadTimeDays: 7.8, onTimeRate: 95 },
];

export const weeklyProduction: WeeklyProduction[] = [
  { week: "18. Hf", baski: 168_000, dokuma: 412_000, matbaa: 248_000, kutu: 186_000, aksesuar: 82_000, defects: 21_400 },
  { week: "19. Hf", baski: 176_000, dokuma: 428_000, matbaa: 256_000, kutu: 194_000, aksesuar: 88_000, defects: 22_800 },
  { week: "20. Hf", baski: 182_000, dokuma: 405_000, matbaa: 262_000, kutu: 201_000, aksesuar: 91_000, defects: 24_100 },
  { week: "21. Hf", baski: 174_000, dokuma: 446_000, matbaa: 270_000, kutu: 208_000, aksesuar: 86_000, defects: 23_500 },
  { week: "22. Hf", baski: 190_000, dokuma: 462_000, matbaa: 278_000, kutu: 214_000, aksesuar: 94_000, defects: 26_900 },
  { week: "23. Hf", baski: 196_000, dokuma: 478_000, matbaa: 284_000, kutu: 221_000, aksesuar: 97_000, defects: 28_400 },
];

export const productionOrders: ProductionOrder[] = [
  { id: "po-001", orderNo: "YE-2026-1841", customer: "LC Waikiki", brand: "LC Waikiki", group: "Dokuma Etiket", quantity: 250_000, stage: "Üretimde", orderDate: "2026-05-28", dueDate: "2026-06-18", progress: 64, representative: "Ahmet Kaya", channel: "Yurt İçi", amount: 1_870_000, currency: "TL" },
  { id: "po-002", orderNo: "YE-2026-1842", customer: "Superdry UK", brand: "Superdry", group: "Baskı Etiket", quantity: 180_000, stage: "Kalite Kontrol", orderDate: "2026-05-22", dueDate: "2026-06-14", progress: 91, representative: "Ayşe Yılmaz", channel: "İhracat", amount: 86_000, currency: "USD" },
  { id: "po-003", orderNo: "YE-2026-1843", customer: "Vakko", brand: "Vakko", group: "Parfüm Kutusu", quantity: 24_000, stage: "Üretimde", orderDate: "2026-05-30", dueDate: "2026-06-22", progress: 48, representative: "Elif Arslan", channel: "Yurt İçi", amount: 1_240_000, currency: "TL" },
  { id: "po-004", orderNo: "YE-2026-1844", customer: "Mavi", brand: "Mavi", group: "Deri Etiket", quantity: 95_000, stage: "Üretim Sırası", orderDate: "2026-06-02", dueDate: "2026-06-28", progress: 12, representative: "Mehmet Demir", channel: "Yurt İçi", amount: 920_000, currency: "TL" },
  { id: "po-005", orderNo: "YE-2026-1845", customer: "Koton", brand: "Koton", group: "Karton Etiket", quantity: 420_000, stage: "Üretimde", orderDate: "2026-05-26", dueDate: "2026-06-16", progress: 76, representative: "Burak Şahin", channel: "Yurt İçi", amount: 1_390_000, currency: "TL" },
  { id: "po-006", orderNo: "YE-2026-1846", customer: "Pierre Cardin US", brand: "Pierre Cardin", group: "Karton Kutu", quantity: 36_000, stage: "Sevkiyata Hazır", orderDate: "2026-05-18", dueDate: "2026-06-12", progress: 100, representative: "Zeynep Koç", channel: "ABD Ofisi", amount: 124_000, currency: "USD" },
  { id: "po-007", orderNo: "YE-2026-1847", customer: "DeFacto", brand: "DeFacto", group: "Dokuma Şerit", quantity: 310_000, stage: "Üretimde", orderDate: "2026-05-29", dueDate: "2026-06-20", progress: 55, representative: "Ahmet Kaya", channel: "Yurt İçi", amount: 740_000, currency: "TL" },
  { id: "po-008", orderNo: "YE-2026-1848", customer: "İpekyol", brand: "İpekyol", group: "Karton Çanta", quantity: 42_000, stage: "Tasarım Onayı", orderDate: "2026-06-04", dueDate: "2026-07-02", progress: 8, representative: "Elif Arslan", channel: "Yurt İçi", amount: 980_000, currency: "TL" },
  { id: "po-009", orderNo: "YE-2026-1849", customer: "LTB Europe", brand: "LTB", group: "Dokuma Etiket", quantity: 220_000, stage: "Üretimde", orderDate: "2026-05-31", dueDate: "2026-06-24", progress: 42, representative: "Ayşe Yılmaz", channel: "İhracat", amount: 64_000, currency: "EUR" },
  { id: "po-010", orderNo: "YE-2026-1850", customer: "Boyner", brand: "Boyner", group: "Kozmetik Kutusu", quantity: 28_000, stage: "Numune Bekliyor", orderDate: "2026-06-06", dueDate: "2026-07-08", progress: 4, representative: "Mehmet Demir", channel: "Yurt İçi", amount: 1_120_000, currency: "TL" },
  { id: "po-011", orderNo: "YE-2026-1851", customer: "Network", brand: "Network", group: "Silikon Etiket", quantity: 56_000, stage: "Üretimde", orderDate: "2026-06-01", dueDate: "2026-06-26", progress: 38, representative: "Burak Şahin", channel: "Yurt İçi", amount: 610_000, currency: "TL" },
  { id: "po-012", orderNo: "YE-2026-1852", customer: "English Home", brand: "English Home", group: "Baskı Etiket", quantity: 380_000, stage: "Kalite Kontrol", orderDate: "2026-05-24", dueDate: "2026-06-15", progress: 94, representative: "Zeynep Koç", channel: "Yurt İçi", amount: 1_050_000, currency: "TL" },
  { id: "po-013", orderNo: "YE-2026-1853", customer: "Damat Tween", brand: "Damat Tween", group: "Karton Kutu", quantity: 18_000, stage: "Üretimde", orderDate: "2026-06-03", dueDate: "2026-06-27", progress: 31, representative: "Ahmet Kaya", channel: "Yurt İçi", amount: 840_000, currency: "TL" },
  { id: "po-014", orderNo: "YE-2026-1854", customer: "Kiğılı", brand: "Kiğılı", group: "Plastik Aksesuar", quantity: 130_000, stage: "Üretim Sırası", orderDate: "2026-06-05", dueDate: "2026-06-30", progress: 10, representative: "Elif Arslan", channel: "Yurt İçi", amount: 460_000, currency: "TL" },
  { id: "po-015", orderNo: "YE-2026-1855", customer: "Superdry US", brand: "Superdry", group: "Kordon İp", quantity: 75_000, stage: "Teslim Edildi", orderDate: "2026-05-12", dueDate: "2026-06-05", progress: 100, representative: "Zeynep Koç", channel: "ABD Ofisi", amount: 38_000, currency: "USD" },
];

export const sampleApprovals: SampleApproval[] = [
  { id: "sa-01", customer: "Boyner", brand: "Boyner", group: "Kozmetik Kutusu", stage: "Numune Hazırlanıyor", requestDate: "2026-06-06", daysWaiting: 6, representative: "Mehmet Demir" },
  { id: "sa-02", customer: "İpekyol", brand: "İpekyol", group: "Karton Çanta", stage: "Müşteri Onayında", requestDate: "2026-06-04", daysWaiting: 8, representative: "Elif Arslan" },
  { id: "sa-03", customer: "Vakko", brand: "Vakko", group: "Deri Etiket", stage: "Revize İstendi", requestDate: "2026-05-28", daysWaiting: 15, representative: "Elif Arslan" },
  { id: "sa-04", customer: "LC Waikiki", brand: "LC Waikiki", group: "Dokuma Şerit", stage: "Onaylandı", requestDate: "2026-06-01", daysWaiting: 4, representative: "Ahmet Kaya" },
  { id: "sa-05", customer: "Mavi", brand: "Mavi", group: "Silikon Etiket", stage: "Müşteri Onayında", requestDate: "2026-06-08", daysWaiting: 4, representative: "Mehmet Demir" },
  { id: "sa-06", customer: "Pierre Cardin", brand: "Pierre Cardin", group: "Parfüm Kutusu", stage: "Numune Hazırlanıyor", requestDate: "2026-06-09", daysWaiting: 3, representative: "Zeynep Koç" },
];
