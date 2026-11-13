"use client";

import { useRef, useState, type FormEvent } from "react";
import { useLocale } from "next-intl";
import FormPrivacyNotice from "@/components/legal/FormPrivacyNotice";
import copy from "@/data/geo.json";
import styles from "./Geo.module.css";

export default function GeoLeadForm() {
  const locale = useLocale() === "en" ? "en" : "tr";
  const t = copy[locale];
  const key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
  const busy = useRef(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || !key || status === "success") return;
    const form = event.currentTarget;
    const body = new FormData(form);
    if (body.get("botcheck")) return;
    busy.current = true;
    setStatus("sending");
    body.append("access_key", key);
    body.append("subject", `Niodome — GEO mini review / ${locale.toUpperCase()}`);
    body.append("request_type", "GEO mini review");
    body.append("language", locale);
    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      busy.current = false;
    }
  }
  if (status === "success") return <p className={styles.feedback} role="status">{t.form.success}</p>;
  return (
    <>
      {!key && <p className={styles.feedback} role="status">{t.form.unavailable}</p>}
      <form className={styles.form} onSubmit={submit} aria-describedby="geo-form-purpose" aria-busy={status === "sending"}>
        <fieldset disabled={!key || status === "sending"} className={styles.full} style={{display:"contents"}}>
          <label>{t.form.company}<input name="company" autoComplete="organization" required maxLength={160} /></label>
          <label>{t.form.website}<input name="website" type="url" placeholder="https://" autoComplete="url" required maxLength={500} /></label>
          <label>{t.form.email}<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
          <label>{t.form.type}<select name="company_type" defaultValue=""><option value="">{t.form.choose}</option><option value="SMB">{t.smb}</option><option value="Enterprise">{t.enterprise}</option></select></label>
          <input className={styles.honeypot} type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <p id="geo-form-purpose" className={`${styles.note} ${styles.full}`}>{t.form.privacy}</p>
          <div className={styles.full}><FormPrivacyNotice /></div>
          <div className={styles.full}><button className={`${styles.button} ${styles.primary}`} type="submit">{status === "sending" ? t.form.sending : t.form.submit}</button></div>
        </fieldset>
      </form>
      {status === "error" && <p className={styles.feedback} role="alert">{t.form.error}</p>}
    </>
  );
}
