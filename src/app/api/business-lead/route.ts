import { NextRequest } from "next/server";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  zip?: string;
  notes?: string;
  website?: string;
  brief?: {
    assets?: string[];
    quantity?: string;
    priorities?: string[];
    pickupNote?: string;
  };
};

function clean(value: unknown, max = 2000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function cleanList(value: unknown, maxItems = 20): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim().slice(0, 160))
    .filter(Boolean)
    .slice(0, maxItems);
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return map[char] ?? char;
  });
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  let body: Payload;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Quietly accept bot submissions caught by the honeypot.
  if (clean(body.website, 200)) {
    return Response.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const company = clean(body.company, 160);
  const email = clean(body.email, 240);
  const phone = clean(body.phone, 80);
  const zip = clean(body.zip, 20);
  const notes = clean(body.notes, 3000);
  const assets = cleanList(body.brief?.assets);
  const quantity = clean(body.brief?.quantity, 120);
  const priorities = cleanList(body.brief?.priorities);
  const pickupNote = clean(body.brief?.pickupNote, 500);

  if (!name || !company || !email || !zip || !assets.length || !quantity || !priorities.length) {
    return Response.json({ error: "Please complete the required fields." }, { status: 400 });
  }

  if (!validEmail(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.EVER_LEADS_TO_EMAIL || "ever@electronicrecycle.net";
  const from = process.env.EVER_LEADS_FROM_EMAIL;

  if (!apiKey || !from) {
    return Response.json(
      {
        error:
          "The website email destination has not been configured yet. Add RESEND_API_KEY and EVER_LEADS_FROM_EMAIL to the deployment environment.",
      },
      { status: 503 },
    );
  }

  const assetsText = assets.join(", ");
  const prioritiesText = priorities.join(", ");

  const text = [
    "New EVER business pickup request",
    "",
    `Name: ${name}`,
    `Company: ${company}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `ZIP: ${zip}`,
    "",
    `Equipment: ${assetsText}`,
    `Quantity: ${quantity}`,
    `Priorities: ${prioritiesText}`,
    `Pickup: ${pickupNote || "To be confirmed"}`,
    "",
    `Notes: ${notes || "None"}`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#0b1b34;line-height:1.5">
      <h1 style="font-size:22px;margin:0 0 18px">New EVER business pickup request</h1>
      <table style="border-collapse:collapse;width:100%;max-width:680px">
        <tr><td style="padding:7px 0;color:#66758a;width:150px">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:7px 0;color:#66758a">Company</td><td>${escapeHtml(company)}</td></tr>
        <tr><td style="padding:7px 0;color:#66758a">Email</td><td>${escapeHtml(email)}</td></tr>
        <tr><td style="padding:7px 0;color:#66758a">Phone</td><td>${escapeHtml(phone || "Not provided")}</td></tr>
        <tr><td style="padding:7px 0;color:#66758a">ZIP</td><td>${escapeHtml(zip)}</td></tr>
        <tr><td style="padding:7px 0;color:#66758a">Equipment</td><td>${escapeHtml(assetsText)}</td></tr>
        <tr><td style="padding:7px 0;color:#66758a">Quantity</td><td>${escapeHtml(quantity)}</td></tr>
        <tr><td style="padding:7px 0;color:#66758a">Priorities</td><td>${escapeHtml(prioritiesText)}</td></tr>
        <tr><td style="padding:7px 0;color:#66758a">Pickup</td><td>${escapeHtml(pickupNote || "To be confirmed")}</td></tr>
      </table>
      <div style="margin-top:18px;padding:14px;background:#f4f7fb;border-radius:8px">
        <strong>Notes</strong>
        <p style="margin:7px 0 0;white-space:pre-wrap">${escapeHtml(notes || "None")}</p>
      </div>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "EVER-Website/1.0",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `EVER pickup request — ${company.replace(/[\r\n]+/g, " ")}`,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("Resend error", response.status, detail);
    return Response.json(
      { error: "We couldn't send the request right now. Please try again shortly." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
