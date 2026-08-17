"use client";

import Link from "next/link";
import type { AnalyticsEvent } from "@/lib/analytics";
import { trackEvent } from "@/lib/analytics";

/**
 * A link that reports being used.
 *
 * Exists so server components can carry tracked links without becoming client
 * components themselves. Hero, HomeSections and SiteFooter render on the
 * server; only this leaf ships JavaScript.
 *
 * The click handler never blocks navigation. If analytics is blocked, slow or
 * switched off, the link behaves like any other link.
 */
export function TrackedLink({
  href,
  event,
  props,
  className,
  children,
  external = false,
  ...rest
}: {
  href: string;
  event: AnalyticsEvent;
  props?: Record<string, string | number | boolean | null>;
  className?: string;
  children: React.ReactNode;
  /** tel:, mailto: and other non-route destinations use a plain anchor. */
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const onClick = () => trackEvent(event, props ?? {});

  if (external) {
    return (
      <a href={href} className={className} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
