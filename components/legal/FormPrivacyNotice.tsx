"use client";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./Legal.module.css";
export default function FormPrivacyNotice() {
  const en = useLocale() === "en";
  return (
    <p className={styles.notice}>
      {en
        ? "Your details are used to assess and respond to your enquiry. "
        : "Bilgileriniz talebinizi değerlendirmek ve size dönüş yapmak için kullanılır. "}
      <Link href="/kvkk" target="_blank" rel="noopener noreferrer">
        {en ? "KVKK Privacy Notice" : "KVKK Aydınlatma Metni"}
      </Link>
      {" · "}
      <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">
        {en ? "Privacy Policy" : "Gizlilik Politikası"}
      </Link>
      {en
        ? ". Submitting this form does not subscribe you to marketing messages."
        : ". Formu göndermek pazarlama aboneliği oluşturmaz."}
    </p>
  );
}
