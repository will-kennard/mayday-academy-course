import type { Metadata } from "next";
import { getCourse, getFirstLesson } from "@/lib/course";
import { absoluteUrl } from "@/lib/routes";
import CourseHome from "@/components/course/CourseHome";

const course = getCourse();

export const metadata: Metadata = {
  title: `${course.title} | Mayday Academy`,
  description: course.description,
  alternates: {
    canonical: absoluteUrl("/"),
  },
};

export default function Home() {
  const course = getCourse();
  const firstLesson = getFirstLesson();

  return <CourseHome course={course} firstLesson={firstLesson} />;
}
