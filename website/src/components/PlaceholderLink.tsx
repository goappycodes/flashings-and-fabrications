"use client";

import type { ReactNode } from "react";

// A real, focusable link to a page that isn't built yet. It behaves like a link (hover, focus,
// pointer) but clicking stays on the homepage. Swap for next/link once the page exists.
export function PlaceholderLink({
  href,
  className,
  children,
  ...rest
}: {
  href: string;
  className?: string;
  children: ReactNode;
  id?: string;
  "aria-label"?: string;
}) {
  return (
    <a href={href} className={className} data-placeholder-link onClick={(e) => e.preventDefault()} {...rest}>
      {children}
    </a>
  );
}
