import Link from "next/link";
import { routes } from "@/lib/routes";

const links = [
  { href: routes.home(), label: "Home" },
  { href: routes.course(), label: "Course" },
  { href: routes.quiz(), label: "Quiz" },
];

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href={routes.home()}
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-sm font-bold text-brand-foreground">
            M
          </span>
          <span className="text-base">Mayday Academy</span>
        </Link>
        <ul className="flex items-center gap-1 text-sm font-medium">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-md px-3 py-2 text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
