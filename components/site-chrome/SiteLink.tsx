import Link from "next/link";
import type { ReactNode } from "react";
import type { NavLink } from "@/lib/site-nav";

function isInternalHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

type SiteLinkProps = {
  link: NavLink;
  className?: string;
  children?: ReactNode;
};

export default function SiteLink({ link, className, children }: SiteLinkProps) {
  const content = children ?? link.label;
  const externalProps = link.external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  if (isInternalHref(link.href)) {
    return (
      <Link href={link.href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <a href={link.href} className={className} {...externalProps}>
      {content}
    </a>
  );
}
