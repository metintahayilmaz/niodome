import Link from "@/components/common/LocalizedLink";
import styles from "./ApprovedNarrative.module.css";

type Part = "home" | "services" | "aboutStart" | "aboutEnd" | "contact";

export default function ApprovedNarrative({ part }: { part: Part }) {
  return (
    <section id={part === "home" ? "about" : undefined} className={`mxd-section ${styles.section}`} aria-labelledby={`narrative-${part}`}>
      <div className="mxd-container grid-l-container">
        <div className={`mxd-grid-item ${styles.copy}`}>
          {part === "home" && <>
            <p>Niodome, strateji, yaratıcılık, tasarım ve teknolojiyle markaların bir sonraki hamlesini geliştiren bağımsız bir ajans.</p>
            <h2 id={`narrative-${part}`}>Doğru soru, işin şeklini değiştirir.</h2>
            <p>Önce neyi değiştirmek istediğimizi belirleriz. Markanın hedefini, insanların beklentilerini ve değişen kültürü anlamak için araştırırız.</p>
            <p>Buradan çıkan fikir bir kampanyaya, kimliğe, ürüne veya deneyime dönüşebilir. Biçimini, yaratacağı etkiye göre birlikte belirleriz.</p>
          </>}
          {part === "services" && <>
            <h2 id={`narrative-${part}`}>Düşünceden hayata.</h2>
            <ul className={styles.areas}>
              {["Marka ve Strateji", "İletişim ve Kültür", "Tasarım ve Deneyim", "Ürün ve Teknoloji"].map(title => (
                <li key={title}><Link href="/services">{title}</Link></li>
              ))}
            </ul>
          </>}
          {part === "aboutStart" && <>
            <p>İnsanların alışkanlıkları, beklentileri ve markalarla kurdukları ilişkiler değişiyor. Bu değişim, markalara yeni roller üstlenme fırsatı veriyor.</p>
            <p>Niodome, bu fırsatları keşfetmek ve hayata geçirmek için var.</p>
            <h2 id={`narrative-${part}`}>Önce neyi değiştirmek istediğimizi belirleriz.</h2>
            <p>İnsanları dinler, markanın işini öğrenir, kabul edilmiş cevapları sorgularız. Strateji, yaratıcı düşünce, tasarım ve teknolojiyi aynı masada buluştururuz.</p>
            <p>Fikirleri çizerek, yazarak ve prototiplerle deneyerek geliştiririz. Kampanyadan ürüne, kimlikten deneyime uzanan olasılıklar arasından hedefe en güçlü katkıyı sağlayanı seçeriz.</p>
          </>}
          {part === "aboutEnd" && <>
            <h2 id={`narrative-${part}`}>Fikrin gerektirdiği ekibi kurarız.</h2>
            <p>Projenin ihtiyacına göre farklı uzmanlıkları bir araya getiririz. Yaratıcı yönü ve uygulamanın kalitesini süreç boyunca gözetiriz.</p>
            <h3>Ölçümüz, işin yarattığı karşılık.</h3>
            <p>İnsanların zaman ayıracağı, kullanacağı, katılacağı ve hatırlayacağı işler üretmeyi hedefleriz. Başarıyı projenin başında tanımlar, kararlarımızı bu hedefle değerlendiririz.</p>
          </>}
          {part === "contact" && <>
            <h2 id={`narrative-${part}`}>Sırada ne var?</h2>
            <p>Çözmek istediğiniz meseleyi konuşalım.</p>
            <Link className="btn btn-line btn-line-default" href="/contact">İletişime geçin</Link>
          </>}
        </div>
      </div>
    </section>
  );
}
