"use client";

import { useState } from "react";
import { BusinessLeadModal } from "./BusinessLeadModal";
import { ItemIcon } from "./ItemIcon";
import type { IconKey } from "@/data/accepted-items";
import styles from "./PickupBrief.module.css";

type AssetOption = {
  label: string;
  icon: IconKey;
};

const assetOptions: readonly AssetOption[] = [
  { label: "Desktops and workstations", icon: "desktop" },
  { label: "Laptops", icon: "laptop" },
  { label: "Servers and rack equipment", icon: "server" },
  { label: "Networking equipment", icon: "network" },
  { label: "Phones and tablets", icon: "phone" },
  { label: "Monitors", icon: "monitor" },
  { label: "Printers and copiers", icon: "printer" },
  { label: "Mixed office equipment", icon: "component" },
  { label: "A full office cleanout", icon: "drive" },
] as const;

const quantityOptions = [
  "1–9 items",
  "10–25 items",
  "26–100 items",
  "100+ items",
  "Not sure yet",
] as const;

const priorityOptions = [
  "Fast removal",
  "Data-bearing devices",
  "Asset inventory",
  "Value recovery",
  "Responsible recycling",
  "Recurring pickups",
] as const;

export function PickupBrief() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [assets, setAssets] = useState<string[]>([]);
  const [quantity, setQuantity] = useState("");
  const [priorities, setPriorities] = useState<string[]>([]);
  const [leadOpen, setLeadOpen] = useState(false);

  const briefReady = Boolean(assets.length && quantity && priorities.length);
  const pickupNote = !quantity
    ? "Choose a quantity to see pickup eligibility."
    : quantity === "1–9 items"
      ? "Under 10 qualifying items: free drop-off is available, or pickup may have a distance-based fee."
      : quantity === "Not sure yet"
        ? "EVER will confirm whether the load qualifies for free commercial pickup."
        : "This quantity may qualify for free commercial pickup when the load includes at least 10 qualifying items.";

  function toggleAsset(label: string) {
    setAssets((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label],
    );
  }

  function togglePriority(label: string) {
    setPriorities((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label],
    );
  }



  return (
    <section className={styles.builder} aria-labelledby="pickup-builder-heading">
      <div className={styles.formPanel}>
        <div className={styles.formIntro}>
          <h2 id="pickup-builder-heading">Tell us what needs to go.</h2>
          <p>
            Choose the equipment, rough quantity, and anything important about the pickup.
            We&rsquo;ll attach it to your request automatically.
          </p>
        </div>

        <ol className={styles.steps} aria-label="Pickup brief progress">
          <li className={step === 1 ? styles.activeStep : step > 1 ? styles.doneStep : ""}>
            <button type="button" onClick={() => setStep(1)} aria-current={step === 1 ? "step" : undefined}>
              <span>1</span> What do you have?
            </button>
          </li>
          <li className={step === 2 ? styles.activeStep : step > 2 ? styles.doneStep : ""}>
            <button type="button" onClick={() => assets.length && setStep(2)} disabled={!assets.length} aria-current={step === 2 ? "step" : undefined}>
              <span>2</span> How much?
            </button>
          </li>
          <li className={step === 3 ? styles.activeStep : ""}>
            <button type="button" onClick={() => assets.length && quantity && setStep(3)} disabled={!assets.length || !quantity} aria-current={step === 3 ? "step" : undefined}>
              <span>3</span> What matters?
            </button>
          </li>
        </ol>

        <div className={styles.stepBody}>
          {step === 1 ? (
            <>
              <div className={styles.stepHeading}>
                <span className={styles.stepNumber}>01</span>
                <div>
                  <h3>What do you have?</h3>
                  <p>Select everything that is part of this load.</p>
                </div>
              </div>
              <div className={styles.assetGrid}>
                {assetOptions.map((option) => {
                  const selected = assets.includes(option.label);
                  return (
                    <button
                      key={option.label}
                      type="button"
                      className={styles.choiceCard}
                      data-selected={selected}
                      aria-pressed={selected}
                      onClick={() => toggleAsset(option.label)}
                    >
                      <span className={styles.choiceIcon}><ItemIcon icon={option.icon} size={36} /></span>
                      <span>{option.label}</span>
                      <span className={styles.check} aria-hidden="true">{selected ? "✓" : ""}</span>
                    </button>
                  );
                })}
              </div>
              <div className={styles.navRow}>
                <span />
                <button type="button" className={styles.next} disabled={!assets.length} onClick={() => setStep(2)}>
                  Next: quantity <span aria-hidden="true">→</span>
                </button>
              </div>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <div className={styles.stepHeading}>
                <span className={styles.stepNumber}>02</span>
                <div>
                  <h3>Roughly how much?</h3>
                  <p>A range is enough for the first conversation.</p>
                </div>
              </div>
              <div className={styles.quantityGrid}>
                {quantityOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={styles.quantityCard}
                    data-selected={quantity === option}
                    aria-pressed={quantity === option}
                    onClick={() => setQuantity(option)}
                  >
                    <span>{option}</span>
                    <span className={styles.radioMark} aria-hidden="true" />
                  </button>
                ))}
              </div>
              <div className={styles.navRow}>
                <button type="button" className={styles.back} onClick={() => setStep(1)}>← Back</button>
                <button type="button" className={styles.next} disabled={!quantity} onClick={() => setStep(3)}>
                  Next: priorities <span aria-hidden="true">→</span>
                </button>
              </div>
            </>
          ) : null}

          {step === 3 ? (
            <>
              <div className={styles.stepHeading}>
                <span className={styles.stepNumber}>03</span>
                <div>
                  <h3>What matters most?</h3>
                  <p>Pick one or more priorities for the load.</p>
                </div>
              </div>
              <div className={styles.priorityGrid}>
                {priorityOptions.map((option) => {
                  const selected = priorities.includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      className={styles.priorityCard}
                      data-selected={selected}
                      aria-pressed={selected}
                      onClick={() => togglePriority(option)}
                    >
                      <span className={styles.priorityNode} aria-hidden="true" />
                      <span>{option}</span>
                      <span className={styles.check} aria-hidden="true">{selected ? "✓" : ""}</span>
                    </button>
                  );
                })}
              </div>
              <div className={styles.navRow}>
                <button type="button" className={styles.back} onClick={() => setStep(2)}>← Back</button>
                <span className={styles.readyState} data-ready={briefReady}>
                  {briefReady ? "Brief ready" : "Choose at least one priority"}
                </span>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <aside className={styles.briefPanel} aria-live="polite">
        <div className={styles.briefTopline}>
          <span>Pickup summary</span>
          <span className={styles.briefStatus} data-ready={briefReady}>
            <i aria-hidden="true" />
            {briefReady ? "READY" : "BUILDING"}
          </span>
        </div>

        <div className={styles.briefRoute} aria-hidden="true">
          <span className={assets.length ? styles.routeComplete : ""} />
          <span className={quantity ? styles.routeComplete : ""} />
          <span className={priorities.length ? styles.routeComplete : ""} />
        </div>

        <dl className={styles.summary}>
          <div>
            <dt>Equipment</dt>
            <dd>
              {assets.length ? (
                <ul>{assets.map((item) => <li key={item}>{item}</li>)}</ul>
              ) : (
                <span className={styles.emptyText}>Choose equipment in step 1.</span>
              )}
            </dd>
          </div>
          <div>
            <dt>Quantity</dt>
            <dd>{quantity || <span className={styles.emptyText}>Add a rough amount in step 2.</span>}</dd>
          </div>
          <div>
            <dt>Pickup</dt>
            <dd>{pickupNote}</dd>
          </div>
          <div>
            <dt>Priorities</dt>
            <dd>
              {priorities.length ? (
                <ul>{priorities.map((item) => <li key={item}>{item}</li>)}</ul>
              ) : (
                <span className={styles.emptyText}>Choose what matters in step 3.</span>
              )}
            </dd>
          </div>
        </dl>

        <div className={styles.briefFooter}>
          {briefReady ? (
            <>
              <button type="button" className={styles.send} onClick={() => setLeadOpen(true)}>
                Send pickup request
              </button>
              <p>
                Review the summary, then add your contact information in the form.
              </p>
            </>
          ) : (
            <p>
              Nothing is submitted while you build this. Your selections stay in this
              browser until you decide what to do next.
            </p>
          )}
        </div>
      </aside>

      <BusinessLeadModal
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        brief={{ assets, quantity, priorities, pickupNote }}
      />
    </section>
  );
}
