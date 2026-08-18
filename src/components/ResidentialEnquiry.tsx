"use client";

import { useState } from "react";
import { BusinessLeadModal } from "./BusinessLeadModal";
import { itemCategories } from "@/data/accepted-items";
import type { MarketKey } from "@/data/markets";
import { trackEvent } from "@/lib/analytics";
import styles from "./ResidentialEnquiry.module.css";

/**
 * Residential enquiry.
 *
 * Deliberately thinner than the business brief. A resident with a laptop and
 * an old printer should not be asked to rank priorities or estimate a pallet
 * count, so this collects what they have and hands off to the same dialog the
 * business flow uses. One email path, one attachment policy, one validator.
 *
 * The resulting email is tagged [RESIDENTIAL] in the subject so it can be
 * filtered apart from [BUSINESS] without reading the body.
 */
export function ResidentialEnquiry({ market }: { market: MarketKey }) {
  const [items, setItems] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  function toggle(name: string) {
    setItems((current) =>
      current.includes(name) ? current.filter((i) => i !== name) : [...current, name],
    );
  }

  const ready = items.length > 0;

  return (
    <section className={styles.enquiry} aria-labelledby="residential-enquiry-heading">
      <div className={styles.head}>
        <h2 id="residential-enquiry-heading">Still not sure? Ask us.</h2>
        <p>
          Pick what you have and send a short message. Photos help if you are unsure
          what something is.
        </p>
      </div>

      <fieldset className={styles.picker}>
        <legend className="ever-visually-hidden">What do you have?</legend>
        {itemCategories.map((category) => {
          const checked = items.includes(category.name);
          return (
            <label key={category.slug} className={styles.chip} data-checked={checked}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(category.name)}
              />
              {category.name}
            </label>
          );
        })}
      </fieldset>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.send}
          disabled={!ready}
          onClick={() => {
            setOpen(true);
            trackEvent("cta_click", { market, cta: "residential_enquiry", items: items.length });
          }}
        >
          Continue
        </button>
        <span className={styles.hint} data-ready={ready}>
          {ready ? `${items.length} selected` : "Select at least one item"}
        </span>
      </div>

      <BusinessLeadModal
        market={market}
        kind="residential"
        open={open}
        onClose={() => setOpen(false)}
        brief={{ assets: items, quantity: "Residential quantity", priorities: ["Drop-off guidance"], pickupNote: "Residential enquiry" }}
      />
    </section>
  );
}
