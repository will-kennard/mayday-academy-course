import Link from "next/link";
import type { LessonWithContext } from "@/lib/types";
import { routes, lessonHref } from "@/lib/routes";

export default function LessonNavigation({
  previous,
  next,
  sectionSlug,
  sectionTitle,
}: {
  previous: LessonWithContext | null;
  next: LessonWithContext | null;
  sectionSlug: string;
  sectionTitle: string;
}) {
  return (
    <nav className="mt-12 border-t border-border pt-6">
      <div className="mb-4 text-center">
        <Link
          href={routes.section(sectionSlug)}
          className="text-sm font-medium text-brand hover:underline"
        >
          Back to {sectionTitle}
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {previous ? (
          <Link
            href={lessonHref(previous)}
            className="group flex flex-col rounded-xl border border-border bg-surface p-4 transition-colors hover:border-brand"
          >
            <span className="text-xs font-medium uppercase tracking-wide text-muted">
              &larr; Previous
            </span>
            <span className="mt-1 font-medium group-hover:text-brand">
              {previous.lesson.title}
            </span>
          </Link>
        ) : (
          <span aria-hidden className="hidden sm:block" />
        )}
        {next ? (
          <Link
            href={lessonHref(next)}
            className="group flex flex-col rounded-xl border border-border bg-surface p-4 text-right transition-colors hover:border-brand"
          >
            <span className="text-xs font-medium uppercase tracking-wide text-muted">
              Next &rarr;
            </span>
            <span className="mt-1 font-medium group-hover:text-brand">
              {next.lesson.title}
            </span>
          </Link>
        ) : (
          <Link
            href={routes.quiz()}
            className="group flex flex-col rounded-xl border border-brand bg-brand-soft p-4 text-right transition-colors hover:opacity-90"
          >
            <span className="text-xs font-medium uppercase tracking-wide text-brand">
              Final step &rarr;
            </span>
            <span className="mt-1 font-medium text-brand">Take the quiz</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
