import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Niodome — Çok Yakında",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <main
      style={{
        textAlign: "center",
        padding: "2rem",
        maxWidth: "480px",
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: "3rem" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 42.4 36"
          width="48"
          height="41"
          style={{ fill: "#f0f0f0", display: "block", margin: "0 auto 1rem" }}
        >
          <path d="M25.8,13.8h2.8v5.5h-2.8v-5.5ZM13.8,16.6v2.8h2.8v-5.5h-2.8v2.8ZM32.2,0v2.8h-2.8V0h2.8ZM26.7,5.5h2.8v-2.8h-2.8v2.8ZM21.2,5.5h-5.5v2.8h11.1v-2.8h-5.5ZM12.8,2.8v2.8h2.8v-2.8h-2.8ZM10.1,0v2.8h2.8V0h-2.8ZM7.3,5.5v5.5h2.8V2.8h-2.8v2.8ZM4.5,13.8v2.8H0v2.8h2.8v2.8H0v2.8h2.8v11.1h2.8v-8.3h5.5v-2.8h-5.5v-8.3h1.9v-5.5h-2.9v2.8ZM35,5.5v-2.8h-2.8v8.3h2.8v-5.5ZM42.4,19.4v-2.8h-4.7v-5.5h-2.8v5.5h1.9v8.3h-5.5v2.8h5.5v8.3h2.8v-11.1h2.8v-2.8h-2.8v-2.8h2.8Z" />
        </svg>
        <div
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#888",
            fontWeight: 500,
          }}
        >
          NIODOME
        </div>
      </div>

      {/* Headline */}
      <h1
        style={{
          fontSize: "clamp(2rem, 6vw, 3.5rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          margin: "0 0 0.5rem",
          letterSpacing: "-0.02em",
          color: "#f0f0f0",
        }}
      >
        Çok yakında
      </h1>
      <p
        style={{
          fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
          fontWeight: 300,
          color: "#666",
          margin: "0 0 3rem",
          letterSpacing: "0.05em",
        }}
      >
        Coming soon
      </p>

      {/* Divider */}
      <div
        style={{
          width: "2rem",
          height: "1px",
          background: "#333",
          margin: "0 auto 3rem",
        }}
      />

      {/* Contact */}
      <a
        href="mailto:hello@niodome.com"
        style={{
          color: "#666",
          fontSize: "0.85rem",
          textDecoration: "none",
          letterSpacing: "0.05em",
          borderBottom: "1px solid #333",
          paddingBottom: "2px",
        }}
      >
        hello@niodome.com
      </a>
    </main>
  );
}
