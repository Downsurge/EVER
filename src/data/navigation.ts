import { routes } from "./site";

export type NavItem = {
  readonly label: string;
  readonly href: string;
  readonly published: boolean;
};

export const primaryNav: readonly NavItem[] = [
  { label: "Recycle", href: routes.residential, published: true },
  { label: "Business", href: routes.business, published: true },
  { label: "What We Accept", href: routes.whatWeAccept, published: true },
] as const;

export function publishedNav(): readonly NavItem[] {
  return primaryNav.filter((item) => item.published);
}

export const persistentBusinessAction = {
  label: "Plan a Pickup",
  href: routes.business,
  published: true,
  blockedReason: "",
} as const;
