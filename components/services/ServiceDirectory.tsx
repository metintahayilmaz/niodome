import Link from "@/components/common/LocalizedLink";
import catalog from "@/data/serviceCatalog.json";
import styles from "./Services.module.css";

const groups = [
  {id:"brand",tr:"Marka ve tasarım",en:"Brand and design"},
  {id:"digital",tr:"Dijital ürünler",en:"Digital products"},
  {id:"communication",tr:"İçerik ve iletişim",en:"Content and communications"},
  {id:"growth",tr:"Reklam ve görünürlük",en:"Advertising and visibility"},
  {id:"experience",tr:"Fiziksel deneyim",en:"Physical experience"},
] as const;

export default function ServiceDirectory({locale}: {locale:string}) {
  const lang = locale === "en" ? "en" : "tr";
  return <section className={styles.directory} aria-labelledby="service-directory-title" id="all-services">
    <p className={styles.eyebrow}>{lang === "tr" ? "UZMANLIKLARIMIZ" : "OUR EXPERTISE"}</p>
    <h2 id="service-directory-title">{lang === "tr" ? "Markanın ihtiyacı, işin biçimini belirler." : "The brand’s need shapes the work."}</h2>
    <p className={styles.intro}>{lang === "tr" ? "Stratejiden tasarıma, üründen iletişime. Tek bir hizmetle başlayabilir veya farklı uzmanlıkları aynı proje etrafında bir araya getirebiliriz." : "From strategy to design, products to communications. Start with one service or bring several disciplines together around one project."}</p>
    <nav className={styles.categories} aria-label={lang === "tr" ? "Hizmet grupları" : "Service groups"}>{groups.map(g=><a href={`#services-${g.id}`} key={g.id}>{g[lang]} ↘</a>)}</nav>
    {groups.map(g=><div className={styles.group} id={`services-${g.id}`} key={g.id}>
      <h3>{g[lang]}</h3>
      <div className={styles.catalogGrid}>{catalog.filter(s=>s.category===g.id).map(s=><article className={styles.catalogCard} key={s.id}>
        <p className={styles.eyebrow}>{s.hasPackages ? (lang === "tr" ? "PAKET / KAPSAM SEÇENEKLERİ" : "PACKAGE / SCOPE OPTIONS") : (lang === "tr" ? "PROJEYE ÖZEL KAPSAM" : "PROJECT-SPECIFIC SCOPE")}</p>
        <h4><Link href={s.href}>{s.label[lang]} ↗</Link></h4><p>{s.description[lang]}</p><Link className={styles.textLink} href={s.href}>{lang === "tr" ? "Hizmeti inceleyin" : "Explore the service"} ↗</Link>
      </article>)}</div>
    </div>)}
  </section>;
}
