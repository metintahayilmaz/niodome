import styles from "./ServiceArtwork.module.css";

export default function ServiceArtwork({ index }: { index: number }) {
  return (
    <div className={`${styles.art} ${index % 2 ? styles.dark : ""}`} aria-hidden="true">
      <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
      <svg viewBox="0 0 600 650" fill="none" className={styles.symbol}>
        {index === 0 ? <g stroke="currentColor" strokeWidth="3">
          {[100, 145, 190, 235].map(n => <rect key={n} x={n} y={n + 25} width={600 - 2 * n} height={600 - 2 * n} />)}
          <path d="M70 325h460M300 95v460" />
        </g> : index === 1 ? <g stroke="currentColor" strokeWidth="3">
          {[90, 140, 190].map(r => <circle key={r} cx="240" cy="325" r={r} />)}
          <path d="M360 135v380M410 185v280M460 235v180" />
        </g> : index === 2 ? <g stroke="currentColor" strokeWidth="3">
          <rect x="100" y="125" width="400" height="400" rx="90" />
          <path d="M100 325h400M300 125v400M100 225h400M100 425h400M200 125v400M400 125v400" />
          <circle cx="300" cy="325" r="145" />
        </g> : <g stroke="currentColor" strokeWidth="3">
          <path d="m220 175-150 150 150 150M380 175l150 150-150 150M340 135l-80 380" />
          <circle cx="300" cy="325" r="210" strokeDasharray="2 18" strokeLinecap="round" />
        </g>}
      </svg>
      <span className={styles.brand}>NIO<br />DOME</span>
    </div>
  );
}
