# Ürün yapılandırılmış verisi

Ürün sayfası, sunucuda tek bir `ProductGroup` JSON-LD kaydı ve her beden için ayrı `Product`/`Offer` üretir. Ürün grubu ve bütün bedenler gerçek ürün açıklamasını kullanır. Boş açıklamada mevcut SEO açıklaması, o da boşsa ürün adı kullanılır. Fiyat, para birimi, SKU ve stok durumu Shopify verisinden gelir.

Her teklifte Türkiye için 14 günlük iade talebi bilgisi vardır. Bu süre sitede gösterilen ve mağaza sahibinin belirttiği koşuldur. Shopify Admin'deki politika kayıtlarının da aynı koşulu açıklaması gerekir; tema dosyalarını pushlamak bu kayıtları değiştirmez.

## Kargo ve iade ücreti

Tema düzenleyicisi > Tema ayarları > **Ürün yapılandırılmış verisi**:

- **Standart kargo ücreti (TL):** Türkiye'de 3.000 TL ve altındaki siparişlerin doğrulanmış ücretini girin. Nokta veya virgülle ondalık kabul edilir. Boş, negatif veya geçersiz değer Google'a ücretsiz kargo olarak gönderilmez; kargo kaydı üretilmez. Bu ayar Shopify'ın ücret tahsilatını değiştirmez.
- Ücret tanımlanınca her teklife `shippingDetails` eklenir ve aynı standart ücret ürün sayfasının kargo/iade bölümünde görünür. Hazırlık süresi 2 iş gününe kadar, taşıma süresi 1–4 iş günüdür; bu aralıklar mevcut mağaza açıklamalarına dayanır.
- Teklifin kendi ürün fiyatı 3.000 TL üzerindeyse kargo `0` olur. Daha ucuz bir üründe standart tek ürün ücreti bildirilir. Birden çok ürünle elde edilen ücretsiz kargo eşiği görünür metinde açıklanır; Merchant Center'daki sepet tutarına bağlı kargo ayarı da aynı koşula göre yapılandırılmalıdır.
- **İade kargo masrafı:** Gerçek uygulamayı seçin. Mağaza karşılıyorsa `FreeReturn` üretilir. Müşterinin ödediği sabit bir tutar doğrulanmışsa ilgili alana girilebilir. Değişken veya bilinmeyen bir iade ücreti uydurulmaz; sabit ücret alanı boş bırakılır.

Mevcut fiyat kuralı **3.000 TL üzeri** şeklindedir: tam 3.000 TL standart ücretli, 3.000,01 TL ücretsizdir. Shopify kargo ayarı farklı çalışıyorsa önce görünür koşullar, Merchant Center ve gerçek ödeme ayarları eşitlenmelidir.

## Yorumlar

`review` ve `aggregateRating` yalnızca sayfada gösterilen, o ürüne atanmış ve isim/metin içeren müşteri yorumu bloklarından üretilir. Ortalama puan ve yorum sayısı ekranda görünenlerle aynıdır. Başka ürünün yorumu, ürünü seçilmemiş bloklar veya boş yorumlar dahil edilmez. Yorum yokken sıfır puan, boş `AggregateRating` ya da uydurma müşteri verisi üretilmez.

Gerçek yorum girilmemiş ürünlerde bu iki öneri Search Console'da kalabilir. Bunlar sunulan teklif bilgisi geçerliyken tek başına ürünün Google'da görünmesini engellemez.

## Yayından sonra kontrol

1. Bir ürün ve stok dışı beden URL'sini Google Zengin Sonuçlar Testi'nde test edin.
2. Tüm bedenlerin açıklama, fiyat, para birimi, stok ve iade alanlarını kontrol edin. Kargo ücreti tanımlandıysa `shippingDetails` alanını da kontrol edin.
3. Search Console'da etkilenen raporda **Düzeltmeyi doğrula** işlemini başlatın. Eski uyarılar Google yeniden tarayıp işleyene kadar kalabilir; tema push'u raporu anında temizlemez.

Yerel JSON-LD ve şablon kontrolleri, Google'ın canlı testinin veya Search Console erişiminin yerine geçmez.
