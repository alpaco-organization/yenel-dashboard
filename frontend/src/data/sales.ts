import type { Brand, RankedRevenue, ChannelSales } from "@/types";

export const brands: Brand[] = [
  { id: "br-01", name: "LC Waikiki", revenue: 8_940_000, revenueLastPeriod: 8_120_000, profitMargin: 28.4, orderCount: 186, topGroup: "Dokuma Etiket", channel: "Yurt İçi" },
  { id: "br-02", name: "Koton", revenue: 6_420_000, revenueLastPeriod: 6_080_000, profitMargin: 26.1, orderCount: 142, topGroup: "Baskı Etiket", channel: "Yurt İçi" },
  { id: "br-03", name: "DeFacto", revenue: 5_860_000, revenueLastPeriod: 5_540_000, profitMargin: 24.8, orderCount: 128, topGroup: "Dokuma Şerit", channel: "Yurt İçi" },
  { id: "br-04", name: "Mavi", revenue: 5_240_000, revenueLastPeriod: 4_760_000, profitMargin: 31.2, orderCount: 96, topGroup: "Deri Etiket", channel: "Yurt İçi" },
  { id: "br-05", name: "Superdry", revenue: 4_980_000, revenueLastPeriod: 4_310_000, profitMargin: 36.8, orderCount: 64, topGroup: "Baskı Etiket", channel: "İhracat" },
  { id: "br-06", name: "Vakko", revenue: 4_320_000, revenueLastPeriod: 4_450_000, profitMargin: 41.5, orderCount: 52, topGroup: "Parfüm Kutusu", channel: "Yurt İçi" },
  { id: "br-07", name: "Pierre Cardin", revenue: 3_960_000, revenueLastPeriod: 3_380_000, profitMargin: 34.2, orderCount: 58, topGroup: "Karton Kutu", channel: "ABD Ofisi" },
  { id: "br-08", name: "LTB", revenue: 3_540_000, revenueLastPeriod: 3_290_000, profitMargin: 29.6, orderCount: 72, topGroup: "Dokuma Etiket", channel: "İhracat" },
  { id: "br-09", name: "Boyner", revenue: 3_180_000, revenueLastPeriod: 3_020_000, profitMargin: 27.3, orderCount: 68, topGroup: "Kozmetik Kutusu", channel: "Yurt İçi" },
  { id: "br-10", name: "İpekyol", revenue: 2_840_000, revenueLastPeriod: 2_610_000, profitMargin: 33.1, orderCount: 54, topGroup: "Karton Çanta", channel: "Yurt İçi" },
  { id: "br-11", name: "English Home", revenue: 2_460_000, revenueLastPeriod: 2_280_000, profitMargin: 25.4, orderCount: 61, topGroup: "Karton Etiket", channel: "Yurt İçi" },
  { id: "br-12", name: "Network", revenue: 2_120_000, revenueLastPeriod: 1_940_000, profitMargin: 32.8, orderCount: 38, topGroup: "Silikon Etiket", channel: "Yurt İçi" },
  { id: "br-13", name: "Damat Tween", revenue: 1_880_000, revenueLastPeriod: 1_790_000, profitMargin: 30.5, orderCount: 32, topGroup: "Karton Kutu", channel: "Yurt İçi" },
  { id: "br-14", name: "Kiğılı", revenue: 1_540_000, revenueLastPeriod: 1_620_000, profitMargin: 26.9, orderCount: 28, topGroup: "Karton Etiket", channel: "Yurt İçi" },
];

export const rankedRevenueTL: RankedRevenue[] = [
  { rank: 1, customer: "LC Waikiki", brand: "LC Waikiki", amount: 8_940_000, currency: "TL", changePercent: 10.1, representative: "Ahmet Kaya" },
  { rank: 2, customer: "Koton", brand: "Koton", amount: 6_420_000, currency: "TL", changePercent: 5.6, representative: "Burak Şahin" },
  { rank: 3, customer: "DeFacto", brand: "DeFacto", amount: 5_860_000, currency: "TL", changePercent: 5.8, representative: "Ahmet Kaya" },
  { rank: 4, customer: "Mavi", brand: "Mavi", amount: 5_240_000, currency: "TL", changePercent: 10.1, representative: "Mehmet Demir" },
  { rank: 5, customer: "Vakko", brand: "Vakko", amount: 4_320_000, currency: "TL", changePercent: -2.9, representative: "Elif Arslan" },
  { rank: 6, customer: "Boyner", brand: "Boyner", amount: 3_180_000, currency: "TL", changePercent: 5.3, representative: "Mehmet Demir" },
  { rank: 7, customer: "İpekyol", brand: "İpekyol", amount: 2_840_000, currency: "TL", changePercent: 8.8, representative: "Elif Arslan" },
  { rank: 8, customer: "English Home", brand: "English Home", amount: 2_460_000, currency: "TL", changePercent: 7.9, representative: "Zeynep Koç" },
  { rank: 9, customer: "Network", brand: "Network", amount: 2_120_000, currency: "TL", changePercent: 9.3, representative: "Burak Şahin" },
  { rank: 10, customer: "Damat Tween", brand: "Damat Tween", amount: 1_880_000, currency: "TL", changePercent: 5.0, representative: "Ahmet Kaya" },
  { rank: 11, customer: "Kiğılı", brand: "Kiğılı", amount: 1_540_000, currency: "TL", changePercent: -4.9, representative: "Elif Arslan" },
];

export const rankedRevenueFX: RankedRevenue[] = [
  { rank: 1, customer: "Superdry UK", brand: "Superdry", amount: 1_240_000, currency: "USD", changePercent: 15.6, representative: "Ayşe Yılmaz" },
  { rank: 2, customer: "Pierre Cardin US", brand: "Pierre Cardin", amount: 980_000, currency: "USD", changePercent: 17.2, representative: "Zeynep Koç" },
  { rank: 3, customer: "LTB Europe", brand: "LTB", amount: 760_000, currency: "EUR", changePercent: 7.6, representative: "Ayşe Yılmaz" },
  { rank: 4, customer: "Superdry US", brand: "Superdry", amount: 640_000, currency: "USD", changePercent: 22.4, representative: "Zeynep Koç" },
  { rank: 5, customer: "Mavi Europe", brand: "Mavi", amount: 420_000, currency: "EUR", changePercent: 9.8, representative: "Ayşe Yılmaz" },
  { rank: 6, customer: "Koton MENA", brand: "Koton", amount: 380_000, currency: "USD", changePercent: 6.1, representative: "Burak Şahin" },
  { rank: 7, customer: "DeFacto Balkans", brand: "DeFacto", amount: 290_000, currency: "EUR", changePercent: 4.4, representative: "Ahmet Kaya" },
  { rank: 8, customer: "Vakko Gulf", brand: "Vakko", amount: 210_000, currency: "USD", changePercent: -3.2, representative: "Elif Arslan" },
];

export const channelSales: ChannelSales[] = [
  { channel: "Yurt İçi", revenue: 36_420_000, orderCount: 942, share: 66.7 },
  { channel: "İhracat", revenue: 12_180_000, orderCount: 248, share: 22.3 },
  { channel: "ABD Ofisi", revenue: 6_030_000, orderCount: 94, share: 11.0 },
];

/** Aylık yeni cari açılış trendi */
export const newCustomerTrend = [
  { month: "Oca", count: 9 },
  { month: "Şub", count: 11 },
  { month: "Mar", count: 14 },
  { month: "Nis", count: 13 },
  { month: "May", count: 15 },
  { month: "Haz", count: 18 },
];

/** ABD ofisi aylık satışları (USD) */
export const usOfficeSales = [
  { month: "Oca", amount: 96_000 },
  { month: "Şub", amount: 108_000 },
  { month: "Mar", amount: 121_000 },
  { month: "Nis", amount: 134_000 },
  { month: "May", amount: 129_000 },
  { month: "Haz", amount: 148_000 },
];
