export default function MaintenanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#0a0a0a",
          color: "#f0f0f0",
          fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </body>
    </html>
  );
}
