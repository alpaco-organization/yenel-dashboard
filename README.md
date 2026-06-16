# Yenel Etiket — Üst Yönetim Dashboard'u

Tekstil aksesuarları, karton kutu, dokuma/baskı etiket ve ambalaj üretimi yapan
**Yenel Etiket** için geliştirilen, dummy data ile çalışan ve ERP entegrasyonuna
hazır premium yönetim paneli.

## Demo Giriş

| Alan | Değer |
| --- | --- |
| E-posta | `admin@yeneletiket.com` |
| Şifre | `123456` |

## Kurulum

```bash
npm install
npm run dev
# http://localhost:3000
```

Production build:

```bash
npm run build && npm start
```

## Teknoloji

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4** — dark-mode-first özel tema
- **Recharts** — grafikler
- **Framer Motion** — mikro animasyonlar
- **TanStack Table** — search / sort / pagination'lı tablolar
- **Zustand** — auth, filtre ve UI state
- **Lucide Icons**

## Sayfalar

| Sayfa | İçerik |
| --- | --- |
| `/login` | Demo girişli login ekranı |
| `/dashboard` | 16 KPI kartı, filtre barı, ciro/kâr trendi, kanal dağılımı, AI yönetici özeti |
| `/finance` | Gelir-gider, brüt/net kâr trendi, TL/USD/EUR ciro, yaşlandırma, döviz pozisyonu, zekat, taksitli ödemeler, en riskli 10 cari, gider kırılımı |
| `/production` | 12 ürün grubu, hat doluluk, sipariş hunisi, numune onay süreci, haftalık trend, fire trendi, siparişten teslimata takip |
| `/stocks` | Stok tablosu (kritik/hareketsiz/hızlı dönen filtreleri), grup/tip bazlı değer analizi, kritik stok uyarıları |
| `/sales` | Marka bazlı ciro, sıralı ciro TL/döviz, yeni cari trendi, ABD ofisi satışları, cari risk analizi, cari detay drawer |
| `/quality` | Hata nedenleri, fire maliyeti, grup bazlı hata oranları, müşteri şikayetleri, sertifikalar, sürdürülebilirlik KPI'ları |
| `/operations` | Alımlar, satın alma kategorileri, tedarikçi performansı, araç/sürücü bazlı yakıt, haftalık operasyon giderleri |
| `/representatives` | Temsilci kartları, hedef gerçekleşme, prim hesaplama, tahsilat oranları, performans karşılaştırma |
| `/reports` | 8 rapor tipi, yönetici özeti, gelişme/risk/fırsat listeleri, KPI ve grafikler, PDF/Excel/Mail dummy export |
| `/settings` | Hesap, bildirim, ERP veri kaynağı ve görünüm ayarları |

## Mimari

```
src/
  app/            # Next.js App Router sayfaları
  components/
    layout/       # AppShell, Sidebar, Topbar (auth-korumalı iskelet)
    cards/        # GlassCard, KpiCard, StatBadge, loading/empty/error state'leri
    charts/       # Ortak chart palette + tooltip kiti
    tables/       # TanStack tabanlı generic DataTable
    filters/      # Global FilterBar (Zustand'a bağlı)
    ai-insights/  # Rule-based AI yönetici özeti paneli
    drawers/      # Sağdan açılan DetailDrawer
  data/           # Dummy data (financials, production, stocks, sales, ...)
  lib/
    api/          # ErpDataSource sözleşmesi + MockDataSource
    insights.ts   # Rule-based insight motoru
    commission.ts # Prim hesaplama kuralları
    utils.ts      # Format ve yardımcı fonksiyonlar
  store/          # Zustand store'ları (auth, filters, ui)
  types/          # Tüm domain tipleri
```

## ERP Entegrasyonu

Tüm UI, `src/lib/api/data-source.ts` içindeki **`ErpDataSource`** interface'ine
bağımlıdır. Şu an `MockDataSource` (gecikme simülasyonlu dummy data) aktiftir.

Gerçek ERP'ye geçiş:

1. `ErpDataSource`'u implemente eden bir adapter yazın
   (örn. `LogoDataSource`, `MikroDataSource`, `NetsisDataSource`,
   `NebimDataSource`, `ParasutDataSource`).
2. `src/lib/api/index.ts` içinde tek satırı değiştirin:

```ts
export const api: ErpDataSource = new LogoDataSource({ baseUrl, apiKey });
```

Component tarafında hiçbir değişiklik gerekmez; loading / error / empty
state'leri zaten her sayfada hazırdır.

## Prim Kuralları (dummy)

- Hedefin %80 altı → prim yok
- %80–100 → ciro × %0.5
- %100–120 → ciro × %1.0
- %120+ → ciro × %1.5
- Tahsilat oranı %70'in altındaysa primden %30 kesinti
- Gecikmiş bakiye cironun %15'ini aşarsa uyarı

## AI Yönetici Özeti

`src/lib/insights.ts` gerçek AI kullanmadan, veri üzerinde deterministik
kurallarla içgörü üretir (ciro değişimi, hata oranı trendi, kritik stok,
en iyi temsilci, döviz/tahsilat ayrışması, yakıt artışı, vadesi geçmiş bakiye
konsantrasyonu). ERP bağlandığında aynı kurallar canlı veriyle çalışır.

## Notlar

- Tüm tutarlar ve kayıtlar gerçekçi kurgulanmış **dummy** verilerdir.
- Export (PDF/Excel/Mail) butonları demo amaçlıdır.
- Tasarım dark-mode-first'tür; bento grid, glassmorphism ve soft glow
  efektleri `globals.css` içindeki tema değişkenleriyle yönetilir.
