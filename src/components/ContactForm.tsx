"use client";

import { FormEvent, useState } from "react";
import type { MarketKey } from "@/data/markets";
import { markets } from "@/data/markets";
import styles from "./ContactForm.module.css";

export function ContactForm({ market, initialSubject = "" }: { market: MarketKey; initialSubject?: string }) {
  const cfg = markets[market];
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus("sending");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      subject: String(form.get("subject") ?? "").trim(),
      message: String(form.get("message") ?? "").trim(),
      website: String(form.get("website") ?? "").trim(),
      market,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || "We couldn't send your message.");

      setStatus("success");
      setMessage(`Message sent. ${cfg.brandShort} can follow up using the information you provided.`);
      formElement.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We couldn't send your message.");
    }
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.twoCol}>
        <label>
          <span>Name *</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span>Email *</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>

      <div className={styles.twoCol}>
        <label>
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label>
          <span>Subject *</span>
          <select name="subject" required defaultValue={initialSubject}>
            <option value="" disabled>Select one</option>
            <option>General question</option>
            <option>Residential recycling question</option>
            <option>Residential pickup request</option>
            <option>Business pickup question</option>
            <option>Privacy request</option>
            <option>Accessibility issue</option>
          </select>
        </label>
      </div>

      <label>
        <span>Message *</span>
        <textarea name="message" rows={6} required />
      </label>

      <label className={styles.honeypot} aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      {status === "success" ? <p className={styles.success} role="status">{message}</p> : null}
      {status === "error" ? <p className={styles.error} role="alert">{message}</p> : null}

      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
