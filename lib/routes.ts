import type { LessonWithContext } from "@/lib/types";

export const routes = {
  home: () => "/",
  course: () => "/course",
  section: (sectionSlug: string) => `/course/${sectionSlug}`,
  lesson: (sectionSlug: string, lessonSlug: string) =>
    `/course/${sectionSlug}/${lessonSlug}`,
  quiz: () => "/quiz",
};

export function lessonHref(lesson: LessonWithContext): string {
  return routes.lesson(lesson.sectionSlug, lesson.lessonSlug);
}

/**
 * Base URL used for canonical links, metadata and the sitemap. Falls back to a
 * sensible default when no environment variable is set.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://academy.mayday.app"
).replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
