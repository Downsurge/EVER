"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import type { MarketKey } from "@/data/markets";
import { markets, marketRoutes } from "@/data/markets";
import styles from "./BusinessLeadModal.module.css";

export type BusinessBriefData = {
  assets: string[];
  quantity: string;
  priorities: string[];
  pickupNote: string;
};

export function BusinessLeadModal({
  market,
  open,
  onClose,
  brief,
}: {
  market: MarketKey;
  open: boolean;
  onClose: () => void;
  brief: BusinessBriefData;
}) {
  const cfg = markets[market];
  const routes = marketRoutes(market);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      setStatus("idle");
      setMessage("");
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus("sending");
    setMessage("");

    const form = new FormData(formElement);
    form.set("market", market);
    form.set("brief", JSON.stringify(brief));

    try {
      const response = await fetch("/api/business-lead", { method: "POST", body: form });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(typeof data?.error === "string" ? data.error : "We couldn't send the request right now.");
      setStatus("success");
      setMessage(`Your pickup request was sent. ${cfg.brandShort} can follow up using the contact information you provided.`);
      formElement.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We couldn't send the request right now.");
    }
  }

  return (
    <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="lead-modal-title">
      <div className={styles.panel}>
        <button type="button" className={styles.close} onClick={() => dialogRef.current?.close()} aria-label="Close form">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M5 5l14 14M19 5 5 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {status === "success" ? (
          <div className={styles.success}>
            <span className={styles.successMark} aria-hidden="true">✓</span>
            <h2 id="lead-modal-title">Request sent.</h2>
            <p>{message}</p>
            <button type="button" className={styles.done} onClick={() => dialogRef.current?.close()}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className={styles.heading}>
              <h2 id="lead-modal-title">Send your pickup request</h2>
              <p>Your equipment brief is already attached. Add the best way to reach you.</p>
            </div>

            <div className={styles.briefSummary}>
              <div>
                <span>Equipment</span>
                <strong>{brief.assets.join(", ")}</strong>
              </div>
              <div>
                <span>Quantity</span>
                <strong>{brief.quantity}</strong>
              </div>
              <div>
                <span>Pickup</span>
                <strong>{brief.pickupNote}</strong>
              </div>
              <div>
                <span>Priorities</span>
                <strong>{brief.priorities.join(", ")}</strong>
              </div>
            </div>

            <form className={styles.form} onSubmit={submit}>
              <div className={styles.twoCol}>
                <label>
                  <span>Name *</span>
                  <input name="name" autoComplete="name" required />
                </label>
                <label>
                  <span>Company *</span>
                  <input name="company" autoComplete="organization" required />
                </label>
              </div>

              <div className={styles.twoCol}>
                <label>
                  <span>Email *</span>
                  <input name="email" type="email" autoComplete="email" required />
                </label>
                <label>
                  <span>Phone</span>
                  <input name="phone" type="tel" autoComplete="tel" />
                </label>
              </div>

              <label className={styles.shortField}>
                <span>ZIP code *</span>
                <input name="zip" inputMode="numeric" autoComplete="postal-code" required />
              </label>

              <label>
                <span>Anything else we should know?</span>
                <textarea name="notes" rows={4} placeholder="Access instructions, timing, unusual equipment, etc." />
              </label>

              <label>
                <span>Photos or inventory list</span>
                <input name="attachments" type="file" multiple accept="image/*,.csv,.xlsx,.xls,.pdf,.txt" />
                <small>Optional. Upload up to 5 photos, a CSV/Excel inventory, PDF, or text list. Keep each file under 5 MB.</small>
              </label>

              <label className={styles.honeypot} aria-hidden="true">
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>

              <p className={styles.legal}>
                By submitting, you agree that {cfg.brandShort} may contact you about this request.
                See our <Link href={routes.privacy}>Privacy Policy</Link>, <Link href={routes.terms}>Terms</Link>,
                and <Link href={routes.acceptancePolicy}>Acceptance Policy</Link>.
              </p>

              {status === "error" ? <p className={styles.error} role="alert">{message}</p> : null}

              <button type="submit" className={styles.submit} disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send pickup request"}
              </button>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
