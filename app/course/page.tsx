import type { Metadata } from "next";
import { getCourse, getAllLessons } from "@/lib/course";
import { absoluteUrl } from "@/lib/routes";
import SectionList from "@/components/course/SectionList";
import CourseProgressSummary from "@/components/course/CourseProgressSummary";

const course = getCourse();

export const metadata: Metadata = {
  title: "Course",
  description: `Browse all ${course.sections.length} sections of ${course.title}, from accounting basics to month end and Mayday product workflows.`,
  alternates: {
    canonical: absoluteUrl("/course"),
  },
};

export default function CoursePage() {
  const course = getCourse();
  const totalLessons = getAllLessons().length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="mb-10 max-w-2xl">
        <h1 className="font-poppins text-3xl font-bold tracking-tight sm:text-4xl">
          {course.title}
        </h1>
        <p className="mt-3 leading-relaxed text-muted">{course.description}</p>
        <p className="mt-3 text-sm text-muted">
          {course.sections.length} sections &middot; {totalLessons} lessons
        </p>
      </header>

      <CourseProgressSummary totalLessons={totalLessons} />

      <SectionList sections={course.sections} />
    </div>
  );
}
