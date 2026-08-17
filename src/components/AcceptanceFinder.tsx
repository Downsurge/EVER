"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ItemIcon } from "./ItemIcon";
import { ItemCategory, matchesQuery, statusLabel } from "@/data/accepted-items";
import type { MarketKey } from "@/data/markets";
import { marketRoutes } from "@/data/markets";
import { trackEvent } from "@/lib/analytics";
import styles from "./AcceptanceFinder.module.css";

export function AcceptanceFinder({
  categories,
  initialQuery,
  selectedSlug,
  market,
}: {
  categories: readonly ItemCategory[];
  initialQuery: string;
  selectedSlug: string | null;
  market: MarketKey;
}) {
  const routes = marketRoutes(market);
  const [query, setQuery] = useState(initialQuery);
  const [lastQueryFromUrl, setLastQueryFromUrl] = useState(initialQuery);

  if (initialQuery !== lastQueryFromUrl) {
    setLastQueryFromUrl(initialQuery);
    setQuery(initialQuery);
  }

  const visible = useMemo(
    () => categories.filter((c) => matchesQuery(c, query)),
    [categories, query],
  );

  const selected = selectedSlug
    ? (categories.find((c) => c.slug === selectedSlug) ?? null)
    : null;

  const policy = selected?.policy.value;

  if (categories.length === 0) {
    return (
      <p className="ever-notice">
        <strong>Acceptance information is not available right now.</strong>
      </p>
    );
  }

  return (
    <section className={styles.finder} aria-labelledby="finder-heading">
      <div className={styles.controls}>
        <div className={styles.prompt}>
          <h2 id="finder-heading">What are you recycling?</h2>
          <p>
            Search or tap a category. The answer appears beside the list without making
            you fill out a lead form.
          </p>
        </div>

        <form className={styles.search} role="search" method="get">
          <label className="ever-visually-hidden" htmlFor="finder-q">
            Search electronics
          </label>
          <span className={styles.searchIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="21" height="21">
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="m16.5 16.5 4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          <input
            id="finder-q"
            name="q"
            type="search"
            className={styles.searchInput}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Laptop, TV, server, cable…"
            autoComplete="off"
          />
          {query ? (
            <Link href="?" scroll={false} className={styles.clear} onClick={() => setQuery("")}>
              Clear
            </Link>
          ) : null}
        </form>

        <ul className={styles.categories}>
          {visible.map((category) => {
            const current = selected?.slug === category.slug;
            return (
              <li key={category.slug}>
                <Link
                  href={`?item=${category.slug}`}
                  scroll={false}
                  className={styles.category}
                  aria-current={current ? "true" : undefined}
                  data-current={current ? "true" : "false"}
                  data-status={category.policy.value.status}
                  // Records which items people ask about and what answer they
                  // got. The mix of "not-accepted" answers is the useful
                  // signal here: it shows what people expect us to take.
                  onClick={() => trackEvent("item_checked", { market, item: category.slug, answer: category.policy.value.status })}
                >
                  <span className={styles.categoryIconWrap}>
                    <ItemIcon icon={category.icon} className={styles.categoryIcon} size={34} />
                  </span>
                  <span className={styles.categoryName}>{category.name}</span>
                  <span className={styles.categoryCue} aria-hidden="true">→</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {visible.length === 0 ? (
          <p className={styles.noMatch} role="status">
            No matches for “{query}”. Try a broader item name.
          </p>
        ) : null}
      </div>

      <aside className={styles.result} aria-live="polite">
        {selected && policy ? (
          <article className={styles.answer} key={selected.slug}>
            <div className={styles.answerHead}>
              <span className={styles.answerIcon}>
                <ItemIcon icon={selected.icon} size={52} />
              </span>
              <div>
                <h3>{selected.name}</h3>
                <p className={styles.statusRow} data-status={policy.status}>
                  <span className={styles.statusMark} data-status={policy.status} aria-hidden="true" />
                  <strong>{statusLabel(policy.status)}</strong>
                </p>
              </div>
            </div>

            <div className={styles.answerRoute} aria-hidden="true">
              <span /><span /><span />
            </div>

            <dl className={styles.fields}>
              {policy.fee ? (
                <div><dt>Fee</dt><dd><strong>{policy.fee}</strong></dd></div>
              ) : policy.status === "accepted-no-fee" ? (
                <div><dt>Fee</dt><dd>No recycling fee</dd></div>
              ) : null}

              {policy.conditions ? (
                <div>
                  <dt>{policy.status === "not-accepted" ? "Why" : "What qualifies"}</dt>
                  <dd>{policy.conditions}</dd>
                </div>
              ) : null}

              {policy.preparation ? (
                <div>
                  <dt>{policy.status === "not-accepted" ? "Next route" : "Before handoff"}</dt>
                  <dd>{policy.preparation}</dd>
                </div>
              ) : null}
            </dl>

            <div className={styles.answerActions}>
              <Link
                href={routes.business}
                className={styles.businessLink}
                onClick={() => trackEvent("cta_click", { market, cta: "plan_a_pickup", location: "finder_answer" })}
              >
                Business quantity? Plan a pickup →
              </Link>
            </div>
          </article>
        ) : (
          <div className={styles.emptyResult}>
            <div className={styles.emptyGraphic} aria-hidden="true">
              <span className={styles.scanBeam} />
              <ItemIcon icon="laptop" size={64} />
              <span className={styles.routeDotOne} />
              <span className={styles.routeDotTwo} />
              <span className={styles.routeDotThree} />
            </div>
            <h3>Select an item.</h3>
            <p>
              Its acceptance status, conditions, and next step will appear here.
            </p>
          </div>
        )}
      </aside>
    </section>
  );
}
