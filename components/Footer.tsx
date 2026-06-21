import Link from "next/link";
import { routes } from "@/lib/routes";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          Mayday Academy &middot; A practical guide to accounting and month end.
        </p>
        <nav className="flex gap-4">
          <Link href={routes.home()} className="hover:text-foreground">
            Home
          </Link>
          <Link href={routes.course()} className="hover:text-foreground">
            Course
          </Link>
          <Link href={routes.quiz()} className="hover:text-foreground">
            Quiz
          </Link>
        </nav>
      </div>
    </footer>
  );
}
