import Link from "next/link";
import type { CourseSection } from "@/lib/types";
import { getSectionLessonCount } from "@/lib/course";
import { routes } from "@/lib/routes";
import Breadcrumb from "@/components/Breadcrumb";

export default function SectionPage({ section }: { section: CourseSection }) {
  const lessonCount = getSectionLessonCount(section);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumb
        items={[
          { label: "Course", href: routes.course() },
          { label: section.title },
        ]}
      />

      <header className="mt-6">
        <p className="text-sm font-semibold text-brand">
          Section {section.number}
        </p>
        <h1 className="font-poppins mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {section.title}
        </h1>
        <p className="mt-3 leading-relaxed text-muted">{section.description}</p>
        <p className="mt-3 text-sm text-muted">
          {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"} across{" "}
          {section.subsections.length}{" "}
          {section.subsections.length === 1 ? "topic" : "topics"}
        </p>
      </header>

      <div className="mt-10 space-y-8">
        {section.subsections.map((subsection) => (
          <section key={subsection.id}>
            <h2 className="font-poppins text-xl font-semibold tracking-tight">
              <span className="text-muted">{subsection.number}</span>{" "}
              {subsection.title}
            </h2>
            <p className="mt-1 text-sm text-muted">{subsection.description}</p>
            <ul className="mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
              {subsection.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link
                    href={routes.lesson(section.id, lesson.slug)}
                    className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface-muted"
                  >
                    <span>
                      <span className="font-medium group-hover:text-brand">
                        {lesson.title}
                      </span>
                      <span className="mt-0.5 block text-sm text-muted">
                        {lesson.question}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="shrink-0 text-muted transition-colors group-hover:text-brand"
                    >
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
