import { NextRequest } from "next/server";
import { check, clientIp, tooManyRequests } from "@/lib/rate-limit";

export const runtime = "nodejs";

function clean(value: unknown, max = 2000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const map: Record<string, string> = {
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
    };
    return map[char] ?? char;
  });
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (clean(body.website, 200)) return Response.json({ ok: true });

  const rate = check(clientIp(request), "contact");
  if (!rate.ok) return tooManyRequests(rate.retryAfterSeconds);

  const market = clean(body.market, 5) === "tx" ? "tx" : "az";
  const brand = market === "tx" ? "EPER" : "EVER";
  const name = clean(body.name, 120);
  const email = clean(body.email, 240);
  const phone = clean(body.phone, 80);
  const subject = clean(body.subject, 120);
  const message = clean(body.message, 4000);

  if (!name || !email || !subject || !message || !validEmail(email)) {
    return Response.json({ error: "Please complete the required fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = market === "tx"
    ? (process.env.EPER_LEADS_TO_EMAIL || process.env.EVER_LEADS_TO_EMAIL || "ever@electronicrecycle.net")
    : (process.env.EVER_LEADS_TO_EMAIL || "ever@electronicrecycle.net");
  const from = market === "tx"
    ? (process.env.EPER_LEADS_FROM_EMAIL || process.env.EVER_LEADS_FROM_EMAIL)
    : process.env.EVER_LEADS_FROM_EMAIL;

  if (!apiKey || !from) {
    return Response.json(
      { error: "The website email destination has not been configured yet." },
      { status: 503 },
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "ElectronicRecycle-Website/2.0",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `${brand} website — ${subject.replace(/[\r\n]+/g, " ")}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nSubject: ${subject}\n\n${message}`,
      html: `<div style="font-family:Arial,sans-serif;color:#0b1b34;line-height:1.5">
        <h1 style="font-size:22px">${brand} website message</h1>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <div style="margin-top:18px;padding:14px;background:#f4f7fb;border-radius:8px;white-space:pre-wrap">${escapeHtml(message)}</div>
      </div>`,
    }),
  });

  if (!response.ok) {
    console.error("Resend contact error", response.status, await response.text().catch(() => ""));
    return Response.json({ error: "We couldn't send your message right now." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
