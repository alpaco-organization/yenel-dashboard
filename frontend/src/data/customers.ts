import type { Customer } from "@/types";

export const customers: Customer[] = [
  {
    id: "cr-001", name: "LC Waikiki Mağazacılık A.Ş.", brand: "LC Waikiki", representative: "Ahmet Kaya",
    totalRevenue: 8_940_000, revenueCurrency: "TL", openBalance: 3_240_000, overdueBalance: 420_000,
    riskLimit: 6_000_000, riskScore: 32, lastOrderDate: "2026-06-08", lastCollectionDate: "2026-06-05",
    openedDate: "2014-03-12", isNew: false, channel: "Yurt İçi",
    groupBreakdown: [
      { group: "Dokuma Etiket", share: 38 }, { group: "Baskı Etiket", share: 24 },
      { group: "Karton Etiket", share: 20 }, { group: "Plastik Aksesuar", share: 18 },
    ],
  },
  {
    id: "cr-002", name: "Koton Mağazacılık Tekstil A.Ş.", brand: "Koton", representative: "Burak Şahin",
    totalRevenue: 6_420_000, revenueCurrency: "TL", openBalance: 2_180_000, overdueBalance: 640_000,
    riskLimit: 4_500_000, riskScore: 48, lastOrderDate: "2026-06-10", lastCollectionDate: "2026-05-28",
    openedDate: "2016-09-04", isNew: false, channel: "Yurt İçi",
    groupBreakdown: [
      { group: "Baskı Etiket", share: 44 }, { group: "Karton Etiket", share: 30 },
      { group: "Dokuma Etiket", share: 26 },
    ],
  },
  {
    id: "cr-003", name: "DeFacto Perakende Tic. A.Ş.", brand: "DeFacto", representative: "Ahmet Kaya",
    totalRevenue: 5_860_000, revenueCurrency: "TL", openBalance: 1_940_000, overdueBalance: 180_000,
    riskLimit: 4_000_000, riskScore: 28, lastOrderDate: "2026-06-09", lastCollectionDate: "2026-06-07",
    openedDate: "2017-01-22", isNew: false, channel: "Yurt İçi",
    groupBreakdown: [
      { group: "Dokuma Şerit", share: 36 }, { group: "Baskı Etiket", share: 34 },
      { group: "Kordon İp", share: 30 },
    ],
  },
  {
    id: "cr-004", name: "Mavi Giyim San. Tic. A.Ş.", brand: "Mavi", representative: "Mehmet Demir",
    totalRevenue: 5_240_000, revenueCurrency: "TL", openBalance: 1_620_000, overdueBalance: 0,
    riskLimit: 4_000_000, riskScore: 18, lastOrderDate: "2026-06-11", lastCollectionDate: "2026-06-10",
    openedDate: "2015-06-30", isNew: false, channel: "Yurt İçi",
    groupBreakdown: [
      { group: "Deri Etiket", share: 42 }, { group: "Dokuma Etiket", share: 33 },
      { group: "Silikon Etiket", share: 25 },
    ],
  },
  {
    id: "cr-005", name: "Superdry UK Ltd.", brand: "Superdry", representative: "Ayşe Yılmaz",
    totalRevenue: 1_240_000, revenueCurrency: "USD", openBalance: 380_000, overdueBalance: 0,
    riskLimit: 900_000, riskScore: 22, lastOrderDate: "2026-06-06", lastCollectionDate: "2026-06-02",
    openedDate: "2019-11-15", isNew: false, channel: "İhracat",
    groupBreakdown: [
      { group: "Baskı Etiket", share: 40 }, { group: "Dokuma Etiket", share: 35 },
      { group: "Kordon İp", share: 25 },
    ],
  },
  {
    id: "cr-006", name: "Vakko Tekstil A.Ş.", brand: "Vakko", representative: "Elif Arslan",
    totalRevenue: 4_320_000, revenueCurrency: "TL", openBalance: 2_460_000, overdueBalance: 1_120_000,
    riskLimit: 2_800_000, riskScore: 74, lastOrderDate: "2026-05-30", lastCollectionDate: "2026-05-12",
    openedDate: "2018-04-08", isNew: false, channel: "Yurt İçi",
    groupBreakdown: [
      { group: "Parfüm Kutusu", share: 46 }, { group: "Kozmetik Kutusu", share: 28 },
      { group: "Deri Etiket", share: 26 },
    ],
  },
  {
    id: "cr-007", name: "Pierre Cardin USA Inc.", brand: "Pierre Cardin", representative: "Zeynep Koç",
    totalRevenue: 980_000, revenueCurrency: "USD", openBalance: 240_000, overdueBalance: 0,
    riskLimit: 750_000, riskScore: 15, lastOrderDate: "2026-06-07", lastCollectionDate: "2026-06-08",
    openedDate: "2021-02-19", isNew: false, channel: "ABD Ofisi",
    groupBreakdown: [
      { group: "Karton Kutu", share: 52 }, { group: "Parfüm Kutusu", share: 30 },
      { group: "Karton Çanta", share: 18 },
    ],
  },
  {
    id: "cr-008", name: "LTB Europe GmbH", brand: "LTB", representative: "Ayşe Yılmaz",
    totalRevenue: 760_000, revenueCurrency: "EUR", openBalance: 290_000, overdueBalance: 85_000,
    riskLimit: 500_000, riskScore: 52, lastOrderDate: "2026-06-04", lastCollectionDate: "2026-05-22",
    openedDate: "2020-07-03", isNew: false, channel: "İhracat",
    groupBreakdown: [
      { group: "Dokuma Etiket", share: 58 }, { group: "Deri Etiket", share: 24 },
      { group: "Baskı Etiket", share: 18 },
    ],
  },
  {
    id: "cr-009", name: "Boyner Büyük Mağazacılık A.Ş.", brand: "Boyner", representative: "Mehmet Demir",
    totalRevenue: 3_180_000, revenueCurrency: "TL", openBalance: 1_840_000, overdueBalance: 760_000,
    riskLimit: 2_200_000, riskScore: 66, lastOrderDate: "2026-06-06", lastCollectionDate: "2026-05-18",
    openedDate: "2017-10-11", isNew: false, channel: "Yurt İçi",
    groupBreakdown: [
      { group: "Kozmetik Kutusu", share: 38 }, { group: "Karton Çanta", share: 34 },
      { group: "Karton Etiket", share: 28 },
    ],
  },
  {
    id: "cr-010", name: "İpekyol Giyim San. A.Ş.", brand: "İpekyol", representative: "Elif Arslan",
    totalRevenue: 2_840_000, revenueCurrency: "TL", openBalance: 980_000, overdueBalance: 120_000,
    riskLimit: 2_000_000, riskScore: 35, lastOrderDate: "2026-06-09", lastCollectionDate: "2026-06-01",
    openedDate: "2019-05-27", isNew: false, channel: "Yurt İçi",
    groupBreakdown: [
      { group: "Karton Çanta", share: 44 }, { group: "Karton Kutu", share: 32 },
      { group: "Dokuma Etiket", share: 24 },
    ],
  },
  {
    id: "cr-011", name: "English Home (Evidea) A.Ş.", brand: "English Home", representative: "Zeynep Koç",
    totalRevenue: 2_460_000, revenueCurrency: "TL", openBalance: 720_000, overdueBalance: 0,
    riskLimit: 1_800_000, riskScore: 20, lastOrderDate: "2026-06-11", lastCollectionDate: "2026-06-09",
    openedDate: "2020-12-01", isNew: false, channel: "Yurt İçi",
    groupBreakdown: [
      { group: "Karton Etiket", share: 48 }, { group: "Baskı Etiket", share: 32 },
      { group: "Karton Kutu", share: 20 },
    ],
  },
  {
    id: "cr-012", name: "Network (Aydınlı Grup)", brand: "Network", representative: "Burak Şahin",
    totalRevenue: 2_120_000, revenueCurrency: "TL", openBalance: 860_000, overdueBalance: 310_000,
    riskLimit: 1_500_000, riskScore: 58, lastOrderDate: "2026-06-05", lastCollectionDate: "2026-05-25",
    openedDate: "2018-08-14", isNew: false, channel: "Yurt İçi",
    groupBreakdown: [
      { group: "Silikon Etiket", share: 40 }, { group: "Deri Etiket", share: 35 },
      { group: "Karton Kutu", share: 25 },
    ],
  },
  {
    id: "cr-013", name: "Damat Tween (Orka Holding)", brand: "Damat Tween", representative: "Ahmet Kaya",
    totalRevenue: 1_880_000, revenueCurrency: "TL", openBalance: 540_000, overdueBalance: 95_000,
    riskLimit: 1_400_000, riskScore: 38, lastOrderDate: "2026-06-03", lastCollectionDate: "2026-05-30",
    openedDate: "2019-03-09", isNew: false, channel: "Yurt İçi",
    groupBreakdown: [
      { group: "Karton Kutu", share: 46 }, { group: "Deri Etiket", share: 30 },
      { group: "Dokuma Etiket", share: 24 },
    ],
  },
  {
    id: "cr-014", name: "Kiğılı Giyim Tic. A.Ş.", brand: "Kiğılı", representative: "Elif Arslan",
    totalRevenue: 1_540_000, revenueCurrency: "TL", openBalance: 1_180_000, overdueBalance: 580_000,
    riskLimit: 1_200_000, riskScore: 71, lastOrderDate: "2026-05-26", lastCollectionDate: "2026-05-08",
    openedDate: "2018-06-20", isNew: false, channel: "Yurt İçi",
    groupBreakdown: [
      { group: "Karton Etiket", share: 42 }, { group: "Karton Kutu", share: 33 },
      { group: "Plastik Aksesuar", share: 25 },
    ],
  },
  {
    id: "cr-015", name: "Trendyol Hızlı Moda A.Ş.", brand: "LC Waikiki", representative: "Burak Şahin",
    totalRevenue: 640_000, revenueCurrency: "TL", openBalance: 280_000, overdueBalance: 0,
    riskLimit: 800_000, riskScore: 26, lastOrderDate: "2026-06-10", lastCollectionDate: "2026-06-06",
    openedDate: "2026-05-14", isNew: true, channel: "Yurt İçi",
    groupBreakdown: [
      { group: "Karton Etiket", share: 55 }, { group: "Baskı Etiket", share: 45 },
    ],
  },
  {
    id: "cr-016", name: "Nordic Apparel AB", brand: "Superdry", representative: "Ayşe Yılmaz",
    totalRevenue: 96_000, revenueCurrency: "EUR", openBalance: 48_000, overdueBalance: 0,
    riskLimit: 250_000, riskScore: 30, lastOrderDate: "2026-06-08", lastCollectionDate: "2026-06-04",
    openedDate: "2026-05-28", isNew: true, channel: "İhracat",
    groupBreakdown: [
      { group: "Dokuma Etiket", share: 60 }, { group: "Dokuma Şerit", share: 40 },
    ],
  },
  {
    id: "cr-017", name: "Atlanta Fashion Group LLC", brand: "Pierre Cardin", representative: "Zeynep Koç",
    totalRevenue: 84_000, revenueCurrency: "USD", openBalance: 36_000, overdueBalance: 0,
    riskLimit: 200_000, riskScore: 24, lastOrderDate: "2026-06-11", lastCollectionDate: "2026-06-09",
    openedDate: "2026-06-02", isNew: true, channel: "ABD Ofisi",
    groupBreakdown: [
      { group: "Karton Kutu", share: 50 }, { group: "Karton Çanta", share: 50 },
    ],
  },
  {
    id: "cr-018", name: "Moda Park Tekstil Ltd.", brand: "Koton", representative: "Mehmet Demir",
    totalRevenue: 420_000, revenueCurrency: "TL", openBalance: 310_000, overdueBalance: 140_000,
    riskLimit: 350_000, riskScore: 69, lastOrderDate: "2026-05-29", lastCollectionDate: "2026-05-10",
    openedDate: "2026-04-21", isNew: true, channel: "Yurt İçi",
    groupBreakdown: [
      { group: "Baskı Etiket", share: 70 }, { group: "Plastik Aksesuar", share: 30 },
    ],
  },
];
