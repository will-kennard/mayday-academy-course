import Link from "next/link";
import { routes } from "@/lib/routes";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          Mayday Academy &middot; A practical guide to accounting and month end.
        </p>
        <nav className="flex gap-4">
          <Link href={routes.home()} className="hover:text-heading">
            Home
          </Link>
          <Link href={routes.course()} className="hover:text-heading">
            Course
          </Link>
          <Link href={routes.quiz()} className="hover:text-heading">
            Quiz
          </Link>
        </nav>
      </div>
    </footer>
  );
}
