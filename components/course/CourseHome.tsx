import Link from "next/link";
import type { Course, LessonWithContext } from "@/lib/types";
import { getSectionLessonCount } from "@/lib/course";
import { routes, lessonHref } from "@/lib/routes";
import SectionList from "@/components/course/SectionList";

export default function CourseHome({
  course,
  firstLesson,
}: {
  course: Course;
  firstLesson?: LessonWithContext;
}) {
  const totalLessons = course.sections.reduce(
    (total, section) => total + getSectionLessonCount(section),
    0
  );
  const startHref = firstLesson ? lessonHref(firstLesson) : routes.course();

  return (
    <div>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <span className="inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
            Mayday Academy
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            {course.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {course.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={startHref}
              className="inline-flex h-12 items-center justify-center rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground transition-colors hover:opacity-90"
            >
              Start the course
            </Link>
            <Link
              href={routes.quiz()}
              className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-surface px-6 text-sm font-semibold transition-colors hover:bg-surface-muted"
            >
              Take the quiz
            </Link>
          </div>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm">
            <div>
              <dt className="text-muted">Sections</dt>
              <dd className="text-2xl font-semibold">{course.sections.length}</dd>
            </div>
            <div>
              <dt className="text-muted">Lessons</dt>
              <dd className="text-2xl font-semibold">{totalLessons}</dd>
            </div>
            <div>
              <dt className="text-muted">Final quiz</dt>
              <dd className="text-2xl font-semibold">40 questions</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight">
            Who this course is for
          </h2>
          <p className="mt-3 leading-relaxed text-muted">
            {course.description} It is written for operators, founders and
            non-accountants who want to understand finance conversations,
            month-end reporting and the workflows that finance teams run every
            month.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="font-semibold">Learn the language</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Debits, credits, P&amp;L, balance sheet, accruals and the rest of
              the vocabulary finance teams use.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="font-semibold">Understand month end</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              See how finance teams finalise the numbers each month and why
              accurate reporting matters.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="font-semibold">See how Mayday helps</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Connect the concepts to the Mayday products that automate and
              control recurring month-end work.
            </p>
          </div>
        </div>

        <div className="mt-14">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Course content</h2>
            <Link
              href={routes.course()}
              className="text-sm font-medium text-brand hover:underline"
            >
              View all sections
            </Link>
          </div>
          <SectionList sections={course.sections} />
        </div>

        <div className="mt-14 rounded-2xl border border-border bg-brand-soft p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight">
            Ready to test your knowledge?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Once you have worked through the lessons, take the end-of-course
            quiz to check your understanding across accounting, month end and
            Mayday.
          </p>
          <Link
            href={routes.quiz()}
            className="mt-6 inline-flex h-12 items-center justify-center rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground transition-colors hover:opacity-90"
          >
            Take the quiz
          </Link>
        </div>
      </section>
    </div>
  );
}
