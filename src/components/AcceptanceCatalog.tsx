import Link from "next/link";
import { ItemCategory, statusLabel } from "@/data/accepted-items";
import { routes } from "@/data/site";
import { ItemIcon } from "./ItemIcon";
import styles from "./AcceptanceCatalog.module.css";

function groupLabel(status: string) {
  if (status === "accepted-no-fee") return "Standard electronics";
  if (status === "accepted-fee" || status === "contact-first") return "Special handling";
  return "Not currently accepted";
}

export function AcceptanceCatalog({ categories }: { categories: readonly ItemCategory[] }) {
  const groups = [
    {
      key: "standard",
      title: "Standard electronics",
      note: "Items EVER can route through the normal electronics stream under the published policy.",
      items: categories.filter((c) => c.policy.value.status === "accepted-no-fee"),
    },
    {
      key: "special",
      title: "Special handling",
      note: "Items that need a fee, a quick conversation, or another condition before handoff.",
      items: categories.filter((c) => ["accepted-fee", "contact-first"].includes(c.policy.value.status)),
    },
    {
      key: "not-accepted",
      title: "Not currently accepted",
      note: "Streams outside EVER’s current operating scope. The card shows the next useful route when one is known.",
      items: categories.filter((c) => c.policy.value.status === "not-accepted"),
    },
  ].filter((group) => group.items.length);

  return (
    <div className={styles.catalog}>
      {groups.map((group, index) => (
        <section key={group.key} className={styles.group} aria-labelledby={`accept-${group.key}`}>
          <div className={styles.groupIntro}>
            <span className={styles.groupIndex}>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2 id={`accept-${group.key}`}>{group.title}</h2>
              <p>{group.note}</p>
            </div>
          </div>

          <div className={styles.cards}>
            {group.items.map((category) => {
              const policy = category.policy.value;
              return (
                <article key={category.slug} className={styles.card} data-status={policy.status}>
                  <div className={styles.cardTop}>
                    <span className={styles.icon}><ItemIcon icon={category.icon} size={40} /></span>
                    <span className={styles.status}>
                      <i aria-hidden="true" />
                      {statusLabel(policy.status)}
                    </span>
                  </div>
                  <h3>{category.name}</h3>
                  {policy.conditions ? <p>{policy.conditions}</p> : null}
                  {policy.preparation ? <p className={styles.prep}>{policy.preparation}</p> : null}
                  {policy.fee ? <p className={styles.fee}><strong>Published fee:</strong> {policy.fee}</p> : null}
                  <Link href={`${routes.residential}?item=${category.slug}`} className={styles.link}>
                    Check this item <span aria-hidden="true">→</span>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
