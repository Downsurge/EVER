import Image from "next/image";
import styles from "./Wordmark.module.css";

/**
 * Approved EVER wordmark asset from the supplied brand work.
 * The default asset is used on light surfaces; the reversed asset keeps the
 * colored V while converting the navy lettering to white for dark fields.
 */
export function Wordmark({
  variant = "default",
  compact = false,
}: {
  variant?: "default" | "reversed";
  compact?: boolean;
}) {
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
