import { NextRequest } from "next/server";

export const runtime = "nodejs";

function clean(value: unknown, max = 2000): string { return typeof value === "string" ? value.trim().slice(0, max) : ""; }
function cleanList(value: unknown, maxItems = 20): string[] { return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string").map((item) => item.trim().slice(0,160)).filter(Boolean).slice(0,maxItems) : []; }
function escapeHtml(value: string): string { return value.replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char] ?? char)); }
function validEmail(value: string): boolean { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }

export async function POST(request: NextRequest) {
  const form = await request.formData().catch(() => null);
  if (!form) return Response.json({ error: "Invalid request." }, { status: 400 });
  if (clean(form.get("website"), 200)) return Response.json({ ok: true });

  const market = clean(form.get("market"), 5) === "tx" ? "tx" : "az";
  const brand = market === "tx" ? "EPER" : "EVER";
  const name = clean(form.get("name"),120), company = clean(form.get("company"),160), email = clean(form.get("email"),240), phone = clean(form.get("phone"),80), zip = clean(form.get("zip"),20), notes = clean(form.get("notes"),3000);
  let brief: { assets?: string[]; quantity?: string; priorities?: string[]; pickupNote?: string } = {};
  try { brief = JSON.parse(clean(form.get("brief"),8000) || "{}"); } catch {}
  const assets = cleanList(brief.assets), quantity = clean(brief.quantity,120), priorities = cleanList(brief.priorities), pickupNote = clean(brief.pickupNote,500);
  if (!name || !company || !email || !zip || !assets.length || !quantity || !priorities.length || !validEmail(email)) return Response.json({ error: "Please complete the required fields." }, { status: 400 });

  const files = form.getAll("attachments").filter((value): value is File => value instanceof File && value.size > 0).slice(0,5);
  const maxFile = 5 * 1024 * 1024, maxTotal = 15 * 1024 * 1024;
  const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "text/csv", "text/plain", "application/pdf", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]);
  const allowedExt = /\.(jpe?g|png|webp|heic|csv|txt|pdf|xls|xlsx)$/i;
  if (files.some((file) => file.size > maxFile) || files.reduce((sum,file)=>sum+file.size,0) > maxTotal) return Response.json({ error: "Attachments are too large. Keep each file under 5 MB and the total under 15 MB." }, { status: 400 });
  if (files.some((file) => (!allowedTypes.has(file.type) && !allowedExt.test(file.name)))) return Response.json({ error: "Unsupported attachment. Use photos, CSV/Excel files, PDFs, or text lists." }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = market === "tx" ? (process.env.EPER_LEADS_TO_EMAIL || process.env.EVER_LEADS_TO_EMAIL) : process.env.EVER_LEADS_TO_EMAIL;
  const from = market === "tx" ? (process.env.EPER_LEADS_FROM_EMAIL || process.env.EVER_LEADS_FROM_EMAIL) : process.env.EVER_LEADS_FROM_EMAIL;
  if (!apiKey || !to || !from) return Response.json({ error: "The website email destination has not been configured yet." }, { status: 503 });

  const attachments = await Promise.all(files.map(async (file) => ({ filename: file.name.replace(/[\r\n]/g," ").slice(0,160), content: Buffer.from(await file.arrayBuffer()).toString("base64") })));
  const assetsText = assets.join(", "), prioritiesText = priorities.join(", ");
  const text = [`New ${brand} business pickup request`,`Market: ${market.toUpperCase()}`,`Name: ${name}`,`Company: ${company}`,`Email: ${email}`,`Phone: ${phone || "Not provided"}`,`ZIP: ${zip}`,`Equipment: ${assetsText}`,`Quantity: ${quantity}`,`Pickup: ${pickupNote}`,`Priorities: ${prioritiesText}`,`Notes: ${notes || "None"}`,`Attachments: ${files.length}`].join("\n");
  const html = `<div style="font-family:Arial,sans-serif;color:#0b1b34;line-height:1.5"><h1 style="font-size:22px">New ${brand} business pickup request</h1><p><strong>Market:</strong> ${market.toUpperCase()}</p><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Company:</strong> ${escapeHtml(company)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p><p><strong>ZIP:</strong> ${escapeHtml(zip)}</p><p><strong>Equipment:</strong> ${escapeHtml(assetsText)}</p><p><strong>Quantity:</strong> ${escapeHtml(quantity)}</p><p><strong>Pickup:</strong> ${escapeHtml(pickupNote)}</p><p><strong>Priorities:</strong> ${escapeHtml(prioritiesText)}</p><div style="margin-top:18px;padding:14px;background:#f4f7fb;border-radius:8px"><strong>Notes</strong><p>${escapeHtml(notes || "None")}</p></div></div>`;

  const response = await fetch("https://api.resend.com/emails", { method:"POST", headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json","User-Agent":"ElectronicRecycle-Website/2.0"}, body:JSON.stringify({from,to:[to],reply_to:email,subject:`${brand} pickup request — ${company.replace(/[\r\n]+/g," ")}`,text,html,...(attachments.length?{attachments}:{})}) });
  if (!response.ok) { console.error("Resend business error", response.status, await response.text().catch(()=>"")); return Response.json({ error: "We couldn't send the request right now. Please try again shortly." }, { status: 502 }); }
  return Response.json({ ok: true });
}
