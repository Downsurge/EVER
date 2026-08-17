import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";

export const viewport: Viewport = { themeColor: "#0b1b34" };
export const metadata: Metadata = {
  metadataBase: new URL("https://electronicrecycle.net"),
  title: "ElectronicRecycle.net | Local Electronics Recycling",
  description: "Choose your local ElectronicRecycle.net market for electronics recycling, e-waste recycling, business pickup, and local recycling resources.",
  icons: { icon: "/icon.png", shortcut: "/icon.png", apple: "/icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // <Analytics /> records page views. It is inert until Web Analytics is
  // enabled in the Vercel dashboard, and does nothing in development.
  return <html lang="en"><body><a className="ever-skip-link" href="#main">Skip to main content</a>{children}<Analytics /></body></html>;
}
