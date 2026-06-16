"use client";

import { type FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { CommonLoadItem } from "@/components/animations/CommonLoadAnimation";
import TextScramble from "@/components/animations/TextScramble";

type FormStatus = "idle" | "sending" | "success" | "error";

const WEB3_SUBMIT = "https://api.web3forms.com/submit";

type Web3Response = { success: boolean; message?: string };

/**
 * Web3Forms React example: FormData from the form, `access_key` appended, then POST to their API.
 * The key is public (inlined at build) — set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env.local` (not hardcoded).
 */
export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!key) {
      setStatus("error");
      setFeedback(
        "Set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local (get a key at web3forms.com), then restart the dev server.",
      ); // dev-only error, not user-facing, intentionally not translated
      return;
    }

    setStatus("sending");
    setFeedback("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", key);

    try {
      const res = await fetch(WEB3_SUBMIT, { method: "POST", body: formData });
      const data: Web3Response = await res.json();
      if (data.success) {
        setStatus("success");
        setFeedback(t("successMessage"));
        form.reset();
        return;
      }
      setStatus("error");
      setFeedback(
        data.message && data.message.length > 0
          ? data.message
          : t("errorGeneric"),
      );
    } catch {
      setStatus("error");
      setFeedback(t("errorNetwork"));
    }
  }

  const showSuccessReply = status === "success";

  return (
    <div className="mxd-block contact">
      <div className="mxd-form-container">
        {showSuccessReply && (
          <div
            className="form__reply centered text-center is-visible"
            role="status"
            aria-live="polite"
          >
            <i className="ph-fill ph-smiley-wink reply__icon" />
            <p className="reply__title">{t("successTitle")}</p>
            <span className="reply__text">{feedback}</span>
          </div>
        )}

        <form
          className={`form contact-form${status === "success" ? " is-hidden" : ""}`}
          id="contact-form"
          onSubmit={onSubmit}
        >
          <input
            type="hidden"
            name="subject"
            defaultValue={t("emailSubject")}
            aria-hidden
          />
          <div className="container-fluid p-0">
            <div className="row gx-0">
              <CommonLoadItem index={0}>
                <div className="col-12 col-md-6 mxd-grid-item loading-item">
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder={t("namePlaceholder")}
                    required
                    disabled={status === "sending" || showSuccessReply}
                  />
                </div>
              </CommonLoadItem>
              <CommonLoadItem index={1}>
                <div className="col-12 col-md-6 mxd-grid-item loading-item">
                  <input
                    type="text"
                    name="company"
                    autoComplete="organization"
                    placeholder={t("companyPlaceholder")}
                    disabled={status === "sending" || showSuccessReply}
                  />
                </div>
              </CommonLoadItem>
              <CommonLoadItem index={2}>
                <div className="col-12 col-md-6 mxd-grid-item loading-item">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder={t("emailPlaceholder")}
                    required
                    disabled={status === "sending" || showSuccessReply}
                  />
                </div>
              </CommonLoadItem>
              <CommonLoadItem index={3}>
                <div className="col-12 col-md-6 mxd-grid-item loading-item">
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder={t("phonePlaceholder")}
                    disabled={status === "sending" || showSuccessReply}
                  />
                </div>
              </CommonLoadItem>
              <CommonLoadItem index={4}>
                <div className="col-12 mxd-grid-item loading-item">
                  <textarea
                    name="message"
                    placeholder={t("messagePlaceholder")}
                    required
                    defaultValue={""}
                    disabled={status === "sending" || showSuccessReply}
                  />
                </div>
              </CommonLoadItem>
              <CommonLoadItem index={5}>
                <div className="col-12 mxd-grid-item loading-item">
                  <button
                    className="btn btn-default-icon btn-default-accent slide-right"
                    type="submit"
                    disabled={status === "sending" || showSuccessReply}
                  >
                    {status === "sending" ? (
                      <span className="btn-caption">{t("sending")}</span>
                    ) : (
                      <TextScramble className="btn-caption mxd-scramble">
                        {t("submit")}
                      </TextScramble>
                    )}
                    <i className="btn-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        viewBox="0 0 18 18"
                        aria-hidden
                      >
                        <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                      </svg>
                    </i>
                  </button>
                </div>
              </CommonLoadItem>
            </div>
          </div>
        </form>
        {status === "error" && feedback ? (
          <p className="reply__text" role="alert" style={{ marginTop: "2.4rem" }}>
            {feedback}
          </p>
        ) : null}
      </div>
    </div>
  );
}
