import Link from "next/link";
import MaydayLogo from "@/components/MaydayLogo";
import { routes } from "@/lib/routes";

const links = [
  { href: routes.home(), label: "Home" },
  { href: routes.course(), label: "Course" },
  { href: routes.quiz(), label: "Quiz" },
  { href: routes.glossary(), label: "Month-end Glossary" },
];

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 bg-navbar text-white">
      <nav className="mx-auto flex h-[100px] max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={routes.home()} className="flex shrink-0 items-center">
          <MaydayLogo />
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
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
          <Link
            href={routes.landing()}
            className="ml-2 shrink-0 rounded-md bg-[#FF4461] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#e63d57]"
          >
            What is Mayday?
          </Link>
        </div>
      </nav>
    </header>
  );
}
