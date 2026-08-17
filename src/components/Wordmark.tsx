import Image from "next/image";
import type { MarketKey } from "@/data/markets";
import { markets } from "@/data/markets";
import styles from "./Wordmark.module.css";

export function Wordmark({
  market = "az",
  variant = "default",
  compact = false,
}: {
  market?: MarketKey;
  variant?: "default" | "reversed";
  compact?: boolean;
}) {
  const cfg = markets[market];

  if (market === "tx") {
    return (
      <span className={`${styles.wordmark} ${styles.eperWordmark} ${variant === "reversed" ? styles.reversed : ""} ${compact ? styles.compact : ""}`}>
        <strong className={styles.eperLetters}>EPER</strong>
        <small>{cfg.brandName}</small>
      </span>
    );
  }

  return (
    <span className={`${styles.wordmark} ${compact ? styles.compact : ""}`}>
      <Image
        src={variant === "reversed" ? "/brand/ever-logo-reversed.png" : "/brand/ever-logo.png"}
        alt="EVER — East Valley Electronic Recycle"
        width={variant === "reversed" ? 1896 : 2172}
        height={variant === "reversed" ? 513 : 724}
        priority
        className={styles.image}
      />
    </span>
  );
}
