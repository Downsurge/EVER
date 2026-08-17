import { ItemIcon } from "./ItemIcon";
import styles from "./RoutingJunction.module.css";

/**
 * Decorative routing graphic for the homepage hero.
 * It demonstrates the core EVER idea: one pile of old technology enters,
 * then the customer chooses the path that fits them.
 */
export function RoutingJunction() {
  return (
    <div className={styles.junction} aria-hidden="true">
      <div className={styles.gridGlow} />

      <div className={styles.sourceTray}>
        <div className={styles.deviceRow}>
          <span className={styles.device}><ItemIcon icon="laptop" size={30} /></span>
          <span className={styles.device}><ItemIcon icon="desktop" size={30} /></span>
          <span className={styles.device}><ItemIcon icon="server" size={30} /></span>
          <span className={styles.device}><ItemIcon icon="phone" size={30} /></span>
        </div>
      </div>

      <svg className={styles.route} viewBox="0 0 640 430" role="presentation" focusable="false">
        <defs>
          <linearGradient id="ever-route-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0B7BE8" />
            <stop offset=".52" stopColor="#18B2C4" />
            <stop offset="1" stopColor="#7EC61E" />
          </linearGradient>
          <filter id="route-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="#0b1b34" floodOpacity=".08" />
          </filter>
        </defs>

        <path className={styles.ghostRoute} d="M64 218 H260 C314 218 322 119 380 119 H576" />
        <path className={styles.ghostRoute} d="M64 218 H260 C314 218 322 311 380 311 H576" />

        <path className={`${styles.drawRoute} ${styles.routeResidential}`} d="M64 218 H260 C314 218 322 119 380 119 H576" />
        <path className={`${styles.drawRoute} ${styles.routeBusiness}`} d="M64 218 H260 C314 218 322 311 380 311 H576" />

        <g className={styles.junctionMark} filter="url(#route-shadow)">
          <path d="M240 116 L312 218 L384 116" fill="none" stroke="url(#ever-route-gradient)" strokeWidth="18" strokeLinecap="square" />
          <path d="M258 116 L312 192 L366 116" fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="square" opacity=".95" />
        </g>
      </svg>

      <div className={`${styles.endpoint} ${styles.endpointResidential}`}>
        <span className={styles.endpointIcon}><ItemIcon icon="monitor" size={24} /></span>
        <span><strong>Residential</strong></span>
      </div>

      <div className={`${styles.endpoint} ${styles.endpointBusiness}`}>
        <span className={styles.endpointIcon}><ItemIcon icon="server" size={24} /></span>
        <span><strong>Business</strong></span>
      </div>
    </div>
  );
}
