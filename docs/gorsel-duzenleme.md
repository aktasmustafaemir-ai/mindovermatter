# Mağaza görünümünü düzenleme

Ana sayfa, aynı dört ürünü tekrar tekrar göstermeden koleksiyonun malzemesini, kalıbını ve takım olarak kullanımını anlatır. Mevcut Mind Over Matter fotoğrafları, logo ve siyah/beyaz marka dili kullanılmıştır.

## Ana sayfa

Aktif sıralama: açılış → Drop 01 ürünleri → doku ve detay → kombini tamamla → kargo/iade bilgileri. Önceki editorial, sekmeler, Instagram ve ikinci katalog bölümleri JSON şablonunda korunmuş, devre dışı bırakılmıştır. Tema düzenleyicisinden yeniden etkinleştirilebilirler.

- Açılış başlığı, açıklaması ve düğmesi MOM Açılış ayarlarından değiştirilebilir.
- Varsayılan açılış fotoğrafı farklı cihaz genişliklerinde Shopify CDN tarafından boyutlandırılır. Görseli temanın resim seçicisi üzerinden değiştirmek de desteklenir.
- MOM Doku ve detay bölümünde ürün ve özel görsel seçilebilir. Varsayılan olarak mevcut siyah hoodie fotoğrafı kullanılır; başka markanın görseli kullanılmaz.
- MOM Kombini tamamla bölümündeki iki ürün ayrı seçilebilir. Varsayılan gri hoodie ve gri eşofman altıdır. Bu bölüm paket ürünü oluşturmaz; ürünler ayrı satılır.
- Ürün kartları mobilde iki, geniş ekranda dört sütundur. Ana ürün fotoğrafı bütünüyle görünür; hover görseli dokunmatik cihazda ön fotoğrafı kapatmaz.

## Ürün, destek ve footer

Ürün galerisinin ana görseli ekran yüksekliğine göre sınırlanır ve kırpılmadan gösterilir. Büyütme penceresi fotoğrafın tamamını ekranın içinde tutar; görseli görmek için yatay veya dikey kaydırma gerekmez. Kapatma düğmesi görselin üzerinde sabit kalır ve Escape ile kapatma çalışır.

Ürün sayfasında kalıp notu, beden yardımı ve iki iş günü kargo açıklaması görünür. Ürün yönetiminde `custom.model_info` metafield'ı doldurulursa beden/kalıp bölümünde gösterilir; model boyu veya bedeni varsayılmaz. Kargo/iade alanında kısa özet ve ilgili politikalara bağlantı bulunur. Yorum puanı mevcut blokların puan ortalamasından hesaplanır; yorumların gerçekliği bu değişiklikle doğrulanmaz.

İletişim sayfasında fotoğraf sabit yükseklikle kırpılmaz; kendi oranında bütünüyle gösterilir. Masaüstünde iletişim bilgileri ve fotoğraf sol sütunda, etiketli form sağ sütundadır. Mobilde iletişim bilgileri ve formun ardından tam fotoğraf görünür. Tema düzenleyicisinden özel masaüstü ve mobil görsel seçilebilir. Formda zorunlu alan açıklaması, gizlilik bağlantısı, görünür klavye odağı ve Shopify yanıtına bağlı başarı/hata durumları bulunur. Telefon, e-posta ve adres ortak tema ayarlarından gelir. Footer yalnızca `shop.enabled_payment_types` içinde yer alan ödeme yöntemlerini gösterir. Gerçek işletme açık adresi ve Shopify Admin politikaları ayrıca yönetilmelidir.

## İndirim formu

Form tek e-posta adımı ve görünür, zorunlu kampanya izin kutusu içerir. Başarılı Shopify form yanıtından sonra kod gösterilir. Sağ kenardaki dikey indirim sekmesi formu elle açar; indirim oranı bölüm ayarından gelir. Beyaz pencere masaüstünde mağazanın fotoğrafı ve form olmak üzere iki sütundur; mobilde fotoğraf gizlenir. Pencere ekran yüksekliğiyle sınırlıdır; kısa ekranlarda form alanı kendi içinde kaydırılabilir. Sekme açık diyaloglarda gizlenir, kapatılınca geri gelir. Bölüm devre dışıyken veya kod boşken sekme oluşturulmaz.

Otomatik gösterim yalnızca ana sayfada, varsayılan 20 saniyelik gecikmeden ve ziyaretçinin sayfayı incelemesinden sonra yapılır. Başka bir diyalog açıkken veya kullanıcı bir giriş alanındayken açılmaz. Kapatma tercihi yedi gün korunur; kayıtlı kullanıcı için kod adımı gösterilir. İndirim kodu, oranı, etkinlik durumu ve form gecikmesi MOM Popup bölümünden yönetilir. Shopify Admin'deki indirim gerçekten etkin olmalıdır.

## Doğrulama ve sınırlar

Yerel Liquid önizlemeleri gerçek, herkese açık ürün verileriyle 320, 390, 768 ve 1440 piksel genişliklerde kontrol edildi. Ana sayfa, ürün ve iletişim sayfalarında yatay taşma, yinelenen HTML kimliği veya tema JavaScript hatası bulunmadı. Menü, S/M/XL varyant durumları, miktar kontrolü, beden kılavuzu, Escape ile kapatma, thumbnail/zoom, form izin doğrulaması ve kenar sekmesi denetlendi.

İndirim ekranının yeni ziyaretçi, ürün sayfası, daha önce kapatılmış, kayıtlı, başarılı form yanıtı ve hatalı form yanıtı durumları yerel kontrollü örneklerle test edildi. Bu kontroller gerçek müşteri kaydı, iletişim mesajı veya ödeme oluşturmaz. Gerçek ödeme ve e-posta teslimi için Shopify/PayTR uçtan uca kontrolü ayrı gerekir.

Theme Check'te önceden bulunan 992 MatchingTranslations hatası ve 9 uyarı bu değişiklikle artmadı. Bunlar ayrı bir çeviri/tema bakımı işidir.

`wantsandneeds.com` ana sayfasının HTML ve tema stilleri incelendi. İndirim penceresini sağlayan Klaviyo betiği bu ortamda 403 döndüğü için güncel pencerenin birebir görünümü doğrulanamadı. Tasarım, referansın siyah/beyaz yaklaşımı ve repodaki önceki tasarım notlarıyla mağazanın kendi görselleri kullanılarak hazırlandı.
