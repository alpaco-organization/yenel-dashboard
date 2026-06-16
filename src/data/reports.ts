import type { ReportDefinition } from "@/types";

export const reports: ReportDefinition[] = [
  {
    id: "rp-2026-w23",
    type: "Haftalık Yönetim Raporu",
    period: "23. Hafta — 8-14 Haziran 2026",
    generatedAt: "2026-06-12T06:00:00",
    summary:
      "23. haftada toplam üretim 1,28M adede ulaşarak haftalık rekor kırdı. Ciro momentumu korunurken dokuma etiket hattındaki hata oranı artışı ve yakıt giderlerindeki yükseliş yakın takip gerektiriyor.",
    highlights: [
      "Haftalık üretim 1,28M adet ile yılın en yüksek seviyesine ulaştı.",
      "Superdry US siparişleri ile ABD ofisi haftalık cirosu %22 arttı.",
      "English Home baskı etiket siparişi kalite kontrolden tek seferde geçti.",
      "Tahsilatlar haftalık 11,2M TL ile plan üzerinde gerçekleşti.",
      "FSC sertifika yenileme süreci başlatıldı.",
    ],
    risks: [
      "Dokuma Etiket hata oranı %3,2 ile son 6 haftanın zirvesinde.",
      "Vakko'nun vadesi geçmiş bakiyesi 1,12M TL'ye yükseldi; risk limiti aşıldı.",
      "Polyester iplik ve silikon hammadde stokları kritik seviyenin altında.",
      "Yakıt gideri haftalık bazda %9 arttı.",
    ],
    opportunities: [
      "ABD ofisinde parfüm kutusu talebi artıyor; kapasite ayrılabilir.",
      "Kordon & İp hattı %52 dolulukta — yeni sipariş alınabilir.",
      "Nordic Apparel ile dokuma şerit hacmi büyütülebilir.",
    ],
  },
  {
    id: "rp-2026-may",
    type: "Aylık Yönetim Raporu",
    period: "Mayıs 2026",
    generatedAt: "2026-06-01T06:00:00",
    summary:
      "Mayıs ayında ciro 51,3M TL ile yıllık hedefin üzerinde seyretti. Net kâr marjı %29,4'e yükseldi. İhracat payı %33'e çıkarken yurt içi tahsilat performansında bölgesel zayıflıklar görüldü.",
    highlights: [
      "Aylık ciro 51,27M TL — önceki aya göre +%3,5.",
      "Net kâr 15,08M TL ile tüm zamanların en iyi ikinci ayı.",
      "Zeynep Koç hedefinin %129'una ulaşarak ayın temsilcisi oldu.",
      "15 yeni cari açıldı; 3'ü ihracat müşterisi.",
      "Kapasite kullanım oranı %78'e yükseldi.",
    ],
    risks: [
      "Burak Şahin bölgesinde tahsilat oranı %66'ya geriledi.",
      "90+ gün vadesi geçmiş bakiyeler 3,87M TL'ye ulaştı.",
      "Enerji giderleri bütçeyi %12,6 aştı.",
    ],
    opportunities: [
      "Vakko ile kozmetik kutusu hattında yıllık anlaşma görüşmesi sürüyor.",
      "GRS sertifikalı ürünlere Avrupa'dan talep artışı var.",
      "Dijital baskı hattında %36 boş kapasite premium işlere yönlendirilebilir.",
    ],
  },
  {
    id: "rp-2026-fin-q2",
    type: "Finans Raporu",
    period: "2026 — 2. Çeyrek (devam ediyor)",
    generatedAt: "2026-06-10T06:00:00",
    summary:
      "İkinci çeyrekte kümülatif ciro 155,4M TL'ye ulaştı. Döviz pozisyonu 3,37M USD eşdeğeri net uzun. Taksitli alacaklarda gecikme oranı %18 ile izleme eşiğinin üzerinde.",
    highlights: [
      "Çeyrek brüt kâr marjı %38,1.",
      "USD ciro payı %31'e yükseldi.",
      "Zekat hesaplaması güncellendi: 1,78M TL.",
    ],
    risks: [
      "Taksitli ödemelerde 3 cari gecikmede.",
      "TL faiz maliyeti artıyor; nakit döngüsü 64 güne uzadı.",
    ],
    opportunities: [
      "EUR alacak fazlası forward ile değerlendirilebilir.",
    ],
  },
  {
    id: "rp-2026-prod-may",
    type: "Üretim Raporu",
    period: "Mayıs 2026",
    generatedAt: "2026-06-02T06:00:00",
    summary:
      "Mayıs üretimi 4,72M adet. Zamanında teslim oranı %88. Dokuma tezgah grubu A %95 doluluğa ulaştı; ek vardiya planlaması öneriliyor.",
    highlights: [
      "Baskı etiket hattında OEE %91'e çıktı.",
      "Ortalama teslim süresi 10,2 güne indi.",
    ],
    risks: [
      "Silikon enjeksiyon hattı planlı bakımda; 4 sipariş ertelendi.",
    ],
    opportunities: [
      "Gece vardiyası ile dokuma kapasitesi %18 artırılabilir.",
    ],
  },
  {
    id: "rp-2026-stock-jun",
    type: "Stok Raporu",
    period: "Haziran 2026 (anlık)",
    generatedAt: "2026-06-12T06:00:00",
    summary:
      "Toplam stok değeri 31,28M TL. 14 kalem kritik seviyede, 3 kalem hareketsiz. Hammadde stok devir hızı 3,4'e yükseldi.",
    highlights: ["Hızlı dönen 4 mamul grubunda stok-satış dengesi sağlıklı."],
    risks: [
      "Polyester iplik kritik: 1,5K kg kullanılabilir, haftalık ihtiyaç 2,8K kg.",
      "Plastik klips ve kordon ip stokları 60+ gündür hareketsiz.",
    ],
    opportunities: ["Hareketsiz stoklar promosyon siparişlerinde eritilebilir."],
  },
  {
    id: "rp-2026-sales-may",
    type: "Satış & Cari Raporu",
    period: "Mayıs 2026",
    generatedAt: "2026-06-03T06:00:00",
    summary:
      "Mayıs'ta 15 yeni cari açıldı. İlk 10 cari toplam cironun %68'ini oluşturuyor. Müşteri konsantrasyon riski izleniyor.",
    highlights: [
      "LC Waikiki cirosu %10,1 arttı.",
      "ABD ofisi aylık satışı 129K USD'ye ulaştı.",
    ],
    risks: ["Kiğılı risk limiti kullanımı %98'e ulaştı."],
    opportunities: ["Trendyol hızlı moda hattı büyüme potansiyeli taşıyor."],
  },
  {
    id: "rp-2026-quality-may",
    type: "Kalite Raporu",
    period: "Mayıs 2026",
    generatedAt: "2026-06-04T06:00:00",
    summary:
      "Aylık ortalama hata oranı %2,1. Renk farkı en büyük hata nedeni olmaya devam ediyor. 8 müşteri şikayetinin 4'ü çözüldü.",
    highlights: ["Karton etiket hattı %1,4 hata oranı ile en iyi performansı verdi."],
    risks: ["Dokuma çözgü problemleri fire maliyetini artırıyor."],
    opportunities: ["Renk yönetim yazılımı yatırımı %30 fire azaltımı sağlayabilir."],
  },
  {
    id: "rp-2026-ops-may",
    type: "Operasyon Raporu",
    period: "Mayıs 2026",
    generatedAt: "2026-06-05T06:00:00",
    summary:
      "Aylık satın alma hacmi 9,6M TL. Tedarikçi zamanında teslim ortalaması %89. Filo yakıt tüketimi 9,8K litre ile artış eğiliminde.",
    highlights: ["Kartonsan teslimat performansı %96 ile lider."],
    risks: ["Anadolu Deri zamanında teslim oranı %76'ya düştü."],
    opportunities: ["Rota optimizasyonu ile yakıt gideri %8 azaltılabilir."],
  },
];
