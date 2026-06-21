import Link from "next/link";
import type { CourseSection } from "@/lib/types";
import { getSectionLessonCount } from "@/lib/course";
import { routes } from "@/lib/routes";

export default function SectionCard({ section }: { section: CourseSection }) {
  const lessonCount = getSectionLessonCount(section);

  return (
    <Link
      href={routes.section(section.id)}
      className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-all hover:border-brand hover:shadow-sm"
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-sm font-bold text-brand">
          {section.number}
        </span>
        <h3 className="text-base font-semibold leading-snug tracking-tight group-hover:text-brand">
          {section.title}
        </h3>
      </div>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
        {section.description}
      </p>
      <span className="text-xs font-medium uppercase tracking-wide text-muted">
        {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}
      </span>
    </Link>
  );
}
