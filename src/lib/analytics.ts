import { track } from "@vercel/analytics";

/**
 * Analytics events.
 *
 * Every tracked interaction goes through this file, so the provider is a
 * one-file swap rather than a hunt through components. Replacing Vercel with
 * Plausible, Fathom or GA4 means rewriting `send` and nothing else.
 *
 * Why Vercel Analytics: the site already deploys there, it is cookieless and
 * collects no personal data, so it does not drag a consent banner onto a page
 * whose whole job is answering a question quickly. It has to be switched on
 * in the Vercel dashboard; the code below is inert until then, and in
 * development it no-ops rather than sending anything.
 *
 * What is deliberately NOT collected: names, emails, phone numbers, form
 * contents, or anything a visitor typed. Event names and the small property
 * sets below are the whole surface, and they are all non-identifying.
 */

export type AnalyticsEvent =
  /** Landing page: which market was chosen. */
  | "market_selected"
  /** A phone or email link was activated, and from where. */
  | "contact_click"
  /** Hero: residential or business path taken. */
  | "path_selected"
  /** Acceptance finder: an item was checked, and what the answer was. */
  | "item_checked"
  /** Commercial brief: started, advanced, or reached a complete brief. */
  | "pickup_brief"
  /** A primary call to action was used. */
  | "cta_click";

type Props = Record<string, string | number | boolean | null>;

/**
 * Send an event. Safe to call from anywhere: it is a no-op on the server and
 * never throws, because analytics failing must not take a page down with it.
 */
export function trackEvent(event: AnalyticsEvent, props: Props = {}): void {
  if (typeof window === "undefined") return;
  try {
    track(event, props);
  } catch {
    // Swallowed on purpose. A blocked script or an ad blocker is a normal
    // condition, not an error worth surfacing to a visitor.
  }
}
