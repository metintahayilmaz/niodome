import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import styles from "./Legal.module.css";
export default async function LegalLinks() {
  const en = (await getLocale()) === "en";
  return (
    <nav className={styles.footer} aria-label={en ? "Legal" : "Yasal bilgiler"}>
      <Link href="/privacy-policy">
        {en ? "Privacy Policy" : "Gizlilik Politikası"}
      </Link>
      <Link href="/kvkk">
        {en ? "KVKK Privacy Notice" : "KVKK Aydınlatma Metni"}
      </Link>
    </nav>
  );
}
