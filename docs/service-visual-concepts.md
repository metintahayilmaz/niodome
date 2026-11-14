# Hizmet görselleri: bölgesel konsept serisi

Bu görseller hizmetleri anlatan konsept sunumlardır; gerçek müşteri teslimi veya kampanya performansı kaydı değildir. Mevcut kimlikler referans alınır. Kullanıcının gerçek iş listesinde geçen markalar için de yeni kurgusal sunumlar oluşturulmuştur.

AEGEAN için onaylanan Atina–İstanbul kolajı kullanılır; alternatif web görseli kullanılmaz. Altınkılıç yalnız kefir ürünüyle ele alınır. Namlı kaldırılmış durumda kalır. Kronik için kullanıcının sağladığı Edebiyati_Pisirmek.pdf içinden 30–31. sayfalar seçilmiş; hareketli mavi menü sayfasından çok yakın bir kitap kesiti hazırlanmıştır. Kapak yeniden tasarlanmamıştır. Pandora Plastik logosu arşivdeki katalogdan, Kefirix serisi kullanıcının sağladığı Ballı Muzlu, Çilekli ve Orman Meyveli referanslarından korunmuştur.

| Hizmet kimliği | Marka / bölge | Dosya |
|---|---|---|
| geo | SORA / Albania | regional-geo.webp |
| social | IKEA / Greece | regional-social.webp |
| strategy | DORA / North Macedonia | regional-strategy.webp |
| ux | NAVA / Greece | regional-ux.webp |
| identity | Pandora Plastik / Türkiye | regional-identity.webp |
| app | Wolt / Greece | regional-app.webp |
| advertising | Coca-Cola / Uzbekistan | regional-advertising.webp |
| commerce | LC Waikiki / North Macedonia | regional-commerce.webp |
| media | SES / Saudi Arabia | regional-media.webp |
| google | USTA / North Macedonia | regional-google.webp |
| seo | KÖK / Azerbaijan | regional-seo.webp |
| editorial | Kronik / Türkiye | regional-editorial.webp |
| production | VERA / Greece | regional-production.webp |
| communications | KABEV / Türkiye | regional-communications.webp |
| automation | Aramex / Saudi Arabia | regional-automation.webp |
| spatial | ELBA / Türkiye | regional-spatial.webp |
| packaging | Altınkılıç Kefirix / Türkiye | regional-packaging.webp |
| web | McDonald’s / Global | regional-web.webp |
| campaign | AEGEAN / Greece | regional-campaign.webp |

## Kaynak ve doğrulama notları

- KABEV kimliği: arşivdeki KABEV Kurumsal Kimlik dosyası, hazırlanmış 030.webp.
- ELBA kimliği: arşivdeki ELBAKatalog_Mbl.pdf, hazırlanmış 007.webp; https://elbabant.com/
- Kronik: arşivde Edebiyati_Pisirmek290626.idml; https://kronikkitap.com/kitap/edebiyati-pisirmek/
- Altınkılıç: kullanıcının verdiği eski Kefirix serisi referansları (sarı Ballı Muzlu, pembe Çilekli, mor Orman Meyveli). Yeni sade kefir/cow etiketli alternatif kullanılmaz.
- Bölgesel pazar referansları: https://www.ikea.gr/ , https://explore.wolt.com/en/grc/couriers/learning-center , https://www.lcwaikiki.mk/ , https://www.azercell.com/en/personal/azercell-stores.html , https://www2.aramex.com/sa/en
- SORA, NAVA, DORA, USTA, SES, KÖK ve VERA: bu hizmet sunumları için kurgusal markalar.

## Teknik uygulama

19 ayrı optimize WebP. Tüm mockuplarda contain yerleşimi ve sabit ölçek korunur. Açık nötr çerçeve, farklı görsel oranlarında siyah kenar oluşmasını önler. Dosya varlığı ve SHA-256 benzersizliği tests/service-artwork.test.mjs ile denetlenir.

Üretim: yerleşik image_gen. Nihai prompt seti ve PNGler çalışma alanındaki outputs/service-regional-concepts/final-service-manifest.json ve final-*.png dosyalarında saklanır.


Son referanslar: kullanıcı Edebiyati_Pisirmek.pdf (71 sayfalık örnek), kapak ve Kefirix görselleri; Pandora arşiv product catalog 049.webp. Kamuya açık yeni proje veya kampanya sonucu iddiası eklenmedi.

Kronik yakın planı, tüm nesnelerin gösterilmesi kuralının kullanıcının açıkça istediği istisnasıdır; yalnız bu görselde kitap dış kenarları bilinçli biçimde kadraj dışındadır. Diğer ekran ve ürünlerde tam kadraj korunur.
