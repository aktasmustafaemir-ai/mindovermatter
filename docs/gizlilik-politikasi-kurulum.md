# Gizlilik politikasını Shopify'da güncelleme

Politika dosyaları canlı metinlerin mevcut içeriği korunarak hazırlanmıştır. Satıcı adı Mind Over Matter, konum İTÜ Ayazağa Kampüsü, Reşitpaşa, Sarıyer / İstanbul ve telefon 0545 916 38 38 olarak eşitlenmiştir. Gizlilik politikasındaki eski adres kaldırılmıştır; stok talebinde kullanılan verilerin amacı açıklanmıştır.

Bu dosya tema tarafından gösterilmez. GitHub'a pushlamak Shopify Admin'deki politikayı güncellemez.

1. Shopify Admin > Ayarlar > Politikalar > Gizlilik politikası bölümünü açın.
2. Mevcut metnin yedeğini alın.
3. HTML düzenleme görünümüne geçin ve gizlilik-politikasi.html dosyasının içeriğini yapıştırın.
4. Mevcut adres kullanıcı tarafından belirtilen kampüs konumudur. PayTR'nin istediği açık faaliyet adresi için gerçek bina/ofis ve kapı bilgilerinizi ekleyin; bu bilgiler uydurulmamıştır.
5. Kaydedin ve https://mindovermatter.tr/policies/privacy-policy adresini kontrol edin.

Kullanılan iletişim bilgileri: +90 545 916 38 38 ve momsportswear@gmail.com.
Aynı ekrandaki diğer alanlara karşılık gelen dosyaları da uygulayın:

| Shopify politika alanı | Dosya |
| --- | --- |
| Gizlilik politikası | `gizlilik-politikasi.html` |
| İletişim bilgileri | `iletisim-bilgileri.html` |
| Hizmet şartları | `hizmet-sartlari.html` |
| Kargo politikası | `kargo-politikasi.html` |
| İade politikası | `iade-politikasi.html` |

Shopify Admin > Ayarlar > Genel bölümündeki mağaza adını da **Mind Over Matter** yapın. Tema görünen marka adını düzeltse de ödeme e-postaları ve Shopify'ın mağaza kayıtları bu ayrı ayarı kullanır.

Bu dosyalar hazırlanmıştır; Shopify Admin erişimi bulunmadığı için politika kayıtları buradan kaydedilememiştir. GitHub bağlantısı yalnızca tema dosyalarını senkronize eder.

İade politikası, Türkiye siparişlerinde teslimattan itibaren **14 gün içinde iade talebi** oluşturulabileceğini ve başvuru adımlarını açıklar. Kargo politikası, Türkiye içi **3.000 TL üzeri siparişlerde ücretsiz standart kargo** koşulunu açıklar. Bunlar ana sayfadaki mevcut koşullarla eşitlenmiştir; kargo ücretini uygulayan Shopify kargo ayarı ayrıca bu koşulla aynı olmalıdır.

Otomatik kayıt için ortam ayarlarında `SHOPIFY_ADMIN_ACCESS_TOKEN` erişim gereksinimi tanımlanmıştır; hedef yalnızca `zw4bkm-21.myshopify.com` alan adıdır. Politikaları düzenleme yetkisi olan Shopify Admin API erişimini güvenli ayarlardan ekleyin. Token değerini sohbet veya GitHub dosyalarına yazmayın. Erişim sağlanınca mevcut politikaların yedeği alınarak güncelleme ve canlı içerik kontrolü yapılmalıdır.
