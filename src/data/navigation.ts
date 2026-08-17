import type { MarketKey } from "./markets";
import { marketRoutes } from "./markets";

export type NavItem = {
  readonly label: string;
  readonly href: string;
  readonly published: boolean;
};

export function publishedNav(market: MarketKey): readonly NavItem[] {
  const routes = marketRoutes(market);
  return [
    { label: "Recycle", href: routes.residential, published: true },
    { label: "Services", href: routes.services, published: true },
    { label: "Pricing", href: routes.pricing, published: true },
    { label: "Business", href: routes.business, published: true },
    { label: "Resources", href: routes.resources, published: true },
  ].filter((item) => item.published);
}

export function persistentBusinessAction(market: MarketKey) {
  return {
    label: "Plan a Pickup",
    href: marketRoutes(market).business,
    published: true,
    blockedReason: "",
  } as const;
}
