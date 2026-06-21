import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllLessons,
  getLessonBySlug,
  getAdjacentLessons,
} from "@/lib/course";
import { absoluteUrl, routes } from "@/lib/routes";
import LessonPage from "@/components/course/LessonPage";

type LessonParams = { sectionSlug: string; lessonSlug: string };

export function generateStaticParams(): LessonParams[] {
  return getAllLessons().map((lesson) => ({
    sectionSlug: lesson.sectionSlug,
    lessonSlug: lesson.lessonSlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LessonParams>;
}): Promise<Metadata> {
  const { sectionSlug, lessonSlug } = await params;
  const context = getLessonBySlug(sectionSlug, lessonSlug);

  if (!context) {
    return { title: "Lesson not found" };
  }

  return {
    title: context.lesson.title,
    description: context.lesson.simpleExplanation,
    alternates: {
      canonical: absoluteUrl(routes.lesson(sectionSlug, lessonSlug)),
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<LessonParams>;
}) {
  const { sectionSlug, lessonSlug } = await params;
  const context = getLessonBySlug(sectionSlug, lessonSlug);

  if (!context) {
    notFound();
  }

  const { previous, next } = getAdjacentLessons(sectionSlug, lessonSlug);

  return <LessonPage context={context} previous={previous} next={next} />;
}
