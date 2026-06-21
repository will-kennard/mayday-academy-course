import type { LessonWithContext } from "@/lib/types";
import { routes } from "@/lib/routes";
import Breadcrumb from "@/components/Breadcrumb";
import QuestionBlock from "@/components/course/QuestionBlock";
import ExplanationBlock from "@/components/course/ExplanationBlock";
import SimpleExplanationBlock from "@/components/course/SimpleExplanationBlock";
import ExampleBlock from "@/components/course/ExampleBlock";
import LessonNavigation from "@/components/course/LessonNavigation";
import LessonProgress from "@/components/course/LessonProgress";

export default function LessonPage({
  context,
  previous,
  next,
}: {
  context: LessonWithContext;
  previous: LessonWithContext | null;
  next: LessonWithContext | null;
}) {
  const { lesson, section, subsection } = context;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumb
        items={[
          { label: "Course", href: routes.course() },
          { label: section.title, href: routes.section(section.id) },
          { label: lesson.title },
        ]}
      />

      <header className="mt-6">
        <p className="text-sm font-medium text-brand">
          {subsection.number} {subsection.title}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {lesson.title}
        </h1>
        {lesson.tags && lesson.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {lesson.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-surface-muted px-2.5 py-1 text-xs text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>

      <div className="mt-8 space-y-8">
        <QuestionBlock question={lesson.question} />
        <ExplanationBlock explanation={lesson.properExplanation} />
        <SimpleExplanationBlock explanation={lesson.simpleExplanation} />
        <ExampleBlock example={lesson.example} />
      </div>

      <LessonProgress lessonId={lesson.id} />

      <LessonNavigation
        previous={previous}
        next={next}
        sectionSlug={section.id}
        sectionTitle={section.title}
      />
    </article>
  );
}
