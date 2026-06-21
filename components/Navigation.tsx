import Link from "next/link";
import MaydayLogo from "@/components/MaydayLogo";
import { routes } from "@/lib/routes";

const links = [
  { href: routes.home(), label: "Home" },
  { href: routes.course(), label: "Course" },
  { href: routes.quiz(), label: "Quiz" },
];

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 bg-navbar text-white">
      <nav className="mx-auto flex h-[100px] max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href={routes.home()} className="flex shrink-0 items-center">
          <MaydayLogo />
        </Link>
        <ul className="flex items-center gap-1 text-sm font-medium">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-md px-3 py-2 text-white transition-colors hover:bg-white/10"
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
