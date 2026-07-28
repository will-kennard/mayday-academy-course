"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/routes";

const links = [
  { href: routes.home(), label: "Home" },
  { href: routes.course(), label: "Course" },
  { href: routes.quiz(), label: "Quiz" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AcademySubnav() {
  const pathname = usePathname();

  if (pathname === "/glossary" || pathname.startsWith("/glossary/")) {
    return null;
  }

  return (
    <div className="border-b border-border bg-surface-muted">
      <nav
        className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8"
        aria-label="Academy"
      >
        {links.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-white text-mayday-dark shadow-sm"
                  : "text-mayday-dark/70 hover:bg-white/70 hover:text-mayday-dark"
              }`}
              aria-current={active ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
